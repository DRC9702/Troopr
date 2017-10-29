var User = require('../schema/User');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/db');

var users = [
  new User({
    username: "Chi",
    email: "abc@abc.com",
    password:"123456"
  }),
  new User({
    username: "Victor",
    email: "abcd@abc.com",
    password:"123456"
  }),
  new User({
    username: "Lalka",
    email: "abcde@abc.com",
    password:"123456"
  }),
  new User({
    username: "David",
    email: "abcdef@abc.com",
    password:"123456"
  })
]

var done =0
for (var i = 0; i<users.length;i++){
  users[i].save(function(err,result){
    done++
    if (done===users.length){
      exit()
    }
  })
}
function exit(){
  mongoose.disconnect();
}
