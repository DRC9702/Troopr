var express = require('express');
var router = express.Router();
var User = require('../schema/User');
var React = require('react');
var ReacDOMServer = require('react-dom/server');
var MyComponent =  React.createFactory(require('../components/MyComponent'));

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find(function(err,users){
    res.render('home', {
      user:users,
      context:'home'
    });
  })



});
router.get('/random', function(req, res) {
  var num = Math.random();
  // serverside render HTML
  var html = ReacDOMServer.renderToString(<MyComponent number={num} />);
  // pass to the page the rendered HTML string and num（props）
  res.render('random-props', {html:html, num:num});
});


module.exports = router;
