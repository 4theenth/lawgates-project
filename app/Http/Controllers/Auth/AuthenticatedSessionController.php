<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Concerns\SanitizesIntendedRedirect;
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
    use SanitizesIntendedRedirect;

    /**
     * Display the login view.
     */
    public function create(Request $request): Response
    {
        $redirect = $this->safeIntended($request->query('redirect'));
        if ($redirect) {
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
            'redirect' => $redirect ?? $intended,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $redirect = $this->safeIntended($request->input('redirect') ?: $request->query('redirect'));
        // Perbarui url.intended hanya bila redirect valid. Jangan dihapus saat
        // kosong: intended yang sudah ada (mis. diisi middleware auth saat user
        // ditolak dari halaman /pencarian) harus tetap dipakai.
        if ($redirect) {
            session()->put('url.intended', $redirect);
        }

        $user = Auth::user();

        // Akun manual yang belum memverifikasi email diarahkan ke halaman
        // pemberitahuan verifikasi. Admin dikecualikan agar panel admin tidak
        // bisa terkunci (konsisten dengan middleware 'verified.or.admin').
        //
        // Catatan merge: versi origin/dev justru memaksa `email_verified_at`
        // terisi di sini. Itu membatalkan gerbang verifikasi, jadi tidak dipakai.
        if ($user && ! in_array($user->role, ['admin', 'superadmin'], true) && ! $user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        if ($user && in_array($user->role, ['admin', 'superadmin'])) {
            $intended = session()->get('url.intended');

            // Rute admin internal -> lanjut ke sana.
            if ($intended && (str_starts_with($intended, '/admin') || str_contains($intended, url('/admin')))) {
                return redirect()->intended(route('admin.dashboard'))->with('success', 'Berhasil masuk ke dashboard Admin');
            }

            // Tujuan publik yang jelas (mis. /pencarian?keyword=...) dihormati
            // agar filter yang dipilih sebelum login tidak hilang.
            if ($intended) {
                session()->forget('url.intended');
                return redirect($intended)->with('success', 'Berhasil masuk ke akun Anda');
            }

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
