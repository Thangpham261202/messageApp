const mongoose = require("mongoose");
const ConversationsSchema = mongoose.Schema({
  member: {
    type: Array,
    required: true,
  },
});
const Conversations = mongoose.model("conversation", ConversationsSchema);
module.exports = Conversations;
