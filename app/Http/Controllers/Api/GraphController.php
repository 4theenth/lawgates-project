<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Neo4jGraphService;
use App\Models\Peraturan;
use App\Models\LawRelation;
use Illuminate\Support\Str;

class GraphController extends Controller
{
    protected $graphService;

    public function __construct(Neo4jGraphService $graphService)
    {
        $this->graphService = $graphService;
    }

    /**
     * Get graph visualization data for a specific Peraturan
     */
    public function show(Request $request, $id)
    {
        $peraturan = Peraturan::findOrFail($id);
        $depth = max(1, min(2, (int) $request->query('depth', 1)));

        try {
            $graphData = $this->graphService->getRegulationGraph($peraturan->id, $depth);

            // Jika node utama belum ada di Neo4j, kita injeksikan data dari database
            if (empty($graphData['nodes'])) {
                $graphData['nodes'][] = [
                    'id' => (int) $peraturan->id,
                    'judul' => $peraturan->judul,
                    'nomor' => $peraturan->nomor,
                    'tahun' => $peraturan->tahun,
                    'jenis' => $peraturan->jenisPeraturan ? $peraturan->jenisPeraturan->nama : 'Unknown',
                    'unique_id' => $peraturan->unique_id,
                    'status' => $peraturan->statusPeraturan ? $peraturan->statusPeraturan->nama_status : 'Unknown',
                    'tanggal_penetapan' => $peraturan->tanggal_penetapan ? $peraturan->tanggal_penetapan->format('Y-m-d') : null,
                    'isCenter' => true,
                    'has_data' => true,
                ];
            } else {
                // Ambil daftar id node untuk verifikasi ke database
                $nodeIds = collect($graphData['nodes'])->pluck('id')->filter()->all();
                $existingPeraturans = Peraturan::whereIn('id', $nodeIds)
                    ->with(['jenisPeraturan', 'statusPeraturan'])
                    ->withCount([
                        'strukturDokumen as pembukaan_count' => function ($q) {
                            $q->where('tipe_struktur', 'PEMBUKAAN');
                        },
                        'pasal as pasal_count'
                    ])
                    ->get()
                    ->keyBy('id');

                foreach ($graphData['nodes'] as &$node) {
                    $pId = $node['id'] ?? null;
                    if (!empty($node['isCenter'])) {
                        $node['has_data'] = true;
                    } elseif (isset($existingPeraturans[$pId])) {
                        $p = $existingPeraturans[$pId];
                        $isWaiting = Str::contains(strtolower($p->judul ?? ''), 'menunggu import') || Str::contains(strtolower($node['judul'] ?? ''), 'menunggu import');
                        $hasUnique = !empty($p->unique_id);
                        $hasContent = $p->has_pasal || $p->has_pembukaan || !empty($p->file_pdf_path);
                        $node['has_data'] = !$isWaiting && ($hasUnique || $hasContent);
                        if (!empty($p->unique_id)) {
                            $node['unique_id'] = $p->unique_id;
                        }
                    } else {
                        // Cek apakah data node dari Neo4j sendiri mengindikasikan menunggu import atau tanpa unique_id
                        $isWaiting = Str::contains(strtolower($node['judul'] ?? ''), 'menunggu import') || Str::contains(strtolower($node['unique_id'] ?? ''), 'menunggu');
                        $node['has_data'] = !empty($node['unique_id']) && !$isWaiting;
                    }
                }
            }

            // Ensure edges property is set
            if (!isset($graphData['edges'])) {
                $graphData['edges'] = $graphData['links'] ?? [];
            }
            if (!isset($graphData['links'])) {
                $graphData['links'] = $graphData['edges'] ?? [];
            }

            return response()->json($graphData);
        } catch (\Exception $e) {
            // Fallback apabila koneksi Neo4j gagal atau timeout: buat struktur graf dari PostgreSQL
            $fallbackData = $this->buildFallbackGraph($peraturan, $depth);
            return response()->json($fallbackData);
        }
    }

