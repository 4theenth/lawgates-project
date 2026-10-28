<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PlaceholderRegulationTest extends TestCase
{
    use RefreshDatabase;

    public function test_placeholder_slug_renders_detail_page_without_technical_error(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get('/peraturan/uu-11-2008');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('DetailPeraturan')
            ->has('peraturan')
            ->where('peraturan.has_pasal', false)
            ->where('peraturan.is_placeholder', true)
        );
    }

    public function test_placeholder_slug_renders_viewer_page_without_technical_error(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get('/peraturan/uu-99-2099/lihat');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Viewer/DokumenViewer')
            ->has('peraturan')
            ->where('hasPdf', false)
        );
    }

    public function test_existing_regulation_without_pasal_renders_as_placeholder(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        $peraturan = Peraturan::create([
            'judul' => 'Peraturan Relasi Tanpa Naskah Pasal',
            'nomor' => '11',
            'tahun' => 2019,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => 'undang-undang-11-2019',
        ]);

        $response = $this->get('/peraturan/undang-undang-11-2019');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('DetailPeraturan')
            ->has('peraturan')
            ->where('peraturan.has_pasal', false)
        );
    }
}
