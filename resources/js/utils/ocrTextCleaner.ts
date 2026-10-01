export const cleanOcrText = (text: string): string => {
  if (!text) return text;

  let cleaned = text;

  // 1. Tarik tanda baca nyasar (:, ;, ,) ke baris sebelumnya
  // Mengatasi kasus: "... dimana \n : \n 1. kkk" -> "... dimana:\n1. kkk"
  cleaned = cleaned.replace(/([^\s])\s*\n\s*([:;,])\s*\n/g, '$1$2\n');
  
  // Mengatasi kasus: "... dimana \n : 1. kkk" -> "... dimana:\n 1. kkk"
  cleaned = cleaned.replace(/([^\s])\s*\n\s*([:;,])/g, '$1$2\n');

  // 2. Hapus pemotongan kata dengan tanda hubung
  // Contoh: "undang-\nundang" menjadi "undang-undang"
  cleaned = cleaned.replace(/([a-zA-Z0-9])-\s*\n\s*([a-zA-Z])/g, '$1-$2');

  const lines = cleaned.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    const nextLine = lines[i + 1];

    // Jika ini baris terakhir
    if (nextLine === undefined) {
      result.push(currentLine);
      break;
    }

    const trimmedCurrent = currentLine.trim();
    const trimmedNext = nextLine.trim();

    // Pertahankan baris yang memang sengaja dikosongkan
    if (trimmedCurrent === '' || trimmedNext === '') {
      result.push(currentLine);
      continue;
    }

    // --- KONDISI UNTUK TIDAK MENGGABUNG (PERTAHANKAN ENTER) ---
    
    // a. Baris saat ini diakhiri tanda baca penutup kalimat/paragraf
    const endsWithTerminator = /[.:;!?]$/.test(trimmedCurrent);
    
    // b. Baris berikutnya adalah penanda struktur dokumen hukum
    const isNextLineStructure = /^(Pasal|BAB|Bagian|Paragraf|Mengingat|Menimbang|Memutuskan|Menetapkan|Ditetapkan|Diundangkan)\b/i.test(trimmedNext);
    
    // c. Baris berikutnya adalah list item (contoh: "1. ", "a. ", "1) ", "a) ", "- ")
    const isNextLineList = /^(\d+[.)]|[a-zA-Z][.)]|-)\s/.test(trimmedNext);

    if (endsWithTerminator || isNextLineStructure || isNextLineList) {
      // Baris ini sudah valid sebagai akhir, simpan apa adanya
      result.push(currentLine);
    } else {
      // Gabungkan baris ini dengan baris berikutnya!
      // (Kita tidak mem-push ke result, melainkan menyambungnya ke nextLine)
      lines[i + 1] = currentLine.replace(/\s+$/, '') + ' ' + nextLine.trimStart();
    }
  }

  return result.join('\n');
};
