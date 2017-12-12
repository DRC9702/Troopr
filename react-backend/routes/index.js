const express = require('express');

const router = express.Router();
const User = require('../schema/User');
const Event1 = require('../schema/Event');
const Team = require('../schema/Team');
const Profile = require('../schema/Profile');
const credential = require('../schema/Credential');

/* GET home page. */
router.get('/api', User.middleware.loadAll, (req, res) => {
  res.json({
    user: req.users,
  });
});

router.get('/apiT', Team.middleware.loadAll, (req, res) => {
  res.json({
    user: req.teams,
    length: req.teams.length,
  });
});

router.post('/api/profile', User.middleware.loadOfLog, (req, res) => {
  console.log(req.session.user);
  if (!req.session.user) {
    res.json({
      success: false,
      login: false,
      message: 'login plz',
      error: 'login plz',
    });
    return;
  }
  if (req.user.profile) {
    res.json({
      success: true,
      name: req.user.profile.name,
      skills: req.user.profile.skills,
      resume: req.user.profile.resume,
      bio: req.user.profile.bio,
    });
  } else {
    res.json({
      success: false,
      message: 'no profile for now',
      error: 'no profile for now',
    });
  }
});

router.post('/api/edit_profile', User.middleware.loadOfLog, (req, res) => {
  // router.post('/api/edit_profile', function(req, res, next) {
  console.log(req.body);
  if (!req.session.user) {
    res.json({
      success: false,
      login: false,
      message: 'login plz',
      error: 'login plz',
    });
    return;
  }
  if (req.user.profile) {
    const newName = req.body.name ? req.body.name : req.user.profile.name;
    const newSkills = req.body.skills ? req.body.skills : req.user.profile.skills;
    const newResume = req.body.resume ? req.body.resume : req.user.profile.resume;
    const newBio = req.body.bio ? req.body.bio : req.user.profile.bio;
    const fields = {
      name: newName,
      skills: newSkills,
      resume: newResume,
      bio: newBio,
    };
    Profile.update(req.user.profile._id, fields, (error) => {
      if (error) {
        res.json({
          success: false,
          message: 'update failed',
        });
      } else {
        res.json({
          success: 'success',
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: 'no profile for now',
      error: 'no profile for now',
    });
  }
});


router.post('/api/create_account', User.middleware.loadAll, (req, res) => {
  const { email, username, password } = req.body;
  if (!(email && username && password)) {
    res.json({
      success: false,
      message: 'infomation not completed',
    });
    return;
  }
  const fields = {
    username,
    email,
    password,
  };
  console.log(fields);
  credential.add(fields, (error, cre) => {
    if (error) {
      if (error.code === '11000') {
        res.json({
          success: false,
          message: 'email already used',
          error,
        });
        return;
      }
      res.json({
        success: 'fail at cre',
        error,
      });
      return;
    }
    User.add({
      profile: null,
      credential: cre.id,
    }, (error1, user) => {
      if (error1) {
        res.json({
          success: false,
          message: 'user created fail',
          error: error1,
        });
        console.log(error1);
        return;
      }
      // console.log(req.session)
      req.session.user = user;
      console.log(req.session);

      res.json({
        success: 'success',
        user,
      });
    });
  });
});

router.post('/api/create_event', (req, res) => {
  if (!req.session.user) {
    res.json({
      success: false,
      login: false,
      message: 'need login',
      error: 'need login',
    });
    return;
  }
  console.log(req.body);
  const host = req.session.user;
  // var host= "5a0424d60cb1fa08d9aeaad8"
  const { eventName } = req.body;
  const startDatePara = req.body.startDate.split('/');
  const startDate = new Date(parseInt(startDatePara[2], 10), parseInt(startDatePara[0], 10) - 1, parseInt(startDatePara[1], 10), 0, 0, 0);
  const endDatePara = req.body.endDate.split('/');
  const endDate = new Date(parseInt(endDatePara[2], 10), parseInt(endDatePara[0], 10) - 1, parseInt(endDatePara[1], 10), 0, 0, 0);
  const registrationDeadlinePara = req.body.registrationDeadline.split('/');
  const registrationDeadline = new Date(parseInt(registrationDeadlinePara[2], 10), parseInt(registrationDeadlinePara[0], 10) - 1, parseInt(registrationDeadlinePara[1], 10), 0, 0, 0);
  const { description } = req.body;
  const max = parseInt(req.body.max, 10);
  const min = parseInt(req.body.min, 10);
  if (!(host && eventName && startDate && endDate && description && max && min && registrationDeadline)) {
    res.json({
      success: false,
      message: 'infomation not completed',
    });
    return;
  }
  const fields = {
    host,
    name: eventName,
    startDate,
    endDate,
    registrationDeadline,
    description,
    max,
    min,
  };
  console.log(fields);
  Event1.add(fields, (error, event) => {
    if (error) {
      res.json({
        success: 'fail at creating event',
        error,
      });
      return;
    }
    User.findById(req.session.user._id, (error1, user) => {
      // User.findById("5a0424d60cb1fa08d9aeaad8",function(error1,user){
      if (error) {
        res.json({
          success: false,
          message: 'No such user',
          error: error1,
        });
        return;
      }
      const eventList = user.eventsHosted ? user.eventsHosted : [];
      eventList.push(event);
      User.update(user._id, {
        eventsHosted: eventList,
      }, (error2) => {
        if (error2) {
          res.json({
            success: 'fail at user',
          });
          return;
        }
        // req.session.user=user
        res.json({
          success: 'success',
          user,
        });
      });
    });
  });
});

router.post('/api/show_event', (req, res) => {
  if (!req.session.user) {
    res.json({
      success: false,
      login: false,
      message: 'need login',
      error: 'need login',
    });
    return;
  }

  // User.findByIdWithEvent("5a0424d60cb1fa08d9aeaad8",function(error1,user){
  User.findByIdWithEvent(req.session.user._id, (error1, user) => {
    if (error1) {
      res.json({
        success: false,
        message: 'No such user',
        error: error1,
      });
      return;
    }
    const eventList = user.eventsHosted ? user.eventsHosted : [];
    res.json({
      success: 'success',
      events: eventList,
    });
  });
});

function strContains(p, obj) {
  if (typeof obj !== 'string' || typeof p !== 'string') {
    return false;
  }
  const a = obj.toLowerCase();
  const b = p.toLowerCase();


  if (a.indexOf(b) !== -1 || b.indexOf(a) !== -1) {
    return true;
  }
  return false;
}

function filterContains(obj, p) {
  let i = p.length;

  // I hate you Chy and your bad code. Love this code so much.
  while (i--) { // eslint-disable-line no-plusplus
    if (typeof p[i] === 'string') {
      if (strContains(p[i].toLowerCase(), JSON.stringify(obj).toLowerCase())) {
        return true;
      }
    } else if (p[i] === obj) {
      return true;
    }
  }
  return false;
}

router.post('/api/search_event', Event1.middleware.loadAll, (req, res) => {
  if (!req.body.query) {
    if (req.events) {
      res.json({
        success: 'success',
        events: req.events,
      });
      return;
    }
  }
  if (req.events) {
    const eventList = req.events.filter(p => strContains(p.host, req.body.query) || strContains(p.name, req.body.query));
    res.json({
      success: 'success',
      events: eventList,
    });
  }
});

router.post('/api/sign_in', credential.middleware.loadOfEmail, User.middleware.loadOfCre, (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.json({
      success: false,
      message: 'infomation not completed',
      error: 'infomation not completed',
    });
    return;
  }

  if (!req.credential) {
    res.json({
      success: false,
      login: false,
      message: 'no such user',
      error: 'no such user',
    });
    return;
  }
  console.log(req.credential);
  console.log(req.body.password);
  if (req.credential.password === password) {
    req.session.user = req.user;
    res.json({
      success: true,
      user: req.user,
    });
    return;
  }
  res.json({
    success: false,
    login: true,
    message: 'password wrong',
    error: 'password wrong',
  });
});
router.post('/api/create_profile', (req, res) => {
  const {
    name,
    skills,
    resume,
    bio,
  } = req.body;
  if (!(name && skills && resume && bio)) {
    res.json({
      success: false,
      message: 'infomation not completed',
      error: 'infomation not completed',
    });
    return;
  }


  const fields = {
    name: req.body.name,
    skills: req.body.skills,
    resume: req.body.resume,
    bio: req.body.bio,
  };
  if (!req.session.user) {
    res.json({
      success: false,
      login: false,
      message: 'need login',
      error: 'need login',
    });
    return;
  }
  Profile.add(fields, (error, pro) => {
    if (error) {
      res.json({
        success: 'fail at pro',
      });
      return;
    }
    console.log(req.session);
    console.log(req.session.user._id);
    User.update(req.session.user._id, {
      profile: pro.id,
    }, (error1, user) => {
      if (error1) {
        res.json({
          success: 'fail at user',
        });
        return;
      }
      // req.session.user=user
      res.json({
        success: 'success',
        user,
      });
    });
  });
});
router.get('/addProfile', (req, res) => {
  const fields = {
    skill: 'ooo',
    resume: 'dwqd',
    bio: 'Dwqwqdqwd',
    links: 'dwqdqwdqw',
  };
  const fields2 = {
    username: 'David',
    email: '123456@gmail.com',
    password: '123456',
  };
  Profile.add(fields, (error, pro) => {
    if (error) {
      res.json({
        success: 'fail at pro',
      });
    }
    credential.add(fields2, (error1, cre) => {
      if (error1) {
        res.json({
          success: 'fail at cre',
        });
      }
      User.add({
        profile: pro.id,
        credential: cre.id,
      }, (error2, user) => {
        if (error2) {
          res.json({
            success: 'fail at user',
          });
        }
        res.json({
          success: 'success',
          user,
        });
      });
    });
  });
  // res.send('respond with a resource');
});
router.get('/logout', (req, res) => {
  if (req.session.user) {
    console.log('in the logout route!!!\n');
    req.session.user = null;
    res.json({
      success: 'success',
    });
  } else {
    res.json({
      success: false,
    });
  }
});


router.get('/get_name', (req, res) => {
  if (req.session.user) {
    res.json({
      success: 'success',
      name: req.session.user.credential.username,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

router.post('/check_login', (req, res) => {
  if (req.session.user) {
    res.json({
      login: true,
    });
  } else {
    res.json({
      login: false,
    });
  }
});


router.post('/username', (req, res) => {
  if (req.session.user) {
    res.json({
      success: 'success',
      user: req.session.user,
    });
  } else {
    res.json({
      success: false,
      user: null,
    });
  }
});

router.post('/api/view_team', (req, res) => {
  if (!req.session.user) {
    res.json({
      success: false,
      message: 'Need login first.',
    });
    return;
  }
  if (!req.body.event_id) {
    res.json({
      success: false,
      message: 'Need event id.',
    });
  }
  Team.findByEventIdAndUseId(req.body.event_id, req.session.user._id, (error, team) => {
    if (error || !team) {
      res.json({
        success: false,
        message: 'No team found.',
      });
    } else {
      res.json({
        success: 'success',
        team,
      });
    }
  });
});

router.post('/api/user_teams', (req, res) => {
  if (!req.session.user) {
    res.json({
      success: false,
      message: 'Need login first.',
    });
    return;
  }
  Team.findByUserId(req.session.user._id, (error, teams) => {
    if (error || !teams) {
      res.json({
        success: false,
        message: 'No team found.',
      });
    } else {
      res.json({
        success: 'success',
        teams,
      });
    }
  });
});

router.post('/api/edit_team', (req, res) => {
  if (!req.session.user) {
    res.json({
      success: false,
      message: 'Need login first.',
    });
    return;
  }
  if (!req.body.event_id) {
    res.json({
      success: false,
      message: 'Need event id.',
    });
  }
  Team.findByEventIdAndUseId(req.body.event_id, req.session.user._id, (error, team) => {
    if (error || !team) {
      res.json({
        success: false,
        message: 'No team found.',
      });
    } else {
      const skillsOwnedNew = req.body.skillsOwned ? req.body.skillsOwned : (team.skillsOwned ? team.skillsOwned : []);
      const skillsPreferedNew = req.body.skillsPrefered ? req.body.skillsPrefered : (team.skillsPrefered ? team.skillsPrefered : []);
      const skillsRequiredNew = req.body.skillsRequired ? req.body.skillsRequired : (team.skillsRequired ? team.skillsRequired : []);
      const projectName = req.body.projectName ? req.body.projectName : (team.projectName ? team.projectName : 'N/A');
      const projectPlan = req.body.projectPlan ? req.body.projectPlan : (team.projectPlan ? team.projectPlan : 'N/A');
      const fields = {
        skillsOwned: skillsOwnedNew,
        skillsPrefered: skillsPreferedNew,
        skillsRequired: skillsRequiredNew,
        projectName,
        projectPlan,
      };

      console.log(fields);
      Team.update(team._id, fields, (error1) => {
        if (error1) {
          res.json({
            success: false,
            message: 'Team update failed.',
          });
        } else {
          res.json({
            success: 'success',
          });
        }
      });
    }
  });
});


router.post('/api/join_event', Event1.middleware.loadOfId, Team.middleware.loadAll, (req, res) => {
  console.log('calling api');
  // console.log(req.session.user)
  // console.log(req.teams)
  if (!req.session.user) {
    res.json({
      success: false,
      login: false,
      message: 'Need login first.',
    });
    return;
  }
  if (!req.event) {
    res.json({
      success: false,
      message: 'Cannot find that event',
    });
    return;
  }
  User.findById(req.session.user, (error1, account) => {
    if (error1) {
      res.json({
        success: false,
        message: 'user not found',
      });
    } else {
      console.log(account);
      let check = false;
      if (account.eventsJoined) {
        account.eventsJoined.forEach((eve) => {
          console.log(eve);
          console.log(req.event._id);
          console.log(eve === req.event._id);
          if (JSON.stringify(eve) === JSON.stringify(req.event._id)) {
            check = true;
          }
        });
      }
      if (check) {
        res.json({
          success: false,
          message: 'already in that event',
        });
        return;
      }
      const field = {
        members: [req.session.user._id],
        event: req.event,
      };
      Team.add(field, (error, Tea) => {
        if (error) {
          res.json({
            success: false,
            message: 'team added fail',
          });
        } else {
          console.log(Tea);

          const newTeams = req.event.teams ? req.event.teams : [];
          newTeams.push(Tea._id);
          console.log('new teams');
          console.log(newTeams);
          const fields = {
            teams: newTeams,
          };
          Event1.update(req.event._id, fields, (error2) => {
            if (error2) {
              console.log('failed');
              res.json({
                success: false,
                message: 'event updated fail',
              });
            } else {
              const joinEvents = account.eventsJoined ? account.eventsJoined : [];
              joinEvents.push(req.event._id);
              User.update(
                req.session.user, {
                  eventsJoined: joinEvents,
                },
                (error3) => {
                  if (error3) {
                    res.json({
                      success: false,
                      message: 'user update failed',
                    });
                  } else {
                    res.json({
                      success: 'success',
                    });
                  }
                } // eslint-disable-line comma-dangle
                // No clue as to why a comma breaks the code
              );
            }
          });
        }
      });
    }
  });
  // res.send('respond with a resource');
});

router.post('/api/give_team', Team.middleware.loadOfEvent, (req, res) => {
  console.log(req.body);
  Team.findById(req.body.team_id, (error, team) => {
    if (error || !team) {
      res.json({
        success: false,
        message: 'Your team has changed,refresh the page and check your team setting',
      });
    } else {
      const teamPool = team.teamMatchingPool ? ((team.teamMatchingPool.length === 0) ? [req.body.team_id] : team.teamMatchingPool) : [req.body.team_id];
      const { teams } = req;
      const accepted = team.teamAccepted;
      const target = [];
      const required = team.skillsRequired;
      console.log(teamPool);
      teams.forEach((ttt) => {
        let good = true;
        required.forEach((skill) => {
          if (!filterContains(skill, ttt.skillsOwned)) {
            good = false;
          }
        });
        if (!filterContains(ttt._id, teamPool) && !filterContains(ttt._id, accepted) && good && (req.body.team_id != ttt._id)) {
          target.push(ttt);
        }
      });
      if (target.length !== 0) {
        res.json({
          success: 'success',
          target_team: target[0],
        });
        return;
      }
      console.log('no more teams');
      if (teamPool === [req.body.team_id]) {
        console.log('no more teams2');
        res.json({
          success: false,
          message: 'No teams satisfy your requirement',
        });
        return;
      }
      Team.update(req.body.team_id, {
        teamMatchingPool: [],
      }, (error1) => {
        if (error1) {
          res.json({
            success: false,
            message: 'team update failed',
          });
          return;
        }
        console.log('refresh');
        res.json({
          success: false,
          allFound: true,
          message: 'All team searched, refresh to check from start',
        });
      });
    }
  });
});


router.post('/api/reject_team', Team.middleware.loadOfEvent, (req, res) => {
  console.log('in the /api/reject_team');
  Team.findById(req.body.team_id, (error, team) => {
    if (error || !team) {
      res.json({
        success: false,
        message: 'Your team has changed,refresh the page and check your team setting',
      });
    } else {
      // console.log(req.teams);
      const teamPool = team.teamMatchingPool ? team.teamMatchingPool : [req.body.team_id];
      teamPool.push(req.body.reject_team_id);
      console.log(teamPool);
      Team.update(req.body.team_id, {
        teamMatchingPool: teamPool,
      }, (error1) => {
        if (error1) {
          res.json({
            success: false,
            message: 'team updated fail',
          });
        } else {
          Team.findById(req.body.team_id, (error2, team23) => {
            console.log(team23);
            res.json({
              success: true,
            });
          });
          // res.redirect('/'+)
        }
      });
    }
  });
});

router.post('/api/team_matched', Event1.middleware.loadOfId, (req, res) => {
  if (!req.session.user) {
    res.json({
      success: false,
      login: false,
      message: 'Need login first.',
    });
    return;
  }

  if (!req.event) {
    res.json({
      success: false,
      message: 'Cannot find that event',
    });
    return;
  }
  Team.findById(req.body.team1, (error, team1) => {
    if (error || !team1) {
      res.json({
        success: false,
        message: ' This match failed. Your team just updated, check it!',
      });
    } else {
      Team.findById(req.body.team2, (error1, team2) => {
        if (error1 || !team2) {
          res.json({
            success: false,
            message: ' This match failed. The matching team just updated, check it!',
          });
        } else {
          let matched = false;
          const accepted1 = team1.teamAccepted ? team1.teamAccepted : ['N/A'];
          const accepted2 = team2.teamAccepted ? team2.teamAccepted : ['N/A'];
          if (!filterContains(team2._id, accepted1)) {
            accepted1.push(team2._id);
          }
          if (filterContains(team1._id, accepted2) && filterContains(team2._id, accepted1)) {
            matched = true;
          }
          console.log(matched);
          if (!matched) {
            Team.update(team1._id, {
              teamAccepted: accepted1,
            }, (error2) => {
              if (error2) {
                res.json({
                  success: false,
                  message: 'team updated fail',
                });
                return;
              }
              res.json({
                success: false,
                refresh: true,
              });
            });
          } else {
            console.log('why still here');
            const { members } = team1;
            team2.members.forEach((one) => {
              members.push(one);
            });
            const newSkillsOwned = team1.skillsOwned ? team1.skillsOwned : [];
            if (team2.skillsOwned) {
              team2.skillsOwned.forEach((skill) => {
                if (!filterContains(skill, newSkillsOwned)) {
                  newSkillsOwned.push(skill);
                }
              });
            }
            const newSkillsPrefered = team1.skillsPrefered ? team1.skillsPrefered : [];
            if (team2.skillsPrefered) {
              team2.skillsPrefered.forEach((skill) => {
                if (!filterContains(skill, newSkillsPrefered)) {
                  newSkillsPrefered.push(skill);
                }
              });
            }
            const newSkillsRequired = team1.skillsRequired ? team1.skillsRequired : [];
            if (team2.skillsRequired) {
              team2.skillsRequired.forEach((skill) => {
                if (!filterContains(skill, newSkillsRequired)) {
                  newSkillsRequired.push(skill);
                }
              });
            }
            let projectName = 'N/A';
            if (team1.projectName) {
              projectName = team1.projectName; // eslint-disable-line prefer-destructuring
            } else if (team2.projectName) {
              projectName = team2.projectName; // eslint-disable-line prefer-destructuring
            }

            let projectPlan = 'N/A';
            if (team1.projectPlan) {
              projectPlan = team1.projectPlan; // eslint-disable-line prefer-destructuring
            } else if (team2.projectPlan) {
              projectPlan = team2.projectPlan; // eslint-disable-line prefer-destructuring
            }
            const fields = {
              members,
              event: team2.event,
              skillsOwned: newSkillsOwned,
              skillsPrefered: newSkillsPrefered,
              skillsRequired: newSkillsRequired,
              projectName,
              projectPlan,
            };
            Team.add(fields, (error2, Tea) => {
              if (error2) {
                res.json({
                  success: false,
                  message: 'team added fail',
                });
              } else {
                console.log(Tea);
                Team.remove(team1.id, (error3) => {
                  if (error3) {
                    res.json({
                      success: false,
                      message: 'team1 removed fail',
                    });
                  } else {
                    Team.remove(team2.id, (error4) => {
                      if (error4) {
                        res.json({
                          success: false,
                          message: 'team2 removed fail',
                        });
                      } else {
                        let { teams } = req.event;
                        teams = teams.filter((p) => { // eslint-disable-line arrow-body-style
                          return (p !== team1 && p.id !== team1) && (p !== team2 || p.id !== team2);
                        });
                        teams.push(Tea);

                        Event1.update(req.event.id, {
                          teams,
                        }, () => {
                          res.json({
                            success: 'success',
                          });
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    }
  });
});

module.exports = router;
