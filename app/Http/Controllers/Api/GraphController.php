<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Neo4jGraphService;
use App\Models\Peraturan;

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

            // Jika node utama belum ada di Neo4j, kita injeksikan data dari MySQL
            // agar setidaknya graf selalu menampilkan dokumen utama (center node)
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
                ];
            }

            return response()->json($graphData);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch graph data: ' . $e->getMessage()], 500);
        }
    }
}
