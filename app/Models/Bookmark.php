<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Satu bookmark milik satu user terhadap satu entitas (peraturan, dan nanti
 * putusan pengadilan).
 *
 * Model ini hanya tahu "user X menyimpan entitas Y". Pemuatan ke folder
 * disimpan terpisah di pivot `bookmark_collection_items`, sehingga bookmark
 * selalu ada walau tidak tergabung di folder mana pun.
 *
 * Nama tabel: `user_bookmarks`.
 */
class Bookmark extends Model
{
    use HasFactory;

    protected $table = 'user_bookmarks';

    protected $fillable = [
        'user_id',
        'bookmarkable_type',
        'bookmarkable_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Entitas yang disimpan. Tipenya memakai alias morph map ('peraturan',
     * 'putusan'), bukan nama class penuh, supaya nama class bisa diubah tanpa
     * merusak data yang sudah tersimpan.
     */
    public function bookmarkable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Folder tempat bookmark ini tergabung. Kosong berarti "Tanpa Folder".
     */
    public function collections(): BelongsToMany
    {
        return $this->belongsToMany(
            BookmarkCollection::class,
            'bookmark_collection_items',
            'bookmark_id',
            'collection_id'
        )->withTimestamps();
    }

    /**
     * Filter ke satu entitas tertentu, dipakai saat memeriksa status bookmark
     * pada halaman detail.
     */
    public function scopeForMorph(Builder $query, string $type, int|string $id): Builder
    {
        return $query
            ->where('bookmarkable_type', $type)
            ->where('bookmarkable_id', $id);
    }

    /**
     * Bookmark yang belum masuk folder mana pun.
     */
    public function scopeUnassigned(Builder $query): Builder
    {
        return $query->whereDoesntHave('collections');
    }
}
