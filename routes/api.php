<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\PeraturanController;
use App\Models\JenisPeraturan; // Tambahan untuk referensi
use App\Models\Status;         // Tambahan untuk referensi
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BookmarkController;
use App\Http\Controllers\Api\TimelineController;

// =================================================================
// Route Publik (Tanpa Token Auth)
// =================================================================
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:30,1');
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:30,1');
Route::get('/regions', [\App\Http\Controllers\Api\RegionController::class, 'index']);
Route::get('/regions/statistics', [\App\Http\Controllers\Api\RegionController::class, 'statistics']);
Route::get('/regions/{provinceSlug}/regencies', [\App\Http\Controllers\Api\RegionController::class, 'regenciesByProvince']);

// Timeline regulasi publik — dipakai halaman /regulasi yang bisa dibuka tanpa
// login, jadi sengaja berada di luar grup auth:sanctum bersama route /regions.
Route::get('/timeline/events', [TimelineController::class, 'events'])->middleware('throttle:60,1');
Route::get('/timeline/frequency', [TimelineController::class, 'frequency'])->middleware('throttle:60,1');


// =================================================================
// Data akun sendiri — di luar gate verifikasi.
//
// Klien REST butuh satu endpoint untuk tahu siapa dirinya dan apakah
// emailnya sudah terverifikasi; tanpa ini akun yang belum verifikasi
// tidak punya cara apa pun untuk membaca statusnya sendiri.
// =================================================================
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});


// =================================================================
// Route yang Membutuhkan Autentikasi (Token Sanctum) + Verifikasi Email
//
// `verified.or.admin` menyamakan API dengan web: akun manual yang belum
// memverifikasi email ditolak 403, admin/superadmin dilewatkan. Tanpa ini
// POST /register di atas bisa dipakai membuat akun lalu langsung memakai
// seluruh API tanpa pernah membuktikan kepemilikan emailnya.
// =================================================================
Route::middleware(['auth:sanctum', 'verified.or.admin'])->group(function () {
    // Categorized Regulation Statistics & Listing
    Route::get('/regulations/categories/stats', [PeraturanController::class, 'categoryStats']);
    Route::get('/regulations', [PeraturanController::class, 'index']);

    // Pencarian & Peraturan Data
    Route::get('/search', [SearchController::class, 'search']);
    Route::get('/peraturan/compare', [\App\Http\Controllers\Api\ComparisonController::class, 'compare']);
    Route::get('/peraturan/{unique_id}/lineage', [\App\Http\Controllers\Api\ComparisonController::class, 'getLineage']);
    Route::get('/peraturan/{unique_id}', [PeraturanController::class, 'show']);
    Route::get('/peraturan/{id}/graph', [\App\Http\Controllers\Api\GraphController::class, 'show']);

    // Referensi & Kategori Hukum
    Route::get('/kategori-hukum/all', [\App\Http\Controllers\Api\KategoriHukumController::class, 'getAllKategori']);
    Route::get('/referensi-filter', [PeraturanController::class, 'referensiFilter']);

    // Bookmark & folder koleksi. Terbuka untuk user biasa; admin tidak memakainya
    // (tombol simpan disembunyikan di UI) sehingga route-nya tidak dimasukkan ke
    // grup role:admin di bawah.
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::post('/bookmarks/toggle', [BookmarkController::class, 'toggle']);
    Route::put('/bookmarks/assign-collections', [BookmarkController::class, 'assignCollections']);

    Route::get('/bookmark-collections', [BookmarkController::class, 'collections']);
    Route::post('/bookmark-collections', [BookmarkController::class, 'storeCollection']);
    Route::put('/bookmark-collections/{collection}', [BookmarkController::class, 'updateCollection']);
    Route::delete('/bookmark-collections/{collection}', [BookmarkController::class, 'destroyCollection']);

    // Khusus Admin & Superadmin
    Route::middleware('role:superadmin,admin')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/peraturan', [PeraturanController::class, 'store']);
        Route::get('/admin/minio/files/{filename?}', [\App\Http\Controllers\Admin\DokumenHukumController::class, 'getMinioFileContent'])->where('filename', '.*');
        Route::post('/admin/import/manual', [\App\Http\Controllers\Admin\DokumenHukumController::class, 'importManual']);
    });

    // Khusus Superadmin
    Route::middleware('role:superadmin')->group(function () {
        Route::post('/users/create-admin', [AuthController::class, 'createAdmin']);
    });
});