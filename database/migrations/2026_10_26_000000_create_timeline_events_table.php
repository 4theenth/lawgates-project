<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Event regulasi yang sudah didenormalisasi untuk timeline (REG-04).
     *
     * Timeline membaca "peraturan terbit/dicabut sepanjang waktu" dalam jumlah
     * besar dan selalu terurut, jadi versi denormalisasi ini menggantikan JOIN
     * ke `peraturan` + `status_peraturan` + `jenis_peraturan` di setiap request.
     *
     * Satu baris `peraturan` menghasilkan dua baris di sini (terbit + dicabut)
     * dengan `event_date` berbeda, sehingga pembacaan linier per rentang tanggal
     * cukup satu indeks. `regulation_id` sengaja BUKAN foreign key dengan cascade
     * karena event harus tetap ada walau peraturan di-soft-delete: timeline
     * historis tidak boleh berubah hanya karena data master dibersihkan.
     */
    public function up(): void
    {
        Schema::create('timeline_events', function (Blueprint $table) {
            $table->id();

            // Tanpa constrained(): lihat alasan di docblock.
            $table->unsignedBigInteger('regulation_id');
            $table->string('regulation_unique_id', 64)->nullable();

            // 'terbit' | 'dicabut'
            $table->string('event_type', 16);
            $table->date('event_date');

            // Salinan dari jenis_peraturan.kode (UU, PP, Perpres, Perda, ...).
            // Disalin, bukan di-JOIN, supaya filter jenis peraturan tidak
            // memaksa kembali ke tabel master.
            $table->string('regulation_type', 32);
            $table->string('instansi')->nullable();

            $table->timestamps();

            // Tiga indeks sesuai AC. `event_date` berdiri sendiri karena
            // pemakaian utamanya adalah rentang tanggal tanpa filter lain.
            $table->index('event_date', 'timeline_events_date_idx');
            $table->index('event_type', 'timeline_events_type_idx');
            $table->index('regulation_type', 'timeline_events_regtype_idx');

            // Kombinasi yang nyata dipakai endpoint: rentang tanggal + jenis.
            $table->index(['event_date', 'regulation_type'], 'timeline_events_date_regtype_idx');

            // Idempotensi: membangun ulang tidak boleh menggandakan event.
            // Satu peraturan hanya boleh punya satu event per jenis per tanggal.
            $table->unique(
                ['regulation_id', 'event_type', 'event_date'],
                'timeline_events_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timeline_events');
    }
};
