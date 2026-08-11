# Toko Sembako Ariesta

**Nama:** Anneira Nur Khairani
**NIM:** 20240140178

## Deskripsi
Website toko sembako yang menampilkan daftar produk beserta harga dan stok secara dinamis, dilengkapi dashboard admin untuk mengelola produk dan fitur Tanya AI dengan balasan otomatis. Dibuat menggunakan Node.js dan Express.js dengan EJS sebagai view engine.

## Cara Menjalankan
```bash
npm install
npm run dev
```
Buka browser ke `http://localhost:3000`

## Kredensial Admin
- **Username:** admin
- **Password:** admin123

Login di halaman: `http://localhost:3000/login`

## Daftar Endpoint API

| Method | Endpoint | Deskripsi | Akses |
|--------|----------|-----------|-------|
| GET | /api/products | Ambil semua data produk, mendukung filter `?kategori=` dan `?search=` | Publik |
| GET | /api/products/:id | Ambil satu produk berdasarkan ID | Publik |
| POST | /api/products | Tambah produk baru | Login |
| PUT | /api/products/:id | Update produk (harga/stok) berdasarkan ID | Login |
| DELETE | /api/products/:id | Hapus produk berdasarkan ID | Login |
| POST | /api/login | Login admin dengan username & password | Publik |
| POST | /api/logout | Logout, menghapus sesi login | Login |
| POST | /api/chat | Kirim pertanyaan, terima balasan AI dummy | Publik |

## Daftar Halaman

| Route | Deskripsi | Akses |
|-------|-----------|-------|
| GET / | Halaman Beranda | Publik |
| GET /produk | Daftar produk (ambil data lewat Fetch API), bisa difilter lewat pencarian | Publik |
| GET /produk/:id | Detail produk berdasarkan ID | Publik |
| GET /tanya-ai | Halaman chat Tanya AI | Publik |
| GET /login | Halaman login admin | Publik |
| GET /dashboard | Dashboard admin untuk kelola produk (tambah/edit/hapus) | Login |

## Tampilan
Menggunakan Tailwind CSS dengan tema warna cream dan coklat, font Poppins dan Inter dari Google Fonts. Layout responsif dengan menu hamburger di tampilan mobile. Semua interaksi CRUD produk, login, dan chat menggunakan Fetch API tanpa reload halaman.

## Fitur Tanya AI
Balasan chat menggunakan logika keyword matching sederhana di backend (bukan API AI eksternal), merespons pertanyaan seputar jam buka, ongkos kirim, cara pembayaran, dan ketersediaan stok.