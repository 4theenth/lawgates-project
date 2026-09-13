<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('struktur_dokumen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('peraturan_id')->constrained('peraturan')->cascadeOnDelete();
            $table->string('tipe_struktur'); // Contoh: BAB, BAGIAN, PARAGRAF
            $table->string('label');         // Contoh: BAB III, Bagian Kesatu
            
            // Mengubah tipe string() menjadi text() agar bisa menampung ribuan karakter
            $table->text('judul_struktur')->nullable(); 
            
            $table->foreignId('parent_id')->nullable()->constrained('struktur_dokumen')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('struktur_dokumen');
    }
};