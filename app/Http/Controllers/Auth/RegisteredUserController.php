<?php

namespace App\Http\Controllers\Auth;

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
        ], [
            'phone.regex' => 'Format nomor telepon tidak valid.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.unique' => 'Nomor telepon sudah terdaftar.',
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
            // dan alihkan ke layar Singkronisasi Akun
            session([
                'pending_link_email' => $request->email,
                'pending_link_password' => $request->password,
                'pending_link_name' => $request->name,
                'pending_link_phone' => $request->phone,
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

        Auth::login($user);

        return redirect('/');
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
            throw ValidationException::withMessages([
                'email' => 'Email sudah terdaftar. Silakan login.',
            ]);
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
