let mongoose = require('mongoose');
let connection = require('../connection');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
});

module.exports = connection.model('users',usersSchema);
