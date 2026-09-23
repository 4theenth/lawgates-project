<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $rel = App\Models\LawRelation::with('relationType', 'fromPeraturan')->whereHas('relationType', function($q) { 
        $q->where('nama_relasi', 'ilike', '%ubah%'); 
    })->first();
    echo $rel->fromPeraturan->unique_id . "\n";
    $res = app('App\Http\Controllers\Api\ComparisonController')->getLineage($rel->fromPeraturan->unique_id);
    echo $res->getContent();
} catch (\Exception $e) {
    echo $e->getMessage() . "\n" . $e->getTraceAsString();
}
