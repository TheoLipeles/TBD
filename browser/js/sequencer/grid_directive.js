
var boxesCount = 16;

// app.factory('boxFactory', function(SequenceFactory){

// 	return{
		

// 	};

// });

// app.controller('sequencerCtrl', function($scope, boxFactory,$interval, SequenceFactory, $stateParams, HomeFactory){
// 	HomeFactory.joinRoom($stateParams.roomName)
// 		.then(function(room) {
// 		});

// 	$scope.boxes = [];

// 	for(var i = 0; i < 16; i++){
// 		$scope.boxes[i] = [];
// 		for (var j = 0; j < 10; j++){
// 			$scope.boxes[i].push({id: [i,j], active: false, playing: false});
// 		}
// 	}

// 	$scope.init = function () {
// 		SequenceFactory.initializeToneAndSynth();
// 	};
// 	// $scope.synth = SequenceFactory.initializeToneAndSynth();
// 	$scope.play = function () {
// 		SequenceFactory.startSequence();
// 	};
// 	$scope.stop = function () {
// 		SequenceFactory.stopSequence();
// 	};
// 	// $scope.play = function(){
// 	// 		// console.log($scope.boxes)
// 	// 		var y = 0
// 	// 		var timer = $interval(function(){
// 	// 			++y
// 	// 			for (var x = 0; x < 10; x++){
// 	// 				if (y===16){
// 	// 					console.log("hey, listen!")
// 	// 					y = 0;
// 	// 				}
// 	// 				console.log("y=",y)
// 	// 				// console.log(y,x)
// 	// 				$scope.boxes[y][x].playing = true;

// 	// 				if ($scope.boxes[y-1][x]){
// 	// 					$scope.boxes[y-1][x].playing = false;
// 	// 				};

					
				
// 	// 			}
// 	// 		},200)
// 	// 	}
	
// 	$scope.toggleActive = boxFactory.toggleActive;
// });

// app.directive('noteBox', function(boxFactory){
// 	return {
// 		restrict: 'E',
// 		scope: true,
// 		link: function(scope,elem,attr){
// 			scope.toggleActive = boxFactory.toggleActive;
// 		},
// 		template: "<div class='noteBox' ng-click='toggleActive()'>{{box.id}}</br>P:{{box.playing}}</br>A:{{box.active}}</div>"
// 	};
// });

app.directive('sequencer', function(){
	return {
		restrict:'E',
		templateUrl: 'js/sequencer/grid.html'
	};
});
