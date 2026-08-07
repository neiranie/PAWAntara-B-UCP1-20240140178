const express = require('express');
const router = express.Router();
const products = require('../data/product');

router.get('/', (req, res) => {
  const preview = products.slice(0, 3);
  res.render('beranda', { preview });
});

router.get('/produk', (req, res) => {
  let filtered = products;
  const { kategori, search } = req.query;

  if (kategori) {
    filtered = filtered.filter(p => p.category.toLowerCase() === kategori.toLowerCase());
  }
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  res.render('produk', { produkList: filtered, kategori, search });
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

module.exports = router;