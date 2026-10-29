@include('errors.partials.page', [
    'code' => 405,
    'title' => 'Metode Tidak Diizinkan',
    'description' => 'Permintaan tidak dapat diproses karena metode yang digunakan tidak didukung pada halaman ini.',
])
