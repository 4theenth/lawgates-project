import { Head } from '@inertiajs/react';
import { PublicLayout, Section } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { Badge } from '@/Components/common/Badge';
export default function DetailPeraturan({ peraturan }: { peraturan: any }) {
  return (
    <PublicLayout>
      <Head title={`${peraturan.judul} - LawGates`} />
      
      <Section>
        <div className="pt-32 pb-16 w-full max-w-7xl mx-auto px-4 min-h-screen text-gray-900">
          
          {/* Breadcrumb Navigasi */}
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Pencarian Hukum', href: '/pencarian' },
                { label: peraturan.judul }
              ]} 
            />
          </div>

          {/* Header Metadata */}
          <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex gap-2 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              <span>{peraturan.jenis_peraturan?.nama || 'Peraturan'}</span>
              <span>•</span>
              <span>Tahun {peraturan.tahun}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{peraturan.judul}</h1>
            <div className="flex flex-wrap gap-3 text-sm">
              <Badge variant={peraturan.status_peraturan?.nama_status?.toLowerCase().includes('tidak') || peraturan.status_peraturan?.nama_status?.toLowerCase().includes('cabut') ? 'danger' : peraturan.status_peraturan?.nama_status?.toLowerCase().includes('ubah') ? 'warning' : 'success'} className="border border-current px-3 py-1 font-semibold">
                {peraturan.status_peraturan?.nama_status || 'Status Tidak Diketahui'}
              </Badge>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                Ditetapkan: {peraturan.tanggal_penetapan || '-'}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                Tempat: {peraturan.tempat_penetapan || '-'}
              </span>
            </div>
          </div>

          {/* Grid 3 Kolom Sesuai Desain */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Kolom Kiri: Daftar Isi (3 Span) */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-5 shadow-sm max-h-[calc(100vh-120px)] overflow-y-auto">
                <h3 className="font-bold text-gray-800 mb-4 text-base border-b pb-2">
                  Daftar Isi
                </h3>
                <div className="space-y-3 text-sm">
                  {peraturan.struktur_dokumen?.map((str: any) => (
                    <div key={str.id} className="text-gray-600 hover:text-black transition-colors">
                      <span className="font-semibold text-gray-800">{str.label}</span>
                      {str.judul_struktur && (
                        <p className="text-xs text-gray-500 line-clamp-1">{str.judul_struktur}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kolom Tengah: Isi Peraturan (6 Span) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-gray-800 border-b pb-3">Isi Peraturan</h3>
                
                {/* Render Struktur Dokumen & Pasal secara berurutan */}
                {peraturan.struktur_dokumen?.map((str: any) => (
                  <div key={str.id} className="space-y-3 border-l-2 border-pr-900 pl-4 py-2">
                    <h4 className="font-bold text-md text-pr-900">{str.label}</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{str.judul_struktur}</p>
                  </div>
                ))}

                {/* Render Pasal-pasal Utama */}
                <div className="space-y-4 pt-4">
                  {peraturan.pasal?.map((pasal: any) => (
                    <div key={pasal.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50 shadow-xs">
                      <span className="inline-block px-2.5 py-1 bg-pr-900 text-white text-xs font-bold rounded-md mb-2">
                        {pasal.nomor_pasal}
                      </span>
                      <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{pasal.isi_pasal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Riwayat Perubahan (3 Span) */}
<div className="lg:col-span-3">
  <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <h3 className="font-bold text-gray-800 mb-4 text-base border-b pb-2">
      Riwayat Perubahan
    </h3>
    
    {/* Kontainer scrollable dengan batas maksimum tinggi */}
    <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar">
      {peraturan.law_relations && peraturan.law_relations.length > 0 ? (
        <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 my-2">
          {peraturan.law_relations.map((rel: any, index: number) => (
            <div key={index} className="relative pl-5">
              <div className="absolute w-3 h-3 bg-pr-900 rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
              <Badge variant="primary" className="text-[11px] font-bold uppercase rounded-md px-2 py-0.5">
                {rel.relation_type?.nama_relasi}
              </Badge>
              <p className="text-sm text-gray-800 mt-1 font-medium">{rel.to_peraturan?.judul}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500 italic">Tidak ada catatan riwayat perubahan relasi dokumen.</p>
      )}
    </div>
  </div>
</div>

          </div>
        </div>
      </Section>
    </PublicLayout>
  );
}