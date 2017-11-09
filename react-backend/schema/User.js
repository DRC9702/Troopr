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
    one.save(function(error,user) {
      if (error) {
        console.log("Got error 3: " + error + "\n")
        if (callback) callback(error,null)
      } else {
        if (callback) callback(null,user)
      }
    });
    // one.save(callback);
  },

  find: function(criteria,callback){
    Model.find(criteria).exec(function (error, some) {
      callback(error, some);
    });
  },
  middleware: {

		loadAll: function(req, res, next){
      Model.find({}).populate([{
        path:'profile',
        model:'Profile'
      },{
        path:'credential',
        model:'Credential'
      }]).exec(function (error, all) {
      req.users = all || [];
      next();
    });
  },
    loadOfCre: function(req, res, next){
      Model.find({credential:(req.credential?req.credential.id:"")}).populate([{
        path:'profile',
        model:'Profile'
      },{
        path:'credential',
        model:'Credential'
      }]).exec(function (error, one) {
      req.user = one?one[0]:"";
      next();
    });
    }
  }
}
