const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: String,
  skills: [String],
  resume: String,
  bio: String,
  links: [String],
  // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { collection: 'Profile' });

const Model = mongoose.model('Profile', ProfileSchema);

module.exports = {
  add(fields, callback) {
    const one = new Model(fields);
    one.save((error, profile) => {
      if (error) {
        console.log(`Got error 3: ${error}\n`);
        if (callback) callback(error);
      } else if (callback) callback(null, profile);
    });
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
};
