import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { ComparisonSelectorCard } from '@/Components/comparison/ComparisonSelectorCard';
import { ComparisonDocumentCard } from '@/Components/comparison/ComparisonDocumentCard';
import { ComparisonTable } from '@/Components/comparison/ComparisonTable';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function Bandingkan() {
  const [selectedLeftId, setSelectedLeftId] = useState('');
  const [selectedRightId, setSelectedRightId] = useState('');
  const [options, setOptions] = useState<any[]>([]);
  const [isLoadingLineage, setIsLoadingLineage] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState<any>(null);

  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Pencarian Hukum', href: '/pencarian' },
    { label: 'Bandingkan Sistem Hukum' },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setSelectedLeftId(id);
      fetchLineage(id);
    }
  }, []);

  const fetchLineage = async (baseId: string) => {
    setIsLoadingLineage(true);
    try {
      const res = await axios.get(`/api/peraturan/${baseId}/lineage`);
      if (res.data.success) {
        setOptions(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingLineage(false);
    }
  };

  const handleCompare = async () => {
    if (!selectedLeftId || !selectedRightId) return;
    setIsComparing(true);
    try {
      const res = await axios.get(`/api/peraturan/compare?left_id=${selectedLeftId}&right_id=${selectedRightId}`);
      if (res.data.success) {
        setComparisonData(res.data.data);
      }
    } catch (e) {
      console.error(e);
      alert("Gagal membandingkan dokumen.");
    } finally {
      setIsComparing(false);
    }
  };

  const handleViewDetail = (title: string) => {
    console.log('Lihat detail', title);
  };

  const handleDownload = (title: string) => {
    console.log('Download', title);
  };

  return (
    <PublicLayout>
      <Head title="Bandingkan Dokumen - LawGates" />
      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8">
          <div>
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-[#0A1931]">
              Bandingkan Dokumen
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl">
              Pilih dua dokumen untuk membandingkan secara komprehensif, mulai dari
              informasi umum, pembukaan, hingga detail batang tubuh / pasal per pasal.
            </p>
          </div>

          <ComparisonSelectorCard
            options={options}
            selectedLeftId={selectedLeftId}
            selectedRightId={selectedRightId}
            onChangeLeft={setSelectedLeftId}
            onChangeRight={setSelectedRightId}
            onCompareClick={handleCompare}
            disabledLeft={true}
          />

          {isComparing ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
              <p className="text-sm text-gray-500 font-medium">Sedang membandingkan dokumen...</p>
            </div>
          ) : comparisonData ? (
            <>
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

              <ComparisonTable
                leftTitle={comparisonData.acuanAwal.title}
                rightTitle={comparisonData.yangDibandingkan.title}
                sections={comparisonData.sections}
              />
            </>
          ) : null}
        </div>
      </div>
    </PublicLayout>
  );
}
