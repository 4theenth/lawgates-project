<?php
$json = json_decode(file_get_contents('storage/app/undang-undang_nomor_29_tahun_2022_tentang_pembentukan_provinsi_papua_barat_daya.json'), true);

$maxPasalNum = 0;
$inPenjelasan = false;

foreach($json['chunks'] as $chunk) {
    $tipe = strtoupper($chunk['tipe'] ?? '');
    
    if ($tipe === 'PASAL') {
        $pasalLabel = $chunk['label'] ?? ''; 
        if (preg_match('/Pasal\s+(\d+)/i', $pasalLabel, $matches)) {
            $currentPasalNum = (int)$matches[1];
            if ($maxPasalNum > 5 && $currentPasalNum < $maxPasalNum && $currentPasalNum <= 3) {
                if (!$inPenjelasan) {
                    echo "SWITCHED TO PENJELASAN at {$pasalLabel} (max seen: $maxPasalNum)\n";
                }
                $inPenjelasan = true;
            }
            if (!$inPenjelasan && $currentPasalNum > $maxPasalNum) {
                $maxPasalNum = $currentPasalNum;
            }
        }
        
        if ($inPenjelasan) {
            echo "PENJELASAN PASAL: " . $chunk['label'] . "\n";
        } else {
            echo "NORMAL PASAL: " . $chunk['label'] . "\n";
        }
    }
}
