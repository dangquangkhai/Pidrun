const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userKeySchema = new Schema({
    UserId: {
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
    publickey:{
        type: String,
        required: true
    },
    //Must encrypt private key
    privatekey:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("UserKey", userKeySchema);