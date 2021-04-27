const { MongoClient } = require('mongodb');
let database = null;

function mongoDbConnect(cb) {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect()
    .then(_ => {
      database = client.db('jastip');
      cb(true);
    })
    .catch(err => {
      console.log(err, 'Database connection error! --config/index.js');
      cb(false);
    })
}

function getDatabase() {
  return database;
}

module.exports = { mongoDbConnect, getDatabase };