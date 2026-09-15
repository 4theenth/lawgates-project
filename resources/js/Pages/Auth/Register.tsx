import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput } from '@/Components/common';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        let hasError = false;
        if (!data.name.trim()) {
            setError('name', 'Nama wajib diisi.');
            hasError = true;
        }

        const trimmedEmail = data.email.trim();
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

        if (data.password !== data.password_confirmation) {
            setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
            hasError = true;
        }

        if (hasError) return;

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google';
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun" />

            <AuthCard
                title="Daftar Akun"
                subtitle="Lengkapi formulir di bawah ini untuk mendaftar akun LawGates"
                showSocialAuth={true}
                onSocialClick={handleGoogleLogin}
                footerText="Sudah punya akun?"
                footerLinkText="Login"
                footerLinkHref={route('login')}
            >
                <form onSubmit={submit} noValidate className="space-y-4">
                    {/* Nama Field with User Icon */}
                    <FormInput
                        id="name"
                        name="name"
                        label="Nama"
                        icon="user"
                        placeholder="Masukkan nama anda"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        error={errors.name}
                        onChange={(e) => {
                            setData('name', e.target.value);
                            if (errors.name) clearErrors('name');
                        }}
                    />

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
                        error={errors.email}
                        onChange={(e) => {
                            setData('email', e.target.value);
                            if (errors.email) clearErrors('email');
                        }}
                    />

                    {/* No Telepon Field with Phone Icon */}
                    <FormInput
                        id="phone"
                        type="tel"
                        name="phone"
                        label="No Telepon"
                        icon="phone"
                        placeholder="Masukkan nomor telepon"
                        value={data.phone}
                        autoComplete="tel"
                        error={errors.phone}
                        onChange={(e) => {
                            setData('phone', e.target.value);
                            if (errors.phone) clearErrors('phone');
                        }}
                    />

                    {/* Kata Sandi Field with Shield Icon and Password Toggle */}
                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Kata Sandi"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password}
                        autoComplete="new-password"
                        isPasswordToggle={true}
                        error={errors.password}
                        onChange={(e) => {
                            setData('password', e.target.value);
                            if (errors.password) clearErrors('password');
                        }}
                    />

                    {/* Konfirmasi Kata Sandi Field with Shield Icon and Password Toggle */}
                    <FormInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        label="Konfirmasi Kata Sandi"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        isPasswordToggle={true}
                        error={errors.password_confirmation}
                        onChange={(e) => {
                            setData('password_confirmation', e.target.value);
                            if (errors.password_confirmation) clearErrors('password_confirmation');
                        }}
                    />

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-wider text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                        >
                            {processing ? 'Mendaftar...' : 'LOGIN'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
