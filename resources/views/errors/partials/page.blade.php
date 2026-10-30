{{--
    Fallback halaman error: biasanya error page dirender lewat Inertia (lihat
    bootstrap/app.php) agar memakai Navbar/Footer React yang sama dengan halaman
    reguler. Tampilan ini tetap mandiri dan tidak membutuhkan Vite, session, atau
    database agar masih bisa dirender saat infrastruktur gagal.
--}}
@php
    $appName = 'LawGates';
    $statusCode = $code ?? 500;
    $statusTitle = $title ?? 'Terjadi Kesalahan';
    $statusDescription = $description ?? 'Maaf, permintaan Anda tidak dapat diproses saat ini. Silakan coba lagi.';
    $primaryLabel = $primaryLabel ?? 'Coba Lagi';
    $primaryUrl = $primaryUrl ?? null;
    $primaryReload = $primaryReload ?? true;
    $homeUrl = url('/');
    $regulasiUrl = url('/regulasi');
    $loginUrl = url('/login');

    // ── State navbar (harus sama dengan Navigasi React di layout publik) ──
    // Menu aktif dihitung dari path saat ini, bukan dari halaman error yang
    // dirender: halaman 404/500 bukan "Beranda", jadi tak ada menu ter-highlight.
    $currentPath = '/' . ltrim(request()->path(), '/');
    $isHomePath = $currentPath === '/';
    $isRegulasiPath = $currentPath === '/regulasi' || str_starts_with($currentPath, '/regulasi/');

    // Sesi bisa saja tidak tersedia saat error page dirender (mis. DB down),
    // jadi pengecekan auth dibungkus try/catch agar halaman tetap tampil.
    $navUser = null;
    try {
        $navUser = auth()->user();
    } catch (\Throwable $e) {
        $navUser = null;
    }
    $navIsAdmin = $navUser && in_array($navUser->role, ['admin', 'superadmin'], true);
    $navUserName = $navUser ? ($navUser->name ?? $navUser->username ?? 'User') : null;
    $navUserLabel = $navIsAdmin ? 'DASHBOARD' : \Illuminate\Support\Str::limit((string) $navUserName, 16);
    $navUserUrl = $navIsAdmin ? url('/admin/dashboard') : url('/dashboard');

    // Avatar mengikuti Navbar React: foto pengguna, atau avatar default dari
    // Vite. Bila manifest Vite tidak tersedia (mis. infra gagal), halaman tetap
    // dirender dengan ikon pengguna sebagai fallback.
    $navAvatarUrl = null;
    if ($navUser) {
        try {
            $navAvatarUrl = $navUser->avatar
                ?: \Illuminate\Support\Facades\Vite::asset('resources/js/assets/profile-avatar.webp');
        } catch (\Throwable $e) {
            $navAvatarUrl = $navUser->avatar;
        }
    }

    // Form logout butuh token CSRF. Sesi bisa saja belum tersedia saat error
    // 500 dirender, jadi token tidak boleh menggagalkan halaman.
    $csrfToken = null;
    try {
        $csrfToken = csrf_token();
    } catch (\Throwable $e) {
        $csrfToken = null;
    }
