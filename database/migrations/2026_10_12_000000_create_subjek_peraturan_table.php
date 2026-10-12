<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('subjek_peraturan')) {
            Schema::create('subjek_peraturan', function (Blueprint $table) {
                $table->id();
                $table->string('nama', 150)->unique();
                $table->text('deskripsi')->nullable();
                $table->timestamps();
            });
        }

        // Sinkronisasi data unik subjek yang sudah ada di tabel peraturan
        if (Schema::hasTable('peraturan') && Schema::hasColumn('peraturan', 'subjek')) {
            $existingSubjects = DB::table('peraturan')
                ->whereNotNull('subjek')
                ->where('subjek', '!=', '')
                ->distinct()
                ->pluck('subjek');

            $now = now();
            foreach ($existingSubjects as $subjek) {
                $trimmed = trim($subjek);
                if (!empty($trimmed)) {
                    DB::table('subjek_peraturan')->updateOrInsert(
                        ['nama' => $trimmed],
                        [
                            'deskripsi' => 'Dikhususkan untuk subjek ' . strtolower($trimmed),
                            'created_at' => $now,
                            'updated_at' => $now,
                        ]
                    );
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjek_peraturan');
    }
};
