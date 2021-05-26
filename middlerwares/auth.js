const { verifyToken } = require('../helpers/jwt');
const User = require('../models/userModel');

function authentication(req, _, next) {
  try {
    let { id } = verifyToken(req.headers.access_token);

    User.getOneUser(id)
      .then(data => {
        req.currentUser = { id: data._id, email: data.email };
        next();
      })
      .catch(_ => {
        throw new Error({ name: 'User Unauthenticate', code: 401 });
      })
  } catch (error) {
    next({ name: 'User Unauthenticate', code: 401 })
  }
}

module.exports = authentication;