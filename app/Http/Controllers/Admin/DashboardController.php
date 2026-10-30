<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DraftDokumen;
use App\Models\Peraturan;
use App\Models\Subscription;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Status langganan yang dianggap sudah menghasilkan uang.
     * `pending_payment` belum dibayar, jadi tidak dihitung sebagai pendapatan.
     */
    private const PAID_STATUSES = ['active', 'expired'];

    public function index(): Response
    {
        // Metrik pengguna hanya menghitung akun biasa. Admin dan superadmin
        // bukan pelanggan, jadi tidak boleh masuk hitungan premium/gratis.
        $memberIds = User::query()->where('role', 'user')->select('id');

        $totalUsers = (clone $memberIds)->count();

        $premiumUsers = Subscription::query()
            ->whereIn('user_id', $memberIds)
            ->where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', now());
            })
            ->distinct()
            ->count('user_id');

        $currentMonthStart = now()->startOfMonth();
        $previousMonthStart = now()->copy()->subMonthNoOverflow()->startOfMonth();

        // Satu agregasi per hari, dikerjakan sekali jalan di PHP supaya tetap
        // portabel di PostgreSQL (produksi) maupun SQLite (test).
        $dailyRevenue = Subscription::query()
            ->whereIn('status', self::PAID_STATUSES)
            ->where('created_at', '>=', $previousMonthStart)
            ->get(['created_at', 'amount'])
            ->groupBy(fn (Subscription $subscription) => $subscription->created_at->toDateString())
            ->map(fn ($rows) => (int) $rows->sum('amount'))
            ->all();

        $currentKey = $currentMonthStart->toDateString();

        $totalPendapatan = (int) collect($dailyRevenue)
            ->filter(fn ($total, $tanggal) => $tanggal >= $currentKey)
            ->sum();

        $revenueTrend = collect(range(1, now()->day))
            ->map(function (int $day) use ($dailyRevenue, $currentMonthStart, $previousMonthStart) {
                $bulanIni = $currentMonthStart->copy()->day($day)->toDateString();
                $bulanLalu = $previousMonthStart->copy()->day($day)->toDateString();

                return [
                    'day' => $day,
                    'bulanIni' => $dailyRevenue[$bulanIni] ?? 0,
                    'bulanLalu' => $dailyRevenue[$bulanLalu] ?? 0,
                ];
            })
            ->values()
            ->all();

        $recentDocuments = Peraturan::with(['jenisPeraturan', 'statusPeraturan'])
            ->whereRaw('LOWER(COALESCE(judul, \'\')) NOT LIKE ?', ['%menunggu import%'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function (Peraturan $peraturan) {
                $statusName = strtolower($peraturan->statusPeraturan?->nama_status ?? '');

                return [
                    'id' => (string) $peraturan->unique_id,
                    'title' => $peraturan->judul,
                    'category' => $peraturan->jenisPeraturan?->nama ?? 'Lainnya',
                    'status' => str_contains($statusName, 'draft') ? 'Draf' : 'Publik',
                    'uploadedAt' => $peraturan->updated_at?->toIso8601String(),
                ];
            })
            ->values();

        $recentTransactions = Subscription::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Subscription $subscription) => [
                'id' => (string) $subscription->id,
                'userName' => $subscription->user?->username ?? 'Pengguna',
                'date' => $subscription->created_at?->locale('id')->translatedFormat('j M Y') ?? '-',
                'timestamp' => $subscription->created_at?->timestamp ?? 0,
                // "Kedaluwarsa" bukan kegagalan pembayaran: statusnya sudah lunas
                // lalu masa aktifnya habis.
                'status' => match ($subscription->status) {
                    'active' => 'Berhasil',
                    'pending_payment' => 'Pending',
                    'expired' => 'Kedaluwarsa',
                    default => 'Gagal',
                },
            ])
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalDokumen' => Peraturan::query()
                    ->whereRaw('LOWER(COALESCE(judul, \'\')) NOT LIKE ?', ['%menunggu import%'])
                    ->count(),
                'totalDraft' => DraftDokumen::where('status', 'draft')->count(),
                'totalPremiumUsers' => $premiumUsers,
                'totalPendapatan' => $totalPendapatan,
            ],
            'subscriptionData' => [
                'premiumCount' => $premiumUsers,
                'freeCount' => max(0, $totalUsers - $premiumUsers),
                'totalUsers' => $totalUsers,
            ],
            'revenueTrend' => $revenueTrend,
            'recentDocuments' => $recentDocuments,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}