var express = require('express');
var router = express.Router();
var User = require('../schema/User');
var Profile = require('../schema/Profile');
var credential = require('../schema/Credential');
var React = require('react');
var ReacDOMServer = require('react-dom/server');
var MyComponent =  React.createFactory(require('../components/MyComponent'));

/* GET home page. */
router.get('/api', User.middleware.loadAll,function(req, res, next) {

      // res.render('home', {
      //   user:req.users,
      //   context:'home'
      // });
      res.json({
        user:req.users,
      });
});
// router.post('/api/create_account', User.middleware.loadAll,function(req, res, next) {
//
//       // res.render('home', {
//       //   user:req.users,
//       //   context:'home'
//       // });
//       console.log(req.body.data)
//       console.log("Dwqdqwwqd")
//       res.json({
//         success:true,
//       });
// });
router.post('/api/create_account', User.middleware.loadAll,function(req, res, next) {
      var email=  req.body.email
      var username=  req.body.username
      var password = req.body.password
      if(!(email&&username&&password)){
        res.json({
          success:false,
          message:"infomation not completed"
        })
        return
      }
      var fields = {
        username:username,
        email:email,
        password:password
      }
      console.log(fields)
      credential.add(fields,function(error,cre){
        if(error){
          if(error.code=="11000"){
            res.json({
              success:false,
              message:"email already used",
              error:error
            })
            return
          }
          res.json({
            success:"fail at cre",
            error:error
          })
          return
        }
        User.add({
          profile:null,
          credential:cre.id
        }, function(error1,user){
          if(error1){

            res.json({
              success:false,
              message:"user created fail",
              error:error1
            })
            console.log(error1)
            return
          }
          res.json({
            success:"success",
            user:user
          })
        })
      })
});

router.post('/api/sign_in', credential.middleware.loadOfEmail,User.middleware.loadOfCre,function(req, res, next) {

      var email=  req.body.email
      var password = req.body.password
      if(!(email&&password)){
        res.json({
          success:false,
          message:"infomation not completed",
          error:"infomation not completed"
        })
        return
      }

      var fields = {
        email:email,
        password:password
      }
      if(!req.credential){
        res.json({
          success:false,
          message:"no such user",
          error:"no such user"
        })
        return
      }
      console.log(req.credential)
      console.log(req.body.password)
      if(req.credential.password ==password){
        res.json({
          success:true,
          user:req.user
        })
        return
      }else{
        res.json({
          success:false,
          message:"password wrong",
          error:"password wrong"
        })
        return
      }
      console.log(fields)
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
