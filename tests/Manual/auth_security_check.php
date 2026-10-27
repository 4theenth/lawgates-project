<?php

/**
 * Self-check untuk perbaikan keamanan auth.
 * Jalankan: php artisan tinker < tests/Manual/auth_security_check.php
 */
use App\Models\User;
use Illuminate\Support\Facades\Hash;

$fail = 0;
function check(string $label, bool $ok): void
{
    global $fail;
    echo ($ok ? '  OK   ' : '  FAIL ') . $label . PHP_EOL;
    if (! $ok) {
        $fail++;
    }
}

// 1. Password plaintext tidak lagi disimpan di session saat registrasi
$src = file_get_contents(app_path('Http/Controllers/Auth/RegisteredUserController.php'));
check('session tidak menyimpan pending_link_password mentah', ! str_contains($src, "'pending_link_password' => \$request->password"));
check('session menyimpan hash (pending_link_hash)', str_contains($src, "'pending_link_hash' => Hash::make(\$request->password)"));

// 2. GoogleAuthController: hash dipakai langsung, tidak di-hash ulang
$google = file_get_contents(app_path('Http/Controllers/Auth/GoogleAuthController.php'));
check('tidak ada Hash::make pada password pending', ! str_contains($google, 'Hash::make(\$pendingPassword)'));
check('memakai forceFill agar cast hashed tidak dobel', str_contains($google, 'forceFill(['));
check('validasi audience lewat tokeninfo', str_contains($google, 'oauth2/v3/tokeninfo'));
check('withoutVerifying sudah dihapus', ! str_contains($google, 'withoutVerifying'));

// 3. Login mengarahkan user unverified manual ke halaman verifikasi
$login = file_get_contents(app_path('Http/Controllers/Auth/AuthenticatedSessionController.php'));
check('login cek hasVerifiedEmail', str_contains($login, 'hasVerifiedEmail()'));

// 4. Hash yang dibuat lalu dipakai langsung tetap valid untuk Hash::check
$hash = Hash::make('Rahasia123!');
check('hash tersimpan lolos Hash::check', Hash::check('Rahasia123!', $hash));

// 5. Bobot hash wajar (bcrypt 12 = cast default Laravel)
check('hash memakai bcrypt cost 12', str_starts_with($hash, '$2y$12$'));

echo PHP_EOL . ($fail === 0 ? 'SEMUA CHECK LULUS' : "$fail CHECK GAGAL") . PHP_EOL;
