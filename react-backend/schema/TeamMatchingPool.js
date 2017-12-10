const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const TeamMatchingPoolSchema = new Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  pool: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
}, { collection: 'TeamMatchingPool' });

const Model = mongoose.model('TeamMatchingPool', TeamMatchingPoolSchema);

module.exports = {
  add(fields, callback) {
    const one = new Model(fields);
    one.save((error, user) => {
      if (error) {
        console.log(`Got error: ${error}\n`);
        if (callback) callback(error, null);
      } else if (callback) callback(null, user);
    });
  },
  update(id, fields, callback) {
    Model.findOne({
      _id: id,
    }).exec((error, one) => {
      if (error) {
        callback(error);
      } else {
        one.update(fields, callback);
      }
    });
  },
  find(criteria, callback) {
    Model.find(criteria).exec((error, some) => {
      callback(error, some);
    });
  },
  findById(id, callback) {
    Model.findOne({ _id: id })
      .exec((error, one) => {
        callback(error, one);
      });
  },
  remove(id, callback) {
    Model.findOne({
      _id: id,
    }).exec((error, one) => {
      if (error) {
        callback(error);
      } else {
        one.remove(callback);
      }
    });
  },
  middleware: {

    loadAll(req, res, next) {
      // Model.find({}).populate([{
      //   path:'members',
      //   model:'User',
      //   populate: [{
      //     path:'profile',
      //     model:'Profile'
      //   },{
      //     path:'credential',
      //     model:'Credential'
      //   }]
      // },{
      //   path:'event',
      //   model:'Event',
      // }]).exec(function (error, all) {
      Model.find({}).exec((error, all) => {
        req.events = all || [];
        next();
      });
    },


  },
};
