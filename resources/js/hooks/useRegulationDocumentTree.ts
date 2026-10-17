import { useState, useEffect, useMemo } from 'react';
import { ChapterItem, ArticleItem, detectTargetPeraturan } from '@/Components/admin/import/correctionParser';

export function useRegulationDocumentTree(peraturan: any) {
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Map Data from Database to UI State (Adaptif Tree Builder)
  const initialBabList = useMemo<ChapterItem[]>(() => {
    if (!peraturan) return [];
    const rawStrukturList = peraturan.struktur_dokumen || [];
    const ignoredTipes = ['PEMBUKAAN', 'KONSIDERANS', 'DASAR_HUKUM', 'DIKTUM'];
    const strukturList = rawStrukturList.filter((str: any) => !ignoredTipes.includes(str.tipe_struktur));

    const rawPasalList = peraturan.pasal || [];

    // Map all ArticleItems from rawPasalList
    const pasalMap = new Map<string, ArticleItem>();
    rawPasalList.forEach((p: any) => {
      const rawNomor = String(p.nomor_pasal || '').trim();
      const nomorFormatted =
        rawNomor === '0' || rawNomor === ''
          ? 'Pasal'
          : rawNomor.toLowerCase().startsWith('pasal') || rawNomor.toLowerCase().startsWith('angka')
            ? rawNomor
            : `Pasal ${rawNomor}`;

      const targetInfo = detectTargetPeraturan(p.isi_pasal || '');
      const isAmendingContainer = Boolean(targetInfo) || /diubah\s+sebagai\s+berikut/i.test(p.isi_pasal || '');

      pasalMap.set(p.id.toString(), {
        id: p.id.toString(),
        nomor: p.nomor_pasal?.toLowerCase().startsWith('pasal') ? p.nomor_pasal : `Pasal ${p.nomor_pasal}`,
        isi: p.isi_pasal || '',
        penjelasan: p.penjelasan?.isi_penjelasan,
        isExpanded: true,
        pasalList: [],
      });
    });

    // Nest pasals inside parent pasals if they have parent_pasal_id
    const rootPasals: any[] = [];
    rawPasalList.forEach((p: any) => {
      const articleItem = pasalMap.get(p.id.toString())!;
      if (p.parent_pasal_id) {
        const parentArticle = pasalMap.get(p.parent_pasal_id.toString());
        if (parentArticle) {
          if (!parentArticle.pasalList) parentArticle.pasalList = [];
          parentArticle.pasalList.push(articleItem);
        } else {
          rootPasals.push(p);
        }
      } else {
        rootPasals.push(p);
      }
    });

    // Deteksi apakah sebuah baris pada struktur_dokumen sebenarnya adalah Pasal
    const isPasalRow = (str: any) => {
      const label = String(str.label || '').trim();
      const tipe = String(str.tipe_struktur || '').toUpperCase();
      return tipe === 'PASAL' || /^Pasal\s+\d+/i.test(label);
    };

    const assignedPasalIds = new Set<string>();
    const chapterMap = new Map<string, ChapterItem>();
    const rootItems: ChapterItem[] = [];
    let currentChapter: ChapterItem | null = null;

    // Proses strukturList secara sekuensial agar hierarki BAB -> Pasal tersusun rapi
    strukturList.forEach((str: any) => {
      if (isPasalRow(str)) {
        assignedPasalIds.add(str.id.toString());
        const pasalLabel = str.label?.toLowerCase().startsWith('pasal') ? str.label : `Pasal ${str.label}`;
        const article: ArticleItem = {
          id: str.id.toString(),
          nomor: pasalLabel,
          isi: str.judul_struktur || '',
          penjelasan: '',
          isExpanded: true,
          pasalList: [],
        };

        if (str.parent_id && chapterMap.has(str.parent_id.toString())) {
          chapterMap.get(str.parent_id.toString())!.pasalList.push(article);
        } else if (currentChapter) {
          currentChapter.pasalList.push(article);
        } else {
          currentChapter = {
            id: 'chapter-default',
            judul: 'Batang Tubuh',
            deskripsi: '',
            isExpanded: true,
            children: [],
            pasalList: [article],
          };
          chapterMap.set('chapter-default', currentChapter);
          rootItems.push(currentChapter);
        }
      } else {
        const pasalsInStruktur = rootPasals.filter((p: any) => p.struktur_id === str.id);
        pasalsInStruktur.forEach((p: any) => assignedPasalIds.add(p.id.toString()));

        let judul = str.label || '';
        let deskripsi = '';
        if (str.judul_struktur) {
          if (!judul) {
            judul = str.judul_struktur;
          } else {
            deskripsi = str.judul_struktur;
          }
        }

        const newChapter: ChapterItem = {
          id: str.id.toString(),
          judul: judul || 'BAGIAN',
          deskripsi: deskripsi,
          isExpanded: true,
          children: [],
          pasalList: pasalsInStruktur.map((p: any) => pasalMap.get(p.id.toString())!),
        };

        chapterMap.set(str.id.toString(), newChapter);
        currentChapter = newChapter;

        if (str.parent_id && chapterMap.has(str.parent_id.toString())) {
          chapterMap.get(str.parent_id.toString())!.children!.push(newChapter);
        } else {
          rootItems.push(newChapter);
        }
      }
    });

    // Jika strukturList kosong tetapi rawPasalList ada, kelompokkan ke dalam Batang Tubuh
    if (rootItems.length === 0 && rawPasalList.length > 0) {
      rootItems.push({
        id: 'chapter-batang-tubuh',
        judul: 'Batang Tubuh',
        deskripsi: '',
        isExpanded: true,
        children: [],
        pasalList: rootPasals.map((p: any) => pasalMap.get(p.id.toString())!),
      });
    }

    // Fifth pass: Recovery of unassigned/orphan pasals
    const unassignedPasals = rootPasals.filter((p: any) => !assignedPasalIds.has(p.id.toString()));

    if (unassignedPasals.length > 0) {
      if (rootItems.length > 0) {
        const targetChapter = rootItems[0];
        unassignedPasals.forEach((p: any) => {
          const art = pasalMap.get(p.id.toString());
          if (art && targetChapter) {
            targetChapter.pasalList.push(art);
          }
        });
      } else {
        rootItems.push({
          id: 'bab-default',
          judul: 'Batang Tubuh',
          tipe: 'BAB',
          isExpanded: false,
          children: [],
          pasalList: unassignedPasals.map((p: any) => pasalMap.get(p.id.toString())!),
        });
      }
    }

    return rootItems;
  }, [peraturan]);

  const [babsState, setBabsState] = useState<ChapterItem[]>(() => initialBabList);

  useEffect(() => {
    setBabsState(initialBabList);
  }, [initialBabList]);

  const handleToggleBab = (babId: string) => {
    const toggleNode = (nodes: ChapterItem[], targetId: string): ChapterItem[] => {
      return nodes.map((n) => {
        if (n.id === targetId) return { ...n, isExpanded: !n.isExpanded };
        if (n.children && n.children.length > 0) return { ...n, children: toggleNode(n.children, targetId) };
        return n;
      });
    };
    setBabsState((prev) => toggleNode(prev, babId));
  };

  const handleTogglePasal = (_babId: string, pasalId: string) => {
    const togglePasalInList = (
      pasalList: ArticleItem[],
      targetPasalId: string
    ): { list: ArticleItem[]; updated: boolean } => {
      let updated = false;
      const list = pasalList.map((p) => {
        if (p.id === targetPasalId) {
          updated = true;
          return { ...p, isExpanded: !p.isExpanded };
        }
        if (p.pasalList && p.pasalList.length > 0) {
          const childResult = togglePasalInList(p.pasalList, targetPasalId);
          if (childResult.updated) {
            updated = true;
            return { ...p, pasalList: childResult.list };
          }
        }
        return p;
      });
      return { list, updated };
    };

    const togglePasalNode = (nodes: ChapterItem[], targetPasalId: string): ChapterItem[] => {
      return nodes.map((n) => {
        const { list: newPasalList, updated } = togglePasalInList(n.pasalList || [], targetPasalId);

        if (updated) return { ...n, pasalList: newPasalList };
        if (n.children && n.children.length > 0) return { ...n, children: togglePasalNode(n.children, targetPasalId) };
        return n;
      });
    };
    setBabsState((prev) => togglePasalNode(prev, pasalId));
  };

  const scrollToElement = (elementId: string) => {
    setActiveSectionId(elementId);
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (!el) return;

      const container = document.getElementById('scrollable-content');
      if (container && window.innerWidth >= 1024 && container.scrollHeight > container.clientHeight + 10) {
        const headerOffset = 16;
        const elementPosition = el.getBoundingClientRect().top;
        const containerPosition = container.getBoundingClientRect().top;
        const offsetPosition = elementPosition - containerPosition + container.scrollTop - headerOffset;
        container.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      } else {
        const headerOffset = 110;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigateToStruktur = (strukturId: string) => {
    const expandPath = (nodes: ChapterItem[], targetId: string): { nodes: ChapterItem[]; found: boolean } => {
      let foundInList = false;
      const newNodes = nodes.map((n) => {
        if (n.id === targetId) {
          foundInList = true;
          return { ...n, isExpanded: true };
        }
        if (n.children && n.children.length > 0) {
          const result = expandPath(n.children, targetId);
          if (result.found) {
            foundInList = true;
            return { ...n, isExpanded: true, children: result.nodes };
          }
          return { ...n, children: result.nodes };
        }
        return n;
      });
      return { nodes: newNodes, found: foundInList };
    };
    setBabsState((prev) => expandPath(prev, strukturId).nodes);
    scrollToElement(`struktur-${strukturId}`);
  };

  const handleNavigateToPasal = (pasalId: string) => {
    const expandPasalPath = (
      pasalList: ArticleItem[],
      targetId: string
    ): { list: ArticleItem[]; found: boolean } => {
      let foundInList = false;
      const newList = pasalList.map((p) => {
        if (p.id === targetId) {
          foundInList = true;
          return { ...p, isExpanded: true };
        }
        if (p.pasalList && p.pasalList.length > 0) {
          const result = expandPasalPath(p.pasalList, targetId);
          if (result.found) {
            foundInList = true;
            return { ...p, isExpanded: true, pasalList: result.list };
          }
          return { ...p, pasalList: result.list };
        }
        return p;
      });
      return { list: newList, found: foundInList };
    };

    const expandStrukturPath = (nodes: ChapterItem[], targetId: string): { nodes: ChapterItem[]; found: boolean } => {
      let foundInList = false;
      const newNodes = nodes.map((n) => {
        const pasalResult = expandPasalPath(n.pasalList || [], targetId);
        if (pasalResult.found) {
          foundInList = true;
          return { ...n, isExpanded: true, pasalList: pasalResult.list };
        }
        if (n.children && n.children.length > 0) {
          const result = expandStrukturPath(n.children, targetId);
          if (result.found) {
            foundInList = true;
            return { ...n, isExpanded: true, children: result.nodes };
          }
          return { ...n, children: result.nodes };
        }
        return n;
      });
      return { nodes: newNodes, found: foundInList };
    };

    setBabsState((prev) => expandStrukturPath(prev, pasalId).nodes);
    scrollToElement(`section-${pasalId}`);
  };

  return {
    babsState,
    setBabsState,
    activeSectionId,
    setActiveSectionId,
    searchQuery,
    setSearchQuery,
    handleToggleBab,
    handleTogglePasal,
    handleNavigateToStruktur,
    handleNavigateToPasal,
    scrollToElement,
  };
}
