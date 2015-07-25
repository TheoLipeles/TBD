
var boxesCount = 16;

app.factory('boxFactory', function(SequenceFactory){

	return{
		toggleActive: function(){
		console.log("clicked",this.box.id)
		if (!this.box.active){
			this.box.active = true;
			SequenceFactory.addNoteToSequence(this.box.id[0], this.box.id[1]);
			return true;
		}
		else {
			this.box.active = false;
			SequenceFactory.removeNoteFromSequence(this.box.id[0], this.box.id[1]);
		}
		return false;
		}
	}

});

app.controller('sequencerCtrl', function($scope, boxFactory,$interval, SequenceFactory){
	$scope.boxes = [];
	for(var i = 0; i < 16; i++){
		$scope.boxes[i] = [];
		for (var j = 0; j < 14; j++){
			$scope.boxes[i].push({id: [i,j], active: false, playing: false})
		}
	}
	$scope.init = function () {
		SequenceFactory.initializeToneAndSynth();
	}
	// $scope.synth = SequenceFactory.initializeToneAndSynth();
	$scope.play = function () {
		SequenceFactory.startSequence();
	}
	$scope.stop = function () {
		SequenceFactory.stopSequence();
	}
	
	$scope.toggleActive = boxFactory.toggleActive
});

app.directive('noteBox', function(boxFactory){
	return {
		restrict: 'E',
		link: function(scope,elem,attr){
			scope.toggleActive = boxFactory.toggleActive;
		},
		template: "<div class='noteBox' ng-click='toggleActive()'>{{box.id}}</br>P:{{box.playing}}</br>A:{{box.active}}</div>"
	}
});

app.directive('sequencer', function(boxFactory){
	return {
		restrict:'E',
		controller: 'sequencerCtrl',
		templateUrl: 'js/sequencer/grid.html'
	}
});
