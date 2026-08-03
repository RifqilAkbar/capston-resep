# Buku Resep Nusantara

Aplikasi ini dibuat dengan `React`, `Vite`, `Express`, dan `MySQL/MariaDB`.

README ini ditulis untuk pemula Windows yang ingin menjalankan proyek ini memakai `Laragon Full` dan terminal `VS Code`.

## Yang Perlu Disiapkan

- `Laragon Full` (sudah includes Node.js + npm + MySQL)
- browser seperti Chrome atau Edge

Cek setelah instalasi Laragon:

```bash
node -v
npm -v
mysql --version
```

Kalau tiga perintah itu menampilkan versi, berarti siap.

> **Catatan**: Terminal VS Code mungkin tidak langsung bisa `mysql`. Kalau `mysql` tidak dikenal, import database via **Terminal Laragon** atau phpMyAdmin, lalu sisanya pakai terminal VS Code.

## Langkah Dari Awal

### 1. Buka Laragon & Start All

1. Klik `Start Menu` Windows.
2. Cari `Laragon`.
3. Buka aplikasi `Laragon`.
4. Klik `Start All`.
5. Pastikan `MySQL` menyala (lampu hijau).

### 2. Buka Proyek di VS Code

1. Buka `Visual Studio Code`.
2. Klik `File` > `Open Folder...`
3. Pilih folder:

```text
C:\Users\rifqi\Downloads\skripsi-masak-v2
```

4. Klik `Select Folder`.
5. Buka terminal VS Code: `Terminal` > `New Terminal` (atau `` Ctrl + ` ``).

### 3. Import Database

Lewat `phpMyAdmin` (buka Laragon > Start All > Menu > MySQL > phpMyAdmin):

1. `Menu` > `MySQL` > `phpMyAdmin`
2. Login (user: `root`, password kosong).
3. Klik `Import`.
4. Pilih file `database/laragon.sql`.
5. Klik `Go`.

### 4. Buat File `.env`

Di terminal VS Code:

```bash
Copy-Item .env.example .env
```

Isi `.env` untuk Laragon default:

```env
PORT=3001
JWT_SECRET=ganti_dengan_secret_yang_panjang
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=skripsi_masak
VITE_API_URL=/api
```

Kalau password MySQL Anda tidak kosong, sesuaikan `DB_PASSWORD`.

### 5. Install Dependensi

Di terminal VS Code (pasti sudah di folder proyek):

```bash
npm install
```

## Cara Menjalankan Aplikasi

Anda perlu 2 terminal di VS Code.

### Terminal 1: Backend

```bash
npm run dev:api
```

Backend berjalan di `http://localhost:3001`.

### Terminal 2: Frontend

Buka terminal baru di VS Code (`Ctrl + Shift + ` `), lalu:

```bash
npm run dev
```

Frontend berjalan di `http://localhost:5173`. Buka alamat itu di browser.

## Akun Login Awal

```text
Email: admin@example.com
Password: admin123
```

## Cek Backend

Buka `http://localhost:3001/api/health` di browser. Harus muncul JSON.

## Masalah Yang Sering Terjadi

### 1. `node` atau `npm` tidak dikenal

Install `Node.js` versi LTS dari https://nodejs.org, lalu restart VS Code.

### 2. Error koneksi database

Pastikan Laragon sudah `Start All` dan MySQL aktif (lampu hijau).

### 3. Port bentrok

Kalau `3001` atau `5173` dipakai, hentikan aplikasi lain atau ubah port di `.env`.

### 4. Data tidak muncul

Import database `database/laragon.sql` dulu sebelum menjalankan aplikasi.

## Build untuk Produksi

```bash
npm run build
```

## Catatan Penting

- Semua perintah `npm`/`node` dijalankan dari **terminal VS Code**.
- Laragon hanya untuk MySQL, bukan untuk menjalankan Node.js.
- Install `Node.js` LTS terpisah jika belum ada.
- Kalau Anda baru mulai, ikuti langkah di atas secara urut dan jangan loncat.

