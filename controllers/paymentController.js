const randomOrderId = require('../helpers/randomOrderId');
const Payment = require('../models/paymentModel');
const axios = require('axios');

class PaymentController {
  static createToken(req, res, next) {
    let orderId = 'order_id_' + randomOrderId(req.currentUser.id);

    axios({
      url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from("SB-Mid-server-xhwkch0ti_MSOsZ07UNa5yBE").toString("base64")
      },
      data: {
        transaction_details: {
          order_id: order_id,
          gross_amount: Number(req.body.payload.price)
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          email: req.currentUser.email,
          phone: req.decoded.phone_number
        }
      }
    })
    // let order_id = 'order_id_' + randomId(req.body.payload.name)

    // axios({
    //   url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization:
    //     "Basic " +
    //           Buffer.from("SB-Mid-server-h9MIi9qG8Vde4JzmQdADfN0Q").toString("base64")
    //     },
    //     data: {
    //       transaction_details: {
    //         order_id: order_id,
    //         gross_amount: Number(req.body.payload.price)
    //       },
    //       credit_card: {
    //         secure: true
    //       },
    //       customer_details: {
    //         email: req.decoded.email,
    //         phone: req.decoded.phone_number
    //       }
  }
}

module.exports = PaymentController;