
app.factory('SequenceFactory', function (HomeFactory, $stateParams, $rootScope) {
	var sequence = new Array(16);
	HomeFactory.joinRoom($stateParams.roomName).then(function(room) {
		sequence = room.sequence;
	});
	var poly = new Tone.PolySynth(6, Tone.MonoSynth);

	var pingPong = new Tone.PingPongDelay('1m', 0.2);
	var chorus = new Tone.Chorus(4, 0.25, 0.7).toMaster();
	poly.connect(pingPong);
	pingPong.connect(chorus);

	var nTon = {
		11:"G1",
		10:"A8",
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
			Tone.Transport.bpm.value = 200;

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
				var prevEl = document.getElementById(arrIndex);
				document.getElementById(arrIndex).classList.add('live');
				//play the array of notes at the correct index of sequence
				// poly.triggerRelease(sequence[prevIndex]);
				// poly.triggerAttack(sequence[arrIndex]);
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
		updateSynth: function(obj) {
			poly.set(obj);
		},
		effectsWetness: function(effect, value) {
			if(effect === "pingPong") {
				pingPong.wet.value = 0;
			}
		},
		syncSequence: function(sequence) {
			Tone.sequence = sequence;
		},
		mapNumberToNote: function(n) {
			return mapNumberToNote(n);
		}
	};
});