<?php

namespace App\Services;

use App\Models\TimelineEvent;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Cache\Repository as CacheRepository;
use Illuminate\Support\Facades\DB;

/**
 * Agregasi event regulasi untuk visualisasi timeline (REG-04, REG-05).
 *
 * Service ini sengaja tidak menyentuh tabel `peraturan` langsung: semua bacaan
 * lewat `timeline_events` yang sudah didenormalisasi, dan hasilnya di-cache
 * harian. Kedua endpoint timeline memakai cache yang sama-sama
 * store-agnostic (`Cache::remember`), jadi berpindah Redis/database hanya
 * mengubah `.env`, bukan kode.
 */
class TimelineService
{
    /**
     * Batas satu segmen pemanggilan. Kontrak chunked dari FE: klien memecah
     * rentang besar sendiri, jadi server menolak rentang yang lebih lebar
     * daripada ini alih-alih diam-diam memotong data.
     */
    public const MAX_YEARS_PER_CHUNK = 5;

    /**
     * Cache disimpan sehari (AC). Padding satu hari ditambahkan ke TTL supaya
     * entri tidak kedaluwarsa tepat pada pergantian hari, saat kunci cache
     * masih memakai tanggal kemarin.
     */
    private const CACHE_TTL_HOURS = 25;

    public function __construct(private readonly CacheRepository $cache) {}

    // ─────────────────────────────────────────────
    // AC: API Events (Chunked)
    // ─────────────────────────────────────────────

    /**
     * @return array{start_date: string, end_date: string, truncated: bool, total: int, events: array<int, array<string, mixed>>}
     */
    public function events(
        string $startDate,
        string $endDate,
        array $regulationTypes = [],
        array $subjek = [],
        array $lokasi = [],
        array $instansi = [],
    ): array {
        [$start, $end, $truncated] = $this->resolveRange($startDate, $endDate);

        // Kunci cache memuat seluruh parameter yang memengaruhi isi respons.
        // Tanpa `v` di akhir, perubahan bentuk respons akan tetap tersaji dari
        // cache lama selama TTL belum habis.
        $key = $this->cacheKey('events', [
            $start, $end,
            implode(',', $regulationTypes),
            implode(',', $subjek),
            implode(',', $lokasi),
            implode(',', $instansi),
        ]);

        $events = $this->cache->remember($key, now()->addHours(self::CACHE_TTL_HOURS), function () use ($start, $end, $regulationTypes, $subjek, $lokasi, $instansi) {
            return $this->baseQuery($start, $end, $regulationTypes, $subjek, $lokasi, $instansi)
                ->orderBy('event_date')
                ->orderBy('regulation_id')
                ->get([
                    'id',
                    'regulation_id',
                    'regulation_unique_id',
                    'event_type',
                    'event_date',
                    'regulation_type',
                    'instansi',
                    'subjek',
                    'lokasi_daerah',
                ])
                ->map(fn (TimelineEvent $event) => [
                    'id' => $event->id,
                    'regulation_id' => $event->regulation_id,
                    'unique_id' => $event->regulation_unique_id,
                    'event_type' => $event->event_type,
                    'event_date' => $event->event_date->toDateString(),
                    'regulation_type' => $event->regulation_type,
                    'instansi' => $event->instansi,
                    'subjek' => $event->subjek,
                    'lokasi_daerah' => $event->lokasi_daerah,
                ])
                ->all();
        });

        return [
            'start_date' => $start,
            'end_date' => $end,
            'truncated' => $truncated,
            'total' => count($events),
            'events' => $events,
        ];
    }

    // ─────────────────────────────────────────────
    // AC: API Frekuensi
    // ─────────────────────────────────────────────

    /**
     * Volume bulanan terbit vs dicabut. Bulan tanpa event tetap dikembalikan
     * dengan nilai 0 supaya grafik intensitas tidak berlubang.
     *
     * @return array{start_date: string, end_date: string, months: array<int, array<string, mixed>>}
     */
    public function frequency(
        string $startDate,
        string $endDate,
        array $regulationTypes = [],
        array $subjek = [],
        array $lokasi = [],
        array $instansi = [],
    ): array {
        [$start, $end, $truncated] = $this->resolveRange($startDate, $endDate);

        $key = $this->cacheKey('frequency', [
            $start, $end,
            implode(',', $regulationTypes),
            implode(',', $subjek),
            implode(',', $lokasi),
            implode(',', $instansi),
        ]);

        $months = $this->cache->remember($key, now()->addHours(self::CACHE_TTL_HOURS), function () use ($start, $end, $regulationTypes, $subjek, $lokasi, $instansi) {
            $rows = $this->baseQuery($start, $end, $regulationTypes, $subjek, $lokasi, $instansi)
                ->selectRaw($this->monthExpression().' as bulan, event_type, count(*) as jumlah')
                ->groupBy('bulan', 'event_type')
                ->get();

            // Kelompokkan per bulan, lalu ratakan ke seluruh bulan dalam rentang
            // agar bulan kosong ikut terwakili.
            $byMonth = [];
            foreach ($rows as $row) {
                $byMonth[$row->bulan][$row->event_type] = (int) $row->jumlah;
            }

            $cursor = CarbonImmutable::parse($start)->startOfMonth();
            $last = CarbonImmutable::parse($end)->startOfMonth();
            $result = [];

            while ($cursor->lessThanOrEqualTo($last)) {
                $bulan = $cursor->format('Y-m');
                $terbit = $byMonth[$bulan][TimelineEvent::TYPE_TERBIT] ?? 0;
                $dicabut = $byMonth[$bulan][TimelineEvent::TYPE_DICABUT] ?? 0;

                $result[] = [
                    'month' => $bulan,
                    'year' => (int) $cursor->format('Y'),
                    'month_index' => (int) $cursor->format('n'),
                    'terbit' => $terbit,
                    'dicabut' => $dicabut,
                    'total' => $terbit + $dicabut,
                ];

                $cursor = $cursor->addMonth();
            }

            return $result;
        });

        return [
            'start_date' => $start,
            'end_date' => $end,
            'truncated' => $truncated,
            'months' => $months,
        ];
    }

