var express = require('express');
var router = express.Router();
var Room = require('../models/room');
/*var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds033966.mlab.com:33966/bakalauradb', ['tasks']);*/

router.use(function(req, res, next) {
    // do logging
    console.log('Kaut kas notiek.');
    next(); // make sure we go to the next routes and don't stop here
});

//Get all tasks
router.get('/rooms', function(req, res, next){
	Room.find(function(err, rooms){
		if (err) {
			res.send(err);
		} else {
			res.json(rooms);
		}
	});
});

//Get users rooms
router.get('/rooms/:userId', function(req, res, next){
	Room.find({ownerId: req.params.userId}, function(err, rooms){
		if (err) {
			res.send(err);
		} else {
			res.json(rooms);
		}
	});
});

//Get a single task
router.get('/room/:id', function(req, res, next){
	Room.findOne({_id: req.params.id}, function(err, room){
		if (err) {
			res.send(err);
		}
		res.json(room);
	});
});

//Save Task
router.post('/room', function(req, res, next){
	var room = new Room();
	room.title = req.body.title;
	room.isPrivate = req.body.isPrivate;
	room.ownerId = req.body.ownerId;

	if (!room.title || !(room.isPrivate + '')) {
		res.status(400);
		res.json({"error":"bad data"});
	} else {
		room.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(room);
		})
	}
});

//Delete task
router.delete('/room/:id', function(req, res, next){
	Room.remove({_id: req.params.id}, function(err, room){
		if (err) {
			res.send(err);
		}
		res.json(room);
	});
});

//Update task
router.put('/room/:id', function(req, res, next){
	//var oldTask = req.body;
	var updRoom = {};

	if (req.body.isPrivate) {
		updRoom.isPrivate = req.body.isPrivate;
	}

	if (req.body.title) {
		updRoom.title = req.body.title;
	}

	if (!updRoom) {
		res.status(400);
		res.json({"error":"bad data"});
	} else {
		Room.findOneAndUpdate({_id: req.params.id}, updRoom, {upsert:true}, function(err, room){
			if (err) {
				res.send(err);
			}
			res.json(room);
		});
	}	
});

module.exports = router;