import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { PageHeader } from '@/Components/common/PageHeader';
import { CorrectionMetadataCard } from '@/Components/admin/CorrectionMetadataCard';
import { CorrectionDiffViewer } from '@/Components/admin/CorrectionDiffViewer';
import {
  CorrectionAuditTimeline,
  AuditTrailItem,
} from '@/Components/admin/CorrectionAuditTimeline';
import { KoreksiActionModal } from '@/Components/admin/KoreksiActionModal';
import { CorrectionDocumentPdfModal } from '@/Components/admin/CorrectionDocumentPdfModal';
import { CorrectionStatusBanner } from '@/Components/admin/CorrectionStatusBanner';
import { X, Check } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import type { KoreksiItem } from './Index';

interface DetailKoreksiData {
  id: number;
  user: {
    name: string;
    email: string;
    avatar?: string | null;
  };
  reported_at: {
    date: string;
    time?: string;
    relative: string;
  };
  document: {
    id: number;
    title: string;
    category?: string;
    chapter?: string;
    article?: string;
    url?: string;
    pdf_url?: string;
  };
  status: 'belum_ditinjau' | 'disetujui' | 'ditolak';
  admin_message?: string | null;
  diff: {
    word_change_count: number;
    removed_words: string;
    added_words: string;
    current_text: string;
    proposed_text: string;
    reason: string;
  };
  audit_trail: AuditTrailItem[];
}

interface DetailProps {
  koreksi: DetailKoreksiData;
}

export default function Detail({ koreksi }: DetailProps) {
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState(koreksi.status);
  const [actionModal, setActionModal] = useState<'setujui' | 'tolak' | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [auditTrail, setAuditTrail] = useState<AuditTrailItem[]>(koreksi.audit_trail || []);
  const [rejectReason, setRejectReason] = useState<string | undefined>(
    koreksi.admin_message || undefined
  );
  const [processedTime, setProcessedTime] = useState<string>('13 Mei 2026, 06:31');
  const [adminName, setAdminName] = useState<string>('Admin Mangadi');

  // Map to format suitable for KoreksiActionModal
  const modalItem: KoreksiItem = {
    id: koreksi.id,
    tanggal: koreksi.reported_at.date,
    waktu_lalu: koreksi.reported_at.relative,
    created_at_timestamp: Date.now(),
    user_name: koreksi.user.name,
    user_email: koreksi.user.email,
    jenis_peraturan: koreksi.document.category || 'UNDANG - UNDANG',
    judul_peraturan: koreksi.document.title,
    bagian: `${koreksi.document.chapter || ''} ${koreksi.document.article || ''}`.trim(),
    status: currentStatus,
    teks_asli: koreksi.diff.current_text,
    usulan_text: koreksi.diff.proposed_text,
    alasan: koreksi.diff.reason,
  };

  const handleConfirmAction = (message: string) => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const timeFormatted = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setProcessedTime(timeFormatted);
    setAdminName('Admin Mangadi');

    if (actionModal === 'setujui') {
      setCurrentStatus('disetujui');
      setAuditTrail((prev) => [
        {
          id: Date.now() + 1,
          title: `Teks ${koreksi.document.article || 'Pasal 2'} Diperbarui`,
          timestamp: timeFormatted,
          status: 'updated',
        },
        {
          id: Date.now(),
          title: 'Disetujui oleh Admin Mangadi',
          timestamp: timeFormatted,
          status: 'approved',
        },
        ...prev.filter((i) => i.status === 'created'),
      ]);
      toast.success(
        `Usulan koreksi untuk "${koreksi.document.title}" berhasil disetujui & diterapkan!`
      );
    } else if (actionModal === 'tolak') {
      setCurrentStatus('ditolak');
      setRejectReason(message || 'Redaksi sudah sesuai dengan naskah resmi Lembaran Negara.');
      setAuditTrail((prev) => [
        {
          id: Date.now(),
          title: 'Ditolak oleh Admin Mangadi',
          timestamp: timeFormatted,
          status: 'rejected',
        },
        ...prev.filter((i) => i.status === 'created'),
      ]);
      toast.error(`Usulan koreksi ditolak.`);
    }
    setActionModal(null);
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Antrean Koreksi', href: '/admin/antrean-koreksi' },
    { label: 'Detail Koreksi' },
  ];

  return (
    <AdminLayout>
      <Head title={`Detail Koreksi - ${koreksi.document.title}`} />

      {/* ── 1. Breadcrumb Navigasi (#3506:60871) ── */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* ── 2. Page Header (#3506:60872 / #3543:61569) ── */}
      {/* Tombol aksi di header hanya muncul jika status masih belum_ditinjau */}
      <PageHeader
        title="Detail Koreksi"
        description="Tinjau kesesuaian usulan perbaikan teks dengan naskah asli dokumen."
        action={
          currentStatus === 'belum_ditinjau' ? (
            <div className="flex items-center gap-2.5">
              {/* Tombol Tolak Usulan (Icon / x) */}
              <button
                type="button"
                onClick={() => setActionModal('tolak')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-[#D4D4D4] hover:bg-neutral-50 text-pr-900 text-[13px] font-medium transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-pr-900" />
                <span>Tolak Usulan</span>
              </button>

              {/* Tombol Setujui & Terapkan (Icon / check) */}
              <button
                type="button"
                onClick={() => setActionModal('setujui')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white text-[13px] font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <Check className="w-4 h-4 text-white" />
                <span>Setujui & Terapkan</span>
              </button>
            </div>
          ) : undefined
        }
      />

      {/* ── 3. Content Sections ── */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Banner Status (#3543:61765): Muncul di atas jika status disetujui / ditolak */}
        <CorrectionStatusBanner
          status={currentStatus}
          adminName={adminName}
          processedAt={processedTime}
          articleTarget={koreksi.document.article || 'Pasal 2'}
          rejectReason={rejectReason}
        />

        {/* Card 1: Ringkasan Info (Pengguna • Waktu • Dokumen) */}
        <CorrectionMetadataCard
          user={koreksi.user}
          reportedAt={koreksi.reported_at}
          document={koreksi.document}
        />

        {/* Card 2: Perbandingan Teks (Side-by-Side Diff) */}
        <CorrectionDiffViewer
          currentText={koreksi.diff.current_text}
          proposedText={koreksi.diff.proposed_text}
          removedWords={koreksi.diff.removed_words}
          addedWords={koreksi.diff.added_words}
          wordChangeCount={koreksi.diff.word_change_count}
          reason={koreksi.diff.reason}
          documentUrl={koreksi.document.url}
          onOpenDocumentPreview={() => setIsPreviewOpen(true)}
        />

        {/* Card 3: Jejak Audit (Audit Trail Timeline - Paling Baru Di Atas) */}
        <CorrectionAuditTimeline
          items={auditTrail}
          historyCount={auditTrail.length}
        />
      </div>

      {/* ── 4. Reusable Action Modal (Icon / gavel) ── */}
      <KoreksiActionModal
        isOpen={actionModal !== null}
        type={actionModal || 'setujui'}
        item={modalItem}
        onClose={() => setActionModal(null)}
        onConfirm={handleConfirmAction}
      />

      {/* ── 5. Pratinjau Dokumen Modal (POV Verifikasi Admin) ── */}
      <CorrectionDocumentPdfModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        document={koreksi.document}
      />
    </AdminLayout>
  );
}
