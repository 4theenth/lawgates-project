<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Services\DocumentStorageService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminDocumentPdfIndicatorTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('minio');
    }

    public function test_sync_menautkan_pdf_yang_ada_tanpa_path_database(): void
    {
        [$jenis, $status] = $this->createReferences();

        Storage::disk('minio')->put(
            'documents/pp/peraturan-pemerintah-4-2026/document.pdf',
            $this->pdfContent()
        );

        $peraturan = $this->createPeraturan($jenis, $status, 'peraturan-pemerintah-4-2026', [
            'nomor' => '4',
        ]);

        $this->artisan('documents:sync-pdf')->assertSuccessful();

        $this->assertSame(
            'documents/pp/peraturan-pemerintah-4-2026/document.pdf',
            $peraturan->fresh()->file_pdf_path
        );
    }

    public function test_sync_mengosongkan_path_database_yang_usang(): void
    {
        [$jenis, $status] = $this->createReferences();

        Storage::disk('minio')->put(
            'documents/pp/peraturan-pemerintah-99-2026/document.pdf',
            $this->pdfContent()
        );

        $peraturan = $this->createPeraturan($jenis, $status, 'peraturan-pemerintah-6-2026', [
            'nomor' => '6',
            'file_pdf_path' => 'documents/pp/peraturan-pemerintah-6-2026/document.pdf',
        ]);

        $this->artisan('documents:sync-pdf')->assertSuccessful();

        $this->assertNull($peraturan->fresh()->file_pdf_path);
    }

    public function test_sync_dibatalkan_bila_minio_tidak_mengembalikan_pdf(): void
    {
        [$jenis, $status] = $this->createReferences();

        $path = 'documents/pp/peraturan-pemerintah-7-2026/document.pdf';
        $peraturan = $this->createPeraturan($jenis, $status, 'peraturan-pemerintah-7-2026', [
            'nomor' => '7',
            'file_pdf_path' => $path,
        ]);

        $this->artisan('documents:sync-pdf')->assertFailed();

        $this->assertSame($path, $peraturan->fresh()->file_pdf_path);
    }

    public function test_sync_tidak_menautkan_metadata_url_pdf_tanpa_berkas(): void
    {
        [$jenis, $status] = $this->createReferences();

        Storage::disk('minio')->put(
            'documents/pp/peraturan-pemerintah-98-2026/document.pdf',
            $this->pdfContent()
        );

        $peraturan = $this->createPeraturan($jenis, $status, 'peraturan-pemerintah-5-2026', [
            'nomor' => '5',
            'url_pdf' => 'undang-undang_nomor_5_tahun_2026.pdf',
        ]);

        $this->artisan('documents:sync-pdf')->assertSuccessful();

        $this->assertNull($peraturan->fresh()->file_pdf_path);
    }

    public function test_path_kategori_lain_tidak_dianggap_pdf_yang_sah(): void
    {
        [$jenis, $status] = $this->createReferences();

        $mismatchedPath = 'documents/uu/undang-undang-12-2025/document.pdf';
        Storage::disk('minio')->put($mismatchedPath, $this->pdfContent());

        $peraturan = $this->createPeraturan($jenis, $status, 'peraturan-pemerintah-12-2025', [
            'nomor' => '12',
            'file_pdf_path' => $mismatchedPath,
        ]);

        $availablePaths = DocumentStorageService::listAvailablePdfPaths();

        $this->assertNull(DocumentStorageService::findAvailablePath($peraturan, $availablePaths));
    }

    public function test_path_inpres_yang_memuat_frasa_undang_undang_tetap_dianggap_sah(): void
    {
        $jenis = JenisPeraturan::create(['kode' => 'INPRES', 'nama' => 'Instruksi Presiden']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        $path = 'documents/inpres/tentang-undang-undang-2-1960/document.pdf';
        Storage::disk('minio')->put($path, $this->pdfContent());

        $peraturan = $this->createPeraturan($jenis, $status, 'instruksi-presiden-1-2003', [
            'nomor' => '1',
            'tahun' => 2003,
            'file_pdf_path' => $path,
        ]);

        $availablePaths = DocumentStorageService::listAvailablePdfPaths();

        $this->assertSame($path, DocumentStorageService::findAvailablePath($peraturan, $availablePaths));
    }

    /**
     * @return array{0: JenisPeraturan, 1: Status}
     */
    private function createReferences(): array
    {
        return [
            JenisPeraturan::create(['kode' => 'PP', 'nama' => 'Peraturan Pemerintah']),
            Status::create(['nama_status' => 'Berlaku']),
        ];
    }

    private function createPeraturan(
        JenisPeraturan $jenis,
        Status $status,
        string $uniqueId,
        array $overrides = []
    ): Peraturan {
        return Peraturan::create(array_merge([
            'judul' => 'Peraturan Uji ' . $uniqueId,
            'nomor' => '1',
            'tahun' => 2026,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => $uniqueId,
        ], $overrides));
    }

    private function pdfContent(): string
    {
        return "%PDF-1.4\n" . str_repeat('0', 2048);
    }
}
