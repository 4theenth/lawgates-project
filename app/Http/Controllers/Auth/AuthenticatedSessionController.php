<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(Request $request): Response
    {
        $redirect = $request->query('redirect');
        if (!empty($redirect) && $redirect !== '/') {
            session()->put('url.intended', $redirect);
        }

        $intended = session()->get('url.intended');
        if ($intended === '/') {
            session()->forget('url.intended');
            $intended = null;
        }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'redirect' => (!empty($redirect) && $redirect !== '/') ? $redirect : $intended,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $redirect = $request->input('redirect') ?: $request->query('redirect');
        if (!empty($redirect) && $redirect !== '/') {
            session()->put('url.intended', $redirect);
        }

        $user = Auth::user();
        if ($user && in_array($user->role, ['admin', 'superadmin'])) {
            $intended = session()->get('url.intended');

            // Jika intended URL adalah rute admin internal, arahkan ke halaman tersebut
            if ($intended && (str_starts_with($intended, '/admin') || str_contains($intended, url('/admin')))) {
                return redirect()->intended(route('admin.dashboard'))->with('success', 'Berhasil masuk ke dashboard Admin');
            }

            // Hapus url.intended publik agar admin tidak terarah ke landing page
            session()->forget('url.intended');
            return redirect()->route('admin.dashboard')->with('success', 'Berhasil masuk ke dashboard Admin');
        }

        return redirect()->intended('/')->with('success', 'Berhasil masuk ke akun Anda');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $request->session()->flash('success', 'Berhasil keluar dari akun');

        return redirect('/');
    }
}
