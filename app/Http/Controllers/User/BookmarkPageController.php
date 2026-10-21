<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Halaman daftar bookmark (Inertia).
 *
 * Halaman ini memakai prop `auth.bookmarkIds` yang sudah dibagikan
 * HandleInertiaRequests, jadi tidak ada query tambahan di sini. Sementara isinya
 * masih daftar item seperti sebelumnya; tampilan berbentuk folder menyusul di
 * ticket terpisah.
 */
class BookmarkPageController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('User/Bookmark');
    }
}
