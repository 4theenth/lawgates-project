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
    Schema::create('user_regulation_access', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
        $table->foreignId('peraturan_id')->constrained('peraturan')->cascadeOnDelete();
        $table->timestamp('accessed_at')->useCurrent();
    });
}
public function down(): void { Schema::dropIfExists('user_regulation_access'); }
};
