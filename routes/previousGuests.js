var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');


router.get('/guests',isLoggedIn, isAdminUser, function(req, res) {
	userMapper.allUsers(function(err,result){
		if(err){
			res.send(err);
		}
		
		var filteredResult = result.filter(function(user){
			return (user.eventsAttended.length > 0);
		});

		res.render('previousGuests', {result: filteredResult,err: req.flash('err'),succ: req.flash('succ')});
	});
});

module.exports = router;
