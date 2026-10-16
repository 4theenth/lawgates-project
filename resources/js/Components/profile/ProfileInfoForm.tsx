import React, { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Save, Loader2 } from 'lucide-react';
import { User } from '@/types';
import { useToast } from '@/hooks/useToast';

interface ProfileInfoFormProps {
  user: User;
  className?: string;
  onSuccess?: () => void;
}

export function ProfileInfoForm({ user, className = '', onSuccess }: ProfileInfoFormProps) {
  const { toast } = useToast();

  const {
    data,
    setData,
    patch,
    processing,
    errors,
    clearErrors,
  } = useForm({
    name: user.name || user.username || '',
    email: user.email || '',
    phone: user.phone || '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('profile.update'), {
      preserveScroll: true,
      onSuccess: () => {
        onSuccess?.();
      },
      onError: () => {
        toast.error('Gagal memperbarui profil. Silakan periksa formulir.');
      },
    });
  };

  const displayRole = user.role === 'superadmin' ? 'super admin' : (user.role || 'user');

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Row 1: Nama & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
        {/* Field 1: Nama */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            Nama <span className="text-dan-900 font-semibold">*</span>
          </label>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => {
              setData('name', e.target.value);
              if (errors.name) clearErrors('name');
            }}
            placeholder="Masukkan nama lengkap"
            className={`w-full h-10 px-4 py-2.5 rounded-[10px] bg-white border ${
              errors.name
                ? 'border-dan-900 focus:border-dan-900'
                : 'border-neu-100 focus:border-pr-900'
            } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
              errors.name ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
            } transition-all`}
          />
          {errors.name && (
            <p className="text-[11px] text-dan-900 -mt-1">{errors.name}</p>
          )}
        </div>

        {/* Field 2: Email (Read-only sesuai AC USR-01) */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            Email
          </label>
          <input
            type="email"
            readOnly
            disabled
            value={data.email}
            placeholder="nama@email.com"
            className="w-full h-10 px-4 py-2.5 rounded-[10px] bg-neu-50/60 border border-neu-100 font-sans text-[12px] font-normal leading-[18px] text-neu-600 placeholder:text-neu-600 cursor-not-allowed select-none transition-all"
          />
        </div>
      </div>

      {/* Row 2: Role & No Hp / WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
        {/* Field 3: Role (Read-only sesuai AC USR-01) */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            Role
          </label>
          <div className="w-full h-10 px-3 rounded-[10px] bg-neu-50/60 border border-neu-100 flex items-center select-none cursor-not-allowed">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-[10px] bg-pr-50 text-pr-900 font-sans text-[12px] font-normal leading-[18px] whitespace-nowrap">
              {displayRole}
            </span>
            <input
              type="text"
              readOnly
              disabled
              value={displayRole}
              className="sr-only"
              aria-label="Role Pengguna"
            />
          </div>
        </div>

        {/* Field 4: No Hp / WhatsApp */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
            No Hp / WhatsApp <span className="text-dan-900 font-semibold">*</span>
          </label>
          <input
            type="text"
            required
            value={data.phone}
            onChange={(e) => {
              setData('phone', e.target.value);
              if (errors.phone) clearErrors('phone');
            }}
            placeholder="08123456789"
            className={`w-full h-10 px-4 py-2.5 rounded-[10px] bg-white border ${
              errors.phone
                ? 'border-dan-900 focus:border-dan-900'
                : 'border-neu-100 focus:border-pr-900'
            } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
              errors.phone ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
            } transition-all`}
          />
          {errors.phone && (
            <p className="text-[11px] text-dan-900 -mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Row 3: Tombol Simpan Perubahan */}
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-[#FAFAFA] font-sans text-[14px] font-medium leading-[20px] transition-colors cursor-pointer disabled:opacity-60"
        >
          {processing ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#FAFAFA]" />
          ) : (
            <Save className="w-4 h-4 text-[#FAFAFA] stroke-[2]" />
          )}
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </form>
  );
}
