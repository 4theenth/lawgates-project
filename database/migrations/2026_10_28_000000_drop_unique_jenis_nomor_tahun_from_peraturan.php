<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Perda dari daerah berbeda sah memiliki nomor dan tahun yang sama,
        // sehingga kombinasi ini tidak bisa dijadikan unique. `unique_id` tetap unik.
        Schema::table('peraturan', function (Blueprint $table) {
            $table->dropUnique('peraturan_jenis_nomor_tahun_unique');
            $table->index(
                ['jenis_peraturan_id', 'nomor', 'tahun', 'instansi'],
                'peraturan_jenis_nomor_tahun_instansi_index'
            );
        });
    }

    public function down(): void
    {
        Schema::table('peraturan', function (Blueprint $table) {
            $table->dropIndex('peraturan_jenis_nomor_tahun_instansi_index');
        });

        // Unique lama hanya bisa dipasang ulang bila datanya masih memenuhi.
        // Setelah Perda lintas daerah masuk, nomor+tahun sah berulang dan rollback
        // akan menggagalkan seluruh migrasi di tengah jalan.
        $hasDuplicates = DB::table('peraturan')
            ->whereNotNull('nomor')
            ->selectRaw('1')
            ->groupBy('jenis_peraturan_id', 'nomor', 'tahun')
            ->havingRaw('count(*) > 1')
            ->exists();

        if ($hasDuplicates) {
            return;
        }

        Schema::table('peraturan', function (Blueprint $table) {
            $table->unique(
                ['jenis_peraturan_id', 'nomor', 'tahun'],
                'peraturan_jenis_nomor_tahun_unique'
            );
        });
    }
};