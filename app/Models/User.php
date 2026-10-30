<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Tambahkan ini untuk sistem token login

#[Fillable(['username', 'name', 'email', 'phone', 'password', 'auth_provider', 'role', 'google_id', 'avatar'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable; // Tambahkan HasApiTokens di sini

    protected $appends = ['name', 'has_password'];

    public function getNameAttribute(): ?string
    {
        return $this->username;
    }

    public function setNameAttribute($value): void
    {
        $this->attributes['username'] = $value;
    }

    /**
     * Apakah akun ini punya kata sandi lokal.
     *
     * Dipakai UI profil untuk memutuskan apakah field "Password Saat Ini"
     * perlu ditampilkan. Akun yang hanya masuk lewat Google punya password
     * NULL, sehingga tidak ada kata sandi lama yang bisa diverifikasi.
     */
    public function getHasPasswordAttribute(): bool
    {
        return ! empty($this->attributes['password']);
    }

    public function getAvatarAttribute($value): ?string
    {
        if (!$value) {
            return null;
        }
        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }

        // URL relatif agar avatar tetap tampil walau host akses berbeda dengan
        // APP_URL (mis. diakses lewat IP/domain staging) dan terhindar dari
        // mixed content saat aplikasi disajikan melalui HTTPS.
        return '/storage/' . ltrim($value, '/');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\ResetPasswordNotification($token));
    }

    /**
     * Pakai notifikasi verifikasi berbahasa Indonesia, bukan bawaan Laravel.
     */
    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new \App\Notifications\VerifyEmailNotification);
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    /**
     * Folder (koleksi) bookmark milik user.
     */
    public function bookmarkCollections()
    {
        return $this->hasMany(BookmarkCollection::class);
    }

    /**
     * Peraturan yang disimpan user, dalam bentuk many-to-many lewat tabel
     * `user_bookmarks` yang bersifat polimorfik.
     *
     * Nama method sengaja dipertahankan supaya pemanggilnya — termasuk
     * HandleInertiaRequests yang membagikan `auth.bookmarkIds` ke setiap
     * halaman — tidak perlu diubah.
     */
    public function bookmarkedPeraturans()
    {
        return $this->belongsToMany(
            Peraturan::class,
            'user_bookmarks',
            'user_id',
            'bookmarkable_id'
        )
            ->wherePivot('bookmarkable_type', 'peraturan')
            ->withTimestamps();
    }
}