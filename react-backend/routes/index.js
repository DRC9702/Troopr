var express = require('express');
var router = express.Router();
var User = require('../schema/User');
var Event1 = require('../schema/Event');
var Team = require('../schema/Team')
var Profile = require('../schema/Profile');
var credential = require('../schema/Credential');
var React = require('react');
var ReacDOMServer = require('react-dom/server');
var MyComponent =  React.createFactory(require('../components/MyComponent'));

/* GET home page. */
router.get('/api', User.middleware.loadAll,function(req, res, next) {

      res.json({
        user:req.users,
      });
});

router.post('/api/profile',User.middleware.loadOfLog,function(req, res, next) {

      console.log(req.session.user)
      if(!req.session.user){
        res.json({
          success:false,
          login:false,
          message:'login plz',
          error:'login plz'
        });
        return
      }
      if(req.user.profile){
        res.json({
          success:true,
          name: req.user.profile.name,
          skills: req.user.profile.skills,
          resume: req.user.profile.resume,
          bio:req.user.profile.bio
        });
        return
      }else{
        res.json({
          success:false,
          message:'no profile for now',
          error:'no profile for now'
        });
        return
      }

});

router.post('/api/edit_profile',User.middleware.loadOfLog,function(req, res, next) {
  // router.post('/api/edit_profile', function(req, res, next) {
      console.log(req.body);
      if(!req.session.user){
        res.json({
          success:false,
          login:false,
          message:'login plz',
          error:'login plz'
        });
        return
      }
      if(req.user.profile){
          var newName=req.body.name?req.body.name:req.user.profile.name
          var newSkills=req.body.skills?req.body.skills:req.user.profile.skills
          var newResume=req.body.resume?req.body.resume:req.user.profile.resume
          var newBio=req.body.bio?req.body.bio:req.user.profile.bio
          var fields={
            name: newName,
            skills: newSkills,
            resume: newResume,
            bio: newBio
          }
          Profile.update(req.user.profile._id,fields,function(error){
            if(error){
              res.json({
                success:false,
                message:'update failed',
              });
              return
            }else{
              res.json({
                success:"success",
              })
            }
          })
      }else{
        res.json({
          success:false,
          message:'no profile for now',
          error:'no profile for now'
        });
        return
      }
});


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
          // console.log(req.session)
          req.session.user=user
          console.log(req.session)

          res.json({
            success:"success",
            user:user
          })
        })
      })
});

router.post('/api/create_event',function(req, res, next) {
    if(!req.session.user){
      res.json({
        success:false,
        login:false,
        message:"need login",
        error:"need login"
      })
      return
    }
    console.log(req.body)
      var host= req.session.user
      // var host= "5a0424d60cb1fa08d9aeaad8"
      var event_name = req.body.event_name
      var start_date_para = req.body.start_date.split("/");
      var start_date = new Date(parseInt(start_date_para[2]),parseInt(start_date_para[0])-1, parseInt(start_date_para[1]), 0, 0, 0);
      var end_date_para = req.body.end_date.split("/");
      var end_date = new Date(parseInt(end_date_para[2]), parseInt(end_date_para[0])-1, parseInt(end_date_para[1]), 0, 0, 0);
      var registration_deadline_para = req.body.registration_deadline.split("/");
      var registration_deadline = new Date(parseInt(registration_deadline_para[2]), parseInt(registration_deadline_para[0])-1, parseInt(registration_deadline_para[1]), 0, 0, 0);
      var description = req.body.description
      var max = parseInt(req.body.max)
      var min = parseInt(req.body.min)
    var fields = {
        host:host,
        name:event_name,
        start_date:start_date,
        end_date:end_date,
        registration_deadline:registration_deadline,
        description:description,
        max:max,
        min:min
    }
    console.log(fields)
      if(!(host&&event_name&&start_date&&end_date&&description&&max&&min&&registration_deadline)){
        res.json({
          success:false,
          message:"infomation not completed"
        })
        return
      }
      var fields = {
        host:host,
        name:event_name,
        start_date:start_date,
        end_date:end_date,
        registration_deadline:registration_deadline,
        description:description,
        max:max,
        min:min
      }
      console.log(fields)
      Event1.add(fields,function(error,event){
        if(error){
          res.json({
            success:"fail at creating event",
            error:error
          })
          return
        }
        User.findById(req.session.user._id,function(error1,user){
          // User.findById("5a0424d60cb1fa08d9aeaad8",function(error1,user){
          if(error){
            res.json({
              success:false,
              message:"No such user",
              error:error1
            })
            return
          }
          var event_list=user.eventsHosted?user.eventsHosted:[]
          event_list.push(event)
          User.update(user._id,{
            eventsHosted:event_list,
          }, function(error,user2){
            if(error){
              res.json({
                success:"fail at user"
              })
              return
            }
            // req.session.user=user
            res.json({
              success:"success",
              user:user
            })
            return
          })

        })

      })
});

