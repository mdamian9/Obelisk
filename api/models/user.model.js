const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
    let user = this;
    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();
    // Hash new password if it has changed
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return callback(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

// Add method to userSchema to verify user password
UserSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
