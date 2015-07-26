

app.controller('RoomCtrl', function($scope,$interval, SequenceFactory, $stateParams, HomeFactory, $rootScope) {
	$scope.sequencer = {};

	socket.on("addNote", function(note) {
		SequenceFactory.addNoteToSequence(note.id[0], note.id[1]);
		console.log($scope.sequencer.boxes[note.id[0]][note.id[1]]);
		$scope.sequencer.boxes[note.id[0]][note.id[1]].active = true;
		$rootScope.$digest();
	});


	socket.on("changedStuff", function(data) {
		// synth uiEnvelope
		console.log(data);
		SequenceFactory.updateSynth(data.synth);
		$scope.synth = data.synth;
		$scope.synth.envelope[type] = data.uiEnvelope[type] / 1000;
	});

	HomeFactory.joinRoom($stateParams.roomName)
		.then(function(room) {
			console.log("room joined");
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
	$scope.oscTypes = ["sine", "square", "sawtooth", "triangle", "pwm",  "pulse"];
	$scope.fltTypes = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"];
	$scope.rollOff = [-12, -24, -48];

	$scope.uiEnvelope = {
			"attack" : 5,
			"decay" : 100,
			"sustain" : 900,
			"release" : 10
	};

	$scope.pingPong = 500;

	$scope.synth = {
		"oscillator" : {
			"type" : "square"
		},
		"filter" : {
			"Q" : 6,
			"type" : "lowpass",
			"rolloff" : -24
		},
		"envelope" : {
			"attack" : 0.005,
			"decay" : 0.1,
			"sustain" : 0.9,
			"release" : 0.01
		}
	};
	$scope.updateEnv = function(type) {
		socket.emit("stuffChanged", {synth: $scope.synth, envelope: $scope.uiEnvelope});
		console.log('TYPE', $scope.uiEnvelope[type]);
		$scope.synth.envelope[type] = $scope.uiEnvelope[type] / 1000;
		// SequenceFactory.updateSynth($scope.synth);
		$scope.updateSynth();
	};
	$scope.updateSynth = function () {
		// console.log('SYNTH', $scope.uiEnvelope);
		console.log('SYNTH', $scope.synth);
		SequenceFactory.updateSynth($scope.synth);
		socket.emit("stuffChanged", $scope.synth);
		console.log("stuffChanged");
	};

	$scope.updateWet = function(effect) {
		SequenceFactory.effectsWetness(effect, $scope.pingPong / 1000 );
		// socket.emit("stuffChanged", {synth: $scope.synth, uiEnvelope: $scope.uiEnvelope});
	};

	$scope.chorus = {
		"frequency" :1.5,
		"delayTime" : 3.5,
		"depth" : 0.7,
		"feedback" : 0.1,
		"type" : "sine"
	};
	
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
