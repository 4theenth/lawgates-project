import { ProvinceRegencyData, RegencyItem } from './types';

// Data riil / terstruktur per provinsi sesuai acuan Figma node #2622:43699 & #2587:56232
export const PROVINCE_REGENCY_MAP: Record<string, ProvinceRegencyData> = {
  bali: {
    provinceId: 'bali',
    provinceName: 'Bali',
    kabupatenCount: 8,
    kotaCount: 1,
    totalCount: 9,
    regencies: [
      { id: 'denpasar', name: 'Denpasar', type: 'Kota', totalPeraturan: 0 },
      { id: 'badung', name: 'Badung', type: 'Kabupaten', totalPeraturan: 0 },
      { id: 'tabanan', name: 'Tabanan', type: 'Kabupaten', totalPeraturan: 0 },
      { id: 'klungkung', name: 'Klungkung', type: 'Kabupaten', totalPeraturan: 0 },
      { id: 'gianyar', name: 'Gianyar', type: 'Kabupaten', totalPeraturan: 0 },
      { id: 'buleleng', name: 'Buleleng', type: 'Kabupaten', totalPeraturan: 0 },
      { id: 'karangasem', name: 'Karangasem', type: 'Kabupaten', totalPeraturan: 0 },
      { id: 'jembrana', name: 'Jembrana', type: 'Kabupaten', totalPeraturan: 0 },
      { id: 'bangli', name: 'Bangli', type: 'Kabupaten', totalPeraturan: 0 },
    ],
  },
  'dki-jakarta': {
    provinceId: 'dki-jakarta',
    provinceName: 'DKI Jakarta',
    kabupatenCount: 1,
    kotaCount: 5,
    totalCount: 6,
    regencies: [
      { id: 'jakarta-pusat', name: 'Jakarta Pusat', type: 'Kota' },
      { id: 'jakarta-selatan', name: 'Jakarta Selatan', type: 'Kota' },
      { id: 'jakarta-barat', name: 'Jakarta Barat', type: 'Kota' },
      { id: 'jakarta-timur', name: 'Jakarta Timur', type: 'Kota' },
      { id: 'jakarta-utara', name: 'Jakarta Utara', type: 'Kota' },
      { id: 'kepulauan-seribu', name: 'Kepulauan Seribu', type: 'Kabupaten' },
    ],
  },
  'jawa-barat': {
    provinceId: 'jawa-barat',
    provinceName: 'Jawa Barat',
    kabupatenCount: 18,
    kotaCount: 9,
    totalCount: 27,
    regencies: [
      { id: 'bandung', name: 'Bandung', type: 'Kabupaten' },
      { id: 'kota-bandung', name: 'Bandung', type: 'Kota' },
      { id: 'bogor', name: 'Bogor', type: 'Kabupaten' },
      { id: 'kota-bogor', name: 'Bogor', type: 'Kota' },
      { id: 'bekasi', name: 'Bekasi', type: 'Kabupaten' },
      { id: 'kota-bekasi', name: 'Bekasi', type: 'Kota' },
      { id: 'depok', name: 'Depok', type: 'Kota' },
      { id: 'cimahi', name: 'Cimahi', type: 'Kota' },
      { id: 'cirebon', name: 'Cirebon', type: 'Kabupaten' },
      { id: 'kota-cirebon', name: 'Cirebon', type: 'Kota' },
      { id: 'sukabumi', name: 'Sukabumi', type: 'Kabupaten' },
      { id: 'tasikmalaya', name: 'Tasikmalaya', type: 'Kabupaten' },
    ],
  },
  'jawa-tengah': {
    provinceId: 'jawa-tengah',
    provinceName: 'Jawa Tengah',
    kabupatenCount: 29,
    kotaCount: 6,
    totalCount: 35,
    regencies: [
      { id: 'semarang', name: 'Semarang', type: 'Kabupaten' },
      { id: 'kota-semarang', name: 'Semarang', type: 'Kota' },
      { id: 'surakarta', name: 'Surakarta', type: 'Kota' },
      { id: 'banyumas', name: 'Banyumas', type: 'Kabupaten' },
      { id: 'magelang', name: 'Magelang', type: 'Kabupaten' },
      { id: 'kota-magelang', name: 'Magelang', type: 'Kota' },
      { id: 'pekalongan', name: 'Pekalongan', type: 'Kabupaten' },
      { id: 'kudus', name: 'Kudus', type: 'Kabupaten' },
      { id: 'tegal', name: 'Tegal', type: 'Kabupaten' },
    ],
  },
  'jawa-timur': {
    provinceId: 'jawa-timur',
    provinceName: 'Jawa Timur',
    kabupatenCount: 29,
    kotaCount: 9,
    totalCount: 38,
    regencies: [
      { id: 'surabaya', name: 'Surabaya', type: 'Kota' },
      { id: 'malang', name: 'Malang', type: 'Kabupaten' },
      { id: 'kota-malang', name: 'Malang', type: 'Kota' },
      { id: 'sidoarjo', name: 'Sidoarjo', type: 'Kabupaten' },
      { id: 'gresik', name: 'Gresik', type: 'Kabupaten' },
      { id: 'banyuwangi', name: 'Banyuwangi', type: 'Kabupaten' },
      { id: 'jember', name: 'Jember', type: 'Kabupaten' },
      { id: 'kediri', name: 'Kediri', type: 'Kabupaten' },
    ],
  },
  'di-yogyakarta': {
    provinceId: 'di-yogyakarta',
    provinceName: 'DI Yogyakarta',
    kabupatenCount: 4,
    kotaCount: 1,
    totalCount: 5,
    regencies: [
      { id: 'sleman', name: 'Sleman', type: 'Kabupaten' },
      { id: 'bantul', name: 'Bantul', type: 'Kabupaten' },
      { id: 'yogyakarta', name: 'Yogyakarta', type: 'Kota' },
      { id: 'gunungkidul', name: 'Gunungkidul', type: 'Kabupaten' },
      { id: 'kulon-progo', name: 'Kulon Progo', type: 'Kabupaten' },
    ],
  },
  'sumatera-utara': {
    provinceId: 'sumatera-utara',
    provinceName: 'Sumatera Utara',
    kabupatenCount: 25,
    kotaCount: 8,
    totalCount: 33,
    regencies: [
      { id: 'medan', name: 'Medan', type: 'Kota' },
      { id: 'deli-serdang', name: 'Deli Serdang', type: 'Kabupaten' },
      { id: 'karo', name: 'Karo', type: 'Kabupaten' },
      { id: 'simalungun', name: 'Simalungun', type: 'Kabupaten' },
      { id: 'pematangsiantar', name: 'Pematangsiantar', type: 'Kota' },
      { id: 'binjai', name: 'Binjai', type: 'Kota' },
    ],
  },
  'nusa-tenggara-timur': {
    provinceId: 'nusa-tenggara-timur',
    provinceName: 'Nusa Tenggara Timur',
    kabupatenCount: 21,
    kotaCount: 1,
    totalCount: 22,
    regencies: [
      { id: 'kota-kupang', name: 'Kupang', type: 'Kota', totalPeraturan: 142 },
      { id: 'kab-kupang', name: 'Kupang', type: 'Kabupaten', totalPeraturan: 98 },
      { id: 'timor-tengah-selatan', name: 'Timor Tengah Selatan', type: 'Kabupaten', totalPeraturan: 64 },
      { id: 'timor-tengah-utara', name: 'Timor Tengah Utara', type: 'Kabupaten', totalPeraturan: 52 },
      { id: 'belu', name: 'Belu', type: 'Kabupaten', totalPeraturan: 48 },
      { id: 'alor', name: 'Alor', type: 'Kabupaten', totalPeraturan: 38 },
      { id: 'flores-timur', name: 'Flores Timur', type: 'Kabupaten', totalPeraturan: 56 },
      { id: 'sikka', name: 'Sikka', type: 'Kabupaten', totalPeraturan: 71 },
      { id: 'ende', name: 'Ende', type: 'Kabupaten', totalPeraturan: 63 },
      { id: 'ngada', name: 'Ngada', type: 'Kabupaten', totalPeraturan: 45 },
      { id: 'manggarai', name: 'Manggarai', type: 'Kabupaten', totalPeraturan: 59 },
      { id: 'manggarai-barat', name: 'Manggarai Barat', type: 'Kabupaten', totalPeraturan: 82 },
      { id: 'sumba-timur', name: 'Sumba Timur', type: 'Kabupaten', totalPeraturan: 44 },
    ],
  },
};

