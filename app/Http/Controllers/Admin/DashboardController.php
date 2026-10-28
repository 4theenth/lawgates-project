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
    public function index(): Response
    {
        $totalUsers = User::count();
        $premiumUsers = Subscription::query()
            ->where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', now());
            })
            ->distinct()
            ->count('user_id');

        $currentMonthStart = now()->startOfMonth();
        $previousMonthStart = now()->copy()->subMonthNoOverflow()->startOfMonth();

        $paidSubscriptions = Subscription::query()
            ->whereIn('status', ['active', 'expired'])
            ->whereBetween('created_at', [$previousMonthStart, now()])
            ->get(['created_at', 'amount']);

        $totalPendapatan = $paidSubscriptions
            ->filter(fn (Subscription $subscription) => $subscription->created_at->gte($currentMonthStart))
            ->sum('amount');

        $revenueTrend = collect(range(1, now()->day))
            ->map(fn (int $day) => [
                'day' => $day,
                'bulanIni' => $paidSubscriptions
                    ->filter(fn (Subscription $subscription) => $subscription->created_at->gte($currentMonthStart)
                        && $subscription->created_at->day === $day)
                    ->sum('amount'),
                'bulanLalu' => $paidSubscriptions
                    ->filter(fn (Subscription $subscription) => $subscription->created_at->gte($previousMonthStart)
                        && $subscription->created_at->lt($currentMonthStart)
                        && $subscription->created_at->day === $day)
                    ->sum('amount'),
            ])
            ->values()
            ->all();

        $recentDocuments = Peraturan::with(['jenisPeraturan', 'statusPeraturan'])
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
                'status' => match ($subscription->status) {
                    'active' => 'Berhasil',
                    'pending_payment' => 'Pending',
                    default => 'Gagal',
                },
            ])
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalDokumen' => Peraturan::count(),
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
