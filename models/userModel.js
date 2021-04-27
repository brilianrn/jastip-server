const { getDatabase } = require('../config');
const { ObjectId } = require('mongodb');
const userCollection = 'users';

class User {
  static register(newUser) {
    return getDatabase().collection(userCollection).insertOne(newUser);
  }
}

module.exports = User;