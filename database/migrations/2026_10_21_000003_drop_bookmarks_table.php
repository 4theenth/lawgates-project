<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Buang tabel bookmark lama setelah isinya pindah ke user_bookmarks.
     *
     * Tabel `bookmarks` (user_id + peraturan_id) digantikan sepenuhnya oleh
     * `user_bookmarks` yang polimorfik, jadi membiarkannya berarti ada dua
     * sumber kebenaran untuk hal yang sama.
     *
     * Pemeriksaan di bawah menahan migrasi ini kalau ternyata masih ada baris
     * yang belum dipindahkan — lebih baik gagal berisik daripada menghapus
     * bookmark orang diam-diam.
     */
    public function up(): void
    {
        if (! Schema::hasTable('bookmarks')) {
            return;
        }

        $sisa = DB::table('bookmarks')->count();

        if ($sisa > 0) {
            throw new RuntimeException(
                "Masih ada {$sisa} baris di tabel `bookmarks`. "
                .'Pindahkan dulu ke `user_bookmarks`, baru jalankan migrasi ini lagi.'
            );
        }

        Schema::drop('bookmarks');
    }

    /**
     * Tabel dibiarkan hidup lagi dalam bentuk kosong.
     *
     * Isinya tidak bisa dikembalikan: peraturan_id sudah dibuang dan digantikan
     * pasangan bookmarkable_type/bookmarkable_id, sedangkan data bookmark itu
     * sendiri masih utuh di user_bookmarks.
     */
    public function down(): void
    {
        if (Schema::hasTable('bookmarks')) {
            return;
        }

        Schema::create('bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('peraturan_id')->constrained('peraturan')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['user_id', 'peraturan_id']);
        });
    }
};
