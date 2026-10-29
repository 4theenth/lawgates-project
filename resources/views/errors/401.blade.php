@include('errors.partials.page', [
    'code' => 401,
    'title' => 'Sesi Anda Telah Berakhir',
    'description' => 'Anda perlu masuk terlebih dahulu untuk mengakses halaman ini. Silakan masuk kembali untuk melanjutkan.',
    'primaryLabel' => 'Masuk ke Akun',
    'primaryUrl' => url('/login'),
])
