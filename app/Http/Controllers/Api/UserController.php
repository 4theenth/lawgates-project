<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User; 
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Pastikan hanya role superadmin atau admin yang dapat mengakses
        if (!$request->user() || !in_array($request->user()->role, ['superadmin', 'admin'])) {
            return response()->json([
                'message' => 'Forbidden. Akses ditolak untuk role Anda.'
            ], 403);
        }

        // Mengambil semua data pengguna
        // Catatan: Pastikan kolom password sudah disembunyikan di properti $hidden pada Model User
        $users = User::all();

        return response()->json([
            'success' => true,
            'message' => 'Daftar pengguna berhasil diambil',
            'data'    => $users
        ], 200);
    }
}