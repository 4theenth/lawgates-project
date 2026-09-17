<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     * $roles adalah array role yang diizinkan, dikirim dari routes/api.php
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!$request->user()) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['message' => 'Unauthorized. Silakan login terlebih dahulu.'], 401);
            }
            return redirect()->route('login');
        }

        // Ambil role dari user yang sedang login
        $userRole = $request->user()->role;

        // Cek apakah role user tersebut ada di dalam daftar role yang diizinkan ($roles)
        if (!in_array($userRole, $roles)) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Forbidden. Akses ditolak untuk role Anda.'
                ], 403);
            }
            // User yang tidak berhak mengakses halaman ini dilempar balik ke beranda ('/')
            return redirect('/');
        }

        // Jika role sesuai, lanjutkan request ke Controller
        return $next($request);
    }
}