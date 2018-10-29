'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

userSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

userSchema.methods.comparePassword = function(claveToCheck, hash, cb) {
  bcrypt.compare(claveToCheck, hash, function(err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

const User = mongoose.model('User',userSchema);

module.exports = User;