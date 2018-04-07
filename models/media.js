let mongoose = require('mongoose');
let connection = require('../connection');
let Schema = mongoose.Schema;

let mediaSchema = new Schema({
  url: { type: String, required: true}
});

module.exports = connection.model('media',mediaSchema);
