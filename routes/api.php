<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\PeraturanController; // Tambahkan di atas

// Route Publik (Tanpa Login)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/search', [SearchController::class, 'search']); 
Route::get('/peraturan/{unique_id}', [PeraturanController::class, 'show']); // Tambahkan ini

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
        // Route::post('/peraturan', [PeraturanController::class, 'store']);
        // Route::put('/peraturan/{id}', [PeraturanController::class, 'update']);
    });

    // Khusus Superadmin saja (Misal: untuk hapus data permanen / atur user)
    Route::middleware('role:superadmin')->group(function () {
        // Route::delete('/peraturan/{id}', [PeraturanController::class, 'destroy']);
    });

    // Rute yang HANYA bisa diakses oleh Superadmin
    Route::middleware('role:superadmin')->group(function () {
        Route::post('/users/create-admin', [AuthController::class, 'createAdmin']);
    });

});