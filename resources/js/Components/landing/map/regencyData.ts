import rawMaster from './provincesRegenciesMaster.json';
import { ProvinceRegencyData } from './types';

// Data riil 38 provinsi & 514 kabupaten/kota se-Indonesia dari master database Kemendagri
export const PROVINCE_REGENCY_MAP: Record<string, ProvinceRegencyData> = rawMaster as unknown as Record<string, ProvinceRegencyData>;

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
 * Mengambil data kabupaten/kota resmi untuk provinsi tertentu.
 */
export function getRegenciesForProvince(
  provinceId: string,
  provinceName: string
): ProvinceRegencyData {
  const normalizedId = provinceId.toLowerCase().trim();
  if (PROVINCE_REGENCY_MAP[normalizedId]) {
    return PROVINCE_REGENCY_MAP[normalizedId];
  }

  const formattedName = provinceName.trim() || 'Wilayah';
  return {
    provinceId: normalizedId,
    provinceName: formattedName,
    kabupatenCount: 0,
    kotaCount: 0,
    totalCount: 0,
    regencies: [],
  };
}
