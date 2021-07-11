const User = require('../models/userModel');
const { comparePassword } = require('../helpers/passHelp');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register(req, res, next) {
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      password: req.body.password,
      birth_date: req.body.birth_date,
      wallet: req.body.wallet,
      role: req.body.role,
      myCarts: req.body.myCarts
    };

    User.register(newUser)
      .then(({ ops }) => {
        res.status(201).json({ message: `${ops[0].email} success to created` });
      })
      .catch(err => {
        next(err);
      })
  }

  static login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.login(email)
      .then(user => {
        if (user) {
          let cekPass = comparePassword(password, user.password);
          let payload = { id: user._id, email: user.email, last_name: user.last_name };

          if (cekPass) {
            let access_token = generateToken(payload);
            res.status(200).json({ access_token, userId: user._id, name: user.first_name });
          } else {
            throw new Error({ name: 'loginError', message: 'Invalid email/password' });
          }
        } else {
          throw new Error({ name: 'loginError', message: 'Invalid email/password' });
        }
      })
      .catch(err => {
        next(err);
      })
  }

  static findOne(req, res, next) {
    const id = req.params.userId;

    User.getOneUser(id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = UserController;