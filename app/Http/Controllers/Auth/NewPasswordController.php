<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request): Response
    {
        $token = (string) $request->route('token');
        $email = (string) ($request->query('email') ?? $request->email ?? '');

        $isExpiredOrInvalid = false;
        if ($email && $token) {
            $user = Password::broker()->getUser(['email' => $email]);
            if (! $user || ! Password::broker()->tokenExists($user, $token)) {
                $isExpiredOrInvalid = true;
            }
        }

        return Inertia::render('Auth/ResetPassword', [
            'email' => $email,
            'token' => $token,
            'isExpiredOrInvalid' => $isExpiredOrInvalid,
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $throttleKey = 'password-reset-submit:' . Str::lower($request->email);

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            $hours = ceil($seconds / 3600);
            throw ValidationException::withMessages([
                'email' => ["Anda telah mencapai batas maksimal 5 kali penggantian kata sandi per hari. Silakan coba lagi dalam {$hours} jam."],
            ]);
        }

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        if ($status == Password::PASSWORD_RESET) {
            RateLimiter::hit($throttleKey, 86400);

            return redirect()->route('login')->with('status', 'Kata sandi Anda telah berhasil diperbarui. Silakan login.');
        }

        if ($status === Password::INVALID_TOKEN) {
            throw ValidationException::withMessages([
                'email' => ['Token reset kata sandi tidak valid atau sudah kedaluwarsa (berlaku maksimal 15 menit). Silakan ajukan permintaan baru.'],
                'token' => ['invalid_or_expired'],
            ]);
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
