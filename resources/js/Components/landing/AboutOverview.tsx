import { CountUp } from '../common/CountUp';

export function AboutOverview() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center text-center">
      {/* Badge Tag: TENTANG KAMI */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold tracking-wider mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
        TENTANG KAMI
      </div>

      {/* Main Mission Statement */}
      <p className="text-gray-800 text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed max-w-4xl mb-12">
        LawGates adalah platform pangkalan data hukum terpadu yang merangkum seluruh peraturan perundang-undangan di Indonesia ke dalam satu titik akses pencarian tanpa harus menelusuri puluhan portal instansi pemerintah yang terpisah.
      </p>

      {/* 3 Big Metric Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-3xl border-t border-b border-gray-100 py-8">
        {/* Metric 1 */}
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight flex items-baseline">
            <CountUp end={3957045} />
            <span className="text-gray-900 ml-0.5">+</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
            Data Hukum
          </span>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight flex items-baseline">
            <CountUp end={1627205} />
            <span className="text-gray-900 ml-0.5">+</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
            Dokumen Hukum
          </span>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight flex items-baseline">
            <CountUp end={100000} />
            <span className="text-gray-900 ml-0.5">+</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
            Pelanggan Aktif
          </span>
        </div>
      </div>
    </section>
  );
}
