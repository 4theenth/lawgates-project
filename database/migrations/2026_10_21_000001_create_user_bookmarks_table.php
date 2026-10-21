<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Bookmark milik user terhadap satu entitas (peraturan, nanti putusan).
     *
     * Menggantikan tabel `bookmarks` lama yang mengikat ke `peraturan_id`.
     * Tabel ini sengaja TIDAK menyimpan `collection_id`: pemuatan ke folder
     * dipisahkan ke tabel pivot `bookmark_collection_items` supaya "hapus folder
     * tidak menghapus bookmark" terjamin secara struktur, bukan bergantung pada
     * konfigurasi cascade yang bisa salah set.
     */
    public function up(): void
    {
        Schema::create('user_bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('bookmarkable_type');
            $table->unsignedBigInteger('bookmarkable_id');
            $table->timestamps();

            // Satu user hanya boleh menyimpan satu entitas yang sama sekali saja.
            $table->unique(['user_id', 'bookmarkable_type', 'bookmarkable_id'], 'user_bookmarks_unique');

            // Dua pola query yang nyata dipakai: "user ini menyimpan apa saja"
            // dan "entitas ini disimpan oleh siapa".
            $table->index(['user_id', 'bookmarkable_type'], 'user_bookmarks_user_type_idx');
            $table->index(['bookmarkable_type', 'bookmarkable_id'], 'user_bookmarks_morph_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_bookmarks');
    }
};
