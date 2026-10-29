<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerifyEmailController extends Controller
{
    /**
     * Tandai email pemilik tautan bertanda tangan sebagai terverifikasi.
     *
     * User id + hash diambil dari URL, bukan dari sesi, karena akun yang belum
     * terverifikasi memang tidak punya sesi login. Keabsahan tautan dijamin
     * middleware `signed` + pencocokan hash email.
     *
     * Setelah verifikasi berhasil, pemilik tautan langsung dibuatkan sesi
     * login. Tautan bertanda tangan hanya dikirim ke email pemilik akun, jadi
     * membukanya sudah membuktikan kepemilikan email dan password tidak perlu
     * diketik ulang.
     */
    public function __invoke(Request $request, int $id, string $hash): RedirectResponse
    {
        $user = User::find($id);

        abort_unless(
            $user && hash_equals((string) $hash, sha1($user->getEmailForVerification())),
            403,
            'Tautan verifikasi tidak valid.'
        );

        if (! $user->hasVerifiedEmail()) {
            if ($user->markEmailAsVerified()) {
                event(new Verified($user));
            }
        }

        // Belum login, atau masih login sebagai akun lain: ganti sesi ke akun
        // pemilik tautan. `regenerate()` mencegah session fixation.
        if (Auth::id() !== $user->id) {
            Auth::login($user);
            $request->session()->regenerate();
        }

        return redirect()->intended(route('home'))
            ->with('success', 'Email berhasil diverifikasi. Anda sudah masuk ke akun Anda.');
    }
}