<?php

namespace App\Services;

use App\Models\Bookmark;
use App\Models\BookmarkCollection;
use App\Models\Peraturan;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Aturan bisnis bookmark dan folder koleksi.
 *
 * Dipakai bersama oleh endpoint API (klien SPA/token) dan halaman Inertia,
 * supaya validasi, kepemilikan folder, dan perilaku hapus tidak ditulis dua
 * kali di controller.
 */
class BookmarkService
{
    /**
     * Tipe entitas yang boleh di-bookmark, dipetakan dari alias API ke morph
     * alias. Daftar ini harus sejalan dengan morphMap di AppServiceProvider.
     */
    public const ALLOWED_TYPES = [
        'peraturan' => 'peraturan',
    ];

    // ─────────────────────────────────────────────
    // Bookmark
    // ─────────────────────────────────────────────

    /**
     * Tandai / lepas tanda simpan untuk satu entitas.
     *
     * @return array{bookmarked: bool, type: string, target_id: int, bookmark_id?: int}
     */
    public function toggle(User $user, string $type, int $targetId): array
    {
        $morphType = self::ALLOWED_TYPES[$type] ?? null;

        if ($morphType === null) {
            throw ValidationException::withMessages([
                'type' => 'Tipe bookmark tidak dikenal.',
            ]);
        }

        $existing = $user->bookmarks()->forMorph($morphType, $targetId)->first();

        // Melepas bookmark tidak membutuhkan entitasnya masih ada, sehingga
        // peraturan yang sudah di-soft-delete tetap bisa dilepas.
        if ($existing) {
            $existing->delete();

            return [
                'bookmarked' => false,
                'type' => $morphType,
                'target_id' => $targetId,
            ];
        }

        $this->resolveTarget($morphType, $targetId);

        try {
            $bookmark = $user->bookmarks()->create([
                'bookmarkable_type' => $morphType,
                'bookmarkable_id' => $targetId,
            ]);
        } catch (UniqueConstraintViolationException) {
            // Balapan: request lain menyimpan entitas yang sama lebih dulu.
            $bookmark = $user->bookmarks()->forMorph($morphType, $targetId)->firstOrFail();
        }

        return [
            'bookmarked' => true,
            'type' => $morphType,
            'target_id' => $targetId,
            'bookmark_id' => $bookmark->id,
        ];
    }

    public function deleteBookmark(Bookmark $bookmark): void
    {
        DB::transaction(function () use ($bookmark) {
            $bookmark->collections()->detach();
            $bookmark->delete();
        });
    }

    public function bulkDelete(User $user, array $bookmarkIds): int
    {
        return DB::transaction(function () use ($user, $bookmarkIds) {
            $bookmarks = $user->bookmarks()->whereIn('id', $bookmarkIds)->get();

            foreach ($bookmarks as $bookmark) {
                $bookmark->collections()->detach();
                $bookmark->delete();
            }

            return $bookmarks->count();
        });
    }

    // ─────────────────────────────────────────────
    // Folder koleksi
    // ─────────────────────────────────────────────

    /**
     * @return Collection<int, BookmarkCollection>
     */
    public function collectionsForUser(User $user): Collection
    {
        return $user->bookmarkCollections()
            ->withCount('bookmarks')
            ->orderBy('name')
            ->get();
    }

    public function createCollection(User $user, array $data): BookmarkCollection
    {
        $name = $this->normalizeName($data);
        $this->assertNameAvailable($user, $name);

        try {
            return $user->bookmarkCollections()->create([
                'name' => $name,
                'description' => $data['description'] ?? null,
            ]);
        } catch (UniqueConstraintViolationException) {
            throw $this->nameAlreadyUsed();
        }
    }

    public function updateCollection(
        User $user,
        BookmarkCollection $collection,
        array $data
    ): BookmarkCollection {
        $name = $this->normalizeName($data);
        $this->assertNameAvailable($user, $name, $collection->id);

        $payload = ['name' => $name];

        // Endpoint web hanya mengirim nama; jangan menghapus deskripsi lama
        // hanya karena field tersebut tidak ada di payload.
        if (array_key_exists('description', $data)) {
            $payload['description'] = $data['description'];
        }

        try {
            $collection->update($payload);
        } catch (UniqueConstraintViolationException) {
            throw $this->nameAlreadyUsed();
        }

        return $collection->refresh();
    }

