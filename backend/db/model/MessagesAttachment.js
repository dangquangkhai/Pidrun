const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messagesAttachmentSchema = new Schema({
    ConversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    MessageId: {
        type: Schema.Types.ObjectId,
        required: false
    },
    attachmentName:{
        type: Schema.Types.ObjectId,
        required: true
    },
    attachmentType: {
        type: String,
        required: false
    },
    attachmentPath: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        required: false
    },
});

module.exports = mongoose.model("MessagesAttachment", messagesAttachmentSchema);