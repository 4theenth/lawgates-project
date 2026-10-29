<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        if (in_array($user->role, ['admin', 'superadmin'])) {
            return Inertia::render('Admin/Profile', [
                'mustVerifyEmail' => $user instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        if (isset($validated['name'])) {
            $validated['username'] = $validated['name'];
        }

        $user = $request->user();
        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return $this->backToProfile($user)->with('success', 'Profile berhasil diperbarui.');
    }

    /**
     * Update the user's profile avatar.
     */
    public function updateAvatar(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ], [
            'avatar.required' => 'File foto profil wajib dipilih.',
            'avatar.image' => 'File harus berupa gambar.',
            'avatar.mimes' => 'Format gambar harus jpeg, png, jpg, atau webp.',
            'avatar.max' => 'Ukuran gambar maksimal 2MB.',
        ]);

        $user = $request->user();

        // Hapus file avatar lama jika ada di storage public
        $rawAvatar = $user->getRawOriginal('avatar');
        if ($rawAvatar && Storage::disk('public')->exists($rawAvatar)) {
            Storage::disk('public')->delete($rawAvatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $path;
        $user->save();

        return $this->backToProfile($user)->with('success', 'Foto profil berhasil diperbarui.');
    }

    /**
     * Delete the user's profile avatar.
     */
    public function deleteAvatar(Request $request): RedirectResponse
    {
        $user = $request->user();

        $rawAvatar = $user->getRawOriginal('avatar');
        if ($rawAvatar && Storage::disk('public')->exists($rawAvatar)) {
            Storage::disk('public')->delete($rawAvatar);
        }

        $user->avatar = null;
        $user->save();

        return $this->backToProfile($user)->with('success', 'Foto profil berhasil dihapus.');
    }

    /**
     * Kembali ke halaman profil yang sesuai peran pengguna.
     *
     * `back()` tanpa referer berakhir di "/" sehingga pengguna mendarat di
     * beranda, bukan di halaman profil yang baru diubah.
     */
    private function backToProfile(User $user): RedirectResponse
    {
        $fallback = in_array($user->role, ['admin', 'superadmin'], true)
            ? route('admin.profile')
            : route('profile.edit');

        return redirect()->back(302, [], $fallback);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
