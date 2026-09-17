import React, { FormEventHandler } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput, FormCheckbox } from '@/Components/common';
import { Icon } from '@/Components/ui/icon';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@/hooks/useToast';

export interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword = true }: LoginProps) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });
    const { toast } = useToast();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const trimmedEmail = data.email.trim();
        let hasError = false;

        if (!trimmedEmail) {
            setError('email', 'Email wajib diisi.');
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('email', 'Email tidak valid');
            hasError = true;
        }

        if (!data.password) {
            setError('password', 'Kata sandi wajib diisi.');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            // Post the token to the backend using router
            router.post('/auth/google/callback', {
                access_token: tokenResponse.access_token,
                remember: true
            }, {
                onSuccess: () => {
                    toast.success('Berhasil', 'Berhasil login dengan Google');
                },
                onError: () => {
                    toast.error('Gagal', 'Terjadi kesalahan saat verifikasi login Google');
                }
            });
        },
        onError: () => {
            toast.error('Gagal', 'Login dengan Google dibatalkan atau gagal');
        }
    });

    const isRateLimited =
        (errors as any).auth === 'rate_limited' ||
        errors.email === 'rate_limited' ||
        (errors.email
            ? errors.email.toLowerCase().includes('terlalu banyak upaya') ||
              errors.email.toLowerCase().includes('throttle') ||
              errors.email.toLowerCase().includes('too many')
            : false);

    const isInvalidCredentials =
        !isRateLimited &&
        ((errors as any).auth === 'invalid_credentials' ||
            errors.email === 'auth_failed' ||
            errors.email === 'Email atau kata sandi tidak sesuai.' ||
            (errors.email
                ? errors.email.toLowerCase().includes('tidak sesuai') ||
                  errors.email.toLowerCase().includes('credentials') ||
                  errors.email.toLowerCase().includes('tidak dikenal') ||
                  errors.email.toLowerCase().includes('tidak cocok')
                : false));

    const emailInlineError =
        isInvalidCredentials || isRateLimited ? undefined : errors.email;
    const passwordInlineError =
        isInvalidCredentials || isRateLimited ? undefined : errors.password;

    const emailHasError = Boolean(emailInlineError || isInvalidCredentials || isRateLimited);
    const passwordHasError = Boolean(passwordInlineError || isInvalidCredentials || isRateLimited);

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <AuthCard
                title="Masuk ke akun Anda"
                subtitle="Masuk dan jelajahi berbagai hukum di Indonesia"
                showSocialAuth={true}
                onSocialClick={handleGoogleLogin}
                footerText="Belum punya akun?"
                footerLinkText="Buat akun baru"
                footerLinkHref={route('register')}
            >
                {status && (
                    <div className="mb-4 rounded-xl bg-suc-50 p-3 text-xs sm:text-sm font-medium text-suc-800 border border-suc-200">
                        {status}
                    </div>
                )}

                {/* Banner: Email / Password Salah (Image 2) */}
                {isInvalidCredentials && (
                    <div className="mb-4 rounded-xl bg-dan-50/80 p-3.5 border border-dan-100/60 flex items-start gap-3">
                        <Icon name="circle-x" className="h-5 w-5 text-dan-700 shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm">
                            <p className="font-semibold text-neu-900 leading-tight">
                                Maaf, email atau kata sandi tidak dikenal
                            </p>
                            <p className="text-neu-600 mt-0.5 text-xs">
                                cobak lagi atau{' '}
                                <Link
                                    href={route('register')}
                                    className="font-semibold text-neu-900 underline hover:text-dan-700"
                                >
                                    buat akun
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Banner: 5 Kali Gagal Login / Rate Limited (Image 3) */}
                {isRateLimited && (
                    <div className="mb-4 rounded-xl bg-dan-50/80 p-3.5 border border-dan-100/60 flex items-start gap-3">
                        <Icon name="lock" className="h-5 w-5 text-dan-700 shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm">
                            <p className="font-semibold text-neu-900 leading-tight">
                                Akses login ditangguhkan sementara
                            </p>
                            <p className="text-neu-600 mt-0.5 text-xs">
                                Anda telah 5 kali salah memasukkan email atau kata sandi. Coba lagi nanti atau{' '}
                                <Link
                                    href={route('password.request')}
                                    className="font-semibold text-neu-900 underline hover:text-dan-700"
                                >
                                    Atur ulang kata sandi
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} noValidate className="space-y-4">
                    {/* Email Field with Mail Icon */}
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        icon="mail"
                        placeholder="Masukkan email anda"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        error={emailInlineError}
                        hasError={emailHasError}
                        onChange={(e) => {
                            setData('email', e.target.value);
                            if (errors.email) clearErrors('email');
                            if ((errors as any).auth) clearErrors('auth' as any);
                        }}
                    />

                    {/* Password Field with Shield Icon and Password Toggle */}
                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Kata Sandi"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password}
                        autoComplete="current-password"
                        isPasswordToggle={true}
                        error={passwordInlineError}
                        hasError={passwordHasError}
                        onChange={(e) => {
                            setData('password', e.target.value);
                            if (errors.password) clearErrors('password');
                            if ((errors as any).auth) clearErrors('auth' as any);
                        }}
                    />

                    {/* Remember Me & Forgot Password Row */}
                    <div className="flex items-center justify-between pt-1">
                        <FormCheckbox
                            id="remember"
                            name="remember"
                            label="Ingat Saya"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-normal text-neu-700 hover:text-pr-900 hover:underline transition-colors"
                            >
                                Lupa kata sandi?
                            </Link>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-wider text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                        >
                            {processing ? 'Memproses...' : 'LOGIN'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
