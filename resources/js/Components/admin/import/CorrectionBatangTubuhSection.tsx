import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Zap, Bookmark, Copy, Check, ArrowUp, X } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from './correctionParser';
import { AutoResizeTextarea } from './AutoResizeTextarea';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';

interface CorrectionBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  onChangeBabDeskripsi: (babId: string, value: string) => void;
  onChangeBabJudul?: (babId: string, value: string) => void;
  onChangePasalIsi: (babId: string, pasalId: string, value: string) => void;
  onChangePasalPenjelasan?: (babId: string, pasalId: string, value: string) => void;
}

const scrollToElementRef = (el: HTMLElement | null, offset = 20) => {
  if (!el) return;
  const container = document.getElementById('editor-scroll-container');
  if (container) {
    const elementPosition = el.getBoundingClientRect().top;
    const containerPosition = container.getBoundingClientRect().top;
    const offsetPosition = elementPosition - containerPosition + container.scrollTop - offset;
    container.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function CorrectionPasalCard({
  pasal,
  parentId,
  isSubPasal = false,
  onTogglePasal,
  onChangePasalIsi,
  onChangePasalPenjelasan,
}: {
  pasal: ArticleItem;
  parentId: string;
  isSubPasal?: boolean;
  onTogglePasal: (babId: string, pasalId: string) => void;
  onChangePasalIsi: (babId: string, pasalId: string, value: string) => void;
  onChangePasalPenjelasan?: (babId: string, pasalId: string, value: string) => void;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [activeSubPasalId, setActiveSubPasalId] = useState<string | null>(null);

  const rincianGridRef = useRef<HTMLDivElement>(null);
  const activeSubPasalRef = useRef<HTMLDivElement>(null);

  const isAmendingContainer = pasal.tipe === 'PASAL_PERUBAHAN_CONTAINER' || Boolean(pasal.targetInduk);
  const hasSubPasals = pasal.pasalList && pasal.pasalList.length > 0;
  const actionInfo = detectActionType(pasal.isi);
  const activeSubPasal = pasal.pasalList?.find((p) => p.id === activeSubPasalId);

  const handleCopyPasal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullText = `${pasal.nomor}\n${cleanOcrText(pasal.isi)}${
      pasal.penjelasan ? `\n\nPenjelasan ${pasal.nomor}:\n${cleanOcrText(pasal.penjelasan)}` : ''
    }`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubPasalClick = (subPId: string) => {
    if (activeSubPasalId === subPId) {
      setActiveSubPasalId(null);
      setTimeout(() => scrollToElementRef(rincianGridRef.current), 50);
    } else {
      setActiveSubPasalId(subPId);
      setTimeout(() => scrollToElementRef(activeSubPasalRef.current), 100);
    }
  };

  const handleCloseSubPasal = () => {
    setActiveSubPasalId(null);
    setTimeout(() => scrollToElementRef(rincianGridRef.current), 50);
  };

  return (
    <div
      id={`section-${pasal.id}`}
      className={`space-y-3 ${
        isSubPasal
          ? 'p-3.5 bg-amber-50/40 rounded-xl border border-amber-200/80 ml-2'
          : 'p-4 bg-white rounded-xl border border-neu-100 shadow-2xs'
      }`}
    >
      {/* Header Nomor Pasal & Tombol Akses */}
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
          </div>

          <div className="flex items-center gap-2">
            {/* Tombol Salin Teks */}
            <button
              type="button"
              onClick={handleCopyPasal}
              title={`Salin Teks ${pasal.nomor}`}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                isCopied
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-white text-neu-600 border border-neu-200 hover:bg-neu-50 hover:text-pr-900'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Teks</span>
                </>
              )}
            </button>

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
        </div>
      )}

      {/* Body Editor Teks Pasal */}
      {(pasal.isExpanded || !pasal.nomor || pasal.nomor.trim() === '-' || pasal.nomor.trim() === '') && (
        <div className="space-y-3">
          {/* Banner Atas: Ketentuan Perubahan Peraturan */}
          {pasal.targetInduk && (
            <div className="p-3.5 bg-gradient-to-r from-amber-50 to-amber-100/40 border-l-4 border-amber-500 rounded-xl shadow-2xs flex items-center justify-between flex-wrap gap-2.5 border border-amber-200/60">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-[12px]">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Ketentuan Perubahan Peraturan</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-[12px]">
                <span className="text-amber-950 font-medium">
                  Mengubah Peraturan Induk: <span className="font-extrabold text-slate-900">{pasal.targetInduk.namaLengkap || pasal.targetInduk.labelSingkat}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border shadow-2xs ${actionInfo.badgeColor}`}>
                  Sifat Intervensi: {actionInfo.label}
                </span>
              </div>
            </div>
          )}

          {/* Textarea Editor Norma Utama */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-neu-500 uppercase tracking-wide">
              Teks Norma Pasal (Dapat Diedit Admin)
            </span>
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
          </div>

          {/* Penjelasan Pasal (Jika ada / opsional) */}
          {(pasal.penjelasan !== undefined || !isSubPasal) && (
            <div className="relative pt-2">
              <span className="bg-white px-1 text-[10px] font-semibold text-blue-600 uppercase tracking-wide block mb-1">
                Penjelasan Pasal (Opsional)
              </span>
              <AutoResizeTextarea
                enableAutoFormat
                value={pasal.penjelasan || ''}
                onChange={(e) => onChangePasalPenjelasan?.(parentId, pasal.id, e.target.value)}
                className="w-full p-3.5 rounded-[8px] bg-blue-50/50 border-l-4 border-l-blue-500 border border-blue-200 text-[12px] text-blue-900 leading-relaxed focus:outline-none focus:bg-white focus:border-blue-500 transition-all resize-none min-h-[80px]"
                placeholder="Tambahkan penjelasan pasal di sini..."
              />
            </div>
          )}

          {/* Grid Rincian Pasal Target yang Diintervensi */}
          {pasal.targetInduk && hasSubPasals && (
            <div
              ref={rincianGridRef}
              className="p-4 bg-gradient-to-r from-amber-50/90 to-amber-100/50 border-2 border-amber-300 rounded-xl shadow-2xs space-y-2.5 scroll-mt-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 text-amber-950 font-bold text-[12px]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Rincian Pasal Target yang Diintervensi (Klik untuk edit):</span>
                </div>
                <span className="text-[11px] font-normal text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  {pasal.pasalList!.length} Pasal Terintervensi
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {pasal.pasalList!.map((subP) => {
                  const subAction = detectActionType(subP.isi);
                  const isActive = activeSubPasalId === subP.id;

                  return (
                    <button
                      key={subP.id}
                      type="button"
                      onClick={() => handleSubPasalClick(subP.id)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-400'
                          : 'bg-white hover:bg-amber-100/80 text-slate-800 border-amber-200/90 hover:border-amber-400'
                      }`}
                    >
                      <span className="truncate pr-1">{subP.nomor}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 border ${
                          isActive ? 'bg-amber-700 text-white border-amber-600' : subAction.badgeColor
                        }`}
                      >
                        {subAction.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Sub-Pasal Detail & Editor Card */}
          {activeSubPasal && (
            <div
              ref={activeSubPasalRef}
              className="mt-3 pl-4 border-l-4 border-amber-500 bg-amber-50/40 p-4 rounded-xl space-y-3 border border-amber-200/90 animate-in fade-in duration-200 scroll-mt-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 border-b border-amber-200/80 pb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-600 text-white font-bold text-[11px]">
                    Fokus Editor: {activeSubPasal.nomor}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${detectActionType(activeSubPasal.isi).badgeColor}`}>
                    {detectActionType(activeSubPasal.isi).label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseSubPasal}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-200/70 hover:bg-amber-300 text-amber-900 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Ke Pusat Pasal Perubahan</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseSubPasal}
                    className="p-1 text-amber-700 hover:text-amber-950 rounded cursor-pointer"
                    title="Tutup detail sub-pasal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-amber-900 uppercase tracking-wide">
                  Teks Ubahan {activeSubPasal.nomor}
                </span>
                <AutoResizeTextarea
                  enableAutoFormat
                  value={activeSubPasal.isi}
                  onChange={(e) => onChangePasalIsi(parentId, activeSubPasal.id, e.target.value)}
                  className="w-full p-3.5 rounded-[8px] bg-white border-l-4 border-l-amber-600 border border-amber-200 text-[12px] text-neu-900 leading-relaxed focus:outline-none focus:border-amber-600 resize-none min-h-[100px]"
                  placeholder="Isi norma ubahan..."
                />
              </div>
            </div>
          )}

          {/* Render All Sub-Pasals (Default View for full document correction) */}
          {hasSubPasals && !activeSubPasal && (
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-700" />
                <h5 className="text-[11px] font-bold text-amber-950 uppercase tracking-wider">
                  Seluruh Daftar Sub-Pasal Ubahan di dalam {pasal.nomor}:
                </h5>
              </div>
              <div className="space-y-3 pl-1">
                {pasal.pasalList!.map((subP) => (
                  <CorrectionPasalCard
                    key={subP.id}
                    pasal={subP}
                    parentId={parentId}
                    isSubPasal={true}
                    onTogglePasal={onTogglePasal}
                    onChangePasalIsi={onChangePasalIsi}
                    onChangePasalPenjelasan={onChangePasalPenjelasan}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
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
              node.pasalList.map((pasal) => (
                <CorrectionPasalCard
                  key={pasal.id}
                  pasal={pasal}
                  parentId={node.id}
                  isSubPasal={false}
                  onTogglePasal={onTogglePasal}
                  onChangePasalIsi={onChangePasalIsi}
                  onChangePasalPenjelasan={onChangePasalPenjelasan}
                />
              ))}
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


