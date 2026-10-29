<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'email' => (string) $request->query('email', ''),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $throttleKey = 'password-reset-request:' . Str::lower($request->email);

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            $hours = ceil($seconds / 3600);
            throw ValidationException::withMessages([
                'email' => ["Anda telah mencapai batas maksimal 5 kali permintaan reset kata sandi per hari. Silakan coba lagi dalam {$hours} jam."],
            ]);
        }

        // Akun yang login lewat Google tidak punya kata sandi lokal,
        // jadi link reset tidak ada gunanya dan hanya membingungkan pengguna.
        $googleUser = User::where('email', $request->email)
            ->where('auth_provider', 'google')
            ->exists();

        if ($googleUser) {
            throw ValidationException::withMessages([
                'email' => ['Akun ini terhubung dengan Google. Silakan masuk menggunakan tombol Login dengan Google.'],
            ]);
        }

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            RateLimiter::hit($throttleKey, 86400);

            return back()->with('status', 'Kami telah mengirimkan link reset kata sandi ke email Anda.');
        }

        if ($status === Password::INVALID_USER) {
            throw ValidationException::withMessages([
                'email' => ['Email tidak terdaftar'],
            ]);
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
