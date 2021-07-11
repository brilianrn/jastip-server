const { getDatabase } = require('../config');
const { hashPassword } = require('../helpers/passHelp');
const { ObjectId } = require('mongodb');
const userCollection = 'users';

class User {
  static register(payload) {
    payload.password = hashPassword(payload.password);
    if (payload.role == undefined) {
      payload.role = 'Customer';
    } else {
      payload.role = 'Admin';
    }

    return getDatabase().collection(userCollection).insertOne(payload);
  }

  static login(payload) {
    return getDatabase().collection(userCollection).findOne({ email: payload });
  }

  static getOneUser(id) {
    return getDatabase().collection(userCollection).findOne({ _id: ObjectId(id) });
  }

  static updateUser({ id, editUser }) {
    return getDatabase().collection(userCollection).update({ _id: ObjectId(id) }, { $set: editUser });
  }
}

module.exports = User;