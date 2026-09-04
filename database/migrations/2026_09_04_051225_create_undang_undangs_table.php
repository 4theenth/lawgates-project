<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('undang_undangs', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke tabel Master
            $table->foreignId('unique_code_id')->constrained('unique_codes')->onDelete('cascade');
            
            $table->string('nomor');
            $table->integer('tahun');
            $table->text('judul');
            
            $table->foreignId('status_id')->constrained('master_statuses')->onDelete('cascade');
            
            // Metadata Tambahan dari OCR
            $table->string('tempat_penetapan')->nullable();
            $table->date('tanggal_penetapan')->nullable();
            $table->date('tanggal_pengundangan')->nullable();
            $table->date('tanggal_berlaku')->nullable();
            
            $table->string('instansi')->nullable();
            $table->string('url_detail')->nullable();
            $table->string('url_pdf')->nullable();
            
            // Audit Trail & Soft Deletes
            $table->timestamps();
            $table->softDeletes(); // Membuat kolom deleted_at otomatis
            
            $table->foreignId('created_by')->nullable()->constrained('admins')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('admins')->nullOnDelete();
            $table->foreignId('deleted_by')->nullable()->constrained('admins')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('undang_undangs');
    }
};
