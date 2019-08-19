const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let deletedMessageSchema = new Schema({
    MessageId: {
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
    },
});

module.exports = mongoose.model("DeletedMessage", deletedMessageSchema);