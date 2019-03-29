	

	// ===========================================================================
	// === HUD ===================================================================
	// ===========================================================================
	function HUD(w, h) {
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
		this.margins = [20, 20, 20, 20];
		this.padding = [40, 40, 40, 40];
		this.offset = 40;
		
		this.guiElementHeight = 40;
		
		this.sidebar = new Sidebar();
		
		this.guiElements = [];

		this.barWidth = (this.width - this.margins[0] - this.padding[0] - this.margins[2] - this.padding[2]) / 3;
		this.barHeight = this.height - this.margins[1] - this.padding[1] - this.margins[3] - this.padding[3];

		this.logo = document.createElement("IMG");
		this.logo.setAttribute("src", "media/logo/icon_512x512.png");
		this.logo.setAttribute("width", "100");
		this.logo.setAttribute("height", "100");
		this.logo.setAttribute("alt", "alt text");
		//this.logo.style.display = "none";

		this.setText = function (t1, t2, t3, t4) {
			this.text1 = t1;
			this.text2 = t2;
			this.text3 = t3;
			this.text4 = t4;
		}
		this.setColor = function (c) {
			this.color = c;
			this.setButtonColor();
		}
		this.setWidth = function (w) {
			this.width = w;
		}
		this.setHeight = function (h) {
			this.height = h;
		}

		this.setSize = function (w, h) {
			this.setWidth(w);
			this.setHeight(h);
			this.barWidth = (this.width - this.margins[0] - this.padding[0] - this.margins[2] - this.padding[2]) / 3;
			this.barHeight = this.height - this.margins[1] - this.padding[1] - this.margins[3] - this.padding[3];
		}

		this.setButtonColor = function () {
			/*previous_button.style.backgroundColor = this.color;
			next_button.style.backgroundColor = this.color;
			play_button.style.backgroundColor = this.color;*/
		}

		this.update = function (c) {
			var xPos = this.margins[0] + this.padding[0];
			var yPos = this.margins[1] + this.padding[1];
			var w = this.barWidth;
			var h = this.barHeight;
			
			this.sidebar.update(xPos, yPos, w, h);
			
			for(var i=0; i<this.guiElements.length; i++){
				var bounds = { 
					x: this.sidebar.x, 
					y: this.sidebar.height-(i * this.guiElementHeight),
					width: this.sidebar.width,
					height: this.guiElementHeight
				};
				this.guiElements[i].update(c, bounds);
			}
		}
		
		this.draw = function (c) {
			// Logo
			c.globalAlpha = 0.4;
			c.fillStyle = this.color;
			c.font = '45px courier, sans-serif';
			c.textBaseline = 'top';
			//c.color = this.fontColor;
			c.textAlign = 'left';
			c.fillText(this.logoText, this.margins[0] + this.padding[0] + this.offset, this.margins[1] + this.padding[1] + this.offset);

			c.globalAlpha = 0.5;
			//c.drawImage(this.logo, this.margins[0]+this.padding[0]+250, this.margins[1]+this.padding[1]+10, 40, 40);

			var yPos = this.height - this.margins[3] - this.padding[3] - this.offset + 40;
			var m = 30;
			c.textBaseline = 'bottom';
			c.globalAlpha = 0.4;
			c.font = '14px avenir-book, sans-serif';
			c.fillStyle = this.color;
			c.fillText(this.text4, this.margins[0] + this.padding[0] + this.offset, yPos -= m);
			c.fillText(this.text3, this.margins[0] + this.padding[0] + this.offset, yPos -= m);
			c.fillText(this.text2, this.margins[0] + this.padding[0] + this.offset, yPos -= m);
			c.fillText(this.text1, this.margins[0] + this.padding[0] + this.offset, yPos -= m);
			// Border
			c.globalAlpha = 0.04;
			c.lineWidth = 40;
			c.strokeStyle = this.color;
			c.strokeRect(this.margins[0], this.margins[1], this.width - this.margins[0] - this.margins[2], this.height - this.margins[1] - this.margins[3]);
			
			//Sidebar
			this.sidebar.draw(c);

			// Gui Elements
			for(var i=0; i<this.guiElements.length; i++){
				this.guiElements[i].draw(c);
			}
		}

	}
	
	// ===========================================================================
	// === Sidebar ================================================================
	// ===========================================================================
	var Sidebar = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = "rgba(255, 255, 255, 1.0)"
		
		this.update = function(xPos, yPos, w, h){
			this.x = xPos;
			this.y = yPos;
			this.width = w;
			this.height = h;
		}
		
		this.draw = function(c) {
			c.globalAlpha = 0.05;
			c.lineWidth = 40;
			c.fillStyle = this.color;
			c.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	
	// ===========================================================================
	// === UIObject ==============================================================
	// ===========================================================================
	var UIObject = {
		intersects: function(obj, mouse) {
			var t = 5; //tolerance
			var xIntersect = (mouse.x + t) > obj.x && (mouse.x - t) < obj.x + obj.width;
			var yIntersect = (mouse.y + t) > obj.y && (mouse.y - t) < obj.y + obj.height;
			return  xIntersect && yIntersect;
		},
		updateStats: function(c){
			if (this.intersects(this, c.mouse)) {
				this.hovered = true;
				if (c.mouse.clicked) {
					this.clicked = true;
				}
			} else {
				this.hovered = false;
			}

			if (!c.mouse.down) {
				this.clicked = false;
			}               
		}
	};
	
	
	// ===========================================================================
	// === Button ================================================================
	// ===========================================================================
	var Button = function(text, x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.clicked = false;
		this.hovered = false;
		this.text = text;
		this.color = "rgba(255, 255, 255, 0.4)"
		
		this.update = function(c, bounds){
			this.x = bounds.x;
			this.y = bounds.y;
			this.width = bounds.width;
			this.height = bounds.height;
			var wasNotClicked = !this.clicked;
			this.updateStats(c);
			if (this.clicked && wasNotClicked) {
				if (!_.isUndefined(this.handler)) {	//if (!this.isUndefined(this.handler)) {
					this.handler();
				}
			}
		}
		
		this.draw = function(c) {
			c.globalAlpha = 1.0;
			if (this.hovered) {
				c.fillStyle = "rgba(153, 184, 152, 0.4)";
			} else {
				c.fillStyle = "rgba(153, 184, 152, 0.05)";
			}
			c.fillRect(this.x, this.y, this.width, this.height);
			
			//text options
			c.textBaseline = "top";
			var fontSize = 14;
			c.fillStyle = this.color;
			c.font = fontSize + "px sans-serif";

			var textSize = c.measureText(this.text);
			//var textX = this.x + (this.width / 2) - (textSize.width / 2);
			var textX = this.x + (this.width / 2) - (textSize.width / 2);
			var textY = this.y + (this.height / 2) - (fontSize / 2);
			
			c.fillText(this.text, textX, textY);
		}
	}
	Button.prototype = _.extend(Button.prototype, UIObject);


	// ===========================================================================
	// === Slider ================================================================
	// ===========================================================================
	var Slider = function(x, y, width, min, max) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = 40;
		this.value = min;
		this.min = min;
		this.max = max;
		this.clicked = false;
		this.hovered = false;
		this.color = "rgba(255, 255, 255, 1.0)";
		
		this.update = function(c, bounds) {
			this.x = bounds.x;
			this.y = bounds.y;
			this.width = bounds.width;
			this.height = bounds.height;
			
			this.updateStats(c);

			if (this.clicked) {
				var pos = c.mouse.x;

				pos = Math.max(pos, this.x);
				pos = Math.min(pos, this.x + this.width);

				var range = this.max - this.min;
				var percent = (pos - this.x) / this.width;

				this.value = Math.round(this.min + (percent * range));

				if (!_.isUndefined(this.handler)) {
					this.handler(this.value);
				}
			}
		}
		
		this.draw = function(c) {
			c.globalAlpha = 1.0;
			//draw the bar
			c.fillStyle = this.color;
			//c.fillRect(this.x, this.y + (this.height/4), this.width, this.height/2);
			c.fillRect(this.x, this.y + (this.height/4), this.width, this.height/2);

			//set color
			if (this.hovered) {
				c.fillStyle = "rgba(153, 184, 152, 0.4)";
			} else {
				c.fillStyle = "rgba(153, 184, 152, 0.2)";
			}
			//draw the slider handle
			var range = this.max - this.min;
			var percent = (this.value - this.min) / range;
			var pos = this.x + (this.width*percent);
			c.fillRect(pos-5, this.y, 10, this.height);
		}
	}
	Slider.prototype = _.extend(Slider.prototype, UIObject);


	// ===========================================================================
	// === CheckBox ==============================================================
	// ===========================================================================
	var CheckBox = function(x, y) {
		this.x = x;
		this.y = y;
		this.width = 30;
		this.height = 30;
		this.checked = false;
		this.clicked = false;
		this.hovered = false;
		this.color = "rgba(255, 255, 255, 1.0)"
		
		this.update = function(c, bounds) {
			this.x = bounds.x;
			this.y = bounds.y;
			//this.width = bounds.width;
			//this.height = bounds.height;
			
			var wasNotClicked = !this.clicked;
			this.updateStats(c);

			if (this.clicked && wasNotClicked) {
				this.checked = !this.checked;
				if (!_.isUndefined(this.handler)) {
					this.handler(this.checked);
				}
			}
		}
		
		this.draw = function(c) {
			c.globalAlpha = 1.0;
			//draw outer box
			c.strokeStyle = "rgba(153, 184, 152, 0.4)";
			c.lineWidth = 4;
			//c.strokeRect(this.x, this.y, this.width, this.height);
			c.strokeRect(this.x, this.y, this.width, this.height);

			//draw check or x
			c.font = "26px sans-serif";
			if (this.checked) {
				c.fillStyle = "rgba(153, 184, 152, 0.4)";
				c.fillText("\u2713", this.x+5, this.y);
			} else {
				c.fillStyle = "rgba(153, 184, 152, 0.2)";
				c.fillText("\u2715", this.x+5, this.y);
			}
		}
	}
	CheckBox.prototype = _.extend(CheckBox.prototype, UIObject);
	
