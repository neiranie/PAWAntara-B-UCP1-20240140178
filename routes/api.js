const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const products = require('../data/product');
const adminUser = require('../data/admin');
const { authMiddleware } = require('../middleware/auth');

// GET semua produk (publik), mendukung filter ?kategori= dan ?search=
router.get('/products', (req, res) => {
  let filtered = products;
  const { kategori, search } = req.query;

  if (kategori) {
    filtered = filtered.filter(p => p.category.toLowerCase() === kategori.toLowerCase());
  }
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  res.json({ status: 'success', data: filtered });
});

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Username dan password wajib diisi' });
  }

  if (username !== adminUser.username || !bcrypt.compareSync(password, adminUser.password)) {
    return res.status(401).json({ status: 'error', message: 'Username atau password salah' });
  }

  req.session.isLoggedIn = true;
  req.session.username = username;

  res.json({ status: 'success', message: 'Login berhasil' });
});

// LOGOUT
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ status: 'success', message: 'Logout berhasil' });
  });
});

// GET satu produk berdasarkan ID (publik)
router.get('/products/:id', (req, res) => {
  const produk = products.find(p => p.id === parseInt(req.params.id));
  if (!produk) {
    return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
  }
  res.json({ status: 'success', data: produk });
});

// TAMBAH produk baru (wajib login)
router.post('/products', authMiddleware, (req, res) => {
  const { name, category, price, stock } = req.body;

  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ status: 'error', message: 'Semua field wajib diisi' });
  }

  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { id: newId, name, category, price: Number(price), stock: Number(stock) };
  products.push(newProduct);

  res.status(201).json({ status: 'success', message: 'Produk ditambahkan', data: newProduct });
});

// UPDATE produk (wajib login)
router.put('/products/:id', authMiddleware, (req, res) => {
  const produk = products.find(p => p.id === parseInt(req.params.id));
  if (!produk) {
    return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
  }

  const { name, category, price, stock } = req.body;
  if (name !== undefined) produk.name = name;
  if (category !== undefined) produk.category = category;
  if (price !== undefined) produk.price = Number(price);
  if (stock !== undefined) produk.stock = Number(stock);

  res.json({ status: 'success', message: 'Produk diperbarui', data: produk });
});

// HAPUS produk (wajib login)
router.delete('/products/:id', authMiddleware, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
  }

  products.splice(index, 1);
  res.json({ status: 'success', message: 'Produk dihapus' });
});

module.exports = router;