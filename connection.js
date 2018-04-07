let env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const mongoose = require('mongoose');

let connection = mongoose.createConnection(
  `mongodb://${config.database.host}:${config.database.port}/${config.database.db}`,
  {
    poolSize: 5
  }
);

module.exports = connection;
