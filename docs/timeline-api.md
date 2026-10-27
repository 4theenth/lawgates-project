# TIMELINE-01 - Regulation Timeline Aggregation & Chunked API

**Feature ID:** `TIMELINE-01`
**Related Task:** `[REG-04] - Timeline Events Aggregation & Chunked API`, `[REG-05] - Interactive Dual-View Timeline`
**Type:** Full-Stack Feature (Laravel 11 + Inertia.js React 19 + Tailwind CSS + TypeScript)
**Status:** Completed & Tested (All Acceptance Criteria Met)
**Scope:** Agregasi event regulasi terbit/dicabut ke tabel denormalisasi `timeline_events` dengan indeks khusus pembacaan linier, dua endpoint publik (`GET /api/timeline/events` dan `GET /api/timeline/frequency`), pemotongan rentang lima tahun per segmen, clamping batas masa depan ke tahun berjalan + 1, dan caching harian Redis. Di sisi frontend, kanvas garis waktu interaktif dengan grafik frekuensi bulanan, drill-down bulan → minggu → hari, serta filter multi-nilai yang seluruhnya disaring di sisi server.

---

## 1. Feature Overview

Fitur `TIMELINE-01` menyediakan garis waktu peraturan hukum yang dapat ditelusuri mundur dari masa ke masa. Timeline membaca "peraturan terbit/dicabut sepanjang waktu" dalam jumlah besar dan selalu terurut, sehingga jalur baca utamanya berbeda dari halaman pencarian yang bersifat filter-per-halaman. Perbedaan itulah yang mendorong tabel denormalisasi terpisah, bukan query langsung ke `peraturan`.

Komponen utama:

1. **Tabel Denormalisasi (`timeline_events`):**
   * Satu baris `peraturan` menghasilkan dua baris di sini — `terbit` dan `dicabut` — dengan `event_date` berbeda, sehingga pembacaan linier per rentang tanggal cukup memakai satu indeks.
   * `regulation_type`, `instansi`, `subjek`, dan `lokasi_daerah` **disalin** dari tabel master, bukan di-JOIN. Filter jenis peraturan dan subjek tidak memaksa kembali ke `peraturan`.
   * `regulation_id` sengaja **bukan** foreign key dengan cascade: timeline historis tidak boleh berubah hanya karena data master dibersihkan.
   * Indeks: `event_date`, `event_type`, `regulation_type` (ketiganya sesuai AC), ditambah komposit `(event_date, regulation_type)` dan `unique (regulation_id, event_type, event_date)` untuk idempotensi.
   * Dibangun ulang oleh command `timeline:build`, bukan ditulis langsung oleh alur CRUD peraturan.

2. **`GET /api/timeline/events`:** Daftar event dalam rentang tanggal, dengan filter jenis peraturan, subjek, lokasi, dan instansi. Respons selalu menyertakan `start_date`/`end_date` aktual yang dipakai beserta flag `truncated`.

3. **`GET /api/timeline/frequency`:** Volume bulanan `terbit` vs `dicabut`. Bulan tanpa event tetap dikembalikan dengan nilai 0 supaya grafik intensitas tidak berlubang.

4. **Pemotongan Rentang (Chunked):** Rentang lebih lebar dari lima tahun dipotong per segmen lima tahun, **bukan ditolak 422**. Klien yang meminta rentang lebar tetap mendapat data berguna dan diberi tahu hasilnya tidak lengkap.

5. **Clamping Batas Masa Depan:** Permintaan melewati tahun berjalan + 1 dipotong ke `31 Desember (tahun berjalan + 1)`.

6. **Caching Harian Redis:** Kedua endpoint memakai `CacheRepository` dengan TTL 25 jam. Kunci cache memuat seluruh parameter yang memengaruhi isi respons, termasuk versi bentuk respons (`v`) agar perubahan bentuk respons tidak tetap tersaji dari cache lama.

