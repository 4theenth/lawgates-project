<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Menambah kolom subjek & lokasi ke `timeline_events`.
 *
 * Tabel timeline sengaja menyalin nilai dari master `peraturan` supaya filter
 * di grafik tidak perlu JOIN ke master. Filter subjek/lokasi di toolbar
 * timeline dipakai untuk mempersempit grafik, jadi keduanya harus ada di sini
 * agar penyaringan bisa dilakukan pada tabel yang sama.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('timeline_events', function (Blueprint $table) {
            $table->string('subjek')->nullable()->after('instansi');
            $table->string('lokasi_daerah')->nullable()->after('subjek');

            // Filter toolbar bisa mengombinasikan subjek dan lokasi, jadi
            // indeksnya disiapkan untuk pasangan tersebut.
            $table->index(['subjek', 'lokasi_daerah']);
        });
    }

    public function down(): void
    {
        Schema::table('timeline_events', function (Blueprint $table) {
            $table->dropIndex(['subjek', 'lokasi_daerah']);
            $table->dropColumn(['subjek', 'lokasi_daerah']);
        });
    }
};
