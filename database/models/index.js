const mongoose = require ('mongoose');
const {mongodb} = require ('../../config');

mongoose.connect (mongodb.url, mongodb.options);

const User = require ('./user');
// User.db.dropCollection('users');

module.exports = {User};
