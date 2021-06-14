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

  static findOne(cartId) {
    return getDatabase().collection(cartCollection).find({ _id: ObjectId(cartId) }).toArray();
  }

  static updateCart({ cartId, dataUpdate }) {
    return getDatabase().collection(cartCollection).update({ _id: ObjectId(cartId) }, { $set: dataUpdate });
    // return getDatabase().collection(cartCollection).update({ _id: ObjectId(cartId) }, {
    //   $set: {
    //     title: dataUpdate.title,
    //     size: dataUpdate.size,
    //     qty: dataUpdate.qty,
    //     images: dataUpdate.images,
    //     discExp: dataUpdate.discExp,
    //     UserId: ObjectId(dataUpdate.UserId),
    //     ProductId: ObjectId(dataUpdate.ProductId)
    //   }
    // })
  }

  static findOneByProductId(productId) {
    return getDatabase().collection(cartCollection).find({ ProductId: ObjectId(productId) }).toArray();
  }

  static deleteByCartId(cartId) {
    return getDatabase().collection(cartCollection).remove({ _id: ObjectId(cartId) });
  }
}

module.exports = Cart;