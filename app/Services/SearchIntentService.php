<?php

namespace App\Services;

class SearchIntentService
{
    /**
     * Pola deteksi jenis peraturan perundang-undangan Indonesia
     */
    protected array $typePatterns = [
        'UUD 1945' => '/\b(uud\s*1945|undang[\s\-]*undang\s*dasar(\s*1945)?)\b/i',
        'TAP MPR' => '/\b(tap\s*mpr|ketetapan\s*mpr)\b/i',
        'UU' => '/\b(uu|undang[\s\-]*undang)\b/i',
        'PERPPU' => '/\b(perppu|peraturan\s*pemerintah\s*pengganti\s*undang[\s\-]*undang)\b/i',
        'PP' => '/\b(pp|peraturan\s*pemerintah)\b/i',
        'PERPRES' => '/\b(perpres|peraturan\s*presiden)\b/i',
        'PERMEN' => '/\b(permen|permendagri|permenaker|permenkeu|permenkes|permenhub|permenkominfo|peraturan\s*menteri)\b/i',
        'PERDA' => '/\b(perda|peraturan\s*daerah)\b/i',
        'KEPPRES' => '/\b(keppres|keputusan\s*presiden)\b/i',
        'INPRES' => '/\b(inpres|instruksi\s*presiden)\b/i',
    ];

    /**
     * Kata-kata penanda konteks topik / masalah hukum / pertanyaan semantik
     */
    protected array $topicKeywords = [
        'tentang', 'untuk', 'terkait', 'mengenai', 'soal', 'hal', 'aturan',
        'pedoman', 'ketentuan', 'syarat', 'tata cara', 'hak', 'kewajiban',
        'sanksi', 'larangan', 'pidana', 'hukuman', 'gaji', 'upah', 'pesangon',
        'cuti', 'pajak', 'izin', 'pembubaran', 'pendirian', 'apakah', 'bagaimana',
        'kapan', 'siapa', 'bolehkah', 'wewenang', 'kewenangan', 'tanggung jawab',
        'prosedur', 'mekanisme', 'denda', 'kejahatan', 'pelanggaran', 'perlindungan',
        'jaminan', 'perjanjian', 'kontrak', 'ganti rugi', 'pemutusan hubungan kerja',
        'phk', 'korupsi', 'pencucian uang', 'narkotika', 'lingkungan hidup',
    ];

    /**
     * Peta padanan istilah umum ke terminologi hukum formal (statutory synonyms).
     * Dikelola secara in-memory untuk kecepatan instan tanpa overhead query tabel database.
     */
    protected array $statutorySynonyms = [
        'usia' => ['umur', 'mencapai umur'],
        'umur' => ['usia', 'mencapai umur'],
        'pernikahan' => ['perkawinan', 'kawin'],
        'menikah' => ['kawin', 'perkawinan'],
        'kawin' => ['perkawinan', 'menikah'],
        'gaji' => ['upah', 'imbalan'],
        'upah' => ['gaji', 'imbalan'],
        'hukuman' => ['pidana', 'sanksi'],
        'pidana' => ['hukuman', 'sanksi'],
        'pecat' => ['pemutusan hubungan kerja', 'phk', 'pemberhentian'],
        'dipecat' => ['pemutusan hubungan kerja', 'phk', 'diberhentikan'],
        'phk' => ['pemutusan hubungan kerja', 'pemberhentian'],
        'penjara' => ['kurungan', 'pidana penjara'],
        'denda' => ['pidana denda'],
        'ijin' => ['izin', 'perizinan'],
        'izin' => ['ijin', 'perizinan'],
        'ongkos' => ['biaya', 'tarif'],
        'biaya' => ['tarif', 'retribusi', 'pungutan'],
        'anak' => ['anak di bawah umur', 'belum dewasa'],
    ];

