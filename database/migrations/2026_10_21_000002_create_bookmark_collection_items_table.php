<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Pivot: bookmark mana masuk ke folder mana.
     *
     * Dipisah dari `user_bookmarks` supaya satu bookmark bisa ada di beberapa
     * folder sekaligus, dan supaya menghapus folder hanya melepas isinya
     * (baris di sini) tanpa menyentuh bookmark-nya sama sekali.
     */
    public function up(): void
    {
        Schema::create('bookmark_collection_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bookmark_id')
                ->constrained('user_bookmarks')
                ->cascadeOnDelete();
            $table->foreignId('collection_id')
                ->constrained('bookmark_collections')
                ->cascadeOnDelete();

            // Satu bookmark tidak boleh dua kali di folder yang sama.
            $table->unique(['bookmark_id', 'collection_id'], 'bookmark_collection_items_unique');

            // Eloquent menulis timestamp saat sync(); kolomnya harus ada.
            $table->timestamps();

            // Untuk menghitung isi sebuah folder.
            $table->index('collection_id', 'bookmark_collection_items_collection_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookmark_collection_items');
    }
};
