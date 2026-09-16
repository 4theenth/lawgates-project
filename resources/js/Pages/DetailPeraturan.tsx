import React, { useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { DetailPeraturanHeader } from '@/Components/peraturan/DetailPeraturanHeader';
import { DetailDaftarIsi, TocChapterItem } from '@/Components/peraturan/DetailDaftarIsi';
import { DetailIsiPeraturan, DetailPembukaanData, DetailBabItem } from '@/Components/peraturan/DetailIsiPeraturan';
import { DetailRiwayatPerubahan, DetailTimelineItem } from '@/Components/peraturan/DetailRiwayatPerubahan';

interface PeraturanDetailProps {
  peraturan?: any;
}

export default function DetailPeraturan({ peraturan = {} }: PeraturanDetailProps) {
  // 1. Ekstraksi Metadata Header
  const judul =
    peraturan?.judul ||
    'Perubahan Kedua Undang - Undang Dasar Negara Republik Indonesia 1945';
  const jenisPeraturan =
    peraturan?.jenis_peraturan?.nama ||
    peraturan?.jenisPeraturan?.nama ||
    'UNDANG - UNDANG DASAR';
  const instansi = peraturan?.instansi || 'Pemerintah Pusat';
  const statusPeraturan =
    peraturan?.status_peraturan?.nama_status ||
    peraturan?.statusPeraturan?.nama_status ||
    'Berlaku';
  const tanggalPenetapan = peraturan?.tanggal_penetapan || '18 Agustus 2000';
  const tempatPenetapan = peraturan?.tempat_penetapan || 'Jakarta';

  // 2. Parser Pembukaan (Menimbang, Mengingat, Memutuskan)
  const pembukaanData: DetailPembukaanData = useMemo(() => {
    const struktur = peraturan?.struktur_dokumen || peraturan?.strukturDokumen || [];

    const menimbangItem = struktur.find((s: any) =>
      s.label?.toLowerCase().includes('menimbang')
    );
    const mengingatItem = struktur.find((s: any) =>
      s.label?.toLowerCase().includes('mengingat')
    );
    const memutuskanItem = struktur.find((s: any) =>
      s.label?.toLowerCase().includes('memutuskan')
    );

    return {
      judul:
        peraturan?.judul ||
        'Perubahan Kedua Undang - Undang Dasar Negara Republik Indonesia',
      subJudul:
        peraturan?.diktum ||
        'Setiap Masyarakat, mendidik, dan mampu bertindak dengan seksama dan tangguh - menghasilkan hal-hal yang bersifat mendasar yang di hadapi oleh warga, bangsa, dan negara, serta dengan menegaskan keikutsertaannya berdasarkan pasal 27 undang-undang.',
      menimbang:
        menimbangItem?.judul_struktur ||
        'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
      mengingat:
        mengingatItem?.judul_struktur ||
        'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
      memutuskan:
        memutuskanItem?.judul_struktur ||
        'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
    };
  }, [peraturan]);

  // 3. Parser Batang Tubuh (BAB & Pasal)
  const babList: DetailBabItem[] = useMemo(() => {
    const rawPasal = peraturan?.pasal || [];

    // Jika data pasal riil dari backend ada, kelompokkan ke bab
    if (rawPasal.length > 0) {
      return [
        {
          id: 'bab-1',
          judul: 'BAB I - Ketentuan Umum',
          deskripsi:
            peraturan?.deskripsi ||
            'Saksi Pelaku adalah terpidana atau tersangka, terdakwa yang bekerja sama dengan penegak hukum untuk mengungkap tindak pidana.',
          pasalList: rawPasal.map((p: any) => ({
            id: `pasal-${p.id || p.nomor_pasal}`,
            nomor: p.nomor_pasal || `Pasal ${p.urutan || 1}`,
            isi: p.isi_pasal || p.isi || '',
          })),
        },
      ];
    }

    // Default mock data sesuai visual figma/desain pengguna
    return [
      {
        id: 'bab-1',
        judul: 'BAB I - Pemerintah Daerah',
        deskripsi:
          'Saksi Pelaku adalah terpidana atau tersangka, terdakwa yang bekerja sama dengan penegak hukum untuk mengungkap tindak pidana. Korban adalah seseorang yang mengalami penderitaan fisik, mental, dan/atau kerugian ekonomi yang diakibatkan oleh suatu tindak pidana.',
        pasalList: [
          {
            id: 'pasal-1',
            nomor: 'Pasal 1',
            isi: 'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
          },
          {
            id: 'pasal-2',
            nomor: 'Pasal 2',
            isi: 'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
          },
        ],
      },
      {
        id: 'bab-2',
        judul: 'BAB II - Wilayah Negara',
        deskripsi:
          'Saksi Pelaku adalah terpidana atau tersangka, terdakwa yang bekerja sama dengan penegak hukum untuk mengungkap tindak pidana. Korban adalah seseorang yang mengalami penderitaan fisik, mental, dan/atau kerugian ekonomi yang diakibatkan oleh suatu tindak pidana.',
        pasalList: [
          {
            id: 'pasal-3',
            nomor: 'Pasal 1',
            isi: 'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
          },
          {
            id: 'pasal-4',
            nomor: 'Pasal 2',
            isi: 'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
          },
        ],
      },
    ];
  }, [peraturan]);

  // 4. Daftar Isi (TOC)
  const tocChapters: TocChapterItem[] = useMemo(() => {
    return [
      {
        id: 'bab-1',
        judul: 'BAB I - Pemerintah Daerah',
        isExpanded: true,
        subItems: [
          { id: 'pasal-1', label: 'Pasal 1 Ayat 1' },
          { id: 'pasal-2', label: 'Pasal 2 Ayat 1' },
        ],
      },
      {
        id: 'bab-2',
        judul: 'BAB II - Wilayah Negara',
        isExpanded: true,
        subItems: [
          { id: 'pasal-3', label: 'Pasal 3 Ayat 1' },
          { id: 'pasal-4', label: 'Pasal 4 Ayat 1' },
          { id: 'pasal-5', label: 'Pasal 5 Ayat 1' },
        ],
      },
      {
        id: 'bab-3',
        judul: 'BAB III - Hak Asasi',
        isExpanded: false,
      },
      {
        id: 'bab-4',
        judul: 'BAB IV - Penduduk',
        isExpanded: false,
      },
      {
        id: 'bab-5',
        judul: 'BAB V - Warga Negara',
        isExpanded: false,
      },
    ];
  }, [babList]);

  // 5. Parser Riwayat Perubahan
  const riwayatList: DetailTimelineItem[] = useMemo(() => {
    const rawRelations = peraturan?.law_relations || peraturan?.lawRelations || [];

    if (rawRelations.length > 0) {
      return rawRelations.map((rel: any, idx: number) => ({
        id: `rel-${rel.id || idx}`,
        judul: rel.to_peraturan?.judul || rel.toPeraturan?.judul || 'Perubahan Regulasi Terkait',
        tahun: rel.to_peraturan?.tahun ? `Tahun ${rel.to_peraturan.tahun}` : undefined,
        statusBadge: rel.relation_type?.nama_relasi || rel.relationType?.nama_relasi || 'Terkait',
        isCurrent: idx === 1 || rel.is_current,
      }));
    }

    return [
      {
        id: 'rev-1',
        judul: 'Perubahan Pertama Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
        tahun: 'Tahun 1999',
        statusBadge: 'Diubah',
        isCurrent: false,
      },
      {
        id: 'rev-2',
        judul: 'Perubahan Kedua Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
        tahun: 'Tahun 2000',
        statusBadge: 'Diubah',
        isCurrent: true,
      },
      {
        id: 'rev-3',
        judul: 'Perubahan Ketiga Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
        tahun: 'Tahun 2001',
        statusBadge: 'Diubah',
        isCurrent: false,
      },
      {
        id: 'rev-4',
        judul: 'Perubahan Ke-empat Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
        tahun: 'Tahun 2002',
        isCurrent: false,
      },
    ];
  }, [peraturan]);

  const handleCompare = () => {
    router.visit('/bandingkan');
  };

  const handleDownload = () => {
    alert('Mengunduh dokumen hukum resmi...');
  };

  const handleRelasi = () => {
    const el = document.getElementById('section-pembukaan');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PublicLayout>
      <Head title={`${judul} - LawGates`} />

      <div className="bg-[#F8F9FA] min-h-screen">
        <div className="pt-24 pb-20 w-full max-w-[1240px] mx-auto px-4 sm:px-6">
            {/* Header Dokumen: Breadcrumb, Badge, Judul, Meta & Action Buttons */}
            <DetailPeraturanHeader
              judul={judul}
              jenisPeraturan={jenisPeraturan}
              instansi={instansi}
              statusPeraturan={statusPeraturan}
              tanggalPenetapan={tanggalPenetapan}
              tempatPenetapan={tempatPenetapan}
              onCompare={handleCompare}
              onDownload={handleDownload}
            />

            {/* Layout 3-Kolom Sesuai Desain Figma:
                - Kolom 1 (Kiri): Daftar Isi (Table of Contents)
                - Kolom 2 (Tengah): Isi Peraturan (Pembukaan & Batang Tubuh Bab/Pasal)
                - Kolom 3 (Kanan): Riwayat Perubahan Timeline & Relasi Button
            */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-7">
              {/* KOLOM KIRI: DAFTAR ISI */}
              <div className="w-full lg:w-[240px] xl:w-[260px] shrink-0">
                <DetailDaftarIsi
                  pembukaanLabel="Pembukaan UUD 1945"
                  chapters={tocChapters}
                />
              </div>

              {/* KOLOM TENGAH: ISI PERATURAN */}
              <div className="flex-1 min-w-0 w-full">
                <DetailIsiPeraturan
                  pembukaan={pembukaanData}
                  babList={babList}
                />
              </div>

              {/* KOLOM KANAN: RIWAYAT PERUBAHAN */}
              <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0">
                <DetailRiwayatPerubahan
                  riwayat={riwayatList}
                  onRelasiClick={handleRelasi}
                />
              </div>
            </div>
          </div>
      </div>
    </PublicLayout>
  );
}