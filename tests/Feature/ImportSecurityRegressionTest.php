<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

/**
 * Regression test untuk temuan audit keamanan & integritas data
 * pada alur import dokumen hukum (batch upload + baca berkas MinIO).
 */
class ImportSecurityRegressionTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private JenisPeraturan $jenis;
    private Status $status;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $this->status = Status::create(['nama_status' => 'Berlaku']);
    }

    private function doc(string $judul, string $nomor, int $tahun, ?string $tipe = 'Undang-Undang', ?string $pemrakarsa = null): array
    {
        $meta = [
            'tipe_peraturan' => $tipe,
            'judul' => $judul,
            'nomor' => $nomor,
            'tahun' => $tahun,
            'status' => 'Berlaku',
        ];

        if ($pemrakarsa !== null) {
            $meta['pemrakarsa'] = $pemrakarsa;
        }

        return [
            'metadata' => $meta,
            'chunks' => [['tipe' => 'PASAL', 'label' => 'Pasal 1', 'teks' => 'Isi pasal.']],
        ];
    }

    // ---------------------------------------------------------------------
    // BUG #1: duplikat di dalam satu batch tidak terdeteksi
    // ---------------------------------------------------------------------

    public function test_duplicate_files_within_same_batch_are_rejected(): void
    {
        $payload = [
            'files' => [
                ['name' => 'a.json', 'parsedData' => $this->doc('Undang-Undang Nomor 88 Tahun 2026', '88', 2026)],
                ['name' => 'b.json', 'parsedData' => $this->doc('Undang-Undang Nomor 88 Tahun 2026', '88', 2026)],
            ],
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertStatus(409)
            ->assertJson([
                'success' => false,
                'conflict' => true,
            ]);

        // Yang penting: tidak ada baris tersimpan sama sekali.
        $this->assertDatabaseCount('peraturan', 0);
    }

    public function test_duplicate_message_names_both_line_numbers(): void
    {
        $payload = [
            'files' => [
                ['name' => 'a.json', 'parsedData' => $this->doc('Undang-Undang Nomor 89 Tahun 2026', '89', 2026)],
                ['name' => 'x.json', 'parsedData' => $this->doc('Undang-Undang Nomor 89 Tahun 2026', '89', 2026)],
            ],
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $message = $response->json('message');

        $this->assertStringContainsString('baris 2', $message);
        $this->assertStringContainsString('baris 1', $message);
    }

    public function test_duplicate_success_count_is_never_inflated(): void
    {
        // Tiga berkas, dua di antaranya kembar => harus ditolak semua,
        // bukan melaporkan "Berhasil mengimpor 3 dokumen".
        $payload = [
            'files' => [
                ['name' => 'a.json', 'parsedData' => $this->doc('Undang-Undang Nomor 90 Tahun 2026', '90', 2026)],
                ['name' => 'b.json', 'parsedData' => $this->doc('Undang-Undang Nomor 91 Tahun 2026', '91', 2026)],
                ['name' => 'c.json', 'parsedData' => $this->doc('Undang-Undang Nomor 91 Tahun 2026', '91', 2026)],
            ],
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertStatus(409);
        $this->assertNotSame('Berhasil mengimpor 3 dokumen.', $response->json('message'));
        $this->assertDatabaseCount('peraturan', 0);
    }

    public function test_distinct_documents_in_batch_still_import_normally(): void
    {
        // Guard harus presisi: dua dokumen berbeda tetap boleh lewat.
        $payload = [
            'files' => [
                ['name' => 'a.json', 'parsedData' => $this->doc('Undang-Undang Nomor 92 Tahun 2026', '92', 2026)],
                ['name' => 'b.json', 'parsedData' => $this->doc('Undang-Undang Nomor 93 Tahun 2026', '93', 2026)],
            ],
        ];

        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload)
            ->assertOk()
            ->assertJson(['success' => true, 'message' => 'Berhasil mengimpor 2 dokumen.']);

        $this->assertDatabaseCount('peraturan', 2);
    }

    public function test_perda_same_number_different_region_not_treated_as_batch_duplicate(): void
    {
        // Perda nomor 1 tahun 2026 di dua daerah berbeda BUKAN duplikat,
        // meski nomor dan tahunnya sama.
        $payload = [
            'files' => [
                ['name' => 'badung.json', 'parsedData' => $this->doc('Perda Badung 1/2026', '1', 2026, 'Peraturan Daerah', 'Pemerintah Kabupaten Badung')],
                ['name' => 'bali.json', 'parsedData' => $this->doc('Perda Bali 1/2026', '1', 2026, 'Peraturan Daerah', 'Pemerintah Provinsi Bali')],
            ],
        ];

        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload)
            ->assertOk()
            ->assertJson(['success' => true]);

        $this->assertDatabaseCount('peraturan', 2);
    }

    // ---------------------------------------------------------------------
    // BUG #3: tipe peraturan typo diam-diam membuat kategori hantu
    // ---------------------------------------------------------------------

    public function test_unknown_peraturan_type_is_rejected(): void
    {
        $payload = [
            'files' => [[
                'name' => 'rusak.json',
                'parsedData' => $this->doc('Dokumen Typo', '77', 2026, 'TipeYangTidakAdaSamaSekali'),
            ]],
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $response->assertStatus(400)
            ->assertJson(['success' => false]);

        // Tidak ada dokumen tersimpan dan tidak ada kategori hantu lahir.
        $this->assertDatabaseCount('peraturan', 0);
        $this->assertDatabaseMissing('jenis_peraturan', ['nama' => 'TipeYangTidakAdaSamaSekali']);
        $this->assertDatabaseCount('jenis_peraturan', 1); // hanya 'UU' dari setUp
    }

    public function test_unknown_peraturan_type_error_message_is_actionable(): void
    {
        $payload = [
            'files' => [[
                'name' => 'rusak.json',
                'parsedData' => $this->doc('Dokumen Typo', '78', 2026, 'UndangUndangg'),
            ]],
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $payload);

        $errors = implode(' ', $response->json('errors'));

        // Pesan harus menyebut tipe yang salah, bukan "Format data tidak sesuai".
        $this->assertStringContainsString('UndangUndangg', $errors);
        $this->assertStringNotContainsString('Format data tidak sesuai', $errors);
    }

    public function test_resolve_by_raw_string_returns_null_instead_of_creating_ghost(): void
    {
        $result = JenisPeraturan::resolveByRawString('ZzzTidakDikenalSamaSekali');

        $this->assertNull($result);
        $this->assertDatabaseMissing('jenis_peraturan', ['nama' => 'ZzzTidakDikenalSamaSekali']);
    }

    public function test_standard_codes_still_resolve_when_reference_table_is_empty(): void
    {
        // Regression: pencocokan harus jalan lewat KODE baku ('UU', 'PERDA'),
        // bukan hanya lewat keywords nama panjang.
        JenisPeraturan::query()->delete();

        foreach (['UU', 'uu', 'PERDA', 'perda', 'PP', 'Perpres'] as $raw) {
            $jenis = JenisPeraturan::resolveByRawString($raw);
            $this->assertNotNull($jenis, "Kode baku '{$raw}' seharusnya dikenali.");
        }
    }

    // ---------------------------------------------------------------------
    // BUG #4: path traversal pada pembacaan berkas MinIO
    // ---------------------------------------------------------------------

    /**
     * @return array<string, array{0: string}>
     */
    public static function maliciousPathProvider(): array
    {
        return [
            'dotdot'            => ['../secret.json'],
            'nested dotdot'     => ['documents/../../secret.json'],
            'many dotdot'       => ['../../../../etc/passwd'],
            'backslash dotdot'  => ['..\\..\\secret.json'],
            'mixed separators'  => ['documents/..\\../secret.json'],
            'null byte'         => ["documents/ocr.json\0.txt"],
            'php wrapper'       => ['php://filter/resource=index.php'],
            'file scheme'       => ['file:///etc/passwd'],
        ];
    }

    #[DataProvider('maliciousPathProvider')]
    public function test_path_traversal_attempts_are_rejected(string $path): void
    {
        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/minio/files/' . rawurlencode($path));

        // Ditolak (422) atau tidak ditemukan (404) — yang penting bukan 200
        // dan bukan error 500 yang membocorkan detail internal.
        $this->assertContains($response->status(), [422, 404], "Path '{$path}' seharusnya tidak diizinkan.");
    }

    public function test_valid_document_path_still_works(): void
    {
        \Illuminate\Support\Facades\Storage::fake('minio');
        \Illuminate\Support\Facades\Storage::disk('minio')->put('documents/uu/uu-1-2026/ocr.json', '{"ok":true}');

        $response = $this->actingAs($this->admin)
            ->getJson('/api/admin/minio/files/documents/uu/uu-1-2026/ocr.json');

        $response->assertOk();
        $this->assertSame('{"ok":true}', $response->getContent());
    }

    // ---------------------------------------------------------------------
    // BUG #5: nomor baris salah pada jalur unggah berkas
    // ---------------------------------------------------------------------

    public function test_uploaded_file_failure_reports_correct_line_number(): void
    {
        $file = UploadedFile::fake()->createWithContent('rusak.json', json_encode(
            $this->doc('Dokumen Rusak', '79', 2026, 'TipeNgawurSekali')
        ));

        $response = $this->actingAs($this->admin)
            ->post('/api/admin/import/manual', ['file' => $file], ['Accept' => 'application/json']);

        $response->assertStatus(400);
        $errors = implode(' ', $response->json('errors'));

        // Harus "baris 1", bukan "baris 0" (akibat kunci array berupa string 'file').
        $this->assertStringContainsString('baris 1', $errors);
        $this->assertStringNotContainsString('baris 0', $errors);
    }
}
