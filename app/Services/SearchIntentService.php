<?php

namespace App\Services;

use App\Models\JenisPeraturan;
use Illuminate\Support\Facades\Cache;

class SearchIntentService
{
    /**
     * Kata-kata penanda pertanyaan hukum / kalimat tanya percakapan
     */
    protected array $questionKeywords = [
        'apakah', 'bagaimana', 'kapan', 'siapa', 'kenapa', 'mengapa', 'bolehkah',
        'berapa', 'adakah', 'dimana', 'kemana', 'darimana', 'bisakah', 'apa',
    ];

    /**
     * Kata-kata penanda substansi materi / masalah hukum spesifik pada isi pasal
     */
    protected array $ruleSubstanceKeywords = [
        'pesangon', 'cuti', 'sanksi', 'denda', 'pidana', 'hukuman', 'gaji', 'upah',
        'hak', 'kewajiban', 'syarat', 'tata cara', 'prosedur', 'mekanisme', 'wewenang',
        'kewenangan', 'larangan', 'tanggung jawab', 'ganti rugi', 'phk',
        'pemutusan hubungan kerja', 'istirahat', 'melahirkan', 'hamil',
        'pensiun', 'retribusi', 'tarif', 'pembubaran', 'pendirian',
        'korupsi', 'pencucian uang', 'narkotika', 'kejahatan', 'pelanggaran',
        'gugatan', 'kasasi', 'banding', 'peninjauan kembali',
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
        'sanksi' => ['hukuman', 'pidana', 'denda'],
        'pecat' => ['pemutusan hubungan kerja', 'phk', 'pemberhentian'],
        'dipecat' => ['pemutusan hubungan kerja', 'phk', 'diberhentikan'],
        'phk' => ['pemutusan hubungan kerja', 'pemberhentian'],
        'pesangon' => ['uang pesangon', 'uang penghargaan masa kerja', 'uang penggantian hak'],
        'karyawan' => ['pekerja', 'buruh'],
        'pegawai' => ['pekerja', 'buruh', 'aparatur sipil negara'],
        'buruh' => ['pekerja', 'tenaga kerja'],
        'pekerja' => ['buruh', 'tenaga kerja'],
        'hamil' => ['melahirkan', 'kehamilan', 'gugur kandungan'],
        'melahirkan' => ['hamil', 'kehamilan', 'persalinan'],
        'cuti' => ['istirahat', 'waktu istirahat'],
        'istirahat' => ['cuti', 'waktu istirahat'],
        'penjara' => ['kurungan', 'pidana penjara'],
        'denda' => ['pidana denda'],
        'ijin' => ['izin', 'perizinan'],
        'izin' => ['ijin', 'perizinan'],
        'ongkos' => ['biaya', 'tarif'],
        'biaya' => ['tarif', 'retribusi', 'pungutan'],
        'anak' => ['anak di bawah umur', 'belum dewasa'],
        'sawit' => ['kelapa sawit'],
        'kelapa sawit' => ['sawit'],
        'pt' => ['perseroan', 'perseroan terbatas'],
        'pt perorangan' => ['perseroan', 'usaha mikro dan kecil'],
        'perorangan' => ['perseroan', 'usaha mikro dan kecil'],
        'mendirikan' => ['pendirian', 'pembentukan', 'perizinan berusaha'],
        'radioaktif' => ['ketenaganukliran', 'radiasi pengion'],
        'nuklir' => ['ketenaganukliran', 'tenaga nuklir'],
        'uang' => ['mata uang', 'uang kertas', 'rupiah', 'alat pembayaran'],
        'memproduksi' => ['membikin', 'membuat', 'mencetak', 'meniru', 'memalsu'],
        'produksi' => ['membikin', 'membuat', 'mencetak', 'meniru', 'memalsu'],
        'palsu' => ['tiruan', 'meniru', 'memalsu', 'tidak sah'],
        'memalsukan' => ['memalsu', 'meniru', 'membikin tiruan'],
        'mencetak' => ['mencetak uang', 'membikin', 'membuat'],
        'mencuri' => ['pencurian', 'mengambil barang milik orang lain'],
        'curi' => ['pencurian', 'mengambil barang milik orang lain'],
        'menipu' => ['penipuan', 'tipu muslihat', 'rangkaian kebohongan'],
        'tipu' => ['penipuan', 'tipu muslihat', 'rangkaian kebohongan'],
        'memukul' => ['penganiayaan', 'kekerasan'],
        'aniaya' => ['penganiayaan', 'kekerasan'],
        'menyerobot' => ['penyerobotan', 'memakai tanah tanpa izin', 'menguasai tanpa hak'],
        'serobot' => ['penyerobotan', 'memakai tanah tanpa izin', 'menguasai tanpa hak'],
        'hina' => ['penghinaan', 'pencemaran nama baik', 'menista'],
        'menghina' => ['penghinaan', 'pencemaran nama baik', 'menista'],
        'membunuh' => ['pembunuhan', 'merampas nyawa orang lain'],
        'bunuh' => ['pembunuhan', 'merampas nyawa orang lain'],
        'utang' => ['piutang', 'perjanjian pinjam meminjam', 'debitor', 'kreditor'],
        'bangkrut' => ['pailit', 'kepailitan', 'penundaan kewajiban pembayaran utang', 'pkpu'],
    ];

