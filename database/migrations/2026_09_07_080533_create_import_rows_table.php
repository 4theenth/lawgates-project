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
    Schema::create('import_rows', function (Blueprint $table) {
        $table->id();
        $table->foreignId('import_batch_id')->constrained('import_batches')->cascadeOnDelete();
        $table->text('raw_data'); 
        $table->enum('validation_status', ['valid', 'needs_review', 'duplicate', 'error']);
        $table->text('error_message')->nullable();
        $table->foreignId('matched_peraturan_id')->nullable()->constrained('peraturan')->nullOnDelete();
        $table->foreignId('reviewed_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->timestamp('created_at')->useCurrent();
    });
}
public function down(): void { Schema::dropIfExists('import_rows'); }
};
