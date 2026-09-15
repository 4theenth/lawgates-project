import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput } from '@/Components/common';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Atur Ulang Kata Sandi" />

            <AuthCard
                title="Atur Ulang Kata Sandi"
                subtitle="Masukkan kata sandi baru untuk akun Anda"
                footerText="Ingat kata sandi Anda?"
                footerLinkText="Kembali ke Login"
                footerLinkHref={route('login')}
            >
                <form onSubmit={submit} className="space-y-4">
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        icon="mail"
                        value={data.email}
                        autoComplete="username"
                        required
                        error={errors.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Kata Sandi Baru"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password}
                        autoComplete="new-password"
                        autoFocus
                        required
                        isPasswordToggle={true}
                        error={errors.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <FormInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        label="Konfirmasi Kata Sandi Baru"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        required
                        isPasswordToggle={true}
                        error={errors.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-normal text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Menyimpan...' : 'Atur Ulang Kata Sandi'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