    /**
     * Mengambil padanan istilah yuridis secara in-memory.
     *
     * @return array<string> Daftar kata/frasa padanan hukum
     */
    public function getSynonyms(string $query): array
    {
        $lower = mb_strtolower($query);
        $words = preg_split('/[\s\-_,\.]+/', $lower);
        $results = [];

        foreach ($words as $word) {
            if (isset($this->statutorySynonyms[$word])) {
                foreach ($this->statutorySynonyms[$word] as $syn) {
                    $results[] = $syn;
                }
            }
        }

        return array_values(array_unique($results));
    }

    /**
     * Menganalisis query pengguna untuk menentukan intent pencarian:
     * - 'metadata' (Pencarian Dokumen / Nomor): jenis + nomor + tahun, tanpa topik
     * - 'hybrid' (Kombinasi Dokumen + Subjek): menyebut peraturan + topik/masalah spesifik
     * - 'semantic' (Pencarian Pintar AI): pertanyaan bebas, masalah hukum, atau frasa konseptual
     *
     * @return array{
     *     mode: 'metadata'|'hybrid'|'semantic',
     *     label: string,
     *     detected_type: ?string,
     *     detected_number: ?string,
     *     detected_year: ?int,
     *     semantic_query: ?string,
     *     clean_keyword: string,
     *     synonyms: array<string>
     * }
     */
    public function analyze(string $rawQuery): array
    {
        $query = trim($rawQuery);
        if ($query === '') {
            return [
                'mode' => 'metadata',
                'label' => 'Semua Dokumen',
                'detected_type' => null,
                'detected_number' => null,
                'detected_year' => null,
                'semantic_query' => null,
                'clean_keyword' => '',
                'synonyms' => [],
            ];
        }

        $detectedType = null;
        foreach ($this->typePatterns as $typeKey => $pattern) {
            if (preg_match($pattern, $query)) {
                $detectedType = $typeKey;
                break;
            }
        }

        // Deteksi nomor regulasi (contoh: "no 13", "nomor 82", "no. 1", "/13/", dsb.)
        $detectedNumber = null;
        if (preg_match('/(?:no\.?|nomor)\s*([0-9]+[a-z]?)/i', $query, $numMatches)) {
            $detectedNumber = $numMatches[1];
        } elseif (preg_match('/\b(?:uu|pp|perpres|perda|permen|perppu)\s+([0-9]+)\b/i', $query, $numMatches)) {
            $detectedNumber = $numMatches[1];
        } elseif (preg_match('/\b([0-9]+)\/(?:19|20)[0-9]{2}\b/', $query, $numMatches)) {
            $detectedNumber = $numMatches[1];
        }

        // Deteksi tahun (4 digit antara 1945 s.d. 2099)
        $detectedYear = null;
        if (preg_match('/\b(19[4-9][0-9]|20[0-9]{2})\b/', $query, $yearMatches)) {
            $detectedYear = (int) $yearMatches[1];
        }

        // Deteksi kata penanda topik / pertanyaan semantik
        $hasTopicKeyword = false;
        $matchedTopicWords = [];
        $lowerQuery = mb_strtolower($query);

        foreach ($this->topicKeywords as $kw) {
            if (preg_match('/\b'.preg_quote($kw, '/').'\b/i', $lowerQuery)) {
                $hasTopicKeyword = true;
                $matchedTopicWords[] = $kw;
            }
        }

        // Hitung jumlah kata unik
        $tokens = array_filter(preg_split('/[\s\-_,\.]+/', $lowerQuery));
        $wordCount = count($tokens);

        // KASUS 1: Pencarian Dokumen Eksak (Metadata)
        // User mencari spesifik: jenis + nomor, atau nomor + tahun, atau jenis + nomor + tahun,
        // atau kode hukum baku (UUD 1945, KUHP, KUHPerdata, KUHAP) dan TIDAK mencantumkan kata kunci topik konseptual
        $isCodexOrConstitution = preg_match('/\b(uud\s*1945|kuhp|kuhperdata|kuhap)\b/i', $query);
        $isExactCitation = ($detectedType && $detectedNumber) || ($detectedNumber && $detectedYear) || $isCodexOrConstitution;

        $synonyms = $this->getSynonyms($query);
        $hint = null;

        if ($isExactCitation && ! $hasTopicKeyword) {
            $labelDetails = trim(($detectedType ?: '') . ($detectedNumber ? " No. {$detectedNumber}" : '') . ($detectedYear ? " Th {$detectedYear}" : ''));
            if ($isCodexOrConstitution && ! $labelDetails) {
                $labelDetails = strtoupper($query);
            }

            return [
                'mode' => 'metadata',
                'label' => "Pencarian Dokumen: {$labelDetails}",
                'detected_type' => $detectedType,
                'detected_number' => $detectedNumber,
                'detected_year' => $detectedYear,
                'semantic_query' => null,
                'clean_keyword' => $query,
                'synonyms' => $synonyms,
                'glosarium_hint' => $hint,
            ];
        }

        // KASUS 2: Pencarian Kombinasi (Hybrid)
        // User menyebut regulasi tertentu TETAPI juga menanyakan pasal/topik di dalamnya
        // Contoh: "UU 13 2003 tentang pesangon" atau "UU Cipta Kerja pasal pesangon PHK"
        if (($detectedType || $detectedNumber) && $hasTopicKeyword) {
            // Ekstrak bagian topik untuk dikirimkan ke model embedding
            // Buang penyebutan jenis, nomor, tahun agar query semantik murni berisi topik hukum
            $semanticQuery = preg_replace('/(?:no\.?|nomor)?\s*[0-9]+[a-z]?/i', ' ', $query);
            $semanticQuery = preg_replace('/\b(19[4-9][0-9]|20[0-9]{2})\b/', ' ', $semanticQuery);
            foreach ($this->typePatterns as $pattern) {
                $semanticQuery = preg_replace($pattern, ' ', $semanticQuery);
            }
            // Bersihkan kata hubung awal seperti "tentang", "untuk", "terkait", "mengenai"
            $semanticQuery = preg_replace('/^\s*(tentang|untuk|terkait|mengenai|soal|hal)\s+/i', '', trim($semanticQuery));
            $semanticQuery = trim(preg_replace('/\s+/', ' ', $semanticQuery));

            if ($semanticQuery === '') {
                $semanticQuery = $query;
            }

            $expandedSemantic = $semanticQuery;
            if (!empty($synonyms)) {
                $missingSyns = array_filter($synonyms, fn($s) => !str_contains(mb_strtolower($semanticQuery), mb_strtolower($s)));
                if (!empty($missingSyns)) {
                    $expandedSemantic .= ' ' . implode(' ', array_slice($missingSyns, 0, 3));
                }
            }

            return [
                'mode' => 'hybrid',
                'label' => 'Pencarian Kombinasi: Dokumen & Topik',
                'detected_type' => $detectedType,
                'detected_number' => $detectedNumber,
                'detected_year' => $detectedYear,
                'semantic_query' => $expandedSemantic,
                'clean_keyword' => $query,
                'synonyms' => $synonyms,
                'glosarium_hint' => $hint,
            ];
        }

        // KASUS 3: Pencarian Pintar AI (Semantic Search)
        // Pertanyaan konseptual, masalah hukum, atau subjek (contoh: "peraturan untuk mendirikan pt", "hukuman uang palsu", "hak buruh wanita")
        $expandedSemantic = $query;
        if (!empty($synonyms)) {
            $missingSyns = array_filter($synonyms, fn($s) => !str_contains(mb_strtolower($query), mb_strtolower($s)));
            if (!empty($missingSyns)) {
                $expandedSemantic .= ' ' . implode(' ', array_slice($missingSyns, 0, 3));
            }
        }

        return [
            'mode' => 'semantic',
            'label' => 'Pencarian Pintar AI: Analisis Makna & Pasal',
            'detected_type' => $detectedType,
            'detected_number' => $detectedNumber,
            'detected_year' => $detectedYear,
            'semantic_query' => $expandedSemantic,
            'clean_keyword' => $query,
            'synonyms' => $synonyms,
            'glosarium_hint' => $hint,
        ];
    }
}
