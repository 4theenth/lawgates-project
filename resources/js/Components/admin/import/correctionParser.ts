import { ValidatedFileItem } from './StepValidationCorrection';

export interface TargetIndukInfo {
  standardId: string;
  labelSingkat?: string;
  namaLengkap?: string;
}

export interface ArticleItem {
  id: string;
  nomor: string;
  isi: string;
  penjelasan?: string;
  isExpanded?: boolean;
  pasalList?: ArticleItem[];
  pasalDiubahList?: ArticleItem[];

  // 9 Field Utama & Core Metadata Hukum
  tipe?: string; // 'PASAL' | 'PASAL_PERUBAHAN' | 'PASAL_PERUBAHAN_CONTAINER'
  label?: string;
  bagianDokumen?: string;
  hierarki?: string;
  parentBab?: string;
  parentBagian?: string;
  parentParagraf?: string;
  parentPasalPerubahan?: string;
  targetInduk?: TargetIndukInfo;
}

export interface ParagraphItem {
  id: string;
  judul: string;
  deskripsi?: string;
  pasalList: ArticleItem[];
  isExpanded?: boolean;
}

export interface BagianItem {
  id: string;
  judul: string;
  deskripsi?: string;
  paragrafList?: ParagraphItem[];
  pasalList?: ArticleItem[];
  children?: ChapterItem[];
  isExpanded?: boolean;
}

export interface ChapterItem {
  id: string;
  judul: string;
  deskripsi?: string;
  tipe?: 'BAB' | 'BAGIAN' | 'PARAGRAF';
  label?: string;
  parentBab?: string;
  parentBagian?: string;
  pasalList: ArticleItem[];
  children?: ChapterItem[];
  isExpanded?: boolean;
}

export interface TimelineRelationItem {
  id: string;
  kode: string;
  statusBadge?: {
    label: string;
    variant: 'tersedia' | 'belum_tersedia';
  };
  keteranganBadge?: {
    label: string;
    variant: 'diubah' | 'mengubah' | 'dicabut';
  };
  currentStatusLabel?: string;
  isCurrent?: boolean;
}

export interface LegalDocumentCorrectionData {
  standarId: string;
  judul: string;
  pembukaan: {
    judul: string;
    subJudul?: string;
    menimbang: string;
    mengingat: string;
    memutuskan: string;
    isExpanded?: boolean;
  };
  babList: ChapterItem[];
  riwayatPerubahan: TimelineRelationItem[];
  metadata: {
    pemrakarsa: string;
    tanggalDitetapkan: string;
    tempatPenetapan?: string;
    pejabatPenetap?: string;
  };
}

export type LegalActionType = 'DIUBAH' | 'DITAMBAH' | 'DIHAPUS' | 'DIUBAH_DAN_DITAMBAH';

/**
 * Ekstrak ID & Nama Peraturan Target yang diubah dari teks pasal (misal UU No 26 Tahun 2007)
 */
export function detectTargetPeraturan(teks: string, explicitTarget?: string): TargetIndukInfo | undefined {
  if (explicitTarget && explicitTarget.trim()) {
    const formatted = formatStandardId(explicitTarget);
    // Ubah slug seperti "undang-undang-26-2007" menjadi label yang mudah dibaca "UU 26/2007"
    const slugMatch = formatted.match(/^([A-Z]+)_No_(\d+)_(\d{4})$/i);
    const labelSingkat = slugMatch ? `${slugMatch[1]} ${slugMatch[2]}/${slugMatch[3]}` : formatted;
    return {
      standardId: formatted,
      labelSingkat,
      namaLengkap: explicitTarget,
    };
  }

  if (!teks) return undefined;

  // Pattern pencarian peraturan target di dalam teks pasal perubah
  const match = teks.match(
    /(?:ketentuan\s+dalam\s+|perubahan\s+atas\s+|mengubah\s+)?(Undang[-_\s]?Undang|Peraturan[-_\s]?Pemerintah\s+Pengganti\s+Undang[-_\s]?Undang|Peraturan[-_\s]?Pemerintah|Peraturan[-_\s]?Presiden|Peraturan[-_\s]?Menteri)\s+Nomor\s+(\d+)\s+Tahun\s+(\d{4})(?:\s+tentang\s+([^,.\n()]+))?/i
  );

  if (match) {
    const rawJenis = match[1];
    const nomor = match[2];
    const tahun = match[3];
    const tentang = match[4] ? match[4].trim() : '';

    const stdId = formatStandardId(`${rawJenis} ${nomor} ${tahun}`);
    const prefix = stdId.split('_No_')[0] || 'UU';
    const labelSingkat = `${prefix} ${nomor}/${tahun}`;
    const namaLengkap = `${rawJenis} Nomor ${nomor} Tahun ${tahun}${tentang ? ` tentang ${tentang}` : ''}`;

    return {
      standardId: stdId,
      labelSingkat,
      namaLengkap,
    };
  }

  return undefined;
}

