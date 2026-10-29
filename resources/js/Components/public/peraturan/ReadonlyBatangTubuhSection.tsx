import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Sparkles } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from '../../admin/import/correctionParser';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';
import { KetentuanPerubahanBanner, RincianPasalTargetGrid } from './KetentuanPerubahanCards';

interface ReadonlyBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  searchQuery?: string;
  activeSectionId?: string;
  highlightedPasalId?: string | null;
  relevantSnippet?: string | null;
}

const STOPWORDS = new Set([
  'dan', 'atau', 'yang', 'di', 'ke', 'dari', 'pada', 'untuk', 'oleh',
  'atas', 'dengan', 'adalah', 'yaitu', 'sebagai', 'dalam', 'ini', 'itu',
  'pasal', 'ayat', 'huruf', 'angka', 'ketentuan', 'sebagaimana', 'dimaksud',
  'paling', 'sedikit', 'banyak', 'kurang', 'lebih', 'tentang', 'terkait',
]);

function getSignificantWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

const STATUTORY_EQUIVALENTS: Record<string, string[]> = {
  usia: ['umur', 'mencapai umur'],
  umur: ['usia', 'mencapai umur'],
  pernikahan: ['perkawinan', 'kawin'],
  perkawinan: ['pernikahan', 'kawin'],
  menikah: ['kawin', 'perkawinan'],
  kawin: ['perkawinan', 'pernikahan', 'menikah'],
  gaji: ['upah', 'imbalan'],
  upah: ['gaji', 'imbalan'],
  hukuman: ['pidana', 'sanksi'],
  pidana: ['hukuman', 'sanksi'],
  sanksi: ['hukuman', 'pidana', 'denda'],
  pecat: ['pemutusan hubungan kerja', 'phk', 'pemberhentian'],
  dipecat: ['pemutusan hubungan kerja', 'phk', 'diberhentikan'],
  phk: ['pemutusan hubungan kerja', 'pemberhentian'],
  penjara: ['kurungan', 'pidana penjara'],
  denda: ['pidana denda'],
  ijin: ['izin', 'perizinan'],
  izin: ['ijin', 'perizinan'],
  ongkos: ['biaya', 'tarif'],
  biaya: ['tarif', 'retribusi', 'pungutan'],
  anak: ['anak di bawah umur', 'belum dewasa'],
};

export function highlightText(text: string, query?: string): React.ReactNode {
  const cleaned = cleanOcrText(text);
  if (!query || !query.trim()) return cleaned;

  const rawTokens = query.toLowerCase().split(/[\s\-_,.]+/);
  for (const token of query.toLowerCase().split(/[\s\-_,.]+/)) {
    if (STATUTORY_EQUIVALENTS[token]) {
      for (const eq of STATUTORY_EQUIVALENTS[token]) {
        rawTokens.push(...eq.toLowerCase().split(/[\s\-_,.]+/));
      }
    }
  }

  const tokens = Array.from(
    new Set(rawTokens.filter((t) => t.length >= 3 && !STOPWORDS.has(t)))
  );

  if (tokens.length === 0) return cleaned;

  const escapedTokens = tokens
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const regex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
  const parts = cleaned.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-suc-100 text-suc-900 font-semibold rounded px-1 py-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/**
 * Merender isi pasal dengan menyorot (highlight hijau) ayat / kalimat spesifik
 * yang benar-benar menjawab pertanyaan pengguna berdasarkan cuplikan relevansi AI.
 */
export function renderNormaContent(
  text: string,
  relevantSnippet?: string | null,
  searchQuery?: string,
  isTargetHighlighted?: boolean
): React.ReactNode {
  const cleaned = cleanOcrText(text);

  // Jika pasal ini bukan target AI atau tidak ada snippet relevan, gunakan highlight biasa
  if (!isTargetHighlighted || !relevantSnippet || !relevantSnippet.trim()) {
    return highlightText(cleaned, searchQuery);
  }

  const snippetWords = getSignificantWords(relevantSnippet);
  if (snippetWords.length === 0) {
    return highlightText(cleaned, searchQuery);
  }

  // Pecah isi norma pasal per baris / ayat, dukung pula pemisahan ayat inline e.g. "(1)", "(2)" jika tidak ada newline
  let lines = cleaned.split('\n');
  if (lines.length === 1 && /\(\d+\)/.test(cleaned)) {
    lines = cleaned.split(/(?=\(\d+\)\s+)/g);
  }

  return lines.map((line, lineIndex) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      return <br key={lineIndex} />;
    }

    // Periksa apakah ayat / baris ini memuat jawaban pertanyaan yang cocok dengan snippet AI
    const lineWords = getSignificantWords(trimmedLine);
    let matchCount = 0;
    for (const w of snippetWords) {
      if (lineWords.includes(w)) {
        matchCount++;
      }
    }

    const isRelevantAyat =
      matchCount >= Math.min(2, snippetWords.length) &&
      (matchCount / snippetWords.length >= 0.2 || matchCount >= 2);

    return (
      <React.Fragment key={lineIndex}>
        {isRelevantAyat ? (
          <mark className="bg-suc-100 text-suc-900 font-medium px-1.5 py-0.5 rounded border border-suc-300/80 my-0.5 inline-block leading-relaxed shadow-2xs">
            {highlightText(line, searchQuery)}
          </mark>
        ) : (
          <span>{highlightText(line, searchQuery)}</span>
        )}
        {lineIndex < lines.length - 1 && '\n'}
      </React.Fragment>
    );
  });
}

