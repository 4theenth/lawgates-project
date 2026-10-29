@php
    $statusCode = isset($exception) && method_exists($exception, 'getStatusCode')
        ? $exception->getStatusCode()
        : 400;
@endphp

@include('errors.partials.page', [
    'code' => $statusCode,
    'title' => 'Permintaan Tidak Dapat Diproses',
    'description' => 'Permintaan Anda tidak dapat diproses saat ini. Periksa kembali tautan atau data yang digunakan, lalu coba lagi.',
])
