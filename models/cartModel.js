const { getDatabase } = require('../config/index');
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

  static findOne({ cartId, UserId }) {
    return getDatabase().collection(cartCollection).find({ _id: ObjectId(cartId), UserId: ObjectId(UserId) }).toArray();
  }

  static updateCart({ cartId, dataUpdate, UserId }) {
    return getDatabase().collection(cartCollection).update({ _id: ObjectId(cartId), UserId: ObjectId(UserId) }, { $set: dataUpdate });
  }

  static findOneByProductId({ productId, UserId }) {
    return getDatabase().collection(cartCollection).find({ ProductId: ObjectId(productId), UserId: ObjectId(UserId) }).toArray();
  }

  static deleteByCartId({ ProductId, UserId }) {
    return getDatabase().collection(cartCollection).remove({ ProductId: ObjectId(ProductId), UserId: ObjectId(UserId) });
  }
}

module.exports = Cart;