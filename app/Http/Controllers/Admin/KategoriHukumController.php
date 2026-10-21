<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JenisPeraturan;
use App\Models\SubjekPeraturan;
use App\Models\Peraturan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriHukumController extends Controller
{
    public function index(Request $request)
    {
        $activeTab = $request->input('tab', 'kategori');
        $pageSize = max(1, min(100, (int) $request->input('pageSize', 10)));
        $search = $request->input('search');
        $sortColumn = $request->input('sortColumn');
        $sortDirection = strtolower($request->input('sortDirection', 'asc')) === 'desc' ? 'desc' : 'asc';

        if ($activeTab === 'subjek') {
            $query = SubjekPeraturan::query();

            // Search: Nama atau Deskripsi
            if ($request->filled('search')) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama', 'ilike', '%' . $search . '%')
                      ->orWhere('deskripsi', 'ilike', '%' . $search . '%');
                });
            }

            // Sorting
            if ($request->filled('sortColumn') && $request->filled('sortDirection')) {
                if (in_array($sortColumn, ['nama', 'subjek', 'kategori'])) {
                    $query->orderBy('nama', $sortDirection);
                } elseif ($sortColumn === 'deskripsi') {
                    $query->orderBy('deskripsi', $sortDirection);
                } else {
                    $query->orderBy($sortColumn, $sortDirection);
                }
            } else {
                $query->orderBy('id', 'asc');
            }

            $paginator = $query->paginate($pageSize)->withQueryString();

            $formattedData = $paginator->getCollection()->map(function ($item) {
                return [
                    'id' => (string) $item->id,
                    'nama' => $item->nama,
                    'kategori' => $item->nama,
                    'subjek' => $item->nama,
                    'deskripsi' => $item->deskripsi ?: ('Dikhususkan untuk subjek ' . strtolower($item->nama)),
                ];
            });

            $paginator->setCollection($formattedData);

            return Inertia::render('Admin/KategoriHukum/Index', [
                'items' => $paginator,
                'kategori' => $paginator,
                'activeTab' => 'subjek',
                'filters' => array_merge(
                    ['tab' => 'subjek'],
                    $request->only(['search', 'sortColumn', 'sortDirection', 'pageSize'])
                ),
            ]);
        }

        // Tab Default: Kategori
        $query = JenisPeraturan::query();

        // Search: Nama atau Deskripsi atau Kode
        if ($request->filled('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'ilike', '%' . $search . '%')
                  ->orWhere('deskripsi', 'ilike', '%' . $search . '%')
                  ->orWhere('kode', 'ilike', '%' . $search . '%');
            });
        }

        // Sorting
        if ($request->filled('sortColumn') && $request->filled('sortDirection')) {
            if (in_array($sortColumn, ['kategori', 'nama'])) {
                $query->orderBy('nama', $sortDirection);
            } elseif ($sortColumn === 'deskripsi') {
                $query->orderBy('deskripsi', $sortDirection);
            } else {
                $query->orderBy($sortColumn, $sortDirection);
            }
        } else {
            // Default sort by id ascending
            $query->orderBy('id', 'asc');
        }

        $paginator = $query->paginate($pageSize)->withQueryString();

        // Transform collection to match frontend expectations
        $formattedData = $paginator->getCollection()->map(function ($item) {
            return [
                'id' => (string) $item->id,
                'kode' => $item->kode ?? '',
                'nama' => $item->nama,
                'kategori' => $item->nama,
                'subjek' => $item->nama,
                'deskripsi' => $item->deskripsi ?: ('Dikhususkan untuk ' . strtolower($item->nama)),
            ];
        });

        $paginator->setCollection($formattedData);

        return Inertia::render('Admin/KategoriHukum/Index', [
            'items' => $paginator,
            'kategori' => $paginator,
            'activeTab' => 'kategori',
            'filters' => array_merge(
                ['tab' => 'kategori'],
                $request->only(['search', 'sortColumn', 'sortDirection', 'pageSize'])
            ),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:50', 'unique:jenis_peraturan,nama'],
            'kode' => ['nullable', 'string', 'max:50', 'unique:jenis_peraturan,kode'],
            'deskripsi' => ['nullable', 'string', 'max:1000'],
        ], [
            'nama.required' => 'Nama kategori tidak boleh kosong.',
            'nama.max' => 'Nama kategori maksimal 50 karakter.',
            'nama.unique' => 'Nama kategori sudah ada.',
            'kode.unique' => 'Kode kategori sudah digunakan.',
            'kode.max' => 'Kode kategori maksimal 50 karakter.',
            'deskripsi.max' => 'Deskripsi maksimal 1000 karakter.',
        ]);

        if (empty($validated['kode'])) {
            $namaLower = strtolower(trim($validated['nama']));
            
            if (str_contains($namaLower, 'peraturan pemerintah pengganti undang') || $namaLower === 'perpu' || $namaLower === 'perppu') {
                $validated['kode'] = 'PERPPU';
            } elseif (str_contains($namaLower, 'undang-undang darurat') || str_contains($namaLower, 'undang undang darurat')) {
                $validated['kode'] = 'UU Darurat';
            } elseif (str_contains($namaLower, 'undang-undang dasar') || str_contains($namaLower, 'undang undang dasar')) {
                $validated['kode'] = 'UUD';
            } elseif ($namaLower === 'undang-undang' || $namaLower === 'undang undang') {
                $validated['kode'] = 'UU';
            } elseif ($namaLower === 'peraturan pemerintah') {
                $validated['kode'] = 'PP';
            } elseif ($namaLower === 'peraturan presiden') {
                $validated['kode'] = 'PERPRES';
            } elseif ($namaLower === 'peraturan menteri') {
                $validated['kode'] = 'PERMEN';
            } else {
                $words = preg_split('/\s+/', trim($validated['nama']));
                $initials = '';
                foreach ($words as $w) {
                    $initials .= strtoupper(substr($w, 0, 1));
                }
                $validated['kode'] = substr($initials, 0, 10) ?: 'KAT';
            }
        }

        JenisPeraturan::create($validated);

        return redirect()->back()->with('success', 'Kategori hukum berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $kategori = JenisPeraturan::findOrFail($id);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:50', 'unique:jenis_peraturan,nama,' . $id],
            'kode' => ['nullable', 'string', 'max:50', 'unique:jenis_peraturan,kode,' . $id],
            'deskripsi' => ['nullable', 'string', 'max:1000'],
        ], [
            'nama.required' => 'Nama kategori tidak boleh kosong.',
            'nama.max' => 'Nama kategori maksimal 50 karakter.',
            'nama.unique' => 'Nama kategori sudah ada.',
            'kode.unique' => 'Kode kategori sudah digunakan.',
            'kode.max' => 'Kode kategori maksimal 50 karakter.',
            'deskripsi.max' => 'Deskripsi maksimal 1000 karakter.',
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

        return redirect()->back()->with('deleted', 'Kategori hukum berhasil dihapus.');
    }
}
