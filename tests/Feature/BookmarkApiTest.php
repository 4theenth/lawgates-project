<?php

namespace Tests\Feature;

use App\Models\Bookmark;
use App\Models\BookmarkCollection;
use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test API bookmark & folder koleksi (USER-02).
 *
 * Dua hal yang dijaga di sini:
 *  - perilaku AC (toggle, folder, hapus folder tidak menghapus bookmark);
 *  - hanya ada SATU sumber kebenaran bookmark. Test di bagian "satu sumber
 *    kebenaran" akan gagal kalau nanti ada yang membuat tabel bookmark kedua.
 */
class BookmarkApiTest extends TestCase
{
    use RefreshDatabase;

    // ─────────────────────────────────────────────
    // Pembantu
    // ─────────────────────────────────────────────

    private function user(): User
    {
        return User::factory()->create(['role' => 'user']);
    }

    private function peraturan(?string $judul = null): Peraturan
    {
        // Proyek ini belum punya PeraturanFactory, jadi dibuat langsung seperti
        // di CategorizedRegulationApiTest.
        $jenis = JenisPeraturan::firstOrCreate(
            ['kode' => 'UU'],
            ['nama' => 'Undang-Undang']
        );
        $status = Status::firstOrCreate(['nama_status' => 'Berlaku']);

        return Peraturan::create([
            'judul' => $judul ?? 'Peraturan Uji '.uniqid(),
            'nomor' => (string) random_int(100000, 999999),
            'tahun' => 2026,
            'jenis_peraturan_id' => $jenis->id,
            'status_id' => $status->id,
            'unique_id' => 'uu-uji-'.uniqid(),
        ]);
    }

    private function folder(User $user, string $name = 'Folder Uji'): BookmarkCollection
    {
        return BookmarkCollection::create([
            'user_id' => $user->id,
            'name' => $name,
        ]);
    }

    // ─────────────────────────────────────────────
    // Toggle bookmark
    // ─────────────────────────────────────────────

    public function test_toggle_menyimpan_bookmark(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $response = $this->actingAs($user)->postJson('/api/bookmarks/toggle', [
            'type' => 'peraturan',
            'id' => $peraturan->id,
        ]);

        $response->assertCreated();
        $response->assertJson(['success' => true, 'bookmarked' => true]);

        $this->assertDatabaseHas('user_bookmarks', [
            'user_id' => $user->id,
            'bookmarkable_type' => 'peraturan',
            'bookmarkable_id' => $peraturan->id,
        ]);
    }

