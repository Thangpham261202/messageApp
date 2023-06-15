const mongoose = require("mongoose");
async function connect() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/chatapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect succest");
  } catch (err) {
    console.log("connect error");
  }
}
module.exports = { connect };
