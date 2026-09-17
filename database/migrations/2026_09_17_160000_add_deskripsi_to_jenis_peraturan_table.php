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
            if (!Schema::hasColumn('jenis_peraturan', 'deskripsi')) {
                $table->text('deskripsi')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jenis_peraturan', function (Blueprint $table) {
            if (Schema::hasColumn('jenis_peraturan', 'deskripsi')) {
                $table->dropColumn('deskripsi');
            }
        });
    }
};
