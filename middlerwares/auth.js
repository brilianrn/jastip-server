const { verifyToken } = require('../helpers/jwt');
const User = require('../models/userModel');
const Product = require('../models/productModel');

function authentication(req, _, next) {
  try {
    let { id } = verifyToken(req.headers.access_token);

    User.getOneUser(id)
      .then(data => {
        req.currentUser = { id: data._id, email: data.email };
        next();
      })
      .catch(_ => {
        throw new Error({ name: 'User Unauthorize', code: 401 });
      })
  } catch (_) {
    next({ name: 'User Unauthorize', code: 401 })
  }
}

function authorization(req, _, next) {
  const id = req.params.id;
  Product.getOneProduct(id)
    .then(data => {
      if (data) {
        if ('' + data.UserId === '' + req.currentUser.id) {
          next();
        } else {
          next({ name: 'Product Unauthorize', code: 401 });
        }
      } else {
        next({ name: 'Product Unauthorize', code: 401 });
      }
    })
}

module.exports = { authentication, authorization };