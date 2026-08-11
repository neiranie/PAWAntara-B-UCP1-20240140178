const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const products = require('../data/product');
const adminUser = require('../data/admin');

// GET semua produk (publik)
router.get('/products', (req, res) => {
  res.json({ status: 'success', data: products });
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

module.exports = router;