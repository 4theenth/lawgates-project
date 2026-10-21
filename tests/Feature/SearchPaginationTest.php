<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Menjaga `per_page` pada GET /api/search tetap dalam batas wajar.
 *
 * Tanpa clamp, `per_page<=0` menghasilkan metadata pagination cacat
 * (per_page negatif / last_page salah) dan `per_page` besar menarik
 * seluruh tabel sekaligus.
 */
class SearchPaginationTest extends TestCase
{
    use RefreshDatabase;

    private function peraturan(): Peraturan
    {
        $jenis = JenisPeraturan::firstOrCreate(['kode' => 'UU'], ['nama' => 'Undang-Undang']);
        $status = Status::firstOrCreate(['nama_status' => 'Berlaku']);

        return Peraturan::create([
            'judul' => 'Peraturan Uji '.uniqid(),
            'nomor' => (string) random_int(100000, 999999),
            'tahun' => 2026,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => 'uu-uji-'.uniqid(),
        ]);
    }

    public function test_per_page_nol_atau_negatif_dikunci_ke_satu(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->peraturan();

        foreach (['0', '-5', 'abc'] as $value) {
            $response = $this->actingAs($user)->getJson('/api/search?per_page='.$value);

            $response->assertOk();
            $this->assertSame(1, $response->json('per_page'), "per_page={$value} tidak dikunci ke 1");
        }
    }

    public function test_per_page_besar_dibatasi_seratus(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->peraturan();

        $response = $this->actingAs($user)->getJson('/api/search?per_page=99999');

        $response->assertOk();
        $this->assertSame(100, $response->json('per_page'));
    }

    public function test_per_page_normal_dipakai_apa_adanya(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->peraturan();

        $response = $this->actingAs($user)->getJson('/api/search?per_page=25');

        $response->assertOk();
        $this->assertSame(25, $response->json('per_page'));
    }
}
