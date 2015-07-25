	app.factory('SequenceFactory', function (HomeFactory, $stateParams) {
	var sequence;
	HomeFactory.joinRoom($stateParams.roomName).then(function(room) {
		sequence = room.sequence;
	});

	var nTon = {
		9: "A2",
		8: "C3",
		7: "D3",
		6: "E3",
		5: "G3",
		4: "A3",
		3: "C4",
		2: "D4",
		1: "E4",
		0: "G4"
	};
	function mapNumberToNote (n) {
		return nTon[n];
	}

	return {
		initializeToneAndSynth: function () {
			//loop Transport
			Tone.Transport.loopEnd = "4:0:0";
			Tone.Transport.loop = true;

			//create polysynth
			var poly = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();

			//set interval to loop over every quarternote and play correct sounds
			Tone.Transport.setInterval(function () {
				//get position to figure out what sub Array to play
				var pArr = Tone.Transport.position.split(':');
				var arrIndex = (parseInt(pArr[0])*4) + (parseInt(pArr[1]));
				var prevIndex = arrIndex - 1;
				//add class
				if(!prevIndex) {
					prevIndex = 15;
				}
				var prevEl = document.getElementById(arrIndex);
				document.getElementById(arrIndex).classList.add('live');
				//play the array of notes at the correct index of sequence
				poly.triggerAttackRelease(sequence[arrIndex], "4n");
				console.log(Tone.Transport.position, sequence[arrIndex]);
			}, "4n");

			return poly;
		},
		addNoteToSequence: function(seqIndex, noteNum) {
			var note = mapNumberToNote(noteNum);
			console.log(seqIndex);
			seqIndex = parseInt(seqIndex);
			console.log(typeof(seqIndex), seqIndex);
			sequence[seqIndex].push(note);
		},
		removeNoteFromSequence: function (seqIndex, noteNum) {
			for(var i = 0; i < sequence[seqIndex].length; i++) {
				if(sequence[seqIndex][i] === mapNumberToNote(noteNum)) {
					sequence[seqIndex].splice(i, 1);
					return true;
				}
			}
			return "ERROR REMOVING FROM SEQUENCE";
		},
		startSequence: function () {
			Tone.Transport.start();
		},
		stopSequence: function () {
			Tone.Transport.stop();
		},
		syncSequence: function(sequence) {
			Tone.sequence = sequence;
		},
		mapNumberToNote: function(n) {
			return mapNumberToNote(n);
		}
	};
});