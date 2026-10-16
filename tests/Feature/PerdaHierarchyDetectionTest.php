<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Services\RegulationLevelDetector;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PerdaHierarchyDetectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_detector_identifies_levels_accurately(): void
    {
        $badung = RegulationLevelDetector::detect('Pemerintah Kabupaten Badung');
        $this->assertEquals('Kabupaten', $badung['tingkat']);
        $this->assertEquals('Badung', $badung['nama_daerah']);
        $this->assertEquals('Bali', $badung['provinsi']);

        $denpasar = RegulationLevelDetector::detect('pemerintah_kota_denpasar');
        $this->assertEquals('Kota', $denpasar['tingkat']);
        $this->assertEquals('Denpasar', $denpasar['nama_daerah']);
        $this->assertEquals('Bali', $denpasar['provinsi']);

        $bali = RegulationLevelDetector::detect('Pemerintah Provinsi Bali');
        $this->assertEquals('Provinsi', $bali['tingkat']);
        $this->assertEquals('Bali', $bali['nama_daerah']);
        $this->assertEquals('Bali', $bali['provinsi']);

        $pusat = RegulationLevelDetector::detect('Pemerintah Pusat');
        $this->assertEquals('Pusat', $pusat['tingkat']);
    }

    public function test_peraturan_model_accessors(): void
    {
        $status = Status::create(['nama_status' => 'Berlaku']);
        $jenis = JenisPeraturan::create(['kode' => 'PERDA', 'nama' => 'Peraturan Daerah']);

        $peraturan = Peraturan::create([
            'unique_id' => 'perda_badung_test_1',
            'judul' => 'Perda Badung 1',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'tahun' => 2024,
            'nomor' => '1',
            'instansi' => 'Pemerintah Kabupaten Badung',
            'lokasi_daerah' => 'Pemerintah Kabupaten Badung',
        ]);

        $this->assertEquals('Kabupaten', $peraturan->tingkat);
        $this->assertEquals('Badung', $peraturan->nama_daerah);
        $this->assertEquals('Bali', $peraturan->provinsi_induk);
    }

    public function test_search_filters_by_regency_and_province(): void
    {
        $status = Status::create(['nama_status' => 'Berlaku']);
        $jenis = JenisPeraturan::create(['kode' => 'PERDA', 'nama' => 'Peraturan Daerah']);

        $perdaBadung = Peraturan::create([
            'unique_id' => 'perda_badung_test_2',
            'judul' => 'Peraturan Daerah Kabupaten Badung Nomor 2 Tahun 2024',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'tahun' => 2024,
            'nomor' => '2',
            'instansi' => 'Pemerintah Kabupaten Badung',
            'lokasi_daerah' => 'Pemerintah Kabupaten Badung',
        ]);
        \App\Models\Pasal::create([
            'peraturan_id' => $perdaBadung->id,
            'nomor_pasal' => 'Pasal 1',
            'isi_pasal' => 'Ketentuan Umum...',
            'urutan' => 1,
        ]);

        $perdaBali = Peraturan::create([
            'unique_id' => 'perda_bali_test_2',
            'judul' => 'Peraturan Daerah Provinsi Bali Nomor 5 Tahun 2024',
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'tahun' => 2024,
            'nomor' => '5',
            'instansi' => 'Pemerintah Provinsi Bali',
            'lokasi_daerah' => 'Pemerintah Provinsi Bali',
        ]);
        \App\Models\Pasal::create([
            'peraturan_id' => $perdaBali->id,
            'nomor_pasal' => 'Pasal 1',
            'isi_pasal' => 'Ketentuan Umum...',
            'urutan' => 1,
        ]);

        // Search by Kabupaten Badung
        $user = \App\Models\User::factory()->create();
        $resBadung = $this->actingAs($user)->getJson('/api/search?lokasi_daerah=Kabupaten Badung');
        $resBadung->assertStatus(200);
        $this->assertEquals(1, $resBadung->json('total'));
        $this->assertEquals($perdaBadung->id, $resBadung->json('data.0.id'));

        // Search by Provinsi Bali
        $resBali = $this->actingAs($user)->getJson('/api/search?lokasi_daerah=Pemerintah Provinsi Bali');
        $resBali->assertStatus(200);
        $this->assertEquals(1, $resBali->json('total'));
        $this->assertEquals($perdaBali->id, $resBali->json('data.0.id'));

        // Search by ?q=Badung (as sent from map click on regency)
        $resQBadung = $this->actingAs($user)->getJson('/api/search?q=Badung');
        $resQBadung->assertStatus(200);
        $this->assertEquals(1, $resQBadung->json('total'));
        $this->assertEquals($perdaBadung->id, $resQBadung->json('data.0.id'));
    }
}
