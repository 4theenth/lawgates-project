<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>{{ $peraturan->judul }}</title>
    <style>
        body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
        h1 { border-bottom: 2px solid #ccc; padding-bottom: 10px; }
        .pasal-box { background: #f9f9f9; border: 1px solid #ddd; padding: 15px 20px; margin-bottom: 15px; border-radius: 8px; }
        h3 { margin-top: 0; color: #2c3e50; }
        p { margin-bottom: 0; white-space: pre-wrap; }
    </style>
</head>
<body>
    <h1>{{ $peraturan->judul }}</h1>
    <p><strong>Tahun:</strong> {{ $peraturan->tahun ?? 'Tidak ada' }} | <strong>Status:</strong> Tersimpan di PostgreSQL</p>
    <br>

    @foreach($peraturan->pasal as $p)
        <div class="pasal-box">
            <h3>{{ $p->nomor_pasal }}</h3>
            <p>{{ $p->isi_pasal }}</p>
        </div>
    @endforeach
</body>
</html>