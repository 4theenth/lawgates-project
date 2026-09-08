import { CheckCircle2, AlertCircle, RefreshCw, FileX } from 'lucide-react';
import { CountUp } from '../common/CountUp';

interface StatItem {
  id: string;
  title: string;
  count: number;
  subtitle: string;
  icon: React.ReactNode;
  valueColor: string;
}

const statsData: StatItem[] = [
  {
    id: 'berlaku',
    title: 'HUKUM BERLAKU',
    count: 3769083,
    subtitle: 'Total Hukum Berlaku',
    icon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />,
    valueColor: 'text-[#16A34A]',
  },
  {
    id: 'tidak-berlaku',
    title: 'HUKUM TIDAK BERLAKU',
    count: 129000,
    subtitle: 'Total Hukum Tidak Berlaku',
    icon: <AlertCircle className="w-5 h-5 text-[#EF4444]" />,
    valueColor: 'text-[#EF4444]',
  },
  {
    id: 'diubah',
    title: 'HUKUM DIUBAH',
    count: 278000,
    subtitle: 'Total Hukum Diubah',
    icon: <RefreshCw className="w-5 h-5 text-[#EAB308]" />,
    valueColor: 'text-[#EAB308]',
  },
  {
    id: 'dicabut',
    title: 'HUKUM DICABUT',
    count: 12000,
    subtitle: 'Total Hukum Dicabut',
    icon: <FileX className="w-5 h-5 text-[#64748B]" />,
    valueColor: 'text-[#1E293B]',
  },
];

export function StatsOverview() {
  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 -mt-10 lg:-mt-12 mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 min-h-[118px]"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider">
                {item.title}
              </span>
              {item.icon}
            </div>
            <div className={`text-2xl lg:text-[26px] font-extrabold leading-tight tracking-tight ${item.valueColor}`}>
              <CountUp end={item.count} />
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {item.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
