var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  id: String,
  host: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
})

var Model = mongoose.model("Event", EventSchema);