import React, { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput, FormCheckbox } from '@/Components/common';

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

    const handleGoogleLogin = () => {
        // Placeholder atau integrasi Google OAuth bila route tersedia
        window.location.href = '/auth/google';
    };

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
                        error={errors.email}
                        onChange={(e) => {
                            setData('email', e.target.value);
                            if (errors.email) clearErrors('email');
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
                        error={errors.password}
                        onChange={(e) => {
                            setData('password', e.target.value);
                            if (errors.password) clearErrors('password');
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
