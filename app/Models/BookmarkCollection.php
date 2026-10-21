<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Folder (koleksi) milik user untuk mengelompokkan bookmark.
 *
 * Nama tabel: `bookmark_collections`.
 */
class BookmarkCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Bookmark yang tergabung di folder ini.
     */
    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany(
            Bookmark::class,
            'bookmark_collection_items',
            'collection_id',
            'bookmark_id'
        )->withTimestamps();
    }
}
