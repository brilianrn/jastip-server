const { getDatabase } = require('../config/index');
const { ObjectId } = require('mongodb');
const paymentCollection = 'payments';

class Payment {
  static createPayment(payment) {
    return getDatabase().collection(paymentCollection).insertOne(payment);
  }

  static findAllPayment() {
    return getDatabase().collection(paymentCollection).find();
  }
}

module.exports = Payment;