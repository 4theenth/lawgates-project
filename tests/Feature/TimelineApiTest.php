<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Models\TimelineEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

/**
 * Test API agregasi timeline (REG-04, REG-05).
 *
 * Yang dijaga di sini adalah kontrak yang membuat garis waktu cepat dan aman:
 * tabel denormalisasi + indeksnya, pemotongan rentang, batas 5 tahun per
 * segmen, kelengkapan bulan pada grafik frekuensi, dan cache yang benar-benar
 * melewatkan query ke database.
 */
class TimelineApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Cache direset antar test supaya hitungan "hit vs miss" tidak terbawa.
        Cache::flush();
    }

    // ─────────────────────────────────────────────
    // Pembantu
    // ─────────────────────────────────────────────

    private function peraturan(
        string $tanggalPenetapan,
        string $status = 'Berlaku',
        string $jenisKode = 'UU',
        ?string $subjek = null,
        ?string $lokasiDaerah = null,
    ): Peraturan {
        $jenis = JenisPeraturan::firstOrCreate(
            ['kode' => $jenisKode],
            ['nama' => $jenisKode === 'UU' ? 'Undang-Undang' : $jenisKode],
        );
        $statusRow = Status::firstOrCreate(['nama_status' => $status]);

        return Peraturan::create([
            'judul' => 'Peraturan Timeline '.uniqid(),
            'nomor' => (string) random_int(100000, 999999),
            'tahun' => (int) substr($tanggalPenetapan, 0, 4),
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $statusRow->id,
            'unique_id' => 'timeline-uji-'.uniqid(),
            'tanggal_penetapan' => $tanggalPenetapan,
            'instansi' => 'Pemerintah Pusat',
            'subjek' => $subjek,
            'lokasi_daerah' => $lokasiDaerah,
        ]);
    }

    private function buildEvents(): void
    {
        $this->artisan('timeline:build')->assertSuccessful();
    }

    // ─────────────────────────────────────────────
    // AC1 — Tabel denormalisasi + indeks
    // ─────────────────────────────────────────────

    public function test_tabel_timeline_events_punya_indeks_yang_dibutuhkan(): void
    {
        // Test berjalan di SQLite in-memory; nama indeks hanya bisa dibaca
        // lewat pg_indexes. Struktur tabel tetap diuji di driver apa pun.
        if (DB::getDriverName() !== 'pgsql') {
            $this->assertTrue(Schema::hasTable('timeline_events'));
            $this->assertTrue(Schema::hasColumns('timeline_events', [
                'event_date', 'event_type', 'regulation_type',
            ]));

            return;
        }

        $indexes = collect(DB::select(
            "select indexname from pg_indexes where tablename = 'timeline_events'"
        ))->pluck('indexname');

        // Indeks AC: event_date, event_type, regulation_type.
        $this->assertContains('timeline_events_date_idx', $indexes);
        $this->assertContains('timeline_events_type_idx', $indexes);
        $this->assertContains('timeline_events_regtype_idx', $indexes);
    }

    public function test_command_membangun_event_terbit_dan_dicabut(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku');
        $this->peraturan('2021-06-15', 'Tidak Berlaku');

        $this->buildEvents();

        $this->assertSame(1, TimelineEvent::where('event_type', TimelineEvent::TYPE_TERBIT)->count());
        $this->assertSame(1, TimelineEvent::where('event_type', TimelineEvent::TYPE_DICABUT)->count());
    }

    public function test_command_idempoten_tidak_menggandakan_event(): void
    {
        $this->peraturan('2020-05-01');

        $this->buildEvents();
        $this->buildEvents();
        $this->buildEvents();

        $this->assertSame(1, TimelineEvent::count());
    }

    public function test_peraturan_tanpa_tanggal_dilewati(): void
    {
        $jenis = JenisPeraturan::firstOrCreate(['kode' => 'UU'], ['nama' => 'Undang-Undang']);
        $status = Status::firstOrCreate(['nama_status' => 'Berlaku']);

        Peraturan::create([
            'judul' => 'Tanpa Tanggal',
            'nomor' => '999999',
            'tahun' => 2020,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => 'tanpa-tanggal-'.uniqid(),
        ]);

        $this->buildEvents();

        $this->assertSame(0, TimelineEvent::count());
    }

    // ─────────────────────────────────────────────
    // AC2 — Events (chunked)
    // ─────────────────────────────────────────────

    public function test_events_mengembalikan_event_dalam_rentang(): void
    {
        $this->peraturan('2020-05-01');
        $this->peraturan('2021-06-15');
        $this->peraturan('1990-01-01'); // di luar rentang
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/events?start_date=2020-01-01&end_date=2024-12-31');

        $response->assertOk()
            ->assertJsonPath('total', 2)
            ->assertJsonCount(2, 'events');
    }

    public function test_events_menyertakan_field_yang_dibutuhkan_ui(): void
    {
        $this->peraturan('2020-05-01');
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/events?start_date=2020-01-01&end_date=2024-12-31');

        $response->assertOk()->assertJsonStructure([
            'start_date',
            'end_date',
            'truncated',
            'total',
            'events' => [['id', 'regulation_id', 'unique_id', 'event_type', 'event_date', 'regulation_type', 'instansi']],
        ]);
    }

    public function test_events_bisa_difilter_jenis_peraturan(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku', 'UU');
        $this->peraturan('2021-05-01', 'Berlaku', 'PERDA');
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/events?start_date=2020-01-01&end_date=2024-12-31&regulation_type[]=PERDA');

        $response->assertOk()->assertJsonPath('total', 1);
        $this->assertSame('PERDA', $response->json('events.0.regulation_type'));
    }

    public function test_events_menerima_banyak_jenis_peraturan_sekaligus(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku', 'UU');
        $this->peraturan('2021-05-01', 'Berlaku', 'PERDA');
        $this->peraturan('2022-05-01', 'Berlaku', 'PP');
        $this->buildEvents();

        $response = $this->getJson(
            '/api/timeline/events?start_date=2020-01-01&end_date=2024-12-31'
            .'&regulation_type[]=UU&regulation_type[]=PERDA'
        );

        $response->assertOk()->assertJsonPath('total', 2);
        $jenis = collect($response->json('events'))->pluck('regulation_type')->unique()->values()->all();
        sort($jenis);
        $this->assertSame(['PERDA', 'UU'], $jenis);
    }

    public function test_events_bisa_difilter_subjek_dan_lokasi(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku', 'UU', 'Otonomi Daerah');
        $this->peraturan('2020-06-01', 'Berlaku', 'UU', 'Pemuda dan Olah Raga');
        $this->peraturan('2020-07-01', 'Berlaku', 'PERDA', 'Otonomi Daerah', 'Kota Bandung');
        $this->buildEvents();

        $basis = '/api/timeline/events?start_date=2020-01-01&end_date=2020-12-31';

        // Subjek mempersempit ke peraturan yang memakai subjek itu saja.
        $this->getJson($basis.'&subjek[]=Otonomi Daerah')
            ->assertOk()
            ->assertJsonPath('total', 2);

        // Lokasi hanya cocok pada kolom lokasi_daerah, bukan judul/unique_id.
        $this->getJson($basis.'&lokasi[]=Kota Bandung')
            ->assertOk()
            ->assertJsonPath('total', 1);

        $this->getJson($basis.'&lokasi[]=Kota Surabaya')
            ->assertOk()
            ->assertJsonPath('total', 0);

        // Filter gabungan: subjek + jenis.
        $this->getJson($basis.'&subjek[]=Otonomi Daerah&regulation_type[]=PERDA')
            ->assertOk()
            ->assertJsonPath('total', 1);
    }

    public function test_events_menyertakan_subjek_dan_lokasi_daerah(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku', 'UU', 'Otonomi Daerah', 'Kota Bandung');
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/events?start_date=2020-01-01&end_date=2020-12-31');

        $response->assertOk()
            ->assertJsonPath('events.0.subjek', 'Otonomi Daerah')
            ->assertJsonPath('events.0.lokasi_daerah', 'Kota Bandung');
    }

    public function test_events_memvalidasi_parameter_wajib(): void
    {
        $this->getJson('/api/timeline/events')
            ->assertStatus(422)
            ->assertJsonValidationErrors(['start_date', 'end_date']);
    }

    public function test_events_menolak_end_date_sebelum_start_date(): void
    {
        $this->getJson('/api/timeline/events?start_date=2024-01-01&end_date=2020-01-01')
            ->assertStatus(422)
            ->assertJsonValidationErrors(['end_date']);
    }

    // ─────────────────────────────────────────────
    // AC2 — batas 5 tahun per segmen
    // ─────────────────────────────────────────────

    public function test_rentang_lima_tahun_penuh_diterima(): void
    {
        $this->peraturan('2020-05-01');
        $this->buildEvents();

        // 2020-01-01 s/d 2025-01-01 = tepat 5 tahun.
        $this->getJson('/api/timeline/events?start_date=2020-01-01&end_date=2025-01-01')
            ->assertOk()
            ->assertJsonPath('truncated', false);
    }

    public function test_rentang_lebih_dari_lima_tahun_dipotong(): void
    {
        $this->peraturan('1945-08-17');
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/events?start_date=1945-01-01&end_date=1960-12-31');

        $response->assertOk()->assertJsonPath('truncated', true);

        // Ujungnya digeser ke lima tahun setelah start, bukan ditolak.
        $this->assertSame('1945-01-01', $response->json('start_date'));
        $this->assertSame('1950-01-01', $response->json('end_date'));
    }

    // ─────────────────────────────────────────────
    // AC5 — proteksi tanggal (clamping)
    // ─────────────────────────────────────────────

    public function test_tahun_di_atas_tahun_berjalan_plus_satu_dipotong(): void
    {
        // Rentang sengaja dimulai dari tahun ini supaya batas 5 tahun tidak
        // ikut memotong, sehingga yang diuji murni clamp tahun depan.
        $tahunIni = (int) now()->format('Y');

        $response = $this->getJson('/api/timeline/events?start_date='.$tahunIni.'-01-01&end_date=2100-12-31');

        $response->assertOk()
            ->assertJsonPath('truncated', true)
            ->assertJsonPath('end_date', ($tahunIni + 1).'-12-31');
    }

    public function test_permintaan_dalam_batas_tidak_ditandai_dipotong(): void
    {
        $tahunIni = (int) now()->format('Y');

        $this->getJson('/api/timeline/events?start_date='.($tahunIni - 2).'-01-01&end_date='.($tahunIni - 1).'-12-31')
            ->assertOk()
            ->assertJsonPath('truncated', false);
    }

    // ─────────────────────────────────────────────
    // AC3 — Frekuensi bulanan
    // ─────────────────────────────────────────────

    public function test_frequency_mengembalikan_volume_bulanan_terbit_vs_dicabut(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku');
        $this->peraturan('2020-05-20', 'Berlaku');
        $this->peraturan('2020-05-25', 'Tidak Berlaku');
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/frequency?start_date=2020-01-01&end_date=2020-12-31');

        $response->assertOk();

        $mei = collect($response->json('months'))->firstWhere('month', '2020-05');
        $this->assertSame(2, $mei['terbit']);
        $this->assertSame(1, $mei['dicabut']);
        $this->assertSame(3, $mei['total']);
    }

    public function test_frequency_mengisi_bulan_kosong_dengan_nol(): void
    {
        $this->peraturan('2020-05-01');
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/frequency?start_date=2020-01-01&end_date=2020-12-31');

        $response->assertOk()->assertJsonCount(12, 'months');

        $januari = collect($response->json('months'))->firstWhere('month', '2020-01');
        $this->assertSame(0, $januari['terbit']);
        $this->assertSame(0, $januari['dicabut']);
    }

    public function test_frequency_bisa_difilter_jenis_peraturan(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku', 'UU');
        $this->peraturan('2020-05-01', 'Berlaku', 'PERDA');
        $this->buildEvents();

        $response = $this->getJson('/api/timeline/frequency?start_date=2020-01-01&end_date=2020-12-31&regulation_type[]=UU');

        $mei = collect($response->json('months'))->firstWhere('month', '2020-05');
        $this->assertSame(1, $mei['terbit']);
    }

    public function test_frequency_bisa_difilter_subjek(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku', 'UU', 'Otonomi Daerah');
        $this->peraturan('2020-05-02', 'Berlaku', 'UU', 'Pemuda dan Olah Raga');
        $this->buildEvents();

        $response = $this->getJson(
            '/api/timeline/frequency?start_date=2020-01-01&end_date=2020-12-31'
            .'&subjek[]=Otonomi Daerah'
        );

        $mei = collect($response->json('months'))->firstWhere('month', '2020-05');
        $this->assertSame(1, $mei['terbit']);
    }

    // ─────────────────────────────────────────────
    // AC4 — Cache dan kinerja
    // ─────────────────────────────────────────────

    public function test_events_hasil_kedua_diambil_dari_cache_tanpa_query_db(): void
    {
        $this->peraturan('2020-05-01');
        $this->buildEvents();

        $url = '/api/timeline/events?start_date=2020-01-01&end_date=2024-12-31';

        $this->getJson($url)->assertOk();

        // Hit kedua: kalau cache bekerja, tidak ada query ke timeline_events.
        DB::enableQueryLog();
        $this->getJson($url)->assertOk();
        $queries = collect(DB::getQueryLog())->pluck('query');

        $this->assertFalse(
            $queries->contains(fn (string $q) => str_contains($q, 'timeline_events')),
            'Hit kedua masih membaca tabel timeline_events — cache tidak dipakai.'
        );
    }

    public function test_hasil_cache_dibedakan_per_parameter(): void
    {
        $this->peraturan('2020-05-01', 'Berlaku', 'UU');
        $this->peraturan('2020-06-01', 'Berlaku', 'PERDA');
        $this->buildEvents();

        $semua = $this->getJson('/api/timeline/events?start_date=2020-01-01&end_date=2024-12-31')->json('total');
        $uu = $this->getJson('/api/timeline/events?start_date=2020-01-01&end_date=2024-12-31&regulation_type[]=UU')->json('total');

        // Kalau kunci cache mengabaikan filter, hasil kedua ikut 2.
        $this->assertSame(2, $semua);
        $this->assertSame(1, $uu);
    }
}
