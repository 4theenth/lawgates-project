<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Bookmark\AssignBookmarkCollectionsRequest;
use App\Http\Requests\Bookmark\BookmarkCollectionRequest;
use App\Http\Requests\Bookmark\ToggleBookmarkRequest;
use App\Models\Bookmark;
use App\Models\BookmarkCollection;
use App\Services\BookmarkService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

/**
 * Bookmark dan folder (koleksi) milik user yang sedang login.
 *
 * Semua operasi tunduk pada `auth:sanctum` di routes/api.php. Aturan bisnis
 * dipusatkan di BookmarkService; controller ini hanya menangani HTTP,
 * otorisasi, dan bentuk respons.
 */
class BookmarkController extends Controller
{
    public function __construct(private readonly BookmarkService $bookmarks) {}

    // ─────────────────────────────────────────────
    // Daftar bookmark
    // ─────────────────────────────────────────────

    /**
     * Daftar bookmark user, bisa disaring per folder.
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'collection_id' => ['nullable'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $user = $request->user();
        $perPage = (int) ($validated['per_page'] ?? 12);
        $collectionId = $validated['collection_id'] ?? null;

        $query = $user->bookmarks()
            ->with('collections')
            ->latest();

        // `unassigned` = bookmark yang belum masuk folder mana pun ("Tanpa Folder").
        if ($collectionId === 'unassigned') {
            $query->unassigned();
        } elseif ($collectionId !== null && $collectionId !== '') {
            $collection = BookmarkCollection::where('user_id', $user->id)->findOrFail($collectionId);
            $query->whereHas('collections', fn ($q) => $q->where('bookmark_collections.id', $collection->id));
        }

        $bookmarks = $query->paginate($perPage);

        $bookmarks->through(fn (Bookmark $bookmark) => [
            'id' => $bookmark->id,
            'type' => $bookmark->bookmarkable_type,
            'target_id' => $bookmark->bookmarkable_id,
            'bookmarked_at' => $bookmark->created_at?->toIso8601String(),
            'collections' => $bookmark->collections->map(fn (BookmarkCollection $collection) => [
                'id' => $collection->id,
                'name' => $collection->name,
            ])->values(),
        ]);

        return response()->json([
            'success' => true,
            'data' => $bookmarks,
        ]);
    }

    /**
     * Tandai / lepas tanda simpan untuk satu entitas.
     */
    public function toggle(ToggleBookmarkRequest $request): JsonResponse
    {
        $result = $this->bookmarks->toggle(
            $request->user(),
            $request->validated('type'),
            (int) $request->validated('id'),
        );

        return response()->json([
            'success' => true,
            ...$result,
        ], $result['bookmarked'] ? 201 : 200);
    }

    /**
     * Atur satu bookmark masuk ke folder mana saja.
     *
     * Mengganti seluruh keanggotaan folder bookmark ini dengan daftar yang
     * dikirim. Daftar kosong berarti mengeluarkannya dari semua folder
     * (bookmark tetap ada).
     */
    public function assignCollections(AssignBookmarkCollectionsRequest $request): JsonResponse
    {
        $bookmark = $request->user()
            ->bookmarks()
            ->findOrFail($request->validated('bookmark_id'));

        $result = $this->bookmarks->assignCollections(
            $request->user(),
            $bookmark,
            $request->validated('collection_ids'),
        );

        return response()->json([
            'success' => true,
            ...$result,
        ]);
    }

    // ─────────────────────────────────────────────
    // Folder (koleksi)
    // ─────────────────────────────────────────────

    public function collections(Request $request): JsonResponse
    {
        $collections = $this->bookmarks->collectionsForUser($request->user())
            ->map(fn (BookmarkCollection $collection) => [
                'id' => $collection->id,
                'name' => $collection->name,
                'description' => $collection->description,
                'bookmark_count' => $collection->bookmarks_count,
                'created_at' => $collection->created_at?->toIso8601String(),
            ]);

        return response()->json([
            'success' => true,
            'data' => $collections,
        ]);
    }

    public function storeCollection(BookmarkCollectionRequest $request): JsonResponse
    {
        $collection = $this->bookmarks->createCollection(
            $request->user(),
            $request->validated(),
        );

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $collection->id,
                'name' => $collection->name,
                'description' => $collection->description,
                'bookmark_count' => 0,
            ],
        ], 201);
    }

    public function updateCollection(
        BookmarkCollectionRequest $request,
        BookmarkCollection $collection
    ): JsonResponse {
        Gate::authorize('update', $collection);

        $collection = $this->bookmarks->updateCollection(
            $request->user(),
            $collection,
            $request->validated(),
        );

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $collection->id,
                'name' => $collection->name,
                'description' => $collection->description,
            ],
        ]);
    }

    /**
     * Hapus folder.
     *
     * Hanya baris pivot yang ikut terhapus; bookmark-nya tetap tersimpan
     * (dan kembali terhitung sebagai "Tanpa Folder").
     */
    public function destroyCollection(BookmarkCollection $collection): JsonResponse
    {
        Gate::authorize('delete', $collection);

        $this->bookmarks->deleteCollection($collection);

        return response()->json([
            'success' => true,
            'message' => 'Folder dihapus. Bookmark di dalamnya tetap tersimpan.',
        ]);
    }
}
