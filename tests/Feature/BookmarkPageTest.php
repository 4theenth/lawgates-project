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
 * Test aksi halaman /bookmarks yang berjalan lewat sesi web/Inertia.
 *
 * Aturan bisnisnya sama dengan API (BookmarkService); test di sini memastikan
 * controller web meneruskan input, otorisasi, dan flash/redirect dengan benar.
 */
class BookmarkPageTest extends TestCase
{
    use RefreshDatabase;

    private function user(): User
    {
        return User::factory()->create(['role' => 'user']);
    }

    private function peraturan(): Peraturan
    {
        $jenis = JenisPeraturan::firstOrCreate(
            ['kode' => 'UU'],
            ['nama' => 'Undang-Undang']
        );
        $status = Status::firstOrCreate(['nama_status' => 'Berlaku']);

        return Peraturan::create([
            'judul' => 'Peraturan Uji '.uniqid(),
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

    private function bookmark(User $user, Peraturan $peraturan): Bookmark
    {
        return $user->bookmarks()->create([
            'bookmarkable_type' => 'peraturan',
            'bookmarkable_id' => $peraturan->id,
        ]);
    }

    public function test_user_bisa_membuat_mengubah_dan_menghapus_folder(): void
    {
        $user = $this->user();

        $this->actingAs($user)
            ->post('/bookmarks/collections', ['name' => 'Folder Web'])
            ->assertRedirect();

        $folder = BookmarkCollection::where('user_id', $user->id)->firstOrFail();

        $this->actingAs($user)
            ->put("/bookmarks/collections/{$folder->id}", ['name' => 'Folder Web Baru'])
            ->assertRedirect();

        $this->assertDatabaseHas('bookmark_collections', [
            'id' => $folder->id,
            'name' => 'Folder Web Baru',
        ]);

        $this->actingAs($user)
            ->delete("/bookmarks/collections/{$folder->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('bookmark_collections', ['id' => $folder->id]);
    }

    public function test_nama_folder_duplikat_case_insensitive_ditolak(): void
    {
        $user = $this->user();
        $this->folder($user, 'Hukum Pajak');

        $this->actingAs($user)
            ->from('/bookmarks')
            ->post('/bookmarks/collections', ['name' => 'hukum pajak'])
            ->assertRedirect('/bookmarks')
            ->assertSessionHasErrors('name');
    }

    public function test_nama_folder_lebih_dari_50_karakter_ditolak(): void
    {
        $this->actingAs($this->user())
            ->from('/bookmarks')
            ->post('/bookmarks/collections', ['name' => str_repeat('a', 51)])
            ->assertRedirect('/bookmarks')
            ->assertSessionHasErrors('name');
    }

    public function test_user_tidak_bisa_mengubah_folder_orang_lain(): void
    {
        $user = $this->user();
        $lain = $this->user();
        $folderLain = $this->folder($lain, 'Punya Orang Lain');

        $this->actingAs($user)
            ->put("/bookmarks/collections/{$folderLain->id}", ['name' => 'Dibajak'])
            ->assertForbidden();

        $this->assertDatabaseHas('bookmark_collections', [
            'id' => $folderLain->id,
            'name' => 'Punya Orang Lain',
        ]);
    }

    public function test_user_tidak_bisa_menghapus_folder_orang_lain(): void
    {
        $user = $this->user();
        $lain = $this->user();
        $folderLain = $this->folder($lain, 'Punya Orang Lain');

        $this->actingAs($user)
            ->delete("/bookmarks/collections/{$folderLain->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('bookmark_collections', ['id' => $folderLain->id]);
    }

    public function test_sync_folder_orang_lain_ditolak(): void
    {
        $user = $this->user();
        $lain = $this->user();
        $folderLain = $this->folder($lain, 'Folder Orang Lain');
        $bookmark = $this->bookmark($user, $this->peraturan());

        $this->actingAs($user)
            ->from('/bookmarks')
            ->post("/bookmarks/{$bookmark->id}/collections", [
                'collection_ids' => [$folderLain->id],
            ])
            ->assertRedirect('/bookmarks')
            ->assertSessionHasErrors('collection_ids');

        $this->assertDatabaseCount('bookmark_collection_items', 0);
    }

    public function test_bulk_hapus_hanya_bookmark_milik_sendiri(): void
    {
        $user = $this->user();
        $lain = $this->user();
        $milikSendiri = $this->bookmark($user, $this->peraturan());
        $milikOrangLain = $this->bookmark($lain, $this->peraturan());

        $this->actingAs($user)
            ->post('/bookmarks/bulk-destroy', [
                'bookmark_ids' => [$milikSendiri->id, $milikOrangLain->id],
            ])
            ->assertRedirect();

        $this->assertDatabaseMissing('user_bookmarks', ['id' => $milikSendiri->id]);
        $this->assertDatabaseHas('user_bookmarks', ['id' => $milikOrangLain->id]);
    }

    public function test_bulk_pindahkan_bookmark_ke_folder(): void
    {
        $user = $this->user();
        $folder = $this->folder($user, 'Folder Tujuan');
        $bookmarkA = $this->bookmark($user, $this->peraturan());
        $bookmarkB = $this->bookmark($user, $this->peraturan());

        $this->actingAs($user)
            ->post('/bookmarks/bulk-collections', [
                'bookmark_ids' => [$bookmarkA->id, $bookmarkB->id],
                'collection_ids' => [$folder->id],
            ])
            ->assertRedirect();

        $this->assertDatabaseCount('bookmark_collection_items', 2);
        $this->assertDatabaseHas('bookmark_collection_items', [
            'bookmark_id' => $bookmarkA->id,
            'collection_id' => $folder->id,
        ]);
        $this->assertDatabaseHas('bookmark_collection_items', [
            'bookmark_id' => $bookmarkB->id,
            'collection_id' => $folder->id,
        ]);
    }
}
