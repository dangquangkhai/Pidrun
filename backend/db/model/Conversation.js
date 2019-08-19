const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let conversationSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    creator: {
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

module.exports = mongoose.model("Conversation", conversationSchema);