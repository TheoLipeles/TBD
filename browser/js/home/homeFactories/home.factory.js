app.factory('HomeFactory', function ($http) {
	return {
		getAllRooms: function (){
			return $http.get('/rooms')
				.then(function (res) {
					return res.data;
				});
			},
		joinRoom: function (roomName){
			return $http.get('/rooms/' + roomName)
				.then(function (res) {
					return res.data;
				});
		}
		// getRoomBox: function (roomName, id) {
		// 	return $http.post('/rooms/' + roomName + "/boxes", id);
		// }
	};
});