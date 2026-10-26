<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Gate fitur akun dengan verifikasi email, tanpa mengunci admin.
 *
 * Berbeda dari middleware bawaan `verified` (EnsureEmailIsVerified) yang
 * memblokir siapa pun tanpa email_verified_at, middleware ini melewatkan
 * role admin/superadmin agar panel admin tidak pernah terkunci oleh akun
 * yang dibuat sebelum email_verified_at diset.
 */
class EnsureEmailIsVerifiedUnlessAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || in_array($user->role, ['admin', 'superadmin'], true)) {
            return $next($request);
        }

        if (! $user->hasVerifiedEmail()) {
            return $request->expectsJson()
                ? response()->json(['message' => 'Email belum diverifikasi.'], 403)
                : redirect()->route('verification.notice');
        }

        return $next($request);
    }
}