    /**
     * Build fallback graph structure directly from PostgreSQL database (Eloquent)
     */
    protected function buildFallbackGraph(Peraturan $peraturan, int $depth = 1): array
    {
        $nodes = [];
        $edges = [];
        $nodeMap = [];

        // Node Pusat
        $nodes[] = [
            'id' => (int) $peraturan->id,
            'judul' => $peraturan->judul,
            'nomor' => $peraturan->nomor,
            'tahun' => $peraturan->tahun,
            'jenis' => $peraturan->jenisPeraturan ? $peraturan->jenisPeraturan->nama : 'Unknown',
            'unique_id' => $peraturan->unique_id,
            'status' => $peraturan->statusPeraturan ? $peraturan->statusPeraturan->nama_status : 'Unknown',
            'tanggal_penetapan' => $peraturan->tanggal_penetapan ? $peraturan->tanggal_penetapan->format('Y-m-d') : null,
            'isCenter' => true,
            'has_data' => true,
        ];
        $nodeMap[(int) $peraturan->id] = true;

        // Ambil relasi dari database relasional (law_relations)
        $relations = LawRelation::with(['fromPeraturan.jenisPeraturan', 'toPeraturan.jenisPeraturan', 'relationType'])
            ->where('from_peraturan_id', $peraturan->id)
            ->orWhere('to_peraturan_id', $peraturan->id)
            ->limit(100)
            ->get();

        foreach ($relations as $rel) {
            $fromId = (int) $rel->from_peraturan_id;
            $toId = (int) $rel->to_peraturan_id;
            $relTypeName = $rel->relationType ? $rel->relationType->nama_relasi : 'RELATED_TO';
            $relType = strtoupper(str_replace([' ', '-'], '_', $relTypeName));

            $isSourceCenter = ($fromId === (int) $peraturan->id);
            $connected = $isSourceCenter ? $rel->toPeraturan : $rel->fromPeraturan;

            if ($connected) {
                $cId = (int) $connected->id;
                if (!isset($nodeMap[$cId])) {
                    $nodeMap[$cId] = true;

                    $relTypeRaw = strtoupper($relType);
                    if (str_contains($relTypeRaw, 'CABUT')) {
                        $relCategory = $isSourceCenter ? 'Mencabut' : 'Dicabut Oleh';
                    } elseif (str_contains($relTypeRaw, 'UBAH')) {
                        $relCategory = $isSourceCenter ? 'Mengubah' : 'Diubah Oleh';
                    } else {
                        $relCategory = $isSourceCenter ? 'Merujuk' : 'Dirujuk Oleh';
                    }

                    $nodes[] = [
                        'id' => $cId,
                        'judul' => $connected->judul,
                        'nomor' => $connected->nomor,
                        'tahun' => $connected->tahun,
                        'jenis' => $connected->jenisPeraturan ? $connected->jenisPeraturan->nama : 'Unknown',
                        'unique_id' => $connected->unique_id,
                        'status' => $connected->statusPeraturan ? $connected->statusPeraturan->nama_status : 'Unknown',
                        'tanggal_penetapan' => $connected->tanggal_penetapan ? $connected->tanggal_penetapan->format('Y-m-d') : null,
                        'isCenter' => false,
                        'has_data' => !empty($connected->unique_id),
                        'relType' => $relType,
                        'relCategory' => $relCategory,
                    ];
                }

                $edges[] = [
                    'source_id' => $fromId,
                    'target_id' => $toId,
                    'relation_type' => $relType,
                    'source' => $fromId,
                    'target' => $toId,
                    'type' => $relType,
                    'relCategory' => $isSourceCenter ? 'Merujuk' : 'Dirujuk Oleh',
                ];
            }
        }

        return [
            'nodes' => $nodes,
            'edges' => $edges,
            'links' => $edges,
            'depth' => $depth,
        ];
    }
}
