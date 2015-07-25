'use strict';
var socketio = require('socket.io');
var io = null;
var roomsModel = require("../db/models/rooms.js");

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        // Now have access to socket, wowzers!
        socket.on("noteAdded", function(note) {
            socket.broadcast.emit("addNote", note);
    	});
    	socket.on("stuffChanged", function (data) {
    		socket.broadcast.emit("changedStuff", data);
    	});
    });


    
    
    return io;

};
