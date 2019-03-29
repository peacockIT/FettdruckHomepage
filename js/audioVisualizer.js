
var audioVisualizer;

var audioCtx, audioSrc, audioAnalyser, bufferLength, dataArray, barWidth;

function AudioVisualizer(src){
	/*this.source = document.createElement("SOURCE");
	this.source.src = src;
	this.source.id = "mp3Source";
	this.source.type = "audio/mpeg";
	document.getElementById("audioplayer").appendChild(this.source);
	*/

	//this.audio = document.createElement("audio");
	this.audio = document.getElementById("audio");
	this.audio.src = src;
	this.audio.load();
	this.audio.play();
	/*
	this.audio.setAttribute("preload", "auto");
	this.audio.setAttribute("controls", "controls");
	//this.audio.style.display = "none";
	document.getElementById("frontLayer").appendChild(this.audio);
	//document.body.appendChild(this.audio);*/
	this.isPlaying = false;

	this.x = 0;
	this.barHeight;



	this.play = function(){
		this.audio.load();
		this.audio.play();
		this.isPlaying = true;
	}
	this.stop = function(){
		this.audio.pause();
		this.isPlaying = false;
	}
	/*
	this.context = new AudioContext();
	this.src = this.context.createMediaElementSource(this.audio);
	this.analyser = this.context.createAnalyser();
	console.log(this.context);

	this.src.connect(this.analyser);
	this.analyser.connect(this.context.destination);

	this.analyser.fftSize = 256;

	this.bufferLength = this.analyser.frequencyBinCount;
	console.log(this.bufferLength);

	this.dataArray = new Uint8Array(this.bufferLength);
	console.log(this.dataArray);
	this.barWidth = (myWidth / this.bufferLength) * 2.5;
	console.log(this.barWidth);
	this.barHeight;
	this.x = 0;*/

	//this.audio.play();
}
//audioVisualizer = new AudioVisualizer("media/audio/176_PressureTalking_128kbps.mp3");



function initializeAudioAnalyser() {
	//create an audio context for browsers (including older webkit)...
	if(window.webkitAudioContext){
		//an older browser which needs to use the webkit audio constructor...
		audioCtx = new window.webkitAudioContext;
	}else{
		//a newer browser which has full support for the audio context...
		audioCtx = new window.AudioContext;
	}

	//create a new analyser...
	audioAnalyser = audioCtx.createAnalyser();
	//create new media source for the audio context...
	audioSrc = audioCtx.createMediaElementSource(audioVisualizer.audio);
	//connect the analyser to the source...
	audioSrc.connect(audioAnalyser);
	//connect audio output device information to the analyser to gather audio frequencies...
	audioAnalyser.connect(audioCtx.destination);
	//let's do this thing (time to animate)...

	renderFrame();
}
//initializeAudioAnalyser();

/*//create an audio context for browsers (including older webkit)...
if(window.webkitAudioContext){
//an older browser which needs to use the webkit audio constructor...
audioContext = new window.webkitAudioContext;
}else{
//a newer browser which has full support for the audio context...
audioContext = new window.AudioContext;
}

//audioContext = new AudioContext();
audioSrc = audioContext.createMediaElementSource(audioVisualizer.audio);
audioAnalyser = audioContext.createAnalyser();

audioSrc.connect(audioAnalyser);
audioAnalyser.connect(audioContext.destination);

audioAnalyser.fftSize = 256;

bufferLength = audioAnalyser.frequencyBinCount;
console.log(bufferLength);

dataArray = new Uint8Array(bufferLength);
console.log(dataArray);
barWidth = (myWidth / bufferLength) * 2.5;
console.log(barWidth);*/

function renderFrame() {
	//clear canvas...
	c.clearRect(0, 0, myWidth, myHeight);

	//create new frequency array map...
	dataArray = new Uint8Array(audioAnalyser.frequencyBinCount);
	console.log(dataArray);
	//input frequency data into the array map...
	audioAnalyser.getByteFrequencyData(dataArray);

	//calculate radius based on frequency information (uses channel 50 right now)..
	var r = dataArray[50];
	//set x of circle...
	var x = (myWidth / 2);
	//set y of circle...
	var y = (myHeight / 2);
	//set start angle (the circumference of the circle)...
	var startAngle = 2 * Math.PI;
	//set end angle (the end circumference of the circle)...
	var endAngle = 0 * Math.PI;

	//draw a circle; radius is based on frequency...

	//begin the drawing...
	c.beginPath();
	//draw the circle...
	c.arc(x, y, r, startAngle, endAngle);
	//fill the circle with a color...
	c.fill();
	//close the path...
	c.closePath();

	//do it again (appx 60 times per second)...
	requestAnimationFrame(renderFrame);

	/*
	requestAnimationFrame(renderFrame);
	if(audioVisualizer.isPlaying){
		audioVisualizer.x = 0;

		audioAnalyser.getByteFrequencyData(dataArray);

		c.fillStyle = "#345345";
		//c.fillRect(0, 0, myWidth, myHeight);

	console.log(dataArray);
		for (var i = 0; i < bufferLength; i++) {
			audioVisualizer.barHeight = dataArray[i];


			var r = audioVisualizer.barHeight + (25 * (i/bufferLength));
			var g = 250 * (i/bufferLength);
			var b = 50;

			c.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			c.fillRect(audioVisualizer.x, myHeight - audioVisualizer.barHeight, barWidth, audioVisualizer.barHeight);

			audioVisualizer.x += barWidth + 1;
		}
	}*/
}