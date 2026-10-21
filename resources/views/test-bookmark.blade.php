<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Uji Backend Bookmark — USER-02</title>
    <style>
        body { font-family: ui-monospace, monospace; line-height: 1.5; max-width: 900px; margin: 24px auto; padding: 0 16px; color: #222; }
        h1 { border-bottom: 2px solid #ccc; padding-bottom: 8px; font-size: 20px; }
        h2 { font-size: 15px; margin-top: 28px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
        button { font-family: inherit; font-size: 13px; padding: 5px 10px; margin: 2px 4px 2px 0; cursor: pointer; background: #f3f4f6; border: 1px solid #ccc; border-radius: 4px; }
        button:hover { background: #e5e7eb; }
        input { font-family: inherit; font-size: 13px; padding: 4px 6px; border: 1px solid #ccc; border-radius: 4px; width: 90px; }
        pre { background: #f8f8f8; border: 1px solid #ddd; padding: 8px 10px; border-radius: 4px; overflow-x: auto; font-size: 12px; margin: 6px 0; white-space: pre-wrap; }
        .ok { color: #047857; font-weight: 700; }
        .bad { color: #b91c1c; font-weight: 700; }
        .note { color: #666; font-size: 12px; }
        .row { margin: 4px 0; }
        code { background: #f0f0f0; padding: 1px 4px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>Uji Backend Bookmark (USER-02)</h1>
    <p class="note">
        Halaman diagnostik. Semua tombol memanggil endpoint asli dan menampilkan
        status HTTP + isi respons apa adanya. Login sebagai <strong>{{ auth()->user()->email }}</strong>
        (role: <code>{{ auth()->user()->role }}</code>, id: <code>{{ auth()->id() }}</code>).
    </p>

    <h2>1. Toggle bookmark &mdash; POST /api/bookmarks/toggle</h2>
    <div class="row">
        <label>id peraturan: <input id="toggle-id" type="number" value="{{ $contohId }}" min="1"></label>
        <button onclick="runToggle()">Toggle</button>
        <button onclick="runToggleSlug()">Kirim slug (uji 500)</button>
    </div>
    <p class="note">Tombol kedua sengaja mengirim <code>unique_id</code>. Sebelum perbaikan ini menghasilkan HTTP 500 (SQLSTATE 22P02); sekarang ditolak validator dengan <code>422</code>.</p>
    <pre id="out-toggle">&mdash;</pre>

    <h2>2. Daftar bookmark &mdash; GET /api/bookmarks</h2>
    <div class="row">
        <button onclick="api('GET', '/api/bookmarks')">Semua</button>
        <button onclick="api('GET', '/api/bookmarks?collection_id=unassigned')">Tanpa folder</button>
        <button onclick="api('GET', '/api/bookmarks?per_page=1')">per_page=1</button>
        <button onclick="api('GET', '/api/bookmarks?per_page=0')">per_page=0 (uji bug)</button>
    </div>
    <p class="note"><code>per_page=0</code> ditolak validator dengan <code>422</code> (bukan fallback ke default), sehingga <code>paginate(0)</code> tidak pernah tercapai.</p>
    <pre id="out-list">&mdash;</pre>

    <h2>3. Folder &mdash; /api/bookmark-collections</h2>
    <div class="row">
        <label>nama folder: <input id="folder-name" type="text" value="Uji Teknis" style="width:150px"></label>
        <button onclick="api('POST', '/api/bookmark-collections', {name: val('folder-name')})">Buat</button>
        <button onclick="api('GET', '/api/bookmark-collections')">Daftar folder</button>
    </div>
    <div class="row">
        <label>id folder: <input id="folder-id" type="number" min="1"></label>
        <button onclick="api('PUT', '/api/bookmark-collections/' + val('folder-id'), {name: val('folder-name')})">Ubah nama</button>
        <button onclick="api('DELETE', '/api/bookmark-collections/' + val('folder-id'))">Hapus folder</button>
    </div>
    <p class="note">Setelah hapus folder, bookmark di dalamnya harus tetap ada (AC #4).</p>
    <pre id="out-folder">&mdash;</pre>

    <h2>4. Pindahkan bookmark ke folder &mdash; PUT /api/bookmarks/assign-collections</h2>
    <div class="row">
        <label>bookmark_id: <input id="bm-id" type="number" min="1"></label>
        <label>collection_ids (pisah koma): <input id="bm-cols" type="text" value="" style="width:100px"></label>
        <button onclick="runAssign()">Simpan</button>
        <button onclick="runAssign([])">Kosongkan (keluar dari semua folder)</button>
    </div>
    <pre id="out-assign">&mdash;</pre>

    <h2>5. Uji kepemilikan &amp; autentikasi</h2>
    <div class="row">
        <button onclick="api('DELETE', '/api/bookmark-collections/1')">Hapus folder id 1 (mungkin milik orang lain)</button>
        <button onclick="api('GET', '/api/bookmarks', null, true, 'TANPA CSRF')">Kirim tanpa header CSRF</button>
    </div>
    <p class="note">Folder milik user lain harus 403. Tanpa CSRF harus 419.</p>
    <pre id="out-sec">&mdash;</pre>

    <script>
        const csrf = document.querySelector('meta[name="csrf-token"]').content;
        const val = (id) => document.getElementById(id).value.trim();
        const show = (id) => document.getElementById(id);

        // Semua permintaan lewat helper ini supaya status HTTP asli selalu tampil.
        async function api(method, url, body, tanpaCsrf, ke) {
            const target = show(ke ? { 'TANPA CSRF': 'out-sec' }[ke] || 'out-sec' : guessOut(url));
            target.textContent = '...';
            const headers = { 'Accept': 'application/json' };
            if (body !== null && body !== undefined) headers['Content-Type'] = 'application/json';
            if (!tanpaCsrf) headers['X-CSRF-TOKEN'] = csrf;

            try {
                const res = await fetch(url, {
                    method,
                    headers,
                    credentials: 'same-origin',
                    body: body ? JSON.stringify(body) : undefined,
                });
                const text = await res.text();
                let pretty = text;
                try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch (e) { /* biarkan teks apa adanya */ }
                target.innerHTML = '<span class="' + (res.ok ? 'ok' : 'bad') + '">HTTP ' + res.status + '</span>\n' + escapeHtml(pretty).slice(0, 3000);
            } catch (e) {
                target.innerHTML = '<span class="bad">Gagal menghubungi server</span>\n' + escapeHtml(String(e));
            }
        }

        function guessOut(url) {
            if (url.includes('assign-collections')) return 'out-assign';
            if (url.includes('bookmark-collections')) return 'out-folder';
            if (url.includes('/api/bookmarks')) return 'out-toggle';
            return 'out-list';
        }

        function escapeHtml(s) {
            return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
        }

        function runToggle() {
            api('POST', '/api/bookmarks/toggle', { type: 'peraturan', id: val('toggle-id') });
        }

        function runToggleSlug() {
            api('POST', '/api/bookmarks/toggle', { type: 'peraturan', id: 'undang-undang-6-2023' });
        }

        function runAssign(ids) {
            const list = Array.isArray(ids) ? ids : val('bm-cols').split(',').map((s) => s.trim()).filter(Boolean).map(Number);
            api('PUT', '/api/bookmarks/assign-collections', { bookmark_id: Number(val('bm-id')), collection_ids: list });
        }
    </script>
</body>
</html>
