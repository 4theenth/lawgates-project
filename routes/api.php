<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\PeraturanController;
use App\Models\JenisPeraturan; // Tambahan untuk referensi
use App\Models\Status;         // Tambahan untuk referensi
use App\Http\Controllers\Api\UserController;

// =================================================================
// Route Publik (Tanpa Token Auth)
// =================================================================
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:30,1');
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:30,1');
Route::get('/regions/statistics', [\App\Http\Controllers\Api\RegionController::class, 'statistics']);


// =================================================================
// Route yang Membutuhkan Autentikasi (Token Sanctum)
// =================================================================
Route::middleware('auth:sanctum')->group(function () {
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
    Route::get('/referensi-filter', function () {
        return response()->json([
            'kategori' => JenisPeraturan::select('id', 'nama')->get(),
            'status' => Status::select('id', 'nama_status as nama')->get(),
        ]);
    });

    // Cek informasi pengguna sendiri
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::get('/users', [UserController::class, 'index']);

    // Khusus Admin & Superadmin
    Route::middleware('role:superadmin,admin')->group(function () {
        Route::post('/peraturan', [PeraturanController::class, 'store']);
        Route::get('/admin/minio/files/{filename?}', [\App\Http\Controllers\Admin\DokumenHukumController::class, 'getMinioFileContent'])->where('filename', '.*');
        Route::post('/admin/import/manual', [\App\Http\Controllers\Admin\DokumenHukumController::class, 'importManual']);
    });

    // Khusus Superadmin
    Route::middleware('role:superadmin')->group(function () {
        Route::post('/users/create-admin', [AuthController::class, 'createAdmin']);
    });
});