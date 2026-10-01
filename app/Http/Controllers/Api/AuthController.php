<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validasi input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // 2. Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // 3. Cek apakah user ada dan password cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        // 4. Buat token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. Kembalikan respons beserta role-nya
        return response()->json([
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role // Role dikirim ke frontend
            ]
        ]);
    }

    public function register(Request $request)
    {
        // 1. Validasi input dari pengguna baru
        $request->validate([
            'username' => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone'    => 'required|string'
        ]);

        // 2. Simpan user baru ke database
        $user = User::create([
            'username'      => $request->username,
            'email'         => $request->email,
            'password'      => Hash::make($request->password), // Wajib di-hash
            'phone'         => $request->phone,
            'auth_provider' => 'manual', // Sesuai dengan check constraint database-mu
            'role'          => 'user'    // Default pendaftar baru adalah 'user' biasa
        ]);

        // 3. (Opsional) Langsung buatkan token agar user otomatis login setelah daftar
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'Registrasi berhasil',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => [
                'id'       => $user->id,
                'username' => $user->username,
                'email'    => $user->email,
                'role'     => $user->role
            ]
        ], 201);
    }

    public function createAdmin(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone'    => 'required|string',
            'role'     => 'required|in:admin,superadmin' // Hanya boleh diisi admin/superadmin
        ]);

        $user = User::create([
            'username'      => $request->username,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'phone'         => $request->phone,
            'auth_provider' => 'manual',
            'role'          => $request->role // Mengambil role dari input
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Akun ' . $request->role . ' berhasil dibuat',
            'data'    => $user
        ], 201);
    }
}