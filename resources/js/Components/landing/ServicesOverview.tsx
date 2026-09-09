import { ArrowLeftRight, History, Sparkles } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'komparasi',
    icon: <ArrowLeftRight className="w-5 h-5 text-neu-700" />,
    title: 'Komparasi Hukum Secara Otomatis',
    description:
      'Bandingkan berbagai dokumen hukum sebelum dan sesudah revisi secara otomatis dan akurat. Teknologi ini dirancang untuk mendeteksi perubahan sekecil apa pun, sehingga Anda dapat mengetahui pasal yang dihapus, diganti, atau ditambah secara instan tanpa perlu membaca seluruh draf dari awal.',
  },
  {
    id: 'pelacak',
    icon: <History className="w-5 h-5 text-neu-700" />,
    title: 'Pelacak Status Keberlakuan Hukum',
    description:
      'Pantau dan lacak status keberlakuan suatu peraturan perundang-undangan secara real-time. Fitur ini secara otomatis mengidentifikasi apakah suatu pasal atau regulasi masih aktif, telah dicabut, atau sedang mengalami proses pengujian di Mahkamah Konstitusi. Dengan visualisasi yang jelas, Anda dapat memastikan bahwa dasar hukum yang Anda gunakan dalam argumen atau bisnis selalu mutakhir dan sah di mata hukum.',
  },
  {
    id: 'ai-assistant',
    icon: <Sparkles className="w-5 h-5 text-neu-700" />,
    title: 'AI Legal Assistant',
    description:
      'Asisten kecerdasan buatan canggih yang dirancang khusus untuk mempermudah pekerjaan riset/analisis hukum, praktisi, hingga masyarakat umum. AI ini mampu menganalisis pertanyaan hukum yang kompleks, mencari pasal-pasal relevan, merangkum putusan pengadilan terdahulu, hingga menyusun draf dasar hukum dengan sangat cepat.',
  },
];

export function ServicesOverview() {
  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neu-900 tracking-tight">
          Layanan LawGates
        </h2>
        <p className="text-neu-500 text-xs sm:text-sm mt-2 font-normal">
          Dirancang untuk mahasiswa hukum, praktisi, dan masyarakat umum
        </p>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {servicesData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-neu-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
          >
            {/* Centered Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-neu-50 border border-neu-200/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-neu-900 mb-3 tracking-tight">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-neu-600 leading-relaxed font-normal text-justify">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