router.post('/api/show_event',function(req, res, next) {
    if(!req.session.user){
      res.json({
        success:false,
        login:false,
        message:"need login",
        error:"need login"
      })
      return
    }

    // User.findByIdWithEvent("5a0424d60cb1fa08d9aeaad8",function(error1,user){
    User.findByIdWithEvent(req.session.user._id,function(error1,user){
        if(error1){
          res.json({
            success:false,
            message:"No such user",
            error:error1
          })
          return
        }
        var event_list=user.eventsHosted?user.eventsHosted:[]
        res.json({
          success:"success",
          events:event_list
        })
        return
    })
});
function filterContains(obj,p) {
  var i = p.length;
  while (i--) {
      if(typeof p[i] == 'string'){
        if (strContains(p[i].toLowerCase(),obj.toLowerCase())) {
            return true;
        }
      }else{
        if (p[i] == obj) {
            return true;
        }
      }

  }
  return false;
}
function strContains(p,obj){
  if(typeof obj != 'string'||typeof p != 'string'){
    return false
  }
  var a = obj.toLowerCase();
  var b = p.toLowerCase()


  if (a.indexOf(b) !== -1|| b.indexOf(a) !== -1){

    return true
  }
  return false;
}

router.post('/api/search_event', Event1.middleware.loadAll,function(req, res, next) {
    if(!req.body.query){
      if(req.events){
        res.json({
          success:"success",
          events:req.events
        })
        return
      }
    }
    if(req.events){
        var event_list=req.events.filter(function(p){
          return strContains(p.host,req.body.query)||strContains(p.name,req.body.query)
        })
        res.json({
          success:"success",
          events:event_list
        })
        return
    }
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
          login:false,
          message:"no such user",
          error:"no such user"
        })
        return
      }
      console.log(req.credential)
      console.log(req.body.password)
      if(req.credential.password ==password){
        req.session.user=req.user
        res.json({
          success:true,
          user:req.user
        })
        return
      }else{
        res.json({
          success:false,
          login:true,
          message:"password wrong",
          error:"password wrong"
        })
        return
      }
      console.log(fields)
});
router.post('/api/create_profile', function(req, res, next) {

      var name = req.body.name
      var skills=  req.body.skills
      var resume = req.body.resume
      var bio = req.body.bio
      if(!(name&&skills&&resume&&bio)){
        res.json({
          success:false,
          message:"infomation not completed",
          error:"infomation not completed"
        })
        return
      }


      var fields = {
        name : req.body.name,
        skills:  req.body.skills,
        resume : req.body.resume,
        bio : req.body.bio
      }
      if(!req.session.user){
        res.json({
          success:false,
          login:false,
          message:"need login",
          error:"need login"
        })
        return
      }
      Profile.add(fields,function(error,pro){
        if(error){
          res.json({
            success:"fail at pro"
          })
          return
        }
        console.log(req.session)
        console.log(req.session.user._id)
        User.update(req.session.user._id,{
          profile:pro.id,
        }, function(error,user){
          if(error){
            res.json({
              success:"fail at user"
            })
            return
          }
          // req.session.user=user
          res.json({
            success:"success",
            user:user
          })
          return
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
  var fields2 = {
    username:"David",
    email:"123456@gmail.com",
    password:"123456"
  }
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
router.get('/logout', function(req, res, next) {
  if (req.session.user){
    console.log("in the logout route!!!\n")
    req.session.user = null;
    res.redirect('/')
  }
})
router.post('/username', function(req, res, next) {
  if (req.session.user){
    res.json({
      success:"success",
      user:req.session.user
    })
  }else{
    res.json({
      success:false,
      user:null
    })
  }
})

router.post('/api/view_team', function(req, res, next) {
  if (!req.session.user){

    res.json({
      success:false,
      message:"login first"
    })
    return
  }
  if (!req.body.event_id){
    res.json({
      success:false,
      message:"Need event id."
    })
    return
  }
  Team.findByEventIdAndUseId(req.body.event_id,req.session.user._id,function(error,team){
    if(error||!team){
      res.json({
        success:false,
        message:"No team found."
      })
    }else{
      
      res.json({
        success:"success",
        team:team
      })
    }
  })
})

router.post('/api/user_teams', function(req, res, next) {
  if (!req.session.user){
    res.json({
      success:false,
      message:"No team found."
    })
    return
  }
  Team.findByUserId(req.session.user._id,function(error,teams){
    if(error||!teams){
      res.json({
        success:false,
        message:"No team found."
      })
    }else{
      res.json({
        success:"success",
        teams:teams
      })
    }
  })
})

router.post('/api/edit_team', function(req, res, next) {
  if (!req.session.user){
    console.log("in the logout route!!!\n")
    res.json({
      success:false,
      message:"Not logged in."
    })
    return
  }
  if (!req.body.event_id){
    res.json({
      success:false,
      message:"Need event id."
    })
  }
  Team.findByEventIdAndUseId(req.body.event_id,req.session.user._id,function(error,team){
    if(error||!team){
      res.json({
        success:false,
        message:"No team found."
      })
    }else{
      let skillsOwnedNew = req.body.skillsOwned?req.body.skillsOwned:(team.skillsOwned?team.skillsOwned:[]);
      let skillsPreferedNew = req.body.skillsPrefered?req.body.skillsPrefered:(team.skillsPrefered?team.skillsPrefered:[]);
      let skillsRequiredNew = req.body.skillsRequired?req.body.skillsRequired:(team.skillsRequired?team.skillsRequired:[]);
      let projectName = req.body.projectName?req.body.projectName:(team.projectName?team.projectName:'N/A');
      let projectPlan = req.body.projectPlan?req.body.projectPlan:(team.projectPlan?team.projectPlan:'N/A');
      const fields={
        skillsOwned : skillsOwnedNew,
        skillsPrefered : skillsPreferedNew,
        skillsRequired : skillsRequiredNew,
        projectName : projectName,
        projectPlan : projectPlan,
      }

      console.log(fields);
      Team.update(team._id,fields,function(error){
        if(error){
          res.json({
            success:false,
            message:"Team update failed."
          })
        }else{
          res.json({
            success:"success",
          })
        }
      })
    }
  })
})


router.post('/api/join_event', Event1.middleware.loadOfId,Team.middleware.loadAll,function(req, res, next) {
  console.log("calling api")
  // console.log(req.session.user)
  // console.log(req.teams)
  if(!req.session.user){
    res.json({
      success:false,
      login:false,
      message:"Need login first."
    })
    return
  }
  if(!req.event){
    res.json({
      success:false,
      message:"Cannot find that event"
    })
    return
  }
  User.findById(req.session.user,function(error1,account){
    if(error1){
      res.json({
        success:false,
        message:"user not found"
      })
    }else{
      console.log(account)
      var check = false
      if(account.eventsJoined){
        account.eventsJoined.forEach(function (eve) {
          console.log(eve)
          console.log(req.event._id)
          console.log(eve==req.event._id)
          if(JSON.stringify(eve)==JSON.stringify(req.event._id)){
           check=true;
          }
        })
      }
      if(check){
        res.json({
          success:false,
          message:"already in that event"
        })
        return
      }
      var field = {
        members:[req.session.user._id],
        event:req.event
      }
      Team.add(field,function(error,Tea){
        if(error){
          res.json({
            success:false,
            message:"team added fail"
          })
        }else{
          console.log(Tea)

          var newTeams = req.event.teams?req.event.teams:[]
          newTeams.push(Tea._id)
          console.log("new teams")
          console.log(newTeams)
          var fields = {
            teams:newTeams
          }
          Event1.update(req.event._id, fields, function(error){
            if(error){
              console.log("failed")
              res.json({
                success:false,
                message:"event updated fail"
              })
            }else{
              var joinEvents = account.eventsJoined?account.eventsJoined:[]
              joinEvents.push(req.event._id)
              User.update(req.session.user,{
                  eventsJoined:joinEvents
                },
                function(error1){
                  if(error1){
                    res.json({
                      success:false,
                      message:"user update failed"
                    })
                  }else{
                    res.json({
                      success:"success",
                    })
                  }
                })
            }
          })
        }
      })
    }
  })
  // res.send('respond with a resource');
});

router.post('/give_team/:event_id',Team.middleware.loadOfEvent,function(req,res,next){
  Team.findById(req.body.team_id,function(error,team){
    if(error||!team){
      res.json({
        success:false,
        message:"Your team has changed,refresh the page and check your team setting"
      })
      return
    }else{
      console.log(req.teams);
      var teamPool=team.teamMatchingPool?team.teamMatchingPool:[JSON.stringify(req.body.team_id)]
      var teams = req.teams
      var target = []
      var required = team.skillsRequired
      teams.forEach(function(ttt){
        var good = true;
        required.forEach(function(skill){
          if(!filterContains(skill,ttt.skillsOwned)){
            good =false
          }
        })
        if(!filterContains(ttt._id,teamPool)&&good){
          target.push(ttt)
        }
      })
      if(target.length!=0){
        res.json({
          success:"success",
          target_team:target[0]
        })
        return
      }
      if(teamPool==[JSON.stringify(req.body.team_id)]){
        res.json({
          success:false,
          message:"No teams satisfy your requirement"
        })
        return
      }
      Team.update(req.body.team_id,{
        teamMatchingPool:[]
      },function(error){
        if(error){
          res.json({
            success:false,
            message:"team update failed"
          })
          return
        }else{
          res.json({
            success:false,
            message:"All team searched, refresh to check from start"
          })
        }
      })
    }
  })
})

router.post('/team_matched', Event1.middleware.loadOfId,function(req, res, next) {
  if(!req.session.user){
    res.json({
      success:false,
      login:false,
      message:"Need login first."
    })
  }

  if(!req.event){
    res.json({
      success:false,
      message:"Cannot find that event"
    })
  }
  Team.findById(req.body.team1,function(error,team){
    if(error){
      res.json({
        success:false,
        message:" This match failed. You team just updated, check it!"
      })
    }else{
      Team.findById(req.body.team2,function(error,team2){
        if(error){
          res.json({
            success:false,
            message:" This match failed. You team just updated, check it!"
          })
        }else{
          var matched = false;
          var accepted1 = team.teamAccepted?team.teamAccepted:[]
          var accepted2 = team2.teamAccepted?team2.teamAccepted:[]
          if(filterContains(team._id,accepted2)||filterContains(team2._id,accepted1)){
            matched=true
          }
          if(!matched){

          }
          var members = team1.members
          team2.members.forEach(function(one){
            members.push(one)
          })
          var newSkillsOwned = team1.skillsOwned?team1.skillsOwned:[]
          if(team2.skillsOwned){
            team2.skillsOwned.forEach(function(skill){
              if(!filterContains(skill,newSkillsOwned)){
                newSkillsOwned.push(skill)
              }
            })
          }
          var newSkillsPrefered = team1.skillsPrefered?team1.skillsPrefered:[]
          if(team2.skillsPrefered){
            team2.skillsPrefered.forEach(function(skill){
              if(!filterContains(skill,newskillsPrefered)){
                newSkillsPrefered.push(skill)
              }
            })
          }
          var newSkillsRequired = team1.skillsRequired?team1.skillsRequired:[]
          if(team2.skillsRequired){
            team2.skillsRequired.forEach(function(skill){
              if(!filterContains(skill,newSkillsRequired)){
                newSkillsRequired.push(skill)
              }
            })
          }
          var projectName = "N/A"
          if(team1.projectName){
            projectName = team1.projectName
          }
          if(team2.projectName){
            projectName = team2.projectName
          }

          var projectPlan = "N/A"
          if(team1.projectPlan){
            projectPlan = team1.projectPlan
          }
          if(team2.projectPlan){
            projectPlan = team2.projectPlan
          }
          var fields={
            members:members,
            event:team2.event,
            skillsOwned:skillsOwned,
            skillsPrefered:newSkillsPrefered,
            skillsRequired:newSkillsRequired,
            projectName:projectName,
            projectPlan:projectPlan
          }
          Team.add(field,function(error,Tea){
            if(error){
              res.json({
                success:false,
                message:"team added fail"
              })
            }else{
              Team.remove(team1.id,function(error){
                if(error){
                  res.json({
                    success:false,
                    message:"team1 removed fail"
                  })
                }else{
                  Team.remove(team2.id,function(error){
                    if(error){
                      res.json({
                        success:false,
                        message:"team2 removed fail"
                      })
                    }else{
                      var teams =req.event.teams
                      teams = teams.filter(function(p){
                          return (p!=team1&&p.id!=team1)&&(p!=team2||p.id!=team2)
                      })
                      teams.push(Tea)

                      Event1.update(req.event.id,{
                        teams:teams
                      },function(error, one){
                        res.json({
                          success:"success",
                        })
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
  var field = {
    members:[req.user.id],
    event:req.event
  }
  Team.add(field,function(error,Tea){
    if(error){
      res.json({
        success:false,
        message:"team added fail"
      })
    }else{
      var teams = req.event.teams?req.event.teams:[]
      Event1.update(req.event.id,{
        teams:teams
      },function(error, one){
        res.json({
          success:"success",
        })
      })
    }
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
