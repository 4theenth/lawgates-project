<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     *
     * Pengguna yang emailnya sudah terverifikasi tidak perlu melihat halaman
     * ini lagi, jadi langsung dilempar ke beranda. `route('home')` dipakai
     * sebagai tujuan karena halaman ini bisa dibuka tanpa pernah mengunjungi
     * dashboard terlebih dahulu — `intended()` hanya berguna kalau sebelumnya
     * ada request yang tertahan middleware.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->route('home')
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