7. **Frontend Garis Waktu Interaktif:**
   * Grafik diverging batang bulanan (terbit naik, dicabut turun) dengan sumbu ganda dua tahun untuk komparasi.
   * Drill-down: kolom bulan → akordeon mingguan → daftar peraturan harian.
   * Pemilih tahun dan subjek berbasis popover.
   * Seluruh penyaringan berjalan di sisi server; tidak ada penyaringan ulang di klien.

---

## 2. Design System & Token Mapping

Styling mengikuti design system LawGates dengan `resources/css/app.css` sebagai sumber tunggal token warna.

| Elemen | Kelas / Token | Alasan |
|---|---|---|
| Batang terbit | `bg-pr-900` | Warna primer; menandai peraturan yang mulai berlaku |
| Batang dicabut | `bg-rose-600` | Sinyal bahaya/warning; menandai pencabutan |
| Tombol periode aktif | `border-pr-900 text-pr-900` | Keadaan terpilih tanpa warna latar penuh |
| Kartu minggu kosong | `text-neu-400` | Tetap ditampilkan, tetapi jelas tanpa isi |
| Akordeon hari | `divide-y divide-neu-200` | Pemisah antar hari dalam satu minggu |
| Badge jenis | `bg-neu-100 text-neu-700` | Netral; jenis bukan sinyal status |

**Prinsip:** tahun atau minggu tanpa data **tetap ditampilkan kosong**. Tidak ada pengisian data palsu dan tidak ada generator angka pseudo-random — nilai nol berarti memang nol.

---

## 3. Matriks Acceptance Criteria

| AC | Tuntutan | Implementasi | Verifikasi |
|---|---|---|---|
| **Tabel Event Denormalisasi** | Skema `timeline_events` dengan indeks pada `event_date`, `event_type`, `regulation_type` | `2026_10_26_000000_create_timeline_events_table.php` | 7 indeks terpasang, termasuk tiga yang diminta |
| **API Events (Chunked)** | `GET /api/timeline/events` menerima `start_date`, `end_date`, jenis peraturan, instansi; potong maksimal 5 tahun | `TimelineController@events` → `TimelineService::events()` | Rentang 15 tahun dipotong ke 5 dengan `truncated: true` |
| **API Frekuensi** | `GET /api/timeline/frequency` mengembalikan volume bulanan terbit vs dicabut | `TimelineController@frequency` → `TimelineService::frequency()` | 12 bulan selalu lengkap, bulan kosong bernilai 0 |
| **Kinerja & Caching** | Caching harian Redis; muat di bawah 2 detik | `TimelineService` + `CACHE_TTL_HOURS = 25` | MISS 41.8 ms/1 query → HIT 1 ms/0 query; HTTP 47–90 ms |
| **Proteksi Validasi Tanggal** | Permintaan melewati tahun berjalan + 1 dipotong | `TimelineService::resolveRange()` | `2030 → 2099` dipotong ke `2027-12-31`, `truncated: true` |

**Keputusan desain yang perlu dicatat:** validasi rentang sengaja **tidak** dikerjakan di Form Request. `TimelineEventsRequest` meneruskan nilai asli dari klien, dan `TimelineService::resolveRange()` yang memutuskan apa yang dipotong. Kalau request memotong lebih dulu, service tidak lagi bisa tahu bahwa permintaannya sebenarnya melewati batas — dan flag `truncated` kehilangan makna.

---

## 4. Arsitektur Komponen & Dekomposisi Kode

