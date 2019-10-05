const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userNotificationsSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: false
  },
  updated: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model("UserNotifications", userNotificationsSchema);
