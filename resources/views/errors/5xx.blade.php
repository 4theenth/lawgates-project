@php
    $statusCode = isset($exception) && method_exists($exception, 'getStatusCode')
        ? $exception->getStatusCode()
        : 500;
@endphp

@include('errors.partials.page', [
    'code' => $statusCode,
    'title' => 'Terjadi Kesalahan Server',
    'description' => 'Maaf, terjadi kesalahan pada server saat memproses permintaan Anda. Silakan coba lagi beberapa saat lagi.',
])
