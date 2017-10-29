var mongoose = require('mongoose')
var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }


  })
  module.exports = mongoose.model("User", UserSchema);
