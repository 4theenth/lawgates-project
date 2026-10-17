<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubjekPeraturan;
use App\Models\Peraturan;
use Illuminate\Http\Request;

class SubjekPeraturanController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:150', 'unique:subjek_peraturan,nama'],
            'deskripsi' => ['nullable', 'string', 'max:1000'],
        ], [
            'nama.required' => 'Nama subjek tidak boleh kosong.',
            'nama.max' => 'Nama subjek maksimal 150 karakter.',
            'nama.unique' => 'Nama subjek sudah ada.',
            'deskripsi.max' => 'Deskripsi maksimal 1000 karakter.',
        ]);

        SubjekPeraturan::create($validated);

        return redirect()->back()->with('success', 'Subjek hukum berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $subjek = SubjekPeraturan::findOrFail($id);
        $oldNama = $subjek->nama;

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:150', 'unique:subjek_peraturan,nama,' . $id],
            'deskripsi' => ['nullable', 'string', 'max:1000'],
        ], [
            'nama.required' => 'Nama subjek tidak boleh kosong.',
            'nama.max' => 'Nama subjek maksimal 150 karakter.',
            'nama.unique' => 'Nama subjek sudah ada.',
            'deskripsi.max' => 'Deskripsi maksimal 1000 karakter.',
        ]);

        $subjek->update($validated);

        // Jika nama subjek berubah, sinkronkan nama di tabel peraturan
        if ($oldNama !== $validated['nama']) {
            Peraturan::where('subjek', $oldNama)->update(['subjek' => $validated['nama']]);
        }

        return redirect()->back()->with('success', 'Subjek hukum berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $subjek = SubjekPeraturan::findOrFail($id);

        // Cek apakah subjek masih digunakan dalam peraturan
        $isUsed = Peraturan::where('subjek', $subjek->nama)->exists();
        if ($isUsed) {
            return redirect()->back()->with('error', 'Subjek hukum tidak dapat dihapus karena masih digunakan dalam dokumen hukum.');
        }

        $subjek->delete();

        return redirect()->back()->with('deleted', 'Subjek hukum berhasil dihapus.');
    }
}
