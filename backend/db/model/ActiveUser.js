const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let activeUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    key:{
        type: String,
        required: true
    },
    UserId:{
        type: Schema.Types.ObjectId,
        required: true
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

module.exports = mongoose.model("ActiveUser", activeUserSchema);