<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Peraturan;
use App\Models\JenisPeraturan;
use App\Models\Status;

$peraturans = Peraturan::where('jenis_peraturan_id', 4)->get();
foreach ($peraturans as $p) {
    $exists = Peraturan::where('jenis_peraturan_id', 1)
                       ->where('nomor', $p->nomor)
                       ->where('tahun', $p->tahun)
                       ->first();
    if ($exists) {
        $p->forceDelete(); 
    } else {
        $p->jenis_peraturan_id = 1;
        $p->save();
    }
}
JenisPeraturan::find(4)?->delete();

$peraturansStatus = Peraturan::where('status_id', 3)->get();
foreach ($peraturansStatus as $p) {
    $p->status_id = 1;
    $p->save();
}
Status::find(3)?->delete();

echo "Database cleaned up!\n";
