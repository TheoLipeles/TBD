app.factory('DrumFactory', function () {
	var sequence = new Array(16);
	for(var i = sequence.length - 1; i >= 0; i --) {
		sequence[i] = [];
	}
	console.log(sequence);
	var nTon = {
		3: "G4",
		2: "E4",
		1: "D4",
		0: "C4"
	}
	function mapNumberToNote (n) {
		return nTon[n];
	}

	return {
		initializeToneAndSynth: function () {
			//loop Transport
			Tone.Transport.loopEnd = "4:0:0";
			Tone.Transport.loop = true;

			//create polysynth
			var drum = new Tone.DrumSynth().toMaster();

			//set interval to loop over every quarternote and play correct sounds
			Tone.Transport.setInterval(function () {
				//get position to figure out what sub Array to play
				var pArr = Tone.Transport.position.split(':');
				var arrIndex = (parseInt(pArr[0])*4) + (parseInt(pArr[1]));
				var prevIndex = arrIndex - 1;
				//add class
				if(prevIndex === -1) {
					prevIndex = 15;
				}
				//update DOM
				document.getElementById(prevIndex).classList.remove('live');
				document.getElementById(arrIndex).classList.add('live');
				//play the array of notes at the correct index of sequence
				drum.triggerAttackRelease(sequence[arrIndex], "4n");
				console.log(Tone.Transport.position, sequence[arrIndex]);
			}, "4n");

			return drum;
		},
		addNoteToSequence: function(seqIndex, noteNum) {
			sequence[seqIndex].push(mapNumberToNote(noteNum));
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
		}
	}
});