<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
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

class ImportOcrJson extends Command
{
    protected $signature = 'import:ocr {file}';
    protected $description = 'Import JSON OCR komprehensif ke PostgreSQL';

    public function handle()
    {
        $filePath = storage_path('app/' . $this->argument('file'));
        
        if (!File::exists($filePath)) {
            $this->error("File tidak ditemukan!");
            return;
        }

        $json = File::get($filePath);
        $data = json_decode($json, true);

        DB::beginTransaction();
        try {
            // 1. METADATA: Jenis & Status
            $jenis = JenisPeraturan::firstOrCreate(
                ['kode' => $data['metadata']['tipe_peraturan']], 
                ['nama' => $data['metadata']['tipe_peraturan']]
            );

            $status = Status::firstOrCreate(
                ['nama_status' => $data['metadata']['status']]
            );

            // 2. METADATA: Peraturan Induk
            $peraturan = Peraturan::updateOrCreate(
                ['unique_id' => $data['metadata']['id_dokumen']], 
                [
                    'judul'                => $data['metadata']['judul'],
                    'jenis_peraturan_id'   => $jenis->id,
                    'status_id'            => $status->id,
                    'tahun'                => $data['metadata']['tahun'] ?? $this->ekstrakTahun($data['metadata']['id_dokumen']),
                    'nomor'                => $this->ekstrakNomor($data['metadata']['judul'] ?? '', $data['metadata']['id_dokumen'] ?? ''),
                    'tempat_penetapan'     => $data['metadata']['tempat_penetapan'] ?? null,
                    'tanggal_penetapan'    => $this->formatTanggal($data['metadata']['tanggal_penetapan'] ?? null),
                    'tanggal_pengundangan' => $this->formatTanggal($data['metadata']['tanggal_pengundangan'] ?? null),
                    'tanggal_berlaku'      => $this->formatTanggal($data['metadata']['tanggal_berlaku'] ?? null),
                    'instansi'             => $data['metadata']['pemrakarsa'] ?? null,
                    'url_pdf'              => $data['metadata']['sumber_dokumen'] ?? null,
                ]
            );

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
            foreach ($data['chunks'] as $chunk) {
                $tipe = strtoupper($chunk['tipe'] ?? '');
                $bagianDokumen = strtoupper($chunk['bagian_dokumen'] ?? '');

                // Penjelasan Pasal
                if ($bagianDokumen === 'PENJELASAN' && $tipe === 'PASAL') {
                    $pasalTerkait = Pasal::where('peraturan_id', $peraturan->id)
                                         ->where('nomor_pasal', $chunk['label'])
                                         ->first();
                    
                    if ($pasalTerkait) {
                        PenjelasanPasal::updateOrCreate(
                            ['peraturan_id' => $peraturan->id, 'pasal_id' => $pasalTerkait->id],
                            ['isi_penjelasan' => $chunk['teks'] ?? null]
                        );
                    }
                    continue; 
                }

                // Isi Pasal
                if ($tipe === 'PASAL') {
                    $strukturId = $currentStrukturIds['PARAGRAF'] 
                               ?? $currentStrukturIds['BAGIAN'] 
                               ?? $currentStrukturIds['BAB'] 
                               ?? null;

                    Pasal::create([
                        'peraturan_id' => $peraturan->id,
                        'struktur_id'  => $strukturId,
                        'nomor_pasal'  => $chunk['label'] ?? 'Tanpa Label', 
                        'isi_pasal'    => $chunk['teks'] ?? null,           
                        'urutan'       => $urutan++,                        
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

                            $targetPeraturan = Peraturan::where('unique_id', $targetUniqueId)->first();

                            if (!$targetPeraturan) {
                                $targetPeraturan = Peraturan::where('jenis_peraturan_id', $targetJenisId)
                                                            ->where('nomor', $targetNomor)
                                                            ->where('tahun', $targetTahun)
                                                            ->first();
                            }

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

                        $targetPeraturan = Peraturan::where('unique_id', $targetUniqueId)->first();

                        if (!$targetPeraturan) {
                            $targetPeraturan = Peraturan::where('jenis_peraturan_id', $targetJenisId)
                                                        ->where('nomor', $targetNomor)
                                                        ->where('tahun', $targetTahun)
                                                        ->first();
                        }

                        if (!$targetPeraturan) {
                            $targetPeraturan = Peraturan::create([
                                'unique_id' => $targetUniqueId,
                                'judul' => $ingat['judul_referensi'] ?? 'Menunggu import dokumen: ' . $targetUniqueId,
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

                        $targetPeraturan = Peraturan::where('unique_id', $targetUniqueId)->first();

                        if (!$targetPeraturan) {
                            $targetPeraturan = Peraturan::where('jenis_peraturan_id', $targetJenisId)
                                                        ->where('nomor', $targetNomor)
                                                        ->where('tahun', $targetTahun)
                                                        ->first();
                        }

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
            $this->info("Seluruh data hierarki berhasil diimpor dengan presisi tanpa tabrakan duplikat!");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Gagal mengimpor: " . $e->getMessage() . " pada baris " . $e->getLine());
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
        $kode = 'Lainnya';
        if (str_contains($uniqueId, 'undang-undang-')) {
            $kode = 'UU';
        } elseif (str_contains($uniqueId, 'peraturan-pemerintah-pengganti-')) {
            $kode = 'PERPPU';
        } elseif (str_contains($uniqueId, 'peraturan-pemerintah-')) {
            $kode = 'PP';
        } elseif (str_contains($uniqueId, 'peraturan-presiden-')) {
            $kode = 'PERPRES';
        } elseif (str_contains($uniqueId, 'staatsblad-')) {
            $kode = 'STAATSBLAD';
        }

        $jenis = \App\Models\JenisPeraturan::firstOrCreate(['kode' => $kode], ['nama' => $kode]);
        return $jenis->id;
    }
}