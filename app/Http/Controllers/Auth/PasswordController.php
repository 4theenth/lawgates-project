<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     *
     * Akun yang hanya masuk lewat Google tidak punya kata sandi lokal, jadi
     * tidak ada "password saat ini" yang bisa diverifikasi. Untuk akun seperti
     * itu field tersebut tidak diminta dan pengguna langsung menetapkan kata
     * sandi barunya — kata sandi ini hanya berlaku untuk login manual, login
     * Google tetap berjalan lewat OAuth.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $hadPassword = $user->has_password;

        $validated = $request->validate([
            'current_password' => $hadPassword
                ? ['required', 'current_password']
                : ['nullable'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ], [
            'current_password.required' => 'Password saat ini wajib diisi.',
            'current_password.current_password' => 'Password saat ini tidak cocok.',
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', $hadPassword
            ? 'Kata sandi berhasil diperbarui.'
            : 'Kata sandi berhasil dibuat. Sekarang Anda bisa masuk dengan email dan kata sandi ini.');
    }
}
