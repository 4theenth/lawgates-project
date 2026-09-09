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
        // Pastikan user sudah login (punya token)
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized. Silakan login terlebih dahulu.'], 401);
        }

        // Ambil role dari user yang sedang login
        $userRole = $request->user()->role;

        // Cek apakah role user tersebut ada di dalam daftar role yang diizinkan ($roles)
        if (!in_array($userRole, $roles)) {
            return response()->json([
                'message' => 'Forbidden. Akses ditolak untuk role Anda.'
            ], 403);
        }

        // Jika role sesuai, lanjutkan request ke Controller
        return $next($request);
    }
}