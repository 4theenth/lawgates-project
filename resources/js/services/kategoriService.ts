export interface KategoriHukum {
  id: number;
  kode: string;
  nama: string;
  deskripsi?: string;
}

export const getAllKategori = async (): Promise<KategoriHukum[]> => {
  const response = await fetch('/api/kategori-hukum/all', {
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Gagal mengambil daftar kategori');
  }
  const result = await response.json();
  return result.data || [];
};
