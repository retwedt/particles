/*
	Particles using Objects!

	TOPICS TO COVER IN DEMO
	=======================
	WHAT IS A CONSTRUCTOR?
	WHAT IS PROTOTYPE?
	WHAT IS THIS?
	DEFAULT VALUES FOR CONSTRUCTORS?

	Concepts to review:
		Arrays
		Array.push()
		ellipse()

*/ 

var ball; // Global variable for a single particle
var ballArray = []; // Global array variable to hold balls..........
var ballPit; // Global variable to hold particle group object

function setup(){
	createCanvas(windowWidth, windowHeight); // Create canvas that fills screen

	// // Create a single ball using the particle object!
	// var redColor = random(0, 255);
	// var radius = random(50, 100);
	// var xCenter = random(radius, width - radius);
	// var yCenter = random(radius, height - radius);
	// var xVelocity = random(-10, 10);
	// var yVelocity = random(-10, 10);
	// ball = new Particle(xCenter, yCenter, radius, xVelocity, yVelocity, redColor);

	// // Fill an array with balls!
	// for (var i=0; i<20; i++){
	// 	var redColor = random(0, 255);
	// 	var radius = random(50, 100);
	// 	var xCenter = random(radius, width - radius);
	// 	var yCenter = random(radius, height - radius);
	// 	var xVelocity = random(-10, 10);
	// 	var yVelocity = random(-10, 10);
	// 	ball = new Particle(xCenter, yCenter, radius, xVelocity, yVelocity, redColor);

	// 	ballArray.push(ball);
	// }

	// Create a new particle group to hold the ball pit
	ballPit = new ParticleGroup(20);
}

function draw() {
	background(255); // Fill background with white

	// // Draw a single ball!
	// ball.draw();
	// ball.update();

	// // Draw array of balls!
	// for (var i=0; i<ballArray.length; i++){
	// 	ballArray[i].draw();
	// 	ballArray[i].update();
	// }

	ballPit.draw();
	ballPit.update();
}
