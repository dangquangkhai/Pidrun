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
    updated: {
        type: Date,
        required: false
    },
    // Contain list user in conversation read it or not date time
    // Store as object json
    // Example:
    /*
    *  {
    *     ReadBy: {userid, email, firstname, lastname},
    *     ReadTime: {datetime}
    *  }
    * */
    readList:{
        type:Object,
        required: false
    },
    // Message type
    // Example: Media type or document type
    messType:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Messages", messagesSchema);