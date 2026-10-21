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
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 10)->nullable()->index();
            $table->string('nama', 100);
            $table->string('slug', 100)->unique();
            $table->timestamps();
        });

        Schema::create('regencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->constrained('provinces')->cascadeOnDelete();
            $table->string('kode', 20)->nullable()->index();
            $table->string('nama', 150);
            $table->enum('tipe', ['Kabupaten', 'Kota'])->default('Kabupaten');
            $table->string('slug', 150);
            $table->timestamps();

            $table->index(['province_id', 'nama']);
            $table->index(['slug']);
            $table->index(['tipe']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regencies');
        Schema::dropIfExists('provinces');
    }
};
