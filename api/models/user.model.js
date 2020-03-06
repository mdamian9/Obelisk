const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    // User Schema
});

module.exports = mongoose.model('User', userSchema);