    public function test_toggle_dua_kali_melepas_bookmark(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);
        $response = $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);

        $response->assertOk();
        $response->assertJson(['bookmarked' => false]);
        $this->assertDatabaseCount('user_bookmarks', 0);
    }

    public function test_toggle_menolak_tipe_yang_tidak_dikenal(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($user)
            ->postJson('/api/bookmarks/toggle', ['type' => 'sembarangan', 'id' => $peraturan->id])
            ->assertStatus(422);
    }

    public function test_toggle_menolak_entitas_yang_tidak_ada(): void
    {
        $user = $this->user();

        $this->actingAs($user)
            ->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => 999999])
            ->assertNotFound();
    }

    public function test_tamu_tidak_bisa_menyimpan_bookmark(): void
    {
        $peraturan = $this->peraturan();

        $this->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id])
            ->assertUnauthorized();
    }

    // ─────────────────────────────────────────────
    // Folder (koleksi)
    // ─────────────────────────────────────────────

    public function test_user_bisa_membuat_folder(): void
    {
        $user = $this->user();

        $response = $this->actingAs($user)->postJson('/api/bookmark-collections', [
            'name' => 'Hukum Pajak',
            'description' => 'Kumpulan peraturan pajak',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('bookmark_collections', [
            'user_id' => $user->id,
            'name' => 'Hukum Pajak',
        ]);
    }

    public function test_nama_folder_tidak_boleh_kembar(): void
    {
        $user = $this->user();
        $this->folder($user, 'Hukum Pajak');

        $this->actingAs($user)
            ->postJson('/api/bookmark-collections', ['name' => 'Hukum Pajak'])
            ->assertStatus(422);
    }

    public function test_nama_folder_tidak_boleh_kembar_tanpa_membedakan_huruf_besar_kecil(): void
    {
        $user = $this->user();
        $this->folder($user, 'Hukum Pajak');

        $this->actingAs($user)
            ->postJson('/api/bookmark-collections', ['name' => 'hukum pajak'])
            ->assertStatus(422)
            ->assertJsonValidationErrors('name');
    }

    public function test_deskripsi_folder_sampai_500_karakter_diterima(): void
    {
        $user = $this->user();
        $description = str_repeat('a', 500);

        $this->actingAs($user)
            ->postJson('/api/bookmark-collections', [
                'name' => 'Folder Deskripsi',
                'description' => $description,
            ])
            ->assertCreated();

        $this->assertDatabaseHas('bookmark_collections', [
            'user_id' => $user->id,
            'name' => 'Folder Deskripsi',
            'description' => $description,
        ]);
    }

    public function test_nama_folder_lebih_dari_50_karakter_ditolak(): void
    {
        $this->actingAs($this->user())
            ->postJson('/api/bookmark-collections', ['name' => str_repeat('a', 51)])
            ->assertStatus(422)
            ->assertJsonValidationErrors('name');
    }

    public function test_bookmark_tidak_bisa_dimasukkan_ke_folder_orang_lain(): void
    {
        $user = $this->user();
        $lain = $this->user();
        $folderLain = $this->folder($lain, 'Folder Orang Lain');
        $peraturan = $this->peraturan();

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', [
            'type' => 'peraturan',
            'id' => $peraturan->id,
        ]);

        $bookmark = Bookmark::where('user_id', $user->id)->firstOrFail();

        $this->actingAs($user)
            ->putJson('/api/bookmarks/assign-collections', [
                'bookmark_id' => $bookmark->id,
                'collection_ids' => [$folderLain->id],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors('collection_ids');

        $this->assertDatabaseCount('bookmark_collection_items', 0);
    }

    public function test_user_tidak_bisa_menyentuh_folder_orang_lain(): void
    {
        $user = $this->user();
        $lain = $this->user();
        $folderLain = $this->folder($lain, 'Punya Orang Lain');

        $this->actingAs($user)
            ->putJson("/api/bookmark-collections/{$folderLain->id}", ['name' => 'Dibajak'])
            ->assertForbidden();

        $this->actingAs($user)
            ->deleteJson("/api/bookmark-collections/{$folderLain->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('bookmark_collections', ['id' => $folderLain->id, 'name' => 'Punya Orang Lain']);
    }

    // ─────────────────────────────────────────────
    // AC #4 — hapus folder tidak menghapus dokumen
    // ─────────────────────────────────────────────

    public function test_hapus_folder_tidak_menghapus_bookmark(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();
        $folder = $this->folder($user, 'Akan Dihapus');

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);
        $bookmark = Bookmark::firstOrFail();

        $this->actingAs($user)->putJson('/api/bookmarks/assign-collections', [
            'bookmark_id' => $bookmark->id,
            'collection_ids' => [$folder->id],
        ])->assertOk();

        $this->assertDatabaseCount('bookmark_collection_items', 1);

        $this->actingAs($user)->deleteJson("/api/bookmark-collections/{$folder->id}")->assertOk();

        // Folder dan keanggotaannya hilang, bookmark-nya tetap ada.
        $this->assertDatabaseCount('bookmark_collections', 0);
        $this->assertDatabaseCount('bookmark_collection_items', 0);
        $this->assertDatabaseCount('user_bookmarks', 1);
    }

    // ─────────────────────────────────────────────
    // Satu bookmark di banyak folder
    // ─────────────────────────────────────────────

    public function test_satu_bookmark_bisa_masuk_beberapa_folder(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();
        $a = $this->folder($user, 'Folder A');
        $b = $this->folder($user, 'Folder B');

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);
        $bookmark = Bookmark::firstOrFail();

        $this->actingAs($user)->putJson('/api/bookmarks/assign-collections', [
            'bookmark_id' => $bookmark->id,
            'collection_ids' => [$a->id, $b->id],
        ])->assertOk();

        $this->assertDatabaseCount('bookmark_collection_items', 2);
        $this->assertCount(2, $bookmark->fresh()->collections);
    }

    // ─────────────────────────────────────────────
    // Daftar & filter
    // ─────────────────────────────────────────────

    public function test_daftar_bookmark_hanya_milik_user_sendiri(): void
    {
        $user = $this->user();
        $lain = $this->user();

        $this->actingAs($lain)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $this->peraturan()->id]);
        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $this->peraturan()->id]);

        $response = $this->actingAs($user)->getJson('/api/bookmarks');

        $response->assertOk();
        $this->assertCount(1, $response->json('data.data'));
    }

    public function test_bookmark_tanpa_folder_muncul_di_filter_unassigned(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);

        $response = $this->actingAs($user)->getJson('/api/bookmarks?collection_id=unassigned');

        $response->assertOk();
        $this->assertCount(1, $response->json('data.data'));
    }

    // ─────────────────────────────────────────────
    // Satu sumber kebenaran
    // ─────────────────────────────────────────────

    /**
     * Penjaga utama USER-02: penghitung bookmark di dashboard, relasi Inertia,
     * dan API harus membaca skema yang sama. Kalau nanti ada yang membuat tabel
     * bookmark kedua, test ini gagal.
     */
    public function test_semua_pembaca_bookmark_memakai_skema_yang_sama(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);

        // Dipakai UserDashboardController untuk kartu "Total Bookmark".
        $this->assertSame(1, $user->bookmarks()->count());

        // Dipakai HandleInertiaRequests untuk prop auth.bookmarkIds.
        $this->assertSame(1, $user->bookmarkedPeraturans()->count());

        // Dipakai PeraturanController::show untuk tombol simpan di halaman detail.
        $this->assertTrue(
            $user->bookmarks()->forMorph('peraturan', $peraturan->id)->exists()
        );
    }

    public function test_menghapus_peraturan_secara_permanen_ikut_menghapus_bookmark(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);

        // Peraturan memakai SoftDeletes: delete() hanya menandai, bukan menghapus.
        $peraturan->delete();
        $this->assertDatabaseCount('user_bookmarks', 1);

        // Baru forceDelete() yang benar-benar menghapus barisnya.
        $peraturan->forceDelete();
        $this->assertDatabaseCount('user_bookmarks', 0);
    }

    // ─────────────────────────────────────────────
    // Halaman daftar bookmark
    // ─────────────────────────────────────────────

    /**
     * Halaman /bookmarks harus mengirim data peraturan, bukan hanya baris
     * bookmark. Komponen React-nya membaca judul/nomor/unique_id dari sini.
     */
    public function test_halaman_bookmark_mengirim_data_peraturan(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);

        $this->actingAs($user)
            ->get('/bookmarks')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('User/Bookmark')
                ->has('bookmarks.data', 1)
                ->where('bookmarks.data.0.judul', $peraturan->judul)
                ->where('bookmarks.data.0.unique_id', $peraturan->unique_id)
                ->has('bookmarks.data.0.id')
            );
    }

    /**
     * Kotak pencarian di halaman itu menyaring lewat kolom peraturan. Tanpa
     * whereHas ke relasi polimorfiknya, kata kunci tidak menyaring apa pun.
     */
    public function test_pencarian_halaman_mengikuti_kata_kunci(): void
    {
        $user = $this->user();
        $cocok = $this->peraturan('Peraturan Pajak Daerah Khusus');
        $lain = $this->peraturan('Peraturan Retribusi Jasa Umum');

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $cocok->id]);
        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $lain->id]);

        $this->actingAs($user)
            ->get('/bookmarks?q=Pajak')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('bookmarks.data', 1)
                ->where('bookmarks.data.0.judul', $cocok->judul)
                ->where('filters.q', 'Pajak')
            );
    }

    /**
     * Tombol hapus di halaman berjalan lewat sesi web dan hanya melepas
     * barisnya; entitas yang disimpan tidak boleh ikut terhapus.
     */
    public function test_hapus_dari_halaman_hanya_melepas_bookmark(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($user)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);
        $bookmark = Bookmark::where('user_id', $user->id)->firstOrFail();

        $this->actingAs($user)
            ->delete("/bookmarks/{$bookmark->id}")
            ->assertRedirect();

        $this->assertDatabaseCount('user_bookmarks', 0);
        $this->assertDatabaseCount('peraturan', 1);
    }

    public function test_tidak_bisa_menghapus_bookmark_milik_orang_lain(): void
    {
        $pemilik = $this->user();
        $lain = $this->user();
        $peraturan = $this->peraturan();

        $this->actingAs($pemilik)->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id]);
        $bookmark = Bookmark::where('user_id', $pemilik->id)->firstOrFail();

        $this->actingAs($lain)->delete("/bookmarks/{$bookmark->id}")->assertNotFound();

        $this->assertDatabaseCount('user_bookmarks', 1);
    }

    /**
     * `putusan` lolos validasi tapi tidak terdaftar di morphMap, sehingga
     * menghasilkan baris yang meledak saat dibaca ("Class \"putusan\" not found").
     * Tipe yang tidak punya model harus ditolak di pintu masuk.
     */
    public function test_menolak_tipe_yang_belum_punya_model(): void
    {
        $this->actingAs($this->user())
            ->postJson('/api/bookmarks/toggle', ['type' => 'putusan', 'id' => 1])
            ->assertStatus(422);

        $this->assertDatabaseCount('user_bookmarks', 0);
    }

    /**
     * Id non-angka (mis. unique_id/slug) pernah mencapai query kolom bigint dan
     * menghasilkan 500 + stack trace, bukan pesan validasi.
     */
    public function test_menolak_id_yang_bukan_angka(): void
    {
        $this->actingAs($this->user())
            ->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => 'undang-undang-6-2023'])
            ->assertStatus(422)
            ->assertJsonValidationErrors('id');
    }

    /**
     * Melepas bookmark harus selalu boleh, termasuk saat peraturannya sudah
     * di-soft-delete. Sebelum perbaikan, resolveTarget() jalan lebih dulu dan
     * mengembalikan 404 sehingga baris bookmark yatim tidak bisa dilepas.
     */
    public function test_melepas_bookmark_yang_peraturannya_sudah_dihapus(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();

        $user->bookmarks()->create([
            'bookmarkable_type' => 'peraturan',
            'bookmarkable_id' => $peraturan->id,
        ]);

        $peraturan->delete(); // soft delete

        $this->actingAs($user)
            ->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id])
            ->assertOk()
            ->assertJson(['success' => true, 'bookmarked' => false]);

        $this->assertDatabaseCount('user_bookmarks', 0);
    }

    /**
     * Menyimpan entitas yang peraturannya sudah di-soft-delete tetap ditolak,
     * supaya perubahan urutan cek tidak membuka celah bookmark baris baru
     * untuk entitas yang tak terlihat.
     */
    public function test_tetap_menolak_menyimpan_peraturan_yang_sudah_dihapus(): void
    {
        $user = $this->user();
        $peraturan = $this->peraturan();
        $peraturan->delete(); // soft delete

        $this->actingAs($user)
            ->postJson('/api/bookmarks/toggle', ['type' => 'peraturan', 'id' => $peraturan->id])
            ->assertStatus(404);

        $this->assertDatabaseCount('user_bookmarks', 0);
    }
}
