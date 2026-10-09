import { useMemo } from 'react';
import { ReadonlyTimelineItem } from '@/Components/public/peraturan/ReadonlyTimelineSection';

export function useRegulationTimeline(peraturan: any) {
  const timelineData = useMemo<ReadonlyTimelineItem[]>(() => {
    // Filter hanya relasi riwayat perubahan hukum (mengubah/diubah/mencabut/dicabut).
    // Abaikan relasi konsiderans non-perubahan seperti 'mengingat', 'merujuk', 'dirujuk', 'melaksanakan', 'menetapkan'.
    const relations = (peraturan.law_relations || []).filter((rel: any) => {
      const relName = (rel.relation_type?.nama_relasi || '').toLowerCase();
      return relName.includes('ubah') || relName.includes('cabut');
    });

    const beforeCurrent: ReadonlyTimelineItem[] = [];
    const afterCurrent: ReadonlyTimelineItem[] = [];

    relations.forEach((rel: any, index: number) => {
      const relName = rel.relation_type?.nama_relasi || 'Terkait';
      const isMencabut = relName.toLowerCase().includes('mencabut');
      let variant: 'diubah' | 'mengubah' | 'dicabut' = 'mengubah';

      if (relName.toLowerCase().includes('diubah')) variant = 'diubah';
      else if (isMencabut) variant = 'dicabut';

      const toPeraturan = rel.to_peraturan;
      const rawJudul = toPeraturan?.judul || '';
      const isWaitingImport = rawJudul.toLowerCase().includes('menunggu import');
      const hasUniqueId = Boolean(toPeraturan?.unique_id);

      // Pengecekan ketat: Dokumen benar-benar tersedia HANYA jika memiliki pembukaan DAN pasal,
      // tidak sedang menunggu import, dan memiliki unique_id yang valid.
      const hasPembukaan = Boolean(
        toPeraturan?.has_pembukaan ?? (toPeraturan?.pembukaan_count && toPeraturan.pembukaan_count > 0)
      );
      const hasPasal = Boolean(
        toPeraturan?.has_pasal ?? (toPeraturan?.pasal_count && toPeraturan.pasal_count > 0)
      );

      const isAvailable = Boolean(
        toPeraturan &&
        !isWaitingImport &&
        hasUniqueId &&
        (toPeraturan.is_available ?? (hasPembukaan && hasPasal))
      );

      // Bersihkan teks "Menunggu import dokumen: xxx" agar menjadi judul peraturan yang rapi sesuai desain
      let displayJudul = rawJudul || rel.to_peraturan_id || 'Peraturan Terkait';
      if (isWaitingImport) {
        const rawName = rawJudul.replace(/^menunggu import dokumen:\s*/i, '').trim();
        const formatted = rawName
          .replace(/^undang-undang-(\d+)-(\d+)/i, 'Undang-Undang Nomor $1 Tahun $2')
          .replace(/^undang-(\d+)-(\d+)/i, 'Undang-Undang Nomor $1 Tahun $2')
          .replace(/^uu-(\d+)-(\d+)/i, 'Undang-Undang Nomor $1 Tahun $2')
          .replace(/^perpu-(\d+)-(\d+)/i, 'Peraturan Pemerintah Pengganti Undang-Undang Nomor $1 Tahun $2')
          .replace(/^pp-(\d+)-(\d+)/i, 'Peraturan Pemerintah Nomor $1 Tahun $2');

        if (formatted !== rawName) {
          displayJudul = formatted;
        } else {
          displayJudul = rawName
            .split(/[-_]/)
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        }
      }

      const item: ReadonlyTimelineItem = {
        id: `rel-${index}`,
        kode: toPeraturan?.unique_id || '',
        judul: displayJudul,
        href: isAvailable ? `/peraturan/${toPeraturan?.unique_id}` : undefined,
        isAvailable: isAvailable,
        keteranganBadge: {
          label: relName,
          variant: variant,
        },
        statusBadge: {
          label: 'Tahun ' + (toPeraturan?.tahun || '-'),
          variant: 'tersedia',
        },
        isCurrent: false,
      };

      // Jika relasinya "Diubah" atau "Dicabut" artinya aturan tersebut mengubah aturan ini, taruh di atas
      if (variant === 'diubah' || variant === 'dicabut') {
        beforeCurrent.push(item);
      } else {
        afterCurrent.push(item);
      }
    });

    const currentItem: ReadonlyTimelineItem = {
      id: 'current',
      kode: peraturan.unique_id || '',
      judul: peraturan.judul,
      isCurrent: true,
      isAvailable: true,
      keteranganBadge: {
        label: peraturan.status_peraturan?.nama_status || 'Diubah',
        variant: 'diubah',
      },
    };

    return [...beforeCurrent, currentItem, ...afterCurrent];
  }, [peraturan]);

  return {
    timelineData,
  };
}