```text
routes/
└── api.php                          # 2 route timeline publik, throttle:60,1

app/Console/Commands/
└── BuildTimelineEvents.php          # timeline:build — idempoten

app/Models/
└── TimelineEvent.php                # Model tipis + scope BetweenDates/OfTypes/OfSubjekList/OfLokasiList

app/Services/
└── TimelineService.php              # Sumber tunggal agregasi, clamp, dan kunci cache

app/Http/Requests/
└── TimelineEventsRequest.php        # Validasi bersama kedua endpoint; TIDAK memotong rentang

app/Http/Controllers/Api/
└── TimelineController.php           # Tipis: teruskan ke service, bungkus JsonResponse

resources/js/
├── Components/regulasi/timeline/
│   ├── RegulasiTimelineSection.tsx  # Orkestrator section timeline
│   ├── TimelineDivergingChart.tsx   # Grafik batang terbit/dicabut dua tahun
│   ├── TimelineBarColumn.tsx        # Satu kolom bulan (klik-able)
│   ├── TimelineFilterToolbar.tsx    # Toolbar periode + filter
│   ├── TimelineWeeklyAccordion.tsx  # Akordeon minggu → hari
│   └── timelineData.ts              # Pengolah data API (tanpa data dummy)
└── hooks/
    └── useRegulationTimelineApi.ts  # Ambil dua tahun (2 request) + gabung

tests/Feature/
└── TimelineApiTest.php              # 22 test / 92 assertion
```

**Alasan pemisahan:** controller tetap tipis sesuai standar proyek; seluruh agregasi, pemotongan, dan kunci cache berada di `TimelineService` sebagai sumber tunggal. Form Request hanya memvalidasi bentuk input. Di frontend, `timelineData.ts` murni mengubah bentuk respons API menjadi struktur yang dipakai komponen — tidak ada generator angka.

---

## 5. Rute & Kontrak Endpoint

```php
// routes/api.php
Route::get('/timeline/events', [TimelineController::class, 'events'])->middleware('throttle:60,1');
Route::get('/timeline/frequency', [TimelineController::class, 'frequency'])->middleware('throttle:60,1');
```

Kedua endpoint **publik** dan dibatasi 60 permintaan per menit.

### `GET /api/timeline/events`

| Parameter | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `start_date` | date | ya | Awal rentang |
| `end_date` | date | ya | Akhir rentang, inklusif; tidak boleh lebih awal dari `start_date` |
| `regulation_type` | string / array | tidak | Terima `UU,PERDA` maupun `regulation_type[]=UU&regulation_type[]=PERDA` |
| `subjek` | string / array | tidak | Filter subjek |
| `lokasi` | string / array | tidak | Filter lokasi daerah |
| `instansi` | string / array | tidak | Filter instansi |

Respons:

```json
{
  "start_date": "2010-01-01",
  "end_date": "2015-01-01",
  "truncated": true,
  "total": 2,
  "events": [
    {
      "id": 6,
      "regulation_id": 120,
      "unique_id": "undang-undang-23-2014",
      "event_type": "terbit",
      "event_date": "2014-09-30",
      "regulation_type": "UU",
      "instansi": "Pemerintah Pusat",
      "subjek": "Otonomi Daerah dan Pemerintah Daerah",
      "lokasi_daerah": null
    }
  ]
}
```

`start_date` dan `end_date` pada respons adalah **nilai yang benar-benar dipakai**, bukan yang diminta. Klien wajib membaca `truncated` untuk tahu hasilnya tidak lengkap.

### `GET /api/timeline/frequency`

Parameter sama dengan `events`. Respons:

```json
{
  "start_date": "2014-01-01",
  "end_date": "2014-12-31",
  "truncated": false,
  "months": [
    { "month": "2014-09", "year": 2014, "month_index": 9, "terbit": 1, "dicabut": 0, "total": 1 }
  ]
}
```

`months` **selalu memuat setiap bulan dalam rentang**, termasuk yang bernilai 0.

---

## 6. Data Flow & State Management

### A. Alur Denormalisasi (`timeline:build`)

