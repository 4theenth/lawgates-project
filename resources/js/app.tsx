import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { ToastProvider } from '@/hooks/useToast';

const appName = import.meta.env.VITE_APP_NAME || 'LawGates';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com';
        root.render(
            <GoogleOAuthProvider clientId={googleClientId}>
                <ToastProvider>
                    <App {...props} />
                </ToastProvider>
            </GoogleOAuthProvider>
        );
    },
    progress: {
        color: '#D4AF37',
    },
});