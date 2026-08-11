function authMiddleware(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  return res.status(401).json({
    status: 'error',
    message: 'Unauthorized, silakan login terlebih dahulu',
  });
}

function authPageMiddleware(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  return res.redirect('/login');
}

module.exports = { authMiddleware, authPageMiddleware };