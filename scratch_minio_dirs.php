<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$dirs = \Illuminate\Support\Facades\Storage::disk('minio')->allDirectories('documents');
echo "ALL DIRS:\n";
print_r($dirs);
