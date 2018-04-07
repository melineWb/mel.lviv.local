let mongoose = require('mongoose');
let connection = require('../connection');
let Schema = mongoose.Schema;

let lifesSchema = new Schema({
  title: String,
  url: { type: String, required: true, unique: true },
  keys: Array,
  publish: Boolean,
  content: String,
  img: String,
  description: String
});

module.exports = connection.model('lifes',lifesSchema);
