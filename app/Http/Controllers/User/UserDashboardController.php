<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UserDashboardController extends Controller
{
    /**
     * Display the user dashboard screen.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        // Jika akun admin / superadmin, arahkan ke dashboard admin
        if ($user && in_array($user->role, ['admin', 'superadmin'])) {
            return redirect()->route('admin.dashboard');
        }

        $totalBookmarks = $user->bookmarks()->count();

        $recentBookmarks = $user->bookmarkedPeraturans()
            ->with(['jenisPeraturan', 'statusPeraturan'])
            ->latest('user_bookmarks.created_at')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'unique_id' => $item->unique_id,
                    'judul' => $item->judul,
                    'nomor' => $item->nomor,
                    'tahun' => $item->tahun,
                    'jenis' => $item->jenisPeraturan?->nama ?? 'Peraturan',
                    'status' => $item->statusPeraturan?->nama_status ?? 'Berlaku',
                    'bookmarked_at' => $item->pivot?->created_at?->diffForHumans() ?? 'Baru saja',
                ];
            });

        return Inertia::render('User/Dashboard', [
            'totalBookmarks' => $totalBookmarks,
            'recentBookmarks' => $recentBookmarks,
        ]);
    }
}