    /**
     * Query dasar dengan seluruh filter. Dipakai `events()` dan `frequency()`
     * supaya keduanya menyaring dengan cara yang persis sama — kalau salah satu
     * ditambah filter baru, yang lain tidak bisa diam-diam tertinggal.
     *
     * @param  array<int, string>  $regulationTypes
     * @param  array<int, string>  $subjek
     * @param  array<int, string>  $lokasi
     * @param  array<int, string>  $instansi
     */
    private function baseQuery(string $start, string $end, array $regulationTypes, array $subjek, array $lokasi, array $instansi)
    {
        return TimelineEvent::query()
            ->betweenDates($start, $end)
            ->ofTypes($regulationTypes)
            ->ofSubjekList($subjek)
            ->ofLokasiList($lokasi)
            ->ofInstansiList($instansi);
    }

    /**
     * Ekspresi SQL "YYYY-MM" dari `event_date`.
     *
     * Test berjalan di SQLite sedangkan aplikasi berjalan di PostgreSQL, jadi
     * fungsinya dipilih lewat driver. Hanya nama driver yang dilihat, bukan
     * versi — keduanya sudah mendukung fungsi ini sejak lama.
     */
    private function monthExpression(): string
    {
        return DB::connection()->getDriverName() === 'sqlite'
            ? "strftime('%Y-%m', event_date)"
            : "to_char(event_date, 'YYYY-MM')";
    }

    /**
     * Rentang yang sudah divalidasi dan dipotong (AC clamping).
     *
     * Ketika rentang masih lebih lebar dari `MAX_YEARS_PER_CHUNK` setelah
     * dipotong, titik akhirnya digeser maju dari `$startDate` supaya hasil yang
     * dikembalikan selalu berbentuk segmen valid — bukan error. `truncated`
     * bernilai true dalam kondisi itu maupun saat ada pemotongan tahun.
     *
     * @return array{0: string, 1: string, 2: bool} [start, end, dipotong?]
     */
    public function resolveRange(string $startDate, string $endDate): array
    {
        $maxYear = (int) now()->format('Y') + 1;

        $start = CarbonImmutable::parse($startDate)->startOfDay();
        $end = CarbonImmutable::parse($endDate)->startOfDay();

        $truncated = false;

        // AC: permintaan melewati tahun berjalan + 1 dipotong ke akhir tahun
        // depan, bukan ditolak.
        $limit = CarbonImmutable::create($maxYear, 12, 31)->endOfDay();

        if ($end->greaterThan($limit)) {
            $end = $limit;
            $truncated = true;
        }

        if ($start->greaterThan($end)) {
            $start = $end;
            $truncated = true;
        }

        // AC: maksimal 5 tahun per segmen. Dipotong di sini, bukan ditolak,
        // supaya klien yang meminta rentang lebar tetap mendapat data yang
        // berguna dan tahu bahwa hasilnya tidak lengkap.
        $chunkEnd = $start->addYears(self::MAX_YEARS_PER_CHUNK);

        if ($end->greaterThan($chunkEnd)) {
            $end = $chunkEnd;
            $truncated = true;
        }

        return [$start->toDateString(), $end->toDateString(), $truncated];
    }

    /**
     * Kunci cache: nama agregat + parameter + versi bentuk respons. Versi
     * dinaikkan saat bentuk respons berubah agar cache lama tidak terpakai.
     *
     * @param  array<int, string|null>  $params
     */
    private function cacheKey(string $aggregate, array $params): string
    {
        $normalized = array_map(fn ($p) => $p === null ? '-' : (string) $p, $params);

        return 'timeline:'.$aggregate.':'.md5(implode('|', $normalized)).':v1';
    }
}
