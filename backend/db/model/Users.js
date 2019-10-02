const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  birthday: {
    type: Date,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  image: String,
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  isblock: {
    type: Boolean,
    required: false
  },
  isactive: {
    type: Boolean,
    required: false
  },
  created: {
    type: Date,
    required: false
  },
  updated: {
    type: Date,
    required: false
  },
  gender: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model("Users", usersSchema);
