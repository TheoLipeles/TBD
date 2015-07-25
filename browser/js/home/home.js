app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeController'
    });
});

app.controller('homeController', function ($scope, SequenceFactory) {
	$scope.synth = SequenceFactory.initializeToneAndSynth();

	window.setTimeout(function () {
		console.log('In HERE');
		SequenceFactory.addNoteToSequence(0, 9);
		SequenceFactory.addNoteToSequence(1, 6);
		SequenceFactory.addNoteToSequence(3, 4);
		SequenceFactory.addNoteToSequence(4, 9);
		SequenceFactory.addNoteToSequence(6, 2);
		SequenceFactory.addNoteToSequence(7, 5);
		SequenceFactory.addNoteToSequence(8, 9);
		SequenceFactory.addNoteToSequence(10, 5);
		SequenceFactory.addNoteToSequence(11, 5);
		SequenceFactory.addNoteToSequence(12, 9);
		SequenceFactory.addNoteToSequence(13, 5);
		SequenceFactory.addNoteToSequence(14, 3);
		SequenceFactory.addNoteToSequence(15, 1);

		//play
		window.setTimeout(function () {
			console.log('In HERElfkdjhaslkdjfhas');
			SequenceFactory.startSequence();
				window.setTimeout(function () {
					SequenceFactory.removeNoteFromSequence(0, 9);	
			},2000);
		},2000);
	}, 4000);
});