const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let participantsSchema = new Schema({
    ConversationId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    UserId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    List_User:{
        type: Object,
        required: true
    },
});

module.exports = mongoose.model("Participants", participantsSchema);