document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('nav-menu');

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
});