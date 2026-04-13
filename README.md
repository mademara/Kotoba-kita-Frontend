# Kotoba Kita — Frontend

React + Vite, dijalankan langsung tanpa Docker.

---

## Tentang Proyek

**Kotoba Kita** adalah aplikasi web flashcard adaptif untuk belajar kosakata bahasa Jepang, ditujukan bagi pemula berbahasa Indonesia. Aplikasi ini menggunakan algoritma **FSRS (Free Spaced Repetition Scheduler)** untuk menentukan kapan setiap kartu harus muncul kembali berdasarkan riwayat belajar masing-masing pengguna — kartu yang sering salah muncul lebih cepat, kartu yang sudah dikuasai muncul lebih jarang.

Proyek ini hadir sebagai solusi lokal atas rendahnya penyerapan tenaga kerja Indonesia ke Jepang akibat kegagalan sertifikasi bahasa — dengan antarmuka penuh Bahasa Indonesia agar tidak ada hambatan bahasa pengantar asing.

> **Capstone Project — Dicoding Bootcamp Batch 11** | Tim ID: DB11-G002 | Tema: *Accessible & Adaptive Learning*

### Tim

| Nama |
|---|
| Irgi Afandi Amienullah |
| Adlian Nur Bhakti |
| Made Gusmara Sugiarta |

### Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React + Vite, JavaScript (ES6+) |
| HTTP Client | Axios |
| Linting & Formatting | ESLint, Prettier |
| Hosting | Vercel |

### Fitur MVP

- Autentikasi (register, login, logout)
- Sesi belajar: format multiple choice, Kanji/Kosakata → tebak arti Bahasa Indonesia
- Dashboard: kartu due hari ini, streak belajar, tombol mulai review
- Ringkasan setelah sesi: akurasi, kata paling sering salah
- Browse kata N5: lihat kanji, furigana, arti, dan contoh kalimat
- Custom Deck: kurasi kata fokus dari database N5 yang sudah ada
- Profil & Statistik: retention rate, streak harian, total kata dipelajari
- Antarmuka penuh Bahasa Indonesia, responsif di mobile dan desktop

---

## Prasyarat

- [Node.js](https://nodejs.org/) versi 22 atau lebih baru
- [Git](https://git-scm.com/)

---

## Setup Awal

```bash
git clone https://github.com/mademara/Kotoba-kita-Frontend.git
cd Kotoba-kita-Frontend
npm install
```

---

## Menjalankan Dev Server

> Pastikan backend sudah berjalan dulu sebelum membuka frontend.

```bash
npm run dev
```

Frontend berjalan di: **http://localhost:5173**

---

## Format & Linting

Format on save sudah dikonfigurasi di `.vscode/settings.json` — tidak perlu setup tambahan.

- `Ctrl+S` → file `.js`/`.jsx` otomatis diformat oleh Prettier + ESLint fix

Format manual:

```bash
npm run format
npm run lint
```

**Aturan kode:**
- Indentasi: 2 spasi
- Line ending: LF
- Unused import: tidak dianggap error

---

## Menambah Dependency

```bash
npm install nama-package
```

Setelah install, commit `package.json` dan `package-lock.json`. Anggota tim lain cukup jalankan `npm install` setelah pull.

---

## Struktur Proyek

```
Kotoba-kita-Frontend/
  src/
    components/     ← reusable UI components
    pages/          ← halaman utama
    hooks/          ← custom React hooks
    services/       ← axios API calls
  public/
  eslint.config.js
  .prettierrc.js
```

---

## Git Workflow

```bash
# Sebelum mulai — selalu pull dulu
git pull origin main

# Buat branch baru untuk setiap fitur
git checkout -b nama-fitur

# Setelah selesai
git add .
git commit -m "deskripsi perubahan"
git push origin nama-fitur
```

> Jangan push langsung ke `main`. Selalu buat pull request.

---

## Troubleshooting

**Module not found setelah pull**
```bash
npm install
```

**API tidak bisa diakses**

Pastikan backend sudah jalan di `http://localhost:8000` sebelum membuka frontend.

---

## Atribusi Data Kosakata

Data kosakata Jepang pada proyek ini menggunakan **JMdict/EDICT**, yang dikembangkan oleh Electronic Dictionary Research and Development Group (EDRDG) dan dilisensikan di bawah [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

- JMdict project page: [https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)
- JMdict-simplified (sumber JSON yang digunakan): [https://github.com/scriptin/jmdict-simplified](https://github.com/scriptin/jmdict-simplified)
