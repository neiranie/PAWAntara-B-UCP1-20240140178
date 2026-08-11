const chatResponses = [
  {
    keywords: ['jam buka', 'buka jam', 'jam operasional', 'buka sampai', 'tutup jam'],
    reply: 'Toko kami buka setiap hari jam 07.00 - 20.00 WIB.',
  },
  {
    keywords: ['ongkir', 'antar', 'kirim', 'delivery', 'diantar'],
    reply: 'Kami menyediakan layanan antar untuk wilayah sekitar toko. Ongkir tergantung jarak, silakan hubungi kasir kami untuk info lebih lanjut.',
  },
  {
    keywords: ['bayar', 'pembayaran', 'transfer', 'cash', 'qris'],
    reply: 'Kami menerima pembayaran tunai, transfer bank, dan QRIS.',
  },
  {
    keywords: ['stok', 'ada ga', 'ada gak', 'tersedia', 'ready'],
    reply: 'Untuk cek ketersediaan stok terbaru, silakan lihat halaman Produk kami atau hubungi kasir langsung.',
  },
  {
    keywords: ['halo', 'hai', 'hi', 'selamat'],
    reply: 'Halo! Selamat datang di Toko Sembako Ariesta. Ada yang bisa kami bantu?',
  },
  {
    keywords: ['terima kasih', 'makasih', 'thanks'],
    reply: 'Sama-sama! Senang bisa membantu. Jangan ragu bertanya lagi ya.',
  },
];

const defaultReplies = [
  'Maaf, saya belum mengerti pertanyaan Anda. Coba tanyakan tentang jam buka, ongkir, cara pembayaran, atau ketersediaan stok.',
  'Pertanyaan Anda belum bisa saya jawab. Silakan hubungi kasir kami langsung untuk info lebih lanjut.',
];

function getChatReply(message) {
  const lowerMessage = message.toLowerCase();

  for (const item of chatResponses) {
    const matched = item.keywords.some(keyword => lowerMessage.includes(keyword));
    if (matched) {
      return item.reply;
    }
  }

  const randomIndex = Math.floor(Math.random() * defaultReplies.length);
  return defaultReplies[randomIndex];
}

module.exports = { getChatReply };