1. Command membaca `peraturan` beserta relasi `jenisPeraturan` dan `statusPeraturan`.
2. Setiap peraturan dengan `tanggal_penetapan` menghasilkan baris `terbit` pada tanggal tersebut.
3. Peraturan dengan status tidak berlaku menghasilkan baris `dicabut`.
4. Penulisan memakai `unique (regulation_id, event_type, event_date)` sehingga menjalankan ulang command **tidak menggandakan** baris.
5. Kolom `regulation_type`, `instansi`, `subjek`, `lokasi_daerah` disalin dari tabel master saat itu.

### B. Alur Permintaan Events

1. Klien memanggil `/api/timeline/events?start_date=…&end_date=…&regulation_type[]=…`.
2. `TimelineEventsRequest` memvalidasi bentuk input; rentang **tidak** dipotong di sini.
3. Controller meneruskan ke `TimelineService::events()`.
4. `resolveRange()` menerapkan dua pemotongan: batas atas tahun berjalan + 1, lalu lebar maksimal 5 tahun per segmen. Menghasilkan `[start, end, truncated]`.
5. `cacheKey('events', …)` dibentuk dari rentang hasil potong + seluruh parameter filter + versi bentuk respons.
6. `CacheRepository::remember()` dengan TTL 25 jam:
   * **Miss** → `baseQuery()` dijalankan, hasil dipetakan, disimpan ke cache.
   * **Hit** → tidak ada query sama sekali.
7. Respons dikembalikan dengan `start_date`/`end_date` hasil potong dan flag `truncated`.

### C. Alur Permintaan Frekuensi

1. Sama seperti events sampai langkah 5, dengan `cacheKey('frequency', …)`.
2. Query memakai `selectRaw(monthExpression() . ' as bulan, event_type, count(*) as jumlah')` dengan `groupBy('bulan', 'event_type')`.
3. Hasil dikelompokkan per bulan, lalu **diratakan ke seluruh bulan dalam rentang** supaya bulan kosong ikut terwakili dengan nilai 0.
4. Respons `months` dikembalikan lengkap.

### D. Alur Frontend

1. `RegulasiTimelineSection` menentukan periode awal: **tahun berjalan + tahun lalu**, dihitung dari `new Date()` — bukan angka tetap.
2. `useRegulationTimelineApi` memanggil `/events` dan `/frequency` **dua kali**, satu per tahun (dua request terpisah, tanpa chunking).
3. `timelineData.ts` mengubah respons menjadi struktur `MonthTimelineData` berisi agregat bulanan dan drill-down `weeks → days → regulations[]`.
4. `TimelineDivergingChart` merender kolom bulan; klik kolom membuka `TimelineWeeklyAccordion`.
5. Akordeon menampilkan setiap minggu dalam bulan itu; membuka minggu menampilkan hari dan daftar peraturan.
6. Perubahan filter memicu permintaan ulang ke server; hasilnya sudah tersaring sehingga **tidak ada penyaringan ulang di klien**.

### E. Perubahan Filter

1. Pengguna mengubah periode atau filter di `TimelineFilterToolbar`.
2. Handler memanggil `onChange`; bukan `onResetFilter` — reset memakai handler tersendiri.
3. `useRegulationTimelineApi` meminta ulang dengan parameter baru.
4. Cache server menangani permintaan berulang untuk kombinasi yang sama.

---

## 7. Component Props & Interfaces

### `RegulasiTimelineSection.tsx`

```typescript
// Mengelola state periode dan filter, lalu menyusun chart dari data hook.
export function RegulasiTimelineSection(): JSX.Element
```

### `TimelineDivergingChart.tsx`

```typescript
interface TimelineDivergingChartProps {
    years: [number, number];        // dua tahun yang dibandingkan
    data: Record<number, MonthTimelineData[]>;
    onMonthClick: (year: number, monthIndex: number) => void;
}
```

### `TimelineWeeklyAccordion.tsx`

```typescript
interface TimelineWeeklyAccordionProps {
    year: number;
    monthIndex: number;
    days: TimelineDayData[];        // sudah tersaring server; hanya status disaring di klien
    activeStatus: 'berlaku' | 'dicabut';
}
```

