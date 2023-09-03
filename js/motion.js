var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Variables
var mouse = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2 
};

var colors = [
	'#A7557A',
	'#F6EEAE',
	'#F494BF',
	'#62B3C1',
	'#5D9CA7'
];

var gravity = 0.0980;
var friction = 1.03;


addEventListener("resize", function() {
	canvas.width = window.innerWidth;	
	canvas.height = window.innerHeight;
  init();
});




// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 3) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dy;
	this.dy = dx;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dx;
			this.dx = this.dy * friction;
			this.dy = this.dx * friction;
		} else {
			this.dy += gravity;
		}

		if (this.y + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dy * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}


// Implementation
var ballArray = [];

function init() {
	ballArray = [];

	for (let i = 0; i < 300; i++) {
		var radius = randomIntFromRange(8, 20);
		var x = randomIntFromRange(radius, window.innerWidth - radius);
		var y = randomIntFromRange(0, window.innerHeight - radius);
		var dx = randomIntFromRange(-3, 3)
		var dy = randomIntFromRange(-2, 2)
	    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}

init();
animate();