export function detectActionType(teks: string): { type: LegalActionType; label: string; badgeColor: string } {
  if (!teks) return { type: 'DIUBAH', label: 'Diubah', badgeColor: 'bg-blue-50 text-blue-800 border-blue-200' };

  const lower = teks.toLowerCase();
  const isTambah = lower.includes('disisipkan') || lower.includes('ditambah') || lower.includes('pasal selipan') || lower.includes('pasal baru');
  const isHapus = lower.includes('dihapus') || lower.includes('dicabut');
  const isUbah = lower.includes('diubah') || lower.includes('berbunyi sebagai berikut') || lower.includes('ketentuan pasal');

  if (isTambah && isUbah) {
    return { type: 'DIUBAH_DAN_DITAMBAH', label: 'Diubah & Ditambah', badgeColor: 'bg-amber-50 text-amber-900 border-amber-300' };
  }
  if (isTambah) {
    return { type: 'DITAMBAH', label: 'Ditambah', badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300' };
  }
  if (isHapus) {
    return { type: 'DIHAPUS', label: 'Dihapus', badgeColor: 'bg-rose-50 text-rose-900 border-rose-300' };
  }
  return { type: 'DIUBAH', label: 'Diubah', badgeColor: 'bg-blue-50 text-blue-900 border-blue-300' };
}

/**
 * Format string atau slug ID menjadi format standar hukum (e.g. UU_No_6_2023, PP_No_2_2022)
 */
export function formatStandardId(rawId: string): string {
  if (!rawId) return '';
  const trimmed = String(rawId).trim();

  // Jika sudah dalam format baku UU_No_6_2023 atau sejenisnya
  if (/^[A-Za-z0-9_]+_No_\d+_\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  // Pola slug OCR: "undang-undang-6-2023", "peraturan-pemerintah-2-2022", "perpu-2-2022"
  const slugMatch = trimmed.match(/^([a-z-]+)-(\d+)-(\d{4})$/i);
  if (slugMatch) {
    const typeSlug = slugMatch[1].toLowerCase().replace(/_/g, '-');
    const nomor = slugMatch[2];
    const tahun = slugMatch[3];
    let prefix = 'UU';
    if (typeSlug.includes('perpu') || typeSlug.includes('perppu')) prefix = 'PERPPU';
    else if (typeSlug.includes('pemerintah') || typeSlug === 'pp') prefix = 'PP';
    else if (typeSlug.includes('presiden') || typeSlug === 'perpres') prefix = 'PERPRES';
    else if (typeSlug.includes('menteri') || typeSlug === 'permen') prefix = 'PERMEN';
    else if (typeSlug.includes('uud')) prefix = 'UUD';
    else if (typeSlug.includes('daerah') || typeSlug === 'perda') prefix = 'PERDA';
    return `${prefix}_No_${nomor}_${tahun}`;
  }

  // Pola teks: "undang undang nomor 6 tahun 2023"
  const textMatch = trimmed.match(
    /(undang[-_\s]?undang|perpu|perppu|peraturan[-_\s]?pemerintah|perpres|permen|uud)[^0-9]*(\d+)[^0-9]+(\d{4})/i
  );
  if (textMatch) {
    let prefix = 'UU';
    const t = textMatch[1].toLowerCase();
    if (t.includes('perpu') || t.includes('perppu')) prefix = 'PERPPU';
    else if (t.includes('pemerintah')) prefix = 'PP';
    else if (t.includes('presiden') || t.includes('perpres')) prefix = 'PERPRES';
    else if (t.includes('menteri') || t.includes('permen')) prefix = 'PERMEN';
    else if (t.includes('uud')) prefix = 'UUD';
    return `${prefix}_No_${textMatch[2]}_${textMatch[3]}`;
  }

  // Khusus dokumen kolonial / staatsblad
  if (trimmed.toLowerCase().includes('staatsblad')) {
    const stMatch = trimmed.match(/(\d{4})[^0-9]+(\d+)/);
    if (stMatch) {
      return `Staatsblad_${stMatch[1]}_No_${stMatch[2]}`;
    }
    return 'Staatsblad_1926_No_226';
  }

  // Jika string terlalu panjang (misal nama file panjang), ekstrak nomor & tahun
  if (trimmed.length > 30) {
    const numYearMatch = trimmed.match(/(\d+)[^0-9]+(\d{4})/);
    if (numYearMatch) {
      return `UU_No_${numYearMatch[1]}_${numYearMatch[2]}`;
    }
    return trimmed.substring(0, 25).replace(/[^a-zA-Z0-9_]/g, '_');
  }

  return trimmed.replace(/[^a-zA-Z0-9_]/g, '_');
}

/**
 * Ekstraktor data hukum murni dari berkas JSON tanpa data dummy fiktif
 */
export function generateInitialCorrectionData(
  file: ValidatedFileItem
): LegalDocumentCorrectionData {
  if (file.correctionData) {
    return file.correctionData;
  }

  const raw =
    file.parsedData && typeof file.parsedData === 'object'
      ? Array.isArray(file.parsedData)
        ? file.parsedData[0] || {}
        : file.parsedData
      : {};

  const meta = raw.metadata && typeof raw.metadata === 'object' ? raw.metadata : raw;
  const fileName = file.name.replace(/\.json$/i, '');

  // 1. STANDAR ID
  const rawStandarId =
    meta.standard_id ||
    meta.standar_id ||
    meta.standarId ||
    raw.standar_id ||
    raw.standard_id ||
    raw.id;

  let standarId = '';
  if (rawStandarId) {
    standarId = formatStandardId(rawStandarId);
  } else if ((meta.nomor || raw.nomor) && (meta.tahun || raw.tahun)) {
    const prefix = (meta.tipe_peraturan || meta.jenis || raw.jenis || file.category || 'UU').replace(/[\s-]+/g, '_');
    standarId = `${prefix}_No_${meta.nomor || raw.nomor}_${meta.tahun || raw.tahun}`;
  } else {
    standarId = formatStandardId(`${fileName} ${meta.judul || raw.judul || ''}`);
  }

  // 2. JUDUL PERATURAN
  const judul =
    meta.judul ||
    meta.title ||
    meta.nama ||
    raw.judul ||
    raw.title ||
    file.title ||
    fileName.replace(/_/g, ' ');

  // 3. PEMBUKAAN (Ekstraksi murni dari chunks / field JSON)
  let menimbang = '';
  let mengingat = '';
  let memutuskan = '';
  let subJudulPembukaan = '';

  if (Array.isArray(raw.chunks)) {
    const mengingatChunks: string[] = [];

    raw.chunks.forEach((c: any) => {
      const tipe = String(c.tipe || '').toUpperCase();
      const label = String(c.label || '').toLowerCase();
      const teks = String(c.teks || c.isi || '').trim();

      if (!teks) return;

      if (tipe === 'PEMBUKAAN' || label.includes('pembukaan')) {
        if (!subJudulPembukaan) subJudulPembukaan = teks;
      } else if (tipe === 'KONSIDERANS' || label.includes('menimbang')) {
        if (!menimbang) menimbang = teks;
      } else if (tipe === 'DASAR_HUKUM' || label.includes('mengingat')) {
        mengingatChunks.push(teks);
      } else if (tipe === 'DIKTUM' || label.includes('memutuskan') || label.includes('menetapkan')) {
        if (!memutuskan) memutuskan = teks;
      }
    });

    if (mengingatChunks.length > 0) {
      mengingat = mengingatChunks.join('\n\n');
    }
  }

  // Fallback ke properti pembukaan langsung jika chunks tidak ada
  const pembukaanRaw = raw.pembukaan && typeof raw.pembukaan === 'object' ? raw.pembukaan : {};
  if (!menimbang) menimbang = pembukaanRaw.menimbang || raw.menimbang || '';
  if (!mengingat) mengingat = pembukaanRaw.mengingat || raw.mengingat || '';
  if (!memutuskan) memutuskan = pembukaanRaw.memutuskan || raw.memutuskan || '';
  if (!subJudulPembukaan) {
    subJudulPembukaan =
      pembukaanRaw.subJudul ||
      pembukaanRaw.sub_judul ||
      meta.tentang ||
      raw.tentang ||
      '';
  }

  const judulPembukaan = pembukaanRaw.judul || judul || 'Pembukaan';

  // 4. BATANG TUBUH (BAB, BAGIAN, PARAGRAF, & PASAL ADAPTIF BERPERINGKAT)
  let babList: ChapterItem[] = [];

  if (Array.isArray(raw.chunks) && raw.chunks.length > 0) {
    // A. Peta Penjelasan dari chunks bertipe PENJELASAN_PASAL
    const penjelasanMap = new Map<string, string>();
    raw.chunks.forEach((c: any) => {
      const tipe = String(c.tipe || '').toUpperCase();
      const bagian = String(c.bagian_dokumen || '').toUpperCase();
      if (tipe === 'PENJELASAN_PASAL' || (tipe === 'PASAL' && bagian === 'PENJELASAN')) {
        const labelKey = String(c.label || '').trim();
        if (labelKey) {
          penjelasanMap.set(labelKey, String(c.teks || c.isi || '').trim());
        }
      }
    });

    // State Machine untuk pelacakan konteks hierarki (Self-Healing Parser)
    let currentBab: ChapterItem | null = null;
    let currentBagian: ChapterItem | null = null;
    let currentParagraf: ChapterItem | null = null;
    let currentContainerPasal: ArticleItem | null = null;
    const containerPasalMap = new Map<string, ArticleItem>(); // Key: label pasal perubah (e.g. "Pasal 17")

    // Filter chunk non-pembukaan / non-penjelasan umum
    const mainChunks = raw.chunks.filter((c: any) => {
      const tipe = String(c.tipe || '').toUpperCase();
      return (
        tipe !== 'PEMBUKAAN' &&
        tipe !== 'KONSIDERANS' &&
        tipe !== 'DASAR_HUKUM' &&
        tipe !== 'DIKTUM' &&
        tipe !== 'PENJELASAN_UMUM'
      );
    });

    // Cek keberadaan chunk bertipe BAB
    const hasBabChunks = mainChunks.some((c: any) => String(c.tipe || '').toUpperCase() === 'BAB');

    // Jika tidak ada chunk BAB sama sekali, buat Batang Tubuh bawaan
    if (!hasBabChunks) {
      currentBab = {
        id: 'bab-1',
        judul: 'Batang Tubuh',
        deskripsi: '',
        tipe: 'BAB',
        isExpanded: true,
        pasalList: [],
        children: [],
      };
      babList.push(currentBab);
    }

    mainChunks.forEach((c: any, idx: number) => {
      const tipe = String(c.tipe || '').toUpperCase();
      const label = String(c.label || '').trim();
      const teks = String(c.teks || c.isi || '').trim();
      const bagianDok = String(c.bagian_dokumen || 'BATANG_TUBUH').toUpperCase();

      // Abaikan jika chunk ini adalah penjelasan pasal yang sudah dipetakan
      if (tipe === 'PENJELASAN_PASAL' || (tipe === 'PASAL' && bagianDok === 'PENJELASAN')) {
        return;
      }

      // --- 1. PROSES BAB ---
      if (tipe === 'BAB') {
        const babNum = babList.length + 1;
        const babJudul = label.startsWith('BAB') ? label : `BAB ${babNum}${label ? ` - ${label}` : ''}`;
        
        currentBab = {
          id: `bab-${babNum}`,
          judul: babJudul,
          deskripsi: teks,
          tipe: 'BAB',
          label: label,
          isExpanded: babList.length < 2,
          pasalList: [],
          children: [],
        };
        babList.push(currentBab);

        // Reset sub-state
        currentBagian = null;
        currentParagraf = null;
        currentContainerPasal = null;
        return;
      }

      // Pastikan ada currentBab aktif
      if (!currentBab) {
        currentBab = {
          id: 'bab-1',
          judul: 'Batang Tubuh',
          deskripsi: '',
          tipe: 'BAB',
          isExpanded: true,
          pasalList: [],
          children: [],
        };
        babList.push(currentBab);
      }

      // --- 2. PROSES BAGIAN ---
      if (tipe === 'BAGIAN') {
        const bagianCount = (currentBab.children || []).filter((ch) => ch.tipe === 'BAGIAN').length + 1;
        const bagianJudul = label.toLowerCase().startsWith('bagian')
          ? label
          : `Bagian ${bagianCount}${label ? ` - ${label}` : ''}`;

        currentBagian = {
          id: `${currentBab.id}-bagian-${bagianCount}`,
          judul: bagianJudul,
          deskripsi: teks,
          tipe: 'BAGIAN',
          label: label,
          parentBab: currentBab.judul,
          isExpanded: true,
          pasalList: [],
          children: [],
        };

        if (!currentBab.children) currentBab.children = [];
        currentBab.children.push(currentBagian);

        // Reset sub-state di bawah bagian
        currentParagraf = null;
        currentContainerPasal = null;
        return;
      }

      // --- 3. PROSES PARAGRAF ---
      if (tipe === 'PARAGRAF') {
        const parentNode = currentBagian || currentBab;
        const paragrafCount = (parentNode.children || []).filter((ch) => ch.tipe === 'PARAGRAF').length + 1;
        const paragrafJudul = label.toLowerCase().startsWith('paragraf')
          ? label
          : `Paragraf ${paragrafCount}${label ? ` - ${label}` : ''}`;

        currentParagraf = {
          id: `${parentNode.id}-paragraf-${paragrafCount}`,
          judul: paragrafJudul,
          deskripsi: teks,
          tipe: 'PARAGRAF',
          label: label,
          parentBab: currentBab.judul,
          parentBagian: currentBagian?.judul,
          isExpanded: true,
          pasalList: [],
          children: [],
        };

        if (!parentNode.children) parentNode.children = [];
        parentNode.children.push(currentParagraf);

        currentContainerPasal = null;
        return;
      }

      // --- 4. PROSES PASAL & PASAL PERUBAHAN ---
      if (tipe === 'PASAL' || tipe === 'PASAL_PERUBAHAN') {
        const parentPasalPerubahanRef = c.parent_pasal_perubahan || c.parentPasalPerubahan || '';

        // Kasus A: Chunk ini adalah anak dari Pasal Perubahan (Anakan Pasal Target)
        if (parentPasalPerubahanRef) {
          const parentContainer = containerPasalMap.get(parentPasalPerubahanRef) || currentContainerPasal;
          const targetInfo = detectTargetPeraturan(teks, c.target_induk || parentContainer?.targetInduk?.standardId);

          const childPasalItem: ArticleItem = {
            id: c.id || `pasal-sub-${idx + 1}`,
            nomor: label || `Angka ${idx + 1}`,
            isi: teks,
            penjelasan: penjelasanMap.get(label) || '',
            tipe: 'PASAL_PERUBAHAN',
            label: label,
            bagianDokumen: bagianDok,
            hierarki: c.hierarki || '',
            parentBab: c.parent_bab || currentBab.judul,
            parentBagian: c.parent_bagian || currentBagian?.judul,
            parentParagraf: c.parent_paragraf || currentParagraf?.judul,
            parentPasalPerubahan: parentPasalPerubahanRef,
            targetInduk: targetInfo,
            isExpanded: true,
          };

          if (parentContainer) {
            if (!parentContainer.pasalList) parentContainer.pasalList = [];
            parentContainer.pasalList.push(childPasalItem);
          } else {
            // Fallback jika container pasal perubah tidak terdaftar, masukkan ke parent node aktif
            const activeNode = currentParagraf || currentBagian || currentBab;
            activeNode.pasalList.push(childPasalItem);
          }
          return;
        }

        // Kasus B: Chunk ini adalah Pasal Utama dari Peraturan Ini
        const pasalLabel = label || `Pasal ${idx + 1}`;
        const targetInfo = detectTargetPeraturan(teks, c.target_induk);
        const isContainerPerubahan =
          tipe === 'PASAL_PERUBAHAN' ||
          Boolean(targetInfo) ||
          /diubah\s+sebagai\s+berikut/i.test(teks) ||
          /beberapa\s+ketentuan\s+dalam/i.test(teks);

        const pasalItem: ArticleItem = {
          id: c.id || `pasal-${currentBab.id}-${idx + 1}`,
          nomor: pasalLabel,
          isi: teks,
          penjelasan: penjelasanMap.get(pasalLabel) || '',
          tipe: isContainerPerubahan ? 'PASAL_PERUBAHAN_CONTAINER' : 'PASAL',
          label: pasalLabel,
          bagianDokumen: bagianDok,
          hierarki: c.hierarki || '',
          parentBab: c.parent_bab || currentBab.judul,
          parentBagian: c.parent_bagian || currentBagian?.judul,
          parentParagraf: c.parent_paragraf || currentParagraf?.judul,
          targetInduk: targetInfo,
          pasalList: [],
          isExpanded: true,
        };

        // Simpan ke peta container pasal jika berpola perubah
        if (isContainerPerubahan) {
          containerPasalMap.set(pasalLabel, pasalItem);
          currentContainerPasal = pasalItem;
        } else {
          currentContainerPasal = null;
        }

        // Masukkan pasal ke parent node aktif (Paragraf > Bagian > Bab)
        const activeNode = currentParagraf || currentBagian || currentBab;
        activeNode.pasalList.push(pasalItem);
      }
    });
  }

  // Jika belum terbentuk dari chunks, periksa struktur babList / pasal standar
  if (babList.length === 0) {
    const rawBabSource =
      raw.babList ||
      raw.bab_list ||
      raw.bab ||
      raw.struktur ||
      raw.struktur_dokumen;

    if (Array.isArray(rawBabSource) && rawBabSource.length > 0) {
      babList = rawBabSource.map((b: any, bIdx: number) => {
        const rawPasals = b.pasalList || b.pasal_list || b.pasal || b.pasals || [];
        return {
          id: b.id || `bab-${bIdx + 1}`,
          judul: b.judul || b.nama || `BAB ${bIdx + 1}`,
          deskripsi: b.deskripsi || '',
          tipe: 'BAB',
          isExpanded: bIdx < 2,
          pasalList: Array.isArray(rawPasals)
            ? rawPasals.map((p: any, pIdx: number) => ({
                id: p.id || `pasal-${bIdx + 1}-${pIdx + 1}`,
                nomor: p.nomor || p.label || `Pasal ${pIdx + 1}`,
                isi: typeof p.isi === 'string' ? p.isi : p.text || p.content || '',
                isExpanded: true,
              }))
            : [],
        };
      });
    } else if (Array.isArray(raw.pasal || raw.pasals || raw.articles)) {
      const pasals: any[] = raw.pasal || raw.pasals || raw.articles;
      babList = [
        {
          id: 'bab-1',
          judul: 'Batang Tubuh',
          deskripsi: '',
          tipe: 'BAB',
          isExpanded: true,
          pasalList: pasals.map((p, pIdx) => ({
            id: p.id || `pasal-${pIdx + 1}`,
            nomor: p.nomor || p.label || `Pasal ${pIdx + 1}`,
            isi: typeof p.isi === 'string' ? p.isi : p.text || '',
            isExpanded: true,
          })),
        },
      ];
    }
  }

  // 5. RIWAYAT PERUBAHAN (Berdasarkan relasi asli dari berkas JSON)
  const riwayatPerubahan: TimelineRelationItem[] = [];
  const seenCodes = new Set<string>();

  // A. Jika di dalam JSON terdapat array riwayat_perubahan / relasi langsung
  const rawRiwayatArray: any[] =
    (Array.isArray(raw.riwayat_perubahan) ? raw.riwayat_perubahan : null) ||
    (Array.isArray(meta.riwayat_perubahan) ? meta.riwayat_perubahan : null) ||
    (Array.isArray(raw.riwayat) ? raw.riwayat : null) ||
    (Array.isArray(raw.perubahan) ? raw.perubahan : null) ||
    (Array.isArray(raw.sejarah) ? raw.sejarah : null) ||
    (Array.isArray(raw.relations) ? raw.relations : null) ||
    (Array.isArray(raw.relasi) ? raw.relasi : null) ||
    [];

  if (rawRiwayatArray.length > 0) {
    rawRiwayatArray.forEach((item, idx) => {
      const rawCode =
        typeof item === 'string'
          ? item
          : item.kode ||
            item.standard_id ||
            item.standar_id ||
            item.id ||
            item.target ||
            item.nama ||
            item.judul ||
            `Perubahan_${idx + 1}`;

      const formattedCode = formatStandardId(rawCode) || rawCode;
      if (seenCodes.has(formattedCode)) return;
      seenCodes.add(formattedCode);

      // Cek apakah item ini merupakan dokumen saat ini
      const isCurrentItem =
        Boolean(item.isCurrent) ||
        Boolean(item.is_current) ||
        String(item.status || '').toLowerCase().includes('koreksi') ||
        String(item.currentStatusLabel || '').toLowerCase().includes('koreksi') ||
        formattedCode === standarId;

      if (isCurrentItem) {
        riwayatPerubahan.push({
          id: String(item.id || `rel-cur-${idx}`),
          kode: formattedCode,
          currentStatusLabel: item.currentStatusLabel || item.status || 'Sedang dikoreksi',
          isCurrent: true,
        });
        return;
      }

      // Tentukan status ketersediaan dokumen
      const statusStr = String(
        item.status_dokumen || item.status || item.ketersediaan || ''
      ).toLowerCase();
      const isBelumTersedia =
        statusStr.includes('belum') ||
        statusStr.includes('tidak') ||
        item.tersedia === false;

      // Tentukan jenis relasi (keterangan)
      const ketStr = String(
        item.keterangan || item.relasi || item.hubungan || item.jenis || item.tipe || ''
      ).toLowerCase();
      let variant: 'diubah' | 'mengubah' | 'dicabut' = 'mengubah';
      let defaultLabel = 'Mengubah Peraturan ini';

      if (ketStr.includes('diubah')) {
        variant = 'diubah';
        defaultLabel = 'Diubah oleh peraturan ini';
      } else if (ketStr.includes('mencabut') || ketStr.includes('dicabut')) {
        variant = 'dicabut';
        defaultLabel = 'Mencabut Peraturan ini';
      }

      riwayatPerubahan.push({
        id: String(item.id || `rel-${idx}-${formattedCode}`),
        kode: formattedCode,
        statusBadge: {
          label: isBelumTersedia ? 'Dokumen Belum Tersedia' : 'Dokumen Tersedia',
          variant: isBelumTersedia ? 'belum_tersedia' : 'tersedia',
        },
        keteranganBadge: {
          label: item.keterangan || defaultLabel,
          variant,
        },
        isCurrent: false,
      });
    });

    // Pastikan dokumen aktif ada di dalam timeline
    const hasCurrent = riwayatPerubahan.some((r) => r.isCurrent);
    if (!hasCurrent) {
      riwayatPerubahan.push({
        id: 'current-doc',
        kode: standarId || 'Dokumen_Aktif',
        currentStatusLabel: 'Sedang dikoreksi',
        isCurrent: true,
      });
    }
  } else {
    // B. Periksa objek relasi (diubah_oleh, mengubah, mencabut, dicabut_oleh)
    const relObj =
      (raw.relasi && typeof raw.relasi === 'object' && !Array.isArray(raw.relasi) ? raw.relasi : {}) ||
      (meta.relasi && typeof meta.relasi === 'object' && !Array.isArray(meta.relasi) ? meta.relasi : {});

    const diubahOlehList: any[] = [
      ...(Array.isArray(relObj.diubah_oleh) ? relObj.diubah_oleh : []),
      ...(Array.isArray(raw.diubah_oleh) ? raw.diubah_oleh : []),
    ];

    const mengubahList: any[] = [
      ...(Array.isArray(relObj.mengubah) ? relObj.mengubah : []),
      ...(Array.isArray(raw.mengubah) ? raw.mengubah : []),
    ];

    const mencabutList: any[] = [
      ...(Array.isArray(relObj.mencabut) ? relObj.mencabut : []),
      ...(Array.isArray(raw.mencabut) ? raw.mencabut : []),
    ];

    const dicabutOlehList: any[] = [
      ...(Array.isArray(relObj.dicabut_oleh) ? relObj.dicabut_oleh : []),
      ...(Array.isArray(raw.dicabut_oleh) ? raw.dicabut_oleh : []),
    ];

    const addRelationNode = (
      item: any,
      variant: 'diubah' | 'mengubah' | 'dicabut',
      defaultLabel: string,
      idx: number
    ) => {
      const rawCode = typeof item === 'string' ? item : item?.standard_id || item?.kode || item?.id || '';
      const formattedCode = formatStandardId(rawCode) || rawCode || `Relasi_${idx + 1}`;

      if (seenCodes.has(formattedCode)) return;
      seenCodes.add(formattedCode);

      const isBelumTersedia =
        typeof item === 'object' &&
        (String(item?.status || item?.status_dokumen || '').toLowerCase().includes('belum') || item?.tersedia === false);

      riwayatPerubahan.push({
        id: String(item?.id || `rel-${idx}-${formattedCode}`),
        kode: formattedCode,
        statusBadge: {
          label: isBelumTersedia ? 'Dokumen Belum Tersedia' : 'Dokumen Tersedia',
          variant: isBelumTersedia ? 'belum_tersedia' : 'tersedia',
        },
        keteranganBadge: { label: item?.keterangan || defaultLabel, variant },
        isCurrent: false,
      });
    };

    let counter = 0;

    // 1. Relasi diubah oleh peraturan di masa depan (predecessors)
    diubahOlehList.forEach((item) => {
      addRelationNode(item, 'diubah', 'Diubah oleh peraturan ini', counter++);
    });

    // 2. Dokumen yang sedang dikoreksi
    riwayatPerubahan.push({
      id: 'current-doc',
      kode: standarId || 'Dokumen_Aktif',
      currentStatusLabel: 'Sedang dikoreksi',
      isCurrent: true,
    });
    seenCodes.add(standarId || 'Dokumen_Aktif');

    // 3. Relasi mengubah (successors)
    mengubahList.forEach((item) => {
      addRelationNode(item, 'mengubah', 'Mengubah Peraturan ini', counter++);
    });

    // 4. Relasi mencabut & dicabut oleh
    mencabutList.forEach((item) => {
      addRelationNode(item, 'dicabut', 'Mencabut Peraturan ini', counter++);
    });
    dicabutOlehList.forEach((item) => {
      addRelationNode(item, 'dicabut', 'Dicabut oleh peraturan ini', counter++);
    });

    // C. Amandemen UUD 1945 berantai otomatis jika nama dokumen mengandung UUD Perubahan
    const isUUDMatch = (standarId || fileName).match(/uud.*perubahan.*ke[_\s-]?(\d+)/i);
    if (isUUDMatch && riwayatPerubahan.length <= 1) {
      const currentNum = parseInt(isUUDMatch[1], 10) || 2;
      const timelineUUD: TimelineRelationItem[] = [];

      for (let i = 1; i <= 4; i++) {
        const code = `UUD_Perubahan_ke_${i}_1945`;
        if (i < currentNum) {
          timelineUUD.push({
            id: `uud-rel-${i}`,
            kode: code,
            statusBadge: { label: 'Dokumen Tersedia', variant: 'tersedia' },
            keteranganBadge: { label: 'Diubah oleh peraturan ini', variant: 'diubah' },
            isCurrent: false,
          });
        } else if (i === currentNum) {
          timelineUUD.push({
            id: 'current-doc',
            kode: code,
            currentStatusLabel: 'Sedang dikoreksi',
            isCurrent: true,
          });
        } else {
          timelineUUD.push({
            id: `uud-rel-${i}`,
            kode: code,
            statusBadge: {
              label: i === 4 ? 'Dokumen Belum Tersedia' : 'Dokumen Tersedia',
              variant: i === 4 ? 'belum_tersedia' : 'tersedia',
            },
            keteranganBadge: { label: 'Mengubah Peraturan ini', variant: 'mengubah' },
            isCurrent: false,
          });
        }
      }
      riwayatPerubahan.length = 0;
      riwayatPerubahan.push(...timelineUUD);
    }
  }

  // 6. METADATA (Ekstraksi komprehensif untuk Pemrakarsa, Tanggal Ditetapkan, dan Tempat Penetapan)
  const metadata = {
    pemrakarsa:
      meta.pemrakarsa ||
      raw.pemrakarsa ||
      meta.pemrakarsa_peraturan ||
      raw.pemrakarsa_peraturan ||
      meta.instansi ||
      raw.instansi ||
      meta.instansi_pemrakarsa ||
      raw.instansi_pemrakarsa ||
      meta.kementerian ||
      raw.kementerian ||
      'Pemerintah Pusat',
    tanggalDitetapkan:
      meta.tanggal_penetapan ||
      meta.tanggal_ditetapkan ||
      raw.tanggal_penetapan ||
      raw.tanggal_ditetapkan ||
      meta.tgl_penetapan ||
      raw.tgl_penetapan ||
      meta.tgl_ditetapkan ||
      raw.tgl_ditetapkan ||
      meta.tanggal ||
      raw.tanggal ||
      (file.name.toLowerCase().includes('uud') ? '23-08-1945' : ''),
    tempatPenetapan:
      meta.tempat_penetapan ||
      raw.tempat_penetapan ||
      meta.tempat ||
      raw.tempat ||
      meta.lokasi_penetapan ||
      raw.lokasi_penetapan ||
      meta.tempat_ditetapkan ||
      raw.tempat_ditetapkan ||
      'Jakarta',
    pejabatPenetap:
      meta.pejabat_penetap ||
      raw.pejabat_penetap ||
      meta.penandatangan ||
      raw.penandatangan ||
      '',
  };

  return {
    standarId,
    judul,
    pembukaan: {
      judul: judulPembukaan,
      subJudul: subJudulPembukaan,
      menimbang,
      mengingat,
      memutuskan,
      isExpanded: true,
    },
    babList,
    riwayatPerubahan,
    metadata,
  };
}
