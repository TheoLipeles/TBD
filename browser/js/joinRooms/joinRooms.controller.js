app.controller('RoomCtrl', function($scope,$interval, SequenceFactory, $stateParams, HomeFactory, $rootScope) {
	$scope.sequencer = {};

	socket.on("addNote", function(note) {
		SequenceFactory.addNoteToSequence(note.id[0], note.id[1]);
		console.log($scope.sequencer.boxes[note.id[0]][note.id[1]]);
		$scope.sequencer.boxes[note.id[0]][note.id[1]].active = true;
		$rootScope.$digest();
	});

	HomeFactory.joinRoom($stateParams.roomName)
		.then(function(room) {
			$scope.sequencer.sequence = room.sequence;
			SequenceFactory.syncSequence(room.sequence);
		});

	$scope.sequencer.boxes = [];

	for(var i = 0; i < 16; i++){
		$scope.sequencer.boxes[i] = [];
		for (var j = 0; j < 10; j++){
			$scope.sequencer.boxes[i].push({id: [i,j], active: false, playing: false});
		}
	}

	$scope.sequencer.init = function () {
		SequenceFactory.initializeToneAndSynth();
	};
	// $scope.sequencer.synth = SequenceFactory.initializeToneAndSynth();
	$scope.sequencer.play = function () {
		SequenceFactory.startSequence();
	};
	$scope.sequencer.stop = function () {
		SequenceFactory.stopSequence();
	};
	// $scope.sequencer.play = function(){
	// 		// console.log($scope.sequencer.boxes)
	// 		var y = 0
	// 		var timer = $interval(function(){
	// 			++y
	// 			for (var x = 0; x < 10; x++){
	// 				if (y===16){
	// 					console.log("hey, listen!")
	// 					y = 0;
	// 				}
	// 				console.log("y=",y)
	// 				// console.log(y,x)
	// 				$scope.sequencer.boxes[y][x].playing = true;

	// 				if ($scope.sequencer.boxes[y-1][x]){
	// 					$scope.sequencer.boxes[y-1][x].playing = false;
	// 				};

					
				
	// 			}
	// 		},200)
	// 	}
	
	$scope.sequencer.toggleActive = function(box) {
		console.log(box);
		console.log("clicked", box.id);
		if (!box.active){
			box.active = true;
			SequenceFactory.addNoteToSequence(box.id[0], box.id[1]);
			socket.emit("noteAdded", {id: box.id, note: SequenceFactory.mapNumberToNote(box.id[0])});
			return true;
		}
		else {
			box.active = false;
			SequenceFactory.removeNoteFromSequence(box.id[0], box.id[1]);
			// socket.emit("noteRemoved", {id: box.id[0], seqIndex: SequenceFactory.mapNumberToNote(box.id[1])});
		}
		return false;
	};
});
