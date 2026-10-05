import React from 'react';
import { ChevronDown, ChevronUp, Zap, FileText, Bookmark } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from './correctionParser';
import { AutoResizeTextarea } from './AutoResizeTextarea';

interface CorrectionBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  onChangeBabDeskripsi: (babId: string, value: string) => void;
  onChangeBabJudul?: (babId: string, value: string) => void;
  onChangePasalIsi: (babId: string, pasalId: string, value: string) => void;
  onChangePasalPenjelasan?: (babId: string, pasalId: string, value: string) => void;
}

export function CorrectionBatangTubuhSection({
  babList,
  onToggleBab,
  onTogglePasal,
  onChangeBabDeskripsi,
  onChangeBabJudul,
  onChangePasalIsi,
  onChangePasalPenjelasan,
}: CorrectionBatangTubuhSectionProps) {
  if (babList.length === 0) {
    return null;
  }

  // Helper untuk merender kartu 1 Pasal (baik pasal utama maupun sub-pasal perubahan)
  const renderPasalCard = (pasal: ArticleItem, parentId: string, isSubPasal = false) => {
    const isAmendingContainer = pasal.tipe === 'PASAL_PERUBAHAN_CONTAINER' || Boolean(pasal.targetInduk);
    const hasSubPasals = pasal.pasalList && pasal.pasalList.length > 0;
    const actionInfo = detectActionType(pasal.isi);

    return (
      <div
        key={pasal.id}
        id={`section-${pasal.id}`}
        className={`space-y-3 ${
          isSubPasal
            ? 'p-3.5 bg-amber-50/40 rounded-xl border border-amber-200/80 ml-3'
            : 'p-4 bg-white rounded-xl border border-neu-100 shadow-2xs'
        }`}
      >
        {/* Header Nomor Pasal */}
        {pasal.nomor && pasal.nomor.trim() !== '-' && pasal.nomor.trim() !== '' && (
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-[6px] text-[11px] font-semibold ${
                  isSubPasal
                    ? 'bg-amber-700 text-white'
                    : isAmendingContainer
                    ? 'bg-amber-600 text-white'
                    : 'bg-pr-900 text-white'
                }`}
              >
                {pasal.nomor}
              </span>

              {/* Badge Peraturan Target */}
              {pasal.targetInduk && (
                <span
                  title={pasal.targetInduk.namaLengkap}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${actionInfo.badgeColor}`}
                >
                  <Zap className="w-3 h-3 text-amber-700 shrink-0" />
                  <span>Mengubah: {pasal.targetInduk.namaLengkap || pasal.targetInduk.labelSingkat}</span>
                  <span className="ml-1 text-[9px] font-semibold">({actionInfo.label})</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onTogglePasal(parentId, pasal.id)}
              className="p-1 text-neu-400 hover:text-black cursor-pointer"
            >
              {pasal.isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}

        {/* Body Editor Teks Pasal */}
        {(pasal.isExpanded || !pasal.nomor || pasal.nomor.trim() === '-' || pasal.nomor.trim() === '') && (
          <div className="space-y-3">
            <AutoResizeTextarea
              enableAutoFormat
              value={pasal.isi}
              onChange={(e) => onChangePasalIsi(parentId, pasal.id, e.target.value)}
              className={`w-full p-3.5 rounded-[8px] text-[12px] leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900 resize-none min-h-[120px] ${
                isSubPasal
                  ? 'bg-white border-l-4 border-l-amber-600 border border-amber-200 text-neu-900'
                  : 'bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-neu-800'
              }`}
              placeholder="Isi teks norma pasal..."
            />

            {/* Penjelasan Pasal (Jika ada / opsional) */}
            {(pasal.penjelasan !== undefined || !isSubPasal) && (
              <div className="relative">
                <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
                  Penjelasan (Opsional)
                </span>
                <AutoResizeTextarea
                  enableAutoFormat
                  value={pasal.penjelasan || ''}
                  onChange={(e) => onChangePasalPenjelasan?.(parentId, pasal.id, e.target.value)}
                  className="w-full mt-1 p-3.5 rounded-[8px] bg-blue-50/50 border-l-4 border-l-blue-500 border border-blue-200 text-[12px] text-blue-900 leading-relaxed focus:outline-none focus:bg-white focus:border-blue-500 transition-all resize-none min-h-[80px]"
                  placeholder="Tambahkan penjelasan pasal di sini..."
                />
              </div>
            )}

            {/* Render Sub-Pasal jika ini adalah Container Pasal Perubahan */}
            {hasSubPasals && (
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-200 pb-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-700" />
                  <h5 className="text-[11px] font-bold text-amber-950 uppercase tracking-wider">
                    Daftar Pasal Ubahan di dalam {pasal.nomor}:
                  </h5>
                </div>
                <div className="space-y-3 pl-1">
                  {pasal.pasalList!.map((subP) => renderPasalCard(subP, parentId, true))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Helper rekursif untuk merender node Bab, Bagian, atau Paragraf
  const renderChapterSection = (node: ChapterItem, depth = 0) => {
    const isBab = node.tipe === 'BAB' || depth === 0;

    return (
      <div
        key={node.id}
        id={`section-${node.id}`}
        className={`bg-white rounded-[20px] border ${
          isBab ? 'border-neu-100 p-5 shadow-2xs' : 'border-neu-200/80 p-4 bg-neu-50/30'
        } space-y-4`}
      >
        {/* Header Node (BAB / BAGIAN / PARAGRAF) */}
        {node.judul && node.judul.trim() !== '' && node.judul.trim() !== '-' && (
          <div className="w-full flex items-center justify-between gap-3 group">
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <input
                type="text"
                value={node.judul}
                onChange={(e) => onChangeBabJudul?.(node.id, e.target.value)}
                className={`flex-1 min-w-0 bg-[#F8FAFC] border border-neu-100 px-3 py-2 rounded-[8px] text-[12px] font-bold tracking-wide uppercase focus:outline-none focus:bg-white focus:border-pr-900 transition-all ${
                  isBab ? 'text-pr-900 font-extrabold' : 'text-neu-800 font-semibold'
                }`}
                placeholder="Judul Struktur..."
              />
            </div>
            <button
              type="button"
              onClick={() => onToggleBab(node.id)}
              className="p-1 cursor-pointer shrink-0"
            >
              {node.isExpanded ? (
                <ChevronUp className="w-4 h-4 text-neu-400 hover:text-black" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neu-400 hover:text-black" />
              )}
            </button>
          </div>
        )}

        {(node.isExpanded || !node.judul || node.judul.trim() === '' || node.judul.trim() === '-') && (
          <div className="space-y-4 pt-1">
            {node.deskripsi && (
              <AutoResizeTextarea
                enableAutoFormat
                value={node.deskripsi}
                onChange={(e) => onChangeBabDeskripsi(node.id, e.target.value)}
                className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-700 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900 resize-none min-h-[80px]"
                placeholder="Deskripsi..."
              />
            )}

            {/* Render Sub-nodes (Bagian / Paragraf) */}
            {node.children &&
              node.children.map((childNode) => renderChapterSection(childNode, depth + 1))}

            {/* Render Pasal-pasal di bawah node ini */}
            {node.pasalList &&
              node.pasalList.map((pasal) => renderPasalCard(pasal, node.id, false))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {babList
        .filter(
          (bab) =>
            (bab.judul && bab.judul.trim() !== '' && bab.judul.trim() !== '-') ||
            (bab.deskripsi && bab.deskripsi.trim() !== '') ||
            (bab.pasalList && bab.pasalList.length > 0) ||
            (bab.children && bab.children.length > 0)
        )
        .map((bab) => renderChapterSection(bab, 0))}
    </div>
  );
}

