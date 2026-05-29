<div align="center">

# 言葉・きた
# Kotoba Kita — Frontend

**Aplikasi web flashcard adaptif untuk belajar kosakata bahasa Jepang,
dirancang khusus untuk pelajar berbahasa Indonesia.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://kotoba-kita.vercel.app)
[![License](https://img.shields.io/badge/Data-CC%20BY--SA%204.0-lightgrey?style=flat-square)](https://creativecommons.org/licenses/by-sa/4.0/)

[🌐 Buka Aplikasi](https://kotoba-kita.vercel.app) · [📦 Backend Repo](https://github.com/mademara/Kotoba-kita-Backend) · [📖 API Docs](https://mademara-kotoba-kita-backend.hf.space/api/docs/)

</div>

---

## Tentang Proyek

**Kotoba Kita** hadir sebagai jawaban atas tantangan nyata: ratusan ribu pelajar bahasa Jepang di Indonesia kesulitan menemukan alat belajar kosakata yang benar-benar berbahasa Indonesia dan cerdas secara adaptif.

Aplikasi ini menggunakan algoritma **FSRS (Free Spaced Repetition Scheduler)** — sistem yang mempelajari pola belajarmu dan secara otomatis menjadwalkan ulang setiap kartu berdasarkan seberapa baik kamu mengingatnya. Kartu yang sulit muncul lebih sering. Kartu yang sudah dikuasai muncul lebih jarang. Tidak ada hafalan yang terbuang sia-sia.

> Capstone Project — Dicoding Bootcamp Batch 11 | ID Tim: DB11-G002
> Tema: *Accessible & Adaptive Learning*

---

## Fitur Utama

| Fitur | Keterangan |
|---|---|
| 🔐 **Autentikasi** | Register dan login berbasis email, sesi dikelola dengan JWT |
| 🃏 **Sesi Belajar Adaptif** | Kuis pilihan ganda — tebak arti kanji dari 4 pilihan; sistem FSRS menentukan kartu berikutnya |
| 📊 **Dashboard Statistik** | Daya ingat, ketahanan ingatan, progres kosakata N5, dan jadwal sesi berikutnya |
| 📁 **Custom Deck** | Buat deck fokus dari kosakata N5 yang tersedia; kelola sesukamu |
| 📖 **Kamus N5** | Browse seluruh kosakata N5 — kanji, furigana, romaji, arti, dan contoh kalimat |
| 📱 **Responsif** | Nyaman digunakan di mobile maupun desktop |
| 🇮🇩 **Antarmuka Bahasa Indonesia** | Seluruh UI, pesan error, dan notifikasi dalam Bahasa Indonesia |

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| HTTP Client | Axios |
| State Management | React Context API |
| Linting & Formatting | ESLint + Prettier |
| Hosting | Vercel |

---

## Cara Menggunakan Aplikasi

### 1. Daftar & Masuk

Buka [kotoba-kita.vercel.app](https://kotoba-kita.vercel.app), klik **Daftar** untuk membuat akun baru dengan username, email, dan password. Setelah berhasil, kamu akan diarahkan ke halaman login — masukkan email dan password untuk masuk.

### 2. Dashboard

Setelah login, kamu langsung melihat dashboard berisi:
- **Daya Ingat** — persentase kartu yang berhasil kamu jawab benar dari semua yang pernah diulas
- **Ketahanan Ingatan** — rata-rata berapa hari kata yang kamu hafal bisa bertahan sebelum perlu diulas kembali
- **Progres N5** — persentase kosakata N5 yang sudah pernah kamu pelajari
- **Jadwal Sesi Berikutnya** — daftar kata yang akan jatuh tempo dalam beberapa hari ke depan

### 3. Mulai Belajar

Klik **Mulai Belajar** atau navigasi ke menu **Belajar**. Pilih deck yang ingin dipelajari. Setiap sesi menampilkan:
- Kanji beserta cara bacanya (furigana & romaji)
- 4 pilihan jawaban berupa arti dalam Bahasa Indonesia
- Sistem FSRS di backend mencatat waktu responsmu dan menentukan kapan kartu ini muncul lagi

Setelah sesi selesai, kamu mendapat **ringkasan akurasi** sesi tersebut.

### 4. Kelola Deck

Masuk ke menu **Deck** untuk melihat semua deckmu. Tersedia satu **Deck Default** berisi seluruh kosakata N5. Kamu bisa:
- Membuat deck baru dengan memilih kata-kata tertentu dari database N5
- Mengedit atau menghapus deck yang sudah dibuat
- Minimal 10 kata per deck untuk bisa memulai sesi belajar

### 5. Kamus

Menu **Kamus** menampilkan seluruh kosakata N5 yang tersedia — cocok untuk belajar mandiri tanpa tekanan kuis.

---

## Menjalankan Secara Lokal (Untuk Developer)

### Prasyarat

- [Node.js](https://nodejs.org/) v22 atau lebih baru
- [Git](https://git-scm.com/)
- Backend sudah berjalan (lihat [README Backend](https://github.com/mademara/Kotoba-kita-Backend))

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/mademara/Kotoba-kita-Frontend.git
cd Kotoba-kita-Frontend

# 2. Install dependencies
npm install

# 3. Buat file environment
cp .env.example .env
```

Edit `.env` dan sesuaikan URL backend:

```env
VITE_API_URL=http://localhost:8000
```

```bash
# 4. Jalankan dev server
npm run dev
```

Frontend berjalan di **http://localhost:5173** — pastikan backend sudah aktif terlebih dahulu.

---

## Deploy ke Vercel

Cara termudah untuk men-deploy fork proyek ini:

1. Fork repository ini ke akun GitHub-mu
2. Buka [vercel.com](https://vercel.com) dan klik **Add New Project**
3. Import repository hasil fork-mu
4. Tambahkan environment variable:
   ```
   VITE_API_URL=https://url-backend-kamu.hf.space
   ```
5. Klik **Deploy** — Vercel otomatis mendeteksi Vite dan mengonfigurasi build

Setiap push ke branch `main` akan memicu deployment otomatis.

---

## Struktur Proyek

```
src/
├── assets/           — gambar dan aset statis
├── components/       — komponen UI yang dapat digunakan ulang
│   ├── ProtectedRoute.jsx       — redirect ke login jika belum autentikasi
│   ├── ProtectedNonDeck.jsx     — proteksi halaman detail deck
│   ├── Sidebar.jsx              — navigasi utama
│   └── ...
├── contexts/
│   └── AuthContext.jsx          — state autentikasi global (login, logout, register)
├── hooks/            — custom hooks untuk fetching data
│   ├── getStats.jsx             — data statistik dashboard
│   ├── getStudy.jsx             — data sesi belajar
│   ├── getWords.jsx             — data kosakata
│   └── ...
├── layout/
│   └── DashboardLayout.jsx      — layout wrapper dengan sidebar
├── pages/            — halaman utama aplikasi
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── HomePage.jsx             — dashboard statistik
│   ├── StudyDeckChoicePage.jsx  — pemilihan deck sebelum belajar
│   ├── StudyPage.jsx            — sesi belajar aktif
│   ├── StudyResultPage.jsx      — ringkasan setelah sesi
│   ├── DeckListPage.jsx
│   ├── DeckDetailPage.jsx
│   ├── DeckCreatePage.jsx
│   ├── DeckEditPage.jsx
│   ├── DictionaryPage.jsx
│   └── NotFoundPage.jsx
└── services/         — konfigurasi Axios dan API calls
```

---

## Git Workflow

```bash
# Selalu pull sebelum mulai
git pull origin main

# Buat branch baru untuk setiap fitur
git checkout -b nama-fitur

# Setelah selesai
git add .
git commit -m "deskripsi perubahan"
git push origin nama-fitur

# Buat Pull Request ke main — jangan push langsung ke main
```

---

## Format & Linting

Format on save sudah dikonfigurasi di `.vscode/settings.json`.

```bash
npm run format   # format semua file src dengan Prettier
npm run lint     # lint dan auto-fix dengan ESLint
```

Aturan kode: indentasi 2 spasi, line ending LF, unused import tidak dianggap error.

---

## Troubleshooting

**`Module not found` setelah pull**
```bash
npm install
```

**API tidak bisa diakses / CORS error**

Pastikan backend sudah berjalan di `http://localhost:8000` dan nilai `VITE_API_URL` di `.env` sudah benar.

**Halaman putih setelah login**

Coba bersihkan localStorage browser dan login ulang.

---

## Atribusi Data Kosakata

Data kosakata Jepang pada proyek ini menggunakan **JMdict/EDICT**, yang dikembangkan oleh Electronic Dictionary Research and Development Group (EDRDG) dan dilisensikan di bawah [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

- JMdict project page: https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project
- JMdict-simplified (sumber JSON yang digunakan): https://github.com/scriptin/jmdict-simplified

---

<div align="center">
  Dibuat dengan ☕ dan kesabaran ekstra oleh <strong>Made Gusmara Sugiarta</strong><br>
  Dicoding Bootcamp Batch 11 · DB11-G002
</div>
