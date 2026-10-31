import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Plus, Trash2, Search, Loader2 } from 'lucide-react';
import { TimelineRelationItem } from './correctionParser';
import { Badge } from '@/Components/common/Badge';
import { RelationTypeDropdown, RelationType } from './RelationTypeDropdown';

interface TargetOption {
  id: number;
  unique_id: string;
  judul: string;
  nomor?: string;
  tahun?: number | string;
}

interface CorrectionTimelineSectionProps {
  riwayatPerubahan: TimelineRelationItem[];
  onChangeKode?: (id: string, newKode: string) => void;
  onAddRelation?: (relation: { kode: string; tipe: 'mencabut' | 'mengubah' | 'dicabut' | 'diubah' }) => void;
  onDeleteRelation?: (id: string) => void;
  onChangeRelationType?: (id: string, newTipe: 'mencabut' | 'mengubah' | 'dicabut' | 'diubah') => void;
}

export function CorrectionTimelineSection({
  riwayatPerubahan,
  onChangeKode,
  onAddRelation,
  onDeleteRelation,
  onChangeRelationType,
}: CorrectionTimelineSectionProps) {
  // State form penambahan relasi baru
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTipe, setSelectedTipe] = useState<'mencabut' | 'mengubah' | 'dicabut' | 'diubah'>('mengubah');
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState<TargetOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<TargetOption | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search target peraturan via endpoint admin
  useEffect(() => {
    if (!isAdding || searchQuery.trim().length < 2) {
      setOptions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingOptions(true);
      try {
        const res = await fetch(`/admin/dokumen-hukum/search-peraturan?q=${encodeURIComponent(searchQuery.trim())}`, {
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          const json = await res.json();
          setOptions(json.data || []);
          setIsDropdownOpen(true);
        }
      } catch (err) {
        console.error('Failed to search peraturan:', err);
      } finally {
        setIsLoadingOptions(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, isAdding]);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConfirmAdd = () => {
    const targetCode = selectedTarget ? selectedTarget.unique_id : searchQuery.trim();
    if (!targetCode) return;

    onAddRelation?.({
      kode: targetCode,
      tipe: selectedTipe,
    });

    // Reset state form
    setSelectedTarget(null);
    setSearchQuery('');
    setOptions([]);
    setIsAdding(false);
  };

  const getTipeLabel = (tipe: string) => {
    switch (tipe.toLowerCase()) {
      case 'mencabut':
        return 'Mencabut';
      case 'dicabut':
      case 'dicabut_oleh':
        return 'Dicabut oleh';
      case 'diubah':
      case 'diubah_oleh':
        return 'Diubah oleh';
      case 'mengubah':
      default:
        return 'Mengubah';
    }
  };

  const getTimelineItemRelationType = (item: TimelineRelationItem): RelationType => {
    const lbl = (item.keteranganBadge?.label || '').toLowerCase();
    if (lbl.includes('dicabut')) return 'dicabut';
    if (lbl.includes('mencabut')) return 'mencabut';
    if (lbl.includes('diubah')) return 'diubah';
    if (lbl.includes('mengubah')) return 'mengubah';

    if (item.keteranganBadge?.variant === 'dicabut') return 'dicabut';
    if (item.keteranganBadge?.variant === 'diubah') return 'diubah';
    return 'mengubah';
  };

  return (
    <div className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs">
      {/* Header Capsule Riwayat Perubahan & Tombol Tambah Relasi */}
      <div className="flex items-center justify-between mb-5 gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-pr-50 text-pr-900 border border-pr-100">
          <RotateCcw className="w-4 h-4 stroke-[2.2] text-pr-900" />
          <span className="text-[12px] font-bold tracking-wide uppercase">
            RIWAYAT & RELASI HUKUM
          </span>
        </div>

        {onAddRelation && !isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-pr-900 bg-pr-50 hover:bg-pr-100 rounded-[10px] transition-colors cursor-pointer border border-pr-100 shadow-2xs"
            title="Tambah pemetaan relasi hukum baru"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Relasi</span>
          </button>
        )}
      </div>

      {/* Formulir Penambahan Relasi Baru (ADM40) */}
      {isAdding && (
        <div className="mb-4 p-4 bg-neu-50/50 border border-neu-100 rounded-[14px] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-neu-900 uppercase tracking-wide">
              Tambah Relasi Hukum
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setSearchQuery('');
                setSelectedTarget(null);
              }}
              className="px-2.5 py-1 text-[11px] font-medium text-neu-700 bg-white hover:bg-neu-100/80 border border-neu-200 rounded-[8px] transition-colors cursor-pointer shadow-2xs"
            >
              Batal
            </button>
          </div>

          {/* Selektor Jenis Relasi */}
          <div>
            <label className="block text-[11px] font-medium text-neu-700 mb-1.5">
              Jenis Relasi
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['mengubah', 'diubah', 'mencabut', 'dicabut'] as const).map((tipe) => (
                <button
                  key={tipe}
                  type="button"
                  onClick={() => setSelectedTipe(tipe)}
                  className={`px-2.5 py-1.5 text-[12px] font-medium rounded-[8px] border transition-all text-left cursor-pointer ${
                    selectedTipe === tipe
                      ? 'border-pr-900 bg-pr-900 text-white shadow-2xs'
                      : 'border-neu-100 bg-white text-neu-700 hover:bg-neu-50 hover:border-neu-200'
                  }`}
                >
                  {getTipeLabel(tipe)}
                </button>
              ))}
            </div>
          </div>

          {/* Pencarian & Pemilihan Peraturan Target */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-[11px] font-medium text-neu-700 mb-1.5">
              Peraturan Target
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-neu-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={selectedTarget ? `${selectedTarget.unique_id} - ${selectedTarget.judul}` : searchQuery}
                onChange={(e) => {
                  setSelectedTarget(null);
                  setSearchQuery(e.target.value);
                }}
                onFocus={() => {
                  if (options.length > 0) setIsDropdownOpen(true);
                }}
                placeholder="Ketik Standar ID atau judul peraturan..."
                className="w-full pl-9 pr-8 py-2 text-[12px] rounded-[10px] border border-neu-100 bg-white text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 hover:border-neu-200 transition-all"
              />
              {isLoadingOptions && (
                <Loader2 className="w-4 h-4 text-pr-900 animate-spin absolute right-3 pointer-events-none" />
              )}
            </div>

            {/* Dropdown Hasil Pencarian */}
            {isDropdownOpen && (
              <div className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-neu-100 rounded-[12px] shadow-lg py-1">
                {options.length > 0 ? (
                  options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedTarget(opt);
                        setSearchQuery(opt.unique_id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[12px] hover:bg-neu-50 flex flex-col gap-0.5 border-b border-neu-50 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-semibold text-neu-900">{opt.unique_id}</span>
                      <span className="text-[11px] text-neu-600 line-clamp-1">{opt.judul}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-[11px] text-neu-500">
                    {searchQuery.length < 2 ? 'Ketik minimal 2 karakter...' : 'Tidak ada peraturan ditemukan'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tombol Simpan Relasi ke Daftar */}
          <button
            type="button"
            disabled={!selectedTarget && !searchQuery.trim()}
            onClick={handleConfirmAdd}
            className="w-full py-2 bg-pr-900 text-white text-[12px] font-semibold rounded-[10px] hover:bg-pr-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
          >
            Tambahkan ke Daftar
          </button>
        </div>
      )}

      {/* Vertical Timeline - Scrollable container responsif */}
      <div className="relative pl-1 max-h-[460px] overflow-y-auto pr-1.5 custom-scrollbar">
        {riwayatPerubahan.map((item, index) => {
          const isLast = index === riwayatPerubahan.length - 1;

          return (
            <div key={item.id} className="relative flex items-stretch gap-4 min-w-0">
              {/* Kolom Node & Garis Vertikal Menyambung */}
              <div className="relative flex flex-col items-center shrink-0 w-5">
                {/* Node Titik */}
                {item.isCurrent ? (
                  <div className="relative z-10 w-4 h-4 rounded-full bg-pr-900 ring-4 ring-pr-100 shrink-0 mt-3" />
                ) : (
                  <div className="relative z-10 w-4 h-4 rounded-full border-2 border-neu-300 bg-white shrink-0 mt-3" />
                )}

                {/* Garis vertikal yang menyambung otomatis ke node berikutnya */}
                {!isLast && (
                  <div className="w-[1.5px] flex-1 bg-neu-100 my-0.5 min-h-[24px]" />
                )}
              </div>

              {/* Konten Riwayat */}
              <div className={`min-w-0 flex-1 space-y-2 ${isLast ? 'pb-2' : 'pb-5'}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.kode}
                    onChange={(e) => onChangeKode?.(item.id, e.target.value)}
                    readOnly={item.isCurrent}
                    className={`w-full rounded-[10px] border border-neu-100 px-3 py-2 text-[12px] font-mono text-neu-800 break-all leading-snug focus:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 hover:border-neu-200 transition-all ${
                      item.isCurrent ? 'bg-neu-50/60 cursor-not-allowed text-neu-500 border-dashed' : 'bg-white'
                    }`}
                    placeholder="Standar ID Peraturan Target"
                  />

                  {/* Tombol Hapus Relasi Manual (Kecuali Dokumen yang Sedang Dikoreksi) */}
                  {!item.isCurrent && onDeleteRelation && (
                    <button
                      type="button"
                      onClick={() => onDeleteRelation(item.id)}
                      title="Hapus pemetaan relasi ini"
                      className="p-1.5 text-neu-400 hover:text-dan-900 hover:bg-dan-50 rounded-[8px] transition-colors cursor-pointer shrink-0 border border-transparent hover:border-dan-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {item.isCurrent ? (
                  <div>
                    <Badge variant="primary">
                      {item.currentStatusLabel || 'Sedang dikoreksi'}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {/* Selektor Ubah Jenis Relasi Cepat */}
                    {onChangeRelationType ? (
                      <RelationTypeDropdown
                        value={getTimelineItemRelationType(item)}
                        onChange={(newTipe) => onChangeRelationType(item.id, newTipe)}
                      />
                    ) : (
                      item.keteranganBadge && (
                        <Badge
                          variant={
                            item.keteranganBadge.variant === 'diubah' ||
                            item.keteranganBadge.variant === 'mengubah'
                              ? 'danger'
                              : 'warning'
                          }
                        >
                          {item.keteranganBadge.label}
                        </Badge>
                      )
                    )}

                    {item.statusBadge && (
                      <Badge
                        variant={
                          item.statusBadge.variant === 'tersedia'
                            ? 'success'
                            : 'danger'
                        }
                      >
                        {item.statusBadge.label}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
