<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Concerns\SanitizesIntendedRedirect;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    use SanitizesIntendedRedirect;

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'phone' => ['required', 'string', 'regex:/^[0-9+\-\s()]{8,20}$/', 'unique:users,phone'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'terms' => ['required', 'accepted'],
        ], [
            'phone.regex' => 'Format nomor telepon tidak valid.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.unique' => 'Nomor telepon sudah terdaftar.',
            'terms.required' => 'Anda harus menyetujui Syarat & Ketentuan.',
            'terms.accepted' => 'Anda harus menyetujui Syarat & Ketentuan.',
        ]);

        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            // Jika akun sudah memiliki password manual, tampilkan error sudah terdaftar
            if (!empty($existingUser->password)) {
                throw ValidationException::withMessages([
                    'email' => 'Email sudah terdaftar. Silakan login.',
                ]);
            }

            // Jika akun terdaftar via Google (password masih kosong), simpan data pending di session
            // dan alihkan ke layar Sinkronisasi Akun.
            //
            // Password TIDAK disimpan mentah. Yang disimpan hanya hash sementara
            // yang dibuat dengan Hash::make(); setelah alur Google selesai hash itu
            // dipakai langsung sebagai password akun tanpa perlu password asli.
            //
            // Hanya berlaku 15 menit: state ini dibaca di awal callback Google,
            // jadi kalau dibiarkan tanpa batas ia bisa memblokir atau menimpa
            // password akun berhari-hari kemudian.
            session([
                'pending_link_email' => $request->email,
                'pending_link_hash' => Hash::make($request->password),
                'pending_link_name' => $request->name,
                'pending_link_phone' => $request->phone,
                'pending_link_expires_at' => now()->addMinutes(15)->timestamp,
            ]);

            return Inertia::render('Auth/GoogleSync', [
                'email' => $existingUser->email,
                'isRegisterFlow' => true,
            ]);
        }

        $user = User::create([
            'username' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'auth_provider' => 'manual',
            'role' => 'user',
        ]);

        event(new Registered($user));

        $redirect = $this->safeIntended($request->input('redirect') ?: $request->query('redirect'));
        if ($redirect) {
            session()->put('url.intended', $redirect);
        }

        Auth::login($user);

        // Akun manual wajib membuktikan kepemilikan email. Arahkan langsung ke
        // halaman pemberitahuan verifikasi, bukan ke halaman tujuan semula.
        return redirect()->route('verification.notice');
    }

    /**
     * Handle email validation check
     */
    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255',
        ]);

        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            // Akun yang dibuat lewat Google belum punya password lokal. Pemiliknya
            // tetap boleh melanjutkan: POST /register akan mengarahkan ke layar
            // Sinkronisasi Akun, bukan membuat akun kedua. Tanpa pengecualian ini
            // seluruh alur linking tidak pernah tercapai dari form registrasi.
            $linkable = $existingUser->google_id && blank($existingUser->password);

            if (! $linkable) {
                throw ValidationException::withMessages([
                    'email' => 'Email sudah terdaftar. Silakan login.',
                ]);
            }

            return response()->json(['valid' => true, 'linkable' => true]);
        }

        return response()->json(['valid' => true]);
    }

    /**
     * Handle phone validation check
     */
    public function checkPhone(Request $request)
    {
        $request->validate([
            'phone' => ['required', 'string', 'regex:/^[0-9+\-\s()]{8,20}$/', 'unique:users,phone'],
        ], [
            'phone.regex' => 'Format nomor telepon tidak valid.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.unique' => 'Nomor telepon sudah terdaftar.',
        ]);

        return response()->json(['valid' => true]);
    }
}