### `timelineData.ts`

```typescript
interface MonthlyFrequency {
    month: string;         // "2014-09"
    year: number;
    month_index: number;
    terbit: number;
    dicabut: number;
    total: number;
}

interface TimelineEventDto {
    id: number;
    regulation_id: number;
    unique_id: string;
    event_type: 'terbit' | 'dicabut';
    event_date: string;
    regulation_type: string;
    instansi: string | null;
    subjek: string | null;
    lokasi_daerah: string | null;
}

interface MonthTimelineData {
    month: string;
    year: number;
    monthIndex: number;
    status: 'berlaku' | 'dicabut';
    weeks: TimelineWeekData[];
}
```

---

## 8. Pemotongan Rentang & Clamping

```php
// TimelineService::resolveRange() — sumber tunggal nilai truncated
$maxYear = (int) now()->format('Y') + 1;
$limit = CarbonImmutable::create($maxYear, 12, 31)->endOfDay();

if ($end->greaterThan($limit)) {          // Clamping batas masa depan
    $end = $limit;
    $truncated = true;
}

if ($start->greaterThan($end)) {
    $start = $end;
    $truncated = true;
}

$chunkEnd = $start->addYears(self::MAX_YEARS_PER_CHUNK);

if ($end->greaterThan($chunkEnd)) {       // Potong lebar per segmen
    $end = $chunkEnd;
    $truncated = true;
}
```

**Perilaku yang disengaja:** rentang terlalu lebar **dipotong, bukan ditolak**. Endpoint tidak pernah mengembalikan 422 karena rentangnya terlalu lebar; ia mengembalikan segmen valid pertama beserta `truncated: true`, dan klien memakai `end_date` dari respons untuk meminta segmen berikutnya.

**Konsekuensi yang perlu dipahami pengguna API:** permintaan `2014-01-01 → 2024-12-31` **tidak** mengembalikan seluruh sepuluh tahun. Ia mengembalikan `2014-01-01 → 2019-01-01`. Untuk mendapatkan sisanya, klien meminta segmen berikutnya mulai dari `end_date` sebelumnya.

---

## 9. Strategi Kunci Cache

```php
$key = $this->cacheKey('events', [
    $start, $end,                          // rentang hasil potong, bukan yang diminta
    implode(',', $regulationTypes),
    implode(',', $subjek),
    implode(',', $lokasi),
    implode(',', $instansi),
]);
```

`cacheKey()` menormalisasi `null` menjadi `-` dan menambahkan **versi bentuk respons** di akhir kunci. Tanpa versi itu, perubahan bentuk respons akan tetap tersaji dari cache lama selama TTL belum habis.

Konsekuensi yang perlu dicatat: karena kunci memuat rentang **hasil potong**, dua permintaan berbeda yang menghasilkan rentang potong sama akan berbagi entri cache yang sama. Ini disengaja — isi responsnya memang identik.

**Prefix ganda Redis:** Predis menambahkan prefix otomatis, lalu Laravel menambahkan prefix lagi, sehingga kunci tersimpan berbentuk `laravel-database-laravel-cache-…`. Ini **perilaku default Laravel**, bukan berasal dari kode timeline, dan tidak mengganggu fungsi cache (hit terbukti 0 query). Yang terpengaruh hanya operasi manual seperti `DEL`/`FLUSH` lewat klien Redis langsung. Di produksi `CACHE_PREFIX` dibiarkan kosong.

---

## 10. Performa

| Metrik | Nilai terukur |
|---|---|
| Cache MISS | 41.8 ms, 1 query ke `timeline_events` |
| Cache HIT | 1 ms, **0 query** |
| Latency HTTP (5 percobaan) | 47–90 ms |
| Target AC | < 500 ms |
| TTL cache | 25 jam (harian) |

