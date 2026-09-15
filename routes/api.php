<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\PeraturanController;
use App\Models\JenisPeraturan; // Tambahan untuk referensi
use App\Models\Status;         // Tambahan untuk referensi
use App\Http\Controllers\Api\UserController;

// Route Publik (Tanpa Login)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/search', [SearchController::class, 'search']); 
Route::get('/peraturan/{unique_id}', [PeraturanController::class, 'show']);

// Route Baru: Mengambil data referensi untuk Dropdown di Frontend
Route::get('/referensi-filter', function () {
    return response()->json([
        'kategori' => JenisPeraturan::select('id', 'nama_jenis as nama')->get(), // Pastikan 'nama_jenis' sesuai nama kolommu
        'status' => Status::select('id', 'nama_status as nama')->get(),          // Pastikan 'nama_status' sesuai nama kolommu
    ]);
});

// =================================================================
// Route yang butuh Login (Token Sanctum)
// =================================================================
Route::middleware('auth:sanctum')->group(function () {

    Route::middleware('role:superadmin,admin')->group(function () {
        Route::post('/peraturan', [PeraturanController::class, 'store']);
    });
    
    // Cek informasi diri sendiri (bisa diakses semua role)
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // Khusus Superadmin & Admin (Misal: untuk tambah data)
    Route::middleware('role:superadmin,admin')->group(function () {
        // Route::put('/peraturan/{id}', [PeraturanController::class, 'update']);
    });

    // Khusus Superadmin saja (Misal: untuk hapus data permanen / atur user)
    Route::middleware('role:superadmin')->group(function () {
        // Route::delete('/peraturan/{id}', [PeraturanController::class, 'destroy']);
        Route::post('/users/create-admin', [AuthController::class, 'createAdmin']);
    });

    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
});

});