@endphp
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta name="color-scheme" content="light">
    <title>{{ $statusCode }} ─ {{ $statusTitle }} | {{ $appName }}</title>
    <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="32x32">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}" sizes="any">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            /* LawGates Design Tokens */
            --color-pr-50:  #e7e8ec;
            --color-pr-100: #ced2d8;
            --color-pr-200: #b5bbc5;
            --color-pr-300: #9da4b2;
            --color-pr-400: #858e9f;
            --color-pr-500: #6c778b;
            --color-pr-600: #546078;
            --color-pr-700: #3b4965;
            --color-pr-800: #233351;
            --color-pr-900: #0a1c3e;

            --color-sec-50:  #fbf7eb;
            --color-sec-100: #f7efd7;
            --color-sec-200: #f2e7c3;
            --color-sec-500: #e5cf87;
            --color-sec-800: #d8b74b;
            --color-sec-900: #d4af37;

            --color-neu-50:  #e9e9e9;
            --color-neu-100: #d3d3d3;
            --color-neu-200: #bcbcbc;
            --color-neu-300: #a6a6a6;
            --color-neu-400: #909090;
            --color-neu-500: #7a7a7a;
            --color-neu-600: #646464;
            --color-neu-700: #4d4d4d;
            --color-neu-800: #373737;
            --color-neu-900: #212121;

            --color-bg-900:  #F8F9FA;
            --font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            --page-max-w: 1202px;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scrollbar-width: thin;
            scrollbar-color: var(--color-neu-300) transparent;
            scrollbar-gutter: stable;
        }

        html::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        html::-webkit-scrollbar-track {
            background: transparent;
        }

        html::-webkit-scrollbar-thumb {
            background-color: var(--color-neu-300);
            border-radius: 9999px;
        }

        html::-webkit-scrollbar-thumb:hover {
            background-color: var(--color-neu-400);
        }

        body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: var(--color-bg-900);
            font-family: var(--font-sans);
            font-size: 16px;
            line-height: 1.5;
            color: var(--color-neu-900);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
            background-color: var(--color-sec-900);
            color: #ffffff;
        }

        .page-container {
            width: 100%;
            max-width: var(--page-max-w);
            margin-left: auto;
            margin-right: auto;
            padding-left: 16px;
            padding-right: 16px;
        }

        @media (min-width: 640px) {
            .page-container {
                padding-left: 24px;
                padding-right: 24px;
            }
        }

        @media (min-width: 1280px) {
            .page-container {
                padding-left: 0;
                padding-right: 0;
            }
        }

        /* ── HEADER / NAVBAR ─────────────────────────────────── */
        .lg-header {
            width: 100%;
            height: 64px;
            background-color: #ffffff;
            position: sticky;
            top: 0;
            z-index: 50;
            display: flex;
            align-items: center;
        }

        .lg-header__inner {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 64px;
        }

        .lg-brand {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
        }

        .lg-brand img {
            height: 24px;
            width: auto;
            display: block;
        }

        @media (min-width: 640px) {
            .lg-brand img {
                height: 26px;
            }
        }

        /* Menu tengah diposisikan absolut tepat di tengah header, sama seperti
           Navbar React (left-1/2 -translate-x-1/2). */
        .lg-nav {
            display: none;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            align-items: center;
            gap: 20px;
            z-index: 20;
            user-select: none;
        }

        @media (min-width: 768px) {
            .lg-nav {
                display: flex;
            }
        }

        .lg-nav__link {
            position: relative;
            padding: 4px 0;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: var(--color-neu-700);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .lg-nav__link:hover {
            color: var(--color-neu-900);
        }

        .lg-nav__link--active {
            font-weight: 600;
            color: var(--color-sec-900);
        }

        .lg-nav__link--active:hover {
            color: var(--color-sec-900);
        }

        .lg-nav__link--active::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-bottom: 1px solid var(--color-sec-900);
        }

        /* Menu "Segera Hadir" tetap tampil seperti menu biasa, sama dengan
           navbar React; bedanya hanya tidak bisa diklik. */
        .lg-nav__link--disabled {
            color: var(--color-neu-700);
            cursor: default;
            user-select: none;
        }

        .lg-nav__link--disabled:hover {
            color: var(--color-neu-700);
        }

        .lg-header__actions {
            display: none;
            align-items: center;
            gap: 12px;
        }

        @media (min-width: 768px) {
            .lg-header__actions {
                display: flex;
            }
        }

        .lg-header__mobile {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        @media (min-width: 768px) {
            .lg-header__mobile {
                display: none;
            }
        }

        .lg-login-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background-color: var(--color-pr-900);
            border: 1px solid var(--color-pr-800);
            color: #ffffff;
            padding: 6px 14px;
            border-radius: 10px;
            font-size: 10px;
            line-height: 1.3333;
            font-weight: 400;
            letter-spacing: 0.05em;
            text-decoration: none;
            transition: background-color 0.2s ease, border-color 0.2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .lg-login-btn:hover {
            background-color: var(--color-pr-800);
            border-color: var(--color-pr-800);
        }

        /* Avatar pengguna (sama dengan dropdown trigger Navbar React) */
        .lg-avatar-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 4px;
            border-radius: 999px;
            text-decoration: none;
            transition: background-color 0.15s ease;
        }

        .lg-avatar-btn:hover {
            background-color: rgba(233, 233, 233, 0.4);
        }

        .lg-avatar {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            flex-shrink: 0;
            border-radius: 999px;
            border: 1px solid rgba(188, 188, 188, 0.6);
            background-color: var(--color-neu-50);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            overflow: hidden;
            color: var(--color-neu-500);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .lg-avatar--sm {
            width: 30px;
            height: 30px;
        }

        /* ── MOBILE MENU (hamburger + drawer) ────────────────── */
        .lg-menu-toggle {
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
        }

        .lg-hamburger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            margin-right: -4px;
            border-radius: 8px;
            color: var(--color-neu-900);
            cursor: pointer;
            transition: color 0.2s ease;
        }

        .lg-hamburger:hover {
            color: var(--color-neu-900);
        }

        .lg-menu-toggle:focus-visible ~ .lg-header .lg-hamburger {
            outline: 2px solid var(--color-neu-200);
            outline-offset: 2px;
        }

        .lg-drawer {
            position: fixed;
            inset: 0;
            z-index: 100;
            visibility: hidden;
            transition: visibility 0.3s ease;
        }

        .lg-drawer__backdrop {
            position: absolute;
            inset: 0;
            display: block;
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            opacity: 0;
            transition: opacity 0.3s ease;
            cursor: pointer;
        }

        .lg-drawer__panel {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 80%;
            max-width: 320px;
            height: 100%;
            padding: 24px;
            background-color: var(--color-pr-900);
            border-left: 1px solid var(--color-pr-700);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
        }

        .lg-menu-toggle:checked ~ .lg-drawer {
            visibility: visible;
        }

        .lg-menu-toggle:checked ~ .lg-drawer .lg-drawer__backdrop {
            opacity: 1;
        }

        .lg-menu-toggle:checked ~ .lg-drawer .lg-drawer__panel {
            transform: translateX(0);
        }

        body:has(.lg-menu-toggle:checked) {
            overflow: hidden;
        }

        @media (min-width: 768px) {
            .lg-drawer {
                display: none;
            }
        }

        .lg-drawer__head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--color-pr-800);
        }

        .lg-drawer__head img {
            height: 24px;
            width: auto;
            display: block;
        }

        .lg-drawer__close {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
            border-radius: 8px;
            color: var(--color-neu-300);
            cursor: pointer;
            transition: color 0.2s ease, background-color 0.2s ease;
        }

        .lg-drawer__close:hover {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.1);
        }

        .lg-drawer__nav {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-top: 24px;
        }

        .lg-drawer__link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px;
            border-radius: 14px;
            font-size: 12px;
            font-weight: 500;
            line-height: 17.1429px;
            color: var(--color-neu-200);
            text-decoration: none;
            transition: color 0.2s ease, background-color 0.2s ease;
        }

        .lg-drawer__link:hover {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.05);
        }

        .lg-drawer__link--active {
            font-weight: 600;
            color: var(--color-sec-900);
            background-color: rgba(255, 255, 255, 0.1);
        }

        .lg-drawer__link--active:hover {
            color: var(--color-sec-900);
        }

        .lg-drawer__dot {
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background-color: var(--color-sec-900);
        }

        .lg-drawer__bottom {
            padding-top: 24px;
            border-top: 1px solid var(--color-pr-800);
        }

        .lg-drawer__login {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 12px 16px;
            border-radius: 14px;
            background-color: var(--color-sec-900);
            color: var(--color-pr-900);
            font-size: 12px;
            font-weight: 600;
            line-height: 17.1429px;
            letter-spacing: 0.025em;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
            text-decoration: none;
            transition: background-color 0.2s ease;
        }

        .lg-drawer__login:hover {
            background-color: var(--color-sec-800);
        }

        .lg-drawer__account {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .lg-drawer__account-head {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0 4px;
            min-width: 0;
        }

        .lg-drawer__account-head .lg-avatar {
            width: 40px;
            height: 40px;
            border-color: var(--color-pr-600);
        }

        .lg-drawer__account-info {
            min-width: 0;
            flex: 1;
        }

        .lg-drawer__account-name {
            font-size: 12px;
            font-weight: 600;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .lg-drawer__account-email {
            font-size: 10px;
            color: var(--color-neu-300);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .lg-drawer__role {
            display: inline-block;
            margin-top: 4px;
            padding: 2px 8px;
            border-radius: 999px;
            background-color: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        .lg-drawer__account-links {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding-top: 8px;
        }

        .lg-drawer__account-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 14px;
            font-size: 10px;
            font-weight: 500;
            color: var(--color-neu-200);
            text-decoration: none;
            transition: color 0.2s ease, background-color 0.2s ease;
            width: 100%;
            border: none;
            background: none;
            font-family: inherit;
            cursor: pointer;
            text-align: left;
        }

        .lg-drawer__account-link:hover {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.1);
        }

        .lg-drawer__account-link--danger {
            color: #f87171;
        }

        .lg-drawer__account-link--danger:hover {
            color: #fca5a5;
            background-color: rgba(239, 68, 68, 0.1);
        }

        /* ── MAIN CONTENT (HERO ERROR) ───────────────────────── */
        .lg-main {
            flex: 1 0 auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 48px 16px;
            position: relative;
            background-color: var(--color-bg-900);
        }

        @media (min-width: 640px) {
            .lg-main {
                padding: 64px 24px;
            }
        }

        .lg-error-hero {
            width: 100%;
            max-width: 960px;
            display: grid;
            grid-template-columns: minmax(0, 460px) minmax(0, 440px);
            align-items: center;
            justify-content: center;
            gap: clamp(24px, 3.5vw, 48px);
            position: relative;
            z-index: 2;
            text-align: left;
        }

        @media (max-width: 959px) {
            .lg-error-hero {
                grid-template-columns: 1fr;
                justify-items: center;
                gap: 8px;
                text-align: center;
            }
        }

        .lg-error-art {
            width: 100%;
            max-width: 460px;
        }

        .lg-card {
            animation-duration: 12s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            will-change: transform, opacity;
        }

        .lg-card--1 {
            animation-name: card-remove-1;
        }

        .lg-card--2 {
            animation-name: card-remove-2;
        }

        .lg-card--3 {
            animation-name: card-remove-3;
        }

        .lg-crane-x {
            animation: trolley-travel 12s ease-in-out infinite;
            will-change: transform;
        }

        .lg-crane-cable {
            animation: cable-length 12s ease-in-out infinite;
            transform: scaleY(0.15);
            transform-box: fill-box;
            transform-origin: 50% 0;
            will-change: transform;
        }

        .lg-gear-1 {
            transform-origin: 0 0;
            animation: lg-gear-cw 14s linear infinite;
        }

        .lg-gear-2 {
            transform-origin: 0 0;
            animation: lg-gear-ccw 10s linear infinite;
        }

        .lg-cursor {
            animation: lg-blink 1.1s steps(2, start) infinite;
        }

        .lg-status-dot {
            transform-box: fill-box;
            transform-origin: center;
            animation: lg-dot-pulse 2s ease-in-out infinite;
        }

        .lg-error-art svg {
            display: block;
            width: 100%;
            height: auto;
        }

        .lg-error-content {
            width: 100%;
            max-width: 460px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        @media (max-width: 959px) {
            .lg-error-content {
                align-items: center;
            }
        }

        .lg-error-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 5px 14px;
            border-radius: 999px;
            background-color: rgba(10, 28, 62, 0.04);
            border: 1px solid rgba(10, 28, 62, 0.08);
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--color-pr-900);
            margin-bottom: 16px;
        }

        .lg-error-title {
            width: 100%;
            font-size: clamp(28px, 3.2vw, 38px);
            font-weight: 800;
            line-height: 1.2;
            letter-spacing: -0.025em;
            text-wrap: balance;
            color: var(--color-pr-900);
            margin-bottom: 12px;
        }

        .lg-error-description {
            width: 100%;
            max-width: 460px;
            font-size: 15.5px;
            line-height: 1.7;
            text-wrap: pretty;
            color: var(--color-neu-700);
            margin-bottom: 28px;
        }

        .lg-error-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
        }

        @media (max-width: 959px) {
            .lg-error-actions {
                justify-content: center;
            }
        }

        .lg-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            height: 44px;
            padding: 0 22px;
            border-radius: 10px;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            line-height: 1;
            text-decoration: none;
            cursor: pointer;
            transition:
                box-shadow 0.18s ease,
                background-color 0.18s ease,
                border-color 0.18s ease;
            outline: none;
            user-select: none;
        }

        .lg-btn svg {
            flex-shrink: 0;
        }

        /* Strict Focus Rule: No dark/black harsh outlines, soft subtle ring only */
        .lg-btn:focus-visible {
            border-color: var(--color-neu-200);
            box-shadow: 0 0 0 3px rgba(10, 28, 62, 0.08);
        }

        .lg-btn--primary {
            background-color: var(--color-pr-900);
            color: #ffffff;
            border: 1px solid var(--color-pr-900);
            box-shadow: 0 1px 3px rgba(10, 28, 62, 0.1), 0 4px 12px -2px rgba(10, 28, 62, 0.12);
        }

        .lg-btn--primary:hover {
            background-color: var(--color-pr-800);
            border-color: var(--color-pr-800);
        }

        .lg-btn--secondary {
            background-color: #ffffff;
            color: var(--color-pr-900);
            border: 1px solid var(--color-neu-100);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .lg-btn--secondary:hover {
            background-color: var(--color-bg-900);
            border-color: var(--color-neu-200);
        }

        .lg-error-note {
            display: block;
            width: 100%;
            max-width: 460px;
            font-size: 13px;
            font-style: italic;
            line-height: 1.6;
            color: var(--color-pr-900);
            text-align: left;
            margin-top: 24px;
        }

        /* ── KEYFRAMES ───────────────────────────────────────── */
        /* Each container is hooked, lifted, carried to the left end of the jib,
           and dropped. The trolley waits while the card falls, then returns
           with the cable retracted. The cable only extends again once the
           trolley is back on the right. Each card owns one third of the loop. */
        @keyframes card-remove-1 {
            0% {
                opacity: 0;
                transform: translate(0, 0);
            }
            2%,
            6% {
                opacity: 1;
                transform: translate(0, 0);
            }
            11%,
            12.25% {
                opacity: 1;
                transform: translate(0, -14px);
            }
            20.417%,
            21.667% {
                opacity: 1;
                transform: translate(-300px, -14px);
                animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
                opacity: 0;
                transform: translate(-300px, 92px);
            }
            100% {
                opacity: 0;
                transform: translate(-300px, 92px);
            }
        }

        @keyframes card-remove-2 {
            0% {
                opacity: 0;
                transform: translate(0, 0);
            }
            2%,
            39.333% {
                opacity: 1;
                transform: translate(0, 0);
            }
            44.333%,
            45.583% {
                opacity: 1;
                transform: translate(0, -54px);
            }
            53.75%,
            55% {
                opacity: 1;
                transform: translate(-300px, -54px);
                animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            58.333% {
                opacity: 0;
                transform: translate(-300px, 52px);
            }
            100% {
                opacity: 0;
                transform: translate(-300px, 52px);
            }
        }

        @keyframes card-remove-3 {
            0% {
                opacity: 0;
                transform: translate(0, 0);
            }
            2%,
            72.667% {
                opacity: 1;
                transform: translate(0, 0);
            }
            77.667%,
            78.917% {
                opacity: 1;
                transform: translate(0, -94px);
            }
            87.083%,
            88.333% {
                opacity: 1;
                transform: translate(-300px, -94px);
                animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            91.667% {
                opacity: 0;
                transform: translate(-300px, 12px);
            }
            100% {
                opacity: 0;
                transform: translate(-300px, 12px);
            }
        }

        /* The trolley follows the active container, waits while it is dropped,
           then returns with the cable retracted. */
        @keyframes trolley-travel {
            0%,
            12.25% {
                transform: translateX(0);
            }
            20.417%,
            25% {
                transform: translateX(-300px);
            }
            33.333%,
            45.583% {
                transform: translateX(0);
            }
            53.75%,
            58.333% {
                transform: translateX(-300px);
            }
            66.667%,
            78.917% {
                transform: translateX(0);
            }
            87.083%,
            91.667% {
                transform: translateX(-300px);
            }
            100% {
                transform: translateX(0);
            }
        }

        /* The cable is retracted during travel, drop, and return. It only
           extends once the trolley is back on the right, then retracts again
           as the next container is lifted. */
        @keyframes cable-length {
            0% {
                transform: scaleY(0);
            }
            5%,
            6% {
                transform: scaleY(0.15);
            }
            11%,
            33.333% {
                transform: scaleY(0);
            }
            38.333%,
            39.333% {
                transform: scaleY(0.57);
            }
            44.333%,
            66.667% {
                transform: scaleY(0);
            }
            71.667%,
            72.667% {
                transform: scaleY(1);
            }
            77.667%,
            100% {
                transform: scaleY(0);
            }
        }

        @keyframes lg-gear-cw {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes lg-gear-ccw {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(-360deg);
            }
        }

        @keyframes lg-blink {
            0%,
            49% {
                opacity: 1;
            }
            50%,
            100% {
                opacity: 0;
            }
        }

        @keyframes lg-dot-pulse {
            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.45;
                transform: scale(0.85);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .lg-card,
            .lg-crane-x,
            .lg-crane-cable,
            .lg-gear-1,
            .lg-gear-2,
            .lg-cursor,
            .lg-status-dot {
                animation: none !important;
            }
        }

        @media (max-width: 959px) {
            .lg-error-art {
                max-width: 400px;
            }
        }

        @media (max-width: 480px) {
            .lg-error-actions {
                flex-direction: column;
            }

            .lg-btn {
                width: 100%;
            }

            .lg-error-note {
                text-align: center;
            }

            .lg-error-note svg {
                display: none;
            }
        }

        @media (max-width: 400px) {
            .lg-error-art {
                max-width: 300px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .lg-card {
                animation: none !important;
            }

            .lg-btn {
                transition: none !important;
            }
        }

        /* ── FOOTER ─────────────────────────────────────────── */
        .lg-footer {
            width: 100%;
            min-height: 386px;
            background-color: var(--color-pr-900);
            color: #ffffff;
            position: relative;
            overflow: hidden;
            user-select: none;
            z-index: 10;
        }

        /* Endless Clouds SVG Pattern Overlay */
        .lg-footer__pattern {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.12;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23ffffff' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: repeat;
            background-size: 56px 28px;
        }

        .lg-footer__inner {
            position: relative;
            z-index: 1;
            padding-top: 41px;
            padding-bottom: 32px;
            min-height: 386px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .lg-footer__grid {
            display: flex;
            flex-direction: column;
            gap: 40px;
            min-height: 240px;
        }

        @media (min-width: 768px) {
            .lg-footer__grid {
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-start;
                gap: 0;
            }
        }

        .lg-footer__col-brand {
            width: 100%;
        }

        @media (min-width: 768px) {
            .lg-footer__col-brand {
                width: 354px;
                flex-shrink: 0;
            }
        }

        .lg-footer__logo-link {
            display: inline-flex;
            align-items: center;
            color: inherit;
            text-decoration: none;
            margin-bottom: 16px;
        }

        .lg-footer__logo-link img {
            height: 26px;
            width: auto;
            display: block;
        }

        @media (min-width: 640px) {
            .lg-footer__logo-link img {
                height: 28px;
            }
        }

        .lg-footer__desc {
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            color: rgba(255, 255, 255, 0.8);
            text-align: justify;
            margin-bottom: 16px;
        }

        .lg-footer__socials {
            display: flex;
            align-items: center;
            gap: 12px;
            padding-top: 8px;
        }

        .lg-footer__social-circle {
            width: 36px;
            height: 36px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.8);
        }

        .lg-footer__col-nav {
            width: 100%;
        }

        @media (min-width: 768px) {
            .lg-footer__col-nav {
                width: 98px;
                flex-shrink: 0;
            }
        }

        .lg-footer__title {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #ffffff;
            margin-bottom: 16px;
        }

        .lg-footer__list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .lg-footer__link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            transition: color 0.15s ease;
        }

        .lg-footer__link:hover {
            color: #ffffff;
        }

        .lg-footer__link--active {
            color: #ffffff;
            font-weight: 500;
        }

        .lg-footer__link--disabled {
            color: rgba(255, 255, 255, 0.4);
            cursor: default;
        }

        .lg-footer__col-contact {
            width: 100%;
        }

        @media (min-width: 768px) {
            .lg-footer__col-contact {
                width: 168px;
                flex-shrink: 0;
            }
        }

        .lg-footer__contact-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .lg-footer__contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
        }

        .lg-footer__contact-item svg {
            color: rgba(255, 255, 255, 0.6);
            flex-shrink: 0;
        }

        .lg-footer__bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 48px;
            padding-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
        }

        @media (min-width: 640px) {
            .lg-footer__bottom {
                flex-direction: row;
            }
        }

        .lg-footer__legal {
            display: flex;
            align-items: center;
            gap: 24px;
        }

        .lg-footer__legal-item {
            color: rgba(255, 255, 255, 0.4);
            cursor: default;
        }
    </style>
</head>
<body>
    {{-- Toggle drawer mobile (CSS-only, tidak bergantung pada JavaScript) --}}
    <input class="lg-menu-toggle" type="checkbox" id="lg-mobile-menu" tabindex="0" aria-label="Buka menu navigasi">

    {{-- Header / Navbar Publik (mengikuti Navbar React di PublicLayout) --}}
    <header class="lg-header">
        <div class="page-container lg-header__inner">
            <a class="lg-brand" href="{{ $homeUrl }}" aria-label="{{ $appName }}">
                <img src="{{ asset('logo.svg') }}" alt="{{ $appName }}" width="110" height="27">
            </a>

            <nav class="lg-nav" aria-label="Menu Utama">
                <a class="lg-nav__link {{ $isHomePath ? 'lg-nav__link--active' : '' }}" href="{{ $homeUrl }}" @if ($isHomePath) aria-current="page" @endif>Beranda</a>
                <a class="lg-nav__link {{ $isRegulasiPath ? 'lg-nav__link--active' : '' }}" href="{{ $regulasiUrl }}" @if ($isRegulasiPath) aria-current="page" @endif>Regulasi</a>
                <span class="lg-nav__link lg-nav__link--disabled" title="Segera Hadir" aria-disabled="true">Langganan</span>
                <span class="lg-nav__link lg-nav__link--disabled" title="Segera Hadir" aria-disabled="true">Tentang</span>
            </nav>

            {{-- Desktop: admin -> pill DASHBOARD, user -> avatar dropdown trigger,
                 tamu -> pill LOGIN. Sama dengan Navbar React. --}}
            <div class="lg-header__actions">
                @if ($navIsAdmin)
                    <a class="lg-login-btn" href="{{ $navUserUrl }}" title="{{ $navUserName }}">
                        <span>DASHBOARD</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                    </a>
                @elseif ($navUser)
                    <a class="lg-avatar-btn" href="{{ url('/profile') }}" title="{{ $navUserName }}" aria-label="Pengaturan profil {{ $navUserName }}">
                        <span class="lg-avatar" @if ($navAvatarUrl) style="background-image: url('{{ $navAvatarUrl }}')" @endif>
                            @unless ($navAvatarUrl)
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            @endunless
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-neu-700)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </a>
                @else
                    <a class="lg-login-btn" href="{{ $loginUrl }}">
                        <span>LOGIN</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                    </a>
                @endif
            </div>

            {{-- Mobile: avatar (bila login) + hamburger, sama dengan Navbar React --}}
            <div class="lg-header__mobile">
                @if ($navUser)
                    <a class="lg-avatar-btn" href="{{ url('/profile') }}" title="{{ $navUserName }}" aria-label="Pengaturan profil {{ $navUserName }}">
                        <span class="lg-avatar lg-avatar--sm" @if ($navAvatarUrl) style="background-image: url('{{ $navAvatarUrl }}')" @endif>
                            @unless ($navAvatarUrl)
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            @endunless
                        </span>
                    </a>
                @endif

                <label class="lg-hamburger" for="lg-mobile-menu" title="Buka menu navigasi">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                    </svg>
                </label>
            </div>
        </div>
    </header>

    {{-- Drawer navigasi mobile --}}
    <div class="lg-drawer">
        <label class="lg-drawer__backdrop" for="lg-mobile-menu" aria-label="Tutup menu"></label>

        <div class="lg-drawer__panel">
            <div class="lg-drawer__top">
                <div class="lg-drawer__head">
                    <a class="lg-brand" href="{{ $homeUrl }}" aria-label="{{ $appName }}">
                        <img src="{{ asset('logo-white.svg') }}" alt="{{ $appName }}" width="110" height="27">
                    </a>

                    <label class="lg-drawer__close" for="lg-mobile-menu" title="Tutup menu">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </label>
                </div>

                <nav class="lg-drawer__nav" aria-label="Menu Utama Mobile">
                    <a class="lg-drawer__link {{ $isHomePath ? 'lg-drawer__link--active' : '' }}" href="{{ $homeUrl }}">
                        <span>Beranda</span>
                        @if ($isHomePath)<span class="lg-drawer__dot" aria-hidden="true"></span>@endif
                    </a>
                    <a class="lg-drawer__link {{ $isRegulasiPath ? 'lg-drawer__link--active' : '' }}" href="{{ $regulasiUrl }}">
                        <span>Regulasi</span>
                        @if ($isRegulasiPath)<span class="lg-drawer__dot" aria-hidden="true"></span>@endif
                    </a>
                    <span class="lg-drawer__link" aria-disabled="true">Langganan</span>
                    <span class="lg-drawer__link" aria-disabled="true">Tentang</span>
                </nav>
            </div>

            <div class="lg-drawer__bottom">
                @if ($navUser)
                    <div class="lg-drawer__account">
                        <div class="lg-drawer__account-head">
                            <span class="lg-avatar" @if ($navAvatarUrl) style="background-image: url('{{ $navAvatarUrl }}')" @endif>
                                @unless ($navAvatarUrl)
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                @endunless
                            </span>
                            <div class="lg-drawer__account-info">
                                <p class="lg-drawer__account-name">{{ $navUserName }}</p>
                                <p class="lg-drawer__account-email">{{ $navUser->email }}</p>
                                <span class="lg-drawer__role">{{ $navUser->role }}</span>
                            </div>
                        </div>

                        <div class="lg-drawer__account-links">
                            @if ($navIsAdmin)
                                <a class="lg-drawer__account-link" href="{{ $navUserUrl }}">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                        <polyline points="10 17 15 12 10 7"></polyline>
                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                    </svg>
                                    <span>Dashboard Admin</span>
                                </a>
                            @else
                                <a class="lg-drawer__account-link" href="{{ url('/profile') }}">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <span>Pengaturan Profil</span>
                                </a>
                            @endif

                            @if ($csrfToken)
                                <form method="POST" action="{{ url('/logout') }}">
                                    <input type="hidden" name="_token" value="{{ $csrfToken }}">
                                    <button type="submit" class="lg-drawer__account-link lg-drawer__account-link--danger">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        <span>Keluar (Log Out)</span>
                                    </button>
                                </form>
                            @endif
                        </div>
                    </div>
                @else
                    <a class="lg-drawer__login" href="{{ $loginUrl }}">
                        <span>Layanan (Login)</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                    </a>
                @endif
            </div>
        </div>
    </div>

    {{-- Main Area / Error Content --}}
    <main class="lg-main" role="alert" aria-labelledby="error-title">
        <div class="page-container lg-error-hero">
            <div class="lg-error-art" aria-hidden="true">
                <svg viewBox="0 0 520 480" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
                    {{-- Latar lingkaran lembut --}}
                    <circle cx="260" cy="248" r="208" fill="#e3eaf2"/>

                    {{-- Bobot penyeimbang di atas ujung kiri balok (counter-jib),
                         dipisahkan dari jalur angkut agar tidak tertabrak kartu. --}}
                    <rect x="58" y="48" width="46" height="20" rx="4" fill="#3b4965"/>

                    {{-- Derek --}}
                    <g stroke="#546078" stroke-linecap="round">
                        <rect x="62" y="68" width="366" height="9" rx="4.5" fill="#546078" stroke="none"/>
                        <rect x="74" y="92" width="342" height="7" rx="3.5" fill="#3b4965" stroke="none"/>
                        <path d="M74 92 96 77M120 92l22-15M166 92l22-15M212 92l22-15M258 92l22-15M304 92l22-15M350 92l22-15M396 92l20-13" stroke-width="4"/>
                        <path d="M120 99v271M152 99v271" stroke-width="8"/>
                        <path d="M120 130l32 30-32 30 32 30-32 30 32 30-32 30 32 30-32 30" stroke-width="4"/>
                    </g>

                    {{-- Kabel derek yang bergerak mengikuti troli --}}
                    <g class="lg-crane-x">
                        <rect class="lg-crane-cable" x="378" y="111" width="2" height="94" fill="#9da4b2"/>
                    </g>

                    {{-- Beban derek: tiap kartu naik ke balok, bergeser ke kiri, lalu jatuh dan memudar --}}
                    <g font-family="Inter, Arial, sans-serif" font-size="12" font-weight="600" fill="#233351" text-anchor="middle">
                        <g transform="translate(0 -8)">
                            <g class="lg-card lg-card--1">
                                <rect x="371" y="133" width="16" height="10" rx="2" fill="#9da4b2"/>
                                <rect x="343" y="140" width="72" height="28" rx="4" fill="#ffffff" stroke="#ced2d8"/>
                                <text x="379" y="159">Task</text>
                            </g>
                            <g class="lg-card lg-card--2">
                                <rect x="371" y="173" width="16" height="10" rx="2" fill="#9da4b2"/>
                                <rect x="343" y="180" width="72" height="28" rx="4" fill="#ffffff" stroke="#ced2d8"/>
                                <text x="379" y="199">&lt;/&gt;</text>
                            </g>
                            <g class="lg-card lg-card--3">
                                <rect x="371" y="213" width="16" height="10" rx="2" fill="#9da4b2"/>
                                <rect x="343" y="220" width="72" height="28" rx="4" fill="#ffffff" stroke="#ced2d8"/>
                                <text x="379" y="239">Halaman</text>
                            </g>
                        </g>
                    </g>

                    {{-- Troli dan katrol di atas kontainer aktif --}}
                    <g class="lg-crane-x" fill="#3b4965">
                        <rect x="362" y="77" width="34" height="14" rx="3"/>
                        <rect x="371" y="99" width="16" height="12" rx="3"/>
                        <circle cx="379" cy="105" r="2.5" fill="#9da4b2"/>
                    </g>

                    {{-- Monitor & Gir (dinaikkan posisinya) --}}
                    <g transform="translate(0, -28)">
                        {{-- Monitor --}}
                        <path d="M272 423h36l10 25h-56l10-25Z" fill="#3b4965"/>
                        <rect x="236" y="448" width="108" height="12" rx="6" fill="#233351"/>
                        <rect x="162" y="272" width="256" height="160" rx="14" fill="#3b4965"/>
                        <rect x="176" y="286" width="228" height="118" rx="8" fill="#0a1c3e"/>
                        <circle class="lg-status-dot" cx="190" cy="298" r="4" fill="#d4af37"/>
                        <circle cx="203" cy="298" r="4" fill="#8590a3"/>
                        <circle cx="216" cy="298" r="4" fill="#4d5c78"/>
                        <text x="390" y="302" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="9" fill="#8590a3">app.tsx</text>

                        <g font-family="'SFMono-Regular', Consolas, 'Liberation Mono', monospace" font-size="12">
                            <text x="192" y="330" fill="#7f8ba1">1</text>
                            <text x="208" y="330"><tspan fill="#d4af37">const</tspan><tspan fill="#e7e8ec"> status = </tspan><tspan fill="#d4af37">{{ $statusCode }}</tspan><tspan fill="#9da4b2">;</tspan></text>
                            <text x="192" y="350" fill="#7f8ba1">2</text>
                            <text x="208" y="350"><tspan fill="#e7e8ec">page.</tspan><tspan fill="#d4af37">unavailable</tspan><tspan fill="#9da4b2">();</tspan></text>
                            <text x="192" y="370" fill="#7f8ba1">3</text>
                            <rect class="lg-cursor" x="208" y="361" width="7" height="12" rx="1" fill="#d4af37"/>
                        </g>

                        {{-- Gir dekoratif berputar --}}
                        <g fill="#6c778b">
                            <g transform="translate(416 428)">
                                <g class="lg-gear-1">
                                    <rect x="-5" y="-30" width="10" height="60" rx="5"/>
                                    <rect x="-5" y="-30" width="10" height="60" rx="5" transform="rotate(45)"/>
                                    <rect x="-5" y="-30" width="10" height="60" rx="5" transform="rotate(90)"/>
                                    <rect x="-5" y="-30" width="10" height="60" rx="5" transform="rotate(135)"/>
                                    <circle r="23"/>
                                    <circle r="9" fill="#e3eaf2"/>
                                </g>
                            </g>
                            <g transform="translate(446 392)">
                                <g class="lg-gear-2">
                                    <rect x="-4" y="-22" width="8" height="44" rx="4"/>
                                    <rect x="-4" y="-22" width="8" height="44" rx="4" transform="rotate(45)"/>
                                    <rect x="-4" y="-22" width="8" height="44" rx="4" transform="rotate(90)"/>
                                    <rect x="-4" y="-22" width="8" height="44" rx="4" transform="rotate(135)"/>
                                    <circle r="17"/>
                                    <circle r="6.5" fill="#e3eaf2"/>
                                </g>
                            </g>
                        </g>

                        <circle cx="458" cy="446" r="6" fill="#b5bbc5"/>
                    </g>
                </svg>
            </div>

            <div class="lg-error-content">
                <div class="lg-error-badge">
                    <span>Error {{ $statusCode }}</span>
                </div>

                <h1 class="lg-error-title" id="error-title">{{ $statusTitle }}</h1>
                <p class="lg-error-description">{{ $statusDescription }}</p>

                <div class="lg-error-actions">
                    @if ($primaryUrl)
                        <a class="lg-btn lg-btn--primary" href="{{ $primaryUrl }}">
                            @if (str_contains(strtolower($primaryLabel), 'masuk'))
                                <svg class="lg-btn__icon lg-btn__icon--login" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                            @endif
                            {{ $primaryLabel }}
                        </a>

                        <a class="lg-btn lg-btn--secondary" href="{{ $homeUrl }}">
                            <svg class="lg-btn__icon lg-btn__icon--home" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <path d="M9 22V12h6v10"></path>
                            </svg>
                            Kembali ke Beranda
                        </a>
                    @else
                        <a class="lg-btn lg-btn--primary" href="{{ $homeUrl }}">
                            <svg class="lg-btn__icon lg-btn__icon--home" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <path d="M9 22V12h6v10"></path>
                            </svg>
                            Kembali ke Beranda
                        </a>
                    @endif
                </div>

                <p class="lg-error-note">
                    <span>Butuh bantuan? Hubungi administrator LawGates jika masalah terus berlanjut.</span>
                </p>
            </div>
        </div>
    </main>

    {{-- Footer Publik --}}
    <footer class="lg-footer">
        <div class="lg-footer__pattern" aria-hidden="true"></div>

        <div class="page-container lg-footer__inner">
            <div class="lg-footer__grid">
                {{-- Kolom Kiri: Brand & Deskripsi --}}
                <div class="lg-footer__col-brand">
                    <a class="lg-footer__logo-link" href="{{ $homeUrl }}" aria-label="Beranda {{ $appName }}">
                        <img src="{{ asset('logo-white.svg') }}" alt="{{ $appName }}" width="110" height="28">
                    </a>
                    <p class="lg-footer__desc">
                        LawGates adalah platform pangkalan data hukum terpadu yang merangkum seluruh peraturan perundang-undangan di Indonesia ke dalam satu titik akses pencarian tanpa harus menelusuri puluhan portal instansi pemerintah yang terpisah.
                    </p>
                    <div class="lg-footer__socials">
                        <div class="lg-footer__social-circle" aria-label="Email LawGates">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                        </div>
                        <div class="lg-footer__social-circle" aria-label="Instagram LawGates">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
                        </div>
                        <div class="lg-footer__social-circle" aria-label="Telepon LawGates">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {{-- Kolom Tengah: Jelajahi --}}
                <div class="lg-footer__col-nav">
                    <h4 class="lg-footer__title">JELAJAHI</h4>
                    <ul class="lg-footer__list">
                        <li>
                            <a class="lg-footer__link {{ $isHomePath ? 'lg-footer__link--active' : '' }}" href="{{ $homeUrl }}" @if ($isHomePath) aria-current="page" @endif>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                <span>Beranda</span>
                            </a>
                        </li>
                        <li>
                            <a class="lg-footer__link {{ $isRegulasiPath ? 'lg-footer__link--active' : '' }}" href="{{ $regulasiUrl }}" @if ($isRegulasiPath) aria-current="page" @endif>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                <span>Regulasi</span>
                            </a>
                        </li>
                        <li>
                            <span class="lg-footer__link lg-footer__link--disabled">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                <span>Langganan</span>
                            </span>
                        </li>
                        <li>
                            <span class="lg-footer__link lg-footer__link--disabled">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                <span>Tentang</span>
                            </span>
                        </li>
                    </ul>
                </div>

                {{-- Kolom Kanan: Kontak --}}
                <div class="lg-footer__col-contact">
                    <h4 class="lg-footer__title">KONTAK</h4>
                    <ul class="lg-footer__contact-list">
                        <li class="lg-footer__contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                            <span>lawgates@gmail.com</span>
                        </li>
                        <li class="lg-footer__contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
                            <span>@lawgates</span>
                        </li>
                        <li class="lg-footer__contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>081365638</span>
                        </li>
                    </ul>
                </div>
            </div>

            {{-- Divider & Hak Cipta --}}
            <div class="lg-footer__bottom">
                <p>&copy; {{ date('Y') }} LAWGATES. Hak Cipta Dilindungi.</p>
                <div class="lg-footer__legal">
                    <span class="lg-footer__legal-item">Syarat & Ketentuan</span>
                    <span class="lg-footer__legal-item">Kebijakan Privasi</span>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>



