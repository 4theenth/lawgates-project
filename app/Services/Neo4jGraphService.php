<?php

namespace App\Services;

use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Contracts\ClientInterface;

class Neo4jGraphService
{
    protected ClientInterface $client;

    public function __construct()
    {
        // Build the Neo4j client using config values
        $host = config('neo4j.connections.default.host');
        $port = config('neo4j.connections.default.port');
        $username = config('neo4j.connections.default.username');
        $password = config('neo4j.connections.default.password');
        
        // Bolt URI: bolt://username:password@host:port
        $uri = "bolt://{$username}:{$password}@{$host}:{$port}";
        
        $this->client = ClientBuilder::create()
            ->withDriver('default', $uri)
            ->withDefaultDriver('default')
            ->build();
    }

    /**
     * Get the Neo4j Client instance
     */
    public function getClient(): ClientInterface
    {
        return $this->client;
    }

    /**
     * Upsert a Peraturan Node
     */
    public function upsertPeraturanNode(\App\Models\Peraturan $peraturan)
    {
        $query = '
            MERGE (p:Peraturan {id: $id})
            SET p.judul = $judul, 
                p.nomor = $nomor, 
                p.tahun = $tahun,
                p.jenis = $jenis,
                p.unique_id = $unique_id,
                p.status = $status,
                p.tanggal_penetapan = $tanggal_penetapan
            RETURN p
        ';

        $params = [
            'id' => (int) $peraturan->id,
            'judul' => (string) $peraturan->judul,
            'nomor' => (string) $peraturan->nomor,
            'tahun' => (int) $peraturan->tahun,
            'jenis' => $peraturan->jenisPeraturan ? $peraturan->jenisPeraturan->nama : 'Unknown',
            'unique_id' => (string) $peraturan->unique_id,
            'status' => $peraturan->statusPeraturan ? $peraturan->statusPeraturan->nama_status : 'Unknown',
            'tanggal_penetapan' => $peraturan->tanggal_penetapan ? $peraturan->tanggal_penetapan->format('Y-m-d') : null,
        ];

        return $this->client->run($query, $params);
    }

    public function createRelation(\App\Models\LawRelation $relation)
    {
        $typeName = $relation->relationType ? $relation->relationType->nama_relasi : 'RELATED_TO';
        if (empty($typeName)) {
            $typeName = 'RELATED_TO';
        }
        $type = strtoupper(str_replace([' ', '-'], '_', $typeName));

        $query = "
            MATCH (source:Peraturan {id: \$source_id})
            MATCH (target:Peraturan {id: \$target_id})
            MERGE (source)-[r:{$type}]->(target)
            RETURN r
        ";

        $params = [
            'source_id' => (int) $relation->from_peraturan_id,
            'target_id' => (int) $relation->to_peraturan_id,
        ];

        return $this->client->run($query, $params);
    }

    /**
     * Get isolated graph for a specific Peraturan (Nodes and Links)
     */
    public function getRegulationGraph(int $peraturanId)
    {
        // Query to get the center node and all directly connected nodes (depth 1)
        $query = "
            MATCH (center:Peraturan {id: \$id})
            OPTIONAL MATCH (center)-[r]-(connected:Peraturan)
            RETURN center, type(r) as rel_type, startNode(r).id AS source_id, endNode(r).id AS target_id, connected
        ";

        $result = $this->client->run($query, ['id' => $peraturanId]);

        $nodes = [];
        $links = [];
        $nodeMap = [];

        // Helper to safely get property since Neo4j removes null properties
        $safeGet = function($node, $key) {
            $props = $node->getProperties();
            return $props->hasKey($key) ? $props->get($key) : null;
        };

        foreach ($result as $row) {
            $centerNode = $row->get('center');
            if ($centerNode === null) continue;
            
            $centerId = $safeGet($centerNode, 'id');
            
            if (!isset($nodeMap[$centerId])) {
                $nodeMap[$centerId] = true;
                $nodes[] = [
                    'id' => $centerId,
                    'judul' => $safeGet($centerNode, 'judul'),
                    'nomor' => $safeGet($centerNode, 'nomor'),
                    'tahun' => $safeGet($centerNode, 'tahun'),
                    'jenis' => $safeGet($centerNode, 'jenis'),
                    'unique_id' => $safeGet($centerNode, 'unique_id'),
                    'status' => $safeGet($centerNode, 'status'),
                    'tanggal_penetapan' => $safeGet($centerNode, 'tanggal_penetapan'),
                    'isCenter' => true,
                ];
            }

            if ($row->get('connected') !== null && $row->get('rel_type') !== null) {
                $connectedNode = $row->get('connected');
                $connectedId = $safeGet($connectedNode, 'id');
                $relType = $row->get('rel_type'); // e.g. DIUBAH_OLEH, MENGUBAH, MENCABUT

                // Determine relation direction relative to center for Figma design matching
                $isMerujuk = ($row->get('source_id') === $centerId);
                $relCategory = $isMerujuk ? 'Merujuk' : 'Dirujuk Oleh';

                if (!isset($nodeMap[$connectedId])) {
                    $nodeMap[$connectedId] = true;
                    $nodes[] = [
                        'id' => $connectedId,
                        'judul' => $safeGet($connectedNode, 'judul'),
                        'nomor' => $safeGet($connectedNode, 'nomor'),
                        'tahun' => $safeGet($connectedNode, 'tahun'),
                        'jenis' => $safeGet($connectedNode, 'jenis'),
                        'unique_id' => $safeGet($connectedNode, 'unique_id'),
                        'status' => $safeGet($connectedNode, 'status'),
                        'tanggal_penetapan' => $safeGet($connectedNode, 'tanggal_penetapan'),
                        'isCenter' => false,
                        'relType' => $relType,
                        'relCategory' => $relCategory,
                    ];
                }

                $links[] = [
                    'source' => $row->get('source_id'),
                    'target' => $row->get('target_id'),
                    'type' => $relType,
                    'relCategory' => $relCategory,
                ];
            }
        }

        return [
            'nodes' => $nodes,
            'links' => $links,
        ];
    }
    
    /**
     * Clear all graph data (Dangerous, use for reset only)
     */
    public function clearGraph()
    {
        return $this->client->run('MATCH (n) DETACH DELETE n');
    }
}
