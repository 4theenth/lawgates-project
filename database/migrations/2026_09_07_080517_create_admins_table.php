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
    Schema::create('admins', function (Blueprint $table) {
        $table->id();
        $table->string('username');
        $table->string('email')->unique();
        $table->string('password');
        $table->enum('role', ['admin', 'super_admin']);
        $table->boolean('is_active')->default(true);
        $table->foreignId('invited_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->foreignId('deactivated_by')->nullable()->constrained('admins')->nullOnDelete();
        $table->timestamp('deactivated_at')->nullable();
        $table->timestamps();
        $table->index('role');
    });
}
public function down(): void { Schema::dropIfExists('admins'); }
};
