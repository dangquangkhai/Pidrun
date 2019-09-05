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
    isDisabled:{
        type: Boolean,
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

module.exports = mongoose.model("Participants", participantsSchema);