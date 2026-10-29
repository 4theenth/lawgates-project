<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Bookmark\BookmarkCollectionRequest;
use App\Http\Requests\Bookmark\BulkAssignBookmarkCollectionsRequest;
use App\Http\Requests\Bookmark\BulkDestroyBookmarksRequest;
use App\Http\Requests\Bookmark\SyncBookmarkCollectionsRequest;
use App\Models\Bookmark;
use App\Models\BookmarkCollection;
use App\Models\JenisPeraturan;
use App\Services\BookmarkService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controller Halaman Bookmark User (Inertia).
 *
 * Mengelola daftar bookmark, filter jenis & sorting, serta pengelompokan
 * ke dalam folder koleksi. Aturan tulis dipusatkan di BookmarkService agar
 * sama dengan endpoint API.
 */
class BookmarkPageController extends Controller
{
    public function __construct(private readonly BookmarkService $bookmarks) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $search = $request->input('q');
        $collectionId = $request->input('collection', 'all');
        $jenisFilter = $request->input('jenis', 'all');
        $lokasiFilter = $request->input('lokasi_daerah', $request->input('lokasi'));
        $sort = $request->input('sort', 'terbaru');
        $perPage = (int) $request->input('per_page', 6);
        if (! in_array($perPage, [6, 12, 24, 48])) {
            $perPage = 6;
        }

        // Ambil daftar folder koleksi milik user beserta hitungan bookmark di tiap folder
        $collections = $this->bookmarks
            ->collectionsForUser($user)
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
        if ($collectionId !== 'all' && ! empty($collectionId)) {
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
        if (! empty($search)) {
            $query->whereHasMorph('bookmarkable', ['peraturan'], function ($q) use ($search) {
                $q->where(function ($w) use ($search) {
                    $kata = '%'.$search.'%';
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
        if ($jenisFilter !== 'all' && ! empty($jenisFilter)) {
            $jenisArray = is_array($jenisFilter) ? $jenisFilter : explode(',', (string) $jenisFilter);
            $jenisArray = array_values(array_filter($jenisArray, fn ($j) => $j !== 'all' && ! empty(trim((string) $j))));

            if (! empty($jenisArray)) {
                $query->whereHasMorph('bookmarkable', ['peraturan'], function ($q) use ($jenisArray) {
                    $q->whereHas('jenisPeraturan', function ($jq) use ($jenisArray) {
                        $jq->where(function ($subQ) use ($jenisArray) {
                            foreach ($jenisArray as $j) {
                                if (is_numeric($j)) {
                                    $subQ->orWhere('id', (int) $j);
                                } else {
                                    $subQ->orWhereLike('nama', '%'.$j.'%')
                                        ->orWhereLike('kode', '%'.$j.'%');
                                }
                            }
                        });
                    });
                });
            }
        }

        // Filter berdasarkan Lokasi Daerah (khusus Peraturan Daerah)
        if (! empty($lokasiFilter)) {
            $lokasiList = is_array($lokasiFilter) ? $lokasiFilter : explode(',', (string) $lokasiFilter);
            $lokasiList = array_values(array_filter($lokasiList, fn ($l) => ! empty(trim((string) $l))));

            if (! empty($lokasiList)) {
                $query->whereHasMorph('bookmarkable', ['peraturan'], function ($q) use ($lokasiList) {
                    $q->where(function ($subQ) use ($lokasiList) {
                        foreach ($lokasiList as $item) {
                            $trimmed = trim($item);
                            $clean = preg_replace('/^(pemerintah\s+provinsi|pemerintah\s+kabupaten|pemerintah\s+kota|pemerintah\s+daerah|kabupaten|kota)\s+/i', '', $trimmed);
                            $subQ->orWhereLike('lokasi_daerah', '%'.$trimmed.'%')
                                ->orWhereLike('lokasi_daerah', '%'.$clean.'%')
                                ->orWhereLike('tempat_penetapan', '%'.$clean.'%')
                                ->orWhereLike('instansi', '%'.$clean.'%');
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
                    'collections' => $bookmark->collections->map(fn ($col) => [
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
    public function storeCollection(BookmarkCollectionRequest $request): RedirectResponse
    {
        $this->bookmarks->createCollection($request->user(), $request->validated());

        return redirect()->back()->with('success', 'Folder koleksi berhasil dibuat.');
    }

    /**
     * Ubah nama folder koleksi.
     */
    public function updateCollection(
        BookmarkCollectionRequest $request,
        BookmarkCollection $collection
    ): RedirectResponse {
        Gate::authorize('update', $collection);

        $this->bookmarks->updateCollection($request->user(), $collection, $request->validated());

        return redirect()->back()->with('success', 'Nama folder koleksi berhasil diperbarui.');
    }

    /**
     * Hapus folder koleksi (bookmark di dalamnya tidak terhapus).
     */
    public function destroyCollection(BookmarkCollection $collection): RedirectResponse
    {
        Gate::authorize('delete', $collection);

        $name = $collection->name;
        $this->bookmarks->deleteCollection($collection);

        return redirect()->back()->with('success', "Folder \"{$name}\" berhasil dihapus.");
    }

    /**
     * Sinkronisasi folder koleksi untuk satu bookmark.
     */
    public function syncCollections(
        SyncBookmarkCollectionsRequest $request,
        Bookmark $bookmark
    ): RedirectResponse {
        abort_unless($bookmark->user_id === $request->user()->id, 403);

        $this->bookmarks->assignCollections(
            $request->user(),
            $bookmark,
            $request->validated('collection_ids'),
        );

        return redirect()->back()->with('success', 'Koleksi bookmark berhasil diperbarui.');
    }

    /**
     * Lepas satu bookmark dari daftar simpanan user.
     */
    public function destroy(Request $request, Bookmark $bookmark): RedirectResponse
    {
        abort_unless($bookmark->user_id === $request->user()->id, 404);

        $this->bookmarks->deleteBookmark($bookmark);

        return redirect()->back()->with('success', 'Peraturan dihapus dari bookmark.');
    }

    /**
     * Lepas banyak bookmark sekaligus dari daftar simpanan user.
     */
    public function bulkDestroy(BulkDestroyBookmarksRequest $request): RedirectResponse
    {
        $count = $this->bookmarks->bulkDelete(
            $request->user(),
            $request->validated('bookmark_ids'),
        );

        return redirect()->back()->with('success', "{$count} peraturan berhasil dihapus dari bookmark.");
    }

    /**
     * Masukkan banyak bookmark sekaligus ke koleksi.
     */
    public function bulkSyncCollections(BulkAssignBookmarkCollectionsRequest $request): RedirectResponse
    {
        $result = $this->bookmarks->bulkAssignCollections(
            $request->user(),
            $request->validated('bookmark_ids'),
            $request->validated('collection_ids'),
        );

        return redirect()->back()->with(
            'success',
            "{$result['bookmarks_count']} peraturan dimasukkan ke {$result['collections_count']} koleksi."
        );
    }
}
