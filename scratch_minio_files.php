<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$files = \Illuminate\Support\Facades\Storage::disk('minio')->allFiles('documents');
echo "ALL FILES:\n";
print_r($files);
