const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  description: {
    type: String,
    required: true,
    min: 1,
    max: 40
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 100000
  },
  date: {
    type: Number,
    default: Date.now()
  }
});

module.exports = ExerciseSchema;