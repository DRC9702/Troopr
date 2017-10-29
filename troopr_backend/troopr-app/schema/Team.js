var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  id: String,
  members: [{type: mogoose.Schema.Types.ObjectId, ref: 'User'}],
  event: {type: mogoose.Schema.Types.ObjectId, ref: 'Event'}
}, {collection: 'Team'})

var Model = mongoose.model("Team",UserSchema);