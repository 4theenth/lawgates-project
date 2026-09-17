<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
        <script>
            window.onerror = function(message, source, lineno, colno, error) {
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;z-index:9999;background:#b91c1c;color:white;padding:20px;width:100vw;height:100vh;overflow:auto;"><h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">JavaScript Error</h2><pre style="white-space:pre-wrap;font-family:monospace;">' + message + '\n\n' + (error ? error.stack : '') + '</pre></div>';
            };
            window.addEventListener('unhandledrejection', function(event) {
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;z-index:9999;background:#b91c1c;color:white;padding:20px;width:100vw;height:100vh;overflow:auto;"><h2 style="font-size:24px;font-weight:bold;margin-bottom:10px;">Unhandled Promise Rejection</h2><pre style="white-space:pre-wrap;font-family:monospace;">' + (event.reason && event.reason.stack ? event.reason.stack : event.reason) + '</pre></div>';
            });
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
