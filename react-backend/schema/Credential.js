const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const CredentialSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Model = mongoose.model('Credential', CredentialSchema);

module.exports = {
  add: (fields, callback) => {
    const one = new Model(fields);
    one.save((error, cre) => {
      if (error) {
        if (callback) callback(error, null);
      } else if (callback) {
        callback(null, cre);
      }
    });
    // one.save(callback);
  },

  find: (criteria, callback) => {
    Model.find(criteria).exec((error, some) => {
      callback(error, some);
    });
  },
  middleware: {
    loadOfEmail: (req, res, next) => {
      Model.find({ email: req.body.email }).exec((error, one) => {
        req.credential = one ? one[0] : '';
        next();
      });
    },
  },
};
