import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { ToastProvider } from '@/hooks/useToast';

// ─────────────────────────────────────────────────────────────
// DOM Node Safeguard
// ─────────────────────────────────────────────────────────────
// Mencegah error runtime "NotFoundError: Failed to execute 'removeChild' on 'Node'"
// yang dipicu oleh script pihak ketiga (seperti Google GSI / @react-oauth/google,
// ekstensi browser, atau Google Translate) saat unmount komponen / HMR / navigasi.
if (typeof window !== 'undefined' && typeof Node !== 'undefined' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (child && child.parentNode !== this) {
            if (child.parentNode) {
                return child.parentNode.removeChild(child) as T;
            }
            return child;
        }
        return originalRemoveChild.apply(this, [child]) as T;
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
        if (referenceNode && referenceNode.parentNode !== this) {
            if (referenceNode.parentNode) {
                return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
            }
            return this.appendChild(newNode) as T;
        }
        return originalInsertBefore.apply(this, [newNode, referenceNode]) as T;
    };
}

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
        const initialFlash = (props.initialPage.props as any)?.flash;

        root.render(
            <GoogleOAuthProvider clientId={googleClientId}>
                <ToastProvider initialFlash={initialFlash}>
                    <App {...props} />
                </ToastProvider>
            </GoogleOAuthProvider>
        );
    },
    progress: {
        color: '#D4AF37',
    },
});