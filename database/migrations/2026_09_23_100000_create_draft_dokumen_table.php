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
        Schema::create('draft_dokumen', function (Blueprint $table) {
            $table->id();
            $table->string('nama_draft');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('autor')->default('Admin');
            $table->integer('jumlah_file')->default(0);
            $table->json('files_data')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draft_dokumen');
    }
};
