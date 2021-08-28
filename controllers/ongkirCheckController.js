const axios = require('axios');
const { baseUrl, originCity } = require('../api/rajaOngkirApi');
const request = require('request');

class OngkirCheckController {
  static getProvices(req, res, next) {
    axios({
      method: 'GET',
      url: `${baseUrl}/province`,
      headers: {
        'key': '43a860027b704e88c5080636db335bc0',
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(({ data }) => {
        res.status(200).json({ provinces: data.rajaongkir.results });
      })
      .catch(err => {
        next(err);
      })
  }

  static getCities(req, res, next) {
    let province = req.body.province;

    axios({
      method: 'GET',
      url: `${baseUrl}/city?province=${province}`,
      headers: {
        'key': '43a860027b704e88c5080636db335bc0',
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
      .then(({ data }) => {
        res.status(200).json({ cities: data.rajaongkir.results });
      })
      .catch(err => {
        next(err);
      })
  }

  static getCosts(req, res, next) {
    let options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {
        key: '43a860027b704e88c5080636db335bc0',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        origin: originCity,
        destination: req.body.destinationCity,
        weight: req.body.weight,
        courier: req.body.courier
      }
    };

    request(options, function (error, response, body) {
      if (error) next(error);

      let data = JSON.parse(body);

      res.status(200).json({ data });
    });
  }

  static getOrders(req, res, next) {
    console.log(req.body.data, + " =================")
  }
}


module.exports = OngkirCheckController;