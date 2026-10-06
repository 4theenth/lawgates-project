<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
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

        // 2. Throttle key berdasarkan email dan IP
        $throttleKey = Str::transliterate(Str::lower($request->input('email')) . '|' . $request->ip());

        // 3. Cek apakah akun sedang terkunci karena terlalu banyak percobaan gagal (max 5 kali)
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            $minutes = (int) ceil($seconds / 60);

            return response()->json([
                'message' => "Akun terkunci sementara karena 5 kali kesalahan percobaan login. Silakan coba lagi dalam {$minutes} menit.",
                'retry_after_seconds' => $seconds,
                'retry_after_minutes' => $minutes
            ], 429);
        }

        // 4. Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // 5. Cek apakah user ada dan password cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            // Catat percobahaan gagal dengan waktu kunci 15 menit (900 detik)
            RateLimiter::hit($throttleKey, 900);

            $attemptsLeft = RateLimiter::remaining($throttleKey, 5);

            $message = 'Email atau password salah';
            if ($attemptsLeft > 0) {
                $message .= ". Sisa percobaan login: {$attemptsLeft}.";
            } else {
                $message = 'Akun Anda telah terkunci selama 15 menit karena 5 kali kesalahan percobaan login.';
            }

            return response()->json([
                'message' => $message,
                'remaining_attempts' => $attemptsLeft
            ], 401);
        }

        // 6. Apabila login berhasil, bersihkan counter rate limiter
        RateLimiter::clear($throttleKey);

        // 7. Buat token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // 8. Kembalikan respons beserta data user & role
        return response()->json([
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role
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