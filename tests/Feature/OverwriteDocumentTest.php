<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Pasal;
use App\Models\Peraturan;
use App\Models\PeraturanOverwriteLog;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Fitur timpa dokumen (allow_overwrite) beserta perlindungan jejak auditnya.
 */
class OverwriteDocumentTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private JenisPeraturan $jenis;
    private Status $status;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $this->status = Status::create(['nama_status' => 'Berlaku']);
    }

    private function existingDocument(array $overrides = []): Peraturan
    {
        $peraturan = Peraturan::create(array_merge([
            'unique_id' => 'uu_5_2026',
            'judul' => 'Undang-Undang Nomor 5 Tahun 2026',
            'nomor' => '5',
            'tahun' => 2026,
            'instansi' => 'Pemerintah Pusat',
            'tempat_penetapan' => 'Jakarta',
            'subjek' => 'Ketenagakerjaan',
            'jenis_peraturan_id' => $this->jenis->id,
            'status_id' => $this->status->id,
        ], $overrides));

        Pasal::create([
            'peraturan_id' => $peraturan->id,
            'nomor_pasal' => '1',
            'isi_pasal' => 'Isi pasal lama yang akan diganti.',
            'urutan' => 1,
        ]);

        return $peraturan;
    }

    private function payload(array $metadataOverrides = []): array
    {
        return [
            'allow_overwrite' => true,
            'files' => [[
                'name' => 'uu_5_2026.json',
                'parsedData' => [
                    'metadata' => array_merge([
                        'id_dokumen' => 'uu_5_2026',
                        'tipe_peraturan' => 'Undang-Undang',
                        'judul' => 'Undang-Undang Nomor 5 Tahun 2026',
                        'nomor' => '5',
                        'tahun' => 2026,
                        'status' => 'Berlaku',
                        'pemrakarsa' => 'Pemerintah Pusat',
                    ], $metadataOverrides),
                    'chunks' => [
                        ['tipe' => 'PASAL', 'label' => 'Pasal 1', 'teks' => 'Isi pasal baru setelah ditimpa.'],
                        ['tipe' => 'PASAL', 'label' => 'Pasal 2', 'teks' => 'Pasal tambahan.'],
                    ],
                ],
            ]],
        ];
    }

    // -----------------------------------------------------------------
    // Perilaku dasar timpa
    // -----------------------------------------------------------------

    public function test_admin_can_overwrite_existing_document(): void
    {
        $peraturan = $this->existingDocument();

        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $this->payload())
            ->assertOk()
            ->assertJson(['success' => true]);

        // Tidak membuat baris baru — tetap satu dokumen.
        $this->assertSame(1, Peraturan::where('nomor', '5')->where('tahun', 2026)->count());
        $this->assertSame($peraturan->id, Peraturan::where('unique_id', 'uu_5_2026')->first()->id);

        // Isi pasal diganti dengan versi baru.
        $this->assertSame(2, Pasal::where('peraturan_id', $peraturan->id)->count());
    }

    public function test_regular_admin_is_allowed_to_overwrite(): void
    {
        // Keputusan produk: semua admin boleh menimpa, tidak hanya superadmin.
        $this->existingDocument();

        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $this->payload())
            ->assertOk()
            ->assertJson(['success' => true]);
    }

    public function test_non_admin_cannot_overwrite(): void
    {
        $this->existingDocument();
        $user = User::factory()->create(['role' => 'user']);

        $this->actingAs($user)
            ->postJson('/admin/dokumen-hukum/import', $this->payload())
            ->assertStatus(403);
    }

    // -----------------------------------------------------------------
    // Jejak audit
    // -----------------------------------------------------------------

    public function test_overwrite_creates_audit_log_with_snapshot(): void
    {
        $peraturan = $this->existingDocument();

        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $this->payload())
            ->assertOk();

        $log = PeraturanOverwriteLog::where('peraturan_id', $peraturan->id)->first();

        $this->assertNotNull($log, 'Penimpaan harus tercatat di riwayat.');
        $this->assertSame($this->admin->id, $log->user_id);
        $this->assertSame('ui', $log->source);

        // Snapshot menyimpan kondisi SEBELUM ditimpa.
        $this->assertSame('Jakarta', $log->snapshot['tempat_penetapan']);
        $this->assertSame('Ketenagakerjaan', $log->snapshot['subjek']);
        $this->assertSame(1, $log->chunks_before);
        $this->assertSame(2, $log->chunks_after);
    }

    public function test_audit_log_records_which_user_overwrote(): void
    {
        // Pembuat awal adalah admin lain, bukan penimpa.
        $originalCreator = User::factory()->create(['role' => 'admin']);
        $peraturan = $this->existingDocument(['created_by' => $originalCreator->id]);

        $overwriter = User::factory()->create(['role' => 'admin']);

        $this->actingAs($overwriter)
            ->postJson('/admin/dokumen-hukum/import', $this->payload())
            ->assertOk();

        $log = PeraturanOverwriteLog::where('peraturan_id', $peraturan->id)->first();

        $this->assertSame($overwriter->id, $log->user_id);

        // Pembuat awal tidak boleh ikut berubah menjadi penimpa.
        $peraturan->refresh();
        $this->assertSame($originalCreator->id, $peraturan->created_by);
        $this->assertSame($overwriter->id, $peraturan->updated_by);
    }

    public function test_audit_log_detects_fields_emptied_by_poorer_payload(): void
    {
        $peraturan = $this->existingDocument([
            'tempat_penetapan' => 'Jakarta',
            'subjek' => 'Ketenagakerjaan',
        ]);

        // Payload baru TIDAK menyertakan tempat_penetapan maupun subjek.
        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $this->payload())
            ->assertOk();

        $log = PeraturanOverwriteLog::where('peraturan_id', $peraturan->id)->first();
        $dropped = $log->changes['dropped_fields'];

        // Inilah kerusakan yang dulu tak terlihat: field lama menjadi kosong.
        $this->assertContains('tempat_penetapan', $dropped);
        $this->assertContains('subjek', $dropped);

        $peraturan->refresh();
        $this->assertNull($peraturan->tempat_penetapan, 'Perilaku saat ini: field lama terhapus.');
    }

    public function test_snapshot_allows_restoring_previous_values(): void
    {
        $peraturan = $this->existingDocument(['subjek' => 'Ketenagakerjaan']);

        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', $this->payload())
            ->assertOk();

        $log = PeraturanOverwriteLog::where('peraturan_id', $peraturan->id)->first();

        // Snapshot harus cukup lengkap untuk mengembalikan nilai lama.
        foreach (PeraturanOverwriteLog::snapshotColumns() as $column) {
            $this->assertArrayHasKey($column, $log->snapshot);
        }

        $peraturan->refresh();
        $peraturan->subjek = $log->snapshot['subjek'];
        $peraturan->save();

        $this->assertSame('Ketenagakerjaan', $peraturan->fresh()->subjek);
    }

    public function test_import_without_existing_document_creates_no_overwrite_log(): void
    {
        // Dokumen baru: tidak ada yang ditimpa, jadi tidak boleh ada log palsu.
        $this->actingAs($this->admin)
            ->postJson('/admin/dokumen-hukum/import', [
                'files' => [[
                    'name' => 'baru.json',
                    'parsedData' => [
                        'metadata' => [
                            'tipe_peraturan' => 'Undang-Undang',
                            'judul' => 'Undang-Undang Nomor 404 Tahun 2026',
                            'nomor' => '404',
                            'tahun' => 2026,
                            'status' => 'Berlaku',
                        ],
                        'chunks' => [['tipe' => 'PASAL', 'label' => 'Pasal 1', 'teks' => 'Baru.']],
                    ],
                ]],
            ])
            ->assertOk();

        $this->assertSame(0, PeraturanOverwriteLog::count());
    }

    public function test_multiple_overwrites_create_separate_history_entries(): void
    {
        $peraturan = $this->existingDocument();

        $this->actingAs($this->admin)->postJson('/admin/dokumen-hukum/import', $this->payload())->assertOk();
        $this->actingAs($this->admin)->postJson('/admin/dokumen-hukum/import', $this->payload())->assertOk();

        // Riwayat tidak boleh saling menimpa — keduanya tersimpan berurutan.
        $this->assertSame(2, PeraturanOverwriteLog::where('peraturan_id', $peraturan->id)->count());
    }
}
