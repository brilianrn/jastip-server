const jwt = require('jsonwebtoken');

function generateToken(payload) {
  let token = jwt.sign(payload, process.env.USER);
  // let token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, process.env.USER);
  // return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = { generateToken, verifyToken };