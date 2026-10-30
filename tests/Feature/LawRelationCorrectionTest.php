<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\LawRelation;
use App\Models\Peraturan;
use App\Models\RelationType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LawRelationCorrectionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Setup admin user with superadmin role
        $this->admin = User::factory()->create([
            'role' => 'superadmin',
        ]);
    }

    public function test_admin_can_search_target_peraturan_for_relation(): void
    {
        $jenis = \App\Models\JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = \App\Models\Status::create(['nama_status' => 'Berlaku']);

        $target1 = Peraturan::create([
            'unique_id' => 'UU_No_13_2003',
            'judul' => 'Ketenagakerjaan',
            'nomor' => '13',
            'tahun' => 2003,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
        ]);

        $response = $this->actingAs($this->admin)->getJson('/admin/dokumen-hukum/search-peraturan?q=Ketenagakerjaan');

        $response->assertOk()
            ->assertJsonFragment([
                'unique_id' => 'UU_No_13_2003',
                'judul' => 'Ketenagakerjaan',
            ]);
    }

    public function test_updating_document_persists_mapped_law_relations(): void
    {
        $jenis = \App\Models\JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = \App\Models\Status::create(['nama_status' => 'Berlaku']);

        $source = Peraturan::create([
            'unique_id' => 'UU_No_6_2023',
            'judul' => 'Cipta Kerja',
            'nomor' => '6',
            'tahun' => 2023,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
        ]);

        $target = Peraturan::create([
            'unique_id' => 'UU_No_13_2003',
            'judul' => 'Ketenagakerjaan',
            'nomor' => '13',
            'tahun' => 2003,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
        ]);

        $payload = [
            'standarId' => $source->unique_id,
            'judul' => $source->judul,
            'riwayatPerubahan' => [
                [
                    'id' => 'current-doc',
                    'kode' => $source->unique_id,
                    'isCurrent' => true,
                ],
                [
                    'id' => 'rel-new-123',
                    'kode' => $target->unique_id,
                    'keteranganBadge' => [
                        'label' => 'Mengubah Peraturan ini',
                        'variant' => 'mengubah',
                    ],
                    'isCurrent' => false,
                ],
            ],
        ];

        $response = $this->actingAs($this->admin)->putJson("/admin/dokumen-hukum/{$source->unique_id}", $payload);

        $response->assertOk()
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('law_relations', [
            'from_peraturan_id' => $source->id,
            'to_peraturan_id' => $target->id,
        ]);
    }
}
