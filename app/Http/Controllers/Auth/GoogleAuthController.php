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

    /**
     * Halaman ini hanya untuk pengguna yang belum masuk dan perlu memutuskan
     * apakah akun Google-nya dihubungkan ke akun LawGates yang sudah ada.
     *
     * Kalau sesinya ternyata sudah terautentikasi, permintaan ini tidak punya
     * tujuan lagi — `callback` hanya dijalankan dari alur login/registrasi
     * (keduanya di middleware `guest`). Tanpa pengalihan ini halaman akan
     * merender kartu "Hubungkan Akun?" untuk orang yang sudah masuk.
     */
    public function syncView(Request $request)
    {
        if ($request->user()) {
            return redirect()->route('home');
        }

        return Inertia::render('Auth/GoogleSync', [
            'email' => (string) $request->query('email', ''),
        ]);
    }

    /**
     * Batalkan alur sinkronisasi dan bersihkan state pending.
     *
     * Tanpa ini, menekan "Batal" meninggalkan pending_link_* di session
     * sehingga login Google berikutnya masih dipengaruhi pendaftaran lama.
     */
    public function cancel(Request $request)
    {
        $request->session()->forget([
            'pending_link_email',
            'pending_link_hash',
            'pending_link_name',
            'pending_link_phone',
            'pending_link_expires_at',
        ]);

        return redirect()->route($request->boolean('is_register_flow') ? 'register' : 'login');
    }

    public function callback(Request $request)
    {
        $request->validate([
            'access_token' => 'required|string',
            'remember' => 'boolean'
        ]);

        $accessToken = $request->access_token;
        $remember = $request->boolean('remember', true);

        // Pastikan opsi verifikasi SSL menggunakan CA bundle lokal yang tersedia (mencegah cURL error 60 di Windows)
        $caBundle = base_path('vendor/google/apiclient/src/Google/IO/cacerts.pem');
        $httpOptions = [
            'verify' => file_exists($caBundle) ? $caBundle : !app()->isLocal(),
        ];

        // Fetch user info from Google
        $response = Http::withToken($accessToken)
            ->withOptions($httpOptions)
            ->get('https://www.googleapis.com/oauth2/v3/userinfo');

        if ($response->failed()) {
            return response()->json(['message' => 'Invalid Google access token'], 401);
        }

        $googleUser = $response->json();

        // Pastikan token benar-benar diterbitkan untuk aplikasi ini.
        // `userinfo` tidak mengembalikan `aud`, jadi audience dicek lewat
        // `tokeninfo`. Tanpa cek ini, access token milik aplikasi Google
        // pihak ketiga mana pun bisa dipakai untuk masuk ke akun LawGates.
        $expectedAudience = config('services.google.client_id');
        if ($expectedAudience) {
            $tokenInfo = Http::withOptions($httpOptions)
                ->get('https://www.googleapis.com/oauth2/v3/tokeninfo', ['access_token' => $accessToken]);

            if ($tokenInfo->failed() || ($tokenInfo->json('aud') !== $expectedAudience)) {
                return response()->json(['message' => 'Google token audience tidak cocok'], 401);
            }
        }

        // 1. Alur sinkronisasi kata sandi dari registrasi manual.
        $pendingEmail = session('pending_link_email');
        $pendingHash = session('pending_link_hash');
        $pendingExpiresAt = (int) session('pending_link_expires_at');

        // State pending hanya berlaku 15 menit. Tanpa batas waktu, pendaftaran
        // yang ditinggalkan (mis. tombol "Batal") masih memengaruhi login Google
        // berhari-hari kemudian: memblokir akun Google lain dengan pesan "tidak
        // cocok", atau diam-diam menimpa password akun yang emailnya sama.
        if ($pendingEmail && $pendingHash && $pendingExpiresAt > now()->timestamp) {
            // Verifikasi bahwa akun Google yang dipilih cocok dengan email pendaftaran
            if (strtolower(trim($googleUser['email'])) !== strtolower(trim($pendingEmail))) {
                return Inertia::render('Auth/GoogleSync', [
                    'email' => $pendingEmail,
                    'isRegisterFlow' => true,
                    'error' => 'Akun Google yang dipilih (' . $googleUser['email'] . ') tidak cocok dengan ' . $pendingEmail,
                ]);
            }

            $user = User::where('email', $pendingEmail)->first();

            // Akun pending bisa saja sudah dihapus (mis. oleh admin) di tengah
            // alur. Jangan lanjut: Auth::login(null) melempar TypeError dan
            // berakhir sebagai 500, bukan pesan yang bisa dibaca pengguna.
            if (! $user) {
                session()->forget([
                    'pending_link_email',
                    'pending_link_hash',
                    'pending_link_name',
                    'pending_link_phone',
                    'pending_link_expires_at',
                ]);

                return redirect()->route('login')->withErrors([
                    'email' => 'Akun untuk email tersebut sudah tidak tersedia. Silakan daftar ulang.',
                ]);
            }

            // Nama & nomor telepon yang diisi saat pendaftaran ikut disimpan.
            // Sebelumnya keduanya hanya ditulis ke session lalu dibuang, sehingga
            // nomor HP pengguna tetap kosong setelah akun terhubung.
            $pendingName = session('pending_link_name');
            $pendingPhone = session('pending_link_phone');
            $phoneTaken = $pendingPhone
                && User::where('phone', $pendingPhone)->where('id', '!=', $user->id)->exists();

            // Hash sudah dibuat saat registrasi, jadi tidak perlu Hash::make lagi.
            // `password` punya cast 'hashed' di model, jadi bypass cast dengan
            // forceFill + save agar hash tidak di-hash dua kali.
            $user->forceFill([
                'password' => $pendingHash,
                'google_id' => $user->google_id ?: $googleUser['sub'],
                'username' => $pendingName ?: $user->username,
                'phone' => $phoneTaken ? $user->phone : ($pendingPhone ?: $user->phone),
            ])->save();

            // Google sudah membuktikan kepemilikan alamat ini, konsisten dengan
            // alur login Google lainnya.
            if (! $user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
            }

            session()->forget([
                'pending_link_email',
                'pending_link_hash',
                'pending_link_name',
                'pending_link_phone',
                'pending_link_expires_at',
            ]);

            $redirect = $this->safeIntended($request->input('redirect') ?: $request->query('redirect'));
            if ($redirect) {
                session()->put('url.intended', $redirect);
            }

            Auth::login($user, $remember);

            return $this->redirectUserByRole($user);
        }

        // State pending yang basi atau tidak lengkap tidak boleh menyandera
        // login berikutnya — bersihkan sebelum lanjut ke alur login biasa.
        if ($pendingEmail || $pendingHash || $pendingExpiresAt) {
            session()->forget([
                'pending_link_email',
                'pending_link_hash',
                'pending_link_name',
                'pending_link_phone',
                'pending_link_expires_at',
            ]);
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
            // Akun baru via Google. `email_verified_at` tidak diisi di sini:
            // kolom itu tidak ada di #[Fillable], jadi nilainya akan dibuang
            // diam-diam oleh create(). Verifikasi diset eksplisit lewat
            // markEmailAsVerified() di bawah, yang juga menangani akun lama.
            $user = User::create([
                'username' => $googleUser['name'] ?? explode('@', $googleUser['email'])[0],
                'email' => $googleUser['email'],
                'google_id' => $googleUser['sub'],
                'auth_provider' => 'google',
                'role' => 'user',
                'password' => null,
            ]);

            event(new Registered($user));
        }

        // Akun Google lama yang belum punya email_verified_at ikut diverifikasi,
        // karena Google sendiri yang menjamin kepemilikan alamat tersebut.
        // `markEmailAsVerified()` dipakai (bukan forceFill) karena itu API resmi
        // kontrak MustVerifyEmail sekaligus memicu event Verified.
        if ($user && ! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
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

        return redirect()->intended(route('home'))->with('success', 'Berhasil masuk dengan akun Google');
    }
}
