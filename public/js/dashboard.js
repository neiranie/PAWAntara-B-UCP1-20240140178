const form = document.getElementById('product-form');
const formTitle = document.getElementById('form-title');
const formError = document.getElementById('form-error');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const tableBody = document.getElementById('product-table-body');

let editMode = false;

// Ambil dan tampilkan semua produk
async function loadProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();

  tableBody.innerHTML = '';

  data.data.forEach(p => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-brand-dark/10';
    tr.innerHTML = `
      <td class="py-2 pr-4">${p.name}</td>
      <td class="py-2 pr-4">${p.category}</td>
      <td class="py-2 pr-4">Rp ${p.price.toLocaleString('id-ID')}</td>
      <td class="py-2 pr-4">${p.stock}</td>
      <td class="py-2 pr-4 flex gap-2">
        <button data-id="${p.id}" class="edit-btn text-brand hover:text-brand-dark font-medium">Edit</button>
        <button data-id="${p.id}" class="delete-btn text-red-600 hover:text-red-800 font-medium">Hapus</button>
      </td>
    `;
    
    tableBody.appendChild(tr);
  });

  attachRowEvents(data.data);
}

// Pasang event listener untuk tombol edit & hapus di tiap baris
function attachRowEvents(products) {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const produk = products.find(p => p.id === parseInt(btn.dataset.id));
      startEdit(produk);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
  });
}

// Masuk mode edit
function startEdit(produk) {
  editMode = true;
  document.getElementById('product-id').value = produk.id;
  document.getElementById('name').value = produk.name;
  document.getElementById('category').value = produk.category;
  document.getElementById('price').value = produk.price;
  document.getElementById('stock').value = produk.stock;

  formTitle.textContent = 'Edit Produk';
  submitBtn.textContent = 'Update';
  cancelEditBtn.classList.remove('hidden');
}

// Batal edit, kembali ke mode tambah
function resetForm() {
  editMode = false;
  form.reset();
  document.getElementById('product-id').value = '';
  formTitle.textContent = 'Tambah Produk Baru';
  submitBtn.textContent = 'Simpan';
  cancelEditBtn.classList.add('hidden');
  formError.classList.add('hidden');
}

cancelEditBtn.addEventListener('click', resetForm);

// Submit form (tambah / update)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value.trim();
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;

  if (!name || !category || !price || !stock) {
    formError.textContent = 'Semua field wajib diisi';
    formError.classList.remove('hidden');
    return;
  }

  const payload = { name, category, price, stock };
  const id = document.getElementById('product-id').value;

  try {
    const res = await fetch(editMode ? `/api/products/${id}` : '/api/products', {
      method: editMode ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.status === 'success') {
      resetForm();
      loadProducts();
    } else {
      formError.textContent = data.message;
      formError.classList.remove('hidden');
    }
  } catch (err) {
    formError.textContent = 'Terjadi kesalahan, coba lagi';
    formError.classList.remove('hidden');
  }
});

// Hapus produk
async function deleteProduct(id) {
  if (!confirm('Yakin ingin menghapus produk ini?')) return;

  const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
  const data = await res.json();

  if (data.status === 'success') {
    loadProducts();
  } else {
    alert(data.message);
  }
}

// Load pertama kali halaman dibuka
loadProducts();