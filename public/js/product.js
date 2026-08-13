const container = document.getElementById('produk-container');
const filterForm = document.getElementById('filter-form');
const searchInput = document.getElementById('search');
const kategoriSelect = document.getElementById('kategori');

let debounceTimer;

function renderProducts(list) {
  if (list.length === 0) {
    container.innerHTML = '<p class="text-brand-dark/60 text-center py-10 col-span-full">Produk tidak ditemukan.</p>';
    return;
  }

  container.innerHTML = list.map(p => `
    <article class="glass-card rounded-2xl p-6 hover:shadow-xl transition min-w-0">
      <h3 class="font-heading font-semibold text-lg text-brand-dark mb-2">
        <a href="/produk/${p.id}" class="hover:text-brand-gold">${p.name}</a>
      </h3>
      <p class="text-sm text-brand-dark/60 mb-1">Kategori: ${p.category}</p>
      <p class="text-brand-gold font-semibold mb-1">Rp ${p.price.toLocaleString('id-ID')}</p>
      <p class="text-sm text-brand-dark/60">Stok: ${p.stock}</p>
    </article>
  `).join('');
}

async function loadProducts() {
  const search = searchInput.value.trim();
  const kategori = kategoriSelect.value;

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (kategori) params.append('kategori', kategori);

  const url = params.toString() ? `/api/products?${params.toString()}` : '/api/products';
  const res = await fetch(url);
  const data = await res.json();

  renderProducts(data.data);
}

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loadProducts();
});

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(loadProducts, 300);
});

kategoriSelect.addEventListener('change', () => {
  loadProducts();
});

loadProducts();