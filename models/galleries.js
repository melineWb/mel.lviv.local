let mongoose = require('mongoose');
let connection = require('../connection');
let Schema = mongoose.Schema;

let galleriesSchema = new Schema({
  title: String,
  url: { type: String, required: true},
  keys: Array,
  publish: Boolean
});

module.exports = connection.model('galleries',galleriesSchema);
