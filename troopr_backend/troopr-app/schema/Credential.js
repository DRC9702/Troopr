var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CredentialSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
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

var Model = mongoose.model("Credential", CredentialSchema)