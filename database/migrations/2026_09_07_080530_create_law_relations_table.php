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
    Schema::create('law_relations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('from_peraturan_id')->constrained('peraturan')->cascadeOnDelete();
        $table->foreignId('relation_type_id')->constrained('relation_types')->cascadeOnDelete();
        $table->foreignId('to_peraturan_id')->constrained('peraturan')->cascadeOnDelete();
        $table->string('keterangan')->nullable();
        
        $table->timestamps();
        $table->softDeletes();
        $table->foreignId('created_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->foreignId('updated_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->foreignId('deleted_by')->nullable()->constrained('admins')->nullOnDelete();
    });
}
public function down(): void { Schema::dropIfExists('law_relations'); }
};
