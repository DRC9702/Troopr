var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  skillsOwned:[String],
  skillsPrefered:[String],
  skillsRequired:[String],
  projectPlan:{ type: String, default: 'N/A' },
  projectName:{ type: String, default: 'N/A' },
  teamMatchingPool:[String],
  teamAccepted:[String]
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
  findByEventIdAndUseId: function(event_id,user_id, callback) {
    Model.findOne({ event : event_id, members:user_id }).populate([{
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
    }]).exec(function (error, one) {
      console.log("eqweqw")
      callback(error, one);
    });
  },
  findByUserId: function(user_id, callback) {
    Model.find({ members:user_id }).populate([{
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
    }]).exec(function (error, one) {
      callback(error, one);
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
  },
  loadOfEvent: function(req, res, next){
    Model.find({event:req.params.event_id}).populate([{
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
