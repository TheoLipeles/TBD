app.controller('JoinRoomCtrl', function ($scope, HomeFactory, $stateParams){
	$scope.room = {};
	console.log($scope.room);
	HomeFactory.joinRoom($stateParams.roomName)
		.then(function (room) {
			$scope.room = room;
			console.log($scope.room)
			return $scope.room
		});

});