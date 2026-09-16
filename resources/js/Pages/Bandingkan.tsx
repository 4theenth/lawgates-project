import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { ComparisonSelectorCard } from '@/Components/comparison/ComparisonSelectorCard';
import { ComparisonDocumentCard } from '@/Components/comparison/ComparisonDocumentCard';
import { ComparisonTable } from '@/Components/comparison/ComparisonTable';
import {
  DEFAULT_COMPARISON_DATA,
  COMPARISON_OPTIONS,
  ComparisonDataset,
} from '@/data/dummyComparison';

export default function Bandingkan() {
  const [selectedLeftId, setSelectedLeftId] = useState('uud-1945-perubahan-2');
  const [selectedRightId, setSelectedRightId] = useState('uud-1945-perubahan-4');
  const [comparisonData, setComparisonData] = useState<ComparisonDataset>(
    DEFAULT_COMPARISON_DATA
  );

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Pencarian Hukum', href: '/pencarian' },
    { label: 'Detail Sistem Hukum', href: '/peraturan/detail' },
    { label: 'Bandingkan Sistem Hukum' },
  ];

  const handleCompare = () => {
    // Cari opsi yang dipilih dari 4 perubahan UUD 1945 berdasarkan Standar ID
    const leftOpt = COMPARISON_OPTIONS.find((o) => o.id === selectedLeftId);
    const rightOpt = COMPARISON_OPTIONS.find((o) => o.id === selectedRightId);

    if (leftOpt && rightOpt) {
      setComparisonData((prev) => ({
        ...prev,
        standardIdVerified: true,
        acuanAwal: {
          ...prev.acuanAwal,
          id: leftOpt.id,
          standardId: leftOpt.standardId,
          title: leftOpt.title,
          status: leftOpt.status,
          tanggalPenetapan: leftOpt.tanggalPenetapan,
          tempatPenetapan: leftOpt.tempatPenetapan,
          tanggalBerlaku: leftOpt.tanggalBerlaku,
        },
        yangDibandingkan: {
          ...prev.yangDibandingkan,
          id: rightOpt.id,
          standardId: rightOpt.standardId,
          title: rightOpt.title,
          status: rightOpt.status,
          tanggalPenetapan: rightOpt.tanggalPenetapan,
          tempatPenetapan: rightOpt.tempatPenetapan,
          tanggalBerlaku: rightOpt.tanggalBerlaku,
        },
      }));
    }
  };

  const handleViewDetail = (docId: string) => {
    router.visit(`/pencarian?keyword=${encodeURIComponent(docId)}`);
  };

  const handleDownload = (docTitle: string) => {
    alert(`Mengunduh berkas resmi ${docTitle}...`);
  };

  return (
    <PublicLayout>
      <Head title="Membandingkan Sistem Hukum - LawGates" />

      <div className="bg-[#F8F9FA] min-h-screen">
        <div className="pt-24 pb-20 w-full max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Header Halaman: Breadcrumbs, Title, Subtitle */}
          <div className="space-y-3">
            <Breadcrumb items={breadcrumbItems} />
            <div>
              <h1 className="text-[26px] sm:text-[28px] font-bold text-gray-900 leading-tight">
                Membandingkan Sistem Hukum
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Pilih sistem hukum yang mau dibandingkan
              </p>
            </div>
          </div>

          {/* 1. Selector Card (Acuan Awal & Yang Mau Dibandingkan) */}
          <ComparisonSelectorCard
            selectedLeftId={selectedLeftId}
            selectedRightId={selectedRightId}
            onChangeLeft={setSelectedLeftId}
            onChangeRight={setSelectedRightId}
            onCompareClick={handleCompare}
          />

          {/* 2. Side-by-Side Comparison Document Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <ComparisonDocumentCard
              document={comparisonData.acuanAwal}
              variant="default"
              onViewDetail={() => handleViewDetail(comparisonData.acuanAwal.title)}
              onDownload={() => handleDownload(comparisonData.acuanAwal.title)}
            />
            <ComparisonDocumentCard
              document={comparisonData.yangDibandingkan}
              variant="success"
              onViewDetail={() => handleViewDetail(comparisonData.yangDibandingkan.title)}
              onDownload={() => handleDownload(comparisonData.yangDibandingkan.title)}
            />
          </div>

          {/* 3. Detailed Comparison Table */}
          <ComparisonTable
            leftTitle={comparisonData.acuanAwal.title}
            rightTitle={comparisonData.yangDibandingkan.title}
            sections={comparisonData.sections}
          />
        </div>
      </div>
    </PublicLayout>
  );
}
