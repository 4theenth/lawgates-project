<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\BookmarkCollection;
use App\Models\JenisPeraturan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

/**
 * Controller Halaman Bookmark User (Inertia).
 *
 * Mengelola daftar bookmark, filter jenis & sorting, serta pengelompokan
 * ke dalam folder koleksi.
 */
class BookmarkPageController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $search = $request->input('q');
        $collectionId = $request->input('collection', 'all');
        $jenisFilter = $request->input('jenis', 'all');
        $lokasiFilter = $request->input('lokasi_daerah', $request->input('lokasi'));
        $sort = $request->input('sort', 'terbaru');
        $perPage = (int) $request->input('per_page', 6);
        if (!in_array($perPage, [6, 12, 24, 48])) {
            $perPage = 6;
        }

        // Ambil daftar folder koleksi milik user beserta hitungan bookmark di tiap folder
        $collections = $user->bookmarkCollections()
            ->withCount('bookmarks')
            ->orderBy('name')
            ->get()
            ->map(function (BookmarkCollection $col) {
                return [
                    'id' => $col->id,
                    'name' => $col->name,
                    'total_bookmarks' => $col->bookmarks_count,
                ];
            });

        $totalAllBookmarks = Bookmark::query()
            ->where('user_id', $user->id)
            ->where('bookmarkable_type', 'peraturan')
            ->count();

        // Query bookmark dengan relasi peraturan & folder koleksi
        $query = Bookmark::query()
            ->where('user_id', $user->id)
            ->where('bookmarkable_type', 'peraturan')
            ->with(['bookmarkable.jenisPeraturan', 'bookmarkable.statusPeraturan', 'collections']);

        // Filter berdasarkan folder koleksi yang dipilih
        if ($collectionId !== 'all' && !empty($collectionId)) {
            $query->whereHas('collections', function ($q) use ($collectionId) {
                $q->where('bookmark_collections.id', $collectionId);
            });
        }

        // Filter kata kunci pencarian (case-insensitive)
        //
        // whereLike() dipakai, bukan operator 'ilike', karena (a) SQLite tidak
        // mengenal ilike sehingga suite test gagal, dan (b) 'tahun' bertipe
        // integer sehingga `tahun ilike ?` ditolak PostgreSQL dengan
        // "operator does not exist: integer ~~* unknown". whereLike menangani
        // cast kolom dan memilih operator sesuai driver.
        if (!empty($search)) {
            $query->whereHasMorph('bookmarkable', ['peraturan'], function ($q) use ($search) {
                $q->where(function ($w) use ($search) {
                    $kata = '%' . $search . '%';
                    $w->whereLike('judul', $kata)
                        ->orWhereLike('nomor', $kata)
                        ->orWhereLike('tahun', $kata)
                        ->orWhereLike('subjek', $kata)
                        ->orWhereHas('jenisPeraturan', function ($jq) use ($kata) {
                            $jq->whereLike('nama', $kata)
                                ->orWhereLike('kode', $kata);
                        });
                });
            });
        }

        // Filter berdasarkan Jenis Peraturan (mendukung multi-select array / comma-separated)
        if ($jenisFilter !== 'all' && !empty($jenisFilter)) {
            $jenisArray = is_array($jenisFilter) ? $jenisFilter : explode(',', (string) $jenisFilter);
            $jenisArray = array_values(array_filter($jenisArray, fn ($j) => $j !== 'all' && !empty(trim((string) $j))));

            if (!empty($jenisArray)) {
                $query->whereHasMorph('bookmarkable', ['peraturan'], function ($q) use ($jenisArray) {
                    $q->whereHas('jenisPeraturan', function ($jq) use ($jenisArray) {
                        $jq->where(function ($subQ) use ($jenisArray) {
                            foreach ($jenisArray as $j) {
                                if (is_numeric($j)) {
                                    $subQ->orWhere('id', (int) $j);
                                } else {
                                    $subQ->orWhereLike('nama', '%' . $j . '%')
                                        ->orWhereLike('kode', '%' . $j . '%');
                                }
                            }
                        });
                    });
                });
            }
        }

        // Filter berdasarkan Lokasi Daerah (khusus Peraturan Daerah)
        if (!empty($lokasiFilter)) {
            $lokasiList = is_array($lokasiFilter) ? $lokasiFilter : explode(',', (string) $lokasiFilter);
            $lokasiList = array_values(array_filter($lokasiList, fn ($l) => !empty(trim((string) $l))));

            if (!empty($lokasiList)) {
                $query->whereHasMorph('bookmarkable', ['peraturan'], function ($q) use ($lokasiList) {
                    $q->where(function ($subQ) use ($lokasiList) {
                        foreach ($lokasiList as $item) {
                            $trimmed = trim($item);
                            $clean = preg_replace('/^(pemerintah\s+provinsi|pemerintah\s+kabupaten|pemerintah\s+kota|pemerintah\s+daerah|kabupaten|kota)\s+/i', '', $trimmed);
                            $subQ->orWhereLike('lokasi_daerah', '%' . $trimmed . '%')
                                ->orWhereLike('lokasi_daerah', '%' . $clean . '%')
                                ->orWhereLike('tempat_penetapan', '%' . $clean . '%')
                                ->orWhereLike('instansi', '%' . $clean . '%');
                        }
                    });
                });
            }
        }

        // Pengurutan (Sorting)
        switch ($sort) {
            case 'terlama':
                $query->oldest('created_at');
                break;
            case 'judul_asc':
            case 'judul_desc':
                // Karena polimorfik, urutkan berdasarkan created_at sebagai default aman
                $query->latest('created_at');
                break;
            case 'terbaru':
            default:
                $query->latest('created_at');
                break;
        }

        $bookmarks = $query
            ->paginate($perPage)
            ->withQueryString()
            ->through(function (Bookmark $bookmark) {
                $peraturan = $bookmark->bookmarkable;

                return [
                    'id' => $bookmark->id,
                    'unique_id' => $peraturan?->unique_id ?? '',
                    'judul' => $peraturan?->judul ?? 'Dokumen Peraturan',
                    'nomor' => $peraturan?->nomor ?? '',
                    'tahun' => $peraturan?->tahun ?? '',
                    'tempat_penetapan' => $peraturan?->tempat_penetapan,
                    'tanggal_penetapan' => $peraturan?->tanggal_penetapan?->format('d F Y'),
                    'jenis' => $peraturan?->jenisPeraturan?->nama ?? 'Peraturan',
                    'status' => $peraturan?->statusPeraturan?->nama_status ?? 'Berlaku',
                    'bookmarked_at' => $bookmark->created_at?->diffForHumans() ?? 'Baru saja',
                    'collections' => $bookmark->collections->map(fn($col) => [
                        'id' => $col->id,
                        'name' => $col->name,
                    ]),
                ];
            });

        $kategoriOptions = JenisPeraturan::query()
            ->orderBy('id')
            ->get(['id', 'nama', 'kode'])
            ->map(fn ($j) => [
                'value' => (string) $j->id,
                'label' => $j->nama,
            ]);

        return Inertia::render('User/Bookmark', [
            'bookmarks' => $bookmarks,
            'collections' => $collections,
            'totalAllBookmarks' => $totalAllBookmarks,
            'kategoriOptions' => $kategoriOptions,
            'filters' => [
                'q' => $search,
                'collection' => $collectionId,
                'jenis' => $jenisFilter,
                'lokasi_daerah' => $lokasiFilter,
                'sort' => $sort,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Buat folder koleksi baru milik user.
     */
    public function storeCollection(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('bookmark_collections', 'name')->where('user_id', $request->user()->id),
            ],
        ], [
            'name.unique' => 'Folder dengan nama tersebut sudah ada. Silakan gunakan nama lain.',
            'name.required' => 'Nama folder tidak boleh kosong.',
            'name.max' => 'Nama folder maksimal 50 karakter.',
        ]);

        $request->user()->bookmarkCollections()->create([
            'name' => $validated['name'],
        ]);

        return redirect()->back()->with('success', 'Folder koleksi berhasil dibuat.');
    }

    /**
     * Ubah nama folder koleksi.
     */
    public function updateCollection(Request $request, BookmarkCollection $collection): RedirectResponse
    {
        abort_unless($collection->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('bookmark_collections', 'name')
                    ->where('user_id', $request->user()->id)
                    ->ignore($collection->id),
            ],
        ], [
            'name.unique' => 'Folder dengan nama tersebut sudah ada. Silakan gunakan nama lain.',
            'name.required' => 'Nama folder tidak boleh kosong.',
            'name.max' => 'Nama folder maksimal 50 karakter.',
        ]);

        $collection->update([
            'name' => $validated['name'],
        ]);

        return redirect()->back()->with('success', 'Nama folder koleksi berhasil diperbarui.');
    }

    /**
     * Hapus folder koleksi (bookmark di dalamnya tidak terhapus).
     */
    public function destroyCollection(Request $request, BookmarkCollection $collection): RedirectResponse
    {
        abort_unless($collection->user_id === $request->user()->id, 403);

        $name = $collection->name;
        $collection->bookmarks()->detach();
        $collection->delete();

        return redirect()->back()->with('success', "Folder \"{$name}\" berhasil dihapus.");
    }

    /**
     * Sinkronisasi folder koleksi untuk satu bookmark.
     */
    public function syncCollections(Request $request, Bookmark $bookmark): RedirectResponse
    {
        abort_unless($bookmark->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'collection_ids' => ['array'],
            'collection_ids.*' => ['exists:bookmark_collections,id'],
        ]);

        // Pastikan hanya folder milik user yang di-sync
        $userCollectionIds = $request->user()
            ->bookmarkCollections()
            ->whereIn('id', $validated['collection_ids'] ?? [])
            ->pluck('id');

        $bookmark->collections()->sync($userCollectionIds);

        return redirect()->back()->with('success', 'Koleksi bookmark berhasil diperbarui.');
    }

    /**
     * Lepas satu bookmark dari daftar simpanan user.
     */
    public function destroy(Request $request, Bookmark $bookmark): RedirectResponse
    {
        abort_unless($bookmark->user_id === $request->user()->id, 404);

        $bookmark->collections()->detach();
        $bookmark->delete();

        return redirect()->back()->with('success', 'Peraturan dihapus dari bookmark.');
    }

    /**
     * Lepas banyak bookmark sekaligus dari daftar simpanan user.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bookmark_ids' => ['required', 'array', 'min:1'],
            'bookmark_ids.*' => ['integer'],
        ]);

        $bookmarks = Bookmark::query()
            ->where('user_id', $request->user()->id)
            ->whereIn('id', $validated['bookmark_ids'])
            ->get();

        $count = $bookmarks->count();

        foreach ($bookmarks as $bm) {
            $bm->collections()->detach();
            $bm->delete();
        }

        return redirect()->back()->with('success', "{$count} peraturan berhasil dihapus dari bookmark.");
    }

    /**
     * Masukkan banyak bookmark sekaligus ke koleksi.
     */
    public function bulkSyncCollections(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bookmark_ids' => ['required', 'array', 'min:1'],
            'bookmark_ids.*' => ['integer'],
            'collection_ids' => ['required', 'array', 'min:1'],
            'collection_ids.*' => ['exists:bookmark_collections,id'],
        ]);

        $user = $request->user();
        $userCollectionIds = $user->bookmarkCollections()
            ->whereIn('id', $validated['collection_ids'])
            ->pluck('id')
            ->all();

        $bookmarks = Bookmark::query()
            ->where('user_id', $user->id)
            ->whereIn('id', $validated['bookmark_ids'])
            ->get();

        foreach ($bookmarks as $bm) {
            $bm->collections()->syncWithoutDetaching($userCollectionIds);
        }

        $countPeraturan = $bookmarks->count();
        $countKoleksi = count($userCollectionIds);

        return redirect()->back()->with('success', "{$countPeraturan} peraturan dimasukkan ke {$countKoleksi} koleksi.");
    }
}

