import React from 'react';
import { CircleCheck, CircleX } from 'lucide-react';

export interface CorrectionStatusBannerProps {
  status: 'belum_ditinjau' | 'disetujui' | 'ditolak';
  adminName?: string;
  processedAt?: string;
  articleTarget?: string;
  rejectReason?: string;
  customMessage?: string;
}

export const CorrectionStatusBanner: React.FC<CorrectionStatusBannerProps> = ({
  status,
  adminName = 'Admin Mangadi',
  processedAt = '13 Mei 2026, 06:31',
  articleTarget = 'Pasal 2',
  rejectReason,
  customMessage,
}) => {
  // Jika masih belum ditinjau, tidak perlu menampilkan banner status selesai
  if (status === 'belum_ditinjau') return null;

  const isApproved = status === 'disetujui';

  // Format pesan banner sesuai aksi & data
  const message =
    customMessage ||
    (isApproved
      ? `Disetujui oleh ${adminName} pada ${processedAt} dan sudah diterapkan ke ${articleTarget}.`
      : `Ditolak oleh ${adminName} pada ${processedAt}.${
          rejectReason ? ` Alasan: “${rejectReason}”` : ''
        }`);

  return (
    <div
      className={`w-full rounded-[15px] px-5 py-3.5 flex items-center gap-3 transition-colors ${
        isApproved
          ? 'bg-suc-50 border border-[#B9D9C5] text-suc-900'
          : 'bg-dan-50 border border-[#FCA5A5] text-dan-900'
      }`}
    >
      {isApproved ? (
        <CircleCheck className="w-5 h-5 text-suc-900 shrink-0" />
      ) : (
        <CircleX className="w-5 h-5 text-dan-900 shrink-0" />
      )}
      <span className="text-[14px] font-normal leading-relaxed">{message}</span>
    </div>
  );
};

export default CorrectionStatusBanner;