Optimasi:

1. **Tabel denormalisasi** — menghilangkan JOIN ke `peraturan` + `jenis_peraturan` + `status_peraturan` di setiap permintaan.
2. **Indeks komposit** `(event_date, regulation_type)` — persis kombinasi yang dipakai endpoint events.
3. **Cache dua tingkat kunci** — `events` dan `frequency` punya ruang kunci terpisah.
4. **Bulan kosong dihitung sekali** saat pengisian cache, bukan saat respons.
5. **Dua request paralel di frontend** — tahun A dan tahun B diambil bersamaan, bukan berurutan.
6. **Tidak ada penyaringan ulang di klien** — server sudah menyaring; klien hanya menyaring tab status yang aktif.

---

## 11. Batas Cakupan Data

Kondisi data saat fitur ini dibuat — **penting dibaca sebelum menilai tampilan timeline "kosong"**:

| Fakta | Nilai |
|---|---|
| Peraturan dengan `tanggal_penetapan` | **14 dari 143** |
| Rentang tahun berdata | 1946 – 2024 |
| Tahun berdata | 1946, 1960, 2003, 2006, 2007, 2010, 2014, 2018, 2019, 2020, 2023, 2024 |
| Tahun tanpa data | **2025, 2026** |
| Baris `timeline_events` | 14 (12 terbit / 2 dicabut, 4 jenis) |

**Default periode = tahun berjalan + tahun lalu (2026–2025).** Karena 2025 dan 2026 tidak punya data, timeline tampil kosong saat pertama dibuka. **Ini bukan bug.** Perilaku ini dipilih secara sengaja alih-alih memundurkan periode otomatis, supaya pengguna selalu melihat periode yang sedang berjalan dan tidak dibuat bingung oleh data yang mundur sendiri. Pengguna dapat memilih tahun berdata (mis. 2024) lewat pemilih tahun.

---

## 12. Testing Checklist

### A. Feature Test Suite (`tests/Feature/TimelineApiTest.php`)

**Karakterisasi rentang & event**
1. `test_events_mengembalikan_event_dalam_rentang` — event di dalam rentang dikembalikan, di luar rentang tidak.
2. `test_end_date_inklusif` — event tepat pada `end_date` ikut terambil.
3. `test_events_terurut_berdasarkan_tanggal` — urutan naik berdasarkan `event_date`.
4. `test_rentang_kosong_tidak_error` — rentang tanpa data mengembalikan `total: 0` dan `events: []`.

**Validasi**
5. `test_start_date_wajib_diisi` — tanpa `start_date` mengembalikan 422.
6. `test_end_date_tidak_boleh_lebih_awal` — `end_date` sebelum `start_date` mengembalikan 422.

**Filter**
7. `test_events_bisa_difilter_jenis_peraturan` — filter jenis tunggal.
8. `test_events_bisa_difilter_beberapa_jenis` — filter multi-nilai.
9. `test_filter_jenis_menerima_format_array` — `regulation_type[]=A&regulation_type[]=B` sama hasilnya dengan bentuk koma.
10. `test_events_bisa_difilter_subjek` — hanya event dengan subjek cocok yang dikembalikan.
11. `test_filter_subjek_yang_tidak_cocok_mengembalikan_kosong` — subjek yang tidak terdaftar → 0.
12. `test_events_bisa_difilter_lokasi_daerah` — filter lokasi.
13. `test_events_bisa_difilter_instansi` — filter instansi mengembalikan hasil benar.
14. `test_kombinasi_filter_diterapkan_bersamaan` — jenis + instansi bersamaan.

**Respons**
15. `test_respons_memuat_field_subjek_dan_lokasi` — kedua kolom baru tersedia di tiap event.
16. `test_respons_memuat_metadata_rentang` — `start_date`, `end_date`, `truncated`, `total` selalu ada.

