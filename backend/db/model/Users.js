const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required = false
    },
    password: String,
    image: String,
    firstname: {
        type: String,
        required = false
    },
    lastname: {
        type: String,
        required = false
    }
});

module.exports = mongoose.model("Users", Users);