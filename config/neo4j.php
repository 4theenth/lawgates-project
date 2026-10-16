<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    */
    'default' => env('NEO4J_CONNECTION', 'default'),

    /*
    |--------------------------------------------------------------------------
    | Neo4j Connections
    |--------------------------------------------------------------------------
    */
    'connections' => [
        'default' => [
            'uri' => env('NEO4J_URI'),
            'scheme' => env('NEO4J_SCHEME', 'bolt'),
            'host' => env('NEO4J_HOST', 'localhost'),
            'port' => env('NEO4J_PORT', '7687'),
            'username' => env('NEO4J_USERNAME', 'neo4j'),
            'password' => env('NEO4J_PASSWORD', 'password'),
        ],
    ],
];
