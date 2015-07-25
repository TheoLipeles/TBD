app.controller('MainCtrl', function($scope, HomeFactory) {
	$scope.rooms = [];
	var socket = io();
	socket.emit("connection");
	HomeFactory.getAllRooms()
		.then(function (rooms) {
			$scope.rooms = rooms;
		});
});