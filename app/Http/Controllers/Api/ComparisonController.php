<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use App\Models\LawRelation;
use Illuminate\Http\Request;

class ComparisonController extends Controller
{
    public function getLineage($unique_id)
    {
        $current = Peraturan::with(['jenisPeraturan', 'statusPeraturan'])->where('unique_id', $unique_id)->first();
        if (!$current) {
            return response()->json(['success' => false, 'message' => 'Peraturan tidak ditemukan'], 404);
        }

        $visited = [];
        $queue = [$current->id];
        
        while(count($queue) > 0) {
            $currId = array_shift($queue);
            if (in_array($currId, $visited)) continue;
            
            $visited[] = $currId;
            
            $relationsFrom = LawRelation::where('from_peraturan_id', $currId)
                ->whereHas('relationType', function($q) {
                    $q->where('nama_relasi', 'ilike', '%ubah%')
                      ->orWhere('nama_relasi', 'ilike', '%cabut sebagian%');
                })->get();
                
            foreach($relationsFrom as $rel) {
                if ($rel->to_peraturan_id && !in_array($rel->to_peraturan_id, $visited)) {
                    $queue[] = $rel->to_peraturan_id;
                }
            }
            
            $relationsTo = LawRelation::where('to_peraturan_id', $currId)
                ->whereHas('relationType', function($q) {
                    $q->where('nama_relasi', 'ilike', '%ubah%')
                      ->orWhere('nama_relasi', 'ilike', '%cabut sebagian%');
                })->get();
                
            foreach($relationsTo as $rel) {
                if ($rel->from_peraturan_id && !in_array($rel->from_peraturan_id, $visited)) {
                    $queue[] = $rel->from_peraturan_id;
                }
            }
        }
        
        $family = Peraturan::with(['jenisPeraturan', 'statusPeraturan'])
            ->whereIn('id', $visited)
            ->orderBy('tanggal_penetapan', 'asc')
            ->get();
        
        $options = $family->map(function($p) {
            return [
                'id' => $p->unique_id,
                'standardId' => $p->unique_id,
                'title' => $p->judul,
                'category' => $p->jenisPeraturan ? $p->jenisPeraturan->nama : '-',
                'tahun' => (string)$p->tahun,
                'tanggalPenetapan' => $p->tanggal_penetapan ? $p->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
                'tempatPenetapan' => $p->tempat_penetapan ?? '-',
                'tanggalBerlaku' => $p->tanggal_penetapan ? $p->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
                'status' => $p->statusPeraturan ? $p->statusPeraturan->nama_status : 'Berlaku',
            ];
        });
        
        return response()->json([
            'success' => true,
            'data' => $options
        ]);
    }

