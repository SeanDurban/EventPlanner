var assert = require('assert');
var Event = require('../models/event');
var mapper = require('../mappers/eventMapper');
var userMapper = require('../mappers/userMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
const ADMIN_EMAIL = 'admin@eventplanner';
const testInvitees = [{email:'test@email.com', state:'pending'},{email:'test2@email.com', state:'accepted'}];
const TEST_EVENT = {
	title:'Test Event', location:'Test Location',
	date:'01/01/2018',description:'test description',event_id:0,
	creators:[],invitees:testInvitees };

describe('eventMapper testing suite', function() {
	before(function(done){
		mongoose.connect(APP_DB);
		userMapper.findUserByEmail(ADMIN_EMAIL, function(err,res) {
			assert.equal(err,null);
			TEST_EVENT.creators = [res[0]._id];
			done();
		});
	});
	var testEventId=-1;

	it('should validate the event model successfully', function(done) {
		var anEvent = new Event(TEST_EVENT);
		anEvent.validate(function(err) {
			assert.equal(err,null);
			done();
		});
	});

	it('Model should be invalid if title is empty', function(done) {
		var anEvent = new Event;
		anEvent.validate(function(err) {
			assert.notEqual(err.errors.title,null);
			done();
		});
	});

	it('should create a new event with correct values', function(done) {
		mapper.createEvent(TEST_EVENT.title,TEST_EVENT.location,TEST_EVENT.date,TEST_EVENT.description,0,
			TEST_EVENT.creators,TEST_EVENT.invitees,function(err,res){
				testEventId = res.event_id;
				assert.equal(err,null);
				assert.equal(res.title,TEST_EVENT.title);
				assert.equal(res.invitees.length, 2);
				assert.equal(res.creators.length, 1);
				done();
			});
	});

	it('should update event details by event_id', function(done) {
		var newEvent = new Event({title:'Updated Title',location:'Updated Location',date:'02/01/2018',description:'Updated description',
			event_id:0,creators:TEST_EVENT.creators,invitees:TEST_EVENT.invitees});
		mapper.updateEventDetailsBy_event_id(testEventId,newEvent,function(err,res){
			assert.equal(err,null);
			assert.equal(res.event_id, testEventId);
			assert.equal(res.title, 'Updated Title');
			assert.equal(res.invitees.length, 2);
			done();
		});
	});

	it('should find updated event details by event_id', function(done) {
		mapper.findEventBy_event_id(testEventId,function(err,res){
			assert.equal(err,null);
			assert.equal(res.event_id, testEventId);
			done();
		});
	});

	it('should remove the test event', function(done){
		mapper.deleteEventByEventId(testEventId, function(err){
			assert.equal(err,null);
			mapper.findEventBy_event_id(testEventId, function(err2,res) {
				assert.equal(res,null);
				done();
			});
		});
	});
});