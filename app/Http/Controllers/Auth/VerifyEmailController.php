<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * Setelah verifikasi, pengguna langsung dilempar ke beranda — bukan ke
     * dashboard — supaya alurnya sama dengan halaman pemberitahuan verifikasi
     * (`EmailVerificationPromptController`) yang juga mengarah ke `home`.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        // `intended()` dipakai supaya tujuan yang disimpan sebelum pendaftaran
        // (mis. /pencarian?keyword=...) tidak hilang setelah verifikasi selesai.
        // Tanpa ini pengguna selalu mendarat di beranda.
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('home'));
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(route('home'));
    }
}
