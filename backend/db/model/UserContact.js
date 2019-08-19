const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userContactSchema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    ContactId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
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
});

module.exports = mongoose.model("UserContact", userContactSchema);