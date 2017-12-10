const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line prefer-destructuring

const EventSchema = new Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  registration_deadline: { type: Date },
  start_date: { type: Date },
  end_date: { type: Date },
  description: String,
  max: Number,
  min: Number,
});

const Model = mongoose.model('Event', EventSchema);
module.exports = {
  add(fields, callback) {
    const one = new Model(fields);
    one.save((error, user) => {
      if (error) {
        console.log(`Got error 3: ${error}\n`);
        if (callback) callback(error, null);
      } else if (callback) callback(null, user);
    });
    // one.save(callback);
  },
  update(id, fields, callback) {
    Model.findOne({
      _id: id,
    }).exec((error, one) => {
      console.log('in the update event');
      console.log(one);
      if (error) {
        callback(error, null);
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
  middleware: {

    loadAll(req, res, next) {
      Model.find({}).populate([{
        path: 'host',
        model: 'User',
        populate: [{
          path: 'profile',
          model: 'Profile',
        }, {
          path: 'credential',
          model: 'Credential',
        }],
      }, {
        path: 'teams',
        model: 'Team',
      }]).exec((error, all) => {
        req.events = all || [];
        next();
      });
    },
    loadOfId(req, res, next) {
      if (req.body.event_id || req.params.event_id) {
        Model.findOne({ _id: req.body.event_id || req.params.event_id }).populate([{
          path: 'host',
          model: 'User',
          populate: [{
            path: 'profile',
            model: 'Profile',
          }, {
            path: 'credential',
            model: 'Credential',
          }],
        }]).exec((error, theEvent) => {
          req.event = theEvent;
          next();
        });
      } else {
        console.log('dqwdqdqwdwq');
        res.json({
          success: false,
          message: 'Need pass the event_id',
        });
      }
    },
  },
};
