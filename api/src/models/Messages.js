const mongoose = require("mongoose");
const messagesSchema = mongoose.Schema({
  conversationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
});
const Messages = mongoose.model("message", messagesSchema);
module.exports = Messages;
