var User = require('../schema/User');
var Credential = require('../schema/Credential')
var Profile = require('../schema/Profile')
var Event = require('../schema/Event')
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/db');

//var users = [
//  new User({
//    id: "001",
//    profile: ,
//    credential: credentials[1],
//    eventsHosted: events[0]
//  }),
//]

var credentials = [
  new Credential({
    username: "Chi",
    email: "abc@abc.com",
    password:"123456"
  }),
  new Credential({
    username: "Victor",
    email: "abcd@abc.com",
    password:"123456"
  }),
  new Credential({
    username: "Lalka",
    email: "abcde@abc.com",
    password:"123456"
  }),
  new Credential({
    username: "David",
    email: "abcdef@abc.com",
    password:"123456"
  })
]

var events = [
  new Event({
    id: "1001",
    host: users[0],
    name: "DevFest",
    teams: []
  })
]

var profile = [
  new Profile({
    skills: ["Python", "Nodejs"],
    resume: "",
    bio: "Columbia SEAS Class of 2018",
    links: [""]
  })
]

var done =0
for (var i = 0; i<credentials.length;i++){
  credentials[i].save(function(err,result){
    done++
    if (done===credentials.length){
      exit()
    }
  })
}

function exit(){
  mongoose.disconnect();
}
