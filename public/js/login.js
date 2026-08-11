document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      errorEl.textContent = 'Username dan password wajib diisi';
      errorEl.classList.remove('hidden');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.status === 'success') {
        window.location.href = '/dashboard';
      } else {
        errorEl.textContent = data.message;
        errorEl.classList.remove('hidden');
      }
    } catch (err) {
      errorEl.textContent = 'Terjadi kesalahan, coba lagi';
      errorEl.classList.remove('hidden');
    }
  });
});