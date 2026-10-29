import React from 'react';
import { Link, router } from '@inertiajs/react';
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  XOctagon,
  Eye,
  Sparkles,
} from 'lucide-react';
import { BookmarkButton } from '@/Components/common/BookmarkButton';

export interface RegulationCardItem {
  id: number | string;
  unique_id: string;
  judul: string;
  nomor?: string;
  tahun: number | string;
  instansi?: string;
  jenis_peraturan?: {
    id?: number;
    nama: string;
    kode?: string;
  };
  status_peraturan?: {
    id?: number;
    nama_status: string;
  };
  relevant_pasal?: {
    pasal_id: number;
    nomor_pasal: string;
    cuplikan: string;
    similarity: number;
    secondary_pasal?: Array<{
      pasal_id: number;
      nomor_pasal: string;
      cuplikan: string;
      similarity: number;
    }>;
  };
}

interface RegulationCardProps {
  item: RegulationCardItem;
  className?: string;
  variant?: 'list' | 'grid';
  searchQuery?: string;
  synonyms?: string[];
  onClick?: (e: React.MouseEvent) => void;
}

function getRelevanceInfo(rawSimilarity: number): {
  percent: number;
  label: string;
  badgeClass: string;
} {
  // Kalibrasi kemiripan kosinus (Qwen embedding rentang 0.20 - 0.70) ke persentase intuitif pengguna.
  // Model cross-text vector AI pada pasal hukum berada pada rentang 0.45 - 0.65 untuk pasal yang langsung menjawab pertanyaan.
  let percent: number;
  if (rawSimilarity >= 0.50) {
    // Hasil sangat presisi / memuat jawaban langsung: 94% - 98%
    const ratio = Math.min(1, (rawSimilarity - 0.50) / 0.18);
    percent = Math.round(94 + ratio * 4);
  } else if (rawSimilarity >= 0.38) {
    // Sangat Relevan (86% - 93%)
    const ratio = (rawSimilarity - 0.38) / 0.12;
    percent = Math.round(86 + ratio * 7);
  } else if (rawSimilarity >= 0.28) {
    // Relevan (76% - 85%)
    const ratio = (rawSimilarity - 0.28) / 0.10;
    percent = Math.round(76 + ratio * 9);
  } else {
    // Cukup Relevan (60% - 75%)
    const ratio = Math.max(0, (rawSimilarity - 0.18) / 0.10);
    percent = Math.round(60 + ratio * 15);
  }

  percent = Math.min(99, Math.max(60, percent));

  if (percent >= 86) {
    return {
      percent,
      label: 'Sangat Relevan',
      badgeClass: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    };
  }
  if (percent >= 76) {
    return {
      percent,
      label: 'Relevan',
      badgeClass: 'bg-sec-50 text-sec-900 border border-sec-200/80',
    };
  }
  return {
    percent,
    label: 'Cukup Relevan',
    badgeClass: 'bg-neu-100 text-neu-700 border border-neu-200/80',
  };
}

// Padanan istilah yuridis & bahasa awam agar pencarian semantik mengenali sinonim formal
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

