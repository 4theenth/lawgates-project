@php
    // Halaman ini adalah fallback untuk SELURUH status 4xx yang tidak punya
    // view sendiri (mis. 406, 410, 413, 414, 422, 451). Karena kode aslinya
    // beragam, teks harus tetap netral: menyebut "periksa tautan" atau
    // "periksa data yang dikirim" akan salah untuk sebagian besar kasus.
    $statusCode = isset($exception) && method_exists($exception, 'getStatusCode')
        ? $exception->getStatusCode()
        : 400;
@endphp

@include('errors.partials.page', [
    'code' => $statusCode,
    'title' => 'Permintaan Tidak Dapat Diproses',
    'description' => 'Server tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi beberapa saat lagi, atau kembali ke beranda.',
])
