const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unlique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  token: {
    type: String,
  },
});
const Users = mongoose.model("user", UserSchema);
module.exports = Users;
