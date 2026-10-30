<?php

/**
 * Human-readable copy for error pages rendered through Inertia.
 *
 * The standalone Blade views in resources/views/errors remain the fallback
 * when the Inertia page cannot be rendered (e.g. the frontend build or the
 * database is unavailable).
 */
return [
    400 => [
        'title' => 'Permintaan Tidak Valid',
        'description' => 'Permintaan Anda tidak dapat diproses. Periksa kembali data yang dikirim, lalu coba lagi.',
    ],
    401 => [
        'title' => 'Sesi Anda Telah Berakhir',
        'description' => 'Anda perlu masuk terlebih dahulu untuk mengakses halaman ini. Silakan masuk kembali untuk melanjutkan.',
        'primaryLabel' => 'Masuk ke Akun',
        'primaryUrl' => '/login',
    ],
    403 => [
        'title' => 'Akses Ditolak',
        'description' => 'Anda tidak memiliki izin untuk mengakses halaman ini. Jika Anda merasa ini sebuah kekeliruan, silakan hubungi administrator.',
    ],
    404 => [
        'title' => 'Halaman Tidak Ditemukan',
        'description' => 'Halaman yang Anda cari tidak tersedia, telah dipindahkan, atau tautannya tidak lagi valid.',
    ],
    405 => [
        'title' => 'Metode Tidak Diizinkan',
        'description' => 'Permintaan tidak dapat diproses karena metode yang digunakan tidak didukung pada halaman ini.',
    ],
    419 => [
        'title' => 'Sesi Telah Kedaluwarsa',
        'description' => 'Halaman ini telah kedaluwarsa karena sesi Anda berakhir. Muat ulang halaman untuk melanjutkan.',
    ],
    429 => [
        'title' => 'Terlalu Banyak Permintaan',
        'description' => 'Anda mengirim terlalu banyak permintaan dalam waktu singkat. Tunggu beberapa saat, lalu coba lagi.',
    ],
    // Fallback untuk status 4xx yang tidak punya entri sendiri di atas
    // (mis. 406, 410, 413, 414, 422, 451). Teksnya sengaja netral karena
    // kode aslinya beragam; menyebut tautan atau data yang dikirim akan
    // menyesatkan untuk sebagian besar kasus.
    // Harus sama dengan resources/views/errors/4xx.blade.php.
    '4xx' => [
        'title' => 'Permintaan Tidak Dapat Diproses',
        'description' => 'Server tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi beberapa saat lagi, atau kembali ke beranda.',
    ],
    500 => [
        'title' => 'Terjadi Kesalahan Server',
        'description' => 'Maaf, terjadi kesalahan pada server saat memproses permintaan Anda. Silakan coba lagi beberapa saat lagi.',
    ],
    503 => [
        'title' => 'Layanan Sedang Tidak Tersedia',
        'description' => 'Layanan sedang dalam pemeliharaan atau tidak tersedia untuk sementara. Silakan coba lagi beberapa saat lagi.',
    ],
    '5xx' => [
        'title' => 'Terjadi Kesalahan Server',
        'description' => 'Maaf, terjadi kesalahan pada server saat memproses permintaan Anda. Silakan coba lagi beberapa saat lagi.',
    ],
];
