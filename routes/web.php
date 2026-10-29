<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Models\Peraturan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\PeraturanController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\RegulasiController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\User\BookmarkPageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| Frontend Routes (Merender komponen React via Inertia)
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Referensi filter (tetap dapat diakses publik agar dropdown filter di landing page dapat menampilkan opsi)
Route::get('/api/referensi-filter', [PeraturanController::class, 'referensiFilter']);
Route::get('/api/regions/statistics', [\App\Http\Controllers\Api\RegionController::class, 'statistics']);


// ── PROTECTED ROUTES (MANDATORY LOGIN) ──────────────────────────────────
Route::middleware('auth')->group(function () {
    // Route Testing Backend (Merender file Blade)
    // Halaman diagnostik bookmark: memanggil endpoint API asli dan menampilkan
    // status HTTP apa adanya. Tanpa ini, menguji toggle/folder harus lewat curl
    // manual. Sama seperti /test-peraturan, hanya untuk pengujian internal.
    Route::get('/test-bookmark', function () {
        return view('test-bookmark', [
            'contohId' => \App\Models\Peraturan::query()->value('id') ?? 1,
        ]);
    });

    Route::get('/test-peraturan/{id}', function ($id) {
        $peraturan = Peraturan::with(['pasal' => function ($query) {
            $query->orderBy('urutan', 'asc');
        }])->findOrFail($id);

        return view('test-peraturan', compact('peraturan'));
    });

    // Dashboard user. 'verified.or.admin' menjaga fitur akun dari email palsu
    // dan spam pendaftaran massal; admin dikecualikan agar panel admin tidak
    // bisa mengunci dirinya sendiri saat email_verified_at belum diset.
    //
    // Catatan merge: origin/dev membiarkan /dashboard tanpa gerbang verifikasi
    // (dan memaksa email_verified_at terisi saat login). Gerbang dipertahankan
    // karena itu inti TC27.
    Route::middleware('verified.or.admin')->group(function () {
        Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
        Route::redirect('/ringkasan', '/dashboard')->name('user.ringkasan');
    });

    // Bookmark khusus akun user; admin dikembalikan ke beranda oleh middleware role.
    // Halaman dan aksi hapusnya di sini karena keduanya berjalan lewat sesi web;
    // endpoint API (routes/api.php) dipakai pemanggil berbasis token.
    Route::middleware(['role:user', 'verified.or.admin'])->group(function () {
        Route::get('/bookmarks', [BookmarkPageController::class, 'index'])->name('user.bookmarks');
        Route::delete('/bookmarks/{bookmark}', [BookmarkPageController::class, 'destroy'])->name('user.bookmarks.destroy');
        Route::post('/bookmarks/collections', [BookmarkPageController::class, 'storeCollection'])->name('user.bookmarks.collections.store');
        Route::put('/bookmarks/collections/{collection}', [BookmarkPageController::class, 'updateCollection'])->name('user.bookmarks.collections.update');
        Route::delete('/bookmarks/collections/{collection}', [BookmarkPageController::class, 'destroyCollection'])->name('user.bookmarks.collections.destroy');
        Route::post('/bookmarks/{bookmark}/collections', [BookmarkPageController::class, 'syncCollections'])->name('user.bookmarks.collections.sync');
        Route::post('/bookmarks/bulk-destroy', [BookmarkPageController::class, 'bulkDestroy'])->name('user.bookmarks.bulk_destroy');
        Route::post('/bookmarks/bulk-collections', [BookmarkPageController::class, 'bulkSyncCollections'])->name('user.bookmarks.bulk_collections');
    });

    Route::get('/pencarian', function () {
        return Inertia::render('Pencarian');
    })->name('pencarian');

    // Route alias untuk kompatibilitas /search
    Route::redirect('/search', '/pencarian');
    Route::get('/regulasi', [RegulasiController::class, 'index'])->name('regulasi.index');

    Route::get('/bandingkan', function () {
        return Inertia::render('Bandingkan');
    })->name('bandingkan');

    Route::get('/kategori/{slug}', [KategoriController::class, 'show'])->name('kategori.show');

    Route::get('/peraturan/{unique_id}', [PeraturanController::class, 'show'])->name('peraturan.show');
    Route::get('/peraturan/{unique_id}/lihat', [PeraturanController::class, 'viewer'])->name('peraturan.viewer');
    Route::get('/peraturan/{unique_id}/download', [PeraturanController::class, 'download'])->name('peraturan.download');

    // Route alias untuk /regulations/*
    Route::get('/regulations/{unique_id}', function ($unique_id) {
        return redirect()->route('peraturan.show', ['unique_id' => $unique_id]);
    });
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DokumenHukumController;
use App\Http\Controllers\Admin\KategoriHukumController;
use App\Http\Controllers\Admin\SubjekPeraturanController;
use App\Http\Controllers\Admin\TeamController;


Route::prefix('admin')->middleware(['auth', 'role:superadmin,admin'])->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::redirect('/categories', '/admin/kategori-hukum');
    Route::get('/kategori-hukum', [KategoriHukumController::class, 'index'])->name('admin.kategori-hukum');
    Route::post('/kategori-hukum', [KategoriHukumController::class, 'store'])->name('admin.kategori-hukum.store');
    Route::put('/kategori-hukum/{id}', [KategoriHukumController::class, 'update'])->name('admin.kategori-hukum.update');
    Route::delete('/kategori-hukum/{id}', [KategoriHukumController::class, 'destroy'])->name('admin.kategori-hukum.destroy');

    // Subjek Peraturan
    Route::post('/subjek-peraturan', [SubjekPeraturanController::class, 'store'])->name('admin.subjek-peraturan.store');
    Route::put('/subjek-peraturan/{id}', [SubjekPeraturanController::class, 'update'])->name('admin.subjek-peraturan.update');
    Route::delete('/subjek-peraturan/{id}', [SubjekPeraturanController::class, 'destroy'])->name('admin.subjek-peraturan.destroy');

    Route::get('/dokumen-hukum', [DokumenHukumController::class, 'index'])->name('admin.dokumen-hukum');
    Route::delete('/dokumen-hukum/{unique_id}', [DokumenHukumController::class, 'destroy'])->name('admin.dokumen-hukum.destroy');
    Route::post('/dokumen-hukum/import', [DokumenHukumController::class, 'importOcr'])->name('admin.dokumen-hukum.import');
    Route::get('/dokumen-hukum/{unique_id}/detail-edit', [DokumenHukumController::class, 'getDetailForEdit'])->name('admin.dokumen-hukum.detail-edit');
    Route::put('/dokumen-hukum/{unique_id}', [DokumenHukumController::class, 'update'])->name('admin.dokumen-hukum.update');
    Route::get('/dokumen-hukum/tambah', function () {
        return Inertia::render('Admin/DokumenHukum/Create');
    })->name('admin.dokumen-hukum.tambah');

    // Draft Routes
    Route::get('/dokumen-hukum/draft/{id}', [DokumenHukumController::class, 'showDraft'])->name('admin.dokumen-hukum.draft.show');
    Route::post('/dokumen-hukum/draft', [DokumenHukumController::class, 'storeDraft'])->name('admin.dokumen-hukum.draft.store');
    Route::get('/dokumen-hukum/draft-check-duplicate', [DokumenHukumController::class, 'checkDraftDuplicate'])->name('admin.dokumen-hukum.draft.check');
    Route::get('/dokumen-hukum/check-duplicate', [DokumenHukumController::class, 'checkDuplicate'])->name('admin.dokumen-hukum.check-duplicate');
    Route::post('/dokumen-hukum/draft/publish', [DokumenHukumController::class, 'publishDraft'])->name('admin.dokumen-hukum.draft.publish');
    Route::post('/dokumen-hukum/draft/bulk-delete', [DokumenHukumController::class, 'bulkDeleteDraft'])->name('admin.dokumen-hukum.draft.bulk-delete');

    // MinIO Sync Routes
    Route::get('/dokumen-hukum/minio/scan', [DokumenHukumController::class, 'scanMinio'])->name('admin.dokumen-hukum.minio.scan');
    Route::post('/dokumen-hukum/minio/import', [DokumenHukumController::class, 'importFromMinio'])->name('admin.dokumen-hukum.minio.import');
    Route::get('/dokumen-hukum/preview-pdf-minio', [DokumenHukumController::class, 'previewPdfMinio'])->name('admin.dokumen-hukum.preview-pdf-minio');
    Route::get('/dokumen-hukum/minio/file/{filename?}', [DokumenHukumController::class, 'getMinioFileContent'])->where('filename', '.*')->name('admin.dokumen-hukum.minio.file');

    // AC 1 Exact API Endpoints
    Route::get('/api/admin/minio/files/{filename?}', [DokumenHukumController::class, 'getMinioFileContent'])->where('filename', '.*');
    Route::post('/api/admin/import/manual', [DokumenHukumController::class, 'importManual']);

    // Users & Team Management Routes
    Route::get('/team', [TeamController::class, 'index'])->name('admin.team');
    Route::get('/users/tim', [TeamController::class, 'index'])->name('admin.users.tim');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('admin.profile');
});

/*
|--------------------------------------------------------------------------
| Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
    Route::delete('/profile/avatar', [ProfileController::class, 'deleteAvatar'])->name('profile.avatar.delete');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Fallback 404
|--------------------------------------------------------------------------
| URL tak dikenal sebelumnya tidak melewati middleware `web`, sehingga sesi
| tidak pernah dimulai dan halaman 404 selalu menampilkan tombol "Masuk"
| walau pengguna sudah login. Fallback ini membuat 404 dirender dari route
| biasa (sesi + auth aktif) agar state navbar sama dengan halaman lain.
*/
Route::fallback(function (\Illuminate\Http\Request $request) {
    if ($request->is('api/*') || $request->expectsJson()) {
        return response()->json(['message' => 'Not Found.'], 404);
    }

    abort(404);
});
