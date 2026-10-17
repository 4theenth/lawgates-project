<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\User;
use App\Models\Peraturan;
use App\Models\JenisPeraturan;
use App\Models\Status;

class MinioOcrIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('minio');
    }

    /**
     * AC 1: GET /api/admin/minio/files/{filename} membaca isi file dari MinIO
     */
    public function test_get_minio_file_content_endpoint()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        
        $jsonContent = json_encode([
            'metadata' => [
                'judul' => 'Undang-Undang Nomor 11 Tahun 2026',
                'nomor' => '11',
                'tahun' => '2026'
            ]
        ]);

        Storage::disk('minio')->put('documents/uu/uu-11-2026/ocr.json', $jsonContent);

        $response = $this->actingAs($admin)
            ->getJson('/api/admin/minio/files/documents/uu/uu-11-2026/ocr.json');

        $response->assertStatus(200);
        $this->assertStringContainsString('Undang-Undang Nomor 11 Tahun 2026', $response->getContent());
    }

    /**
     * AC 2: Deduplication Logic mengembalikan HTTP 409 Conflict saat duplikasi terdeteksi
     */
    public function test_deduplication_returns_409_conflict()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        Peraturan::create([
            'unique_id' => 'uu_11_2026',
            'judul' => 'Undang-Undang Nomor 11 Tahun 2026',
            'nomor' => '11',
            'tahun' => '2026',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id
        ]);

        $response = $this->actingAs($admin)
            ->getJson('/admin/dokumen-hukum/check-duplicate?nomor=11&tahun=2026');

        $response->assertStatus(409)
            ->assertJson([
                'exists' => true,
                'conflict' => true,
            ]);
    }

    /**
     * AC 3: MinIO Write-Back Sync menyimpan perubahan langsung menimpa file di MinIO
     */
    public function test_minio_write_back_sync_overwrites_original_file()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $payload = [
            'nama_draft' => 'Draft Edit Test',
            'files' => [
                [
                    'name' => 'UU_No_11_2026.json',
                    'title' => 'Undang-Undang Nomor 11 Tahun 2026',
                    'correctionData' => [
                        'judul' => 'Undang-Undang Nomor 11 Tahun 2026 Edit',
                        'nomorPeraturan' => '11',
                        'tahun' => '2026'
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($admin)
            ->postJson('/admin/dokumen-hukum/draft', $payload);

        $response->assertStatus(200);
        Storage::disk('minio')->assertExists('UU_No_11_2026.json');
    }

    /**
     * AC 4: Status Handling mengecualikan dokumen berstatus DRAFT dari query pencarian publik
     */
    public function test_public_search_excludes_draft_documents()
    {
        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $statusBerlaku = Status::create(['nama_status' => 'Berlaku']);
        $statusDraft = Status::create(['nama_status' => 'Draft']);

        $docBerlaku = Peraturan::create([
            'unique_id' => 'uu_1_2026',
            'judul' => 'Undang-Undang Nomor 1 Tahun 2026',
            'nomor' => '1',
            'tahun' => '2026',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $statusBerlaku->id
        ]);
        $docBerlaku->pasal()->create(['nomor_pasal' => '1', 'isi_pasal' => 'Isi pasal 1', 'urutan' => 1]);

        $docDraft = Peraturan::create([
            'unique_id' => 'uu_2_2026',
            'judul' => 'Undang-Undang Nomor 2 Tahun 2026 Draft',
            'nomor' => '2',
            'tahun' => '2026',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $statusDraft->id
        ]);
        $docDraft->pasal()->create(['nomor_pasal' => '1', 'isi_pasal' => 'Isi pasal draft 1', 'urutan' => 1]);

        $available = Peraturan::available()->get();

        $this->assertTrue($available->contains('id', $docBerlaku->id));
        $this->assertFalse($available->contains('id', $docDraft->id));
    }

    /**
     * AC 3 Extended: Edit peraturan langsung memperbarui file ocr.json di MinIO tanpa membuat folder baru
     */
    public function test_update_published_regulation_syncs_directly_to_existing_minio_ocr_json()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $statusBerlaku = Status::create(['nama_status' => 'Berlaku']);

        $minioFolderPath = 'documents/uu/uu-9-2025';
        $initialOcrJson = [
            'metadata' => [
                'id_dokumen' => 'uu_9_2025',
                'judul' => 'Undang-Undang Lama',
                'nomor' => '9',
                'tahun' => '2025',
            ],
            'chunks' => [
                [
                    'tipe' => 'PASAL',
                    'label' => 'Pasal 1',
                    'bagian_dokumen' => 'BATANG_TUBUH',
                    'teks' => 'Teks lama yang belum diedit',
                ]
            ]
        ];

        Storage::disk('minio')->put($minioFolderPath . '/ocr.json', json_encode($initialOcrJson));

        $peraturan = Peraturan::create([
            'unique_id' => 'uu_9_2025',
            'judul' => 'Undang-Undang Lama',
            'nomor' => '9',
            'tahun' => '2025',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $statusBerlaku->id,
            'file_pdf_path' => $minioFolderPath . '/document.pdf'
        ]);
        $pasal = $peraturan->pasal()->create([
            'nomor_pasal' => '1',
            'isi_pasal' => 'Teks lama yang belum diedit',
            'urutan' => 1
        ]);

        $payload = [
            'judul' => 'Undang-Undang Baru yang Diperbarui',
            'nomorPeraturan' => '9',
            'tahun' => '2025',
            'pembukaan' => [
                'menimbang' => 'Menimbang teks baru',
                'mengingat' => 'Mengingat teks baru',
                'memutuskan' => 'Memutuskan teks baru',
            ],
            'babList' => [
                [
                    'id' => 'bab_default',
                    'judul' => 'BAB I',
                    'pasalList' => [
                        [
                            'id' => $pasal->id,
                            'nomor' => 'Pasal 1',
                            'isi' => 'Teks pasal baru dengan spasi rapi dan kata yang diperbaiki',
                        ]
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($admin)
            ->putJson("/admin/dokumen-hukum/{$peraturan->unique_id}", $payload);

        $response->assertStatus(200);

        // Pastikan file ocr.json diperbarui di folder yang sama (tanpa folder baru atau akhiran _edited)
        Storage::disk('minio')->assertExists($minioFolderPath . '/ocr.json');
        Storage::disk('minio')->assertMissing($minioFolderPath . '/ocr_edited.json');

        $updatedContent = json_decode(Storage::disk('minio')->get($minioFolderPath . '/ocr.json'), true);
        $this->assertEquals('Undang-Undang Baru yang Diperbarui', $updatedContent['metadata']['judul']);
        $this->assertEquals('Teks pasal baru dengan spasi rapi dan kata yang diperbaiki', $updatedContent['chunks'][0]['teks']);
    }

    /**
     * Test import Perda otomatis mengekstrak lokasi_daerah dan subjek baik dari Upload maupun MinIO
     */
    public function test_import_perda_extracts_lokasi_daerah_and_syncs_subjek()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        JenisPeraturan::create(['kode' => 'PERDA', 'nama' => 'Peraturan Daerah']);
        Status::create(['nama_status' => 'Berlaku']);

        $minioFolderPath = 'documents/perda/peraturan-daerah-provinsi-bali-1-2010';
        $jsonPayload = [
            'metadata' => [
                'standard_id' => 'peraturan-daerah-provinsi-bali-1-2010',
                'tipe_peraturan' => 'Perda',
                'judul' => 'Peraturan Daerah (Perda) Provinsi Bali Nomor 1 Tahun 2010',
                'tahun' => '2010',
                'tempat_penetapan' => 'Bali',
                'pemrakarsa' => 'Pemerintah Provinsi Bali',
                'subjek' => 'Pariwisata',
                'status' => 'Berlaku',
            ],
            'chunks' => [
                [
                    'tipe' => 'PASAL',
                    'label' => 'Pasal 1',
                    'teks' => 'Ketentuan Umum...',
                ]
            ]
        ];

        Storage::disk('minio')->put($minioFolderPath . '/ocr.json', json_encode($jsonPayload));

        $response = $this->actingAs($admin)
            ->postJson('/admin/dokumen-hukum/minio/import', [
                'folder_path' => $minioFolderPath
            ]);

        $response->assertStatus(200);

        $peraturan = Peraturan::where('unique_id', 'peraturan-daerah-provinsi-bali-1-2010')->first();
        $this->assertNotNull($peraturan);
        $this->assertEquals('Pemerintah Provinsi Bali', $peraturan->lokasi_daerah);
        $this->assertEquals('Pariwisata', $peraturan->subjek);

        // Verifikasi master subjek_peraturan terbuat secara otomatis
        $this->assertTrue(\App\Models\SubjekPeraturan::where('nama', 'Pariwisata')->exists());

        // Verifikasi MinIO write-back juga menyertakan lokasi_daerah
        $minioData = json_decode(Storage::disk('minio')->get($minioFolderPath . '/ocr.json'), true);
        $this->assertArrayHasKey('lokasi_daerah', $minioData['metadata']);
        $this->assertEquals('Pemerintah Provinsi Bali', $minioData['metadata']['lokasi_daerah']);
    }
}

