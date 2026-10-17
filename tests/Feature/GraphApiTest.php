<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\LawRelation;
use App\Models\Peraturan;
use App\Models\RelationType;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GraphApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_graph_api_returns_nodes_and_edges_structure(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        $p1 = Peraturan::create([
            'judul' => 'Peraturan Utama Test',
            'nomor' => '1',
            'tahun' => 2026,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => 'uu-1-2026',
        ]);

        $p2 = Peraturan::create([
            'judul' => 'Peraturan Terkait Test',
            'nomor' => '2',
            'tahun' => 2026,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => 'uu-2-2026',
        ]);

        $relType = RelationType::create(['nama_relasi' => 'MENCABUT']);

        LawRelation::create([
            'from_peraturan_id' => $p1->id,
            'to_peraturan_id' => $p2->id,
            'relation_type_id' => $relType->id,
        ]);

        $startTime = microtime(true);
        $response = $this->getJson("/api/peraturan/{$p1->id}/graph?depth=1");
        $duration = microtime(true) - $startTime;

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'nodes' => [
                '*' => ['id', 'judul', 'nomor', 'tahun', 'isCenter']
            ],
            'edges' => [
                '*' => ['source_id', 'target_id', 'relation_type']
            ],
            'depth'
        ]);

        // Assert response time is under 2 seconds threshold
        $this->assertLessThan(2.0, $duration, 'Graph API response time should be less than 2 seconds.');

        $edges = $response->json('edges');
        $this->assertNotEmpty($edges);
        $this->assertEquals($p1->id, $edges[0]['source_id']);
        $this->assertEquals($p2->id, $edges[0]['target_id']);
        $this->assertNotEmpty($edges[0]['relation_type']);
    }

    public function test_graph_api_supports_depth_parameter(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        $p1 = Peraturan::create([
            'judul' => 'Peraturan P1',
            'nomor' => '10',
            'tahun' => 2026,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => 'uu-10-2026',
        ]);

        $response = $this->getJson("/api/peraturan/{$p1->id}/graph?depth=2");

        $response->assertStatus(200);
        $this->assertEquals(2, $response->json('depth'));
    }
}
