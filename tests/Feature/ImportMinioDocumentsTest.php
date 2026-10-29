<?php

namespace Tests\Feature;

use App\Models\Peraturan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImportMinioDocumentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_perda_with_same_number_and_year_from_different_regions_are_both_imported(): void
    {
        Storage::fake('minio');

        $badung = 'documents/perda/pemerintah_kabupaten_badung/peraturan-daerah-kabupaten-badung-1-2006';
        $bali = 'documents/perda/pemerintah_provinsi_bali/peraturan-daerah-provinsi-bali-1-2006';

        $this->putOcr($badung, 'peraturan-daerah-kabupaten-badung-1-2006', 'Peraturan Daerah Kabupaten Badung Nomor 1 Tahun 2006', 'Pemerintah Kabupaten Badung');
        $this->putOcr($bali, 'peraturan-daerah-provinsi-bali-1-2006', 'Peraturan Daerah Provinsi Bali Nomor 1 Tahun 2006', 'Pemerintah Provinsi Bali');

        $this->artisan('minio:import', ['--category' => ['perda'], '--no-seed' => true])
            ->assertExitCode(0);

        $this->assertDatabaseCount('peraturan', 2);
        $this->assertDatabaseHas('peraturan', [
            'unique_id' => 'peraturan-daerah-kabupaten-badung-1-2006',
            'file_pdf_path' => $badung.'/document.pdf',
        ]);
        $this->assertDatabaseHas('peraturan', [
            'unique_id' => 'peraturan-daerah-provinsi-bali-1-2006',
            'file_pdf_path' => $bali.'/document.pdf',
        ]);
    }

    public function test_running_import_twice_does_not_duplicate_records(): void
    {
        Storage::fake('minio');

        $folder = 'documents/uu/undang-undang-14-2025';
        $this->putOcr($folder, 'undang-undang-14-2025', 'Undang-Undang Nomor 14 Tahun 2025', 'Pemerintah Pusat');

        $this->artisan('minio:import', ['--category' => ['uu'], '--no-seed' => true])->assertExitCode(0);
        $this->artisan('minio:import', ['--category' => ['uu'], '--no-seed' => true])->assertExitCode(0);

        $this->assertSame(1, Peraturan::withTrashed()->count());
    }

    public function test_limit_option_limits_imported_documents(): void
    {
        Storage::fake('minio');

        $this->putOcr('documents/uu/undang-undang-1-2025', 'undang-undang-1-2025', 'Undang-Undang Nomor 1 Tahun 2025', 'Pemerintah Pusat');
        $this->putOcr('documents/uu/undang-undang-2-2025', 'undang-undang-2-2025', 'Undang-Undang Nomor 2 Tahun 2025', 'Pemerintah Pusat');

        $this->artisan('minio:import', ['--category' => ['uu'], '--limit' => 1, '--no-seed' => true])
            ->assertExitCode(0);

        $this->assertSame(1, Peraturan::withTrashed()->count());
    }

    private function putOcr(string $folder, string $uniqueId, string $judul, string $pemrakarsa): void
    {
        Storage::disk('minio')->put($folder.'/document.pdf', '%PDF-1.4 dummy');
        Storage::disk('minio')->put($folder.'/ocr.json', json_encode([
            'metadata' => [
                'id_dokumen' => $uniqueId,
                'standard_id' => $uniqueId,
                'tipe_peraturan' => $this->tipeFromFolder($folder),
                'judul' => $judul,
                'tahun' => $this->yearFromUniqueId($uniqueId),
                'status' => 'berlaku',
                'pemrakarsa' => $pemrakarsa,
            ],
            'chunks' => [
                ['tipe' => 'PASAL', 'label' => 'Pasal 1', 'teks' => 'Isi pasal kesatu.'],
            ],
        ]));
    }

    private function tipeFromFolder(string $folder): string
    {
        return match (explode('/', $folder)[1] ?? '') {
            'uu' => 'UU',
            'perda' => 'Perda',
            'perpres' => 'Perpres',
            default => 'UU',
        };
    }

    private function yearFromUniqueId(string $uniqueId): string
    {
        return substr($uniqueId, -4);
    }
}
