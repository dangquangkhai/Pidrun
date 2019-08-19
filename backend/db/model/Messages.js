const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messagesSchema = new Schema({
    ConversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    SenderId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    attachmentId: {
        type: Schema.Types.ObjectId,
        required: false
    },
    created: {
        type: Date,
        required: false
    },
});

module.exports = mongoose.model("Messages", messagesSchema);