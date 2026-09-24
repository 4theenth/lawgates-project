<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use App\Models\LawRelation;
use Illuminate\Http\Request;

class ComparisonController extends Controller
{
    /**
     * Mengambil silsilah / lineage regulasi yang berelasi dengan peraturan acuan.
     */
    public function getLineage($unique_id)
    {
        $current = Peraturan::with(['jenisPeraturan', 'statusPeraturan'])->where('unique_id', $unique_id)->first();
        if (!$current) {
            return response()->json(['success' => false, 'message' => 'Peraturan tidak ditemukan'], 404);
        }

        $visited = [];
        $queue = [$current->id];
        
        while (count($queue) > 0) {
            $currId = array_shift($queue);
            if (in_array($currId, $visited)) continue;
            
            $visited[] = $currId;
            
            $relationsFrom = LawRelation::where('from_peraturan_id', $currId)
                ->whereHas('relationType', function($q) {
                    $q->where('nama_relasi', 'ilike', '%ubah%')
                      ->orWhere('nama_relasi', 'ilike', '%cabut sebagian%');
                })->get();
                
            foreach ($relationsFrom as $rel) {
                if ($rel->to_peraturan_id && !in_array($rel->to_peraturan_id, $visited)) {
                    $queue[] = $rel->to_peraturan_id;
                }
            }
            
            $relationsTo = LawRelation::where('to_peraturan_id', $currId)
                ->whereHas('relationType', function($q) {
                    $q->where('nama_relasi', 'ilike', '%ubah%')
                      ->orWhere('nama_relasi', 'ilike', '%cabut sebagian%');
                })->get();
                
            foreach ($relationsTo as $rel) {
                if ($rel->from_peraturan_id && !in_array($rel->from_peraturan_id, $visited)) {
                    $queue[] = $rel->from_peraturan_id;
                }
            }
        }
        
        $family = Peraturan::with(['jenisPeraturan', 'statusPeraturan', 'pasal', 'strukturDokumen'])
            ->whereIn('id', $visited)
            ->get();
        
        // Urutkan: dokumen yang memiliki pasal lebih dulu, lalu berdasarkan tanggal penetapan
        $sortedFamily = $family->sort(function ($a, $b) use ($current) {
            $aCount = $a->pasal->count();
            $bCount = $b->pasal->count();
            if ($aCount > 0 && $bCount === 0) return -1;
            if ($aCount === 0 && $bCount > 0) return 1;

            $aTime = $a->tanggal_penetapan ? $a->tanggal_penetapan->timestamp : 0;
            $bTime = $b->tanggal_penetapan ? $b->tanggal_penetapan->timestamp : 0;
            return $aTime - $bTime;
        })->values();

        $options = $sortedFamily->map(function ($p) use ($current) {
            // Deteksi relasi spesifik terhadap dokumen acuan saat ini
            $relDesc = 'Dokumen Terkait';
            if ($p->id === $current->id) {
                $relDesc = 'Dokumen Acuan Awal';
            } else {
                $isChangingCurrent = LawRelation::where('from_peraturan_id', $p->id)
                    ->where('to_peraturan_id', $current->id)
                    ->whereHas('relationType', fn($q) => $q->where('nama_relasi', 'ilike', '%ubah%'))
                    ->exists();

                $isChangedByCurrent = LawRelation::where('from_peraturan_id', $current->id)
                    ->where('to_peraturan_id', $p->id)
                    ->whereHas('relationType', fn($q) => $q->where('nama_relasi', 'ilike', '%ubah%'))
                    ->exists();

                if ($isChangingCurrent) {
                    $relDesc = 'Mengubah Dokumen Ini';
                } elseif ($isChangedByCurrent) {
                    $relDesc = 'Diubah oleh Dokumen Ini';
                }
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
                'status' => $p->statusPeraturan ? $p->statusPeraturan->nama_status : 'Berlaku',
                'pasalCount' => $p->pasal->count(),
                'isReady' => (bool) $p->is_available,
                'relationDescription' => $relDesc,
            ];
        });
        
        return response()->json([
            'success' => true,
            'data' => $options
        ]);
    }

