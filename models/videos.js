let mongoose = require('mongoose');
let connection = require('../connection');
let Schema = mongoose.Schema;

let videosSchema = new Schema({
  video: String,
  keys: Array,
  publish: Boolean
});

module.exports = connection.model('videos',videosSchema);
