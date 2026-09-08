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
    Schema::create('subscriptions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
        $table->enum('plan', ['bulanan', 'tahunan']);
        $table->enum('status', ['active', 'expired', 'cancelled', 'pending_payment']);
        $table->string('payment_method')->nullable();
        $table->string('payment_ref')->nullable();
        $table->timestamp('start_date')->nullable();
        $table->timestamp('end_date')->nullable();
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('subscriptions'); }
};
