<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SearchControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_search_endpoint_returns_successful_paginated_response(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/search');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'current_page',
                'data',
                'first_page_url',
                'from',
                'last_page',
                'per_page',
                'total',
            ]);
    }

    public function test_search_endpoint_with_keyword_returns_filtered_results(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $status = Status::create(['nama_status' => 'Berlaku']);
        $jenis = JenisPeraturan::create(['nama' => 'Undang-Undang', 'kode' => 'UU']);

        $peraturan = Peraturan::create([
            'unique_id' => 'uu-1-2024',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'nomor' => '1',
            'tahun' => 2024,
            'judul' => 'Undang-Undang tentang Ketenagakerjaan Digital',
        ]);

        // Beri pasal agar lolos scope available()
        $peraturan->pasal()->create([
            'nomor_pasal' => 'Pasal 1',
            'isi_pasal' => 'Ketentuan umum ketenagakerjaan digital',
            'urutan' => 1,
        ]);

        $response = $this->getJson('/api/search?keyword=Ketenagakerjaan');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'unique_id' => 'uu-1-2024',
                'judul' => 'Undang-Undang tentang Ketenagakerjaan Digital',
            ]);
    }
}
