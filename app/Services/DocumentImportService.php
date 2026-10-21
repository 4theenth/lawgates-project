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
            $upperTipe = strtoupper($tipePeraturan);

            // Alias map untuk normalisasi jenis peraturan populer
            $aliasMap = [
                'PERDA' => 'Peraturan Daerah',
                'P' => 'Peraturan Daerah',
                'PERPRES' => 'Peraturan Presiden',
                'PERMEN' => 'Peraturan Menteri',
                'PP' => 'Peraturan Pemerintah',
                'PERPPU' => 'Peraturan Pemerintah Pengganti Undang-Undang',
                'PERPU' => 'Peraturan Pemerintah Pengganti Undang-Undang',
                'UU' => 'Undang-Undang',
                'UUD' => 'Undang-Undang Dasar',
                'KEPPRES' => 'Keputusan Presiden',
                'STAATSBLAD' => 'Staatsblad',
                'TAP MPR' => 'Ketetapan MPR',
                'TAP MPRS' => 'Ketetapan MPRS',
            ];

            $namaTarget = $aliasMap[$upperTipe] ?? $tipePeraturan;

            $jenis = JenisPeraturan::whereRaw('LOWER(nama) = ?', [strtolower($namaTarget)])
                ->orWhereRaw('LOWER(nama) = ?', [strtolower($tipePeraturan)])
                ->orWhereRaw('LOWER(kode) = ?', [strtolower($upperTipe)])
                ->orWhereRaw('LOWER(kode) = ?', [strtolower($tipePeraturan)])
                ->first();

            if (!$jenis) {
                // Tentukan kode dasar (jika singkatan/nama pendek, gunakan full uppercase-nya)
                if (strlen($upperTipe) <= 10 && preg_match('/^[A-Z0-9_-]+$/', $upperTipe)) {
                    $baseKode = $upperTipe;
                } else {
                    $words = preg_split('/[\s\-]+/', $tipePeraturan);
                    $initials = '';
                    foreach ($words as $w) {
                        if (!empty($w)) {
                            $initials .= strtoupper(substr($w, 0, 1));
                        }
                    }
                    $baseKode = substr($initials, 0, 10) ?: 'KAT';
                }

                // Pastikan kode benar-benar unik di tabel jenis_peraturan
                $kode = $baseKode;
                $counter = 1;
                while (JenisPeraturan::where('kode', $kode)->exists()) {
                    $suffix = (string) $counter;
                    $kode = substr($baseKode, 0, 10 - strlen($suffix)) . $suffix;
                    $counter++;
                }

                $jenis = JenisPeraturan::create([
                    'kode' => $kode,
                    'nama' => $namaTarget,
                ]);
            }

            $statusNama = $metadata['status'] ?? $metadata['status_peraturan'] ?? 'berlaku';
            $status = Status::firstOrCreate(
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
            
            // Cari peraturan yang ada berdasarkan unique_id ATAU standard_id (termasuk yang soft-delete)
            $queryPeraturan = Peraturan::withTrashed()->where(function($q) use ($idDokumen, $standardId) {
                $q->where('unique_id', $idDokumen);
                if ($standardId && $standardId !== $idDokumen) {
                    $q->orWhere('unique_id', $standardId);
                }
            });

            // Hanya cocokkan kombinasi nomor dan tahun JIKA nomor tidak kosong
            if (!empty($nomor) && !empty($tahun)) {
                $queryPeraturan->orWhere(function($query) use ($jenis, $nomor, $tahun) {
                    $query->where('jenis_peraturan_id', $jenis->id)
                          ->where('nomor', $nomor)
                          ->where('tahun', $tahun);
                });
            }

            $peraturan = $queryPeraturan->first();

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
                SubjekPeraturan::firstOrCreate(
                    ['nama' => trim($subjekNama)],
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
                'instansi'             => $metadata['pemrakarsa'] ?? null,
                'lokasi_daerah'        => $lokasiDaerah,
                'url_pdf'              => $metadata['sumber_dokumen'] ?? null,
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
                    if (preg_match($preambleRegex, $chunks[$i]['teks'], $matches)) {
                        $preamble = $matches[1];
                        // Remove preamble from current chunk
                        $chunks[$i]['teks'] = preg_replace($preambleRegex, '', $chunks[$i]['teks']);
                        // Clean up trailing whitespaces/newlines after removal
                        $chunks[$i]['teks'] = trim($chunks[$i]['teks']);
                        
                        // Append to the next PASAL chunk
                        for ($j = $i + 1; $j < count($chunks); $j++) {
                            if (strtoupper($chunks[$j]['tipe'] ?? '') === 'PASAL') {
                                $chunks[$j]['teks'] = $preamble . "\n\n" . ($chunks[$j]['teks'] ?? '');
                                break;
                            }
                        }
                    }
                }
            }

            $maxPasalNum = 0;
            $inPenjelasan = false;

            foreach ($chunks as $chunk) {
                $tipe = strtoupper($chunk['tipe'] ?? '');
                $bagianDokumen = strtoupper($chunk['bagian_dokumen'] ?? '');

                // Heuristic: Deteksi otomatis jika kita masuk ke bagian penjelasan 
                // dengan melihat apakah nomor pasal me-restart dari 1 setelah mencapai angka besar
                if ($tipe === 'PASAL' || $tipe === 'PASAL_PERUBAHAN') {
                    $pasalLabel = $chunk['label'] ?? ''; 
                    if (preg_match('/Pasal\s+(\d+)/i', $pasalLabel, $matches)) {
                        $currentPasalNum = (int)$matches[1];
                        // Jika kita sudah melihat pasal yang cukup besar (misal > 5) 
                        // lalu tiba-tiba melihat Pasal 1, 2, atau 3 lagi, berarti kita masuk PENJELASAN
                        if ($maxPasalNum > 5 && $currentPasalNum < $maxPasalNum && $currentPasalNum <= 3) {
                            $inPenjelasan = true;
                        }
                        if (!$inPenjelasan && $currentPasalNum > $maxPasalNum) {
                            $maxPasalNum = $currentPasalNum;
                        }
                    }
                }

                // Penjelasan Pasal (berdasarkan flag dari OCR atau dari Heuristic)
                if ($inPenjelasan || $bagianDokumen === 'PENJELASAN' || $tipe === 'PENJELASAN_PASAL') {
                    if ($tipe === 'PASAL' || $tipe === 'PASAL_PERUBAHAN' || $tipe === 'PENJELASAN_PASAL') {
                        $pasalTerkait = Pasal::where('peraturan_id', $peraturan->id)
                                             ->where('nomor_pasal', $chunk['label'])
                                             ->first();
                        
                        if ($pasalTerkait) {
                            PenjelasanPasal::updateOrCreate(
                                ['peraturan_id' => $peraturan->id, 'pasal_id' => $pasalTerkait->id],
                                ['isi_penjelasan' => $chunk['teks'] ?? null]
                            );
                        }
                    }
                    continue; 
                }

                // Isi Pasal
                if ($tipe === 'PASAL' || $tipe === 'PASAL_PERUBAHAN') {
                    $strukturId = $currentStrukturIds['PARAGRAF'] 
                                ?? $currentStrukturIds['BAGIAN'] 
                                ?? $currentStrukturIds['BAB'] 
                                ?? null;

                    $parentPasalId = null;
                    if (!empty($chunk['parent_pasal_perubahan'])) {
                        $parentPasal = Pasal::where('peraturan_id', $peraturan->id)
                                            ->where('nomor_pasal', $chunk['parent_pasal_perubahan'])
                                            ->first();
                        if ($parentPasal) {
                            $parentPasalId = $parentPasal->id;
                        }
                    }

                    Pasal::create([
                        'peraturan_id'    => $peraturan->id,
                        'struktur_id'     => $strukturId,
                        'parent_pasal_id' => $parentPasalId,
                        'nomor_pasal'     => $chunk['label'] ?? 'Tanpa Label', 
                        'isi_pasal'       => $chunk['teks'] ?? null,           
                        'urutan'          => $urutan++,                        
                    ]);
                } 
                // Struktur Dokumen (Bab, Bagian, dst)
                else {
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
                        } elseif ($tipe === 'BAGIAN') {
                            $currentStrukturIds['PARAGRAF'] = null;
                        }
                    }
                }
            }

            // 4. RELASI DOKUMEN: Law Relations
            if (isset($data['relasi'])) {
                $tipeRelasiArray = ['dicabut_oleh', 'mencabut', 'diubah_oleh', 'mengubah', 'mencabut_sebagian'];
                
                foreach ($tipeRelasiArray as $relTypeStr) {
                    if (!empty($data['relasi'][$relTypeStr])) {
                        $relType = RelationType::firstOrCreate(['nama_relasi' => $relTypeStr]);
                        
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
                            
                            LawRelation::updateOrCreate([
                                'from_peraturan_id' => $peraturan->id, 
                                'to_peraturan_id'   => $targetPeraturan->id,
                                'relation_type_id'  => $relType->id
                            ]);
                        }
                    }
                }

                // Relasi Khusus: Mengingat
                if (!empty($data['relasi']['mengingat'])) {
                    $relTypeMengingat = RelationType::firstOrCreate(['nama_relasi' => 'mengingat']);
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
                        
                        LawRelation::updateOrCreate([
                            'from_peraturan_id' => $peraturan->id,
                            'to_peraturan_id'   => $targetPeraturan->id,
                            'relation_type_id'  => $relTypeMengingat->id,
                        ]);
                    }
                }

                // 5. DETAIL PERUBAHAN: Pasal Perubahan
                if (!empty($data['relasi']['detail_perubahan'])) {
                    $perubahanType = PerubahanType::firstOrCreate(['nama_perubahan' => 'diubah']); 
                    
                    $nomorUrut = 1;
                    foreach ($data['relasi']['detail_perubahan'] as $detail) {
                        $targetUniqueId = $detail['peraturan_induk'];
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

                        $pasalRomawi = Pasal::where('peraturan_id', $peraturan->id)
                                            ->where('nomor_pasal', $detail['parent_pasal_perubahan'] ?? '')
                                            ->first();

                        if ($pasalRomawi) {
                            foreach ($detail['pasal_diubah'] as $pasalDiubahLabel) {
                                PasalPerubahan::updateOrCreate(
                                    [
                                        'pasal_romawi_id'     => $pasalRomawi->id, 
                                        'target_peraturan_id' => $targetPeraturan->id, 
                                        'target_nomor_pasal'  => $pasalDiubahLabel,
                                    ],
                                    [
                                        'perubahan_type_id'   => $perubahanType->id,
                                        'nomor_urut'          => $nomorUrut++,
                                        'isi_perubahan'       => 'Menunggu pemetaan teks',
                                    ]
                                );
                            }
                        }
                    }
                }
            }

            DB::commit();
            return $peraturan;

        } catch (\Exception $e) {
            DB::rollBack();
            $msg = $e->getMessage();
            if (!str_starts_with($msg, 'Gagal mengimpor:')) {
                $msg = "Gagal mengimpor: " . $msg;
            }
            throw new \Exception($msg);
        }
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

    private function ekstrakTahun($uniqueId)
    {
        if (empty($uniqueId)) return date('Y');
        $parts = explode('-', $uniqueId);
        $tahun = end($parts);
        
        if (is_numeric($tahun) && strlen($tahun) === 4) {
            return $tahun;
        }
        return '0000';
    }

    private function ekstrakNomor($teks, $uniqueId = '')
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

    private function getJenisId($uniqueId)
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

        $jenis = \App\Models\JenisPeraturan::whereRaw('LOWER(kode) = ?', [strtolower($kode)])
            ->orWhereRaw('LOWER(nama) = ?', [strtolower($kode)])
            ->first();

        if (!$jenis) {
            $jenis = \App\Models\JenisPeraturan::create(['kode' => $kode, 'nama' => $kode]);
        }
        return $jenis->id;
    }

    private function findTargetPeraturan(string $targetUniqueId, ?string $targetNomor, ?string $targetTahun, $targetJenisId)
    {
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

        return $targetPeraturan;
    }
}