require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const cors = require('cors');
const route = require('./routes');
const errHandler = require('./middlerwares/errHandler');
const { mongoDbConnect } = require('./config');

mongoDbConnect((isConnected) => {
  isConnected ? console.log('Database connection success!') : console.log('Database connection error!');
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(route);
app.use(errHandler);

app.listen(port, () => {
  console.log('Running on port:', port);
})