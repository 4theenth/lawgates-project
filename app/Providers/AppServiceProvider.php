<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Bookmark menyimpan tipe entitas sebagai alias, bukan nama class penuh,
        // supaya class bisa di-rename tanpa merusak data yang sudah tersimpan.
        //
        // Pakai morphMap, bukan enforceMorphMap: proyek ini sudah punya relasi
        // polimorfik lain yang tipenya tidak terdaftar di sini, dan enforcement
        // membuat relasi itu gagal ("No morph map defined for model [User]").
        // Daftar ini boleh bertambah tanpa mengganggu yang sudah ada.
        Relation::morphMap([
            'peraturan' => \App\Models\Peraturan::class,
            // 'putusan' => \App\Models\CourtDecision::class,
        ]);
    }
}
