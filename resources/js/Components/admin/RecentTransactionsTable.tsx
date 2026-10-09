import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { TablePagination } from '@/Components/admin/TablePagination';

export type TransactionStatus = 'Berhasil' | 'Pending' | 'Gagal';

export interface TransactionItem {
  id: string;
  userName: string;
  date: string;
  timestamp: number;
  status: TransactionStatus;
}

interface RecentTransactionsTableProps {
  initialData?: TransactionItem[];
  className?: string;
}

const DEFAULT_TRANSACTIONS: TransactionItem[] = [
  { id: '1', userName: 'Mangadi', date: '1 Okt 2026', timestamp: 1727740800000, status: 'Berhasil' },
  { id: '2', userName: 'Dhanan', date: '1 Okt 2026', timestamp: 1727740800000, status: 'Pending' },
  { id: '3', userName: 'Kevin', date: '1 Okt 2026', timestamp: 1727740800000, status: 'Berhasil' },
  { id: '4', userName: 'Yudist', date: '1 Okt 2026', timestamp: 1727740800000, status: 'Berhasil' },
  { id: '5', userName: 'Monica', date: '1 Okt 2026', timestamp: 1727740800000, status: 'Gagal' },
  { id: '6', userName: 'Budi Santoso', date: '2 Okt 2026', timestamp: 1727827200000, status: 'Berhasil' },
  { id: '7', userName: 'Siti Rahma', date: '2 Okt 2026', timestamp: 1727827200000, status: 'Pending' },
  { id: '8', userName: 'Ahmad Fauzi', date: '3 Okt 2026', timestamp: 1727913600000, status: 'Berhasil' },
  { id: '9', userName: 'Rian Pratama', date: '3 Okt 2026', timestamp: 1727913600000, status: 'Berhasil' },
  { id: '10', userName: 'Dewi Lestari', date: '4 Okt 2026', timestamp: 1728000000000, status: 'Pending' },
  { id: '11', userName: 'Eko Wahyudi', date: '4 Okt 2026', timestamp: 1728000000000, status: 'Berhasil' },
  { id: '12', userName: 'Putri Handayani', date: '5 Okt 2026', timestamp: 1728086400000, status: 'Gagal' },
];

export function RecentTransactionsTable({
  initialData = DEFAULT_TRANSACTIONS,
  className = '',
}: RecentTransactionsTableProps) {
  // State sorting
  const [sortColumn, setSortColumn] = useState<'userName' | 'date' | 'status' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // State pagination (4 baris per halaman, menghasilkan 3 halaman untuk 12 dummy data)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handleSort = (column: 'userName' | 'date' | 'status') => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        // Reset sort
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Logic pengurutan data
  const sortedData = useMemo(() => {
    if (!sortColumn) return initialData;

    return [...initialData].sort((a, b) => {
      let comparison = 0;
      if (sortColumn === 'userName') {
        comparison = a.userName.localeCompare(b.userName);
      } else if (sortColumn === 'date') {
        comparison = a.timestamp - b.timestamp;
      } else if (sortColumn === 'status') {
        comparison = a.status.localeCompare(b.status);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [initialData, sortColumn, sortDirection]);

  // Data paginated
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const renderSortIcon = (column: 'userName' | 'date' | 'status') => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 shrink-0 transition-colors" />;
  };

  const renderStatusBadge = (status: TransactionStatus) => {
    if (status === 'Berhasil') {
      return (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[12px] font-medium leading-[16px] bg-suc-50 border border-suc-50 text-suc-900">
          Berhasil
        </span>
      );
    }
    if (status === 'Pending') {
      return (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[12px] font-medium leading-[16px] bg-sec-50 border border-sec-50 text-sec-900">
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[12px] font-medium leading-[16px] bg-dan-50 border border-dan-50 text-dan-900">
        Gagal
      </span>
    );
  };

  return (
    <div
      className={`bg-white rounded-xl border border-neu-50 p-4 sm:p-[17px_26px] flex flex-col justify-between shadow-2xs ${className}`}
    >
      <div>
        {/* Title */}
        <h3 className="text-[16px] font-medium leading-[24px] text-neu-900 mb-3 tracking-tight">
          Transaksi Terakhir
        </h3>

        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed text-left border-collapse min-w-[380px]">
            {/* Colgroup untuk mengunci lebar kolom agar judul & kolom tetap diam saat diurutkan */}
            <colgroup>
              <col className="w-[44%]" />
              <col className="w-[34%]" />
              <col className="w-[22%]" />
            </colgroup>

            {/* Header */}
            <thead>
              <tr className="bg-pr-50/60 rounded-t-xl select-none">
                <th
                  onClick={() => handleSort('userName')}
                  className="py-2.5 px-3 text-[12px] font-medium text-neu-900 cursor-pointer group rounded-tl-xl transition-colors hover:bg-pr-50"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="truncate">Nama Pengguna</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                      {renderSortIcon('userName')}
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('date')}
                  className="py-2.5 px-3 text-[12px] font-medium text-neu-900 cursor-pointer group transition-colors hover:bg-pr-50"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="truncate">Tanggal</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                      {renderSortIcon('date')}
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-2.5 px-3 text-[12px] font-medium text-neu-900 cursor-pointer group rounded-tr-xl transition-colors hover:bg-pr-50"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="truncate">Status</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                      {renderSortIcon('status')}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-neu-50 hover:bg-gray-50/50 transition-colors text-[12px] leading-[18px]"
                >
                  <td className="py-2.5 px-3 font-normal text-neu-900 truncate" title={item.userName}>
                    {item.userName}
                  </td>
                  <td className="py-2.5 px-3 font-normal text-neu-900 truncate">
                    {item.date}
                  </td>
                  <td className="py-2.5 px-3">
                    {renderStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer Sesuai Figma node 2258-37952 */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default RecentTransactionsTable;
