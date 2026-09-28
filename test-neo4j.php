<?php
require 'vendor/autoload.php';

try {
    $client = \Laudis\Neo4j\ClientBuilder::create()
        ->withDriver('default', 'bolt://neo4j:rahasia123@127.0.0.1:7687')
        ->build();

    $result = $client->run('RETURN "Connection Successful" AS message');
    echo $result->first()->get('message') . "\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
