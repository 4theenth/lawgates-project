import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';
import profileAvatar from '@/assets/profile-avatar.webp';

export interface CorrectionMetadataCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string | null;
  };
  reportedAt: {
    date: string;
    time?: string;
    relative: string;
  };
  document: {
    id?: number | string;
    title: string;
    category?: string;
    chapter?: string;
    article?: string;
    url?: string;
  };
}

export const CorrectionMetadataCard: React.FC<CorrectionMetadataCardProps> = ({
  user,
  reportedAt,
  document,
}) => {
  const targetUrl = document.url || '/admin/dokumen-hukum';
  const isInternal = targetUrl.startsWith('/');

  return (
    <div className="w-full bg-white border border-neu-50 rounded-[15px] p-5 lg:p-6 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 flex-1">
          {/* 1. Pengusul (Avatar langsung dari Assets) */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold text-neu-500 uppercase tracking-wider">
              PENGGUNA
            </span>
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || profileAvatar}
                alt={user.name}
                className="w-[38px] h-[38px] rounded-full object-cover shrink-0 border border-neu-50"
              />
              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-neu-900 leading-tight">
                  {user.name}
                </span>
                <span className="text-[12px] font-normal text-neu-600 leading-tight mt-0.5">
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Waktu Dilaporkan */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold text-neu-500 uppercase tracking-wider">
              WAKTU DILAPORKAN
            </span>
            <div className="flex flex-col">
              <span className="text-[14px] font-medium text-neu-900 leading-tight">
                {reportedAt.date}
              </span>
              <span className="text-[12px] font-normal text-neu-600 leading-tight mt-0.5">
                {reportedAt.relative}
              </span>
            </div>
          </div>

          {/* 3. Dokumen Terkait: Judul & Badge Bisa Diklik Langsung */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold text-neu-500 uppercase tracking-wider">
              DOKUMEN TERKAIT
            </span>
            <div className="flex flex-col gap-1.5">
              {isInternal ? (
                <Link
                  href={targetUrl}
                  className="text-[14px] font-medium text-neu-900 hover:text-pr-900 leading-tight truncate transition-colors"
                  title={document.title}
                >
                  {document.title}
                </Link>
              ) : (
                <a
                  href={targetUrl}
                  className="text-[14px] font-medium text-neu-900 hover:text-pr-900 leading-tight truncate transition-colors"
                  title={document.title}
                >
                  {document.title}
                </a>
              )}

              <div className="flex items-center gap-1.5 flex-wrap">
                {document.chapter && (
                  isInternal ? (
                    <Link
                      href={`${targetUrl}#bab-${document.chapter.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-2 py-0.5 rounded-[6px] bg-neutral-100 hover:bg-neutral-200 text-neu-900 text-[12px] font-normal transition-colors cursor-pointer"
                    >
                      {document.chapter}
                    </Link>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] bg-neutral-100 text-neu-900 text-[12px] font-normal">
                      {document.chapter}
                    </span>
                  )
                )}
                {document.article && (
                  isInternal ? (
                    <Link
                      href={`${targetUrl}#pasal-${document.article.toLowerCase().replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center px-2 py-0.5 rounded-[6px] bg-pr-50 hover:bg-pr-100 text-pr-900 text-[12px] font-normal transition-colors cursor-pointer"
                    >
                      {document.article}
                    </Link>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] bg-pr-50 text-pr-900 text-[12px] font-normal">
                      {document.article}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Tautan Detail Dokumen (Tetap di Tab yang Sama Menggunakan Inertia Link) */}
        <div className="pt-2 lg:pt-0 border-t lg:border-t-0 border-neu-50 shrink-0">
          <Link
            href={targetUrl}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-pr-900 hover:text-pr-800 transition-colors"
          >
            <span>Lihat detail peraturan</span>
            <ExternalLink className="w-4 h-4 text-pr-900" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CorrectionMetadataCard;

