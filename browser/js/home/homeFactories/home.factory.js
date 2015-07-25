app.factory('HomeFactory', function ($http) {
	return {
		getAllRooms: function (){
			return $http.get('/rooms')
				.then(function (res) {
					return res.data;
				});
			},
		joinRoom: function (roomName){
			console.log(roomName)
			return $http.get('/rooms/' + roomName)
				.then(function (res) {
					console.log(res)
					return res.data;
				});
		}
	};
});