/**
 * Ekstraksi nama dan normalized key provinsi dari string lokasi (misal: "Pemerintah Provinsi Bali" -> { key: 'bali', name: 'Bali' })
 */
export function extractProvinceName(rawName: string): { key: string; name: string } {
  const cleaned = rawName
    .replace(/^pemerintah\s+provinsi\s+/i, '')
    .replace(/^provinsi\s+/i, '')
    .trim();
  const key = cleaned
    .toLowerCase()
    .replace(/^daerah istimewa yogyakarta$/, 'di-yogyakarta')
    .replace(/^dki jakarta$/, 'dki-jakarta')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return { key, name: cleaned || rawName };
}

/**
 * Mengambil data kabupaten/kota untuk provinsi tertentu.
 * Jika provinsi belum didefinisikan secara khusus, sediakan data seragam yang rapi & konsisten.
 */
export function getRegenciesForProvince(
  provinceId: string,
  provinceName: string
): ProvinceRegencyData {
  const normalizedId = provinceId.toLowerCase().trim();
  if (PROVINCE_REGENCY_MAP[normalizedId]) {
    return PROVINCE_REGENCY_MAP[normalizedId];
  }

  // Fallback seragam untuk provinsi lainnya agar UI selalu terisi dan tidak kosong
  const formattedName = provinceName.trim() || 'Wilayah';
  const defaultList: RegencyItem[] = [
    { id: `${normalizedId}-pusat`, name: `${formattedName} Pusat`, type: 'Kabupaten', totalPeraturan: 0 },
    { id: `${normalizedId}-kota`, name: `Kota ${formattedName}`, type: 'Kota', totalPeraturan: 0 },
    { id: `${normalizedId}-utara`, name: `${formattedName} Utara`, type: 'Kabupaten', totalPeraturan: 0 },
    { id: `${normalizedId}-selatan`, name: `${formattedName} Selatan`, type: 'Kabupaten', totalPeraturan: 0 },
    { id: `${normalizedId}-barat`, name: `${formattedName} Barat`, type: 'Kabupaten', totalPeraturan: 0 },
    { id: `${normalizedId}-timur`, name: `${formattedName} Timur`, type: 'Kabupaten', totalPeraturan: 0 },
  ];

  return {
    provinceId: normalizedId,
    provinceName: formattedName,
    kabupatenCount: 5,
    kotaCount: 1,
    totalCount: 6,
    regencies: defaultList,
  };
}
