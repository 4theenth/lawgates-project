import { CheckCircle2, AlertCircle, RefreshCw, FileX } from 'lucide-react';
import { CountUp } from '../common/CountUp';
import { Icon } from '@/Components/ui/icon';

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
    icon: <Icon name="circle-check-big" className="w-5[20px] h-[20px] text-suc-900" />,
    valueColor: 'text-suc-900',
  },
  {
    id: 'tidak-berlaku',
    title: 'HUKUM TIDAK BERLAKU',
    count: 129000,
    subtitle: 'Total Hukum Tidak Berlaku',
    icon: <Icon name="circle-x" className="w-[20px] h-[20px] text-dan-900" />,
    valueColor: 'text-dan-900',
  },
  {
    id: 'diubah',
    title: 'HUKUM DIUBAH',
    count: 278000,
    subtitle: 'Total Hukum Diubah',
    icon: <Icon name="recycle" className="w-[20px] h-[20px] text-sec-800" />,
    valueColor: 'text-sec-800',
  },
  {
    id: 'dicabut',
    title: 'HUKUM DICABUT',
    count: 12000,
    subtitle: 'Total Hukum Dicabut',
    icon: <Icon name="hammer" className="w-[20px] h-[20px] text-neu-900" />,
    valueColor: 'text-neu-900',
  },
];

export function StatsOverview() {
  return (
    <div className="relative z-20 w-full max-w-[1196px] mx-auto px-6 -mt-[58px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 shadow-xl border border-neu-100 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 h-[116px]"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-neu-500 tracking-wider">
                {item.title}
              </span>
              {item.icon}
            </div>
            <div className={`text-2xl lg:text-[26px] font-extrabold leading-tight tracking-tight ${item.valueColor}`}>
              <CountUp end={item.count} />
            </div>
            <div className="text-xs text-neu-500 font-medium">
              {item.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