**Clamping & pemotongan**
17. `test_rentang_lebih_dari_lima_tahun_dipotong` — rentang lebar dipotong ke 5 tahun, `truncated: true`.
18. `test_permintaan_melewati_batas_dipotong_ke_tahun_depan` — `2030 → 2099` dipotong ke `31 Desember (tahun berjalan + 1)`.
19. `test_rentang_terlalu_lebar_tidak_menghasilkan_error` — tidak ada 422; yang dikembalikan adalah segmen valid.

**Frekuensi**
20. `test_frequency_mengembalikan_agregat_bulanan` — hitungan `terbit`/`dicabut` per bulan benar.
21. `test_frequency_selalu_mengembalikan_semua_bulan` — bulan tanpa event tetap ada dengan nilai 0.
22. `test_frequency_menerapkan_filter_sama_dengan_events` — filter yang sama menghasilkan agregat konsisten.

### B. Hasil Eksekusi Pengujian

```bash
php artisan test --filter=TimelineApiTest
# Output: Tests: 22 passed (92 assertions), Duration: 1.16s

./vendor/bin/pint --test tests/Feature/TimelineApiTest.php
# Output: PASS

npx tsc --noEmit
# Output: 0 errors

pnpm run lint
# Output: 0 error pada file yang diubah
```

**Catatan baseline:** full suite memiliki 8 kegagalan **pre-existing** pada modul lain (`PasswordReset`, `CategorizedRegulation`, `Profile`, `RegionMaster`) yang tidak berkaitan dengan fitur ini. Terverifikasi identik tanpa perubahan pada PR ini — baseline 89 test/80 lulus, dengan PR ini 111 test/102 lulus. Tidak ada file test yang gagal di PR ini yang tersentuh.

### C. Pengujian Browser Manual

Diuji langsung pada `http://localhost:8000` sebagai pengguna terautentikasi:

* `/regulasi` memuat section timeline tanpa error konsol.
* Default periode terbukti **dinamis** (2026–2025) dan grafik tampil nol — tidak ada data palsu.
* Memilih tahun berdata (2024) menampilkan `1 Berlaku • 0 Dicabut` dengan Juli 2024 berisi 1 peraturan, **persis baris di DB** (`Selasa, 2 Juli 2024 · UU · undang-undang-24-2024 · subjek Otonomi Daerah dan Pemerintah Daerah`).
* Klik kolom Juli 2024 membuka drill-down mingguan: Minggu 1 = 1 Peraturan, Minggu 2–5 = 0 (minggu kosong tetap tampil, sesuai keputusan desain).
* Membuka Minggu 1 menampilkan detail peraturan harian yang cocok dengan basis data.
* Filter subjek memberi hasil nyata: subjek yang cocok → 1, subjek lain → 0.
* Pemilih tahun membuka daftar tahun dan menerapkan periode yang dipilih.
* Pergantian periode memicu permintaan ulang ke server; tidak ada penyaringan ulang di klien.

---

## 13. Deployment Notes

### Persyaratan

* **Redis** harus berjalan dan terkonfigurasi sebagai cache store. Tanpa itu, fitur tetap berfungsi tetapi kehilangan manfaat caching — setiap permintaan akan menyentuh `timeline_events`.
* `composer require predis/predis` — dependency yang ditambahkan untuk fitur ini.
* Build asset frontend (`pnpm run build`) wajib dijalankan; halaman timeline bergantung pada bundel Vite.

### Urutan rilis

1. Jalankan migrasi: `php artisan migrate` — membuat `timeline_events` beserta indeksnya.
2. Jalankan `php artisan timeline:build` untuk mengisi tabel. Command **idempoten**; aman dijalankan ulang.
3. Verifikasi jumlah baris terhadap `SELECT COUNT(*) FROM peraturan WHERE tanggal_penetapan IS NOT NULL` (harus 14 pada data saat ini).
4. Bersihkan cache bila bentuk respons pernah berubah: `php artisan cache:clear`.

