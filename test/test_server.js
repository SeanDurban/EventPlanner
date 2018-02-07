var assert = require('assert');
var request = require('request');

describe('Server testing suite', function() {
	it('test if localhost is running', function(done) {
		request('http://localhost:3000', function(error, response) {
			assert.equal(error, null);
			assert.equal(response.statusCode, 200);
			done();
		});
	});
});

describe('Database testing suite', function() {
	//Import the mongoose module
	var mongoose = require('mongoose');
	//Set up default mongoose connection
	var mongoDB = 'mongodb://127.0.0.1/test_eventplanner_db';
	mongoose.connect(mongoDB);

	var User = require('../models/user');

	it('test mongoose is connected ', function(done) {
		assert.equal(mongoose.connection.readyState,1);
		done();
	});
		
	it('User model should be invalid if name is empty', function(done) {
		
		var aUser = new User;
		aUser.validate(function(err) {
			assert.notEqual(err.errors.name,null);
			done();
		});
	});	

	var mapper = require('../mappers/userMapper');

	it('should remove all users from the collection', function(done) {
		
		mapper.deleteAllUsers(function(err){
			assert.equal(err,null);			
			done();		
		});		
	});

	it('should add user to the database without error', function(done) {
		
		mapper.addUser('Seamus','dwyerse@tcd.ie','password','admin',function(err){
			assert.equal(err,null);
			done();
		});		
	});

	it('should add user to the database with correct values ', function(done) {		
		mapper.addUser('Seamus','dwyerse@tcd.ie','password','admin',function(err,res){				
			assert.equal(res.name,'Seamus');
			assert.equal(res.email,'dwyerse@tcd.ie');
			assert.equal(res.password,'password');
			assert.equal(res.type,'admin');
			done();
		});		
	});

	it('should return an error if a required field is empty ', function(done) {		
		mapper.addUser(null,'dwyerse@tcd.ie','password','admin',function(err){				
			assert.notEqual(err,null);
			done();
		});		
	});

	it('should return all users', function(done) {		
		mapper.allUsers(function(err,res){
			assert.equal(err,null);
			assert.equal(res.length,2);
			done();
		});
	});

	it('find previously saved user by name', function(done) {		
		
		mapper.findUserByName('Seamus',function(err,res){
			assert.equal(err,null);
			assert.equal(res[0].name,'Seamus');
			done();
		});

	});

	it('shouldnt find unsaved user by name', function(done) {		
		
		mapper.findUserByName('unsavedUserName',function(err,res){
			assert.equal(res.length,0);
			done();
		});

	});	

	
	it('should update user', function(done) {		
		
		var userObj = new User({name: 'Ben',email: 'ben@ben.ben',password:'benspassword',type:'admin'}); 

		mapper.updateUserByEmail('dwyerse@tcd.ie',userObj,function(err,res){
			assert.equal(userObj.name,res.name);
			assert.equal(userObj.email,res.email);
			assert.equal(userObj.password,res.password);
			assert.equal(userObj.type,res.type);
			done();
		});
	});		
	
});