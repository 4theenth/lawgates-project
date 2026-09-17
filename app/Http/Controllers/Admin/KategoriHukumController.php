<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriHukumController extends Controller
{
    public function index(Request $request)
    {
        $query = JenisPeraturan::query();

        // Search: Nama atau Deskripsi
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'ilike', '%' . $search . '%')
                  ->orWhere('deskripsi', 'ilike', '%' . $search . '%')
                  ->orWhere('kode', 'ilike', '%' . $search . '%');
            });
        }

        // Sorting
        if ($request->filled('sortColumn') && $request->filled('sortDirection')) {
            $direction = strtolower($request->sortDirection) === 'desc' ? 'desc' : 'asc';

            if ($request->sortColumn === 'kategori') {
                $query->orderBy('nama', $direction);
            } elseif ($request->sortColumn === 'deskripsi') {
                $query->orderBy('deskripsi', $direction);
            } else {
                $query->orderBy($request->sortColumn, $direction);
            }
        } else {
            // Default sort by id ascending
            $query->orderBy('id', 'asc');
        }

        $pageSize = (int) $request->input('pageSize', 10);
        $paginator = $query->paginate($pageSize)->withQueryString();

        // Transform collection to match frontend expectations
        $formattedData = $paginator->getCollection()->map(function ($item) {
            return [
                'id' => (string) $item->id,
                'kode' => $item->kode ?? '',
                'kategori' => $item->nama,
                'deskripsi' => $item->deskripsi ?: ('Dikhususkan untuk ' . strtolower($item->nama)),
            ];
        });

        $paginator->setCollection($formattedData);

        return Inertia::render('Admin/KategoriHukum/Index', [
            'kategori' => $paginator,
            'filters' => $request->only(['search', 'sortColumn', 'sortDirection', 'pageSize']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'kode' => ['nullable', 'string', 'max:50'],
            'deskripsi' => ['nullable', 'string', 'max:1000'],
        ]);

        if (empty($validated['kode'])) {
            $words = preg_split('/\s+/', trim($validated['nama']));
            $initials = '';
            foreach ($words as $w) {
                $initials .= strtoupper(substr($w, 0, 1));
            }
            $validated['kode'] = substr($initials, 0, 10) ?: 'KAT';
        }

        JenisPeraturan::create($validated);

        return redirect()->back()->with('success', 'Kategori hukum berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $kategori = JenisPeraturan::findOrFail($id);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'kode' => ['nullable', 'string', 'max:50'],
            'deskripsi' => ['nullable', 'string', 'max:1000'],
        ]);

        $kategori->update($validated);

        return redirect()->back()->with('success', 'Kategori hukum berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $kategori = JenisPeraturan::findOrFail($id);

        // Cek apakah kategori masih digunakan dalam peraturan
        $isUsed = Peraturan::where('jenis_peraturan_id', $id)->exists();
        if ($isUsed) {
            return redirect()->back()->with('error', 'Kategori hukum tidak dapat dihapus karena masih digunakan dalam dokumen hukum.');
        }

        $kategori->delete();

        return redirect()->back()->with('success', 'Kategori hukum berhasil dihapus.');
    }
}
