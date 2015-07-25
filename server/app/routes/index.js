'use strict';
var router = require('express').Router();
module.exports = router;
var roomsModel = require("../../db/models/rooms.js");



router.get('/', function(req, res) {
	res.send(roomsModel.rooms);
});

router.get('/:roomName', function(req, res) {
	var sent = false;
	for (var room = 0; room < roomsModel.rooms.length; room++) {
		if (roomsModel.rooms[room].name === req.params.roomName) {
			console.log(roomsModel.rooms[room]);
			res.send(roomsModel.rooms[room]);
			sent = true;
		}
	}
	if (!sent) {
		res.sendStatus(404);
	}
});