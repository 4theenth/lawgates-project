import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FilterOption } from '@/types/peraturan';
import { extractProvinceName, getRegenciesForProvince } from '@/Components/landing/map/regencyData';

export function useFilterReferences() {
  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);
  const [listLokasi, setListLokasi] = useState<string[]>([]);
  const [listSubjek, setListSubjek] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/referensi-filter')
      .then((res) => {
        const data = res.data;
        setListKategori(data.kategori || []);
        setListStatus(data.status || []);
        setListTahun(data.tahun || []);
        setListLokasi(data.lokasi_daerah || []);
        setListSubjek(data.subjek || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Gagal memuat referensi filter:', err);
        setIsLoading(false);
      });
  }, []);

  const kategoriOptions: FilterOption[] = useMemo(() => {
    if (listKategori.length > 0) {
      return listKategori.map((k) => ({
        value: String(k.id),
        label: k.nama,
      }));
    }
    return [
      { value: '1', label: 'Undang undang' },
      { value: '2', label: 'Peraturan Presiden' },
      { value: '3', label: 'Peraturan Mentri' },
      { value: '4', label: 'Tap MPR' },
    ];
  }, [listKategori]);

  const statusOptions: FilterOption[] = useMemo(() => {
    if (listStatus.length > 0) {
      return listStatus.map((s) => ({
        value: String(s.id),
        label: s.nama,
      }));
    }
    return [
      { value: '1', label: 'Berlaku' },
      { value: '2', label: 'Tidak berlaku' },
    ];
  }, [listStatus]);

  const baseLokasiList = useMemo(() => {
    return listLokasi.length > 0
      ? listLokasi
      : ['Pemerintah Provinsi Bali', 'Pemerintah Provinsi Nusa Tenggara Timur'];
  }, [listLokasi]);

  // Flat list sejajar untuk semua entitas (Provinsi, Kabupaten, dan Kota)
  const allFlatLokasi = useMemo(() => {
    const items = new Set<string>();
    baseLokasiList.forEach((prov: string) => {
      items.add(prov);
      const { key, name } = extractProvinceName(prov);
      const regData = getRegenciesForProvince(key, name);
      regData.regencies.forEach((r) => {
        items.add(`${r.type} ${r.name}`);
      });
    });
    return Array.from(items).sort((a, b) => a.localeCompare(b, 'id'));
  }, [baseLokasiList]);

  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      new Set([
        ...listTahun.map(String),
        String(currentYear),
        String(currentYear - 1),
        String(currentYear - 2),
        String(currentYear - 3),
        String(currentYear - 4),
        String(currentYear - 5),
        String(currentYear - 6),
      ])
    ).sort((a, b) => Number(b) - Number(a));
  }, [listTahun]);

  return {
    listKategori,
    listStatus,
    listTahun,
    listLokasi,
    listSubjek,
    kategoriOptions,
    statusOptions,
    baseLokasiList,
    allFlatLokasi,
    availableYears,
    isLoading,
  };
}