    /**
     * Membandingkan dua regulasi secara komprehensif.
     */
    public function compare(Request $request)
    {
        $leftId = $request->query('left_id');
        $rightId = $request->query('right_id');
        
        $leftDoc = Peraturan::with(['jenisPeraturan', 'statusPeraturan', 'strukturDokumen', 'pasal'])->where('unique_id', $leftId)->first();
        $rightDoc = Peraturan::with(['jenisPeraturan', 'statusPeraturan', 'strukturDokumen', 'pasal'])->where('unique_id', $rightId)->first();
        
        if (!$leftDoc || !$rightDoc) {
            return response()->json(['success' => false, 'message' => 'Salah satu atau kedua dokumen tidak ditemukan'], 404);
        }

        // Section Informasi Umum
        $umumRows = [
            $this->createRow('Kategori', $leftDoc->jenisPeraturan->nama ?? '-', $rightDoc->jenisPeraturan->nama ?? '-'),
            $this->createRow('Tahun', (string)$leftDoc->tahun, (string)$rightDoc->tahun),
            $this->createRow('Tanggal Penetapan', 
                $leftDoc->tanggal_penetapan ? $leftDoc->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
                $rightDoc->tanggal_penetapan ? $rightDoc->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-'
            ),
            $this->createRow('Tempat Penetapan', $leftDoc->tempat_penetapan ?? '-', $rightDoc->tempat_penetapan ?? '-'),
            $this->createRow('Pemrakarsa', $leftDoc->instansi ?? '-', $rightDoc->instansi ?? '-'),
            $this->createRow('Status', 
                $leftDoc->statusPeraturan->nama_status ?? '-',
                $rightDoc->statusPeraturan->nama_status ?? '-'
            ),
        ];

        // Ekstraksi Pembukaan
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

        // Cek Relasi Mengubah / Diubah
        $relRightModifiesLeft = LawRelation::where('from_peraturan_id', $rightDoc->id)
            ->where('to_peraturan_id', $leftDoc->id)
            ->whereHas('relationType', fn($q) => $q->where('nama_relasi', 'ilike', '%ubah%'))
            ->exists();

        $relLeftModifiesRight = LawRelation::where('from_peraturan_id', $leftDoc->id)
            ->where('to_peraturan_id', $rightDoc->id)
            ->whereHas('relationType', fn($q) => $q->where('nama_relasi', 'ilike', '%ubah%'))
            ->exists();

        if ($relRightModifiesLeft || $relLeftModifiesRight) {
            // Mode Peraturan Perubahan: Menyelaraskan teks induk dan teks perubahan
            $indukDoc = $relRightModifiesLeft ? $leftDoc : $rightDoc;
            $pengubahDoc = $relRightModifiesLeft ? $rightDoc : $leftDoc;
            $pengubahIsRight = $relRightModifiesLeft;

            $batangTubuhSections = $this->buildAmendmentSections($indukDoc, $pengubahDoc, $pengubahIsRight);
            $sections = array_merge($sections, $batangTubuhSections);

            $isRelationVerified = true;
            $relationTitle = "Relasi Terverifikasi: {$pengubahDoc->judul} Mengubah {$indukDoc->judul}";
        } else {
            // Mode Komparasi Umum / Sibling
            $batangTubuhSections = $this->buildGeneralComparisonSections($leftDoc, $rightDoc);
            $sections = array_merge($sections, $batangTubuhSections);

            $isRelationVerified = false;
            $relationTitle = "Komparasi Dokumen Hukum";
        }

        // Hitung total pasal yang mengalami perubahan
        $totalChanged = 0;
        foreach ($sections as $s) {
            foreach ($s['rows'] as $r) {
                if (!empty($r['isChanged'])) {
                    $totalChanged++;
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'standardIdGroup' => $leftDoc->unique_id,
                'standardIdVerified' => $isRelationVerified,
                'relationBanner' => [
                    'isRelationVerified' => $isRelationVerified,
                    'relationType' => $isRelationVerified ? 'mengubah' : 'normal',
                    'title' => $relationTitle,
                    'subtitle' => $isRelationVerified
                        ? "Terdapat {$totalChanged} pasal yang mengalami penambahan, penghapusan, atau penyesuaian."
                        : "Membandingkan dua dokumen hukum berdampingan.",
                    'changedCount' => $totalChanged,
                    'indukId' => isset($indukDoc) ? $indukDoc->unique_id : $leftDoc->unique_id,
                    'pengubahId' => isset($pengubahDoc) ? $pengubahDoc->unique_id : $rightDoc->unique_id,
                ],
                'acuanAwal' => $this->formatMeta($leftDoc),
                'yangDibandingkan' => $this->formatMeta($rightDoc),
                'sections' => $sections,
                'totalChangedPasal' => $totalChanged
            ]
        ]);
    }

