<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('password');
            $table->timestamp('dop')->nullable()->comment('Date of Purchase - penanda awal langganan');
            $table->timestamps(); // Otomatis membuat created_at dan updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};