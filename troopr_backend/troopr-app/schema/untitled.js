var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  id: String,
  members: [UserSchema],
  event: EventSchema
})

module.exports = mongoose.model("Team", TeamSchema);