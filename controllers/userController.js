const User = require('../models/userModel');

class UserController {
  static register(req, res, next) {
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      birth_date: req.body.birth_date,
      wallet: req.body.wallet
    };

    User.register(newUser)
      .then(data => {
        console.log(data);
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }
}

module.exports = UserController;