const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const chatError = document.getElementById('chat-error');
const textarea = document.getElementById('pertanyaan');

function addBubble(text, sender) {
  const bubble = document.createElement('div');

  if (sender === 'user') {
    bubble.className = 'self-end bg-brand text-white rounded-lg px-4 py-2 max-w-[80%]';
  } else {
    bubble.className = 'self-start glass-pill rounded-lg px-4 py-2 max-w-[80%]';
  }

  bubble.textContent = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = textarea.value.trim();

  if (!message) {
    chatError.textContent = 'Pertanyaan tidak boleh kosong';
    chatError.classList.remove('hidden');
    return;
  }

  chatError.classList.add('hidden');
  addBubble(message, 'user');
  textarea.value = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    if (data.status === 'success') {
      addBubble(data.data.reply, 'ai');
    } else {
      addBubble('Maaf, terjadi kesalahan. Coba lagi.', 'ai');
    }
  } catch (err) {
    addBubble('Maaf, tidak bisa terhubung ke server.', 'ai');
  }
});