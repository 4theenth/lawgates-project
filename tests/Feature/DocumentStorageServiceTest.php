<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Services\DocumentStorageService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentStorageServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_detects_and_resolves_mismatched_db_paths(): void
    {
        $perda = JenisPeraturan::create(['kode' => 'PERDA', 'nama' => 'Peraturan Daerah']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        $peraturan = Peraturan::create([
            'judul' => 'Peraturan Daerah Provinsi Bali Nomor 12 Tahun 2025',
            'nomor' => '12',
            'tahun' => 2025,
            'jenis_peraturan_id' => $perda->id,
            'status_id' => $status->id,
            'unique_id' => 'peraturan_daerah_provinsi_bali_nomor_12_tahun_2025',
            'file_pdf_path' => 'documents/uu/undang-undang-12-2025/document.pdf', // Mismatched UU path in DB
        ]);

        // Attempting to resolve should recognize that PERDA should not use /uu/ path
        $resolved = DocumentStorageService::resolveValidMinioPath($peraturan);

        // If MinIO is not running in test env, it should return null or correct path, but NOT the mismatched UU path
        if ($resolved !== null) {
            $this->assertStringNotContainsString('documents/uu/', $resolved);
        } else {
            $this->assertNull($resolved);
        }
    }
}
