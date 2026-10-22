<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Halaman daftar bookmark (Inertia).
 *
 * Isinya masih daftar datar seperti sebelumnya; tampilan berbentuk folder
 * menyusul di ticket terpisah. Yang berubah hanya sumber datanya: sekarang
 * dibaca dari tabel `user_bookmarks` (morph), bukan tabel `bookmarks` lama.
 */
class BookmarkPageController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('q');

        $bookmarks = Bookmark::query()
            ->where('user_id', $request->user()->id)
            ->where('bookmarkable_type', 'peraturan')
            ->with(['bookmarkable.jenisPeraturan', 'bookmarkable.statusPeraturan'])
            // Pencarian menyaring pada kolom peraturan, bukan pada baris bookmark,
            // jadi kata kunci dijalankan lewat whereHas ke relasi polimorfiknya.
            // LIKE ditulis tanpa ILIKE supaya ikut berjalan di SQLite (test),
            // bukan hanya di PostgreSQL.
            ->when($search, function ($query, $search) {
                $query->whereHasMorph('bookmarkable', ['peraturan'], function ($q) use ($search) {
                    $q->where(function ($w) use ($search) {
                        $kata = '%'.$search.'%';
                        $w->where('judul', 'like', $kata)
                            ->orWhere('nomor', 'like', $kata)
                            ->orWhere('tahun', 'like', $kata);
                    });
                });
            })
            ->latest('created_at')
            ->paginate(12)
            ->through(function (Bookmark $bookmark) {
                $peraturan = $bookmark->bookmarkable;

                return [
                    // Id baris bookmark, dipakai halaman ini untuk melepas simpanan.
                    'id' => $bookmark->id,
                    'unique_id' => $peraturan?->unique_id,
                    'judul' => $peraturan?->judul,
                    'nomor' => $peraturan?->nomor,
                    'tahun' => $peraturan?->tahun,
                    'tempat_penetapan' => $peraturan?->tempat_penetapan,
                    'tanggal_penetapan' => $peraturan?->tanggal_penetapan?->format('d F Y'),
                    'jenis' => $peraturan?->jenisPeraturan?->nama ?? 'Peraturan',
                    'status' => $peraturan?->statusPeraturan?->nama_status ?? 'Berlaku',
                    'bookmarked_at' => $bookmark->created_at?->diffForHumans() ?? 'Baru saja',
                ];
            });

        return Inertia::render('User/Bookmark', [
            'bookmarks' => $bookmarks,
            'filters' => [
                'q' => $search,
            ],
        ]);
    }

    /**
     * Lepas satu bookmark dari halaman daftar.
     *
     * Halaman tahu id baris bookmark-nya, bukan type + target_id, jadi
     * penghapusan dilakukan berdasarkan id tersebut. Entitas yang disimpan
     * tidak ikut terhapus — yang hilang hanya barisnya di `user_bookmarks`.
     */
    public function destroy(Request $request, Bookmark $bookmark)
    {
        abort_unless($bookmark->user_id === $request->user()->id, 404);

        $bookmark->delete();

        return redirect()->back()->with('success', 'Peraturan dihapus dari bookmark.');
    }
}
