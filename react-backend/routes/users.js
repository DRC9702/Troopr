var express = require('express');
var router = express.Router();
var Profile = require('../schema/Profile')
var User = require('../schema/User')

/* GET users listing. */
// router.get('/', function(req, res, next) {
// 	var fields = {
// 		skill:"ooo",
//   		resume: "dwqd",
//   		bio: "Dwqwqdqwd",
//   	s	links: "dwqdqwdqw",
// 	}
// 	Profile
//   res.send('respond with a resource');
// });
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

module.exports = router;
