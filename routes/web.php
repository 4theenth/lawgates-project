<?php

use App\Http\Controllers\ProfileController;
use App\Models\Peraturan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\PeraturanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Route Testing Murni Backend (Merender file Blade)
Route::get('/test-peraturan/{id}', function ($id) {
    $peraturan = Peraturan::with(['pasal' => function ($query) {
        $query->orderBy('urutan', 'asc');
    }])->findOrFail($id);

    return view('test-peraturan', compact('peraturan'));
});

/*
|--------------------------------------------------------------------------
| Frontend Routes (Merender komponen React via Inertia)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/pencarian', function () {
    return Inertia::render('Pencarian');
});

Route::get('/bandingkan', function () {
    return Inertia::render('Bandingkan');
});

Route::get('/peraturan/{unique_id}', [PeraturanController::class, 'show']);

// Referensi filter
Route::get('/api/referensi-filter', [PeraturanController::class, 'referensiFilter']);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::get('/dokumen-hukum', function () {
        return Inertia::render('Admin/DokumenHukum/Index');
    })->name('admin.dokumen-hukum');

    Route::get('/dokumen-hukum/tambah', function () {
        return Inertia::render('Admin/DokumenHukum/Create');
    })->name('admin.dokumen-hukum.tambah');
});

/*
|--------------------------------------------------------------------------
| Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