    /**
     * Membangun section Batang Tubuh untuk komparasi Peraturan Induk vs Peraturan Pengubah.
     * Mengikuti struktur dokumen induk, menyisipkan pasal baru (misal 24A),
     * dan menandai pasal yang diubah/ditambah/dihapus.
     */
    private function buildAmendmentSections($indukDoc, $pengubahDoc, bool $pengubahIsRight)
    {
        $normalizePasalNum = function($str) {
            if (empty($str)) return '';
            $cleaned = trim(preg_replace('/^pasal\s*/i', '', trim($str)));
            return strtoupper($cleaned);
        };

        $parsePasal = function($str) {
            preg_match('/^(\d+)([A-Z]*)/i', $str, $matches);
            $num = isset($matches[1]) ? (int)$matches[1] : 0;
            $suf = isset($matches[2]) ? strtoupper($matches[2]) : '';
            return [$num, $suf];
        };

        // 1. Peta pasal pengubah
        $pengubahMap = [];
        foreach ($pengubahDoc->pasal as $p) {
            $numNorm = $normalizePasalNum($p->nomor_pasal);
            if ($numNorm !== '') {
                $pengubahMap[$numNorm] = $p;
            }
        }

        // 2. Ambil seluruh BAB dari dokumen induk
        $indukBabs = $indukDoc->strukturDokumen->where('tipe_struktur', 'BAB');
        $sections = [];

        if ($indukBabs->isEmpty()) {
            // Jika dokumen induk tidak memiliki BAB, bandingkan langsung seluruh pasalnya
            $allPasalNums = collect();
            foreach ($indukDoc->pasal as $p) {
                $n = $normalizePasalNum($p->nomor_pasal);
                if ($n && !$allPasalNums->contains($n)) $allPasalNums->push($n);
            }
            foreach (array_keys($pengubahMap) as $n) {
                if ($n && !$allPasalNums->contains($n)) $allPasalNums->push($n);
            }

            $sortedNums = $this->sortPasalNumbers($allPasalNums, $parsePasal);
            $rows = [];
            foreach ($sortedNums as $num) {
                $indukP = $indukDoc->pasal->first(fn($p) => $normalizePasalNum($p->nomor_pasal) === $num);
                $pengubahP = $pengubahMap[$num] ?? null;
                $rows[] = $this->buildAmendmentRow($num, $indukP, $pengubahP, $pengubahIsRight, $indukDoc);
            }

            if (!empty($rows)) {
                $sections[] = ['title' => 'BATANG TUBUH', 'rows' => $rows];
            }
            return $sections;
        }

        // 3. Dokumen memiliki BAB: kumpulkan semua struktur ID di bawah tiap BAB (termasuk Bagian & Paragraf)
        $placedPengubahNums = [];

        foreach ($indukBabs as $bab) {
            $babStrukturIds = [$bab->id];
            $bagianIds = $indukDoc->strukturDokumen->where('parent_id', $bab->id)->pluck('id')->toArray();
            $babStrukturIds = array_merge($babStrukturIds, $bagianIds);
            $paragrafIds = $indukDoc->strukturDokumen->whereIn('parent_id', $bagianIds)->pluck('id')->toArray();
            $babStrukturIds = array_merge($babStrukturIds, $paragrafIds);

            // Pasal-pasal induk di dalam BAB ini
            $bPasals = $indukDoc->pasal->whereIn('struktur_id', $babStrukturIds);
            
            $babPasalNums = collect();
            foreach ($bPasals as $p) {
                $n = $normalizePasalNum($p->nomor_pasal);
                if ($n && !$babPasalNums->contains($n)) {
                    $babPasalNums->push($n);
                }
            }

            // Temukan batas nomor pasal terkecil dan terbesar pada BAB ini
            $minNum = 999999;
            $maxNum = 0;
            foreach ($babPasalNums as $n) {
                [$numVal, $suf] = $parsePasal($n);
                if ($numVal > 0) {
                    if ($numVal < $minNum) $minNum = $numVal;
                    if ($numVal > $maxNum) $maxNum = $numVal;
                }
            }

            // Sisipkan pasal baru dari pengubah yang nomor dasarnya berada di dalam rentang BAB ini
            // (Contoh: Pasal 24A memiliki nomor dasar 24, masuk ke BAB IV yang merentang dari Pasal 24 s/d 33)
            foreach ($pengubahMap as $numKey => $pObj) {
                if (in_array($numKey, $placedPengubahNums)) continue;
                [$pNum, $pSuf] = $parsePasal($numKey);
                if ($pNum >= $minNum && $pNum <= $maxNum) {
                    if (!$babPasalNums->contains($numKey)) {
                        $babPasalNums->push($numKey);
                    }
                    $placedPengubahNums[] = $numKey;
                }
            }

            // Urutkan pasal secara logis (24 -> 24A -> 25)
            $sortedBabNums = $this->sortPasalNumbers($babPasalNums, $parsePasal);

            $rows = [];
            foreach ($sortedBabNums as $num) {
                $indukP = $indukDoc->pasal->first(fn($p) => $normalizePasalNum($p->nomor_pasal) === $num);
                $pengubahP = $pengubahMap[$num] ?? null;
                $rows[] = $this->buildAmendmentRow($num, $indukP, $pengubahP, $pengubahIsRight, $indukDoc);
            }

            if (!empty($rows)) {
                $title = trim($bab->label ?: $bab->judul_struktur);
                if ($bab->judul_struktur && $bab->judul_struktur !== $bab->label) {
                    $title .= ' - ' . trim($bab->judul_struktur);
                }
                $sections[] = ['title' => $title, 'rows' => $rows];
            }
        }

        // 4. Jika ada pasal pengubah yang belum masuk BAB manapun, masukkan ke BAB Penutup / Tambahan
        $remainingPengubah = array_diff(array_keys($pengubahMap), $placedPengubahNums);
        if (!empty($remainingPengubah)) {
            $sortedRemaining = $this->sortPasalNumbers(collect($remainingPengubah), $parsePasal);
            $rows = [];
            foreach ($sortedRemaining as $num) {
                $indukP = $indukDoc->pasal->first(fn($p) => $normalizePasalNum($p->nomor_pasal) === $num);
                $pengubahP = $pengubahMap[$num] ?? null;
                $rows[] = $this->buildAmendmentRow($num, $indukP, $pengubahP, $pengubahIsRight, $indukDoc);
            }
            $sections[] = ['title' => 'PASAL SISIPAN / PERUBAHAN TAMBAHAN', 'rows' => $rows];
        }

        return $sections;
    }