    public function compare(Request $request)
    {
        $leftId = $request->query('left_id');
        $rightId = $request->query('right_id');
        
        $leftDoc = Peraturan::with(['jenisPeraturan', 'statusPeraturan', 'strukturDokumen', 'pasal'])->where('unique_id', $leftId)->first();
        $rightDoc = Peraturan::with(['jenisPeraturan', 'statusPeraturan', 'strukturDokumen', 'pasal'])->where('unique_id', $rightId)->first();
        
        if (!$leftDoc || !$rightDoc) {
            return response()->json(['success' => false, 'message' => 'Salah satu atau kedua dokumen tidak ditemukan'], 404);
        }

        $umumRows = [
            $this->createRow('Kategori', $leftDoc->jenisPeraturan->nama ?? '-', $rightDoc->jenisPeraturan->nama ?? '-'),
            $this->createRow('Tahun', (string)$leftDoc->tahun, (string)$rightDoc->tahun),
            $this->createRow('Tanggal Penetapan', 
                $leftDoc->tanggal_penetapan ? $leftDoc->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
                $rightDoc->tanggal_penetapan ? $rightDoc->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-'
            ),
            $this->createRow('Pemrakarsa', $leftDoc->instansi ?? '-', $rightDoc->instansi ?? '-'),
            $this->createRow('Status', 
                $leftDoc->statusPeraturan->nama_status ?? '-',
                $rightDoc->statusPeraturan->nama_status ?? '-'
            ),
        ];

        $extract = function($strukturList, $tipe) {
            $node = $strukturList->where('tipe_struktur', $tipe)->first();
            if ($node) return $node->judul_struktur;
            
            $pembukaan = $strukturList->where('tipe_struktur', 'PEMBUKAAN')->first();
            if ($pembukaan) {
                $text = $pembukaan->judul_struktur;
                if ($tipe == 'KONSIDERANS' && preg_match('/Menimbang\s*:(.*?)(?:Mengingat\s*:|Memutuskan\s*:|$)/is', $text, $m)) return trim($m[1]);
                if ($tipe == 'DASAR_HUKUM' && preg_match('/Mengingat\s*:(.*?)(?:Memutuskan\s*:|$)/is', $text, $m)) return trim($m[1]);
            }
            return '-';
        };

        $pembukaanRows = [
            $this->createRow('Menimbang', 
                $extract($leftDoc->strukturDokumen, 'KONSIDERANS'),
                $extract($rightDoc->strukturDokumen, 'KONSIDERANS')
            ),
            $this->createRow('Mengingat', 
                $extract($leftDoc->strukturDokumen, 'DASAR_HUKUM'),
                $extract($rightDoc->strukturDokumen, 'DASAR_HUKUM')
            ),
        ];

        $sections = [
            ['title' => 'INFORMASI UMUM', 'rows' => $umumRows],
            ['title' => 'PEMBUKAAN', 'rows' => $pembukaanRows]
        ];

        // Cek relasi Peraturan Perubahan
        $targetIdsLeft = \App\Models\LawRelation::where('from_peraturan_id', $leftDoc->id)
            ->whereHas('relationType', function($q) { $q->where('nama_relasi', 'ilike', '%ubah%'); })
            ->pluck('to_peraturan_id')->unique();
            
        $targetIdsRight = \App\Models\LawRelation::where('from_peraturan_id', $rightDoc->id)
            ->whereHas('relationType', function($q) { $q->where('nama_relasi', 'ilike', '%ubah%'); })
            ->pluck('to_peraturan_id')->unique();

        $commonTargetIds = $targetIdsLeft->intersect($targetIdsRight);

        // Fallback ke perbandingan normal untuk semua kasus tanpa NLP
        $leftBabs = $leftDoc->strukturDokumen->where('tipe_struktur', 'BAB');
        $rightBabs = $rightDoc->strukturDokumen->where('tipe_struktur', 'BAB');
        
        if ($leftBabs->isEmpty() && $rightBabs->isEmpty()) {
            $pasalRows = $this->alignPasals($leftDoc->pasal, $rightDoc->pasal);
            if (!empty($pasalRows)) {
                $sections[] = ['title' => 'Batang Tubuh', 'rows' => $pasalRows];
            }
        } else {
            $allBabLabels = collect();
            foreach($leftBabs as $b) {
                $lbl = trim(strtoupper($b->label ?: $b->judul_struktur));
                if ($lbl && !$allBabLabels->contains($lbl)) $allBabLabels->push($lbl);
            }
            foreach($rightBabs as $b) {
                $lbl = trim(strtoupper($b->label ?: $b->judul_struktur));
                if ($lbl && !$allBabLabels->contains($lbl)) $allBabLabels->push($lbl);
            }
            
            foreach ($allBabLabels as $label) {
                $lBab = $leftBabs->filter(function($item) use ($label) {
                    return trim(strtoupper($item->label ?: $item->judul_struktur)) === $label;
                })->first();
                $rBab = $rightBabs->filter(function($item) use ($label) {
                    return trim(strtoupper($item->label ?: $item->judul_struktur)) === $label;
                })->first();
                
                $lPasals = $lBab ? $leftDoc->pasal->where('struktur_id', $lBab->id) : collect();
                $rPasals = $rBab ? $rightDoc->pasal->where('struktur_id', $rBab->id) : collect();
                
                $pasalRows = $this->alignPasals($lPasals, $rPasals);
                if (!empty($pasalRows)) {
                    $title = $label;
                    if ($lBab && $lBab->judul_struktur && $lBab->judul_struktur !== $lBab->label) {
                        $title .= ' - ' . $lBab->judul_struktur;
                    } elseif ($rBab && $rBab->judul_struktur && $rBab->judul_struktur !== $rBab->label) {
                        $title .= ' - ' . $rBab->judul_struktur;
                    }
                    $sections[] = ['title' => $title, 'rows' => $pasalRows];
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'standardIdGroup' => $leftDoc->unique_id,
                'standardIdVerified' => true,
                'acuanAwal' => $this->formatMeta($leftDoc),
                'yangDibandingkan' => $this->formatMeta($rightDoc),
                'sections' => $sections
            ]
        ]);
    }

