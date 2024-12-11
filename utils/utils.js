const crypto = require('crypto');

export function hashPassword(password) {
  return crypto.createHash('sha1').update(password).digest('hex');
}

export function sendError(res, code, message) {
  return res.status(code).json({ error: message });
}