var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CredentialSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

var Model = mongoose.model("Credential", CredentialSchema)

module.exports = {
  add: function(fields,callback){
    var one = new Model(fields);
    one.save(function(error,cre) {
      if (error) {
        if (callback) callback(error,null)
      } else {
        if (callback) callback(null,cre)
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

    loadOfEmail: function(req, res, next){
      Model.find({email:req.body.email}).exec(function (error, one) {
      req.credential =one?one[0]:"";
      next();
    });
    }
  }

}
