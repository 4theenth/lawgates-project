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
     * AC 3: MinIO Write-Back Sync menyimpan file baru dengan sufiks '_edited.json'
     */
    public function test_minio_write_back_sync_creates_edited_file()
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
        Storage::disk('minio')->assertExists('UU_No_11_2026_edited.json');
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
}
