<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Foreign keys sudah memakai ON DELETE CASCADE, tetapi kolom anaknya tidak
     * diindeks. Akibatnya setiap hapus/insert pasal memicu sequential scan ke
     * seluruh tabel (import satu Perpu bisa >50 detik). Index ini membuat
     * operasi import dan pencarian relasi memakai index.
     */
    public function up(): void
    {
        Schema::table('pasal', function (Blueprint $table) {
            $table->index('parent_pasal_id', 'pasal_parent_pasal_id_index');
            $table->index('struktur_id', 'pasal_struktur_id_index');
        });

        Schema::table('penjelasan_pasal', function (Blueprint $table) {
            $table->index('peraturan_id', 'penjelasan_pasal_peraturan_id_index');
            $table->index('pasal_id', 'penjelasan_pasal_pasal_id_index');
        });

        Schema::table('pasal_perubahan', function (Blueprint $table) {
            $table->index('target_peraturan_id', 'pasal_perubahan_target_peraturan_id_index');
            $table->index('target_pasal_id', 'pasal_perubahan_target_pasal_id_index');
            $table->index(
                ['pasal_romawi_id', 'target_peraturan_id', 'target_nomor_pasal'],
                'pasal_perubahan_lookup_index'
            );
        });

        Schema::table('struktur_dokumen', function (Blueprint $table) {
            $table->index('peraturan_id', 'struktur_dokumen_peraturan_id_index');
            $table->index('parent_id', 'struktur_dokumen_parent_id_index');
        });

        Schema::table('law_relations', function (Blueprint $table) {
            $table->unique(
                ['from_peraturan_id', 'to_peraturan_id', 'relation_type_id'],
                'law_relations_unique_combo'
            );
        });
    }

    public function down(): void
    {
        Schema::table('law_relations', function (Blueprint $table) {
            $table->dropUnique('law_relations_unique_combo');
        });

        Schema::table('struktur_dokumen', function (Blueprint $table) {
            $table->dropIndex('struktur_dokumen_parent_id_index');
            $table->dropIndex('struktur_dokumen_peraturan_id_index');
        });

        Schema::table('pasal_perubahan', function (Blueprint $table) {
            $table->dropIndex('pasal_perubahan_lookup_index');
            $table->dropIndex('pasal_perubahan_target_pasal_id_index');
            $table->dropIndex('pasal_perubahan_target_peraturan_id_index');
        });

        Schema::table('penjelasan_pasal', function (Blueprint $table) {
            $table->dropIndex('penjelasan_pasal_pasal_id_index');
            $table->dropIndex('penjelasan_pasal_peraturan_id_index');
        });

        Schema::table('pasal', function (Blueprint $table) {
            $table->dropIndex('pasal_struktur_id_index');
            $table->dropIndex('pasal_parent_pasal_id_index');
        });
    }
};
