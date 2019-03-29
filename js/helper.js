
// ========================================================================================================
// === Check Device =======================================================================================
// ========================================================================================================
var isMobileDevice = false;
testExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile', 'i');
if (testExp.test(navigator.userAgent)) isMobileDevice = true;



function Vector (x, y) {
    this.x = x || 0;
    this.y = y || 0;
	
	this.add = function(vector){ return new Vector(this.x + vector.x, this.y + vector.y); }
	this.subtract = function(vector){ return new Vector(this.x - vector.x, this.y - vector.y); }
	this.multiply = function(vector){ return new Vector(this.x * vector.x, this.y * vector.y); }
	this.multiplyScalar = function(scalar){ return new Vector(this.x * scalar, this.y * scalar); }
	this.divide = function(vector){ return new Vector(this.x / vector.x, this.y / vector.y); }
	this.divideScalar = function(scalar){ return new Vector(this.x / scalar, this.y / scalar); }
	this.length = function(){ return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
	this.normalize = function(){ return this.divideScalar(this.length()); }
}
/**
 * Finds the intersection between a circles border 
 * and a line from the origin to the otherLineEndPoint.
 * @param  {Vector} origin            - center of the circle and start of the line
 * @param  {number} radius            - radius of the circle
 * @param  {Vector} otherLineEndPoint - end of the line
 * @return {Vector}                   - point of the intersection
 */
function findIntersect (origin, radius, otherLineEndPoint) {
    var v = otherLineEndPoint.subtract(origin);
    var lineLength = v.length();    
    if (lineLength === 0) throw new Error("Length has to be positive");
    v = v.normalize();
    return origin.add(v.multiplyScalar(radius)); 
}

// ========================================================================================================
// === TimeAnalyser =======================================================================================
// ========================================================================================================
function Timer() {
	this.initialTime = new Date();
	this.startTime = new Date();
	this.startTimeDelta = new Date();
	this.endTime = new Date();
	this.start = function (){ this.startTime = new Date(); }
	
	this.getTime = function(){ return ((new Date()).getTime() - this.initialTime) / 1000; }
	
	this.getTimeNow = function(){ return (new Date()).getTime() / 1000; }
	
	this.getDuration = function(){ return this.getTime(); }
	this.getTimeDelta = function (){ 
		this.endTime = new Date();
		var output = (this.endTime.getTime() - this.startTimeDelta.getTime()) / 1000;
		this.startTimeDelta = new Date();
		return output;
	}
}
var timer = new Timer();

function Sound(src) {
	this.audio = document.createElement("audio");
  	this.audio.src = src;
	this.audio.setAttribute("preload", "auto");
	this.audio.setAttribute("controls", "none");
	this.audio.style.display = "none";
	document.body.appendChild(this.audio);
	
	/*this.audioContext = new AudioContext();
	this.audioSrc = this.audioContext.createMediaElementSource(this.audio);
	this.analyser = this.audioContext.createAnalyser();
	//this.audioSrc.connect(this.analyser);
	//this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
	//this.audio.start();*/
	
	this.play = function(){
		//this.audio.start();
		this.audio.play();
	}
	this.stop = function(){
 		this.audio.pause();
  	}
}

function AudioAnalyser(src) {
	this.audio = document.createElement("audio");
  	this.audio.src = src;
	this.audio.setAttribute("preload", "auto");
	this.audio.setAttribute("controls", "none");
	this.audio.style.display = "none";
	document.body.appendChild(this.audio);
	this.audio.load();
	this.audio.play();
	
	this.audioContext = new AudioContext();
	this.audioSrc = this.audioContext.createMediaElementSource(this.audio);
	this.analyser = this.audioContext.createAnalyser();
	
	this.audioSrc.connect(this.analyser);
	this.analyser.connect(this.audioContext.destination);
	this.analyser.fftSize = 256;
	this.bufferSize = this.analyser.frequencyBinCount;
	
	this.frequencyData = new Uint8Array(this.bufferSize);
	//this.audio.start();
}

var colors = [
	'rgba(153, 184, 152, 1.0)', // #99B898 GREEN
	'rgba(254, 206, 168, 1.0)', // #FECEA8 ORANGE
	'rgba(255, 132, 124, 1.0)', // #FF847C LIGHTRED
	'rgba(232, 74, 95, 1.0)'/*, 	// #E84A5F RED
	'rgba(42, 54, 59, 1.0)'		// #2A363B DARKBLUE	*/
];

function randomIntFromRange(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColor(colors){
	return colors[Math.floor(Math.random()*colors.length)];
}
function mapRange(sourceValue, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax){ 
	return targetRangeMin + ((targetRangeMax - targetRangeMin) * (sourceValue - sourceRangeMin)) / (sourceRangeMax - sourceRangeMin); 
}
function map(value0To1, targetRangeMin, targetRangeMax){ 
	return targetRangeMin + value0To1 * (targetRangeMax - targetRangeMin); 
}

function extround(zahl, n_stelle) {
	return (Math.round(zahl * n_stelle) / n_stelle);
}


function makeShadows() {
	c.shadowOffsetX = 5;
	c.shadowOffsetY = 5;
	c.shadowBlur = 10;
	c.shadowColor = "DarkGoldenRod";
}

function draw_line() {
	c.beginPath();
	c.moveTo(x,y);
	c.lineTo(100,100);
	c.lineTo(800,900);
	c.strokeStyle = 'rgba(255, 255, 255, 0.5)';
	c.stroke();
	window.setTimeout(draw_line, 1000 / 30);
}

function draw_rectangle() {
	c.fillStyle = "Gold";
	c.fillRect(20, 20, 10, 10);
}

function draw_arc(x, y) {
	/*c.clearRect(0, 0, canvas.width, canvas.height);*/

	c.beginPath();
	c.arc(x, y, radius, 0, 2 * Math.PI);

	c.fillStyle = 'rgba(255, 25, 255, 0.5)';
	c.fill();

	/*window.setTimeout(draw_arc, 1000 / 30);*/
}

function draw_text() {
	c.fillStyle = 'rgba(255, 255, 255, 0.5)';
	c.font = 'italic bold 60px sans-serif';
	c.textBaseline = 'bottom';
	c.fillText('fettdruck!', 50, 100);
}









/*
var myAudio = new Audio('media/176 Pressure Talking.mp3'); 
myAudio.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);
myAudio.play();*/

/*
var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");
		
var vx = 6000;   // meters per second
var vy = 0;
var earthRadius = 6371000;   // meters
var mountainHeight = earthRadius * 0.165;  // chosen to match image
var x = 0;
var y = earthRadius + mountainHeight;
		
function drawProjectile() {
	theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
	var metersPerPixel = earthRadius / (0.355 * theCanvas.width);
	var pixelX = theCanvas.width/2 + x/metersPerPixel;
	var pixelY = theCanvas.height/2 - y/metersPerPixel;
	
	theContext.beginPath();
	theContext.arc(pixelX, pixelY, 5, 0, 2*Math.PI);
	
	var theGradient = theContext.createRadialGradient(pixelX-1, pixelY-2, 1, pixelX, pixelY, 5);
	theGradient.addColorStop(0, "#ffd0d0");
	theGradient.addColorStop(1, "#ff0000");
	
	theContext.fillStyle = theGradient;
	theContext.fill();
}
		
function moveProjectile() {
	var newtonG = 6.67e-11;        // grav. constant in SI units
	var earthMass = 5.97e24;       // kilograms
	var dt = 5;                    // time step in seconds
	var r = Math.sqrt(x*x + y*y);
	if (r > earthRadius) {}
		var accel = newtonG * earthMass / (r * r);
		var ax = -accel * x / r;
		var ay = -accel * y / r;
		vx += ax * dt;
		vy += ay * dt;
		var lastx = x;
		x += vx * dt;
		y += vy * dt;
		drawProjectile();
		if (!((lastx < 0) && (x >= 0))) {
			window.setTimeout(moveProjectile, 1000/30);
		}
	
}
		
moveProjectile();
*/