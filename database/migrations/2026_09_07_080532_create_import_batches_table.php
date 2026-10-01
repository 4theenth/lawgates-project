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
    Schema::create('import_batches', function (Blueprint $table) {
        $table->id();
        $table->string('nama_file');
        $table->string('tipe_data')->default('peraturan');
        $table->integer('total_rows');
        $table->enum('status', ['processing', 'review_needed', 'completed', 'failed']);
        $table->foreignId('uploaded_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->timestamp('created_at')->useCurrent();
    });
}
public function down(): void { Schema::dropIfExists('import_batches'); }
};
