var rooms = [];


function Room(name) {
	this.population = 0;
	this.link = "/rooms/" + name;
	this.name = name;
	this.sequence = new Array(16);

	for(var i = this.sequence.length - 1; i >= 0; i --) {
		this.sequence[i] = [];
	}
}

Room.prototype.isFull = function() {
	return this.population === 5;
};

Room.prototype.getBoxById = function(id) {
	for (var box = 0; box < this.boxes.length; box++) {
		if (this.boxes[box].id === id) {
			return this.boxes[box];
		}
	}
};

var initializeRooms = function() {
	for (var i = 1; i <= 5; i++) {
		rooms.push(new Room(i));
	}
	return rooms;
};

module.exports = {
	rooms: rooms,
	intializeRooms: initializeRooms
};