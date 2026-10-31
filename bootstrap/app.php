<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\CheckRole; // Tambahkan import ini
use App\Http\Middleware\EnsureEmailIsVerifiedUnlessAdmin;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // Mendaftarkan alias 'role' untuk memanggil CheckRole
        $middleware->alias([
            'role' => CheckRole::class,
            // Gate verifikasi email yang tidak mengunci admin
            'verified.or.admin' => EnsureEmailIsVerifiedUnlessAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Unauthenticated.'
                ], 401);
            }
        });

        // Error pages for regular page loads are rendered through Inertia so the
        // real public layout (Navbar/Footer) is used. Closures inside the shared
        // props may still fail when the infrastructure itself is down, in which
        // case returning null lets Laravel fall back to the standalone Blade
        // error views, which do not depend on Vite, the session or the database.
        $exceptions->render(function (HttpExceptionInterface $e, \Illuminate\Http\Request $request) {
            if (! $request->isMethod('GET') || $request->is('api/*') || $request->expectsJson()) {
                return null;
            }

            $status = $e->getStatusCode();
            $pages = config('error_pages', []);
            $page = $pages[$status]
                ?? $pages[$status >= 500 ? '5xx' : '4xx']
                ?? [
                    'title' => 'Terjadi Kesalahan',
                    'description' => 'Maaf, permintaan Anda tidak dapat diproses saat ini. Silakan coba lagi.',
                ];

            try {
                $response = Inertia::render('Errors/Show', [
                    'status' => $status,
                    'title' => $page['title'],
                    'description' => $page['description'],
                    'primaryLabel' => $page['primaryLabel'] ?? null,
                    'primaryUrl' => isset($page['primaryUrl']) ? url($page['primaryUrl']) : null,
                ])->toResponse($request);

                // Inertia navigations must receive 200 so the client renders the
                // error page instead of showing its generic error modal. The
                // initial document keeps the real status code.
                return $response->setStatusCode($request->header('X-Inertia') ? 200 : $status);
            } catch (\Throwable) {
                return null;
            }
        });
    })->create();