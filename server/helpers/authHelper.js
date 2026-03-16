function getAuthenticatedUserId(req) {
  return req?.user?.id || req?.session?.userId || null;
}

function requireAuthenticatedUser(req, res, next) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'Du måste vara inloggad.' });
  }
  req.authUserId = userId;
  return next();
}

module.exports = {
  getAuthenticatedUserId,
  requireAuthenticatedUser
};
