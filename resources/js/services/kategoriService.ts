export interface KategoriHukum {
  id: number;
  kode: string;
  nama: string;
  deskripsi?: string;
}

import axios from 'axios';

export const getAllKategori = async (): Promise<KategoriHukum[]> => {
  try {
    const response = await axios.get('/api/kategori-hukum/all', {
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.data.data || [];
  } catch (error) {
    throw new Error('Gagal mengambil daftar kategori');
  }
};
