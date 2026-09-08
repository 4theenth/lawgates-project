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
    Schema::create('pasal', function (Blueprint $table) {
        $table->id();
        $table->foreignId('peraturan_id')->constrained('peraturan')->cascadeOnDelete();
        $table->string('nomor_pasal');
        $table->text('isi_pasal')->nullable();
        $table->integer('urutan');
        $table->json('embedding', 1536)->nullable();
        
        $table->timestamps();
        $table->foreignId('updated_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->index('peraturan_id');
    });
}
public function down(): void { Schema::dropIfExists('pasal'); }
};
