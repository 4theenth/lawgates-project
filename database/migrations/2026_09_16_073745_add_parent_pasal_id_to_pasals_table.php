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
        Schema::table('pasal', function (Blueprint $table) {
            $table->unsignedBigInteger('parent_pasal_id')->nullable()->after('struktur_id');
            $table->foreign('parent_pasal_id')->references('id')->on('pasal')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pasal', function (Blueprint $table) {
            $table->dropForeign(['parent_pasal_id']);
            $table->dropColumn('parent_pasal_id');
        });
    }
};
