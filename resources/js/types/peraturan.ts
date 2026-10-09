export interface PeraturanItem {
  id: number;
  unique_id: string;
  judul: string;
  nomor: string;
  tahun: number | string;
  instansi?: string;
  jenis_peraturan?: {
    id: number;
    nama: string;
    kode?: string;
  };
  status_peraturan?: {
    id: number;
    nama_status: string;
  };
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface ReferensiData {
  status: Array<{ id: number; nama_status: string }>;
  tahun: string[];
}