    /**
     * Membangun satu baris komparasi untuk pasal (Induk vs Pengubah).
     */
    private function buildAmendmentRow($num, $indukPasal, $pengubahPasal, bool $pengubahIsRight, $indukDoc)
    {
        $param = 'Pasal ' . $num;
        $formatValue = function($content) {
            if (empty($content)) return '';
            $lines = explode("\n", $content);
            return count($lines) > 1 ? $lines : $content;
        };

        if ($pengubahPasal) {
            $pengubahText = trim($pengubahPasal->isi_pasal);

            if ($indukPasal) {
                // Kasus: Pasal Diubah / Direvisi atau Dihapus
                $indukText = trim($indukPasal->isi_pasal);

                // Cek apakah pasal ini dihapus (misal teks "Ketentuan Pasal X dihapus")
                $isDeleted = (preg_match('/dihapus/i', $pengubahText) && !preg_match('/diubah\s+sehingga\s+berbunyi/i', $pengubahText));

                if ($isDeleted) {
                    $diffType = 'deleted';
                } else {
                    $diffType = 'modified';
                }

                return [
                    'parameter' => $param,
                    'leftValue' => $formatValue($pengubahIsRight ? $indukText : $pengubahText),
                    'leftDiffType' => $pengubahIsRight ? ($diffType === 'deleted' ? 'deleted' : 'normal') : $diffType,
                    'rightValue' => $formatValue($pengubahIsRight ? $pengubahText : $indukText),
                    'rightDiffType' => $pengubahIsRight ? $diffType : ($diffType === 'deleted' ? 'deleted' : 'normal'),
                    'isChanged' => true,
                ];
            } else {
                // Kasus: Pasal Baru / Disisipkan (Contoh: Pasal 24A)
                $placeholder = '(Belum diatur pada ' . $indukDoc->judul . ')';

                return [
                    'parameter' => $param,
                    'leftValue' => $formatValue($pengubahIsRight ? $placeholder : $pengubahText),
                    'leftDiffType' => $pengubahIsRight ? 'normal' : 'added',
                    'rightValue' => $formatValue($pengubahIsRight ? $pengubahText : $placeholder),
                    'rightDiffType' => $pengubahIsRight ? 'added' : 'normal',
                    'isChanged' => true,
                ];
            }
        } else {
            // Kasus: Pasal Tetap (Tidak mengalami perubahan pada UU Pengubah)
            $indukText = $indukPasal ? trim($indukPasal->isi_pasal) : '-';
            $placeholder = 'Tetap (Mengikuti ketentuan ' . $indukDoc->judul . ')';

            return [
                'parameter' => $param,
                'leftValue' => $formatValue($pengubahIsRight ? $indukText : $placeholder),
                'leftDiffType' => 'normal',
                'rightValue' => $formatValue($pengubahIsRight ? $placeholder : $indukText),
                'rightDiffType' => 'normal',
                'isChanged' => false,
            ];
        }
    }

