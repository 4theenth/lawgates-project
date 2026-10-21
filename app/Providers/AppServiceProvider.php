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
        // enforceMorphMap membuat penulisan alias yang tidak terdaftar langsung
        // gagal, alih-alih diam-diam menyimpan nilai yang tidak dikenal.
        Relation::enforceMorphMap([
            'peraturan' => \App\Models\Peraturan::class,
            // 'putusan' => \App\Models\CourtDecision::class,
        ]);
    }
}
