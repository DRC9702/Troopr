const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line prefer-destructuring

const UserSchema = new Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  credential: { type: mongoose.Schema.Types.ObjectId, ref: 'Credential' },
  eventsHosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, { collection: 'User' });

const Model = mongoose.model('User', UserSchema);
// module.exports = mongoose.model("User", UserSchema);
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
  findByIdWithEvent(id, callback) {
    Model.findOne({ _id: id }).populate([{
      path: 'eventsHosted',
      model: 'Event',
    }]).exec((error, one) => {
      callback(error, one);
    });
  },
  middleware: {

    loadAll(req, res, next) {
      Model.find({}).populate([{
        path: 'profile',
        model: 'Profile',
      }, {
        path: 'eventsHosted',
        model: 'Event',
      }, {
        path: 'eventsJoined',
        model: 'Event',
      }, {
        path: 'credential',
        model: 'Credential',
      }]).exec((error, all) => {
        req.users = all || [];
        next();
      });
    },
    loadOfCre(req, res, next) {
      Model.find({ credential: (req.credential ? req.credential.id : '') }).populate([{
        path: 'profile',
        model: 'Profile',
      }, {
        path: 'credential',
        model: 'Credential',
      }]).exec((error, one) => {
        req.user = one ? one[0] : '';
        next();
      });
    },
    loadOfLog(req, res, next) {
      Model.find({ credential: (req.session.user ? req.session.user.credential : '') }).populate([{
        path: 'profile',
        model: 'Profile',
      }, {
        path: 'credential',
        model: 'Credential',
      }]).exec((error, one) => {
        req.user = one ? one[0] : '';
        next();
      });
    },

  },
};
