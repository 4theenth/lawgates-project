<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $req = Illuminate\Support\Facades\Request::create('/api/peraturan/compare', 'GET', [
        'left_id' => 'undang-undang_nomor_10_tahun_2015_tentang_penetapan_peraturan_pemerintah_pengganti_undang-undang_nomor_1_tahun_2015_tent',
        'right_id' => 'undang-undang_nomor_19_tahun_2019_tentang_perubahan_kedua_atas_undang-undang_nomor_30_tahun_2002_tentang_komisi_pemberan'
    ]);
    $res = app('App\Http\Controllers\Api\ComparisonController')->compare($req);
    echo $res->getContent();
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
