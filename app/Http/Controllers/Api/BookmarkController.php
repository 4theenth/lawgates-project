<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\BookmarkCollection;
use App\Models\Peraturan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

/**
 * Bookmark dan folder (koleksi) milik user yang sedang login.
 *
 * Semua operasi tunduk pada `auth:sanctum` di routes/api.php. Kepemilikan
 * diperiksa eksplisit per baris (bukan hanya lewat middleware), supaya user
 * tidak bisa menyentuh folder atau bookmark milik user lain.
 */
class BookmarkController extends Controller
{
    /**
     * Tipe entitas yang boleh di-bookmark, dipetakan dari alias API ke morph
     * alias. Hanya yang terdaftar di sini diterima, sehingga user tidak bisa
     * menyisipkan tipe sembarangan ke kolom bookmarkable_type.
     *
     * Isinya harus sejalan dengan morphMap di AppServiceProvider: tipe yang
     * lolos validasi tapi belum terdaftar di sana akan tersimpan sebagai baris
     * yatim, lalu melempar "Class \"<alias>\" not found" saat dibaca.
     * Tambahkan di kedua tempat sekaligus, atau tidak sama sekali.
     */
    private const ALLOWED_TYPES = [
        'peraturan' => 'peraturan',
    ];

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
     *
     * Dibuat idempoten: memanggil dua kali mengembalikan kondisi terakhir tanpa
     * error, karena tombol di UI bisa tertekan cepat dua kali.
     */
    public function toggle(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in(array_keys(self::ALLOWED_TYPES))],
            // Harus angka: kolom bookmarkable_id bertipe bigint, dan id non-angka
            // (mis. unique_id/slug) akan mencapai query sebagai string lalu
            // memicu SQLSTATE 22P02 -> 500 lengkap dengan stack trace.
            'id' => ['required', 'integer', 'min:1'],
        ]);

        $type = self::ALLOWED_TYPES[$validated['type']];
        $targetId = $validated['id'];
        $user = $request->user();

        // Pastikan entitasnya benar-benar ada sebelum disimpan.
        $this->resolveTarget($type, $targetId);

        $existing = $user->bookmarks()->forMorph($type, $targetId)->first();

        if ($existing) {
            $existing->delete();

            return response()->json([
                'success' => true,
                'bookmarked' => false,
                'type' => $validated['type'],
                'target_id' => $targetId,
            ]);
        }

        $bookmark = $user->bookmarks()->create([
            'bookmarkable_type' => $type,
            'bookmarkable_id' => $targetId,
        ]);

        return response()->json([
            'success' => true,
            'bookmarked' => true,
            'type' => $validated['type'],
            'target_id' => $targetId,
            'bookmark_id' => $bookmark->id,
        ], 201);
    }

    /**
     * Atur satu bookmark masuk ke folder mana saja.
     *
     * Mengganti seluruh keanggotaan folder bookmark ini dengan daftar yang
     * dikirim. Daftar kosong berarti mengeluarkannya dari semua folder
     * (bookmark tetap ada).
     */
    public function assignCollections(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'bookmark_id' => ['required', 'integer'],
            'collection_ids' => ['present', 'array'],
            'collection_ids.*' => ['integer'],
        ]);

        $user = $request->user();

        $bookmark = $user->bookmarks()->findOrFail($validated['bookmark_id']);

        // Hanya folder milik user sendiri, supaya tidak bisa menautkan ke folder
        // orang lain lewat id yang ditebak.
        $collectionIds = BookmarkCollection::where('user_id', $user->id)
            ->whereIn('id', $validated['collection_ids'])
            ->pluck('id');

        if ($collectionIds->count() !== count(array_unique($validated['collection_ids']))) {
            abort(422, 'Ada folder yang tidak ditemukan.');
        }

        DB::transaction(function () use ($bookmark, $collectionIds) {
            $bookmark->collections()->sync($collectionIds);
        });

        return response()->json([
            'success' => true,
            'bookmark_id' => $bookmark->id,
            'collection_ids' => $collectionIds->values(),
        ]);
    }

    // ─────────────────────────────────────────────
    // Folder (koleksi)
    // ─────────────────────────────────────────────

    public function collections(Request $request): JsonResponse
    {
        $collections = $request->user()
            ->bookmarkCollections()
            ->withCount('bookmarks')
            ->orderBy('name')
            ->get()
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

    public function storeCollection(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $user = $request->user();

        // Nama folder unik per user; pesannya jelas, bukan error constraint DB.
        $exists = $user->bookmarkCollections()
            ->whereRaw('LOWER(name) = ?', [mb_strtolower($validated['name'])])
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Nama folder sudah dipakai.',
            ], 422);
        }

        $collection = $user->bookmarkCollections()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

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

    public function updateCollection(Request $request, BookmarkCollection $collection): JsonResponse
    {
        $this->authorizeCollection($request, $collection);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $user = $request->user();

        $exists = $user->bookmarkCollections()
            ->where('id', '!=', $collection->id)
            ->whereRaw('LOWER(name) = ?', [mb_strtolower($validated['name'])])
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Nama folder sudah dipakai.',
            ], 422);
        }

        $collection->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

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
     * (dan kembali terhitung sebagai "Tanpa Folder"). Ini AC #4 USER-02 dan
     * dijamin oleh struktur tabel, bukan oleh kode di sini.
     */
    public function destroyCollection(Request $request, BookmarkCollection $collection): JsonResponse
    {
        $this->authorizeCollection($request, $collection);

        $collection->delete();

        return response()->json([
            'success' => true,
            'message' => 'Folder dihapus. Bookmark di dalamnya tetap tersimpan.',
        ]);
    }

    // ─────────────────────────────────────────────
    // Pembantu
    // ─────────────────────────────────────────────

    /**
     * Pastikan folder ini milik user yang sedang login.
     */
    private function authorizeCollection(Request $request, BookmarkCollection $collection): void
    {
        if ($collection->user_id !== $request->user()->id) {
            abort(403, 'Folder ini bukan milik Anda.');
        }
    }

    /**
     * Pastikan entitas yang mau di-bookmark ada.
     */
    private function resolveTarget(string $type, int|string $id): void
    {
        $model = match ($type) {
            'peraturan' => Peraturan::class,
            // 'putusan' => CourtDecision::class,
            default => null,
        };

        if ($model === null || ! $model::whereKey($id)->exists()) {
            abort(404, 'Data yang ingin disimpan tidak ditemukan.');
        }
    }
}
