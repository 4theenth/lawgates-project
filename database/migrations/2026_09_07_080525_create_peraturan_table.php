<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('peraturan', function (Blueprint $table) {
        $table->id();
        $table->string('unique_id')->unique();
        $table->foreignId('jenis_peraturan_id')->constrained('jenis_peraturan')->cascadeOnDelete();
        $table->string('nomor')->nullable();
        $table->integer('tahun');
        $table->text('judul');
        $table->foreignId('status_id')->constrained('status_peraturan')->cascadeOnDelete();
        
        $table->string('tempat_penetapan')->nullable();
        $table->date('tanggal_penetapan')->nullable();
        $table->date('tanggal_pengundangan')->nullable();
        $table->date('tanggal_berlaku')->nullable();
        
        $table->string('instansi')->nullable();
        $table->string('url_detail')->nullable();
        $table->string('url_pdf')->nullable();
        
        $table->json('embedding', 1536)->nullable();

        $table->timestamps();
        $table->softDeletes();
        $table->foreignId('created_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->foreignId('updated_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->foreignId('deleted_by')->nullable()->constrained('admins')->nullOnDelete();

        $table->unique(['jenis_peraturan_id', 'nomor', 'tahun'], 'peraturan_jenis_nomor_tahun_unique');
        $table->index('status_id');
        $table->index('tahun');
    });
}
public function down(): void { Schema::dropIfExists('peraturan'); }
};
