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
     * Check if Neo4j server is reachable with a fast 0.2s socket check
     */
    public function isNeo4jAvailable(): bool
    {
        $host = config('neo4j.connections.default.host', 'localhost');
        $port = (int) config('neo4j.connections.default.port', 7687);

        $connection = @fsockopen($host, $port, $errno, $errstr, 0.2);
        if (is_resource($connection)) {
            fclose($connection);
            return true;
        }

        return false;
    }

    /**
     * Get isolated graph for a specific Peraturan (Nodes, Edges, and Links)
     */
    public function getRegulationGraph(int $peraturanId, int $depth = 1, int $limit = 150)
    {
        if (!$this->isNeo4jAvailable()) {
            throw new \RuntimeException('Neo4j service is unreachable');
        }

        $depth = max(1, min(2, $depth));
        $limit = max(10, min(500, $limit));

        if ($depth === 2) {
            $query = "
                MATCH (center:Peraturan {id: \$id})
                OPTIONAL MATCH path = (center)-[r*1..2]-(connected:Peraturan)
                UNWIND relationships(path) AS rel
                WITH center, connected, rel, startNode(rel).id AS source_id, endNode(rel).id AS target_id, type(rel) AS rel_type
                RETURN center, rel_type, source_id, target_id, connected
                LIMIT \$limit
            ";
        } else {
            $query = "
                MATCH (center:Peraturan {id: \$id})
                OPTIONAL MATCH (center)-[r]-(connected:Peraturan)
                RETURN center, type(r) as rel_type, startNode(r).id AS source_id, endNode(r).id AS target_id, connected
                LIMIT \$limit
            ";
        }

        $result = $this->client->run($query, ['id' => $peraturanId, 'limit' => $limit]);

        $nodes = [];
        $edges = [];
        $nodeMap = [];
        $edgeMap = [];

        // Helper to safely get property since Neo4j removes null properties
        $safeGet = function($node, $key) {
            $props = $node->getProperties();
            return $props->hasKey($key) ? $props->get($key) : null;
        };

        foreach ($result as $row) {
            $centerNode = $row->get('center');
            if ($centerNode === null) continue;
            
            $centerId = (int) $safeGet($centerNode, 'id');
            
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
                $connectedId = (int) $safeGet($connectedNode, 'id');
                $relType = (string) $row->get('rel_type');
                $sourceId = (int) $row->get('source_id');
                $targetId = (int) $row->get('target_id');

                $relTypeRaw = strtoupper($relType);
                $isSourceCenter = ($sourceId === $centerId);

                // Determine precise category based on rel_type and direction relative to center
                if (str_contains($relTypeRaw, 'CABUT')) {
                    $relCategory = $isSourceCenter ? 'Mencabut' : 'Dicabut Oleh';
                } elseif (str_contains($relTypeRaw, 'UBAH')) {
                    $relCategory = $isSourceCenter ? 'Mengubah' : 'Diubah Oleh';
                } elseif (str_contains($relTypeRaw, 'RUJUK') || str_contains($relTypeRaw, 'INGAT') || str_contains($relTypeRaw, 'TIMBANG')) {
                    $relCategory = $isSourceCenter ? 'Merujuk' : 'Dirujuk Oleh';
                } else {
                    if ($relTypeRaw === 'DIUBAH_OLEH') {
                        $relCategory = 'Diubah Oleh';
                    } elseif ($relTypeRaw === 'DICABUT_OLEH') {
                        $relCategory = 'Dicabut Oleh';
                    } elseif ($relTypeRaw === 'DIRUJUK_OLEH') {
                        $relCategory = 'Dirujuk Oleh';
                    } else {
                        $relCategory = $isSourceCenter ? 'Merujuk' : 'Dirujuk Oleh';
                    }
                }

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

                $edgeKey = "{$sourceId}-{$targetId}-{$relType}";
                if (!isset($edgeMap[$edgeKey])) {
                    $edgeMap[$edgeKey] = true;
                    $edges[] = [
                        'source_id' => $sourceId,
                        'target_id' => $targetId,
                        'relation_type' => $relType,
                        'source' => $sourceId,
                        'target' => $targetId,
                        'type' => $relType,
                        'relCategory' => $relCategory,
                    ];
                }
            }
        }

        // Fetch relations between connected satellite nodes themselves if any exist in Neo4j
        $connectedIds = array_keys(array_filter($nodeMap, fn($id) => $id !== $centerId, ARRAY_FILTER_USE_KEY));
        if (count($connectedIds) > 1) {
            try {
                $interQuery = '
                    MATCH (c1:Peraturan)-[r]->(c2:Peraturan)
                    WHERE c1.id IN $ids AND c2.id IN $ids AND c1.id <> c2.id
                    RETURN c1.id AS source_id, c2.id AS target_id, type(r) AS rel_type
                    LIMIT 100
                ';
                $interResult = $this->client->run($interQuery, ['ids' => array_map('intval', $connectedIds)]);

                foreach ($interResult as $row) {
                    $src = (int) $row->get('source_id');
                    $tgt = (int) $row->get('target_id');
                    $rType = (string) ($row->get('rel_type') ?? 'RELATED_TO');
                    $edgeKey = "{$src}-{$tgt}-{$rType}";

                    if (!isset($edgeMap[$edgeKey])) {
                        $edgeMap[$edgeKey] = true;
                        $edges[] = [
                            'source_id' => $src,
                            'target_id' => $tgt,
                            'relation_type' => $rType,
                            'source' => $src,
                            'target' => $tgt,
                            'type' => $rType,
                            'relCategory' => 'Inter-Relasi',
                        ];
                    }
                }
            } catch (\Exception $e) {
                // Ignore if inter-relation query fails
            }
        }

        return [
            'nodes' => $nodes,
            'edges' => $edges,
            'links' => $edges, // Backward compatibility
            'depth' => $depth,
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
