import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput } from '@/Components/common';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Kata Sandi" />

            <AuthCard
                title="Konfirmasi Kata Sandi"
                subtitle="Ini adalah area aplikasi yang aman. Harap konfirmasi kata sandi Anda sebelum melanjutkan."
            >
                <form onSubmit={submit} className="space-y-4">
                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Kata Sandi"
                        icon="shield"
                        placeholder="•••••••"
                        value={data.password}
                        autoFocus
                        required
                        isPasswordToggle={true}
                        error={errors.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-normal text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Memproses...' : 'Konfirmasi'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
