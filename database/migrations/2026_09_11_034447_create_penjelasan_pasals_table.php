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
    Schema::create('penjelasan_pasal', function (Blueprint $table) {
        $table->id();
        $table->foreignId('peraturan_id')->constrained('peraturan')->cascadeOnDelete();
        $table->foreignId('pasal_id')->constrained('pasal')->cascadeOnDelete();
        
        $table->text('isi_penjelasan');
        $table->json('embedding', 1536)->nullable();
        
        $table->timestamps();
        $table->foreignId('updated_by')->nullable()->constrained('admins')->nullOnDelete();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penjelasan_pasals');
    }
};
