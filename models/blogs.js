let mongoose = require('mongoose');
let connection = require('../connection');
let Schema = mongoose.Schema;

let blogsSchema = new Schema({
  title: String,
  url: { type: String, required: true, unique: true },
  keys: Array,
  publish: Boolean,
  category: String,
  content: String,
  // img: Schema.Types.ObjectId,
  img: String,
  description: String
});

module.exports = connection.model('blogs',blogsSchema);
