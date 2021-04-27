const bcrypt = require('bcryptjs');

function hashPassword(inputPass) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync('' + inputPass, salt);

  return hash;
}

function comparePassword(inputPass, passDb) {
  return bcrypt.compareSync(inputPass, passDb);
}

module.exports = { hashPassword, comparePassword };