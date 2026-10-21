<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Folder (koleksi) bookmark milik user.
     *
     * Satu user punya banyak folder; folder hanya wadah, tidak menyimpan
     * bookmark-nya sendiri. Relasi ke bookmark ada di tabel pivot
     * `bookmark_collection_items`, sehingga menghapus folder tidak pernah
     * menghapus bookmark (lihat AC #4 USER-02).
     */
    public function up(): void
    {
        Schema::create('bookmark_collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();

            // Dua folder dengan nama sama dalam satu akun membingungkan user.
            $table->unique(['user_id', 'name'], 'bookmark_collections_user_name_unique');

            // Query utama: "daftar folder milik user ini".
            $table->index('user_id', 'bookmark_collections_user_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookmark_collections');
    }
};
