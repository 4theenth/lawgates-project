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
    Schema::create('pasal_perubahan', function (Blueprint $table) {
        $table->id();
        $table->foreignId('pasal_romawi_id')->constrained('pasal')->cascadeOnDelete();
        $table->integer('nomor_urut');
        $table->foreignId('perubahan_type_id')->constrained('perubahan_types')->cascadeOnDelete();
        $table->foreignId('target_peraturan_id')->constrained('peraturan')->cascadeOnDelete();
        
        $table->string('target_nomor_pasal')->nullable();
        $table->text('isi_perubahan');
        
        $table->foreignId('target_pasal_id')->nullable()->constrained('pasal')->nullOnDelete();
        
        $table->json('embedding', 1536)->nullable();
        
        $table->timestamps();
        $table->softDeletes();
        $table->foreignId('created_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->foreignId('updated_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->foreignId('deleted_by')->nullable()->constrained('admins')->nullOnDelete();
    });
}
public function down(): void { Schema::dropIfExists('pasal_perubahan'); }
};
