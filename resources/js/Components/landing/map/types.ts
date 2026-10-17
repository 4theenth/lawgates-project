export interface RegencyItem {
  id: string;
  name: string;
  type: 'Kabupaten' | 'Kota';
  totalPeraturan?: number;
}

export interface ProvinceRegencyData {
  provinceId: string;
  provinceName: string;
  kabupatenCount: number;
  kotaCount: number;
  totalCount: number;
  regencies: RegencyItem[];
}
