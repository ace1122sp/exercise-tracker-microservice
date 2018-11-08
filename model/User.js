const mongoose = require('mongoose');

const ExerciseSchema = require('./ExerciseSchema');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 40
  },
  log: {
    type: [ExerciseSchema],
    default: []
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;