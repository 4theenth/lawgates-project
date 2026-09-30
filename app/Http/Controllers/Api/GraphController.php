<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Neo4jGraphService;
use App\Models\Peraturan;
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
    public function show($id)
    {
        $peraturan = Peraturan::findOrFail($id);

        try {
            $graphData = $this->graphService->getRegulationGraph($peraturan->id);

            // Jika node utama belum ada di Neo4j, kita injeksikan data dari database
            if (empty($graphData['nodes'])) {
                $graphData['nodes'][] = [
                    'id' => $peraturan->id,
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

            return response()->json($graphData);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch graph data: ' . $e->getMessage()], 500);
        }
    }
}
