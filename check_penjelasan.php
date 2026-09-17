<?php
$json = json_decode(file_get_contents('storage/app/undang-undang_nomor_29_tahun_2022_tentang_pembentukan_provinsi_papua_barat_daya.json'), true);

for($i = max(0, count($json['chunks']) - 50); $i < count($json['chunks']); $i++) { 
    $c = $json['chunks'][$i];
    if ($c['tipe'] === 'PASAL' && strpos($c['teks'], 'Pasal 1') === 0) {
        echo "bagian_dokumen for Pasal 1: " . ($c['bagian_dokumen'] ?? 'MISSING') . "\n";
    }
}