    /**
     * Membangun perbandingan umum untuk dua dokumen yang bukan relasi induk-perubahan.
     */
    private function buildGeneralComparisonSections($leftDoc, $rightDoc)
    {
        $leftBabs = $leftDoc->strukturDokumen->where('tipe_struktur', 'BAB');
        $rightBabs = $rightDoc->strukturDokumen->where('tipe_struktur', 'BAB');
        $sections = [];

        if ($leftBabs->isEmpty() && $rightBabs->isEmpty()) {
            $pasalRows = $this->alignPasals($leftDoc->pasal, $rightDoc->pasal);
            if (!empty($pasalRows)) {
                $sections[] = ['title' => 'BATANG TUBUH', 'rows' => $pasalRows];
            }
        } else {
            $allBabLabels = collect();
            foreach ($leftBabs as $b) {
                $lbl = trim(strtoupper($b->label ?: $b->judul_struktur));
                if ($lbl && !$allBabLabels->contains($lbl)) $allBabLabels->push($lbl);
            }
            foreach ($rightBabs as $b) {
                $lbl = trim(strtoupper($b->label ?: $b->judul_struktur));
                if ($lbl && !$allBabLabels->contains($lbl)) $allBabLabels->push($lbl);
            }
            
            foreach ($allBabLabels as $label) {
                $lBab = $leftBabs->first(fn($item) => trim(strtoupper($item->label ?: $item->judul_struktur)) === $label);
                $rBab = $rightBabs->first(fn($item) => trim(strtoupper($item->label ?: $item->judul_struktur)) === $label);
                
                $getPasals = function($doc, $bab) {
                    if (!$bab) return collect();
                    $bIds = [$bab->id];
                    $subIds = $doc->strukturDokumen->where('parent_id', $bab->id)->pluck('id')->toArray();
                    $bIds = array_merge($bIds, $subIds);
                    $subSubIds = $doc->strukturDokumen->whereIn('parent_id', $subIds)->pluck('id')->toArray();
                    $bIds = array_merge($bIds, $subSubIds);
                    return $doc->pasal->whereIn('struktur_id', $bIds);
                };

                $lPasals = $getPasals($leftDoc, $lBab);
                $rPasals = $getPasals($rightDoc, $rBab);
                
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

        return $sections;
    }

    private function sortPasalNumbers($collection, $parsePasal)
    {
        return $collection->sort(function($a, $b) use ($parsePasal) {
            [$numA, $sufA] = $parsePasal($a);
            [$numB, $sufB] = $parsePasal($b);
            if ($numA === $numB) {
                return strcmp($sufA, $sufB);
            }
            return $numA - $numB;
        })->values();
    }

    private function alignPasals($lPasals, $rPasals)
    {
        $allPasalNumbers = collect();
        foreach ($lPasals as $p) {
            $num = trim(strtoupper($p->nomor_pasal));
            if (!empty($num) && !$allPasalNumbers->contains($num)) $allPasalNumbers->push($num);
        }
        foreach ($rPasals as $p) {
            $num = trim(strtoupper($p->nomor_pasal));
            if (!empty($num) && !$allPasalNumbers->contains($num)) $allPasalNumbers->push($num);
        }

        $sortedNumbers = $this->sortPasalNumbers($allPasalNumbers, function($str) {
            preg_match('/(\d+)([A-Z]*)/i', $str, $matches);
            $num = isset($matches[1]) ? (int)$matches[1] : 0;
            $suf = isset($matches[2]) ? $matches[2] : '';
            return [$num, $suf];
        });

        $rows = [];
        foreach ($sortedNumbers as $num) {
            $lP = $lPasals->filter(fn($item) => trim(strtoupper($item->nomor_pasal)) === (string)$num)->first();
            $rP = $rPasals->filter(fn($item) => trim(strtoupper($item->nomor_pasal)) === (string)$num)->first();
            
            $lContent = $lP ? $lP->isi_pasal : '';
            $rContent = $rP ? $rP->isi_pasal : '';
            
            if (empty($lContent) && empty($rContent)) continue;

            $diffTypeLeft = 'normal';
            $diffTypeRight = 'normal';
            $isChanged = false;
            
            if (empty($lContent) && !empty($rContent)) {
                $diffTypeRight = 'added';
                $isChanged = true;
            } elseif (!empty($lContent) && empty($rContent)) {
                $diffTypeLeft = 'deleted';
                $isChanged = true;
            } elseif ($lContent !== $rContent) {
                $diffTypeLeft = 'modified';
                $diffTypeRight = 'modified';
                $isChanged = true;
            }

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
                'rightDiffType' => $diffTypeRight,
                'isChanged' => $isChanged,
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
            'rightDiffType' => 'normal',
            'isChanged' => false,
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
