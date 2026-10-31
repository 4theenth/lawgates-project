<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Riwayat penimpaan dokumen hukum.
 *
 * Saat admin melakukan import ulang dengan allow_overwrite, isi dokumen
 * sebelum penimpaan disimpan di sini sehingga perubahan bisa diaudit dan
 * dikembalikan. Tanpa ini, overwrite menghapus pasal/struktur/penjelasan
 * lama secara permanen tanpa jejak siapa yang melakukannya.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peraturan_overwrite_logs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('peraturan_id')->constrained('peraturan')->cascadeOnDelete();
            $table->string('unique_id')->index();

            // Siapa yang menimpa (selalu admin/superadmin, lihat route).
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();

            // Asal penimpaan supaya bisa dibedakan mana yang dari UI, API, atau CLI.
            $table->string('source')->default('ui');

            // Ringkasan perubahan agar bisa ditampilkan tanpa membuka snapshot.
            $table->json('snapshot')->nullable();      // isi peraturan sebelum ditimpa
            $table->json('changes')->nullable();       // field apa saja yang berubah
            $table->unsignedInteger('chunks_before')->default(0);
            $table->unsignedInteger('chunks_after')->default(0);

            // Snapshot dihapus berkala untuk menghemat ruang; log-nya tetap ada.
            $table->timestamp('snapshot_purged_at')->nullable();

            $table->timestamps();

            $table->index(['peraturan_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peraturan_overwrite_logs');
    }
};
