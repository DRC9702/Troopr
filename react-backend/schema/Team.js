var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
}, {collection: 'Team'})

var Model = mongoose.model("Team",TeamSchema);

module.exports = {
  add: function(fields,callback){
    var one = new Model(fields);
    one.save(function(error,user) {
      if (error) {
        console.log("Got error: " + error + "\n")
        if (callback) callback(error,null)
      } else {
        if (callback) callback(null,user)
      }
    });
  },
  update: function(id, fields, callback) {
    Model.findOne({
      _id: id
    }).exec(function(error, one) {
      if (error) {
        callback(error);
      } else {
        one.update(fields, callback);
      }
    });
  },
  find: function(criteria,callback){
    Model.find(criteria).exec(function (error, some) {
      callback(error, some);
    });
  },
  findById: function(id, callback) {
    Model.findOne({ _id : id }).
    exec(function (error, one) {
      callback(error, one);
    });
  },
  remove: function(id, callback) {
    Model.findOne({
      _id: id
    }).exec(function(error, one) {
      if (error) {
        callback(error);
      } else {
        one.remove(callback);
      }
    });
  },
  middleware: {

		loadAll: function(req, res, next){
      Model.find({}).populate([{
        path:'members',
        model:'User',
        populate: [{
          path:'profile',
          model:'Profile'
        },{
          path:'credential',
          model:'Credential'
        }]
      },{
        path:'event',
        model:'Event',
      }]).exec(function (error, all) {
      req.teams = all || [];
      next();
    });
  }


  }
}
