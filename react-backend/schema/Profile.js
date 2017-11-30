var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name:String,
  skills: String,
  resume: String,
  bio: String,
  links: [String]
  // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {collection: 'Profile'})

var Model = mongoose.model("Profile", ProfileSchema);

module.exports ={
  add:function(fields,callback){

    var one = new Model(fields)
    one.save(function(error, profile) {
      if (error) {
        console.log("Got error 3: " + error + "\n")
        if (callback) callback(error)
      } else {
        if (callback) callback(null,profile)
      }
    });
  },
  update: function(id, fields, callback) {
    Model.findOne({
      _id: id
    }).exec(function(error, one) {
      console.log("in the update event")
      console.log(one)
      if (error) {
        callback(error,null);
      } else {
        one.update(fields,callback);
      }
    });
  },

  find: function(criteria,callback){
    Model.find(criteria).exec(function (error, some) {
      callback(error, some);
    });
  }
}
