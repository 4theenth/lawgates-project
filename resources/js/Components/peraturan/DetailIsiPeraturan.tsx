import React, { useState } from 'react';
import { Scale, ChevronDown, ChevronUp } from 'lucide-react';

export interface DetailPasalItem {
  id: string;
  nomor: string;
  isi: string;
}

export interface DetailBabItem {
  id: string;
  judul: string;
  deskripsi?: string;
  pasalList: DetailPasalItem[];
}

export interface DetailPembukaanData {
  judul: string;
  subJudul?: string;
  menimbang?: string;
  mengingat?: string;
  memutuskan?: string;
}

export interface DetailIsiPeraturanProps {
  pembukaan?: DetailPembukaanData;
  babList?: DetailBabItem[];
}

export function DetailIsiPeraturan({
  pembukaan = {
    judul: 'Perubahan Kedua Undang - Undang Dasar Negara Republik Indonesia',
    subJudul:
      'Setiap Masyarakat, mendidik, dan mampu bertindak dengan seksama dan tangguh - menghasilkan hal-hal yang bersifat mendasar yang di hadapi oleh warga, bangsa, dan negara, serta dengan menegaskan keikutsertaannya berdasarkan pasal 27 undang-undang.',
    menimbang:
      'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
    mengingat:
      'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
    memutuskan:
      'Dalam menjalankan tugas sebagaimana dimaksud dalam Pasal 28, LPSK menyelenggarakan fungsi: a. melaksanakan Perlindungan dan pemenuhan hak Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli sesuai dengan kebutuhan dan memperhatikan hubungan tertentu; b. mengoordinasikan pelaksanaan Perlindungan Saksi, Korban, Saksi Pelaku, Pelapor, Informan, dan/atau Ahli.',
  },
  babList = [
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
  ],
}: DetailIsiPeraturanProps) {
  // Accordion states
  const [isOpenPembukaan, setIsOpenPembukaan] = useState(true);
  const [isOpenMenimbang, setIsOpenMenimbang] = useState(true);
  const [isOpenMengingat, setIsOpenMengingat] = useState(true);
  const [isOpenMemutuskan, setIsOpenMemutuskan] = useState(true);

  // Bab and pasal toggles
  const [expandedBabs, setExpandedBabs] = useState<Record<string, boolean>>({
    'bab-1': true,
    'bab-2': true,
  });

  const [expandedPasals, setExpandedPasals] = useState<Record<string, boolean>>({
    'pasal-1': true,
    'pasal-2': true,
    'pasal-3': true,
    'pasal-4': true,
  });

  const toggleBab = (babId: string) => {
    setExpandedBabs((prev) => ({ ...prev, [babId]: !prev[babId] }));
  };

  const togglePasal = (pasalId: string) => {
    setExpandedPasals((prev) => ({ ...prev, [pasalId]: !prev[pasalId] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Kolom Tengah */}
      <div className="flex items-center gap-2.5">
        <Scale className="w-5 h-5 text-gray-800 stroke-[2]" />
        <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">
          Isi Peraturan
        </h2>
      </div>

      {/* 1. CARD PEMBUKAAN */}
      {pembukaan && (
        <div
          id="section-pembukaan"
          className="bg-white rounded-2xl border border-gray-200/90 p-5 lg:p-6 shadow-2xs space-y-4"
        >
          {/* Header Pembukaan */}
          <button
            type="button"
            onClick={() => setIsOpenPembukaan(!isOpenPembukaan)}
            className="w-full flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A1C3E]" />
              <span className="text-[13px] font-bold text-[#0A1C3E] uppercase tracking-wide">
                PEMBUKAAN
              </span>
            </div>
            {isOpenPembukaan ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {isOpenPembukaan && (
            <div className="space-y-4 pt-1">
              {/* Judul & Deskripsi Pembukaan */}
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 space-y-2">
                <h3 className="text-[13px] font-bold text-gray-900 leading-snug">
                  {pembukaan.judul}
                </h3>
                {pembukaan.subJudul && (
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    {pembukaan.subJudul}
                  </p>
                )}
              </div>

              {/* Accordion Menimbang */}
              {pembukaan.menimbang && (
                <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => setIsOpenMenimbang(!isOpenMenimbang)}
                    className="w-full flex items-center justify-between cursor-pointer"
                  >
                    <span className="inline-block px-2.5 py-1 rounded bg-[#0A1C3E] text-white text-[11px] font-semibold">
                      Menimbang
                    </span>
                    {isOpenMenimbang ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>

                  {isOpenMenimbang && (
                    <div className="border-l-[3px] border-amber-400 bg-[#F8FAFC] p-3 rounded-r-lg text-[12px] text-gray-700 leading-relaxed">
                      {pembukaan.menimbang}
                    </div>
                  )}
                </div>
              )}

              {/* Accordion Mengingat */}
              {pembukaan.mengingat && (
                <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => setIsOpenMengingat(!isOpenMengingat)}
                    className="w-full flex items-center justify-between cursor-pointer"
                  >
                    <span className="inline-block px-2.5 py-1 rounded bg-[#0A1C3E] text-white text-[11px] font-semibold">
                      Mengingat
                    </span>
                    {isOpenMengingat ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>

                  {isOpenMengingat && (
                    <div className="border-l-[3px] border-amber-400 bg-[#F8FAFC] p-3 rounded-r-lg text-[12px] text-gray-700 leading-relaxed">
                      {pembukaan.mengingat}
                    </div>
                  )}
                </div>
              )}

              {/* Accordion Memutuskan */}
              {pembukaan.memutuskan && (
                <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => setIsOpenMemutuskan(!isOpenMemutuskan)}
                    className="w-full flex items-center justify-between cursor-pointer"
                  >
                    <span className="inline-block px-2.5 py-1 rounded bg-[#0A1C3E] text-white text-[11px] font-semibold">
                      Memutuskan
                    </span>
                    {isOpenMemutuskan ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>

                  {isOpenMemutuskan && (
                    <div className="border-l-[3px] border-amber-400 bg-[#F8FAFC] p-3 rounded-r-lg text-[12px] text-gray-700 leading-relaxed">
                      {pembukaan.memutuskan}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. DAFTAR BAB DAN PASAL */}
      {babList.map((bab) => {
        const isBabOpen = expandedBabs[bab.id] ?? true;

        return (
          <div
            key={bab.id}
            id={`section-${bab.id}`}
            className="bg-white rounded-2xl border border-gray-200/90 p-5 lg:p-6 shadow-2xs space-y-4"
          >
            {/* Header Bab */}
            <button
              type="button"
              onClick={() => toggleBab(bab.id)}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <span className="text-[13px] font-bold text-[#0A1C3E] uppercase tracking-wide">
                {bab.judul}
              </span>
              {isBabOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {isBabOpen && (
              <div className="space-y-4 pt-1">
                {/* Deskripsi Bab */}
                {bab.deskripsi && (
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 text-[12px] text-gray-600 leading-relaxed">
                    {bab.deskripsi}
                  </div>
                )}

                {/* Pasal-Pasal di Dalam Bab */}
                {bab.pasalList.map((pasal) => {
                  const isPasalOpen = expandedPasals[pasal.id] ?? true;

                  return (
                    <div
                      key={pasal.id}
                      id={`section-${pasal.id}`}
                      className="bg-white rounded-xl border border-gray-100 p-3.5 space-y-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => togglePasal(pasal.id)}
                        className="w-full flex items-center justify-between cursor-pointer"
                      >
                        <span className="inline-block px-2.5 py-1 rounded bg-[#0A1C3E] text-white text-[11px] font-semibold">
                          {pasal.nomor}
                        </span>
                        {isPasalOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>

                      {isPasalOpen && (
                        <div className="border-l-[3px] border-amber-400 bg-[#F8FAFC] p-3 rounded-r-lg text-[12px] text-gray-700 leading-relaxed">
                          {pasal.isi}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
