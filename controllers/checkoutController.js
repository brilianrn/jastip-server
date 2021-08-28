const CheckoutModel = require('../models/checkoutModel');
const UserModel = require('../models/userModel');

class CheckoutController {
  static addCheckout(req, res, next) {
    let newCO = {
      userId: req.currentUser.id,
      products: req.body.cartIds,
      address: '',
      ekspedisi: '',
      ongkir: '',
      invocation: '',
      status: 'BELUM BAYAR'
    }

    CheckoutModel.addCO(newCO)
      .then(msg => {
        // UserModel.updateUser
        res.status(200).json(msg);
      })
      .catch(error => {
        next(error);
      })
  }

  static findOne(req, res, next) {
    CheckoutModel.findOne(req.param.id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        next(error);
      })
  }
}

module.exports = CheckoutController;