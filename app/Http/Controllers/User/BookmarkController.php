<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Peraturan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookmarkController extends Controller
{
    /**
     * Display a listing of bookmarked regulations for the current user.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $search = $request->input('q');

        $query = $user->bookmarkedPeraturans()
            ->with(['jenisPeraturan', 'statusPeraturan'])
            ->latest('bookmarks.created_at');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'ILIKE', "%{$search}%")
                  ->orWhere('nomor', 'ILIKE', "%{$search}%")
                  ->orWhere('tahun', 'ILIKE', "%{$search}%");
            });
        }

        $bookmarks = $query->paginate(12)->through(function ($item) {
            return [
                'id' => $item->id,
                'unique_id' => $item->unique_id,
                'judul' => $item->judul,
                'nomor' => $item->nomor,
                'tahun' => $item->tahun,
                'tempat_penetapan' => $item->tempat_penetapan,
                'tanggal_penetapan' => $item->tanggal_penetapan?->format('d F Y'),
                'jenis' => $item->jenisPeraturan?->nama ?? 'Peraturan',
                'status' => $item->statusPeraturan?->nama_status ?? 'Berlaku',
                'bookmarked_at' => $item->pivot?->created_at?->diffForHumans() ?? 'Baru saja',
            ];
        });

        return Inertia::render('User/Bookmark', [
            'bookmarks' => $bookmarks,
            'filters' => [
                'q' => $search,
            ],
        ]);
    }

    /**
     * Toggle bookmark state for a given regulation.
     */
    public function toggle(Request $request, string|int $peraturanId): JsonResponse
    {
        $user = $request->user();

        // Cari berdasarkan id numerik atau unique_id string tanpa memicu error typecast Postgres
        $query = Peraturan::query();
        if (is_numeric($peraturanId)) {
            $query->where('id', (int) $peraturanId);
        } else {
            $query->where('unique_id', $peraturanId);
        }
        $peraturan = $query->first();

        if (!$peraturan) {
            return response()->json([
                'success' => false,
                'message' => 'Peraturan tidak ditemukan.',
            ], 404);
        }

        $existing = Bookmark::where('user_id', $user->id)
            ->where('peraturan_id', $peraturan->id)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json([
                'success' => true,
                'bookmarked' => false,
                'peraturan_id' => (string) $peraturan->id,
                'unique_id' => (string) $peraturan->unique_id,
                'message' => 'Peraturan dihapus dari bookmark.',
            ]);
        }

        Bookmark::create([
            'user_id' => $user->id,
            'peraturan_id' => $peraturan->id,
        ]);

        return response()->json([
            'success' => true,
            'bookmarked' => true,
            'peraturan_id' => (string) $peraturan->id,
            'unique_id' => (string) $peraturan->unique_id,
            'message' => 'Peraturan berhasil disimpan ke bookmark.',
        ]);
    }

    /**
     * Remove a bookmarked regulation.
     */
    public function destroy(Request $request, string|int $peraturanId): RedirectResponse
    {
        $user = $request->user();

        $query = Peraturan::query();
        if (is_numeric($peraturanId)) {
            $query->where('id', (int) $peraturanId);
        } else {
            $query->where('unique_id', $peraturanId);
        }
        $peraturan = $query->firstOrFail();

        Bookmark::where('user_id', $user->id)
            ->where('peraturan_id', $peraturan->id)
            ->delete();

        return redirect()->back()->with('success', 'Peraturan dihapus dari bookmark.');
    }
}