    /**
     * Mengekstrak bentuk dasar kata (stemming sederhana) bahasa Indonesia
     * dengan melucuti klitika (-nya, -lah, -kah) dan imbuhan umum (me-, di-, pe-, -kan, -an).
     */
    public function extractIndonesianStem(string $word): string
    {
        $w = mb_strtolower(trim($word));
        // Strip partikel / klitika pronomina di akhir: -lah, -kah, -pun, -nya, -ku, -mu
        $w = (string) preg_replace('/(lah|kah|pun|nya|ku|mu)$/i', '', $w);
        // Strip akhiran infleksi: -kan, -an, -i
        $w = (string) preg_replace('/(kan|an|i)$/i', '', $w);
        // Strip awalan umum: meng-, meny-, men-, mem-, me-, peng-, peny-, pen-, pem-, pe-, di-, ter-, ber-, ke-, se-
        $w = (string) preg_replace('/^(meng|meny|men|mem|me|peng|peny|pen|pem|pe|di|ter|ber|ke|se)/i', '', $w);
        return $w;
    }

    /**
     * Memuat daftar kategori peraturan perundang-undangan secara dinamis dari database.
     * Hasil di-cache dalam waktu 1 jam atau sampai terjadi perubahan pada tabel jenis_peraturan.
     *
     * @return array<int, array{id: int, kode: string, nama: string, pattern: string}>
     */
    public function getDynamicCategories(): array
    {
        return Cache::remember('search_intent_category_patterns', 3600, function () {
            try {
                $categories = JenisPeraturan::where('kode', '!=', 'Lainnya')
                    ->orderByRaw('LENGTH(nama) DESC')
                    ->get(['id', 'kode', 'nama']);

                $list = [];
                foreach ($categories as $cat) {
                    $patterns = [];

                    // 1. Pola dari singkatan / kode (misal: "UU", "PP", "PERPRES", "PERDA", "POJK")
                    $cleanKode = preg_quote(trim($cat->kode), '/');
                    $patterns[] = '\b' . $cleanKode . '\b';

                    // 2. Pola dari nama lengkap (misal: "Peraturan Presiden", "Undang-Undang")
                    $cleanNama = trim($cat->nama);
                    $nameRegex = preg_replace('/\s+/', '\s+', preg_quote($cleanNama, '/'));
                    $nameRegex = str_replace('\-', '[\s\-]*', $nameRegex);
                    $patterns[] = '\b' . $nameRegex . '\b';

                    // 3. Kasus khusus singkatan menteri (jika kode PERMEN)
                    if (strcasecmp($cat->kode, 'PERMEN') === 0) {
                        $patterns[] = '\b(?:permen\w*|peraturan\s*menteri)\b';
                    }

                    // 4. Kasus khusus PERPPU
                    if (strcasecmp($cat->kode, 'PERPPU') === 0) {
                        $patterns[] = '\b(?:perppu|perpu|peraturan\s*pemerintah\s*pengganti\s*undang[\s\-]*undang)\b';
                    }

                    // 5. Kasus khusus UUD / UUD 1945
                    if (strcasecmp($cat->kode, 'UUD') === 0 || str_contains(strtolower($cat->nama), 'undang-undang dasar')) {
                        $patterns[] = '\b(?:uud(\s*1945)?|undang[\s\-]*undang\s*dasar(\s*1945)?)\b';
                    }

                    $mergedPattern = '/(' . implode('|', array_unique($patterns)) . ')/i';

                    $list[] = [
                        'id' => (int) $cat->id,
                        'kode' => $cat->kode,
                        'nama' => $cat->nama,
                        'pattern' => $mergedPattern,
                    ];
                }

                return $list;
            } catch (\Throwable $e) {
                return [];
            }
        });
    }

