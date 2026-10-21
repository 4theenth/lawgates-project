<?php

namespace Tests\Feature;

use App\Services\RegulationLevelDetector;
use Database\Seeders\WilayahIndonesiaSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegionMasterTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(WilayahIndonesiaSeeder::class);
    }

    public function test_provinces_and_regencies_are_seeded_correctly(): void
    {
        $this->assertDatabaseCount('provinces', 38);
        $this->assertDatabaseCount('regencies', 514);

        $this->assertDatabaseHas('provinces', [
            'slug' => 'sumatera-selatan',
            'nama' => 'Sumatera Selatan',
        ]);

        $this->assertDatabaseHas('regencies', [
            'nama' => 'Palembang',
            'tipe' => 'Kota',
        ]);

        $this->assertDatabaseHas('regencies', [
            'nama' => 'Ogan Ilir',
            'tipe' => 'Kabupaten',
        ]);
    }

    public function test_regions_api_returns_provinces_list(): void
    {
        $res = $this->getJson('/api/regions');
        $res->assertStatus(200);
        $res->assertJsonPath('success', true);
        $this->assertCount(38, $res->json('data'));
    }

    public function test_regencies_by_province_api_returns_accurate_regencies(): void
    {
        $res = $this->getJson('/api/regions/sumatera-selatan/regencies');
        $res->assertStatus(200);
        $res->assertJsonPath('success', true);
        $res->assertJsonPath('province.nama', 'Sumatera Selatan');
        $this->assertCount(17, $res->json('data'));

        $names = collect($res->json('data'))->pluck('nama')->all();
        $this->assertContains('Palembang', $names);
        $this->assertContains('Ogan Ilir', $names);
        $this->assertContains('Banyuasin', $names);
    }

    public function test_statistics_api_includes_real_regencies_list(): void
    {
        $res = $this->getJson('/api/regions/statistics');
        $res->assertStatus(200);
        $res->assertJsonPath('success', true);

        $sumsel = $res->json('data.sumatera-selatan');
        $this->assertNotNull($sumsel);
        $this->assertEquals(13, $sumsel['kabupatenCount']);
        $this->assertEquals(4, $sumsel['kotaCount']);
        $this->assertEquals(17, $sumsel['totalCount']);
        $this->assertCount(17, $sumsel['regencies']);
    }

    public function test_detector_maps_regencies_to_correct_province(): void
    {
        RegulationLevelDetector::clearCache();

        $palembang = RegulationLevelDetector::detect('Pemerintah Kota Palembang');
        $this->assertEquals('Kota', $palembang['tingkat']);
        $this->assertEquals('Palembang', $palembang['nama_daerah']);
        $this->assertEquals('Sumatera Selatan', $palembang['provinsi']);

        $oganIlir = RegulationLevelDetector::detect('Pemerintah Kabupaten Ogan Ilir');
        $this->assertEquals('Kabupaten', $oganIlir['tingkat']);
        $this->assertEquals('Ogan Ilir', $oganIlir['nama_daerah']);
        $this->assertEquals('Sumatera Selatan', $oganIlir['provinsi']);
    }
}
