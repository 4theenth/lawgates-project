# Panduan Migrasi: Transisi Package Manager dari npm ke pnpm

Dokumen ini berisi rangkuman perubahan (*changelog*), instruksi penyesuaian bagi tim pengembang, serta panduan alur kerja harian (*daily workflow*) terkait transisi package manager dari **npm** ke **pnpm** pada proyek **LawGates**.

---

## 1. Latar Belakang & Tujuan Migrasi

Proyek LawGates dialihkan menggunakan **pnpm** dengan alasan:
- **Penghematan Kapasitas Disk:** Menggunakan arsitektur *content-addressable storage* sehingga paket fisik disimpan secara global dan dihubungkan via *hardlink/symlink*, tidak lagi menduplikasi ratusan megabyte di setiap proyek.
- **Kecepatan Instalasi:** Eksekusi instalasi dan resolusi dependensi jauh lebih cepat dibandingkan npm.
- **Konsistensi Dependensi:** Mencegah isu inkonsistensi versi antar anggota tim dengan lockfile terpusat (`pnpm-lock.yaml`).

---

## 2. Rangkuman Perubahan (*What Was Changed*)

| File | Status | Keterangan Perubahan |
| :--- | :--- | :--- |
| `pnpm-lock.yaml` | **Ditambahkan** | Dibuat melalui `pnpm import` dari `package-lock.json` sebelumnya, menjamin seluruh versi dependensi 100% identik. |
| `package-lock.json` | **Dihapus** | Dihapus agar tidak terjadi dual-lockfile / konflik package manager. |
| `package.json` | **Diperbarui** | • Ditambahkan deklarasi `"packageManager": "pnpm@12.11.2"`<br>• Ditambahkan `"axios": "^1.7.9"` ke `devDependencies` (karena digunakan di `app.tsx` & `kategoriService.ts`). |
| `.npmrc` | **Diperbarui** | Ditambahkan konfigurasi `shamefully-hoist=true` untuk memastikan kompatibilitas penuh arsitektur modul dengan Vite, Tailwind v4, dan dependensi transitif. |
| `README.md` | **Diperbarui** | Semua referensi instalasi, requirements, dan perintah eksekusi disesuaikan dari `npm` menjadi `pnpm`. |

---

## 3. Langkah Transisi untuk Rekan Tim (*Onboarding / Sync Guide*)

Bagi setiap anggota tim yang melakukan `git pull` perubahan ini, ikuti langkah setup berikut di komputer masing-masing:

### Langkah 1: Pastikan `pnpm` Sudah Terpasang
Buka terminal dan periksa ketersediaan pnpm:
```bash
pnpm -v
```
Jika belum terpasang, pasang `pnpm` secara global melalui salah satu cara berikut:
- **Via npm:**
  ```bash
  npm install -g pnpm
  ```
- **Via Corepack (Bawaan Node.js):**
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

### Langkah 2: Bersihkan `node_modules` Lama (Hanya Sekali)
Sebelum menginstal dengan pnpm, pastikan folder `node_modules` hasil instalasi npm sebelumnya dihapus bersih:

- **Windows Command Prompt (CMD):**
  ```cmd
  rmdir /s /q node_modules
  ```
  *(Catatan: Jika muncul pesan `Access is denied`, pastikan matikan proses `npm run dev` atau jalankan `taskkill /F /IM node.exe` terlebih dahulu).*

- **Windows PowerShell:**
  ```powershell
  Remove-Item -Recurse -Force node_modules
  ```

- **macOS / Linux / Git Bash:**
  ```bash
  rm -rf node_modules
  ```

### Langkah 3: Instal Dependensi Menggunakan `pnpm`
Di root direktori proyek:
```bash
pnpm install
```

---

## 4. Panduan Perintah Harian (*Daily Workflow*)

Gunakan perintah `pnpm` berikut untuk aktivitas pengembangan sehari-hari:

### A. Menjalankan Server & Build
| Kebutuhan | Perintah | Padanan Lama (npm) |
| :--- | :--- | :--- |
| **Development Server** | `pnpm dev` *(atau `pnpm run dev`)* | `npm run dev` |
| **Production Build** | `pnpm build` | `npm run build` |
| **Type Checking** | `pnpm types` | `npm run types` |
| **Linting** | `pnpm lint` | `npm run lint` |

### B. Manajemen Paket (Install, Add, Remove)
| Kebutuhan | Perintah pnpm | Contoh |
| :--- | :--- | :--- |
| **Install Seluruh Dependensi** | `pnpm install` (atau `pnpm i`) | `pnpm install` |
| **Tambah Package Biasa** (*dependencies*) | `pnpm add <nama-package>` | `pnpm add date-fns` |
| **Tambah Package Dev** (*devDependencies*) | `pnpm add -D <nama-package>` | `pnpm add -D @types/leaflet` |
| **Tambah Versi Spesifik** | `pnpm add <nama-package>@<versi>` | `pnpm add react-select@^5.10.0` |
| **Hapus / Uninstall Package** | `pnpm remove <nama-package>` (atau `pnpm rm`) | `pnpm remove axios` |
| **Update Dependensi** | `pnpm update` *(atau interaktif: `pnpm update -i --latest`)* | `pnpm update` |
| **Menjalankan CLI Sekali Pakai** (*padanan `npx`*) | `pnpm dlx <nama-cli>` | `pnpm dlx shadcn@latest add button` |

---

## 5. Troubleshooting & Catatan Penting

1. **JANGAN gunakan `npm install` lagi:**
   Menjalankan `npm install` akan membuat kembali `package-lock.json` yang dapat menimbulkan konflik versi di Git.
2. **Import Package Baru:**
   Pastikan setiap kali Anda menggunakan library baru dalam kode JavaScript/TypeScript, jalankan `pnpm add <pkg>` atau `pnpm add -D <pkg>` agar selalu tercatat di `package.json`.
3. **Pengaturan `.npmrc`:**
   Proyek ini menggunakan konfigurasi `shamefully-hoist=true` pada `.npmrc` agar seluruh dependensi sekunder tetap dapat diakses dengan mulus tanpa konflik symlink strict.
