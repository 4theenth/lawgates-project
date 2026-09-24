import React, { useState, useEffect, useCallback } from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout, PAGE_CONTAINER } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { ComparisonSelectorCard } from '@/Components/comparison/ComparisonSelectorCard';
import { ComparisonDocumentCard } from '@/Components/comparison/ComparisonDocumentCard';
import { ComparisonTable } from '@/Components/comparison/ComparisonTable';
import axios from 'axios';
import { Loader2, Scale } from 'lucide-react';
import { ComparisonDataset, ComparisonOption } from '@/types/comparison';

export default function Bandingkan() {
  const [selectedLeftId, setSelectedLeftId] = useState('');
  const [selectedRightId, setSelectedRightId] = useState('');
  const [options, setOptions] = useState<ComparisonOption[]>([]);
  const [isLoadingLineage, setIsLoadingLineage] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState<ComparisonDataset | null>(null);
  const [isLeftLocked, setIsLeftLocked] = useState(false);

  // Breadcrumbs sesuai desain: Beranda > Pencarian Hukum > Detail Sistem Hukum > Bandingkan Sistem Hukum
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Pencarian Hukum', href: '/pencarian' },
    {
      label: 'Detail Sistem Hukum',
      href: selectedLeftId ? `/peraturan/${selectedLeftId}` : '/pencarian',
    },
    { label: 'Bandingkan Sistem Hukum' },
  ];

  // Eksekusi komparasi API
  const runComparison = useCallback(async (leftId: string, rightId: string) => {
    if (!leftId || !rightId) return;
    setIsComparing(true);
    try {
      const res = await axios.get(
        `/api/peraturan/compare?left_id=${encodeURIComponent(leftId)}&right_id=${encodeURIComponent(rightId)}`
      );
      if (res.data.success) {
        setComparisonData(res.data.data);
      }
    } catch (e) {
      console.error('Error saat komparasi:', e);
    } finally {
      setIsComparing(false);
    }
  }, []);

  // Fetch lineage relasi dokumen (tanpa auto-select sisi kanan agar pengguna memilih sendiri)
  const fetchLineage = useCallback(
    async (baseId: string) => {
      setIsLoadingLineage(true);
      try {
        const res = await axios.get(`/api/peraturan/${encodeURIComponent(baseId)}/lineage`);
        if (res.data.success) {
          const dataOptions = res.data.data || [];
          setOptions(dataOptions);
          // Jangan auto-select sisi kanan; pengguna memilih sendiri dari dropdown
        }
      } catch (e) {
        console.error('Error saat fetch lineage:', e);
      } finally {
        setIsLoadingLineage(false);
      }
    },
    []
  );

  // Baca parameter query URL `?id=...` saat pertama kali halaman dimuat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setSelectedLeftId(id);
      setIsLeftLocked(true);
      fetchLineage(id);
    }
  }, [fetchLineage]);

  const handleCompareClick = () => {
    if (selectedLeftId && selectedRightId) {
      runComparison(selectedLeftId, selectedRightId);
    }
  };

  const handleViewDetail = (uniqueId: string) => {
    if (uniqueId) {
      router.visit(`/peraturan/${uniqueId}`);
    }
  };

  const handleDownload = (uniqueId: string) => {
    if (uniqueId) {
      const link = document.createElement('a');
      link.href = `/peraturan/${uniqueId}/download`;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <PublicLayout>
      <Head title="Membandingkan Sistem Hukum - LawGates" />
      <div className="w-full bg-[#F8FAFC] min-h-screen">
        <div className={`pt-20 sm:pt-24 pb-12 sm:pb-16 ${PAGE_CONTAINER} text-gray-900 min-w-0 space-y-6 sm:space-y-7`}>
          {/* Header Judul Sesuai Desain */}
          <div>
            <Breadcrumb items={breadcrumbItems} className="mb-3 text-xs sm:text-sm text-gray-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1931] tracking-tight">
              Membandingkan Sistem Hukum
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
              Pilih sistem hukum yang mau dibandingkan
            </p>
          </div>

          {/* Kartu Selektor Peraturan */}
          <ComparisonSelectorCard
            options={options}
            selectedLeftId={selectedLeftId}
            selectedRightId={selectedRightId}
            onChangeLeft={setSelectedLeftId}
            onChangeRight={(newRightId) => {
              setSelectedRightId(newRightId);
              if (newRightId) {
                runComparison(selectedLeftId, newRightId);
              } else {
                setComparisonData(null);
              }
            }}
            onCompareClick={handleCompareClick}
            disabledLeft={isLeftLocked}
            isLoading={isComparing || isLoadingLineage}
          />

          {/* Indikator Loading */}
          {isComparing ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Sedang membandingkan dokumen...</p>
            </div>
          ) : comparisonData ? (
            <>
              {/* Kartu Informasi Metadata Kedua Dokumen (Kiri: Diubah, Kanan: Berlaku) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <ComparisonDocumentCard
                  document={comparisonData.acuanAwal}
                  variant="default"
                  onViewDetail={() => handleViewDetail(comparisonData.acuanAwal.id)}
                  onDownload={() => handleDownload(comparisonData.acuanAwal.id)}
                />
                <ComparisonDocumentCard
                  document={comparisonData.yangDibandingkan}
                  variant="success"
                  onViewDetail={() => handleViewDetail(comparisonData.yangDibandingkan.id)}
                  onDownload={() => handleDownload(comparisonData.yangDibandingkan.id)}
                />
              </div>

              {/* Tabel Komparasi Pasal per Pasal */}
              <ComparisonTable
                leftTitle={comparisonData.acuanAwal.title}
                rightTitle={comparisonData.yangDibandingkan.title}
                sections={comparisonData.sections}
              />
            </>
          ) : (
            !isLoadingLineage && (
              <div className="w-full border border-dashed border-gray-300 rounded-2xl bg-white/40 p-12 sm:p-24 flex flex-col items-center justify-center text-center min-h-[380px]">
                <div className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 mb-3.5 shadow-2xs">
                  <Scale className="w-5 h-5 text-gray-400 stroke-[1.75]" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  Belum ada hukum yang dibandingkan
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Silahkan pilih hukum yang ingin dibandingkan
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
