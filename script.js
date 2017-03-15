// selectors
var bpmSlide       = gbc('bpm-slide')[0];
var bpmDisplay     = gbc('bpm-display')[0]; 
var playStop       = gbc('playStop')[0];
var note           = gbc('note')[0];
var noteBeatChange = gbc('note-beat-change')[0];
var noteBeatOffset = gbc('beat-offset')[0];
var noteBlock      = gbc('note-block');

// Sounds 
var firstBeat = new Audio('MetroBar1.wav');
var beat      = new Audio('metro_christeck/Metronom%20Taktell%20Junior.wav');

/////////////////
/// METRONOME ///
/////////////////

// BMP Selector
bpmSlide.addEventListener("input", function(){
	var slideValue = this.value;
	bpmDisplay.value = slideValue;
	Metronome.stop()
})

bpmDisplay.addEventListener("input", function(){
	var displayValue = this.value;
	bpmSlide.value = displayValue;
	Metronome.stop();
})

bpmDisplay.addEventListener("focusout", function(){
	var slideValue = bpmSlide.value;
	bpmDisplay.value = slideValue;
	Metronome.stop();
})

// Play / Stop
var metronomeInterval = "";

var Metronome = {

	start : function(){
		var bpm       = bpmSlide.value;
		var interval  = 60000 / bpm;
		var beatCount = 0;

		firstBeat.play();
		beatCount++;
		checkNoteChange(beatCount);
		visualiser(beatCount);

		metronomeInterval = setInterval(function(){
			if(beatCount % 4 == 0){
				firstBeat.play();
				beatCount++;
				checkNoteChange(beatCount);
				visualiser(beatCount);
				
			} else {
				beat.play();
				beatCount++;
				checkNoteChange(beatCount);
				visualiser(beatCount);
				
			}			
		}, interval);
		playStop.innerText = "Stop";
	},

	stop : function(){
		clearInterval(metronomeInterval);
		playStop.innerText = "Play";
	},

	restart : function(){
		this.stop();
		this.start();
	}

}

playStop.addEventListener("click", function(){
	if(this.innerText == "Play"){
		Metronome.start();
	} else if(this.innerText == "Stop"){
		Metronome.stop();
	}
});


/////////////////
///  MODULES  ///
/////////////////

// Note Generator
var notes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];

function getNote(){
	var currentNote = note.innerText;
	do {
		var roll = Math.floor(Math.random() * 12);
		var newNote = notes[roll];
	} while (newNote == currentNote);
	note.innerText = newNote;
}

function checkNoteChange(currentBeat) {
	if(noteBeatChange){
		var userInput = parseInt(noteBeatChange.value);
		var beatOffset = parseInt(noteBeatOffset.value);
		if((currentBeat - beatOffset) % userInput == 1){
			getNote();
		}
	}
	
}

// Visualiser
function clearVisualiser(){
	for(var i = 0; i < 4; i++){
		noteBlock[i].style.backgroundColor = "#505050";
	}
}
function visualiser(currentBeat){
	if(noteBlock[0]){
		if(currentBeat % 4 == 0){
			clearVisualiser();
			noteBlock[3].style.backgroundColor = "#59DCDE";
		} else if (currentBeat % 2 == 0){
			clearVisualiser();
			noteBlock[1].style.backgroundColor = "#59DCDE";
		} else if (currentBeat % 4 == 1){
			clearVisualiser();
			noteBlock[0].style.backgroundColor = "#D83F2B";
		} else {
			clearVisualiser();
			noteBlock[2].style.backgroundColor = "#59DCDE";
		}
	}
}

