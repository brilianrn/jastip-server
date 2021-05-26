const { getDatabase } = require('../config');
const { ObjectId } = require('mongodb');
const cartCollection = 'carts';

class Cart {
  static addCart(newCart) {
    return getDatabase().collection(cartCollection).insertOne(newCart);
  }

  static findAll() {
    return getDatabase().collection(cartCollection).find().toArray();
  }

  static findByUserId(userId) {
    return getDatabase().collection(cartCollection).find({ UserId: ObjectId(userId) }).toArray();
  }
}

module.exports = Cart;