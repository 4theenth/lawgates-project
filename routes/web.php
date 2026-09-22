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
Route::get('/peraturan/{unique_id}/download', [PeraturanController::class, 'download']);

// Referensi filter
Route::get('/api/referensi-filter', [PeraturanController::class, 'referensiFilter']);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
use App\Http\Controllers\Admin\DokumenHukumController;
use App\Http\Controllers\Admin\KategoriHukumController;
use App\Http\Controllers\Admin\TeamController;


Route::prefix('admin')->middleware(['auth', 'role:superadmin,admin'])->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::get('/kategori-hukum', [KategoriHukumController::class, 'index'])->name('admin.kategori-hukum');
    Route::post('/kategori-hukum', [KategoriHukumController::class, 'store'])->name('admin.kategori-hukum.store');
    Route::put('/kategori-hukum/{id}', [KategoriHukumController::class, 'update'])->name('admin.kategori-hukum.update');
    Route::delete('/kategori-hukum/{id}', [KategoriHukumController::class, 'destroy'])->name('admin.kategori-hukum.destroy');

    Route::get('/dokumen-hukum', [DokumenHukumController::class, 'index'])->name('admin.dokumen-hukum');
    Route::delete('/dokumen-hukum/{unique_id}', [DokumenHukumController::class, 'destroy'])->name('admin.dokumen-hukum.destroy');
    Route::post('/dokumen-hukum/import', [DokumenHukumController::class, 'importOcr'])->name('admin.dokumen-hukum.import');
    Route::get('/dokumen-hukum/{unique_id}/detail-edit', [DokumenHukumController::class, 'getDetailForEdit'])->name('admin.dokumen-hukum.detail-edit');
    Route::put('/dokumen-hukum/{unique_id}', [DokumenHukumController::class, 'update'])->name('admin.dokumen-hukum.update');
    Route::get('/dokumen-hukum/tambah', function () {
        return Inertia::render('Admin/DokumenHukum/Create');
    })->name('admin.dokumen-hukum.tambah');

    // MinIO Sync Routes
    Route::get('/dokumen-hukum/minio/scan', [DokumenHukumController::class, 'scanMinio'])->name('admin.dokumen-hukum.minio.scan');
    Route::post('/dokumen-hukum/minio/import', [DokumenHukumController::class, 'importFromMinio'])->name('admin.dokumen-hukum.minio.import');

    // Users & Team Management Routes
    Route::get('/users/tim', [TeamController::class, 'index'])->name('admin.users.tim');
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
