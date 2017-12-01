const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  skillsOwned: [String],
  skillsPrefered: [String],
  skillsRequired: [String],
  projectPlan: { type: String, default: 'N/A' },
  projectName: { type: String, default: 'N/A' },
  teamMatchingPool: [String],
  teamAccepted: [String],
}, { collection: 'Team' });

const Model = mongoose.model('Team', TeamSchema);

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
  findByEventIdAndUseId(event_id, user_id, callback) {
    Model.findOne({ event: event_id, members: user_id }).populate([{
      path: 'members',
      model: 'User',
      populate: [{
        path: 'profile',
        model: 'Profile',
      }, {
        path: 'credential',
        model: 'Credential',
      }],
    }, {
      path: 'event',
      model: 'Event',
    }]).exec((error, one) => {
      callback(error, one);
    });
  },
  findByUserId(user_id, callback) {
    Model.find({ members: user_id }).populate([{
      path: 'members',
      model: 'User',
      populate: [{
        path: 'profile',
        model: 'Profile',
      }, {
        path: 'credential',
        model: 'Credential',
      }],
    }, {
      path: 'event',
      model: 'Event',
    }]).exec((error, one) => {
      callback(error, one);
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
      Model.find({}).populate([{
        path: 'members',
        model: 'User',
        populate: [{
          path: 'profile',
          model: 'Profile',
        }, {
          path: 'credential',
          model: 'Credential',
        }],
      }, {
        path: 'event',
        model: 'Event',
      }]).exec((error, all) => {
        req.teams = all || [];
        next();
      });
    },
    loadOfEvent(req, res, next) {
      Model.find({ event: req.body.event_id }).populate([{
        path: 'members',
        model: 'User',
        populate: [{
          path: 'profile',
          model: 'Profile',
        }, {
          path: 'credential',
          model: 'Credential',
        }],
      }, {
        path: 'event',
        model: 'Event',
      }]).exec((error, all) => {
        req.teams = all || [];
        next();
      });
    },


  },
};
