var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  credential: {type: mongoose.Schema.Types.ObjectId, ref: 'Credential'},
  eventsHosted: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
}, {collection: 'User'});

var Model = mongoose.model("User",UserSchema);
// module.exports = mongoose.model("User", UserSchema);
module.exports = {
  add: function(fields,callback){
    var one = new Model(fields);
    one.save(callback);
  },

  find: function(criteria,callback){
    Model.find(criteria).exec(function (error, some) {
      callback(error, some);
    });
  }
}