    /**
     * Mengambil padanan istilah yuridis secara in-memory dengan dukungan stemming morfologi.
     *
     * @return array<string> Daftar kata/frasa padanan hukum
     */
    public function getSynonyms(string $query): array
    {
        $lower = mb_strtolower($query);
        $clean = preg_replace('/[^\p{L}\p{N}\s]+/u', ' ', $lower);
        $words = array_filter(preg_split('/\s+/', $clean));
        $results = [];

        foreach ($words as $word) {
            // Cek kecocokan kata persis
            if (isset($this->statutorySynonyms[$word])) {
                foreach ($this->statutorySynonyms[$word] as $syn) {
                    $results[] = $syn;
                }
            }

            // Cek kecocokan bentuk dasar (stemming morfologi)
            $stem = $this->extractIndonesianStem($word);
            if ($stem !== $word && isset($this->statutorySynonyms[$stem])) {
                foreach ($this->statutorySynonyms[$stem] as $syn) {
                    $results[] = $syn;
                }
            }
        }

        return array_values(array_unique($results));
    }

    /**
     * Menganalisis query pengguna untuk menentukan intent pencarian secara adaptif:
     * - 'metadata' (Tier 1 - Pencarian Dokumen/Kategori Biasa / Judul Regulasi Populer):
     *              jenis saja, nomor, tahun, atau kode hukum baku, atau judul regulasi (contoh: "undang-undang mengenai cipta kerja")
     * - 'hybrid'   (Tier 3 - Kombinasi Dokumen & Topik/Pasal):
     *              menyebut jenis/nama regulasi + materi pasal ("uu cipta kerja tentang pesangon", "pasal 156 uu cipta kerja")
     * - 'semantic' (Tier 2 - Pencarian Pintar AI):
     *              pertanyaan bebas, masalah hukum konseptual, atau bahasa awam ("usia yang bagus untuk menikah", "cuti 12 hari")
     *
     * @return array{
     *     mode: 'metadata'|'hybrid'|'semantic',
     *     label: string,
     *     detected_type: ?string,
     *     detected_category_id: ?int,
     *     detected_number: ?string,
     *     detected_year: ?int,
     *     detected_pasal: ?string,
     *     detected_ayat: ?string,
     *     semantic_query: ?string,
     *     clean_keyword: string,
     *     statute_title: ?string,
     *     synonyms: array<string>,
     *     glosarium_hint: ?string
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
                'detected_category_id' => null,
                'detected_number' => null,
                'detected_year' => null,
                'detected_pasal' => null,
                'detected_ayat' => null,
                'semantic_query' => null,
                'clean_keyword' => '',
                'statute_title' => null,
                'synonyms' => [],
                'glosarium_hint' => null,
            ];
        }

        $lowerQuery = mb_strtolower($query);

        // 1. Deteksi Pasal & Ayat dalam kueri (contoh: "pasal 156", "pasal 27 ayat 2")
        $detectedPasal = null;
        $detectedAyat = null;
        if (preg_match('/\bpasal\s+([0-9]+[a-z]?)(?:\s+ayat\s*\(?([0-9]+[a-z]?)\)?)?/i', $query, $pasalMatches)) {
            $detectedPasal = $pasalMatches[1];
            if (!empty($pasalMatches[2])) {
                $detectedAyat = $pasalMatches[2];
            }
        }

        // 2. Deteksi Kategori Regulasi secara Dinamis dari Database
        $detectedType = null;
        $detectedCategoryId = null;
        $detectedCategoryName = null;
        $matchedCategoryPattern = null;

        $categories = $this->getDynamicCategories();
        foreach ($categories as $cat) {
            if (preg_match($cat['pattern'], $query)) {
                $detectedType = $cat['kode'];
                $detectedCategoryId = $cat['id'];
                $detectedCategoryName = $cat['nama'];
                $matchedCategoryPattern = $cat['pattern'];
                break;
            }
        }

        // 3. Deteksi tahun (4 digit antara 1945 s.d. 2099)
        $detectedYear = null;
        if (preg_match('/\b(19[4-9][0-9]|20[0-9]{2})\b/', $query, $yearMatches)) {
            $detectedYear = (int) $yearMatches[1];
        }

        // 4. Deteksi nomor regulasi secara KETAT (Mencegah Trap Angka seperti "cuti 12 hari", "pesangon 5 tahun", "hukuman 7 tahun")
        $detectedNumber = null;
        // Jangan pernah anggap angka sebagai nomor regulasi jika diikuti satuan metrik/waktu
        $isMetricNumber = (bool) preg_match('/\b[0-9]+\s*(?:hari|bln|bulan|thn|tahun|jam|miliar|juta|ribu|persen|%|orang|kali|meter|kg)\b/i', $query);

        if (!$isMetricNumber) {
            // A. Awalan formal nomor: "no. 13", "nomor 6", "no 11"
            if (preg_match('/(?:no\.?|nomor)\s*([0-9]+[a-z]?)\b/i', $query, $numMatches)) {
                $detectedNumber = $numMatches[1];
            }
            // B. Format garis miring tahun: "13/2003", "6/2023"
            elseif (preg_match('/\b([0-9]+)\/(?:19|20)[0-9]{2}\b/', $query, $numMatches)) {
                $detectedNumber = $numMatches[1];
            }
            // C. Singkatan kategori hukum + angka: "uu 13", "pp 35", "perpres 55", "perpu 2"
            elseif (preg_match('/\b(?!uud\b)(?:uu|pp|perpres|perda|permen|perppu|keppres|inpres|tap\s*mpr|pojk|pbi|sema|pkpu)\s*([0-9]+[a-z]?)\b/i', $query, $numMatches)) {
                // Pastikan bukan angka tahun yang tertangkap kembali
                if (!$detectedYear || (int) $numMatches[1] !== $detectedYear) {
                    $detectedNumber = $numMatches[1];
                }
            }
        }

        // 5. Periksa kata pertanyaan dan kata substansi aturan
        $hasQuestionWord = false;
        foreach ($this->questionKeywords as $qw) {
            if (preg_match('/\b' . preg_quote($qw, '/') . '\b/i', $lowerQuery)) {
                $hasQuestionWord = true;
                break;
            }
        }

        $hasRuleSubstanceWord = false;
        foreach ($this->ruleSubstanceKeywords as $rw) {
            if (preg_match('/\b' . preg_quote($rw, '/') . '\b/i', $lowerQuery)) {
                $hasRuleSubstanceWord = true;
                break;
            }
        }

        // Deteksi frasa pengantar umum: "peraturan mengenai xx", "aturan tentang xx", "hukum terkait xx"
        $isGenericRegulationPrefix = (bool) preg_match('/^\s*(?:peraturan|aturan|hukum|ketentuan|pedoman|kebijakan)\s+(?:tentang|untuk|terkait|mengenai|soal|hal)\s+/i', $query);

        // Ekstrak sisa teks di luar sebutan kategori
        $remainderWithoutCategory = '';
        if ($matchedCategoryPattern) {
            $remainderWithoutCategory = trim((string) preg_replace('/[^\p{L}\p{N}]+/u', ' ', (string) preg_replace($matchedCategoryPattern, '', $lowerQuery)));
        }

        // Ekstrak sisa kata substantif di luar kategori, nomor, tahun, pasal, dan kata pengantar
        $cleanStatuteRemainder = $lowerQuery;
        if ($matchedCategoryPattern) {
            $cleanStatuteRemainder = (string) preg_replace($matchedCategoryPattern, ' ', $cleanStatuteRemainder);
        }
        $cleanStatuteRemainder = (string) preg_replace('/(?:no\.?|nomor)?\s*[0-9]+[a-z]?/i', ' ', $cleanStatuteRemainder);
        $cleanStatuteRemainder = (string) preg_replace('/\b(19[4-9][0-9]|20[0-9]{2})\b/', ' ', $cleanStatuteRemainder);
        $cleanStatuteRemainder = (string) preg_replace('/\bpasal\s+[0-9]+[a-z]?(?:\s+ayat\s*\(?[0-9]+[a-z]?\)?)?/i', ' ', $cleanStatuteRemainder);
        $cleanStatuteRemainder = (string) preg_replace('/^\s*(?:peraturan|aturan|hukum|ketentuan|pedoman|kebijakan)?\s*(?:tentang|untuk|terkait|mengenai|soal|hal)\s+/i', ' ', $cleanStatuteRemainder);
        $cleanStatuteRemainder = trim((string) preg_replace('/\s+/', ' ', $cleanStatuteRemainder));

        $isCategoryOnly = ($detectedType && empty($remainderWithoutCategory));
        $isCodexOrConstitution = (bool) preg_match('/\b(uud\s*1945|kuhp|kuhperdata|kuhap|tap\s*mpr)\b/i', $query);
        $isExactCitation = ($detectedType && $detectedNumber) || ($detectedNumber && $detectedYear) || $isCodexOrConstitution;

        $synonyms = $this->getSynonyms($query);
        $hint = null;

        // ─────────────────────────────────────────────────────────────
        // TIER 1: PENCARIAN DOKUMEN / KATEGORI / JUDUL REGULASI (Metadata Mode)
        // ─────────────────────────────────────────────────────────────

        // Skenario 1A: User hanya mengetik nama kategori (misal: "Perpres", "Undang-Undang", "POJK")
        if ($isCategoryOnly) {
            return [
                'mode' => 'metadata',
                'label' => "Kategori: {$detectedCategoryName}",
                'detected_type' => $detectedType,
                'detected_category_id' => $detectedCategoryId,
                'detected_number' => null,
                'detected_year' => null,
                'detected_pasal' => null,
                'detected_ayat' => null,
                'semantic_query' => null,
                'clean_keyword' => $query,
                'statute_title' => null,
                'synonyms' => $synonyms,
                'glosarium_hint' => $hint,
            ];
        }

        // Skenario 1B: User mencari nomor/tahun/kode regulasi eksak tanpa pasal/substansi spesifik
        if ($isExactCitation && !$hasRuleSubstanceWord && !$hasQuestionWord && empty($detectedPasal)) {
            $labelDetails = trim(($detectedType ?: '') . ($detectedNumber ? " No. {$detectedNumber}" : '') . ($detectedYear ? " Th {$detectedYear}" : ''));
            if ($isCodexOrConstitution && ! $labelDetails) {
                $labelDetails = strtoupper($query);
            }

            return [
                'mode' => 'metadata',
                'label' => "Pencarian Dokumen: {$labelDetails}",
                'detected_type' => $detectedType,
                'detected_category_id' => $detectedCategoryId,
                'detected_number' => $detectedNumber,
                'detected_year' => $detectedYear,
                'detected_pasal' => null,
                'detected_ayat' => null,
                'semantic_query' => null,
                'clean_keyword' => $cleanStatuteRemainder !== '' ? $cleanStatuteRemainder : $query,
                'statute_title' => $cleanStatuteRemainder !== '' ? $cleanStatuteRemainder : null,
                'synonyms' => $synonyms,
                'glosarium_hint' => $hint,
            ];
        }

        // Skenario 1C: User mencari nama/judul regulasi populer dengan sebutan jenis
        // Contoh: "undang-undang mengenai cipta kerja", "uu cipta kerja", "uu ketenagakerjaan", "uu ite", "perpres mobil listrik"
        // CIRI: Menyebut jenis regulasi ATAU pola "peraturan tentang [Nama]", memuat frasa judul,
        // TETAPI TIDAK memuat pertanyaan (apakah, bagaimana, kapan) dan TIDAK memuat kata aturan spesifik (pesangon, cuti, sanksi, denda).
        if (($detectedType || $isGenericRegulationPrefix) && !empty($cleanStatuteRemainder) && !$hasQuestionWord && !$hasRuleSubstanceWord && empty($detectedPasal)) {
            $titleLabel = ucwords($cleanStatuteRemainder);
            $typeName = $detectedCategoryName ?: ($detectedType ?: 'Peraturan');

            return [
                'mode' => 'metadata',
                'label' => "Pencarian Dokumen: {$typeName} {$titleLabel}",
                'detected_type' => $detectedType,
                'detected_category_id' => $detectedCategoryId,
                'detected_number' => $detectedNumber,
                'detected_year' => $detectedYear,
                'detected_pasal' => null,
                'detected_ayat' => null,
                'semantic_query' => null,
                'clean_keyword' => $cleanStatuteRemainder,
                'statute_title' => $cleanStatuteRemainder,
                'synonyms' => $synonyms,
                'glosarium_hint' => $hint,
            ];
        }

        // ─────────────────────────────────────────────────────────────
        // TIER 3: PENCARIAN KOMBINASI (Hybrid Mode)
        // ─────────────────────────────────────────────────────────────
        // Skenario 3A: User menyebut regulasi/nomor/judul DAN topik/pasal spesifik
        // (contoh: "UU 13 2003 tentang pesangon", "UU Cipta Kerja tentang pesangon", "pasal 156 uu cipta kerja")
        if (($detectedType || $detectedNumber || !empty($detectedPasal)) && ($hasRuleSubstanceWord || $hasQuestionWord || !empty($detectedPasal))) {
            // Bersihkan nomor, tahun, dan sebutan jenis agar semantic query berfokus pada substansi topik
            $semanticQuery = preg_replace('/(?:no\.?|nomor)?\s*[0-9]+[a-z]?/i', ' ', $query);
            $semanticQuery = preg_replace('/\b(19[4-9][0-9]|20[0-9]{2})\b/', ' ', (string) $semanticQuery);
            if ($matchedCategoryPattern) {
                $semanticQuery = preg_replace($matchedCategoryPattern, ' ', (string) $semanticQuery);
            }
            $semanticQuery = preg_replace('/^\s*(?:peraturan|aturan|hukum|ketentuan|pedoman|kebijakan)?\s*(?:tentang|untuk|terkait|mengenai|soal|hal)\s+/i', '', trim((string) $semanticQuery));
            $semanticQuery = trim((string) preg_replace('/\s+/', ' ', (string) $semanticQuery));

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
                'detected_category_id' => $detectedCategoryId,
                'detected_number' => $detectedNumber,
                'detected_year' => $detectedYear,
                'detected_pasal' => $detectedPasal,
                'detected_ayat' => $detectedAyat,
                'semantic_query' => $expandedSemantic,
                'clean_keyword' => $query,
                'statute_title' => !empty($cleanStatuteRemainder) ? $cleanStatuteRemainder : null,
                'synonyms' => $synonyms,
                'glosarium_hint' => $hint,
            ];
        }

        // Skenario 3B: User mencari frasa umum regulasi + topik ("peraturan mengenai kelapa sawit", "aturan tentang hak cuti")
        if ($isGenericRegulationPrefix) {
            $semanticQuery = preg_replace('/^\s*(?:peraturan|aturan|hukum|ketentuan|pedoman|kebijakan)\s+(?:tentang|untuk|terkait|mengenai|soal|hal)\s+/i', '', $query);
            $semanticQuery = trim((string) preg_replace('/\s+/', ' ', (string) $semanticQuery));

            $expandedSemantic = $semanticQuery;
            if (!empty($synonyms)) {
                $missingSyns = array_filter($synonyms, fn($s) => !str_contains(mb_strtolower($semanticQuery), mb_strtolower($s)));
                if (!empty($missingSyns)) {
                    $expandedSemantic .= ' ' . implode(' ', array_slice($missingSyns, 0, 3));
                }
            }

            return [
                'mode' => 'hybrid',
                'label' => 'Pencarian Kombinasi: Topik Regulasi',
                'detected_type' => $detectedType,
                'detected_category_id' => $detectedCategoryId,
                'detected_number' => $detectedNumber,
                'detected_year' => $detectedYear,
                'detected_pasal' => null,
                'detected_ayat' => null,
                'semantic_query' => $expandedSemantic,
                'clean_keyword' => $query,
                'statute_title' => null,
                'synonyms' => $synonyms,
                'glosarium_hint' => $hint,
            ];
        }

        // ─────────────────────────────────────────────────────────────
        // TIER 2: PENCARIAN PINTAR AI (Semantic Mode)
        // ─────────────────────────────────────────────────────────────
        // Pertanyaan konseptual, masalah hukum, atau subjek bebas tanpa nama regulasi
        $cleanTopic = preg_replace('/^\s*(?:peraturan|undang[\s\-]*undang|uu|aturan|hukum|ketentuan|pedoman|kebijakan)\s*(?:tentang|untuk|terkait|mengenai|soal|hal)?\s+/i', '', $query);
        $cleanTopic = trim((string) preg_replace('/\s+/', ' ', (string) $cleanTopic));

        $baseSemantic = (!empty($cleanTopic) && mb_strlen($cleanTopic) >= 3) ? $cleanTopic : $query;

        $expandedSemantic = $baseSemantic;
        if (!empty($synonyms)) {
            $missingSyns = array_filter($synonyms, fn($s) => !str_contains(mb_strtolower($baseSemantic), mb_strtolower($s)));
            if (!empty($missingSyns)) {
                $expandedSemantic .= ' ' . implode(' ', array_slice($missingSyns, 0, 3));
            }
        }

        return [
            'mode' => 'semantic',
            'label' => 'Pencarian Pintar AI: Analisis Makna & Pasal',
            'detected_type' => $detectedType,
            'detected_category_id' => $detectedCategoryId,
            'detected_number' => $detectedNumber,
            'detected_year' => $detectedYear,
            'detected_pasal' => $detectedPasal,
            'detected_ayat' => $detectedAyat,
            'semantic_query' => $expandedSemantic,
            'clean_keyword' => $query,
            'statute_title' => null,
            'synonyms' => $synonyms,
            'glosarium_hint' => $hint,
        ];
    }
}
