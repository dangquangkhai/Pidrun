const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let conversationSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  image: {
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
  lastMessageId: {
    type: String,
    required: false
  },
  lastMessageTime: {
    type: Date,
    required: false
  },
  //Conversation type
  //Example: Private chat or group chat
  conType:{
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Conversation", conversationSchema);
