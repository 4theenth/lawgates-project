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
        if ($request->filled('redirect')) {
            session()->put('url.intended', $request->query('redirect'));
        }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'redirect' => $request->query('redirect') ?? session()->get('url.intended'),
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
        if (!empty($redirect)) {
            session()->put('url.intended', $redirect);
        }

        $user = Auth::user();
        if ($user && in_array($user->role, ['admin', 'superadmin'])) {
            return redirect()->intended(route('admin.dashboard'))->with('success', 'Berhasil masuk ke dashboard Admin');
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