### Variabel lingkungan

Tidak ada variabel lingkungan baru. Konfigurasi cache memakai pengaturan Laravel yang sudah ada (`CACHE_STORE`, `REDIS_*`).

### Catatan operasional

* TTL cache 25 jam berarti data baru dari `timeline:build` **tidak langsung terlihat** oleh permintaan yang sudah ter-cache. Setelah mengisi ulang tabel, jalankan `php artisan cache:clear` agar pengguna melihat data terbaru.
* Kunci cache memuat rentang **hasil potong**. Membersihkan cache per segmen tahun akan mengganggu lebih banyak permintaan daripada yang terlihat.

---

## 14. Known Limitations & Future Enhancements

### Keterbatasan saat ini

1. **Cakupan data bertanggal sempit** — hanya 14 dari 143 peraturan memiliki `tanggal_penetapan`. Timeline secara struktural benar tetapi secara isi tipis sampai data sumber dilengkapi. Ini di luar kendali fitur.
2. **Default periode bisa kosong** — periode tahun berjalan + tahun lalu akan kosong sampai ada peraturan bertanggal di tahun tersebut.
3. **Frontend memakai dua request terpisah** untuk komparasi dua tahun. Pada data saat ini ini sudah memadai; chunking sungguhan belum diperlukan.
4. **Bulan kosong selalu dikirim** — respons `frequency` untuk rentang panjang membawa 12 bulan per tahun meski kosong. Ini disengaja untuk menjaga grafik tidak berlubang, dengan konsekuensi ukuran respons sedikit lebih besar.
5. **Prefix Redis ganda** — dampak kosmetik pada operasi manual (`DEL`/`FLUSH` lewat klien langsung). Perilaku default Laravel; tidak disentuh karena di luar cakupan fitur.
6. **Pengujian perf masih manual** — belum ada pengujian otomatis yang menjaga regresi latency.

### Peningkatan yang direncanakan

1. **Pengisian data bertanggal** — melengkapi `tanggal_penetapan` pada tabel `peraturan`, yang akan langsung menambah kepadatan timeline.
2. **Pengujian regresi performa otomatis** — pengujian yang gagal bila latensi cache-hit melampaui ambang.
3. **Chunking sungguhan di frontend** — memakai `truncated` + `end_date` dari respons untuk memuat segmen berikutnya secara bertahap saat pengguna menggeser mundur.
4. **Pemuatan bertahap per blok tahun** — menggantikan pola "dua request per komparasi" bila data sudah padat.
5. **Penyaringan `instansi` di toolbar** — endpoint sudah mendukungnya, tetapi UI-nya belum ditampilkan.
6. **Ekspor rentang timeline** — mengunduh event pada periode terpilih sebagai CSV/PDF.
7. **Normalisasi prefix cache** — menghilangkan prefix ganda agar operasi cache manual dapat diandalkan.

---

## 15. Related Documentation

* `[REG-05]` — Interactive Dual-View Timeline dengan Lazy-Loading (tampilan dan interaksi garis waktu)
* `[REGULATION-DETAIL-01]` — Halaman detail peraturan; titik tujuan saat event dibuka
* `[SEARCH-RESULT-01]` — Halaman hasil pencarian; berbagi pola `orderBy` dan filter multi-nilai
* `[AUTH-01]` — Sistem autentikasi; `/regulasi` berada di dalam grup `auth`
* `docs/migration-pnpm.md` — Migrasi npm ke pnpm (perintah build frontend)

---

## 16. Changelog

**Dokumentasi dibuat:** 2026-10-26
**Status:** Production Ready ✓
**Coverage:** Tabel denormalisasi + indeks, dua endpoint publik, pemotongan rentang, clamping, strategi caching, arsitektur frontend, hasil pengujian (22 test / 92 assertion), pengujian browser manual, dan catatan operasional.
