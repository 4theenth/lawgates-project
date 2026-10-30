import React from 'react';
import { CircleX, CircleCheckBig, Hourglass, Trash, CircleAlert, Mail } from 'lucide-react';
import { KontribusiItem } from './types';

interface KontribusiCardProps {
  item: KontribusiItem;
  onDelete?: (id: number | string) => void;
}

export function KontribusiCard({ item, onDelete }: KontribusiCardProps) {
  const isDitolak = item.status === 'ditolak';
  const isDisetujui = item.status === 'disetujui';
  const isMenunggu = item.status === 'menunggu';

  return (
    <div className="w-full bg-white border border-neu-50 rounded-[10px] p-5 flex flex-col gap-4 sm:gap-[17px] shadow-2xs transition-shadow hover:shadow-xs">
      {/* ── 1. Header Baris Atas ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left: Kategori & Judul Peraturan */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[12px] font-medium text-neu-600 uppercase tracking-wide">
            {item.jenis_peraturan}
          </span>
          <h3 className="text-[16px] font-medium text-neu-900 leading-snug">
            {item.judul_peraturan}
          </h3>
        </div>

        {/* Right: Status Badge & Trash Action */}
        <div className="flex items-center gap-2.5 shrink-0 self-start">
          {/* Status Badge */}
          {isDitolak && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-dan-50 rounded-[12px] text-dan-900 text-[12px] font-normal">
              <CircleX className="w-4 h-4 text-dan-900" />
              <span>Ditolak</span>
            </div>
          )}

          {isDisetujui && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-suc-50 rounded-[12px] text-suc-900 text-[12px] font-normal">
              <CircleCheckBig className="w-4 h-4 text-suc-900" />
              <span>Disetujui</span>
            </div>
          )}

          {isMenunggu && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-sec-50 rounded-[12px] text-sec-900 text-[12px] font-normal">
              <Hourglass className="w-4 h-4 text-sec-900" />
              <span>Menunggu Ditinjau</span>
            </div>
          )}

          {/* Delete Button for Ditolak & Menunggu — Langsung Merah */}
          {(isDitolak || isMenunggu) && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="p-1 text-dan-700 hover:text-dan-900 transition-colors cursor-pointer rounded-md focus:outline-none"
              title="Hapus Usulan"
              aria-label="Hapus usulan"
            >
              <Trash className="w-[18px] h-[18px] text-inherit" />
            </button>
          )}
        </div>
      </div>

      {/* ── 2. Meta Pills (BAB, Pasal, Tanggal) ── */}
      <div className="flex flex-wrap items-center gap-2">
        {item.bab && (
          <span className="px-2.5 py-1 rounded-[5px] bg-neu-50 text-neu-900 text-[12px] font-normal">
            {item.bab}
          </span>
        )}

        {item.pasal && (
          <span className="px-2.5 py-1 rounded-[5px] bg-neu-50 text-neu-900 text-[12px] font-normal">
            {item.pasal}
          </span>
        )}

        {item.tanggal_diajukan && (
          <span className="text-neu-700 text-[12px] font-normal ml-1">
            {item.tanggal_diajukan}
          </span>
        )}
      </div>

      {/* ── 3. Usulan Box ── */}
      <div className="w-full rounded-[6px] bg-neu-50/50 px-3.5 py-3 sm:py-[15px] text-[14px] font-normal text-neu-900 leading-5 text-justify whitespace-pre-wrap select-text">
        Usulan : “{item.usulan_text}”
      </div>

      {/* ── 4. Admin Message / Status Feedback Box ── */}
      {isDitolak && (
        <div className="w-full rounded-r-[6px] bg-dan-50 border-l-4 border-dan-900 p-2.5 flex items-center gap-2.5">
          <CircleAlert className="w-5 h-5 text-dan-900 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-semibold text-dan-900 uppercase tracking-wider">
              PESAN DARI ADMIN LAWGATES
            </span>
            <span className="text-[14px] font-normal text-dan-900 leading-snug">
              {item.admin_message || 'Usulan koreksi belum dapat disetujui saat ini.'}
            </span>
          </div>
        </div>
      )}

      {isDisetujui && (
        <div className="w-full rounded-r-[6px] bg-suc-50 border-l-4 border-suc-900 p-2.5 flex items-center gap-2.5">
          <Mail className="w-5 h-5 text-suc-900 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-semibold text-suc-900 uppercase tracking-wider">
              PESAN DARI ADMIN LAWGATES
            </span>
            <span className="text-[14px] font-normal text-suc-900 leading-snug">
              {item.admin_message || 'Terima kasih atas koreksinya.'}
            </span>
          </div>
        </div>
      )}

      {isMenunggu && (
        <div className="w-full rounded-r-[6px] bg-sec-50 border-l-4 border-sec-900 p-2.5 flex items-center gap-2.5">
          <Hourglass className="w-5 h-5 text-sec-900 shrink-0" />
          <span className="text-[14px] font-normal text-sec-900 leading-snug">
            Sedang ditinjau oleh admin
          </span>
        </div>
      )}
    </div>
  );
}

export default KontribusiCard;

