<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Peraturan;
use App\Models\LawRelation;
use App\Services\Neo4jGraphService;

class SyncNeo4jGraph extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lawgates:sync-neo4j {--fresh : Clear existing graph data before syncing}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync all Peraturan and LawRelations to Neo4j Graph Database';

    /**
     * Execute the console command.
     */
    public function handle(Neo4jGraphService $graphService)
    {
        if ($this->option('fresh')) {
            $this->info('Clearing existing graph data...');
            $graphService->clearGraph();
        }

        $this->info('Syncing Peraturan Nodes...');
        $peraturans = Peraturan::with('jenisPeraturan')->get();
        $bar = $this->output->createProgressBar(count($peraturans));
        
        foreach ($peraturans as $peraturan) {
            try {
                $graphService->upsertPeraturanNode($peraturan);
            } catch (\Exception $e) {
                $this->error("\nFailed to sync Peraturan ID: {$peraturan->id} - " . $e->getMessage());
            }
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        $this->info('Syncing Law Relations...');
        $relations = LawRelation::with('relationType')->get();
        $relationBar = $this->output->createProgressBar(count($relations));

        foreach ($relations as $relation) {
            try {
                $graphService->createRelation($relation);
            } catch (\Exception $e) {
                $this->error("\nFailed to sync Relation ID: {$relation->id} - " . $e->getMessage());
            }
            $relationBar->advance();
        }
        $relationBar->finish();
        $this->newLine();

        $this->info('Neo4j Sync Completed Successfully!');
    }
}
