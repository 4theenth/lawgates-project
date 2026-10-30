export type KontribusiStatus = 'menunggu' | 'disetujui' | 'ditolak';
export type StatusTabKey = 'semua' | 'menunggu' | 'disetujui' | 'ditolak';
export type SortOption = 'terbaru' | 'terlama' | 'judul_asc' | 'judul_desc' | string;

export interface KontribusiItem {
  id: number | string;
  peraturan_unique_id?: string;
  jenis_peraturan: string; // e.g. "UNDANG - UNDANG", "PERATURAN PRESIDEN"
  judul_peraturan: string; // e.g. "Perubahan kedua undang undang dasar tahun 1945"
  bab?: string | null;     // e.g. "BAB II • Wilayah Negara"
  pasal?: string | null;   // e.g. "Pasal 2"
  tanggal_diajukan: string;// e.g. "Diajukan 12 Mei 2026"
  status: KontribusiStatus;
  usulan_text: string;     // e.g. "Dalam menjalankan tugas sebagaimana dimaksud dalam pasal 2..."
  admin_message?: string | null; // e.g. "yang kamu koreksi itu bukan bagian dari pasal dari pasal 2"
}

export interface KontribusiStats {
  total: number;
  menunggu: number;
  disetujui: number;
  ditolak: number;
}

