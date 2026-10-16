import React, { useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { KeyRound, Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface ProfilePasswordFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function ProfilePasswordForm({ className = '', onSuccess }: ProfilePasswordFormProps) {
  const { toast } = useToast();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    data,
    setData,
    put,
    processing,
    errors,
    reset,
    setError,
    clearErrors,
  } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  // Validasi Ketentuan Kata Sandi
  const hasCapital = /[A-Z]/.test(data.password);
  const hasMinLength = data.password.length >= 8;
  const hasNumberOrSymbol =
    /[0-9]/.test(data.password) || /[^a-zA-Z0-9]/.test(data.password);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    let hasClientError = false;
    if (!data.current_password) {
      setError('current_password', 'Password saat ini wajib diisi.');
      hasClientError = true;
    }
    if (!data.password) {
      setError('password', 'Password baru wajib diisi.');
      hasClientError = true;
    } else if (!hasMinLength || !hasCapital || !hasNumberOrSymbol) {
      setError('password', 'Password belum memenuhi ketentuan kata sandi.');
      hasClientError = true;
    }
    if (!data.password_confirmation) {
      setError('password_confirmation', 'Konfirmasi password wajib diisi.');
      hasClientError = true;
    } else if (data.password !== data.password_confirmation) {
      setError('password_confirmation', 'Konfirmasi password tidak cocok.');
      hasClientError = true;
    }

    if (hasClientError) return;

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        clearErrors();
        onSuccess?.();
      },
      onError: (errs) => {
        if (errs.current_password) {
          setError('current_password', 'Password saat ini tidak cocok.');
        }
        toast.error('Gagal memperbarui kata sandi. Periksa kembali form.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Row 1: Password Saat Ini & Password Baru */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
        {/* Field 1: Password Saat Ini */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            Password Saat Ini <span className="text-dan-900 font-semibold">*</span>
          </label>
          <div className="relative w-full">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              required
              value={data.current_password}
              onChange={(e) => {
                setData('current_password', e.target.value);
                if (errors.current_password) clearErrors('current_password');
              }}
              placeholder="Masukan password saat ini"
              className={`w-full h-10 pl-4 pr-10 py-2.5 rounded-[10px] bg-white border ${
                errors.current_password
                  ? 'border-dan-900 focus:border-dan-900'
                  : 'border-neu-100 focus:border-pr-900'
              } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                errors.current_password ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
              } transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neu-600 hover:text-neu-900 cursor-pointer"
              title={showCurrentPassword ? 'Sembunyikan' : 'Tampilkan'}
            >
              {showCurrentPassword ? (
                <Eye className="w-[18px] h-[18px] stroke-[1.5]" />
              ) : (
                <EyeOff className="w-[18px] h-[18px] stroke-[1.5]" />
              )}
            </button>
          </div>
          {errors.current_password && (
            <p className="text-[11px] text-dan-900 -mt-1">
              {errors.current_password}
            </p>
          )}
        </div>

        {/* Field 2: Password Baru */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            Password Baru <span className="text-dan-900 font-semibold">*</span>
          </label>
          <div className="relative w-full">
            <input
              type={showNewPassword ? 'text' : 'password'}
              required
              value={data.password}
              onChange={(e) => {
                setData('password', e.target.value);
                if (errors.password) clearErrors('password');
              }}
              placeholder="Masukan password baru"
              className={`w-full h-10 pl-4 pr-10 py-2.5 rounded-[10px] bg-white border ${
                errors.password
                  ? 'border-dan-900 focus:border-dan-900'
                  : 'border-neu-100 focus:border-pr-900'
              } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                errors.password ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
              } transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neu-600 hover:text-neu-900 cursor-pointer"
              title={showNewPassword ? 'Sembunyikan' : 'Tampilkan'}
            >
              {showNewPassword ? (
                <Eye className="w-[18px] h-[18px] stroke-[1.5]" />
              ) : (
                <EyeOff className="w-[18px] h-[18px] stroke-[1.5]" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-dan-900 -mt-1">{errors.password}</p>
          )}
        </div>
      </div>

      {/* Row 2: Konfirmasi Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            Konfirmasi Password <span className="text-dan-900 font-semibold">*</span>
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={data.password_confirmation}
              onChange={(e) => {
                setData('password_confirmation', e.target.value);
                if (errors.password_confirmation)
                  clearErrors('password_confirmation');
              }}
              placeholder="Konfirmasi password baru"
              className={`w-full h-10 pl-4 pr-10 py-2.5 rounded-[10px] bg-white border ${
                errors.password_confirmation
                  ? 'border-dan-900 focus:border-dan-900'
                  : 'border-neu-100 focus:border-pr-900'
              } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                errors.password_confirmation
                  ? 'focus:ring-dan-900'
                  : 'focus:ring-pr-900'
              } transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neu-600 hover:text-neu-900 cursor-pointer"
              title={showConfirmPassword ? 'Sembunyikan' : 'Tampilkan'}
            >
              {showConfirmPassword ? (
                <Eye className="w-[18px] h-[18px] stroke-[1.5]" />
              ) : (
                <EyeOff className="w-[18px] h-[18px] stroke-[1.5]" />
              )}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-[11px] text-dan-900 -mt-1">
              {errors.password_confirmation}
            </p>
          )}
        </div>
        <div className="hidden sm:block" />
      </div>

      {/* Row 3: Ketentuan Kata Sandi & Tombol Simpan Kata Sandi */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
        {/* Ketentuan Kata Sandi (Node #2415:41719) */}
        <div className="w-full sm:w-[220px] flex flex-col gap-1">
          <p className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            Ketentuan Kata Sandi:
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {hasCapital ? (
                <Check className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[2]" />
              ) : (
                <X className="w-[18px] h-[18px] text-neu-500 shrink-0 stroke-[1.75]" />
              )}
              <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-600">
                Menggunakan huruf Kapital
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <Check className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[2]" />
              ) : (
                <X className="w-[18px] h-[18px] text-neu-500 shrink-0 stroke-[1.75]" />
              )}
              <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-600">
                Minimal 8 karakter
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasNumberOrSymbol ? (
                <Check className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[2]" />
              ) : (
                <X className="w-[18px] h-[18px] text-neu-500 shrink-0 stroke-[1.75]" />
              )}
              <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-600">
                Menggunakan angka atau simbol
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-[#FAFAFA] font-sans text-[14px] font-medium leading-[20px] transition-colors cursor-pointer disabled:opacity-60"
          >
            {processing ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#FAFAFA]" />
            ) : (
              <KeyRound className="w-4 h-4 text-[#FAFAFA] stroke-[2]" />
            )}
            <span>Simpan Kata Sandi</span>
          </button>
        </div>
      </div>
    </form>
  );
}
