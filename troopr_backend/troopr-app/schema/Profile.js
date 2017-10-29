var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  skill: [String],
  resume: String,
  bio: String,
  links: [String]
  // user: {type: momgoose.Schema.Types.ObjectId, ref: 'User'}
}, {collection: 'Profile'})

var Model = mongoose.model("Profile", ProfileSchema);

module.exports ={
  add:function(fields,callback){

    var one = new Model(fields)
    one.save(callback)
  },

  find: function(criteria,callback){
    Model.find(criteria).exec(function (error, some) {
      callback(error, some);
    });
  }
}