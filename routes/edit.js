var express = require('express');
var router = express.Router();

/* GET edit page. */
router.get('/account', function(req, res) {
	var exampleUser = {
		email: 'email@email.com',
		fName: 'Sean',
		lName: 'Durban',
		subscribed : false
	};
	res.render('editAcc', {user:exampleUser });
});
router.get('/password', function(req, res) {
	res.render('changePassword',{});
});

//Handle POST
router.post('/password', function(req,res){
	console.log(req.body);
	res.sendStatus(200);
});
module.exports = router;
