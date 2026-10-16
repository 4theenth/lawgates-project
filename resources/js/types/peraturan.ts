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
  relevant_pasal?: {
    pasal_id: number;
    nomor_pasal: string;
    cuplikan: string;
    similarity: number;
  };
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface ReferensiData {
  status: Array<{ id: number; nama_status: string }>;
  tahun: string[];
  subjek?: Array<{ id: number; nama: string }> | string[];
}
