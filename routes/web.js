const express = require('express');
const router = express.Router();
const products = require('../data/product');
const { authPageMiddleware } = require('../middleware/auth');

router.get('/', (req, res) => {
  const preview = products.slice(0, 3);
  res.render('beranda', { preview });
});

router.get('/produk', (req, res) => {
  const { kategori, search } = req.query;
  res.render('product', { kategori: kategori || '', search: search || '' });
});

router.get('/produk/:id', (req, res) => {
  const produk = products.find(p => p.id === parseInt(req.params.id));
  if (!produk) {
    return res.status(404).render('not-found');
  }
  res.render('detail-produk', { produk });
});

router.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai');
});

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.get('/dashboard', authPageMiddleware, (req, res) => {
  res.render('dashboard');
});

module.exports = router;