function PasalNode({
  pasal,
  babId,
  onTogglePasal,
  searchQuery = '',
  activeSectionId,
  highlightedPasalId,
  relevantSnippet,
}: {
  pasal: ArticleItem;
  babId: string;
  onTogglePasal: (babId: string, pasalId: string) => void;
  searchQuery?: string;
  activeSectionId?: string;
  highlightedPasalId?: string | null;
  relevantSnippet?: string | null;
}) {
  const [isPenjelasanExpanded, setIsPenjelasanExpanded] = useState(false);
  const containerAction = detectActionType(pasal.isi);
  const isTargetHighlighted = Boolean(
    highlightedPasalId && String(pasal.id) === String(highlightedPasalId)
  );

  return (
    <div
      id={`section-${pasal.id}`}
      className={`space-y-3 transition-all duration-500 rounded-2xl ${
        isTargetHighlighted
          ? 'p-2 sm:p-3 border-l-4 border-l-suc-500 bg-suc-50/15'
          : 'p-1'
      }`}
    >
      {/* 0. Banner Rekomendasi AI jika diarahkan dari pencarian semantik */}
      {isTargetHighlighted && (
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-suc-900 bg-suc-100/80 border border-suc-300 px-2.5 py-0.5 rounded-full w-fit mb-1">
          <Sparkles className="w-3 h-3 text-suc-900 shrink-0" />
          <span>Pasal Terkait Jawaban</span>
        </div>
      )}

      {/* 1. Header Nomor Pasal & Kontrol Penjelasan */}
      <div 
        onClick={() => onTogglePasal(babId, pasal.id)}
        className="flex items-center justify-between flex-wrap gap-2 cursor-pointer select-none p-1.5 -mx-1.5 rounded-lg hover:bg-neu-50/70 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="inline-flex items-center px-3 py-1 rounded-[6px] bg-pr-900 text-white text-[11px] font-semibold shrink-0">
            {pasal.nomor}
          </span>
          {!pasal.isExpanded && (
            <span className="text-[11.5px] text-neu-500 font-normal truncate max-w-[280px] sm:max-w-[500px]">
              {cleanOcrText(pasal.isi).substring(0, 90)}...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">

          {pasal.penjelasan && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPenjelasanExpanded(!isPenjelasanExpanded);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                isPenjelasanExpanded 
                  ? 'bg-pr-50 text-pr-900 border border-pr-200' 
                  : 'bg-white text-neu-500 border border-neu-200 hover:bg-neu-50'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              {isPenjelasanExpanded ? 'Tutup Penjelasan' : 'Lihat Penjelasan'}
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePasal(babId, pasal.id);
            }}
            className="p-1 text-neu-500 hover:text-pr-900 rounded cursor-pointer"
          >
            {pasal.isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {pasal.isExpanded && (
        <div className="space-y-3">
          {/* 2. Banner Atas: Ketentuan Perubahan Peraturan */}
          {pasal.targetInduk && (
            <KetentuanPerubahanBanner
              targetInduk={pasal.targetInduk}
              containerAction={containerAction}
            />
          )}

          {/* 3. Teks Utama Norma Pasal (Hanya ayat/kalimat relevan yang disorot kuning) */}
          <div className="w-full p-3.5 rounded-[8px] bg-bg-900 border-l-4 border-l-sec-900 border-neu-50 text-neu-800 text-[12px] leading-relaxed whitespace-pre-line text-justify">
            {renderNormaContent(pasal.isi, relevantSnippet, searchQuery, isTargetHighlighted)}
          </div>

          {/* 4. Penjelasan Pasal (Jika ada & di-expand) */}
          {isPenjelasanExpanded && pasal.penjelasan && (
            <div className="w-full mt-2 p-3.5 rounded-[8px] bg-pr-50/50 border-l-4 border-l-pr-900 border border-pr-100 text-[12px] text-pr-900 leading-relaxed whitespace-pre-line text-justify">
              <span className="font-semibold text-[14px] block mb-1">Penjelasan {pasal.nomor}:</span>
              {highlightText(pasal.penjelasan, searchQuery)}
            </div>
          )}

          {/* 5. Kotak Kuning Bawah: Rincian Pasal Target yang Diintervensi */}
          {pasal.targetInduk && pasal.pasalList && pasal.pasalList.length > 0 && (
            <RincianPasalTargetGrid
              targetInduk={pasal.targetInduk}
              pasalList={pasal.pasalList}
              searchQuery={searchQuery}
              activeSectionId={activeSectionId}
            />
          )}
        </div>
      )}
    </div>
  );
}

function BatangTubuhNode({ 
  item, 
  onToggleBab, 
  onTogglePasal, 
  depth = 0,
  searchQuery = '',
  activeSectionId,
  highlightedPasalId,
  relevantSnippet,
}: { 
  item: ChapterItem; 
  onToggleBab: (id: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  depth?: number;
  searchQuery?: string;
  activeSectionId?: string;
  highlightedPasalId?: string | null;
  relevantSnippet?: string | null;
}) {
  const isRoot = depth === 0;

  return (
    <div
      id={`struktur-${item.id}`}
      className={isRoot 
        ? "bg-white rounded-[20px] border border-neu-50 p-5 space-y-4"
        : "bg-white rounded-[12px] border border-neu-50 p-4 space-y-3 mt-4 ml-4"
      }
    >
      <button
        type="button"
        onClick={() => onToggleBab(item.id)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {isRoot && <span className="w-2 h-2 rounded-full bg-pr-700 shrink-0" />}
          <span className={`font-bold tracking-wide uppercase ${isRoot ? 'text-[14px] text-pr-900' : 'text-[12px] text-neu-700'}`}>
            {item.judul}
          </span>
        </div>
        {item.isExpanded ? (
          <ChevronUp className="w-4 h-4 text-neu-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neu-400" />
        )}
      </button>

      {item.isExpanded && (
        <div className="space-y-4 pt-1">
          {item.deskripsi && (
            <div className="w-full p-3 rounded-[8px] bg-bg-900 border border-neu-50 text-[12px] text-neu-700 leading-relaxed whitespace-pre-line text-justify">
              {highlightText(item.deskripsi, searchQuery)}
            </div>
          )}

          {/* Render sub-struktur jika ada */}
          {item.children && item.children.length > 0 && (
            <div className="space-y-3">
              {item.children.map((child) => (
                <BatangTubuhNode
                  key={child.id}
                  item={child}
                  onToggleBab={onToggleBab}
                  onTogglePasal={onTogglePasal}
                  depth={depth + 1}
                  searchQuery={searchQuery}
                  activeSectionId={activeSectionId}
                  highlightedPasalId={highlightedPasalId}
                  relevantSnippet={relevantSnippet}
                />
              ))}
            </div>
          )}

          {/* Pasal-Pasal di dalam struktur ini */}
          {item.pasalList && item.pasalList.length > 0 && (
            <div className="space-y-4 pt-2">
              {item.pasalList.map((pasal) => (
                <PasalNode 
                  key={pasal.id}
                  pasal={pasal}
                  babId={item.id}
                  onTogglePasal={onTogglePasal}
                  searchQuery={searchQuery}
                  activeSectionId={activeSectionId}
                  highlightedPasalId={highlightedPasalId}
                  relevantSnippet={relevantSnippet}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ReadonlyBatangTubuhSection({
  babList,
  onToggleBab,
  onTogglePasal,
  searchQuery = '',
  activeSectionId,
  highlightedPasalId,
  relevantSnippet,
}: ReadonlyBatangTubuhSectionProps) {
  if (babList.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {babList.map((bab) => (
        <BatangTubuhNode 
          key={bab.id} 
          item={bab} 
          onToggleBab={onToggleBab} 
          onTogglePasal={onTogglePasal}
          depth={0} 
          searchQuery={searchQuery}
          activeSectionId={activeSectionId}
          highlightedPasalId={highlightedPasalId}
          relevantSnippet={relevantSnippet}
        />
      ))}
    </div>
  );
}
