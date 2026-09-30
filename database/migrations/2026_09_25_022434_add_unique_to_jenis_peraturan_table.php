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
        Schema::table('jenis_peraturan', function (Blueprint $table) {
            $table->unique('kode');
            $table->unique('nama');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jenis_peraturan', function (Blueprint $table) {
            $table->dropUnique(['kode']);
            $table->dropUnique(['nama']);
        });
    }
};
