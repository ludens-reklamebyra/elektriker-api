export function adminAuth(req, res, next) {
  const token = req.body.adminToken
    || req.query.adminToken
    || req.headers['x-admin-token'];

  if (!token) return res.status(403).jsonp({
    success: false,
    message: 'No token provided.'
  });

  if (token !== process.env.ADMIN_TOKEN) return res.status(403).jsonp({
    success: false,
    message: 'Failed to authenticate token.'
  });

  next();
}
