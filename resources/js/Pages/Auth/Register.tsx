import React, { FormEventHandler, useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import axios from 'axios';
import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard, FormInput } from '@/Components/common';
import { Icon } from '@/Components/ui/icon';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@/hooks/useToast';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const [emailValid, setEmailValid] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [checkingPhone, setCheckingPhone] = useState(false);

    const validateEmail = (val: string) => {
        const trimmed = val.trim();
        if (!trimmed) {
            setError('email', 'Email wajib diisi.');
            return false;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
            setError('email', 'Format email tidak valid (harus mengandung @ dan domain yang benar).');
            return false;
        }
        clearErrors('email');
        return true;
    };

    const validatePassword = (val: string) => {
        if (!val) {
            setError('password', 'Kata sandi wajib diisi.');
            return false;
        }
        if (val.length < 8) {
            setError('password', 'Panjang kata sandi minimal 8 karakter.');
            return false;
        }
        clearErrors('password');
        return true;
    };

    const validatePasswordConfirmation = (confirmVal: string, passVal: string) => {
        if (!confirmVal) {
            setError('password_confirmation', 'Konfirmasi kata sandi wajib diisi.');
            return false;
        }
        if (confirmVal !== passVal) {
            setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
            return false;
        }
        clearErrors('password_confirmation');
        return true;
    };

    const handleCheckEmail = async () => {
        if (!validateEmail(data.email)) return;
        setCheckingEmail(true);
        try {
            await axios.post('/check-email', { email: data.email });
            setEmailValid(true);
            clearErrors('email');
        } catch (error: any) {
            setEmailValid(false);
            if (error.response?.data?.errors?.email) {
                setError('email', error.response.data.errors.email[0]);
            } else {
                setError('email', 'Terjadi kesalahan saat memeriksa email.');
            }
        } finally {
            setCheckingEmail(false);
        }
    };

    const handleCheckPhone = async () => {
        if (!validatePhone(data.phone)) return;
        setCheckingPhone(true);
        try {
            await axios.post('/check-phone', { phone: data.phone });
            setPhoneValid(true);
            clearErrors('phone');
        } catch (error: any) {
            setPhoneValid(false);
            if (error.response?.data?.errors?.phone) {
                setError('phone', error.response.data.errors.phone[0]);
            } else {
                setError('phone', 'Terjadi kesalahan saat memeriksa nomor telepon.');
            }
        } finally {
            setCheckingPhone(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (data.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email.trim())) {
                handleCheckEmail();
            }
        }, 800);
        return () => clearTimeout(timeout);
    }, [data.email]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (data.phone && /^[0-9+]+$/.test(data.phone.trim()) && data.phone.trim().length >= 9) {
                handleCheckPhone();
            }
        }, 800);
        return () => clearTimeout(timeout);
    }, [data.phone]);

    const hasCapital = /[A-Z]/.test(data.password);
    const hasMinLength = data.password.length >= 8;
    const hasNumberOrSymbol = /[0-9]/.test(data.password) || /[^a-zA-Z0-9]/.test(data.password);

    const validatePhone = (val: string) => {
        const trimmed = val.trim();
        if (!trimmed) {
            setError('phone', 'Nomor telepon wajib diisi.');
            return false;
        }
        if (!/^[0-9+]+$/.test(trimmed)) {
            setError('phone', 'Nomor telepon hanya boleh berisi angka dan tanda plus (+).');
            return false;
        }
        if (trimmed.length < 9 || trimmed.length > 20) {
            setError('phone', 'Panjang nomor telepon harus antara 9-20 karakter.');
            return false;
        }
        clearErrors('phone');
        return true;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (checkingEmail || checkingPhone) {
            // Wait for checks to complete
            return;
        }

        let hasError = false;
        if (!data.name.trim()) {
            setError('name', 'Nama wajib diisi.');
            hasError = true;
        }

        if (!validateEmail(data.email)) {
            hasError = true;
        } else if (!emailValid) {
            setError('email', 'Menunggu validasi email atau format salah.');
            hasError = true;
        }

        if (!validatePhone(data.phone)) {
            hasError = true;
        } else if (!phoneValid) {
            setError('phone', 'Menunggu validasi nomor telepon atau format salah.');
            hasError = true;
        }

        if (!validatePassword(data.password)) {
            hasError = true;
        } else if (!hasCapital || !hasMinLength || !hasNumberOrSymbol) {
            setError('password', 'Kata sandi belum memenuhi ketentuan.');
            hasError = true;
        }

        if (!validatePasswordConfirmation(data.password_confirmation, data.password)) {
            hasError = true;
        }

        if (hasError) return;

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const { toast } = useToast();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            router.post('/auth/google/callback', {
                access_token: tokenResponse.access_token,
                remember: true
            }, {
                onSuccess: () => {
                    toast.success('Berhasil', 'Berhasil mendaftar / masuk dengan Google');
                },
                onError: () => {
                    toast.error('Gagal', 'Terjadi kesalahan saat verifikasi login Google');
                }
            });
        },
        onError: () => {
            toast.error('Gagal', 'Pendaftaran dengan Google dibatalkan atau gagal');
        }
    });

    return (
        <GuestLayout>
            <Head title="Daftar Akun" />

            <AuthCard
                title="Daftar Akun"
                subtitle="Lengkapi formulir di bawah ini untuk mendaftar akun LawGates"
                showSocialAuth={true}
                dividerText="Atau daftar dengan"
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
                            if (errors.name && e.target.value.trim()) clearErrors('name');
                        }}
                        onBlur={(e) => {
                            if (!e.target.value.trim()) setError('name', 'Nama wajib diisi.');
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
                        isValidated={emailValid}
                        rightIcon={
                            checkingEmail ? (
                                <Icon name="loader" className="h-5 w-5 text-neu-400 animate-spin" />
                            ) : emailValid ? (
                                <Icon name="check-circle" className="h-5 w-5 text-suc-600" />
                            ) : null
                        }
                        onChange={(e) => {
                            const val = e.target.value;
                            setData('email', val);
                            setEmailValid(false);
                            if (errors.email) {
                                if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.trim())) {
                                    clearErrors('email');
                                }
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value.trim()) {
                                validateEmail(e.target.value);
                            }
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
                        isValidated={phoneValid}
                        rightIcon={
                            checkingPhone ? (
                                <Icon name="loader" className="h-5 w-5 text-neu-400 animate-spin" />
                            ) : phoneValid ? (
                                <Icon name="check-circle" className="h-5 w-5 text-suc-600" />
                            ) : null
                        }
                        onChange={(e) => {
                            // Sanitasi otomatis: hanya izinkan angka dan plus
                            const sanitized = e.target.value.replace(/[^0-9+]/g, '');
                            setData('phone', sanitized);
                            setPhoneValid(false);
                            if (errors.phone) clearErrors('phone');
                        }}
                        onBlur={(e) => {
                            if (e.target.value.trim()) {
                                validatePhone(e.target.value);
                            }
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
                            const val = e.target.value;
                            setData('password', val);
                            if (val.length >= 8) {
                                clearErrors('password');
                            } else if (errors.password) {
                                setError('password', 'Panjang kata sandi minimal 8 karakter.');
                            }
                            if (data.password_confirmation) {
                                if (data.password_confirmation === val) {
                                    clearErrors('password_confirmation');
                                } else {
                                    setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
                                }
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value) {
                                validatePassword(e.target.value);
                            }
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
                            const val = e.target.value;
                            setData('password_confirmation', val);
                            if (val) {
                                if (val !== data.password) {
                                    setError('password_confirmation', 'Konfirmasi kata sandi tidak cocok.');
                                } else {
                                    clearErrors('password_confirmation');
                                }
                            } else {
                                clearErrors('password_confirmation');
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value) {
                                validatePasswordConfirmation(e.target.value, data.password);
                            }
                        }}
                    />

                    {/* Ketentuan Kata Sandi */}
                    <div className="pt-1 space-y-1.5">
                        <p className="text-xs font-semibold text-neu-800">Ketentuan Kata Sandi:</p>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                {hasCapital ? (
                                    <Icon name="check" className="h-3.5 w-3.5 text-suc-800 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Icon name="x" className="h-3.5 w-3.5 text-neu-400 shrink-0" strokeWidth={2.5} />
                                )}
                                <span className={hasCapital ? 'text-xs text-neu-700' : 'text-xs text-neu-500'}>
                                    Menggunakan huruf Kapital
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {hasMinLength ? (
                                    <Icon name="check" className="h-3.5 w-3.5 text-suc-800 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Icon name="x" className="h-3.5 w-3.5 text-neu-400 shrink-0" strokeWidth={2.5} />
                                )}
                                <span className={hasMinLength ? 'text-xs text-neu-700' : 'text-xs text-neu-500'}>
                                    Minimal 8 karakter
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {hasNumberOrSymbol ? (
                                    <Icon name="check" className="h-3.5 w-3.5 text-suc-800 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Icon name="x" className="h-3.5 w-3.5 text-neu-400 shrink-0" strokeWidth={2.5} />
                                )}
                                <span className={hasNumberOrSymbol ? 'text-xs text-neu-700' : 'text-xs text-neu-500'}>
                                    Menggunakan angka atau simbol
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-pr-900 py-3 px-4 text-md font-bold tracking-wider text-white shadow-sm transition-all duration-150 hover:bg-pr-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-pr-900/30 disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                        >
                            {processing ? 'Mendaftar...' : 'DAFTAR'}
                        </button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
