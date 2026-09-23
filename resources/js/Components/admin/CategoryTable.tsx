import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react';
import { IconButton } from '@/Components/common';

export interface CategoryItem {
  id: string;
  kode?: string;
  kategori: string;
  deskripsi: string;
}

export type CategorySortColumn = 'kategori' | 'deskripsi';
export type SortDirection = 'asc' | 'desc';

interface CategoryTableProps {
  categories: CategoryItem[];
  onEdit?: (item: CategoryItem) => void;
  onDelete?: (item: CategoryItem) => void;
  sortColumn?: CategorySortColumn | null;
  sortDirection?: SortDirection;
  onSort?: (column: CategorySortColumn) => void;
}

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
}: CategoryTableProps) {
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const renderSortIcon = (column: CategorySortColumn) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3 h-3 text-pr-900" />
      ) : (
        <ArrowDown className="w-3 h-3 text-pr-900" />
      );
    }
    return <ArrowUpDown className="w-3 h-3 text-neu-400 group-hover:text-neu-600 transition-colors" />;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActiveActionId(null);
      }
    }

    if (activeActionId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeActionId]);

  return (
    <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-visible transition-all duration-200">
      <div className="overflow-x-auto sm:overflow-visible">
        <table className="w-full min-w-[500px] text-left border-collapse">
          {/* Table Header (Sesuai spesifikasi admin: rounded-tl-xl, rounded-tr-xl, bg-[#E9EAEB]) */}
          <thead>
            <tr className="bg-[#E9EAEB] border-b border-neu-200 text-[12px] font-semibold text-neu-600 uppercase tracking-wider select-none">
              <th className="py-3 px-5 whitespace-nowrap rounded-tl-xl">
                <div
                  onClick={() => onSort?.('kategori')}
                  className="group inline-flex items-center gap-1 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'kategori' ? 'text-pr-900 font-bold' : ''}>Kategori</span>
                  {renderSortIcon('kategori')}
                </div>
              </th>
              <th className="py-3 px-5 whitespace-nowrap">
                <div
                  onClick={() => onSort?.('deskripsi')}
                  className="group inline-flex items-center gap-1 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'deskripsi' ? 'text-pr-900 font-bold' : ''}>Deskripsi</span>
                  {renderSortIcon('deskripsi')}
                </div>
              </th>
              <th className="py-3 px-5 text-right whitespace-nowrap rounded-tr-xl">
                <span>Aksi</span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-neu-50 text-[12px] text-neu-800">
            {categories.map((item, index) => {
              const isActionOpen = activeActionId === item.id;
              const isNearBottom = index >= categories.length - 2 && categories.length >= 3;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Kategori */}
                  <td className="py-3.5 px-5 font-normal text-neu-900 whitespace-nowrap">
                    {item.kategori}
                  </td>

                  {/* Deskripsi */}
                  <td className="py-3.5 px-5 font-normal text-neu-600">
                    <span className="line-clamp-1" title={item.deskripsi}>
                      {item.deskripsi}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap relative">
                    <IconButton
                      icon={<MoreVertical className="w-4 h-4 text-neu-600" />}
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setActiveActionId(isActionOpen ? null : item.id)
                      }
                      title="Aksi kategori"
                    />

                    {/* Popover Aksi Sesuai Gambar 3 */}
                    {isActionOpen && (
                      <div
                        ref={actionMenuRef}
                        className={`absolute right-5 ${
                          isNearBottom ? 'bottom-10' : 'top-11'
                        } z-30 w-36 bg-white rounded-xl shadow-xl border border-neu-100 py-1.5 text-left animate-in fade-in zoom-in-95 duration-150`}
                      >
                        <div className="px-3 py-1 text-[12px] font-semibold text-neu-400 uppercase tracking-wider">
                          Aksi
                        </div>

                        {/* Edit Kategori */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onEdit) onEdit(item);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-neu-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5 text-neu-500" />
                          <span>Edit Kategori</span>
                        </button>

                        {/* Hapus */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onDelete) onDelete(item);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-dan-800 hover:bg-dan-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-dan-800" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
