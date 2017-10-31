var express = require('express');
var router = express.Router();
var User = require('../Schema/User');
var Profile = require('../Schema/Profile');
var credential = require('../Schema/Credential');
var React = require('react');
var ReacDOMServer = require('react-dom/server');
var MyComponent =  React.createFactory(require('../components/MyComponent'));

/* GET home page. */
router.get('/', User.middleware.loadAll,function(req, res, next) {

      // res.render('home', {
      //   user:req.users,
      //   context:'home'
      // });
      res.json({
        user:req.users,
      });
});
router.get('/addProfile', function(req, res, next) {
  var fields = {
    skill:"ooo",
      resume: "dwqd",
      bio: "Dwqwqdqwd",
      links: "dwqdqwdqw",
  }
  var fields2 = {
    username:"David",
    email:"123456@gmail.com",
    password:"123456"
  }
  var fi
  Profile.add(fields,function(error,pro){
    if(error){
      res.json({
        success:"fail at pro"
      })
    }
    credential.add(fields2,function(error,cre){
      if(error){
        res.json({
          success:"fail at cre"
        })
      }
      User.add({
        profile:pro.id,
        credential:cre.id
      }, function(error,user){
        if(error){
          res.json({
            success:"fail at user"
          })
        }
        res.json({
          success:"success",
          user:user
        })

      })
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