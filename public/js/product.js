const container = document.getElementById('produk-container');
const filterForm = document.getElementById('filter-form');

async function loadProducts(search = '') {
  container.innerHTML = '<p class="text-gray-500">Memuat produk...</p>';

  const url = search ? `/api/products?search=${encodeURIComponent(search)}` : '/api/products';
  const res = await fetch(url);
  const data = await res.json();

  container.innerHTML = '';

  if (data.data.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-10 col-span-full">Produk tidak ditemukan.</p>';
    return;
  }

  data.data.forEach(p => {
    const article = document.createElement('article');
    article.className = 'bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition';
    article.innerHTML = `
      <h3 class="font-heading font-semibold text-lg text-brand-dark mb-2">
        <a href="/produk/${p.id}" class="hover:text-brand-gold">${p.name}</a>
      </h3>
      <p class="text-sm text-gray-500 mb-1">Kategori: ${p.category}</p>
      <p class="text-brand-gold font-semibold mb-1">Rp ${p.price.toLocaleString('id-ID')}</p>
      <p class="text-sm text-gray-500">Stok: ${p.stock}</p>
    `;
    container.appendChild(article);
  });
}

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = document.getElementById('search').value.trim();
  loadProducts(search);
});

const initialSearch = document.getElementById('search').value;
loadProducts(initialSearch);