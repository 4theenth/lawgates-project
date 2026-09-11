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
                    'tahun'                => $data['metadata']['tahun'] ?? null,
                    'tempat_penetapan'     => $data['metadata']['tempat_penetapan'] ?? null,
                    'tanggal_penetapan'    => $data['metadata']['tanggal_penetapan'] ?? null,
                    'tanggal_pengundangan' => $data['metadata']['tanggal_pengundangan'] ?? null,
                    'tanggal_berlaku'      => $data['metadata']['tanggal_berlaku'] ?? null,
                    'pemrakarsa'           => $data['metadata']['pemrakarsa'] ?? null,
                    'sumber_dokumen'       => $data['metadata']['sumber_dokumen'] ?? null,
                ]
            );

            // 3. CHUNKS: Hapus data lama agar tidak duplikat, lalu Insert tabel Pasal
            Pasal::where('peraturan_id', $peraturan->id)->delete();
            
            $urutan = 1;
            foreach ($data['chunks'] as $chunk) {
                Pasal::create([
                    'peraturan_id' => $peraturan->id,
                    'nomor_pasal'  => $chunk['label'] ?? 'Tanpa Label', 
                    'isi_pasal'    => $chunk['teks'] ?? null,           
                    'urutan'       => $urutan++,                        
                ]);
            }

            // 4. RELASI DOKUMEN: Law Relations (Sesuai migrasi: from_peraturan_id & to_peraturan_id)
            if (isset($data['relasi'])) {
                $tipeRelasiArray = ['dicabut_oleh', 'mencabut', 'diubah_oleh', 'mengubah', 'mencabut_sebagian'];
                
                foreach ($tipeRelasiArray as $relTypeStr) {
                    if (!empty($data['relasi'][$relTypeStr])) {
                        $relType = RelationType::firstOrCreate(['nama_relasi' => $relTypeStr]);
                        
                        foreach ($data['relasi'][$relTypeStr] as $targetUniqueId) {
                            // Cari peraturan target berdasarkan unique_id-nya untuk mendapatkan ID-nya
                            $targetPeraturan = Peraturan::where('unique_id', $targetUniqueId)->first();
                            
                            if ($targetPeraturan) {
                                LawRelation::updateOrCreate([
                                    'from_peraturan_id' => $peraturan->id, 
                                    'to_peraturan_id'   => $targetPeraturan->id,
                                    'relation_type_id'  => $relType->id
                                ]);
                            }
                        }
                    }
                }

                // Relasi Khusus: Mengingat
                if (!empty($data['relasi']['mengingat'])) {
                    $relTypeMengingat = RelationType::firstOrCreate(['nama_relasi' => 'mengingat']);
                    foreach ($data['relasi']['mengingat'] as $ingat) {
                        $targetPeraturan = Peraturan::where('unique_id', $ingat['standard_id'])->first();
                        
                        if ($targetPeraturan) {
                            LawRelation::updateOrCreate([
                                'from_peraturan_id' => $peraturan->id,
                                'to_peraturan_id'   => $targetPeraturan->id,
                                'relation_type_id'  => $relTypeMengingat->id,
                            ]);
                        }
                    }
                }

                // 5. DETAIL PERUBAHAN: Pasal Perubahan
                if (!empty($data['relasi']['detail_perubahan'])) {
                    // Sesuaikan 'nama_perubahan' dengan kolom di tabel perubahan_types milikmu
                    $perubahanType = PerubahanType::firstOrCreate(['nama_perubahan' => 'diubah']); 
                    
                    $nomorUrut = 1;
                    foreach ($data['relasi']['detail_perubahan'] as $detail) {
                        
                        // 1. Cari ID numerik dari Peraturan Target berdasarkan unique_id JSON
                        $targetPeraturan = Peraturan::where('unique_id', $detail['peraturan_induk'])->first();
                        
                        // 2. Cari ID numerik dari Pasal Induk (Pasal Romawi/Pasal 48) di UU ini
                        $pasalRomawi = Pasal::where('peraturan_id', $peraturan->id)
                                            ->where('nomor_pasal', $detail['parent_pasal_perubahan'] ?? '')
                                            ->first();

                        // Hanya insert jika Peraturan Target dan Pasal Induknya sudah ada di database
                        if ($targetPeraturan && $pasalRomawi) {
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
                                        'isi_perubahan'       => 'Menunggu pemetaan teks', // Wajib diisi karena di migrasi tidak nullable
                                    ]
                                );
                            }
                        }
                    }
                }
            }

            DB::commit();
            $this->info("Seluruh data (Peraturan, Pasal, dan Relasi) berhasil diimpor dengan presisi!");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Gagal mengimpor: " . $e->getMessage() . " pada baris " . $e->getLine());
        }
    }
}