const User = require('../schema/User');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/db');

const users = [
  new User({
    username: 'Chi',
    email: 'abc@abc.com',
    password: '123456',
  }),
  new User({
    username: 'Victor',
    email: 'abcd@abc.com',
    password: '123456',
  }),
  new User({
    username: 'Lalka',
    email: 'abcde@abc.com',
    password: '123456',
  }),
  new User({
    username: 'David',
    email: 'abcdef@abc.com',
    password: '123456',
  }),
];

let done = 0;
for (let i = 0; i < users.length; i++) {
  users[i].save((err, result) => {
    done++;
    if (done === users.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.disconnect();
}
