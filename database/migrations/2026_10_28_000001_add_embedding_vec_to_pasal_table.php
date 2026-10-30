<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            // Cek apakah kolom embedding_vec sudah ada
            $hasCol = DB::select("
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'pasal' AND column_name = 'embedding_vec'
            ");

            if (empty($hasCol)) {
                DB::statement('ALTER TABLE pasal ADD COLUMN embedding_vec float8[]');
                DB::statement("UPDATE pasal SET embedding_vec = translate(embedding::text, '[]', '{}')::float8[] WHERE embedding IS NOT NULL");
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            if (Schema::hasColumn('pasal', 'embedding_vec')) {
                DB::statement('ALTER TABLE pasal DROP COLUMN IF EXISTS embedding_vec');
            }
        }
    }
};
