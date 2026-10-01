import rawGeoJson from '@/assets/indonesia-38-provinces.json';
import rawLandBorders from '@/assets/indonesia-land-borders.json';
import rawNeighbors from '@/assets/neighboring-countries.json';

export interface ProvinceDetail {
  id: string;
  name: string;
  total: number;
  berlaku: number;
  tidakBerlaku: number;
  samplePerda: {
    nomor: string;
    tentang: string;
    status: 'Berlaku' | 'Tidak Berlaku';
  };
}

export function normalizeProvinceKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/^daerah istimewa yogyakarta$/, 'di-yogyakarta')
    .replace(/^dki jakarta$/, 'dki-jakarta')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const INDONESIA_GEOJSON = rawGeoJson;
export const INDONESIA_LAND_BORDERS = rawLandBorders;
export const NEIGHBORING_COUNTRIES = rawNeighbors;

// Koordinat daratan pasti (solid landmass) untuk setiap provinsi
// Mencegah titik pin jatuh di perairan atau teluk laut (seperti Teluk Tomini pada Sulawesi Tengah)
export const PROVINCE_LAND_COORDINATES: Record<string, [number, number]> = {
  'aceh': [4.38, 97.2],
  'sumatera-utara': [2.53, 99.12],
  'sumatera-barat': [-1.13, 101.07],
  'riau': [0.04, 101.93],
  'kepulauan-riau': [1.05, 104.3],
  'jambi': [-1.85, 102.31],
  'bengkulu': [-3.03, 101.85],
  'sumatera-selatan': [-3.27, 104.08],
  'kepulauan-bangka-belitung': [-2.71, 106.41],
  'lampung': [-4.8, 105.18],
  'dki-jakarta': [-6.2, 106.83],
  'banten': [-6.51, 106.11],
  'jawa-barat': [-6.96, 107.85],
  'jawa-tengah': [-7.31, 109.6],
  'di-yogyakarta': [-7.85, 110.35],
  'jawa-timur': [-7.62, 112.13],
  'bali': [-8.38, 115.2],
  'nusa-tenggara-barat': [-8.75, 117.19],
  'nusa-tenggara-timur': [-8.54, 120.39],
  'kalimantan-barat': [-0.23, 110.81],
  'kalimantan-tengah': [-1.76, 113.71], // Di tengah daratan Kalimantan Tengah
  'kalimantan-selatan': [-3.08, 115.38],
  'kalimantan-timur': [0.33, 116.41],
  'kalimantan-utara': [3.19, 116.39],
  'sulawesi-utara': [0.72, 124.32],
  'gorontalo': [0.7, 121.84],
  'sulawesi-tengah': [-1.42, 120.16], // Jantung daratan Sulawesi Tengah, bukan di teluk laut
  'sulawesi-barat': [-2.88, 119.24],
  'sulawesi-selatan': [-3.58, 119.96],
  'sulawesi-tenggara': [-3.52, 121.64],
  'maluku': [-3.3, 130.32],
  'maluku-utara': [1.43, 127.75],
  'papua-barat-daya': [-1.15, 132.3],
  'papua-barat': [-1.72, 133.52],
  'papua-tengah': [-4.13, 136.97],
  'papua': [-2.3, 137.92],
  'papua-pegunungan': [-4.38, 139.91],
  'papua-selatan': [-6.31, 139.85],
};

export const PROVINCES_DATA: Record<string, ProvinceDetail> = {
  'aceh': {
    id: 'aceh',
    name: 'ACEH',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Qanun Aceh Nomor 11 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sumatera-utara': {
    id: 'sumatera-utara',
    name: 'SUMATERA UTARA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sumatera-barat': {
    id: 'sumatera-barat',
    name: 'SUMATERA BARAT',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'riau': {
    id: 'riau',
    name: 'RIAU',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'kepulauan-riau': {
    id: 'kepulauan-riau',
    name: 'KEPULAUAN RIAU',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'jambi': {
    id: 'jambi',
    name: 'JAMBI',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sumatera-selatan': {
    id: 'sumatera-selatan',
    name: 'SUMATERA SELATAN',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'bengkulu': {
    id: 'bengkulu',
    name: 'BENGKULU',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'lampung': {
    id: 'lampung',
    name: 'LAMPUNG',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'kepulauan-bangka-belitung': {
    id: 'kepulauan-bangka-belitung',
    name: 'KEPULAUAN BANGKA BELITUNG',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'dki-jakarta': {
    id: 'dki-jakarta',
    name: 'DKI JAKARTA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'banten': {
    id: 'banten',
    name: 'BANTEN',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'jawa-barat': {
    id: 'jawa-barat',
    name: 'JAWA BARAT',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'jawa-tengah': {
    id: 'jawa-tengah',
    name: 'JAWA TENGAH',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'di-yogyakarta': {
    id: 'di-yogyakarta',
    name: 'DI YOGYAKARTA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Istimewa Yogyakarta Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'jawa-timur': {
    id: 'jawa-timur',
    name: 'JAWA TIMUR',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'bali': {
    id: 'bali',
    name: 'BALI',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'nusa-tenggara-barat': {
    id: 'nusa-tenggara-barat',
    name: 'NUSA TENGGARA BARAT',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'nusa-tenggara-timur': {
    id: 'nusa-tenggara-timur',
    name: 'NUSA TENGGARA TIMUR',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'kalimantan-barat': {
    id: 'kalimantan-barat',
    name: 'KALIMANTAN BARAT',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'kalimantan-tengah': {
    id: 'kalimantan-tengah',
    name: 'KALIMANTAN TENGAH',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'kalimantan-selatan': {
    id: 'kalimantan-selatan',
    name: 'KALIMANTAN SELATAN',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'kalimantan-timur': {
    id: 'kalimantan-timur',
    name: 'KALIMANTAN TIMUR',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'kalimantan-utara': {
    id: 'kalimantan-utara',
    name: 'KALIMANTAN UTARA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sulawesi-utara': {
    id: 'sulawesi-utara',
    name: 'SULAWESI UTARA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'gorontalo': {
    id: 'gorontalo',
    name: 'GORONTALO',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sulawesi-tengah': {
    id: 'sulawesi-tengah',
    name: 'SULAWESI TENGAH',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sulawesi-barat': {
    id: 'sulawesi-barat',
    name: 'SULAWESI BARAT',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sulawesi-selatan': {
    id: 'sulawesi-selatan',
    name: 'SULAWESI SELATAN',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'sulawesi-tenggara': {
    id: 'sulawesi-tenggara',
    name: 'SULAWESI TENGGARA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'maluku-utara': {
    id: 'maluku-utara',
    name: 'MALUKU UTARA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'maluku': {
    id: 'maluku',
    name: 'MALUKU',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'papua-barat': {
    id: 'papua-barat',
    name: 'PAPUA BARAT',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'papua-barat-daya': {
    id: 'papua-barat-daya',
    name: 'PAPUA BARAT DAYA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'papua': {
    id: 'papua',
    name: 'PAPUA',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Khusus Papua Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'papua-selatan': {
    id: 'papua-selatan',
    name: 'PAPUA SELATAN',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'papua-tengah': {
    id: 'papua-tengah',
    name: 'PAPUA TENGAH',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
  'papua-pegunungan': {
    id: 'papua-pegunungan',
    name: 'PAPUA PEGUNUNGAN',
    total: 3090,
    berlaku: 2090,
    tidakBerlaku: 1000,
    samplePerda: {
      nomor: 'Peraturan Daerah Nomor 23 Tahun 2025',
      tentang: 'tentang Penilaian Kapabilitas',
      status: 'Berlaku',
    },
  },
};
