const express = require('express');
const router = require('./app/router');
const database = require('./app/db');
const app = express();

database.connect();

app.use(express.json());

app.use(router);

app.listen(3888), () => {
  console.log('listening on port 3888');
}