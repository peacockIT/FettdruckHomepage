
//include('helper.js');

window.onload = function(){
	
	var canvas = document.getElementById("canvas");
	
	// ===========================================================================
	// === GameEngine ============================================================
	// ===========================================================================
	function GameEngine(canvas, FPS) {
		this.FPS = 1000 / FPS;
		this.canvas = canvas;
		this.c = canvas.getContext("2d");
		this.gameObjects = [];
		
		this.itemManager = new ItemManager();
		
		this.width = window.innerWidth - 1;
		this.height = window.innerHeight - 1;
		
		this.hud = new HUD(this.width, this.height);
		
		this.c.canvas.width = this.width;
		this.c.canvas.height = this.height;
		
		this.setupCanvas = function(){
			this.c.textBaseline = "top";
			this.c.mouse = { x: 0, y: 0, clicked: false, down: false };
			this.c.keyboard = { horizontal: 0, vertical: 0 };
			var engine = this;
			this.canvas.addEventListener("mousemove", function(e) {
				engine.c.mouse.x = e.offsetX;
				engine.c.mouse.y = e.offsetY;
				engine.c.mouse.clicked = (e.which == 1 && !engine.c.mouse.down);
				engine.c.mouse.down = (e.which == 1);
			});
			this.canvas.addEventListener("mousedown", function(e) {
				engine.c.mouse.clicked = !engine.c.mouse.down;
				engine.c.mouse.down = true;
				engine.itemManager.playTrack_mouseXY(event.pageX, event.pageY);
			});
			this.canvas.addEventListener("mouseup", function(e) {
				engine.c.mouse.down = false;
				engine.c.mouse.clicked = false;
			});
		}
		
		this.setupCanvas();
		
		this.init = function(){
			this.canvas = document.getElementById("canvas");
			this.c = canvas.getContext("2d");
			this.width = window.innerWidth - 1;
			this.height = window.innerHeight - 1;
			this.c.canvas.width = engine.width;
			this.c.canvas.height = engine.height;

			this.itemManager.init();
		}
		
		this.initResize = function(){
			this.canvas = document.getElementById("canvas");
			this.c = canvas.getContext("2d");
			this.width = window.innerWidth - 5;
			this.height = window.innerHeight - 5;
			this.c.canvas.width = engine.width;
			this.c.canvas.height = engine.height;

			this.itemManager.validatePosition();

			this.hud.setSize(engine.width, engine.height);
		}
		
		this.run = function() {
			/*var desiredTime = Date.now() + this.FPS;
			var interval = Math.max(0, desiredTime-Date.now());
			setTimeout(_.bind(this.run, this), interval);*/
			
			this.c.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
			
			this.itemManager.detectCollision();
			
			for(var i=0; i<this.itemManager.items.length; i++){
				var item = this.itemManager.items[i];
				item.update(this.c);
				item.draw(this.c);
			}
			this.hud.update(this.c);
			this.hud.draw(this.c);
			
			requestAnimationFrame(_.bind(this.run, this));
		}
		
		this.update = function() {}
		this.draw = function() {}
	}
	
	var engine = new GameEngine(canvas, 60);
	
	/*
	var audioControls = document.getElementById("audioControls");
	var previous_button = document.getElementById("previous_button");
	var next_button = document.getElementById("next_button");
	var play_button = document.getElementById("play_button");*/


	
	
	/*
	var dataObj = new Object();
	dataObj.bpmRatesStr =   ["64", "32", "16", "8", "4", "2", "1", "1/2", "1/3", "1/4", "1/6", "1/8", "1/12", "1/16", "1/24", "1/32", "1/48", "1/64"];
	dataObj.bpmRates =      [ 256, 128,   64,  32,   16,  8,   4,    2,   4/3,    1,    6/9,    1/2,    1/3,   1/4,    1/6,     1/8,   1/12,   1/16];

	var sliceRate = dataObj.bpmRates[9];
	var bpm = 120.0;
	var beatRate = 60 / bpm * sliceRate;*/

	
	// ===========================================================================
	// === Items Manager =========================================================
	// ===========================================================================
	function ItemManager(){
		this.items = [];

		this.activeItem = null;
		this.isPlaying = false;
		this.playlist = [];

		
		this.detectCollision = function(){
			for(var i=0; i<this.items.length; i++){
				let circle1 = this.items[i];
				
				for(var j=0; j<this.items.length; j++){
					let circle2 = this.items[j];
					let distance_x = circle1.x - circle2.x;
					let distance_y = circle1.y - circle2.y;
					let radii_sum = circle1.radius + circle2.radius;
					if(distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum){
						circle1.collision(circle2);
						circle2.collision(circle1);
					}
				}
			}
		}
		
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
				if(isMobileDevice) radiusV = Math.min(engine.width, engine.height)*0.01;

				var radius = randomIntFromRange(radiusV, radiusV+6);
				var maxRadius = randomIntFromRange(radiusV+16, radiusV+20);
				var x = Math.random() * (engine.width - radius * 2) + radius;
				var y = Math.random() * (engine.height - radius * 2) + radius;
				var dx = (Math.random()<0.5) ? -0.5 : 0.5;
				var dy = (Math.random()<0.5) ? -0.5 : 0.5;
				var color = randomColor(colors);
				this.items.push(new Item(x, y, dx, dy, radius, maxRadius, color, index, trackSrc, imageSrc, title, links, bpm));
			}
		}
		this.validatePosition = function(){
			for(var i=0; i<this.items.length; i++){
				if(this.items[i].x > engine.width) this.items[i].x = engine.width;
				if(this.items[i].y > engine.height) this.items[i].y = engine.height;
			}
		}
		
	}


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
		
		this.collision = function(collider){
			this.dx *= -1;
			this.dy *= -1;
		}

		this.setActive = function(){
			//this.audioAnalyser = new AudioAnalyser(this.trackSrc);
			this.active = true;
			this.track.play();
			this.isPlaying = true;
			this.duration = extround(this.track.audio.duration/60,4).toString().replace(".",":") + " Min.";

			for(var i=0; i<engine.itemManager.items.length; i++){
				if(engine.itemManager.items[i] !== this){
					engine.itemManager.items[i].deactivate();
				}
			}
			for(var j=0; j<this.links.length; j++){
				var linkIndex = parseInt(this.links[j]);
				engine.itemManager.items[linkIndex].isLinkedToActive = true;
			}
			engine.hud.setText(this.title, this.bpm.toString()+" Bpm", this.duration, "...");
			engine.hud.setColor(this.color);
		}

		this.deactivate = function(){
			this.active = false;
			this.track.stop();
			this.isPlaying = false;
			for(var j=0; j<this.links.length; j++){
				var linkIndex = parseInt(this.links[j]);
				engine.itemManager.items[linkIndex].isLinkedToActive = false;
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
		
		this.update = function(c){

			
			
			var velocity = new Vector(this.dx*this.speed*c.keyboard.horizontal, this.dy*this.speed*c.keyboard.vertical);
			if(c.keyboard.horizontal == -1 && this.dx > 0){
				this.dx *= -1;
			}else if(c.keyboard.horizontal == 1 && this.dx < 0){
				this.dx *= -1;
			}else if(c.keyboard.vertical == -1 && this.dy > 0){
				this.dy *= -1;
			}else if(c.keyboard.vertical == 1 && this.dy < 0){
				this.dy *= -1;
			}

			if(this.x+this.radius > engine.width || this.x-this.radius < 0){
				this.dx = -this.dx;
			}
			if(this.y+this.radius > engine.height || this.y-this.radius < 0){
				this.dy = -this.dy;
			}

			this.x += this.dx;
			this.y += this.dy;

			if(this.active){
				this.x += this.dx*2.5;
				this.y += this.dy*2.5;
				
				if(this.track.audio.ended){
					engine.itemManager.playNextTrack();
				}
			}
			
			var mouseRange = 100;
			var t = 5; //tolerance
			var xIntersect = c.mouse.x - this.x < mouseRange && c.mouse.x - this.x > -mouseRange;
			var yIntersect = c.mouse.y - this.y < mouseRange && c.mouse.y - this.y > -mouseRange;
			if(xIntersect && yIntersect || this.active){
				var maxDistance = Math.sqrt(mouseRange*mouseRange*2)
				var distanceX = Math.max(c.mouse.x, this.x) - Math.min(c.mouse.x, this.x);
				var distanceY = Math.max(c.mouse.y, this.y) - Math.min(c.mouse.y, this.y);
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
		}

		this.draw = function(c){
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
				//c.lineTo(engine.itemManager.items[linkIndex].x,engine.itemManager.items[linkIndex].y);
				var intersectionPoint_1 = findIntersect(new Vector(this.x,this.y), this.maxRadius, new Vector(engine.itemManager.items[linkIndex].x,engine.itemManager.items[linkIndex].y));
				//alert(intersectionPoint_1.x + ", " + intersectionPoint_1.y);
				var intersectionPoint_2 = findIntersect(new Vector(engine.itemManager.items[linkIndex].x,engine.itemManager.items[linkIndex].y), engine.itemManager.items[linkIndex].maxRadius, new Vector(this.x,this.y));
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
	}

	
	
	
	// ===========================================================================
	// === GUI Elements ==========================================================
	// ===========================================================================
	// BUTTON
	var button_next = new Button(">", 45, 50, 160, 40);
	button_next.handler = function(){
		engine.itemManager.playNextTrack();
	};
	engine.hud.guiElements.push(button_next);
	
	var button_previous = new Button("<", 45, 50, 160, 40);
	button_previous.handler = function(){
		engine.itemManager.playPreviousTrack();
	};
	engine.hud.guiElements.push(button_previous);

	
	var button_play = new Button("Play", 45, 50, 160, 40);
	button_play.handler = function(){
		engine.itemManager.switchPlayTrack();
	};
	engine.hud.guiElements.push(button_play);
	/*
	// SLIDER
	var DOMSlider = new Slider(45, 150, 260, 0, 100);
	DOMSlider.handler = function(value) {
		var text = value + "%";
	}
	engine.hud.guiElements.push(DOMSlider);
	
	
	// CHECKBOX
	var backCheckBox = new CheckBox(45, 250);
	backCheckBox.checked = true;
	backCheckBox.handler = function(checked){
		var color = (checked) ? "#FFF" : "#E8B70C";
		document.body.style.backgroundColor = color;
	}
	engine.hud.guiElements.push(backCheckBox);
	*/

	// ===========================================================================
	// === Mouse Listener ========================================================
	// ===========================================================================
	/*previous_button.addEventListener('mousedown', function(event) {
		engine.itemManager.playPreviousTrack();
	}, false);*/
	/*
	play_button.addEventListener('mousedown', function(event) {
		engine.itemManager.switchPlayTrack();

	}, false);*/

	/*next_button.addEventListener('mousedown', function(event) {
		engine.itemManager.playNextTrack();
	}, false);*/

	var lastDownTarget;
	document.addEventListener('mousedown', function(event) {
		lastDownTarget = event.target;
	}, false);

	document.addEventListener('keydown', function(event) {
		if(lastDownTarget == canvas) {
			if(event.keyCode == 37 || event.which == 37){ /* Left */
				engine.c.keyboard.horizontal = -1;
			}else if(event.keyCode == 38 || event.which == 38){ /* Up */
				engine.c.keyboard.vertical = -1;
			}else if(event.keyCode == 38 || event.which == 39){ /* Right */
				engine.c.keyboard.horizontal = 1;
			}else if(event.keyCode == 38 || event.which == 40){ /* Down */
				engine.c.keyboard.vertical = 1;
			}else if(event.keyCode == 32 || event.which == 32){ /* Down */
				for(var i=0; i<engine.itemManager.items.length; i++){
					if(engine.itemManager.items[i].active) engine.itemManager.items[i].playNextTrack();
				}
			}
		}
	}, false);

	document.addEventListener('keyup', function(event) {
		if(lastDownTarget == canvas) {
			if(event.keyCode == 37 || event.which == 37){ /* Left */
				engine.c.keyboard.horizontal = 0;
			}else if(event.keyCode == 38 || event.which == 38){ /* Up */
				engine.c.keyboard.vertical = 0;
			}else if(event.keyCode == 38 || event.which == 39){ /* Right */
				engine.c.keyboard.horizontal = 0;
			}else if(event.keyCode == 38 || event.which == 40){ /* Down */
				engine.c.keyboard.vertical = 0;
			}
		}
	}, false);

	window.addEventListener('resize', function(){
		engine.initResize();
	}, false);

	window.addEventListener('mousemove', function(event){
		mouse.x = event.x;
		mouse.y = event.y;
	}, false);

	// ===========================================================================
	// === Main ==================================================================
	// ===========================================================================
	engine.init();
	engine.run();
}


