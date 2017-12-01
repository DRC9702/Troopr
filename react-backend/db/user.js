const User = require('../schema/User');
const Credential = require('../schema/Credential');
const Profile = require('../schema/Profile');
const Event = require('../schema/Event');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/db');

// var users = [
//  new User({
//    id: "001",
//    profile: ,
//    credential: credentials[1],
//    eventsHosted: events[0]
//  }),
// ]

const credentials = [
  new Credential({
    username: 'Chi',
    email: 'abc@abc.com',
    password: '123456',
  }),
  new Credential({
    username: 'Victor',
    email: 'abcd@abc.com',
    password: '123456',
  }),
  new Credential({
    username: 'Lalka',
    email: 'abcde@abc.com',
    password: '123456',
  }),
  new Credential({
    username: 'David',
    email: 'abcdef@abc.com',
    password: '123456',
  }),
];

const events = [
  new Event({
    id: '1001',
    host: users[0],
    name: 'DevFest',
    teams: [],
  }),
];

const profile = [
  new Profile({
    skills: ['Python', 'Nodejs'],
    resume: '',
    bio: 'Columbia SEAS Class of 2018',
    links: [''],
  }),
];

let done = 0;
for (let i = 0; i < credentials.length; i++) {
  credentials[i].save((err, result) => {
    done++;
    if (done === credentials.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
