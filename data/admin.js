const bcrypt = require('bcryptjs');

// Password asli: admin123 (di-hash pakai bcrypt)
const adminUser = {
  username: 'admin',
  password: bcrypt.hashSync('admin123', 10),
};

module.exports = adminUser;