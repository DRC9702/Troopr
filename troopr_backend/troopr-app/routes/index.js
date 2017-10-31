var express = require('express');
var router = express.Router();
var User = require('../Schema/User');
var Profile = require('../Schema/Profile')
var React = require('react');
var ReacDOMServer = require('react-dom/server');
var MyComponent =  React.createFactory(require('../components/MyComponent'));

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find("",function(err,users){
    Profile.find("",function(err,profiles){
      console.log(profiles)
      console.log(users)
      res.render('home', {
        user:users,
        context:'home'
      });
    })
  })
});
router.get('/addProfile', function(req, res, next) {
  var fields = {
    skill:"ooo",
      resume: "dwqd",
      bio: "Dwqwqdqwd",
      links: "dwqdqwdqw",
  }
  Profile.add(fields,function(error){
    if(error){
      console.log("Dwdwqwd2131243")
      res.json({
        success:"fail"
      })
    }
    res.json({
      success:"success"
    })
  })
  // res.send('respond with a resource');
});

// router.get('/random', function(req, res) {
//   var num = Math.random();
//   // serverside render HTML
//   var html = ReacDOMServer.renderToString(<MyComponent number={num} \/>);
//   // pass to the page the rendered HTML string and num（props）
//   res.render('random-props', {html:html, num:num});
// });


module.exports = router;