    private function alignPasals($lPasals, $rPasals)
    {
        $allPasalNumbers = collect();
        foreach($lPasals as $p) {
            $num = trim(strtoupper($p->nomor_pasal));
            if (!empty($num) && !$allPasalNumbers->contains($num)) $allPasalNumbers->push($num);
        }
        foreach($rPasals as $p) {
            $num = trim(strtoupper($p->nomor_pasal));
            if (!empty($num) && !$allPasalNumbers->contains($num)) $allPasalNumbers->push($num);
        }

        $sortedNumbers = $allPasalNumbers->sort(function($a, $b) {
            $parse = function($str) {
                preg_match('/(\d+)([A-Z]*)/i', $str, $matches);
                $num = isset($matches[1]) ? (int)$matches[1] : 0;
                $suf = isset($matches[2]) ? $matches[2] : '';
                return [$num, $suf];
            };
            
            [$numA, $sufA] = $parse($a);
            [$numB, $sufB] = $parse($b);
            
            if ($numA === $numB) {
                return strcmp($sufA, $sufB);
            }
            return $numA - $numB;
        })->values();

        $rows = [];
        foreach ($sortedNumbers as $num) {
            $lP = $lPasals->filter(function($item) use ($num) {
                return trim(strtoupper($item->nomor_pasal)) === (string)$num;
            })->first();
            $rP = $rPasals->filter(function($item) use ($num) {
                return trim(strtoupper($item->nomor_pasal)) === (string)$num;
            })->first();
            
            $lContent = $lP ? $lP->isi_pasal : '';
            $rContent = $rP ? $rP->isi_pasal : '';
            
            if (empty($lContent) && empty($rContent)) continue;

            $diffTypeLeft = 'normal';
            $diffTypeRight = 'normal';
            
            if (empty($lContent) && !empty($rContent)) {
                $diffTypeRight = 'added';
            } elseif (!empty($lContent) && empty($rContent)) {
                $diffTypeLeft = 'deleted';
            } elseif ($lContent !== $rContent) {
                $diffTypeLeft = 'modified';
                $diffTypeRight = 'modified';
            }

            // Convert raw string to array by splitting newlines so UI renders it nicely
            $formatValue = function($content) {
                if (empty($content)) return '';
                $lines = explode("\n", $content);
                return count($lines) > 1 ? $lines : $content;
            };

            $rows[] = [
                'parameter' => 'Pasal ' . $num,
                'leftValue' => $formatValue($lContent),
                'leftDiffType' => $diffTypeLeft,
                'rightValue' => $formatValue($rContent),
                'rightDiffType' => $diffTypeRight
            ];
        }
        return $rows;
    }

    private function createRow($param, $left, $right)
    {
        $formatValue = function($content) {
            if (empty($content)) return '';
            $lines = explode("\n", $content);
            return count($lines) > 1 ? $lines : $content;
        };

        return [
            'parameter' => $param,
            'leftValue' => $formatValue($left),
            'leftDiffType' => 'normal',
            'rightValue' => $formatValue($right),
            'rightDiffType' => 'normal'
        ];
    }
    
    private function formatMeta($p)
    {
        $status = $p->statusPeraturan ? $p->statusPeraturan->nama_status : 'Berlaku';
        $variant = 'default';
        if (str_contains(strtolower($status), 'tidak berlaku') || str_contains(strtolower($status), 'cabut')) {
            $variant = 'danger';
        } else if (str_contains(strtolower($status), 'berlaku')) {
            $variant = 'success';
        }

        return [
            'id' => $p->unique_id,
            'standardId' => $p->unique_id,
            'title' => $p->judul,
            'category' => $p->jenisPeraturan ? $p->jenisPeraturan->nama : '-',
            'tahun' => (string)$p->tahun,
            'tanggalPenetapan' => $p->tanggal_penetapan ? $p->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
            'tempatPenetapan' => $p->tempat_penetapan ?? '-',
            'tanggalBerlaku' => $p->tanggal_penetapan ? $p->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
            'status' => $status,
            'statusVariant' => $variant,
            'pemrakarsa' => $p->instansi ?? '-',
        ];
    }
}
