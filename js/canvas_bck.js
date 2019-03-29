
//include('helper.js');

window.onload = function(){
	
	/*
	function GameEngine(canvas, FPS) {
		this.FPS = 1000 / FPS;
		this.canvas = canvas;
		this.context2D = canvas.getContext("2d");
		this.gameObjects = [];
		
		this.setupCanvas = function(){
			this.context2D.textBaseline = "top";
			this.context2D.mouse = {
				x: 0,
				y: 0,
				clicked: false,
				down: false
			};

			var engine = this;

			this.canvas.addEventListener("mousemove", function(e) {
				engine.context2D.mouse.x = e.offsetX;
				engine.context2D.mouse.y = e.offsetY;
				engine.context2D.mouse.clicked = (e.which == 1 && !engine.context2D.mouse.down);
				engine.context2D.mouse.down = (e.which == 1);
			});

			this.canvas.addEventListener("mousedown", function(e) {
				engine.context2D.mouse.clicked = !engine.context2D.mouse.down;
				engine.context2D.mouse.down = true;
			});

			this.canvas.addEventListener("mouseup", function(e) {
				engine.context2D.mouse.down = false;
				engine.context2D.mouse.clicked = false;
			});
		}
		
		
		this.setupCanvas();
		
		this.run = function() {
			var desiredTime = Date.now() + this.FPS;

			this.update();
			this.draw();

			var interval = Math.max(0, desiredTime-Date.now());
			setTimeout(_.bind(this.run, this), interval);
		}
		
		this.update = function() {
			_.each(this.gameObjects, function(obj) {
				obj.update(this.context2D);
			}, this);
		}

		this.draw = function() {
			this.context2D.clearRect(0, 0, 600, 400);
			_.each(this.gameObjects, function(obj) {
				obj.draw(this.context2D);
			}, this);
		}
	}
	
	
	var engine = new GameEngine(canvasElement, 30);
	*/
	// ===========================================================================
	// === Properties ============================================================
	// ===========================================================================
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");

	var myWidth = window.innerWidth - 1;
	var myHeight = window.innerHeight - 1;
	c.canvas.width = myWidth;
	c.canvas.height = myHeight;

	var hud = new HUD(myWidth, myHeight);

	var audioControls = document.getElementById("audioControls");
	var previous_button = document.getElementById("previous_button");
	var next_button = document.getElementById("next_button");
	var play_button = document.getElementById("play_button");

	var mouse = {
		x: undefined,
		y: undefined
	};
	var keyboard = {
		horizontal: 0,
		vertical: 0
	};


	var dataObj = new Object();
	dataObj.bpmRatesStr =   ["64", "32", "16", "8", "4", "2", "1", "1/2", "1/3", "1/4", "1/6", "1/8", "1/12", "1/16", "1/24", "1/32", "1/48", "1/64"];
	dataObj.bpmRates =      [ 256, 128,   64,  32,   16,  8,   4,    2,   4/3,    1,    6/9,    1/2,    1/3,   1/4,    1/6,     1/8,   1/12,   1/16];

	var sliceRate = dataObj.bpmRates[9];
	var bpm = 120.0;
	var beatRate = 60 / bpm * sliceRate;

	var itemManager;
	//var items = [];


	// ===========================================================================
	// === Init ==================================================================
	// ===========================================================================
	function init() {
		canvas = document.getElementById("canvas");
		c = canvas.getContext("2d");
		myWidth = window.innerWidth - 1;
		myHeight = window.innerHeight - 1;
		c.canvas.width = myWidth;
		c.canvas.height = myHeight;
		hud = new HUD(myWidth, myHeight);

		itemManager.init();

	}


	// ===========================================================================
	// === Animate ===============================================================
	// ===========================================================================
	function animate(){
		requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height);
		for(var i=0; i<itemManager.items.length; i++){
			var item = itemManager.items[i];
			item.update();
		}
		hud.draw();
	}


	// ===========================================================================
	// === HUD ===================================================================
	// ===========================================================================
	function HUD(w, h){
		this.width = w;
		this.height = h;
		this.color = randomColor(colors);
		this.fontColor = "rgba(242, 242, 242, 1.0)";
		this.logoColor = "rgba(232, 12, 122, 1.0)";
		this.logoText = "fettdruck";
		this.text1 = "";
		this.text2 = "";
		this.text3 = "";
		this.text4 = "";
		this.margins = [20,20,20,20];
		this.padding = [40,40,40,40];
		this.offset = 40;
		
		this.barWidth = (this.width-this.margins[0]-this.padding[0]-this.margins[2]-this.padding[2]) / 3;
		this.barHeight = this.height-this.margins[1]-this.padding[1]-this.margins[3]-this.padding[3];

		this.logo = document.createElement("IMG");
		this.logo.setAttribute("src", "media/logo/icon_512x512.png");
		this.logo.setAttribute("width", "100");
		this.logo.setAttribute("height", "100");
		this.logo.setAttribute("alt", "alt text");
		//this.logo.style.display = "none";
			
		this.setText = function(t1, t2, t3, t4){ 
			this.text1 = t1; 
			this.text2 = t2; 
			this.text3 = t3; 
			this.text4 = t4; 
		}
		this.setColor = function(c){ 
			this.color = c; 
			this.setButtonColor();
		}
		this.setWidth = function(w){ this.width = w; }
		this.setHeight = function(h){ this.height = h; }
		
		this.setSize = function(w,h){ 
			this.setWidth(w); 
			this.setHeight(h); 
			this.barWidth = (this.width-this.margins[0]-this.padding[0]-this.margins[2]-this.padding[2]) / 3;
			this.barHeight = this.height-this.margins[1]-this.padding[1]-this.margins[3]-this.padding[3];
		}

		this.setButtonColor = function(){
			previous_button.style.backgroundColor = this.color;
			next_button.style.backgroundColor = this.color;
			play_button.style.backgroundColor = this.color;
		}
 
		this.draw = function(){
			// Logo
			c.globalAlpha = 0.4;
			c.fillStyle = this.color;
			c.font = '45px courier, sans-serif';
			c.textBaseline = 'top';
			//c.color = this.fontColor;
			c.textAlign = 'left';
			c.fillText(this.logoText, this.margins[0]+this.padding[0]+this.offset, this.margins[1]+this.padding[1]+this.offset);
			
			c.globalAlpha = 0.5;
			//c.drawImage(this.logo, this.margins[0]+this.padding[0]+250, this.margins[1]+this.padding[1]+10, 40, 40);
			
			var yPos = this.height-this.margins[3]-this.padding[3]-this.offset+40;
			var m = 30;
			c.textBaseline = 'bottom';
			c.globalAlpha = 0.4;
			c.font = '14px avenir-book, sans-serif';
			c.fillStyle = this.color;
			c.fillText(this.text4, this.margins[0]+this.padding[0]+this.offset, yPos-=m);
			c.fillText(this.text3, this.margins[0]+this.padding[0]+this.offset, yPos-=m);
			c.fillText(this.text2, this.margins[0]+this.padding[0]+this.offset, yPos-=m);
			c.fillText(this.text1, this.margins[0]+this.padding[0]+this.offset, yPos-=m);
			// Border
			c.globalAlpha = 0.04;
			c.lineWidth = 40;
			c.strokeStyle = this.color;
			c.strokeRect(this.margins[0], this.margins[1], this.width-this.margins[0]-this.margins[2], this.height-this.margins[1]-this.margins[3]);
			//BG
			c.globalAlpha = 0.05;
			c.lineWidth = 40;
			c.fillStyle = this.color;
			c.fillRect(this.margins[0]+this.padding[0], this.margins[1]+this.padding[1], this.barWidth, this.barHeight);

			// Logo

		}

		this.update = function(){

		}

	}

	// ===========================================================================
	// === Items Manager =========================================================
	// ===========================================================================
	function ItemManager(){
		this.items = [];

		this.activeItem = null;
		this.isPlaying = false;
		this.playlist = [];

		this.playNextTrack = function(){
			var randI;
			if(this.activeItem != null)
				randI = parseInt( this.activeItem.links[Math.floor(Math.random()*this.activeItem.links.length)] );
			else if(this.playlist.length > 0){
				randI = parseInt( this.playlist[this.playlist.length-1].links[Math.floor(Math.random()*this.playlist[this.playlist.length-1].links.length)] );
			}else{
				randI = parseInt( Math.floor(Math.random()*this.items.length) );
			}
			this.playTrack_index(randI);
		}

		this.playPreviousTrack = function(){
			if(this.playlist.length > 0){
				this.activeItem = this.playlist.pop();// this.playlist.length-2];
				//this.playlist.push(this.activeItem);
				this.activeItem.setActive();
				this.isPlaying = true;
			}
		}

		this.switchPlayTrack = function(){
			if(this.activeItem != null){
				if(this.isPlaying) this.stopPlayback();
			}
			else this.playTrack();
		}

		this.stopPlayback = function(){
			for(var i=0; i<this.items.length; i++){
				this.items[i].deactivate();
			}
			this.activeItem = null;
			this.isPlaying = false;
		}

		this.playTrack = function(){
			if(this.activeItem != null){
				this.activeItem.play();
				this.isPlaying = true;
			}else{
				var randI = parseInt( Math.floor(Math.random()*this.items.length) );
				this.playTrack_index(randI);
			}
		}

		this.playTrack_mouseXY = function(mouseX, mouseY){
			for(var i=0; i<this.items.length; i++){
				this.items[i].deactivate();
			}
			for(var i=0; i<this.items.length; i++){
				if(	this.items[i].x - mouseX < this.items[i].radius && 
					this.items[i].x - mouseX > -this.items[i].radius && 
					this.items[i].y - mouseY < this.items[i].radius && 
					this.items[i].y - mouseY > -this.items[i].radius)
				{
					if(this.activeItem != null)
						this.playlist.push(this.activeItem);
					this.activeItem = this.items[i];
					this.activeItem.setActive();
					this.isPlaying = true;
					return true;
				}
			}
			this.isPlaying = false;
			return false;
		}

		this.playTrack_index = function(index){
			for(var i=0; i<this.items.length; i++){
				if(this.activeItem != this.items[i])
					this.items[i].deactivate();
			}
			if(index < this.items.length){
				if(this.activeItem != null)
					this.playlist.push(this.activeItem);
				this.activeItem = this.items[index];
				this.activeItem.setActive();
				this.isPlaying = true;
				return true;
			}
			this.isPlaying = false;
			return false;
		}


		this.init = function(){
			this.items = [];
			for(var i=0; i<data.length; i++){
				var index = data[i].i;
				var trackSrc = data[i].track;
				var imageSrc = data[i].image;
				var title = data[i].title;
				var links = data[i].link.split(",");
				var bpm = parseFloat(data[i].bpm);

				var radiusV = 2;
				if(isMobileDevice) radiusV = Math.min(myWidth, myHeight)*0.01;

				var radius = randomIntFromRange(radiusV, radiusV+6);
				var maxRadius = randomIntFromRange(radiusV+16, radiusV+20);
				var x = Math.random() * (myWidth - radius * 2) + radius;
				var y = Math.random() * (myHeight - radius * 2) + radius;
				var dx = (Math.random()<0.5) ? -0.5 : 0.5;
				var dy = (Math.random()<0.5) ? -0.5 : 0.5;
				var color = randomColor(colors);
				this.items.push(new Item(x, y, dx, dy, radius, maxRadius, color, index, trackSrc, imageSrc, title, links, bpm));
			}
		}
		this.validatePosition = function(){
			for(var i=0; i<this.items.length; i++){
				if(this.items[i].x > myWidth) this.items[i].x = myWidth;
				if(this.items[i].y > myHeight) this.items[i].y = myHeight;
			}
		}
		
	}
	itemManager = new ItemManager();


	// ===========================================================================
	// === Item ==================================================================
	// ===========================================================================
	function Item(x, y, dx, dy, radius, maxRadius, color, index, trackSrc, imageSrc, title, links, bpm){
		this.i = index;
		this.trackSrc = "media/audio/" + trackSrc;
		this.track = new Sound(this.trackSrc);
		this.image = document.createElement("IMG");
		this.image.setAttribute("src", "media/audio/" + imageSrc);
		this.image.setAttribute("width", "5");
		this.image.setAttribute("height", "5");
		this.image.setAttribute("alt", title);
		this.image.style.display = "none";
		document.body.appendChild(this.image);
		this.title = title;
		this.links = links;
		this.bpm = parseFloat(bpm);

		this.active = false;
		this.isPlaying = false;
		this.isLinkedToActive = false;

		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		this.maxRadius = maxRadius;
		this.color = color;
		this.speed = 2;

		this.duration = "";

		this.opacity_circle = 0.4;
		this.opacity_circle_min = this.opacity_circle;
		this.opacity_circle_max = 0.5;

		this.opacity_links = 0.1;
		this.opacity_links_min = this.opacity_links;
		this.opacity_links_max = 0.9;

		this.opacity_text = 0.01;
		this.opacity_text_min = this.opacity_text;
		this.opacity_text_max = 0.6;

		this.opacity_max = 1.0;

		//this.audioAnalyser = undefined;


		this.setActive = function(){
			//this.audioAnalyser = new AudioAnalyser(this.trackSrc);
			this.active = true;
			this.track.play();
			this.isPlaying = true;
			this.duration = extround(this.track.audio.duration/60,4).toString().replace(".",":") + " Min.";

			for(var i=0; i<itemManager.items.length; i++){
				if(itemManager.items[i] !== this){
					itemManager.items[i].deactivate();
				}
			}
			for(var j=0; j<this.links.length; j++){
				var linkIndex = parseInt(this.links[j]);
				itemManager.items[linkIndex].isLinkedToActive = true;
			}
			hud.setText(this.title, this.bpm.toString()+" Bpm", this.duration, "...");
			hud.setColor(this.color);
		}

		this.deactivate = function(){
			this.active = false;
			this.track.stop();
			this.isPlaying = false;
			for(var j=0; j<this.links.length; j++){
				var linkIndex = parseInt(this.links[j]);
				itemManager.items[linkIndex].isLinkedToActive = false;
			}
		}

		this.getPumper = function(min, max){
			var seconds = this.track.audio.currentTime;
			var rev = 1.0;
			var rate = 0.5;
			var notch = 0.0;
			var rand = Math.random() * 0.0;
			var auxLinRev = 1.0 - (((this.bpm / 60) * seconds * rate + notch + rand) % 1.0);
			var auxLin = ((this.bpm / 60) * seconds * rate + notch + rand) % 1.0;
			var auxSin = (Math.sin((this.bpm / 60) * (seconds * rev) * rate * 2 * Math.PI + notch + rand) + 1) / 2;

			var aux = mapRange(auxSin, 0.0, 1.0, min, max);

			return aux;
		}

		this.draw = function(){
			var pumper = this.getPumper(0.95,1.0);
			if(this.active) pumper = this.getPumper(0.90,1.0);
			//c.drawImage(this.image, this.x, this.y, this.radius, this.radius);
			var arcRadius = this.radius * pumper;

			// ===========================================================================
			// === Arc ===================================================================
			// ===========================================================================
			c.globalAlpha = this.opacity_circle * pumper;
			c.fillStyle = this.color;
			c.strokeStyle = this.color;
			// Arc 1 : Main circle
			c.beginPath();
			c.arc(this.x, this.y, arcRadius, 0, (2*Math.PI));
			c.fill();
			// Arc 2 : Time progress
			c.globalAlpha = this.opacity_circle * pumper;
			c.beginPath();
			c.arc(this.x, this.y, (this.maxRadius > 7)?this.maxRadius-6:6, 0, (2*Math.PI) * (this.track.audio.currentTime / this.track.audio.duration));
			c.strokeStyle = 'rgba(255,255,255,0.5)';
			c.lineWidth = 3;
			c.stroke();

			// Arc 3 : is linked to active
			if(this.isLinkedToActive){
				c.globalAlpha = this.opacity_circle * pumper;
				c.beginPath();
				c.arc(this.x, this.y, this.maxRadius-1, 0, (2*Math.PI));
				c.strokeStyle = this.color;
				c.lineWidth = 1;
				c.stroke();
			}

			// ===========================================================================
			// === Text ==================================================================
			// ===========================================================================
			c.globalAlpha = this.opacity_text;
			c.fillStyle = this.color;
			//c.font = 'italic regular 16px sans-serif';
			c.font = '12px courier, sans-serif';
			c.textBaseline = 'bottom';
			var offset = 10*pumper;
			c.fillText(this.title, this.x+this.radius+offset, this.y-this.radius-offset);

			c.fillText(this.duration, this.x+50+offset, this.y+20-offset);

			// ===========================================================================
			// === Lines =================================================================
			// ===========================================================================
			c.globalAlpha = this.opacity_links;
			for(var j=0; j<this.links.length; j++){
				var linkIndex = parseInt(this.links[j]);
				if(linkIndex == this.i) continue;

				c.beginPath();
				//c.moveTo(this.x,this.y);
				//c.lineTo(itemManager.items[linkIndex].x,itemManager.items[linkIndex].y);
				var intersectionPoint_1 = findIntersect(new Vector(this.x,this.y), this.maxRadius, new Vector(itemManager.items[linkIndex].x,itemManager.items[linkIndex].y));
				//alert(intersectionPoint_1.x + ", " + intersectionPoint_1.y);
				var intersectionPoint_2 = findIntersect(new Vector(itemManager.items[linkIndex].x,itemManager.items[linkIndex].y), itemManager.items[linkIndex].maxRadius, new Vector(this.x,this.y));
				c.moveTo(intersectionPoint_1.x,intersectionPoint_1.y);
				c.lineTo(intersectionPoint_2.x,intersectionPoint_2.y);
				c.strokeStyle = this.color;
				c.lineWidth = 0.5;
				c.stroke();
			}
			c.globalAlpha = 1.0;

			//alert("intersectionPoint_1.x + ", " + intersectionPoint_1.y");
			if(this.active){
				/*this.audioAnalyser.analyser.getByteFrequencyData(this.audioAnalyser.frequencyData);
				//console.log(this.audioAnalyser.frequencyData);
				c.fillStyle = "Gold";
				c.fillRect(100, 100, 500*this.audioAnalyser.frequencyData[200], 10);
				//alert(this.audioAnalyser.frequencyData);
				var twoPi = 2*Math.PI;
				var objectsCount = 12;
				var radius = 100

				var change = twoPi/objectsCount;
				for (var i=0; i < twoPi; i+=change) {

					//function map(sourceValue, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax){ 
					var index = map(i, 0, twoPi, 0, this.audioAnalyser.frequencyData.length-1);
					var freqVal = this.audioAnalyser.frequencyData[index];
					var x = radius*cos(i);
					var y = radius*sin(i);
					var rotation = i;

					c.fillStyle = "Gold";
					c.fillRect(200, 100, 10*freqVal, 10*freqVal);
				}*/
				//console.log(this.track.frequencyData)
			}
		}

		this.update = function(){

			var velocity = new Vector(this.dx*this.speed*keyboard.horizontal, this.dy*this.speed*keyboard.vertical);
			if(keyboard.horizontal == -1 && this.dx > 0){
				this.dx *= -1;
			}else if(keyboard.horizontal == 1 && this.dx < 0){
				this.dx *= -1;
			}else if(keyboard.vertical == -1 && this.dy > 0){
				this.dy *= -1;
			}else if(keyboard.vertical == 1 && this.dy < 0){
				this.dy *= -1;
			}

			if(this.active && this.track.audio.ended){
				itemManager.playNextTrack();
			}

			if(this.x+this.radius > myWidth || this.x-this.radius < 0){
				this.dx = -this.dx;
			}
			if(this.y+this.radius > myHeight || this.y-this.radius < 0){
				this.dy = -this.dy;
			}

			this.x += this.dx;
			this.y += this.dy;

			if(this.active){
				this.x += this.dx*2.5;
				this.y += this.dy*2.5;
			}
			var mouseRange = 100;
			if(mouse.x - this.x < mouseRange && mouse.x - this.x > -mouseRange && mouse.y - this.y < mouseRange && mouse.y - this.y > -mouseRange || this.active){
				var maxDistance = Math.sqrt(mouseRange*mouseRange*2)
				var distanceX = Math.max(mouse.x, this.x) - Math.min(mouse.x, this.x);
				var distanceY = Math.max(mouse.y, this.y) - Math.min(mouse.y, this.y);
				var distance = Math.sqrt((distanceX*distanceX) + (distanceY*distanceY));
				var riser = extround(mapRange(distance, 0.0, maxDistance, 1.0, 0.0), 4);
				if(this.active) riser = 1.0;
				//c.font = 'italic regular 30px sans-serif';
				//c.fillText(riser, this.x+50, this.y+20);

				if(this.radius < this.maxRadius){ this.radius += 0.4*riser; }
				if(this.opacity_circle < this.opacity_circle_max){ this.opacity_circle += 0.02; }
				if(this.opacity_text < this.opacity_text_max){ this.opacity_text += 0.04; }
				if(this.opacity_links < this.opacity_links_max){ this.opacity_links += 0.04; }
			}else{
				if(this.radius > this.minRadius){ this.radius -= 0.1; }
				if(this.opacity_circle > this.opacity_circle_min){ this.opacity_circle -= 0.01; }
				if(this.opacity_text > this.opacity_text_min){ this.opacity_text -= 0.01; }
				if(this.opacity_links > this.opacity_links_min){ this.opacity_links -= 0.01; }
			}

			this.draw();
		}
	}



	// ===========================================================================
	// === Mouse Listener ========================================================
	// ===========================================================================


	previous_button.addEventListener('mousedown', function(event) {
		itemManager.playPreviousTrack();
	}, false);

	play_button.addEventListener('mousedown', function(event) {
		itemManager.switchPlayTrack();

	}, false);

	next_button.addEventListener('mousedown', function(event) {
		itemManager.playNextTrack();
	}, false);


	canvas.addEventListener('mousedown', function(event){
		itemManager.playTrack_mouseXY(event.pageX, event.pageY);
	}, false);


	var lastDownTarget;
	document.addEventListener('mousedown', function(event) {
		lastDownTarget = event.target;
		//alert('mousedown');
	}, false);


	document.addEventListener('keydown', function(event) {
		if(lastDownTarget == canvas) {
			if(event.keyCode == 37 || event.which == 37){ /* Left */
				keyboard.horizontal = -1;
			}else if(event.keyCode == 38 || event.which == 38){ /* Up */
				keyboard.vertical = -1;
			}else if(event.keyCode == 38 || event.which == 39){ /* Right */
				keyboard.horizontal = 1;
			}else if(event.keyCode == 38 || event.which == 40){ /* Down */
				keyboard.vertical = 1;
			}else if(event.keyCode == 32 || event.which == 32){ /* Down */
				for(var i=0; i<itemManager.items.length; i++){
					if(itemManager.items[i].active) itemManager.items[i].playNextTrack();
				}
			}
		}
	}, false);


	document.addEventListener('keyup', function(event) {
		if(lastDownTarget == canvas) {
			if(event.keyCode == 37 || event.which == 37){ /* Left */
				keyboard.horizontal = 0;
			}else if(event.keyCode == 38 || event.which == 38){ /* Up */
				keyboard.vertical = 0;
			}else if(event.keyCode == 38 || event.which == 39){ /* Right */
				keyboard.horizontal = 0;
			}else if(event.keyCode == 38 || event.which == 40){ /* Down */
				keyboard.vertical = 0;
			}
		}
	}, false);

	window.addEventListener('resize', function(){
		canvas = document.getElementById("canvas");
		c = canvas.getContext("2d");
		myWidth = window.innerWidth - 5;
		myHeight = window.innerHeight - 5;
		c.canvas.width = myWidth;
		c.canvas.height = myHeight;

		itemManager.validatePosition();

		hud.setSize(myWidth, myHeight);
	}, false);

	window.addEventListener('mousemove', function(event){
		mouse.x = event.x;
		mouse.y = event.y;
	}, false);

	init();
	animate();
}


