<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$service = app(\App\Services\Neo4jGraphService::class);
$data = $service->getRegulationGraph(36);
echo "Nodes:\n";
print_r($data['nodes'][1]);
echo "Links:\n";
print_r($data['links'][0]);
