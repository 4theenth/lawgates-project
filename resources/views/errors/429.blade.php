@include('errors.partials.page', [
    'code' => 429,
    'title' => 'Terlalu Banyak Permintaan',
    'description' => 'Anda mengirim terlalu banyak permintaan dalam waktu singkat. Tunggu beberapa saat, lalu coba lagi.',
])
