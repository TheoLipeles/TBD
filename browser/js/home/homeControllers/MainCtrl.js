app.controller('MainCtrl', function($scope, HomeFactory) {
	$scope.rooms = [];
	HomeFactory.getAllRooms()
		.then(function (rooms) {
			$scope.rooms = rooms;
		});
});