    public function deleteCollection(BookmarkCollection $collection): void
    {
        $collection->delete();
    }

    /**
     * Sinkronkan keanggotaan folder untuk satu bookmark.
     *
     * @return array{bookmark_id: int, collection_ids: array<int, int>}
     */
    public function assignCollections(User $user, Bookmark $bookmark, array $folderIds): array
    {
        $collectionIds = $this->ownedFolderIds($user, $folderIds);

        DB::transaction(function () use ($bookmark, $collectionIds) {
            $bookmark->collections()->sync($collectionIds);
        });

        return [
            'bookmark_id' => $bookmark->id,
            'collection_ids' => $collectionIds,
        ];
    }

    /**
     * @return array{bookmarks_count: int, collections_count: int}
     */
    public function bulkAssignCollections(User $user, array $bookmarkIds, array $folderIds): array
    {
        $collectionIds = $this->ownedFolderIds($user, $folderIds);

        if ($collectionIds === []) {
            throw ValidationException::withMessages([
                'collection_ids' => 'Pilih minimal satu folder.',
            ]);
        }

        $bookmarks = $user->bookmarks()->whereIn('id', $bookmarkIds)->get();

        DB::transaction(function () use ($bookmarks, $collectionIds) {
            foreach ($bookmarks as $bookmark) {
                $bookmark->collections()->syncWithoutDetaching($collectionIds);
            }
        });

        return [
            'bookmarks_count' => $bookmarks->count(),
            'collections_count' => count($collectionIds),
        ];
    }

    // ─────────────────────────────────────────────
    // Pembantu
    // ─────────────────────────────────────────────

    private function resolveTarget(string $type, int $targetId): void
    {
        $model = match ($type) {
            'peraturan' => Peraturan::class,
            default => null,
        };

        if ($model === null) {
            throw ValidationException::withMessages([
                'type' => 'Tipe bookmark tidak dikenal.',
            ]);
        }

        if (! $model::query()->whereKey($targetId)->exists()) {
            throw (new ModelNotFoundException)->setModel($model, [$targetId]);
        }
    }

    /**
     * Hanya folder milik user sendiri yang boleh dipakai. Id folder asing
     * ditolak dengan 422, bukan diabaikan diam-diam.
     *
     * @return array<int, int>
     */
    private function ownedFolderIds(User $user, array $folderIds): array
    {
        $ids = array_values(array_unique(array_map('intval', $folderIds)));

        if ($ids === []) {
            return [];
        }

        $owned = $user->bookmarkCollections()
            ->whereIn('id', $ids)
            ->pluck('id')
            ->all();

        if (count($owned) !== count($ids)) {
            throw ValidationException::withMessages([
                'collection_ids' => 'Ada folder yang tidak ditemukan.',
            ]);
        }

        return $owned;
    }

    private function normalizeName(array $data): string
    {
        $name = trim((string) ($data['name'] ?? ''));

        if ($name === '') {
            throw ValidationException::withMessages([
                'name' => 'Nama folder tidak boleh kosong.',
            ]);
        }

        if (mb_strlen($name) > 50) {
            throw ValidationException::withMessages([
                'name' => 'Nama folder maksimal 50 karakter.',
            ]);
        }

        return $name;
    }

    private function assertNameAvailable(User $user, string $name, ?int $ignoreId = null): void
    {
        $query = $user->bookmarkCollections()
            ->whereRaw('LOWER(name) = ?', [mb_strtolower($name)]);

        if ($ignoreId !== null) {
            $query->where('id', '!=', $ignoreId);
        }

        if ($query->exists()) {
            throw $this->nameAlreadyUsed();
        }
    }

    private function nameAlreadyUsed(): ValidationException
    {
        return ValidationException::withMessages([
            'name' => 'Nama folder sudah dipakai. Silakan gunakan nama lain.',
        ]);
    }
}
