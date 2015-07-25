var keyMap = {
    97: "C4",
    119: "C#4",
    115: "D4",
    101: "D#4",
    100: "E4",
    102: "F4",
    116: "F#4",
    103: "G4",
    121: "G#4",
    104: "A4",
    117: "A#4",
    106: "B4",
    107: "C5",
    111: "C#5",
    108: "D5",
    112: "D#5",
    59: "E5",
    39: "F5"
};
    
var solo = new Tone.MonoSynth().toMaster() 

app.controller('soloCtrl', function(){

    document.onkeypress = function (e) {
         e = e || window.event;
        solo.triggerAttack(keyMap[e.keyCode])
    };

    document.onkeyup = function(e) {
        solo.triggerRelease(keyMap[e.keyCode])
    };

})
