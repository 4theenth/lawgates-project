import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';

export function useEmbeddingProgress(onSuccess?: () => void) {
  const { toast } = useToast();
  const [modalState, setModalState] = useState<{
    show: boolean;
    title: string;
    totalPasal: number;
    processedPasal: number;
    statusMessage: string;
    isProcessing: boolean;
    isCompleted: boolean;
    isError: boolean;
    errorMessage?: string;
  }>({
    show: false,
    title: 'Proses Embedding AI',
    totalPasal: 0,
    processedPasal: 0,
    statusMessage: '',
    isProcessing: false,
    isCompleted: false,
    isError: false,
  });

  const isCancelledRef = useRef(false);

  const startEmbedding = useCallback(
    async ({
      ids,
      all_pending = false,
      force = false,
      customTitle,
    }: {
      ids?: string[];
      all_pending?: boolean;
      force?: boolean;
      customTitle?: string;
    }) => {
      isCancelledRef.current = false;
      const csrfToken =
        (document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';

      // 1. Inisialisasi - hitung total dokumen dan pasal
      try {
        setModalState({
          show: true,
          title: customTitle || (all_pending ? 'Embed Seluruh Regulasi Baru' : 'Embedding AI Dokumen'),
          totalPasal: 0,
          processedPasal: 0,
          statusMessage: 'Menghubungkan ke API & menganalisis naskah pasal...',
          isProcessing: true,
          isCompleted: false,
          isError: false,
        });

        const initRes = await fetch('/admin/dokumen-hukum/embed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify({
            ids,
            all_pending,
            force,
            init_only: true,
          }),
        });

        const initData = await initRes.json();
        if (!initRes.ok || !initData.success) {
          throw new Error(initData.message || 'Gagal menyiapkan proses embedding.');
        }

        const totalPasal = initData.total_pasal || 0;
        const targetPasalIds: number[] = initData.pasal_ids || [];

        if (totalPasal === 0 || targetPasalIds.length === 0) {
          setModalState((prev) => ({
            ...prev,
            isProcessing: false,
            isCompleted: true,
            totalPasal: 0,
            processedPasal: 0,
            statusMessage: 'Semua pasal pada dokumen yang dipilih sudah memiliki vektor embedding AI.',
          }));
          toast.info('Seluruh pasal pada dokumen ini sudah memiliki vektor embedding.');
          return;
        }

        setModalState((prev) => ({
          ...prev,
          totalPasal,
          statusMessage: `Ditemukan ${totalPasal} pasal dari ${initData.total_documents} dokumen. Memulai embedding...`,
        }));

        // 2. Loop per batch (20 pasal per request)
        const batchSize = initData.batch_size || 20;
        let processedAcc = 0;
        const totalBatches = Math.ceil(targetPasalIds.length / batchSize);

        for (let i = 0; i < targetPasalIds.length; i += batchSize) {
          if (isCancelledRef.current) {
            setModalState((prev) => ({
              ...prev,
              isProcessing: false,
              statusMessage: `Proses dihentikan pengguna. ${processedAcc} pasal yang sudah selesai tetap tersimpan.`,
            }));
            return;
          }

          const currentBatch = targetPasalIds.slice(i, i + batchSize);
          const batchNumber = Math.floor(i / batchSize) + 1;

          setModalState((prev) => ({
            ...prev,
            statusMessage: `Memproses batch ${batchNumber} dari ${totalBatches} (${processedAcc} / ${totalPasal} pasal selesai)...`,
          }));

          const stepRes = await fetch('/admin/dokumen-hukum/embed', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({
              pasal_ids: currentBatch,
            }),
          });

          const stepData = await stepRes.json();
          if (!stepRes.ok || !stepData.success) {
            throw new Error(stepData.message || `Gagal memproses batch #${batchNumber}.`);
          }

          processedAcc += stepData.processed_count || currentBatch.length;
          setModalState((prev) => ({
            ...prev,
            processedPasal: processedAcc,
          }));
        }

        // 3. Clear cache pencarian semantik sekali di akhir
        try {
          await fetch('/admin/dokumen-hukum/embed', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ clear_cache: true }),
          });
        } catch {
          // Abaikan kegagalan cache invalidate minor
        }

        setModalState((prev) => ({
          ...prev,
          isProcessing: false,
          isCompleted: true,
          processedPasal: totalPasal,
          statusMessage: `Berhasil memproses seluruh ${totalPasal} pasal ke model pencarian cerdas!`,
        }));

        toast.success(`Embedding AI berhasil untuk ${totalPasal} pasal!`);
        if (onSuccess) {
          onSuccess();
        }
      } catch (err: any) {
        console.error('Embedding error:', err);
        setModalState((prev) => ({
          ...prev,
          isProcessing: false,
          isError: true,
          errorMessage: err.message || 'Terjadi kesalahan jaringan saat memproses embedding AI.',
        }));
        toast.error(err.message || 'Gagal memproses embedding AI.');
      }
    },
    [onSuccess, toast]
  );

  const cancelEmbedding = useCallback(() => {
    isCancelledRef.current = true;
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    modalState,
    startEmbedding,
    cancelEmbedding,
    closeModal,
  };
}
