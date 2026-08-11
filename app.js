const express = require('express');
const app = express();

// View engine
app.set('view engine', 'ejs');

// Static files (CSS, JS, gambar)
app.use(express.static('public'));

// Parsing body request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: 'toko-sembako-ariesta-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }, // 1 jam
}));

// Custom middleware: logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/', require('./routes/web'));
app.use('/api', require('./routes/api'));

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});