function highlightMatches(text: string, query?: string, synonyms: string[] = []): React.ReactNode {
  if (!text) {
    return '';
  }
  if ((!query || !query.trim()) && (!synonyms || synonyms.length === 0)) {
    return text;
  }

  // Filter kata hubung/stopword umum agar hanya tajuk/kata penting yang di-highlight
  const stopwords = new Set([
    'dan', 'atau', 'yang', 'di', 'ke', 'dari', 'pada', 'untuk', 'oleh',
    'atas', 'dengan', 'aturan', 'pedoman', 'terkait', 'mengenai', 'soal', 'hal',
    'adalah', 'yaitu', 'sebagai', 'dalam', 'ini', 'itu', 'apakah', 'bagaimana',
    'apa', 'siapa', 'bisa', 'kah', 'ada', 'tidak', 'tentang', 'karena', 'kalau',
  ]);

  const rawTokens = (query || '').toLowerCase().split(/[\s\-_,.]+/);
  for (const s of synonyms) {
    rawTokens.push(...s.toLowerCase().split(/[\s\-_,.]+/));
  }

  // Tambahkan padanan yuridis otomatis dari kata pencarian
  for (const token of (query || '').toLowerCase().split(/[\s\-_,.]+/)) {
    if (STATUTORY_EQUIVALENTS[token]) {
      for (const eq of STATUTORY_EQUIVALENTS[token]) {
        rawTokens.push(...eq.toLowerCase().split(/[\s\-_,.]+/));
      }
    }
  }

  const tokens = Array.from(
    new Set(rawTokens.filter((t) => t.length >= 3 && !stopwords.has(t)))
  );

  // Kumpulkan rentang highlight [start, end]
  const ranges: Array<{ start: number; end: number }> = [];

  // 1. Deteksi Klausul Jawaban (Answer Clauses) berdasarkan niat pertanyaan
  const lowerQ = (query || '').toLowerCase();

  // Pola A: Jawaban Batas Usia / Umur (misal: "mencapai umur 19 (sembilan belas) tahun")
  if (/\b(usia|umur|wajar|nikah|kawin|pensiun|dewasa|anak|syarat|batas)\b/i.test(lowerQ)) {
    const agePatterns = [
      /(?:sudah\s+)?mencapai\s+umur\s+\d+\s*(?:\([^)]+\))?\s*tahun/gi,
      /\b(?:umur|usia)\s+\d+\s*(?:\([^)]+\))?\s*tahun\b/gi,
      /\b\d+\s*\([^)]+\)\s*tahun\b/gi,
    ];
    for (const pat of agePatterns) {
      let m: RegExpExecArray | null;
      while ((m = pat.exec(text)) !== null) {
        ranges.push({ start: m.index, end: m.index + m[0].length });
      }
    }
  }

  // Pola B: Jawaban Batas Waktu / Durasi (misal: "paling lama 3 (tiga) bulan", "14 hari")
  if (/\b(lama|waktu|hari|bulan|tahun|kapan|batas|tenggang)\b/i.test(lowerQ)) {
    const timePatterns = [
      /paling\s+(?:lama|singkat|lambat)\s+\d+\s*(?:\([^)]+\))?\s*(?:hari|bulan|tahun)/gi,
      /selama\s+\d+\s*(?:\([^)]+\))?\s*(?:hari|bulan|tahun)/gi,
      /\b\d+\s*(?:\([^)]+\))?\s*(?:hari|bulan|tahun)\s*(?:kerja)?\b/gi,
    ];
    for (const pat of timePatterns) {
      let m: RegExpExecArray | null;
      while ((m = pat.exec(text)) !== null) {
        ranges.push({ start: m.index, end: m.index + m[0].length });
      }
    }
  }

  // Pola C: Jawaban Sanksi / Hukuman / Denda
  if (/\b(hukum|hukuman|pidana|sanksi|denda|penjara|kurungan)\b/i.test(lowerQ)) {
    const sanctionPatterns = [
      /pidana\s+penjara\s+(?:paling\s+lama\s+)?[^,;.]*(?:tahun|bulan)/gi,
      /(?:pidana\s+)?denda\s+(?:paling\s+banyak\s+)?[^,;.]*(?:rupiah|rp)/gi,
    ];
    for (const pat of sanctionPatterns) {
      let m: RegExpExecArray | null;
      while ((m = pat.exec(text)) !== null) {
        ranges.push({ start: m.index, end: m.index + m[0].length });
      }
    }
  }

  // Pola D: Jawaban Besaran / Nominal (misal: "sebesar 50%", "paling sedikit ...")
  if (/\b(berapa|gaji|upah|pesangon|biaya|tarif|nominal)\b/i.test(lowerQ)) {
    const amountPatterns = [
      /paling\s+(?:sedikit|banyak|tinggi|rendah)\s+(?:sebesar\s+)?[^,;.]*/gi,
      /sebesar\s+[^,;.]*/gi,
    ];
    for (const pat of amountPatterns) {
      let m: RegExpExecArray | null;
      while ((m = pat.exec(text)) !== null) {
        ranges.push({ start: m.index, end: m.index + m[0].length });
      }
    }
  }

  // 2. Deteksi Kata Kunci & Padanan Sinonim
  if (tokens.length > 0) {
    const escapedTokens = tokens
      .sort((a, b) => b.length - a.length)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    const tokenRegex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
    let m: RegExpExecArray | null;
    while ((m = tokenRegex.exec(text)) !== null) {
      ranges.push({ start: m.index, end: m.index + m[0].length });
    }
  }

  if (ranges.length === 0) {
    return text;
  }

  // Urutkan rentang dan gabungkan rentang yang tumpang-tindih (overlapping/adjacent)
  ranges.sort((a, b) => a.start - b.start);

  const mergedRanges: Array<{ start: number; end: number }> = [ranges[0]];
  for (let i = 1; i < ranges.length; i++) {
    const prev = mergedRanges[mergedRanges.length - 1];
    const curr = ranges[i];
    if (curr.start <= prev.end) {
      prev.end = Math.max(prev.end, curr.end);
    } else {
      mergedRanges.push({ ...curr });
    }
  }

  // Potong teks berdasarkan rentang yang sudah digabungkan
  const resultElements: React.ReactNode[] = [];
  let lastIndex = 0;

  mergedRanges.forEach((range, idx) => {
    if (range.start > lastIndex) {
      resultElements.push(text.slice(lastIndex, range.start));
    }
    resultElements.push(
      <mark
        key={`match-${idx}`}
        className="bg-suc-100 text-suc-900 font-semibold px-1 py-0.5 rounded transition-colors"
      >
        {text.slice(range.start, range.end)}
      </mark>
    );
    lastIndex = range.end;
  });

  if (lastIndex < text.length) {
    resultElements.push(text.slice(lastIndex));
  }

  return <>{resultElements}</>;
}

