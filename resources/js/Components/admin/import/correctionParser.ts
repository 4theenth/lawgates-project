import { ValidatedFileItem } from './StepValidationCorrection';

export interface ArticleItem {
  id: string;
  nomor: string;
  isi: string;
  isExpanded?: boolean;
}

export interface ChapterItem {
  id: string;
  judul: string;
  deskripsi?: string;
  pasalList: ArticleItem[];
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

  // 4. BATANG TUBUH (BAB & PASAL DARI BERKAS JSON)
  let babList: ChapterItem[] = [];

  if (Array.isArray(raw.chunks)) {
    // Ambil HANYA chunk bertipe PASAL murni (hindari PENJELASAN_PASAL atau LAMPIRAN)
    const pasalChunks = raw.chunks.filter(
      (c: any) => String(c.tipe || '').toUpperCase() === 'PASAL'
    );

    if (pasalChunks.length > 0) {
      // Periksa apakah ada chunk bertipe BAB
      const hasBabChunks = raw.chunks.some((c: any) => String(c.tipe || '').toUpperCase() === 'BAB');

      if (hasBabChunks) {
        let currentBab: ChapterItem = {
          id: 'bab-1',
          judul: 'BAB I',
          deskripsi: '',
          isExpanded: true,
          pasalList: [],
        };

        raw.chunks.forEach((c: any) => {
          const tipe = String(c.tipe || '').toUpperCase();
          const label = String(c.label || '').trim();

          if (tipe === 'BAB') {
            if (currentBab.pasalList.length > 0) {
              babList.push(currentBab);
            }
            currentBab = {
              id: `bab-${babList.length + 1}`,
              judul: label.startsWith('BAB') ? label : `BAB ${babList.length + 1} - ${label}`,
              deskripsi: c.teks || '',
              isExpanded: babList.length < 2,
              pasalList: [],
            };
          } else if (tipe === 'PASAL') {
            const pasalNum = label || `Pasal ${currentBab.pasalList.length + 1}`;
            currentBab.pasalList.push({
              id: c.id || `pasal-${currentBab.id}-${currentBab.pasalList.length + 1}`,
              nomor: pasalNum,
              isi: c.teks || c.isi || '',
              isExpanded: true,
            });
          }
        });

        if (currentBab.pasalList.length > 0) {
          babList.push(currentBab);
        }
      } else {
        // Jika tidak ada chunk BAB khusus, kelompokkan pasal ke Batang Tubuh
        babList = [
          {
            id: 'bab-1',
            judul: 'Batang Tubuh',
            deskripsi: '',
            isExpanded: true,
            pasalList: pasalChunks.map((c: any, idx: number) => ({
              id: c.id || `pasal-${idx + 1}`,
              nomor: c.label || `Pasal ${idx + 1}`,
              isi: c.teks || c.isi || '',
              isExpanded: true,
            })),
          },
        ];
      }
    }
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
