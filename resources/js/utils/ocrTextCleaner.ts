export const cleanOcrText = (text: string): string => {
  if (!text) return text;

  let cleaned = text;

  // 1. Bersihkan invisible characters, BOM, dan karakter rusak (replacement char \uFFFD)
  cleaned = cleaned.replace(/[\uFEFF\u200B-\u200D\u2060\u00AD]/g, '');
  cleaned = cleaned.replace(/\uFFFD/g, '');

  // 2. Bersihkan simbol bintang, lambang/emblem garuda/presiden, cap/segel, dan dingbats hasil OCR
  // Mencakup: ☆, ★, ⭐, ⭑, ⭒, ✦, ✧, ✩, ✪, ✫, ✬, ✭, ✮, ✯, ✰, ⚝, ✵, ✶, ✷, ✸, ✹, ✺, ✻, ✼, ✽, ✾, ✿, ❀, ❁, ❂, ❃, ✨, ✡, ✴, ✳, ✲, ✱, ⚜, ۞, ۩, ⚖, ⚡, ⚙, ¤, †, ‡, ※, ¶, dll.
  const OCR_EMBLEM_AND_STAR_ICONS = /[☆★⭐⭑⭒✦✧✩✪✫✬✭✮✯✰⚝✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃✨✡✴✳✲✱⚜۞۩⚖⚡⚙¤†‡※¶]/gu;
  cleaned = cleaned.replace(OCR_EMBLEM_AND_STAR_ICONS, '');

  // 3. Tarik tanda baca nyasar (:, ;, ,) ke baris sebelumnya
  // Mengatasi kasus: "... dimana \n : \n 1. kkk" -> "... dimana:\n1. kkk"
  cleaned = cleaned.replace(/([^\s])\s*\n\s*([:;,])\s*\n/g, '$1$2\n');
  
  // Mengatasi kasus: "... dimana \n : 1. kkk" -> "... dimana:\n 1. kkk"
  cleaned = cleaned.replace(/([^\s])\s*\n\s*([:;,])/g, '$1$2\n');

  // 4. Hapus pemotongan kata dengan tanda hubung
  // Contoh: "undang-\nundang" menjadi "undang-undang"
  cleaned = cleaned.replace(/([a-zA-Z0-9])-\s*\n\s*([a-zA-Z])/g, '$1-$2');

  const rawLines = cleaned.split('\n');
  const lines = rawLines.map((line) => {
    // a. Rapikan spasi ganda horizontal dalam baris
    let l = line.replace(/[^\S\r\n]+/g, ' ');

    // b. Bersihkan bullet / simbol nyasar di awal baris sebelum penanda struktur dokumen hukum atau judul peraturan
    // Contoh: "• INSTRUKSI PRESIDEN", "* UNDANG-UNDANG", "• PERDA", "- BAB I", "• PASAL 1"
    l = l.replace(
      /^[\s•●○◆◇■□▲△▼▽►◄▶◀▪▫‣⁃◘◙❖✓✔✕✖✗✘*#_~-]+\s*(?=(UNDANG[-_\s]?UNDANG|PERATURAN|PERDA|PERGUB|PERBUP|PERWALI|INSTRUKSI|INPRES|KEPUTUSAN|KEPPRES|KEPMEN|PENETAPAN|TAP[-_\s]?MPR|BAB|PASAL|BAGIAN|PARAGRAF|MEMUTUSKAN|MENIMBANG|MENGINGAT|MENETAPKAN|DITETAPKAN|DIUNDANGKAN)\b)/i,
      ''
    );

    // c. Bersihkan bullet nyasar sebelum nomor/huruf list (misal: "• 1. ", "• a. ", "* 1. ", "● (1) ")
    l = l.replace(
      /^[\s•●○◆◇■□▲△▼▽►◄▶◀▪▫‣⁃◘◙❖✓✔✕✖✗✘*~]+\s*(?=(\d+[.)]|[a-zA-Z][.)]|\(\d+\)|\([a-zA-Z]\)))/,
      ''
    );

    // d. Ubah bullet grafis standalone (tanpa penomoran) menjadi dash standar "- "
    l = l.replace(/^[\s•●○◆◇■□▲△▼▽►◄▶◀▪▫‣⁃◘◙❖]+\s*/, '- ');

    return l.trim();
  });

  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    const nextLine = lines[i + 1];

    // Jika ini baris terakhir
    if (nextLine === undefined) {
      if (currentLine !== '') {
        result.push(currentLine);
      }
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
    // Pengecualian: Jika diakhiri dengan pola list (misal: " a.", " 1.", "a.", "1."), jangan anggap sebagai penutup kalimat agar bisa digabung dengan teks di bawahnya.
    const endsWithTerminator = /[.:;!?]$/.test(trimmedCurrent) && !/(^|\s)([a-zA-Z]|\d+)\.$/.test(trimmedCurrent);
    
    // b. Baris berikutnya adalah penanda struktur dokumen hukum
    const isNextLineStructure = /^(Pasal|BAB|Bagian|Paragraf|Mengingat|Menimbang|Memutuskan|Menetapkan|Ditetapkan|Diundangkan|Undang[-_\s]?Undang|Peraturan|Perda|Pergub|Perbup|Perwali|Instruksi|Inpres|Keputusan|Keppres|Kepmen|Penetapan|TAP[-_\s]?MPR)\b/i.test(trimmedNext);
    
    // c. Baris berikutnya adalah list item (contoh: "1. ", "a. ", "1) ", "a) ", "- ", "(1) ")
    const isNextLineList = /^(\d+[.)]|[a-zA-Z][.)]|-|\(\d+\)|\([a-zA-Z]\))\s/.test(trimmedNext);

    if (endsWithTerminator || isNextLineStructure || isNextLineList) {
      // Baris ini sudah valid sebagai akhir, simpan apa adanya
      result.push(currentLine);
    } else {
      // Gabungkan baris ini dengan baris berikutnya!
      lines[i + 1] = currentLine.replace(/\s+$/, '') + ' ' + nextLine.trimStart();
    }
  }

  return result.join('\n').trim();
};
