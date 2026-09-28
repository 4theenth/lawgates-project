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
            return response()->json($graphData);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch graph data: ' . $e->getMessage()], 500);
        }
    }
}
