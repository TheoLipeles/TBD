
// var boxesCount = 16;

// app.factory('boxFactory', function(SequenceFactory){

// 	return{
		

// 	};

// });

// app.controller('sequencerCtrl', function($scope, boxFactory,$interval, SequenceFactory, $stateParams, HomeFactory){
// 	HomeFactory.joinRoom($stateParams.roomName)
// 		.then(function(room) {
// 		});

// 	$scope.boxes = [];
// app.controller('sequencerCtrl', function($scope, boxFactory,$interval, SequenceFactory){
// 	$scope.boxes = [];
// 	for(var i = 0; i < 16; i++){
// 		$scope.boxes[i] = [];
// 		for (var j = 0; j < 12; j++){
// 			$scope.boxes[i].push({id: [i,j], active: false, playing: false})
// 		}
// 	}
// 	$scope.init = function () {
// 		SequenceFactory.initializeToneAndSynth();
// 	}
// 	// $scope.synth = SequenceFactory.initializeToneAndSynth();
// 	$scope.play = function () {
// 		SequenceFactory.startSequence();
// 	}
// 	$scope.stop = function () {
// 		SequenceFactory.stopSequence();
// 	}

// 	$scope.oscTypes = ["sine", "square", "sawtooth", "triangle", "pwm",  "pulse"];
// 	$scope.fltTypes = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"];
// 	$scope.rollOff = [-12, -24, -48];

// 	$scope.uiEnvelope = {
// 			"attack" : 5,
// 			"decay" : 100,
// 			"sustain" : 900,
// 			"release" : 10
// 	}

// 	$scope.pingPong = 500;

// 	$scope.synth = {
// 		"oscillator" : {
// 			"type" : "square"
// 		},
// 		"filter" : {
// 			"Q" : 6,
// 			"type" : "lowpass",
// 			"rolloff" : -24
// 		},
// 		"envelope" : {
// 			"attack" : 0.005,
// 			"decay" : 0.1,
// 			"sustain" : 0.9,
// 			"release" : 0.01
// 		}
// 	}
// 	$scope.updateEnv = function(type) {
// 		console.log('TYPE', $scope.uiEnvelope[type]);
// 		$scope.synth.envelope[type] = $scope.uiEnvelope[type] / 1000;
// 		// SequenceFactory.updateSynth($scope.synth);
// 		$scope.updateSynth();
// 	}
// 	$scope.updateSynth = function () {
// 		// console.log('SYNTH', $scope.uiEnvelope);
// 		console.log('SYNTH', $scope.synth);
// 		SequenceFactory.updateSynth($scope.synth);
// 	}

// 	$scope.updateWet = function(effect) {
// 		SequenceFactory.effectsWetness(effect, $scope.pingPong / 1000 );
// 	}

// 	$scope.chorus = {
// 		"frequency" :1.5,
// 		"delayTime" : 3.5,
// 		"depth" : 0.7,
// 		"feedback" : 0.1,
// 		"type" : "sine"
// 	}

// app.directive('noteBox', function(boxFactory){
// 	return {
// 		restrict: 'E',
// 		link: function(scope,elem,attr){
// 			scope.toggleActive = boxFactory.toggleActive;
// 		},
// 		template: "<div class='noteBox' ng-click='toggleActive()' ng-class='{active: box.active}'></div>"
// 	}
// });


app.directive('sequencer', function(){
	return {
		restrict:'E',
		templateUrl: 'js/sequencer/grid.html'
	};
});
