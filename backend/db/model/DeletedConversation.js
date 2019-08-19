const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let deletedConversationSchema = new Schema({
    ConversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    UserId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    created: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("DeletedConversation", deletedConversationSchema);