function getRegulationStatusStyle(statusName: string) {
  const name = statusName.toLowerCase();
  if (name.includes('tidak')) {
    return {
      bg: 'bg-[#F8E8E8] text-[#B91C1C]',
      icon: <XCircle className="w-3.5 h-3.5 text-[#B91C1C] stroke-[2] shrink-0" />,
      label: 'Tidak Berlaku',
    };
  }
  if (name.includes('ubah')) {
    return {
      bg: 'bg-sec-50 text-sec-900',
      icon: <RefreshCw className="w-3.5 h-3.5 text-sec-900 stroke-[2] shrink-0" />,
      label: 'Diubah',
    };
  }
  if (name.includes('cabut')) {
    return {
      bg: 'bg-neu-100 text-neu-800',
      icon: <XOctagon className="w-3.5 h-3.5 text-neu-800 stroke-[2] shrink-0" />,
      label: 'Dicabut',
    };
  }
  return {
    bg: 'bg-[#E8F2EC] text-[#15803D]',
    icon: <CheckCircle className="w-3.5 h-3.5 text-[#15803D] stroke-[2] shrink-0" />,
    label: 'Berlaku',
  };
}

export function RegulationCard({
  item,
  className = '',
  variant: _variant = 'list',
  searchQuery,
  synonyms = [],
  onClick,
}: RegulationCardProps) {
  const statusName = item.status_peraturan?.nama_status ?? 'Berlaku';
  const jenisNama = item.jenis_peraturan?.nama ?? 'Peraturan';
  const instansiNama = item.instansi || 'Pemerintah Pusat';

  // Kode singkatan jenis peraturan (UU, PP, PERPRES, dll.) sesuai Figma #1684:24674
  const kodeBadge =
    item.jenis_peraturan?.kode ||
    (jenisNama.toLowerCase().includes('undang-undang') || jenisNama.toLowerCase().includes('undang undang')
      ? 'UU'
      : jenisNama.toLowerCase().includes('presiden')
      ? 'PERPRES'
      : jenisNama.toLowerCase().includes('menteri') || jenisNama.toLowerCase().includes('mentri')
      ? 'PERMEN'
      : jenisNama.toLowerCase().includes('pemerintah')
      ? 'PP'
      : jenisNama.toLowerCase().includes('daerah')
      ? 'PERDA'
      : jenisNama);

  const statusStyle = getRegulationStatusStyle(statusName);

  const detailUrl = `/peraturan/${item.unique_id}`;

  const saveTargetPasalToSession = () => {
    if (item.relevant_pasal) {
      try {
        sessionStorage.setItem(
          'lawgates_target_pasal',
          JSON.stringify({
            pasalId: String(item.relevant_pasal.pasal_id),
            nomorPasal: String(item.relevant_pasal.nomor_pasal),
            highlightSnippet: item.relevant_pasal.cuplikan,
          })
        );
      } catch (e) {
        // ignore storage error
      }
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Jangan lakukan navigasi card jika klik berasal dari button atau link di dalam card
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }
    saveTargetPasalToSession();
    if (onClick) {
      onClick(e);
    } else {
      router.visit(detailUrl);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    saveTargetPasalToSession();
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative overflow-hidden bg-white border border-neu-100 rounded-[20px] p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-neu-200 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer ${className}`}
    >
      {/* ── Garis Aksen Sisi Kiri 10px sesuai Figma #1684:24739 (Glide-in halus tanpa menggeser layout) ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[10px] bg-pr-900 opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out pointer-events-none z-10"
      />

      <div>
        {/* ── Row Atas: Kategori dan Status ── */}
        <div className="flex items-center gap-2 mb-4">
          {/* 1. Kategori (Dark Navy Pill, misal "UU") */}
          <span className="inline-flex items-center justify-center bg-pr-900 text-white text-xs font-semibold px-3.5 py-1 rounded-full">
            {kodeBadge}
          </span>

          {/* 2. Status Peraturan (Berlaku / Tidak Berlaku) */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg}`}
          >
            {statusStyle.icon}
            <span>{statusStyle.label}</span>
          </span>
        </div>

        {/* ── Judul Dokumen Peraturan ── */}
        <Link
          href={detailUrl}
          onClick={handleLinkClick}
          className="block text-[14px] sm:text-[15px] font-medium text-neu-800 group-hover:text-pr-900 transition-colors line-clamp-3 leading-snug mb-4"
        >
          {highlightMatches(item.judul, searchQuery, synonyms)}
        </Link>

        {/* ── Highlight Cuplikan Pasal Paling Relevan & Skor Relevansi AI ── */}
        {item.relevant_pasal && (() => {
          const relevance = getRelevanceInfo(item.relevant_pasal.similarity);
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                saveTargetPasalToSession();
                if (onClick) {
                  onClick(e);
                } else {
                  router.visit(detailUrl);
                }
              }}
              className="mb-4 p-3.5 bg-pr-50/60 border border-pr-100/90 rounded-[14px] transition-all group-hover:border-pr-200 hover:bg-suc-50/80 hover:border-suc-300 hover:shadow-sm cursor-pointer group/pasal"
              title="Klik untuk membuka peraturan dan langsung menuju pasal ini"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pr-900 group-hover/pasal:text-suc-900 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-suc-900 shrink-0" />
                  <span>Pasal Paling Relevan: {item.relevant_pasal.nomor_pasal}</span>
                </span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${relevance.badgeClass}`}>
                  <span>{relevance.percent}% {relevance.label}</span>
                </span>
              </div>
              <p className="text-xs text-neu-700 leading-relaxed italic line-clamp-3 sm:line-clamp-4">
                &ldquo;{highlightMatches(item.relevant_pasal.cuplikan.replace(/\s+/g, ' ').trim(), searchQuery, synonyms)}&rdquo;
              </p>

              {/* ── Opsi Pasal Terkait Lainnya (Secondary Pasal) ── */}
              {item.relevant_pasal.secondary_pasal && item.relevant_pasal.secondary_pasal.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-pr-100/70 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[11px] font-medium text-neu-500">Pasal terkait lainnya:</span>
                  {item.relevant_pasal.secondary_pasal.map((sec) => (
                    <button
                      key={sec.pasal_id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        try {
                          sessionStorage.setItem(
                            'lawgates_target_pasal',
                            JSON.stringify({
                              pasalId: String(sec.pasal_id),
                              nomorPasal: String(sec.nomor_pasal),
                              highlightSnippet: sec.cuplikan,
                            })
                          );
                        } catch (err) {
                          // ignore storage error
                        }
                        if (onClick) {
                          onClick(e);
                        } else {
                          router.visit(detailUrl);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-neu-200 hover:border-suc-400 hover:bg-suc-50 hover:text-suc-900 rounded-md text-[11px] font-medium text-neu-700 transition-all shadow-2xs group/sec"
                      title={`Buka langsung ke ${sec.nomor_pasal}`}
                    >
                      <span>{sec.nomor_pasal}</span>
                      <span className="text-[10px] text-suc-800">
                        ({getRelevanceInfo(sec.similarity).percent}%)
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-2.5 pt-2 border-t border-pr-100/60 flex items-center justify-between text-[11px] text-suc-900 font-semibold">
                <span className="group-hover/pasal:underline">Buka langsung ke {item.relevant_pasal.nomor_pasal}</span>
                <span className="group-hover/pasal:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── Row Bawah: Tahun, Garis, Instansi, Simpan (Bookmark), dan Tombol Lihat Detail ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-neu-50 text-xs text-neu-500 mt-auto">
        <div className="flex items-center gap-2.5">
          <span className="text-neu-600 text-xs sm:text-sm font-normal">Tahun {item.tahun}</span>
          <span className="w-px h-4 bg-neu-200" />
          <span className="px-3 py-1 bg-neu-100 text-neu-600 rounded-full text-xs font-medium truncate max-w-[150px]">
            {instansiNama}
          </span>

          {/* Reusable Bookmark Button */}
          <BookmarkButton
            peraturanId={item.id}
            variant="icon"
            size="sm"
          />
        </div>

        {/* Tombol Lihat Detail (Tetap lembut #E7E8EC dan text-pr-900 sesuai Figma node #1684:24754) */}
        <Link
          href={detailUrl}
          onClick={handleLinkClick}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E7E8EC] hover:bg-pr-900 text-pr-900 hover:text-white rounded-[10px] text-xs font-medium transition-colors shrink-0"
        >
          <Eye className="w-4 h-4 stroke-[1.75]" />
          <span>Lihat Detail</span>
        </Link>
      </div>
    </div>
  );
}

export default RegulationCard;
