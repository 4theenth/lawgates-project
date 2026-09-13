<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dokumen-hukum');
    });
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dokumen-hukum');
    })->name('admin.dashboard');
    Route::get('/dokumen-hukum', function () {
        return Inertia::render('Admin/DokumenHukum/Index');
    })->name('admin.dokumen-hukum');
    Route::get('/dokumen-hukum/tambah', function () {
        return Inertia::render('Admin/DokumenHukum/Create');
    })->name('admin.dokumen-hukum.tambah');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
