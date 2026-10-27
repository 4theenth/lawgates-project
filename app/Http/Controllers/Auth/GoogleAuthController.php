<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Concerns\SanitizesIntendedRedirect;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;

class GoogleAuthController extends Controller
{
    use SanitizesIntendedRedirect;

    public function syncView(Request $request)
    {
        return Inertia::render('Auth/GoogleSync', [
            'email' => $request->query('email', 'Mangadi@gmail.com'),
        ]);
    }

    public function callback(Request $request)
    {
        $request->validate([
            'access_token' => 'required|string',
            'remember' => 'boolean'
        ]);

        $accessToken = $request->access_token;
        $remember = $request->boolean('remember', true);

        // Fetch user info from Google
        $response = Http::withToken($accessToken)
            ->when(app()->environment('local'), fn ($http) => $http->withoutVerifying())
            ->get('https://www.googleapis.com/oauth2/v3/userinfo');

        if ($response->failed()) {
            return response()->json(['message' => 'Invalid Google access token'], 401);
        }

        $googleUser = $response->json();

        // 1. Cek apakah ada alur sinkronisasi kata sandi dari registrasi manual
        $pendingEmail = session('pending_link_email');
        $pendingPassword = session('pending_link_password');

        if ($pendingEmail && $pendingPassword) {
            // Verifikasi bahwa akun Google yang dipilih cocok dengan email pendaftaran
            if (strtolower(trim($googleUser['email'])) !== strtolower(trim($pendingEmail))) {
                return Inertia::render('Auth/GoogleSync', [
                    'email' => $pendingEmail,
                    'isRegisterFlow' => true,
                    'error' => 'Akun Google yang dipilih (' . $googleUser['email'] . ') tidak cocok dengan ' . $pendingEmail,
                ]);
            }

            $user = User::where('email', $pendingEmail)->first();
            if ($user) {
                $user->update([
                    'password' => Hash::make($pendingPassword),
                    'google_id' => $user->google_id ?: $googleUser['sub'],
                ]);
            }

            session()->forget([
                'pending_link_email',
                'pending_link_password',
                'pending_link_name',
                'pending_link_phone',
            ]);

            $redirect = $this->safeIntended($request->input('redirect') ?: $request->query('redirect'));
            if ($redirect) {
                session()->put('url.intended', $redirect);
            }

            Auth::login($user, $remember);

            return $this->redirectUserByRole($user);
        }

        // 2. Alur login dengan Google
        $redirect = $this->safeIntended($request->input('redirect') ?: $request->query('redirect'));
        if ($redirect) {
            session()->put('url.intended', $redirect);
        }

        $user = User::where('email', $googleUser['email'])->first();

        if ($user) {
            // Jika akun telah ada namun belum terhubung dengan Google, minta konfirmasi sinkronisasi
            if (!$user->google_id) {
                if ($request->boolean('confirm_link')) {
                    $user->update(['google_id' => $googleUser['sub']]);
                } else {
                    return Inertia::render('Auth/GoogleSync', [
                        'email' => $user->email,
                        'accessToken' => $accessToken,
                        'remember' => $remember,
                        'isRegisterFlow' => false,
                    ]);
                }
            }
        } else {
            // Create new user
            $user = User::create([
                'username' => $googleUser['name'] ?? explode('@', $googleUser['email'])[0],
                'email' => $googleUser['email'],
                'google_id' => $googleUser['sub'],
                'auth_provider' => 'google',
                'role' => 'user',
                'password' => null,
                'email_verified_at' => now(),
            ]);

            event(new Registered($user));
        }

        if ($user && is_null($user->email_verified_at)) {
            $user->forceFill(['email_verified_at' => now()])->save();
        }

        Auth::login($user, $remember);

        return $this->redirectUserByRole($user);
    }

    /**
     * Redirect authenticated user based on role and intended URL.
     */
    private function redirectUserByRole($user)
    {
        if (in_array($user->role, ['admin', 'superadmin'])) {
            $intended = session()->get('url.intended');

            // Rute admin internal -> lanjut ke sana.
            if ($intended && (str_starts_with($intended, '/admin') || str_contains($intended, url('/admin')))) {
                return redirect()->intended(route('admin.dashboard'))->with('success', 'Berhasil masuk ke dashboard Admin');
            }

            // Tujuan publik yang jelas (mis. /pencarian?keyword=...) dihormati
            // agar filter yang dipilih sebelum login tidak hilang.
            if ($intended) {
                session()->forget('url.intended');
                return redirect($intended)->with('success', 'Berhasil masuk dengan akun Google');
            }

            return redirect()->route('admin.dashboard')->with('success', 'Berhasil masuk ke dashboard Admin');
        }

        return redirect()->intended('/')->with('success', 'Berhasil masuk dengan akun Google');
    }
}
