var rooms = [];


function Room(name) {
	this.population = 0;
	this.link = "/rooms/" + name;
	this.name = name;
}

Room.prototype.isFull = function() {
	return this.population === 5;
};

var initializeRooms = function() {
	for (var i = 1; i <= 5; i++) {
		rooms.push(new Room("Room" + i));
	}
	return rooms;
};

module.exports = {
	rooms: rooms,
	intializeRooms: initializeRooms
};