# Toko Sembako Ariesta

**Nama:** Anneira Nur Khairani
**NIM:** 20240140178

## Deskripsi
Website toko sembako yang menampilkan daftar produk beserta harga dan stok, dibuat menggunakan Node.js dan Express.js dengan EJS sebagai view engine.

## Cara Menjalankan
```bash
npm install
npm run dev
```
Buka browser ke `http://localhost:3000`

## Daftar Endpoint API

| Method | Endpoint | Deskripsi | Akses |
|--------|----------|-----------|-------|
| GET | /api/products | Ambil semua data produk | Publik |

## Daftar Halaman

| Route | Deskripsi |
|-------|-----------|
| GET / | Halaman Beranda |
| GET /produk | Daftar produk, bisa difilter lewat ?kategori= atau ?search= |
| GET /produk/:id | Detail produk berdasarkan ID |
| GET /tanya-ai | Halaman Tanya AI |

## Tampilan
Menggunakan Tailwind CSS dengan tema warna cream dan coklat. Layout responsif dengan menu hamburger di tampilan mobile yang berfungsi menggunakan JavaScript.
