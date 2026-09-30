<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$service = app(\App\Services\Neo4jGraphService::class);
$peraturans = \App\Models\Peraturan::limit(10)->get();
foreach ($peraturans as $p) {
    $graph = $service->getRegulationGraph($p->id);
    if (!empty($graph['links'])) {
        echo json_encode($graph);
        break;
    }
}
