<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use App\Models\Peraturan;
use App\Models\JenisPeraturan;
use App\Models\Status;
use App\Models\Pasal;
use App\Models\RelationType;
use App\Models\LawRelation;
use App\Models\PerubahanType;
use App\Models\PasalPerubahan;
use App\Models\StrukturDokumen; 
use App\Models\PenjelasanPasal; 
use App\Models\SubjekPeraturan;

class DocumentImportService
{
    /**
     * Cache referensi master selama satu proses import berjalan. Tanpa cache,
     * setiap dokumen mengulang firstOrCreate untuk data yang sama.
     */
    private array $jenisCache = [];

    private array $statusCache = [];

    private array $relationTypeCache = [];

    private array $perubahanTypeCache = [];

    private array $subjekCache = [];

    private array $jenisIdCache = [];

    private array $targetPeraturanCache = [];

    /**
     * Import JSON OCR komprehensif ke PostgreSQL
     *
     * @param array $data
     * @return Peraturan
     * @throws \Exception
     */
    public function import(array $data)
    {
        DB::beginTransaction();
        try {
            // 1. METADATA: Jenis & Status
            $metadata = $data['metadata'] ?? $data;

            $rawTipe = $metadata['tipe_peraturan']
                ?? $metadata['kategori']
                ?? $metadata['jenis']
                ?? $metadata['jenis_peraturan']
                ?? $data['tipe_peraturan']
                ?? $data['kategori']
                ?? 'Undang-Undang';

            $tipePeraturan = trim($rawTipe);

            // Resolusi terpusat agar tidak membuat jenis duplikat (mis. UUDrt vs UU_DRT)
            $jenisKey = strtolower($tipePeraturan);
            $jenis = $this->jenisCache[$jenisKey] ??= JenisPeraturan::resolveByRawString($tipePeraturan);

            // Tipe peraturan yang tidak dikenali TIDAK boleh dibiarkan lolos.
            // Sebelumnya resolveByRawString() membuat baris baru dengan kode
            // hasil inisial (mis. "TipeYangTidakAdaSamaSekali" -> "TYTASS"),
            // sehingga satu typo OCR menciptakan kategori hantu permanen di
            // tabel referensi. Lebih baik ditolak supaya admin memperbaiki
            // JSON-nya daripada mencemari master data.
            if (!$jenis) {
                throw new \InvalidArgumentException(
                    "Tipe peraturan '{$tipePeraturan}' tidak dikenali. " .
                    "Gunakan salah satu tipe baku (mis. Undang-Undang, Peraturan Pemerintah, Peraturan Daerah)."
                );
            }

            $statusNama = ucwords(strtolower(trim((string) (
                $metadata['status'] ?? $metadata['status_peraturan'] ?? 'berlaku'
            ))));
            $status = $this->statusCache[$statusNama] ??= Status::firstOrCreate(
                ['nama_status' => $statusNama]
            );

            $judul = $metadata['judul'] ?? ($data['judul'] ?? 'Dokumen Hukum');
            $idDokumen = $metadata['id_dokumen']
                ?? $metadata['standard_id']
                ?? $metadata['unique_id']
                ?? ($data['id'] ?? null);

            $standardId = $metadata['standard_id'] ?? null;

            if (!$idDokumen) {
                $idDokumen = preg_replace('/[^a-zA-Z0-9_]/', '_', strtolower($judul));
                $idDokumen = substr($idDokumen, 0, 50) . '_' . time();
            }

            $tahun = $metadata['tahun'] ?? $this->ekstrakTahun($idDokumen);
            $nomor = $this->ekstrakNomor($judul, $idDokumen);
            
            $instansi = $metadata['pemrakarsa'] ?? null;

            // 1. Cocokkan berdasarkan unique_id / standard_id (termasuk yang soft-delete)
            $peraturan = Peraturan::withTrashed()
                ->where(function ($q) use ($idDokumen, $standardId) {
                    $q->where('unique_id', $idDokumen);
                    if ($standardId && $standardId !== $idDokumen) {
                        $q->orWhere('unique_id', $standardId);
                    }
                })
                ->first();

            // 2. Fallback: jenis + nomor + tahun (+ instansi agar Perda lintas daerah tidak tertukar)
            if (!$peraturan && !empty($nomor) && !empty($tahun)) {
                $queryPeraturan = Peraturan::withTrashed()
                    ->where('jenis_peraturan_id', $jenis->id)
                    ->where('nomor', $nomor)
                    ->where('tahun', $tahun);

                // Peraturan daerah (Perda/Perbup/Perwali/Pergub dan variasinya)
                // selalu terikat satu wilayah, jadi instansi tidak boleh diabaikan
                // saat mencocokkan. Nomor yang sama lazim dipakai banyak daerah.
                $isRegional = $this->isRegionalJenis($jenis);

                if ($instansi) {
                    $peraturan = (clone $queryPeraturan)->where('instansi', $instansi)->first();

                    // Dokumen nasional tetap boleh cocok tanpa instansi; daerah tidak.
                    if (!$peraturan && !$isRegional) {
                        $peraturan = (clone $queryPeraturan)->first();
                    }
                } else {
                    $peraturan = (clone $queryPeraturan)->whereNull('instansi')->first();

                    if (!$peraturan && !$isRegional) {
                        $peraturan = (clone $queryPeraturan)->first();
                    }
                }

                // Daerah boleh menempel ke baris placeholder yang memang belum
                // punya instansi, asal judulnya masih placeholder.
                if (!$peraturan && $isRegional) {
                    $peraturan = (clone $queryPeraturan)
                        ->whereNull('instansi')
                        ->whereRaw('LOWER(judul) LIKE ?', ['menunggu import%'])
                        ->first();
                }
            }

            // Fallback: Jika tidak ditemukan by unique_id/nomor, cek apakah ada placeholder dengan judul yang cocok
            if (!$peraturan) {
                $queryPlaceholder = Peraturan::withTrashed()
                    ->where('jenis_peraturan_id', $jenis->id)
                    ->where(function($q) use ($judul, $idDokumen, $standardId) {
                        $q->whereRaw('LOWER(judul) = ?', [strtolower(trim($judul))])
                          ->orWhereRaw('LOWER(judul) = ?', ['menunggu import dokumen: ' . strtolower(trim($judul))])
                          ->orWhereRaw('LOWER(judul) = ?', ['menunggu import dokumen: ' . strtolower(trim($idDokumen))]);
                        if ($standardId) {
                            $q->orWhereRaw('LOWER(judul) = ?', ['menunggu import dokumen: ' . strtolower(trim($standardId))]);
                        }
                    });

                $peraturan = $queryPlaceholder->first();
            }

            $standardFolderMap = [
                'undang-undang' => 'uu',
                'uu' => 'uu',
                'undang-undang dasar' => 'uud',
                'uud' => 'uud',
                'undang-undang darurat' => 'uudrt',
                'uudrt' => 'uudrt',
                'peraturan pemerintah' => 'pp',
                'pp' => 'pp',
                'peraturan presiden' => 'perpres',
                'perpres' => 'perpres',
                'instruksi presiden' => 'inpres',
                'inpres' => 'inpres',
                'peraturan daerah' => 'perda',
                'perda' => 'perda',
                'peraturan menteri' => 'permen',
                'permen' => 'permen',
                'peraturan pemerintah pengganti undang-undang' => 'perpu',
                'perpu' => 'perpu',
                'perppu' => 'perpu',
                'keputusan presiden' => 'keppres',
                'keppres' => 'keppres',
            ];
            $keyLower = strtolower(trim($jenis->nama ?? $tipePeraturan));
            $tipeFolder = $standardFolderMap[$keyLower] ?? (strtolower($jenis->kode ?? $tipePeraturan));
            $docFolder = $metadata['standard_id'] ?? $idDokumen;
            $pdfPath = "documents/{$tipeFolder}/{$docFolder}/document.pdf";

            // Tentukan lokasi_daerah:
            // 1. Cek dari field metadata eksplisit (lokasi_daerah atau lokasiDaerah)
            // 2. Jika tidak ada dan pemrakarsa bukan 'Pemerintah Pusat', gunakan pemrakarsa
            // 3. Jika masih kosong dan jenis/tipe adalah Perda, gunakan tempat_penetapan sebagai fallback
            $lokasiDaerah = $metadata['lokasi_daerah'] ?? $metadata['lokasiDaerah'] ?? null;
            if (!$lokasiDaerah && !empty($metadata['pemrakarsa']) && strtolower(trim($metadata['pemrakarsa'])) !== 'pemerintah pusat') {
                $lokasiDaerah = trim($metadata['pemrakarsa']);
            }
            $isPerda = str_contains(strtolower($tipePeraturan ?? ''), 'perda')
                || str_contains(strtolower($tipePeraturan ?? ''), 'daerah')
                || str_contains(strtolower($jenis->nama ?? ''), 'perda')
                || str_contains(strtolower($jenis->nama ?? ''), 'daerah');
            if (!$lokasiDaerah && $isPerda && !empty($metadata['tempat_penetapan'])) {
                $lokasiDaerah = trim($metadata['tempat_penetapan']);
            }

            // Sync master subjek_peraturan jika field subjek tersedia
            $subjekNama = $metadata['subjek'] ?? null;
            if ($subjekNama) {
                $subjekKey = trim($subjekNama);
                $this->subjekCache[$subjekKey] ??= SubjekPeraturan::firstOrCreate(
                    ['nama' => $subjekKey],
                    ['is_active' => true]
                );
            }

            $attributes = [
                'unique_id'            => $idDokumen,
                'judul'                => $judul,
                'jenis_peraturan_id'   => $jenis->id,
                'status_id'            => $status->id,
                'tahun'                => $tahun,
                'nomor'                => $nomor,
                'tempat_penetapan'     => $metadata['tempat_penetapan'] ?? null,
                'tanggal_penetapan'    => $this->formatTanggal($metadata['tanggal_penetapan'] ?? null),
                'tanggal_pengundangan' => $this->formatTanggal($metadata['tanggal_pengundangan'] ?? null),
                'tanggal_berlaku'      => $this->formatTanggal($metadata['tanggal_berlaku'] ?? null),
                'instansi'             => $instansi,
                'lokasi_daerah'        => $lokasiDaerah,
                'url_pdf'              => $metadata['sumber_dokumen'] ?? $peraturan?->url_pdf,
                'subjek'               => $subjekNama,
                'file_pdf_path'        => $pdfPath,
            ];

            if ($peraturan) {
                if ($peraturan->trashed()) {
                    $peraturan->restore();
                }
                $peraturan->update($attributes);
            } else {
                $peraturan = Peraturan::create($attributes);
            }

            // 3. CHUNKS: Bersihkan data lama
            Pasal::where('peraturan_id', $peraturan->id)->delete();
            StrukturDokumen::where('peraturan_id', $peraturan->id)->delete();
            PenjelasanPasal::where('peraturan_id', $peraturan->id)->delete();

            // Baris anak dikumpulkan dulu lalu di-insert sekali per dokumen.
            // updateOrCreate per baris membuat ribuan SELECT + INSERT/UPDATE.
            $penjelasanRows = [];
            $pasalPerubahanRows = [];
            $lawRelationRows = [];
            $pasalLookupLoaded = false;


            $currentStrukturIds = [
                'BAB'      => null,
                'BAGIAN'   => null,
                'PARAGRAF' => null,
            ];

            $urutan = 1;
            
            // Pre-process chunks to move preamble text to the next chunk
            $chunks = $data['chunks'] ?? [];
            if (empty($chunks) && !empty($data['batang_tubuh']) && is_array($data['batang_tubuh'])) {
                foreach ($data['batang_tubuh'] as $bt) {
                    $chunks[] = [
                        'tipe' => 'PASAL',
                        'label' => $bt['pasal'] ?? 'Pasal',
                        'teks' => $bt['isi'] ?? '',
                    ];
                }
            }
            $preambleRegex = '/(Ketentuan\s+Pasal\s+.*?\s+diubah\s+sehingga\s+berbunyi\s+sebagai\s+berikut:)/is';
            
            for ($i = 0; $i < count($chunks); $i++) {
                if (isset($chunks[$i]['teks'])) {
                    $currTipe = strtoupper($chunks[$i]['tipe'] ?? '');
                    if (preg_match($preambleRegex, $chunks[$i]['teks'], $matches)) {
                        $preamble = $matches[1];
                        $remaining = trim(preg_replace($preambleRegex, '', $chunks[$i]['teks']));
                        // Hanya pindahkan jika chunk ini BUKAN pasal (misal teks pengantar terpisah), 
                        // atau teksnya HANYA berisi kalimat pengantar tersebut tanpa isi pasal.
                        if (($currTipe !== 'PASAL' && $currTipe !== 'PASAL_PERUBAHAN') || empty($remaining)) {
                            $chunks[$i]['teks'] = $remaining;
                            for ($j = $i + 1; $j < count($chunks); $j++) {
                                $nextTipe = strtoupper($chunks[$j]['tipe'] ?? '');
                                if ($nextTipe === 'PASAL' || $nextTipe === 'PASAL_PERUBAHAN') {
                                    $chunks[$j]['teks'] = $preamble . "\n\n" . ($chunks[$j]['teks'] ?? '');
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            $maxPasalNum = 0;
            $inPenjelasan = false;

            // In-memory indexing & state adaptif untuk mendeteksi pasal perubahan & hierarki
            $pasalMapByLabel = [];              // [label => pasalId, nomorPasal => pasalId]
            // Tidak di-reset saat ganti BAB: dipakai untuk mencari pasal yang
            // dijelaskan pada bagian PENJELASAN tanpa query berulang.
            $pasalIdsByLabel = [];
            $activeContainer = null;            // ['id' => ..., 'label' => ..., 'nomor' => ..., 'num' => ..., 'target' => ...]
            $childPasalsDetected = [];          // [['pasal' => $pasal, 'containerId' => ...]]
            $targetPeraturanByContainerId = []; // [containerPasalId => $targetPeraturanModel]

            foreach ($chunks as $chunk) {
                $tipe = strtoupper($chunk['tipe'] ?? '');
                $bagianDokumen = strtoupper($chunk['bagian_dokumen'] ?? '');

                // Struktur Dokumen (Bab, Bagian, Paragraf)
                if (in_array($tipe, ['BAB', 'BAGIAN', 'PARAGRAF'])) {
                    // Jika masuk Bab Ketentuan Penutup atau Ketentuan Peralihan, reset kontainer perubahan
                    $chunkJudul = strtoupper($chunk['teks'] ?? ($chunk['label'] ?? ''));
                    if (str_contains($chunkJudul, 'PENUTUP') || str_contains($chunkJudul, 'PERALIHAN')) {
                        $activeContainer = null;
                    }

                    $parentId = null;
                    if ($tipe === 'BAGIAN') $parentId = $currentStrukturIds['BAB'];
                    if ($tipe === 'PARAGRAF') $parentId = $currentStrukturIds['BAGIAN'] ?? $currentStrukturIds['BAB'];

                    $struktur = StrukturDokumen::create([
                        'peraturan_id'   => $peraturan->id,
                        'tipe_struktur'  => $tipe,
                        'label'          => $chunk['label'] ?? 'Tanpa Label',
                        'judul_struktur' => $chunk['teks'] ?? null,
                        'parent_id'      => $parentId,
                    ]);

                    if (array_key_exists($tipe, $currentStrukturIds)) {
                        $currentStrukturIds[$tipe] = $struktur->id;
                        if ($tipe === 'BAB') {
                            $currentStrukturIds['BAGIAN'] = null;
                            $currentStrukturIds['PARAGRAF'] = null;
                            $activeContainer = null;
                            $pasalMapByLabel = [];
                        } elseif ($tipe === 'BAGIAN') {
                            $currentStrukturIds['PARAGRAF'] = null;
                        }
                    }
                    continue;
                }

                // Penjelasan Pasal eksplisit
                if ($bagianDokumen === 'PENJELASAN' || $tipe === 'PENJELASAN_PASAL') {
                    $pasalTerkaitId = $this->resolvePasalId(
                        $pasalIdsByLabel,
                        (string) ($chunk['label'] ?? ''),
                        $peraturan->id,
                        $pasalLookupLoaded
                    );

                    if ($pasalTerkaitId) {
                        $penjelasanRows[$pasalTerkaitId] = [
                            'peraturan_id' => $peraturan->id,
                            'pasal_id' => $pasalTerkaitId,
                            'isi_penjelasan' => (string) ($chunk['teks'] ?? ''),
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                    continue;
                }

                // Isi Pasal (PASAL atau PASAL_PERUBAHAN)
                if ($tipe === 'PASAL' || $tipe === 'PASAL_PERUBAHAN') {
                    $pasalLabel = $chunk['label'] ?? 'Tanpa Label';
                    $nomorPasal = trim(str_ireplace('Pasal', '', $pasalLabel));
                    $nomorPasal = $nomorPasal ?: $pasalLabel;
                    $teksPasal = $chunk['teks'] ?? '';
                    $parentRef = $chunk['parent_pasal_perubahan'] ?? null;
                    $targetRef = $chunk['target_induk'] ?? null;

                    // 1. Deteksi apakah ini merupakan Container Pasal Pengubah
                    $isContainer = false;
                    $detectedTarget = null;

                    if ($tipe === 'PASAL_PERUBAHAN' && empty($parentRef)) {
                        $isContainer = true;
                    } elseif (!empty($targetRef) && empty($parentRef)) {
                        $isContainer = true;
                    } elseif (preg_match('/(?:beberapa\s+ketentuan\s+dalam|ketentuan\s+dalam\s+.*?\s+diubah\s+sebagai\s+berikut|(?:perubahan\s+atas|mengubah)\s+(?:undang|peraturan|perda))/iu', $teksPasal)) {
                        $isContainer = true;
                    }

                    if ($isContainer) {
                        $detectedTarget = $this->detectTargetPeraturan($teksPasal, $targetRef);
                    }

                    $parentPasalId = null;

                    // 2. Jika bukan kontainer, tentukan parent_pasal_id (child pasal)
                    if (!$isContainer) {
                        if (!empty($parentRef)) {
                            // Cek map memori terlebih dahulu (0ms query)
                            $parentPasalId = $pasalMapByLabel[$parentRef] ?? null;
                            if (!$parentPasalId) {
                                $cleanParent = trim(str_ireplace('Pasal', '', $parentRef));
                                $parentPasalId = $pasalMapByLabel[$cleanParent] ?? null;
                            }
                            if (!$parentPasalId) {
                                $parentPasalId = Pasal::where('peraturan_id', $peraturan->id)
                                    ->where(function ($q) use ($parentRef) {
                                        $clean = trim(str_ireplace('Pasal', '', $parentRef));
                                        $q->where('nomor_pasal', $parentRef)
                                          ->orWhere('nomor_pasal', $clean)
                                          ->orWhere('nomor_pasal', 'Pasal ' . $clean);
                                    })
                                    ->value('id');
                            }
                        } elseif ($activeContainer) {
                            // Heuristik adaptif: periksa apakah nomor pasal merestart / lebih kecil dari kontainer
                            $currNum = (int)preg_replace('/[^0-9]/', '', $nomorPasal);
                            $isChild = false;

                            if ($activeContainer['num'] > 0 && $currNum > 0 && $currNum < $activeContainer['num']) {
                                $isChild = true;
                            } elseif (preg_match('/^(?:angka|huruf)\s+/i', $pasalLabel)) {
                                $isChild = true;
                            } elseif (preg_match('/(?:diubah\s+sehingga\s+berbunyi|disisipkan|dihapus)/i', $teksPasal)) {
                                $isChild = true;
                            } elseif (preg_match('/^[IVXLCDM]+$/i', $activeContainer['nomor']) && $currNum > 0) {
                                $isChild = true;
                            }

                            if ($isChild) {
                                $parentPasalId = $activeContainer['id'];
                            } else {
                                $activeContainer = null;
                            }
                        }
                    }

                    // Heuristic penjelasan: hanya aktif jika bukan child pasal
                    if (!$parentPasalId && empty($parentRef)) {
                        if (preg_match('/Pasal\s+(\d+)/i', $pasalLabel, $matches)) {
                            $currentPasalNum = (int)$matches[1];
                            if ($maxPasalNum > 5 && $currentPasalNum < $maxPasalNum && $currentPasalNum <= 3) {
                                $inPenjelasan = true;
                            }
                            if (!$inPenjelasan && $currentPasalNum > $maxPasalNum) {
                                $maxPasalNum = $currentPasalNum;
                            }
                        }
                    }

                    if ($inPenjelasan) {
                        $pasalTerkaitId = $this->resolvePasalId(
                            $pasalIdsByLabel,
                            $pasalLabel,
                            $peraturan->id,
                            $pasalLookupLoaded
                        );

                        if ($pasalTerkaitId) {
                            $penjelasanRows[$pasalTerkaitId] = [
                                'peraturan_id' => $peraturan->id,
                                'pasal_id' => $pasalTerkaitId,
                                'isi_penjelasan' => $teksPasal,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                        continue;
                    }

                    $strukturId = $currentStrukturIds['PARAGRAF'] 
                                ?? $currentStrukturIds['BAGIAN'] 
                                ?? $currentStrukturIds['BAB'] 
                                ?? null;

                    $pasal = Pasal::create([
                        'peraturan_id'    => $peraturan->id,
                        'struktur_id'     => $strukturId,
                        'parent_pasal_id' => $parentPasalId,
                        'nomor_pasal'     => $pasalLabel, 
                        'isi_pasal'       => $teksPasal,           
                        'urutan'          => $urutan++,                        
                    ]);

                    // Indexing untuk child lookups
                    $pasalMapByLabel[$pasalLabel] = $pasal->id;
                    $pasalMapByLabel[$nomorPasal] = $pasal->id;
                    $pasalMapByLabel['Pasal ' . $nomorPasal] = $pasal->id;

                    $pasalIdsByLabel[$pasalLabel] = $pasal->id;
                    $pasalIdsByLabel[$nomorPasal] = $pasal->id;
                    $pasalIdsByLabel['Pasal ' . $nomorPasal] = $pasal->id;

                    if ($isContainer) {
                        $cNum = (int)preg_replace('/[^0-9]/', '', $nomorPasal);
                        $activeContainer = [
                            'id'     => $pasal->id,
                            'label'  => $pasalLabel,
                            'nomor'  => $nomorPasal,
                            'num'    => $cNum,
                            'target' => $detectedTarget,
                        ];

                        if ($detectedTarget) {
                            $targetNomor = $detectedTarget['nomor'] ?? null;
                            $targetTahun = $detectedTarget['tahun'] ?? null;
                            $targetJenisId = $this->getJenisId($detectedTarget['standardId']);
                            $targetPeraturan = $this->findTargetPeraturan($detectedTarget['standardId'], $targetNomor, $targetTahun, $targetJenisId);

                            if (!$targetPeraturan) {
                                $targetPeraturan = Peraturan::create([
                                    'unique_id'          => $detectedTarget['standardId'],
                                    'judul'              => $detectedTarget['namaLengkap'] ?: ('Menunggu import dokumen: ' . $detectedTarget['standardId']),
                                    'tahun'              => $targetTahun,
                                    'nomor'              => $targetNomor,
                                    'jenis_peraturan_id' => $targetJenisId,
                                    'status_id'          => $status->id,
                                ]);
                            }

                            $targetPeraturanByContainerId[$pasal->id] = $targetPeraturan;

                            // Otomatis catat law_relation 'mengubah' jika belum ada
                            $this->queueRelation(
                                $lawRelationRows,
                                $peraturan->id,
                                $targetPeraturan->id,
                                $this->relationTypeId('mengubah')
                            );
                        }
                    } elseif ($parentPasalId) {
                        $childPasalsDetected[] = [
                            'pasal'       => $pasal,
                            'containerId' => $parentPasalId,
                        ];
                    }
                }
            }

            // 4. RELASI DOKUMEN: Law Relations
            if (isset($data['relasi'])) {
                $tipeRelasiArray = ['dicabut_oleh', 'mencabut', 'diubah_oleh', 'mengubah', 'mencabut_sebagian'];
                
                foreach ($tipeRelasiArray as $relTypeStr) {
                    if (!empty($data['relasi'][$relTypeStr])) {
                        $relTypeId = $this->relationTypeId($relTypeStr);

                        foreach ($data['relasi'][$relTypeStr] as $targetUniqueId) {
                            $targetNomor = $this->ekstrakNomor($targetUniqueId, $targetUniqueId);
                            $targetTahun = $this->ekstrakTahun($targetUniqueId);
                            $targetJenisId = $this->getJenisId($targetUniqueId);

                            $targetPeraturan = $this->findTargetPeraturan($targetUniqueId, $targetNomor, $targetTahun, $targetJenisId);

                            if (!$targetPeraturan) {
                                $targetPeraturan = Peraturan::create([
                                    'unique_id' => $targetUniqueId,
                                    'judul' => 'Menunggu import dokumen: ' . $targetUniqueId,
                                    'tahun' => $targetTahun,
                                    'nomor' => $targetNomor,
                                    'jenis_peraturan_id' => $targetJenisId,
                                    'status_id' => $status->id
                                ]);
                            }
                            
                            $this->queueRelation(
                                $lawRelationRows,
                                $peraturan->id,
                                $targetPeraturan->id,
                                $relTypeId
                            );
                        }
                    }
                }

                // Relasi Khusus: Mengingat
                if (!empty($data['relasi']['mengingat'])) {
                    $relTypeMengingatId = $this->relationTypeId('mengingat');
                    foreach ($data['relasi']['mengingat'] as $ingat) {
                        $targetUniqueId = $ingat['standard_id'];
                        $targetNomor = $this->ekstrakNomor($targetUniqueId, $targetUniqueId);
                        $targetTahun = $this->ekstrakTahun($targetUniqueId);
                        $targetJenisId = $this->getJenisId($targetUniqueId);

                        $targetPeraturan = $this->findTargetPeraturan($targetUniqueId, $targetNomor, $targetTahun, $targetJenisId);

                        if (!$targetPeraturan) {
                            $targetPeraturan = Peraturan::create([
                                'unique_id' => $targetUniqueId,
                                'judul' => isset($ingat['judul_referensi']) 
                                    ? ('Menunggu import dokumen: ' . $ingat['judul_referensi']) 
                                    : ('Menunggu import dokumen: ' . $targetUniqueId),
                                'tahun' => $targetTahun,
                                'nomor' => $targetNomor,
                                'jenis_peraturan_id' => $targetJenisId,
                                'status_id' => $status->id
                            ]);
                        }
                        
                        $this->queueRelation(
                            $lawRelationRows,
                            $peraturan->id,
                            $targetPeraturan->id,
                            $relTypeMengingatId
                        );
                    }
                }

                // 5. DETAIL PERUBAHAN: Pasal Perubahan
                $perubahanTypeId = $this->perubahanTypeId();
                $nomorUrut = 1;

                if (!empty($data['relasi']['detail_perubahan'])) {
                    foreach ($data['relasi']['detail_perubahan'] as $detail) {
                        $targetUniqueId = $detail['peraturan_induk'] ?? null;
                        if (!$targetUniqueId) continue;

                        $targetNomor = $this->ekstrakNomor($targetUniqueId, $targetUniqueId);
                        $targetTahun = $this->ekstrakTahun($targetUniqueId);
                        $targetJenisId = $this->getJenisId($targetUniqueId);

                        $targetPeraturan = $this->findTargetPeraturan($targetUniqueId, $targetNomor, $targetTahun, $targetJenisId);

                        if (!$targetPeraturan) {
                            $targetPeraturan = Peraturan::create([
                                'unique_id' => $targetUniqueId,
                                'judul' => 'Menunggu import dokumen: ' . $targetUniqueId,
                                'tahun' => $targetTahun,
                                'nomor' => $targetNomor,
                                'jenis_peraturan_id' => $targetJenisId,
                                'status_id' => $status->id
                            ]);
                        }

                        // Cari container pasal pengubah untuk targetPeraturan ini
                        $containerPasalId = null;
                        foreach ($targetPeraturanByContainerId as $cId => $tModel) {
                            if ($tModel->id === $targetPeraturan->id) {
                                $containerPasalId = $cId;
                                break;
                            }
                        }

                        if (!$containerPasalId) {
                            $parentHint = $detail['parent_pasal_perubahan'] ?? null;
                            if ($parentHint && isset($pasalMapByLabel[$parentHint])) {
                                $containerPasalId = $pasalMapByLabel[$parentHint];
                            } else {
                                $containerPasalId = Pasal::where('peraturan_id', $peraturan->id)
                                    ->whereNull('parent_pasal_id')
                                    ->where(function ($q) use ($targetUniqueId) {
                                        $q->where('isi_pasal', 'like', '%' . $targetUniqueId . '%')
                                          ->orWhere('isi_pasal', 'like', '%' . str_replace('-', ' ', $targetUniqueId) . '%');
                                    })
                                    ->value('id');
                            }
                        }

                        if ($containerPasalId && !empty($detail['pasal_diubah']) && is_array($detail['pasal_diubah'])) {
                            foreach ($detail['pasal_diubah'] as $pasalDiubahLabel) {
                                $rowKey = $containerPasalId.'|'.$targetPeraturan->id.'|'.$pasalDiubahLabel;

                                $pasalPerubahanRows[$rowKey] = [
                                    'pasal_romawi_id' => $containerPasalId,
                                    'target_peraturan_id' => $targetPeraturan->id,
                                    'target_nomor_pasal' => $pasalDiubahLabel,
                                    'perubahan_type_id' => $perubahanTypeId,
                                    'nomor_urut' => $nomorUrut++,
                                    'isi_perubahan' => 'Diubah oleh peraturan ini',
                                ];
                            }
                        }
                    }
                }
            }

            // 5.1 Autonomous Population: Jika ada child pasals yang terdeteksi terhubung ke container dengan targetPeraturan
            // Tetap berjalan walaupun data['relasi'] kosong dari file input
            if (!empty($childPasalsDetected)) {
                $perubahanTypeId = $this->perubahanTypeId();
                $nomorUrut = 1;

                foreach ($childPasalsDetected as $childInfo) {
                    $cId = $childInfo['containerId'];
                    if (isset($targetPeraturanByContainerId[$cId])) {
                        $targetPeraturan = $targetPeraturanByContainerId[$cId];
                        $targetNomorPasal = $childInfo['pasal']->nomor_pasal;
                        $rowKey = $cId.'|'.$targetPeraturan->id.'|'.$targetNomorPasal;

                        $pasalPerubahanRows[$rowKey] = [
                            'pasal_romawi_id' => $cId,
                            'target_peraturan_id' => $targetPeraturan->id,
                            'target_nomor_pasal' => $targetNomorPasal,
                            'perubahan_type_id' => $perubahanTypeId,
                            'nomor_urut' => $nomorUrut++,
                            'isi_perubahan' => 'Diubah oleh peraturan ini',
                        ];
                    }
                }
            }

            if (!empty($penjelasanRows)) {
                PenjelasanPasal::insert(array_values($penjelasanRows));
            }

            if (!empty($pasalPerubahanRows)) {
                PasalPerubahan::insert(array_values($pasalPerubahanRows));
            }

            if (!empty($lawRelationRows)) {
                LawRelation::upsert(
                    array_values($lawRelationRows),
                    ['from_peraturan_id', 'to_peraturan_id', 'relation_type_id'],
                    ['deleted_at']
                );
            }

            DB::commit();
            return $peraturan;

        } catch (\Throwable $e) {
            DB::rollBack();
            $msg = $e->getMessage();
            if (!str_starts_with($msg, 'Gagal mengimpor:')) {
                $msg = "Gagal mengimpor: " . $msg;
            }
            // Bungkus ulang sebagai RuntimeException supaya TypeError/Error tetap
            // terlaporkan sebagai kegagalan impor, bukan mematikan proses batch.
            throw new \RuntimeException($msg, 0, $e);
        }
    }

    private function queueRelation(array &$rows, int $fromId, int $toId, int $relationTypeId): void
    {
        $rows[$fromId.'|'.$toId.'|'.$relationTypeId] = [
            'from_peraturan_id' => $fromId,
            'to_peraturan_id' => $toId,
            'relation_type_id' => $relationTypeId,
            'deleted_at' => null,
        ];
    }

    /**
     * Cari id pasal berdasarkan label. Map in-memory dipakai lebih dulu supaya
     * bagian penjelasan tidak melakukan satu query untuk setiap pasal.
     */
    private function resolvePasalId(
        array &$pasalIdsByLabel,
        string $label,
        int $peraturanId,
        bool &$lookupLoaded
    ): ?int {
        if (! $lookupLoaded) {
            // Satu query untuk seluruh pasal dokumen ini, bukan satu query per
            // baris penjelasan.
            foreach (Pasal::where('peraturan_id', $peraturanId)->get(['id', 'nomor_pasal']) as $pasal) {
                $pasalIdsByLabel[$pasal->nomor_pasal] ??= $pasal->id;
            }

            $lookupLoaded = true;
        }

        $cleanLabel = trim(str_ireplace('Pasal', '', $label));

        $id = $pasalIdsByLabel[$label]
            ?? $pasalIdsByLabel[$cleanLabel]
            ?? $pasalIdsByLabel['Pasal '.$cleanLabel]
            ?? null;

        return $id ? (int) $id : null;
    }

    private function relationTypeId(string $namaRelasi): int
    {
        return $this->relationTypeCache[$namaRelasi] ??= RelationType::firstOrCreate(
            ['nama_relasi' => $namaRelasi]
        )->id;
    }

    private function perubahanTypeId(): int
    {
        return $this->perubahanTypeCache['diubah'] ??= PerubahanType::firstOrCreate(
            ['nama_perubahan' => 'diubah']
        )->id;
    }

    /**
     * Apakah jenis peraturan ini terikat wilayah tertentu.
     *
     * Kode untuk peraturan daerah tidak seragam: metadata OCR bisa menghasilkan
     * PERDA, PERBUP, PB, PWK, PG, bahkan nama panjang seperti "Peraturan Bupati".
     * Semua variasi itu harus diperlakukan sama agar pencocokan lintas daerah
     * tidak pernah mengabaikan instansi.
     */
    private function isRegionalJenis(JenisPeraturan $jenis): bool
    {
        $kode = strtoupper(trim((string) $jenis->kode));
        $nama = strtolower(trim((string) $jenis->nama));

        $kodeRegional = ['PERDA', 'PERBUP', 'PERWAKO', 'PERWALI', 'PERGUB', 'PB', 'PW', 'PWK', 'PG', 'PERDAPROV'];

        if (in_array($kode, $kodeRegional, true)) {
            return true;
        }

        foreach (['daerah', 'bupati', 'wali kota', 'walikota', 'gubernur', 'provinsi', 'kabupaten'] as $kataKunci) {
            if (str_contains($nama, $kataKunci)) {
                return true;
            }
        }

        return false;
    }

    private function formatTanggal($tanggal)
    {
        if (empty($tanggal) || $tanggal === '-') return null;
        
        $bulanIndo = [
            'Januari' => '01', 'Februari' => '02', 'Maret' => '03', 'April' => '04',
            'Mei' => '05', 'Juni' => '06', 'Juli' => '07', 'Agustus' => '08',
            'September' => '09', 'Oktober' => '10', 'November' => '11', 'Desember' => '12'
        ];

        $parts = explode(' ', $tanggal);
        if (count($parts) >= 3 && isset($bulanIndo[$parts[1]])) {
            return $parts[2] . '-' . $bulanIndo[$parts[1]] . '-' . str_pad($parts[0], 2, '0', STR_PAD_LEFT);
        }
        return null;
    }

    public function ekstrakTahun($uniqueId)
    {
        if (empty($uniqueId)) return date('Y');
        $parts = explode('-', $uniqueId);
        $tahun = end($parts);
        
        if (is_numeric($tahun) && strlen($tahun) === 4) {
            return $tahun;
        }
        return '0000';
    }

    public function ekstrakNomor($teks, $uniqueId = '')
    {
        if (preg_match('/(?:Nomor|No\.?)\s*(\d+)/i', $teks, $matches)) {
            return $matches[1];
        }
        if (!empty($uniqueId) && preg_match('/nomor_(\d+)/i', $uniqueId, $matches)) {
            return $matches[1];
        }
        if (!empty($uniqueId) && preg_match('/-(\d+)-\d{4}$/', $uniqueId, $matches)) {
            return $matches[1];
        }
        return null;
    }

    public function getJenisId($uniqueId)
    {
        $uniqueLower = strtolower($uniqueId);
        $kode = 'Lainnya';

        if (str_contains($uniqueLower, 'inpres') || str_contains($uniqueLower, 'instruksi-presiden')) {
            $kode = 'INPRES';
        } elseif (str_contains($uniqueLower, 'perda') || str_contains($uniqueLower, 'peraturan-daerah')) {
            $kode = 'PERDA';
        } elseif (str_contains($uniqueLower, 'perpres') || str_contains($uniqueLower, 'peraturan-presiden')) {
            $kode = 'PERPRES';
        } elseif (str_contains($uniqueLower, 'perpu') || str_contains($uniqueLower, 'perppu') || str_contains($uniqueLower, 'peraturan-pemerintah-pengganti')) {
            $kode = 'PERPPU';
        } elseif (str_contains($uniqueLower, 'uudrt') || str_contains($uniqueLower, 'uu-darurat') || str_contains($uniqueLower, 'undang-undang-darurat')) {
            $kode = 'UU Darurat';
        } elseif (str_contains($uniqueLower, 'uud') || str_contains($uniqueLower, 'undang-undang-dasar')) {
            $kode = 'UUD';
        } elseif (str_contains($uniqueLower, 'undang-undang') || str_starts_with($uniqueLower, 'uu-') || str_contains($uniqueLower, '-uu-')) {
            $kode = 'UU';
        } elseif (str_contains($uniqueLower, 'peraturan-pemerintah') || str_starts_with($uniqueLower, 'pp-')) {
            $kode = 'PP';
        } elseif (str_contains($uniqueLower, 'peraturan-menteri') || str_contains($uniqueLower, 'permen')) {
            $kode = 'PERMEN';
        } elseif (str_contains($uniqueLower, 'staatsblad')) {
            $kode = 'STAATSBLAD';
        }

        $cacheKey = strtolower($kode);
        if (isset($this->jenisIdCache[$cacheKey])) {
            return $this->jenisIdCache[$cacheKey];
        }

        $jenis = JenisPeraturan::whereRaw('LOWER(kode) = ?', [$cacheKey])
            ->orWhereRaw('LOWER(nama) = ?', [$cacheKey])
            ->first();

        if (!$jenis) {
            $jenis = JenisPeraturan::create(['kode' => $kode, 'nama' => $kode]);
        }

        return $this->jenisIdCache[$cacheKey] = $jenis->id;
    }

    public function findTargetPeraturan(string $targetUniqueId, ?string $targetNomor, ?string $targetTahun, $targetJenisId)
    {
        if (isset($this->targetPeraturanCache[$targetUniqueId])) {
            return $this->targetPeraturanCache[$targetUniqueId];
        }

        $targetPeraturan = Peraturan::where('unique_id', $targetUniqueId)->first();

        if (!$targetPeraturan && !empty($targetNomor) && !empty($targetTahun)) {
            $targetPeraturan = Peraturan::where('jenis_peraturan_id', $targetJenisId)
                                        ->where('nomor', $targetNomor)
                                        ->where('tahun', $targetTahun)
                                        ->first();
        }

        if (!$targetPeraturan) {
            if (preg_match('/uud-1945-perubahan-(\d+)/i', $targetUniqueId, $m)) {
                $mapNum = [1 => 'pertama', 2 => 'kedua', 3 => 'ketiga', 4 => 'keempat'];
                $word = $mapNum[(int)$m[1]] ?? '';
                if ($word) {
                    $targetPeraturan = Peraturan::whereRaw('LOWER(judul) LIKE ?', ['%perubahan ' . $word . '%1945%'])
                        ->orWhere('unique_id', 'like', "%perubahan_{$word}_undang-undang_dasar%")
                        ->first();
                }
            } elseif (strtolower($targetUniqueId) === 'uud-1945') {
                $targetPeraturan = Peraturan::where('unique_id', 'undang-undang_dasar_negara_republik_indonesia_tahun_1945')
                    ->orWhereRaw('LOWER(judul) LIKE ?', ['%undang-undang dasar negara republik indonesia tahun 1945%'])
                    ->first();
            }
        }

        if ($targetPeraturan) {
            $this->targetPeraturanCache[$targetUniqueId] = $targetPeraturan;
        }

        return $targetPeraturan;
    }

    /**
     * Deteksi dan ekstrak informasi peraturan target dari teks pasal perubah atau atribut explicit
     *
     * @param string|null $teks
     * @param string|null $explicitTarget
     * @return array|null
     */
    public function detectTargetPeraturan(?string $teks, ?string $explicitTarget = null): ?array
    {
        if ($explicitTarget && trim($explicitTarget)) {
            $cleanTarget = trim($explicitTarget);
            // Format slug umum: undang-undang-26-2007, peraturan-pemerintah-2-2022, perda-3-2015
            if (preg_match('/^([a-z0-9_-]+)-(\d+)-(\d{4})$/i', $cleanTarget, $m)) {
                $typeSlug = strtolower(str_replace('_', '-', $m[1]));
                $prefix = 'UU';
                if (str_contains($typeSlug, 'daerah') || str_contains($typeSlug, 'perda')) $prefix = 'PERDA';
                elseif (str_contains($typeSlug, 'pemerintah') || $typeSlug === 'pp') $prefix = 'PP';
                elseif (str_contains($typeSlug, 'pengganti') || str_contains($typeSlug, 'perpu')) $prefix = 'PERPPU';
                elseif (str_contains($typeSlug, 'presiden') || $typeSlug === 'perpres') $prefix = 'PERPRES';
                elseif (str_contains($typeSlug, 'menteri') || str_contains($typeSlug, 'permen')) $prefix = 'PERMEN';

                return [
                    'standardId'   => $cleanTarget,
                    'labelSingkat' => "{$prefix} {$m[2]}/{$m[3]}",
                    'namaLengkap'  => str_replace('-', ' ', ucwords($cleanTarget)),
                    'jenis'        => $m[1],
                    'nomor'        => $m[2],
                    'tahun'        => $m[3],
                ];
            }
        }

        if (!$teks) return null;

        $pattern = '/(?:ketentuan\s+dalam\s+|perubahan\s+atas\s+|mengubah\s+)?(Peraturan[-_\s]?Daerah(?:\s+(?:Provinsi|Kabupaten|Kota)[^0-9\n,]+)?|Perda|Peraturan[-_\s]?Gubernur|Peraturan[-_\s]?Bupati|Peraturan[-_\s]?Wali[-_\s]?Kota|Pergub|Perbup|Perwali|Undang[-_\s]?Undang(?:\s+Republik\s+Indonesia)?|Peraturan[-_\s]?Pemerintah\s+Pengganti\s+Undang[-_\s]?Undang|Peraturan[-_\s]?Pemerintah|Peraturan[-_\s]?Presiden|Peraturan[-_\s]?Menteri[^0-9\n,]*|Instruksi[-_\s]?Presiden|Keputusan[-_\s]?Presiden)\s+Nomor\s+([A-Za-z0-9\/\.\-]+)\s+Tahun\s+(\d{4})(?:\s+tentang\s+([^,.\n()]+))?/iu';

        if (preg_match($pattern, $teks, $m)) {
            $rawJenis = trim($m[1]);
            $nomor = trim($m[2]);
            $tahun = trim($m[3]);
            $tentang = isset($m[4]) ? trim($m[4]) : '';
            $tentang = preg_replace('/\s+(?:diubah\s+sebagai\s+berikut|sebagaimana\s+telah\s+diubah).*$/i', '', $tentang);
            $tentang = trim($tentang, " \t\n\r\0\x0B-:,.");

            $lowerJenis = strtolower($rawJenis);
            $prefix = 'UU';
            $slugType = 'undang-undang';

            if (str_contains($lowerJenis, 'pengganti') || str_contains($lowerJenis, 'perpu')) {
                $prefix = 'PERPPU';
                $slugType = 'perppu';
            } elseif (str_contains($lowerJenis, 'daerah') || str_contains($lowerJenis, 'perda')) {
                $prefix = 'PERDA';
                $slugType = 'peraturan-daerah';
            } elseif (str_contains($lowerJenis, 'pemerintah') || str_contains($lowerJenis, 'pp')) {
                $prefix = 'PP';
                $slugType = 'peraturan-pemerintah';
            } elseif (str_contains($lowerJenis, 'presiden') || str_contains($lowerJenis, 'perpres')) {
                $prefix = 'PERPRES';
                $slugType = 'peraturan-presiden';
            } elseif (str_contains($lowerJenis, 'menteri') || str_contains($lowerJenis, 'permen')) {
                $prefix = 'PERMEN';
                $slugType = 'peraturan-menteri';
            }

            $standardId = "{$slugType}-{$nomor}-{$tahun}";
            $labelSingkat = "{$prefix} {$nomor}/{$tahun}";
            $namaLengkap = "{$rawJenis} Nomor {$nomor} Tahun {$tahun}" . ($tentang ? " tentang {$tentang}" : '');

            return [
                'standardId'   => $standardId,
                'labelSingkat' => $labelSingkat,
                'namaLengkap'  => $namaLengkap,
                'jenis'        => $rawJenis,
                'nomor'        => $nomor,
                'tahun'        => $tahun,
                'tentang'      => $tentang,
            ];
        }

        return null;
    }
}