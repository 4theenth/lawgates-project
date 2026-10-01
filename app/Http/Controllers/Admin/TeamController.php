<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * Display the Team management page (empty state / initial view).
     */
    public function index(Request $request)
    {
        $statusTab = $request->input('tab', 'aktif');
        $search = $request->input('search', '');
        $pagePending = (int) $request->input('page_pending', 1);
        $pageActive = (int) $request->input('page_active', 1);
        $pageSize = (int) $request->input('page_size', 10);

        return Inertia::render('Admin/Users/Tim', [
            'pendingMembers' => [
                'data' => [],
                'current_page' => $pagePending,
                'last_page' => 1,
                'total' => 0,
                'per_page' => $pageSize,
            ],
            'activeMembers' => [
                'data' => [],
                'current_page' => $pageActive,
                'last_page' => 1,
                'total' => 0,
                'per_page' => $pageSize,
            ],
            'filters' => [
                'tab' => $statusTab,
                'search' => $search,
                'pageSize' => $pageSize,
            ],
        ]);
    }
}
