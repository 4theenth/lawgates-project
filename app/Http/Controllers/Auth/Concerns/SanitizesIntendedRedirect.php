<?php

namespace App\Http\Controllers\Auth\Concerns;

trait SanitizesIntendedRedirect
{
    protected function safeIntended(?string $url): ?string
    {
        if (blank($url)) {
            return null;
        }

        $url = trim($url);

        if ($url === '/' || strlen($url) > 2048) {
            return null;
        }

        if (! str_starts_with($url, '/')) {
            return null;
        }

        // Tolak '//host' dan '/\host'. Browser membaca keduanya sebagai URL
        // absolut, sehingga tanpa ini pengguna bisa diarahkan ke domain lain
        // tepat setelah login berhasil.
        if (preg_match('#^/[/\\\\]#', $url)) {
            return null;
        }

        return $url;
    }
}