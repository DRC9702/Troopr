var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  host: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
  registration_deadline:{ type: Date },
  start_date: { type: Date },
  end_date: { type: Date },
  description: String,
  max: Number,
  min: Number
})

var Model = mongoose.model("Event", EventSchema);
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
  middleware: {

		loadAll: function(req, res, next){
        Model.find({}).populate([{
          path:'host',
          model:'User',
          populate: [{
            path:'profile',
            model:'Profile'
          },{
            path:'credential',
            model:'Credential'
          }]
        }]).exec(function (error, all) {
        req.events = all || [];
        next();
      });
    },
    loadOfId: function(req, res, next){
      if(req.body.event_id){
        Model.findOne({id:req.body.event_id}).populate([{
          path:'host',
          model:'User',
          populate: [{
            path:'profile',
            model:'Profile'
          },{
            path:'credential',
            model:'Credential'
          }]
        }]).exec(function (error, the_event) {
            req.event =  the_event;
            next();
        });
      }else{
        res.json({
          success:false,
          message:"Need pass the event_id"
        })
      }
    }
  }
}
