/*
	Particles without using Objects!

	Use variables to store properties of an object!

	Concepts to review:
		Arrays
		Array.push()

	From p5.js
		ellipse()
		windowWidth/windowHeight
		width/height
		random()
		fill()/stroke()

*/ 

// Create variables for particle
var radius;
var xCenter;
var yCenter;
var xVelocity;
var yVelocity;


function setup(){
	createCanvas(windowWidth, windowHeight); // Create canvas that fills screen

	// Setup variables for particle
	radius = random(50, 100);
	xCenter = random(radius, width - radius);
	yCenter = random(radius, height - radius);
	xVelocity = random(-10, 10);
	yVelocity = random(-10, 10);
}

function draw() {
	background(255, 44); // Fill background with white

	// Update particle position using velocity
	xCenter += xVelocity;
	yCenter += yVelocity;

	// If the particle position has reached one of the edges of the canvas:
	// 	1. Resolve the collision by moving the particle back in bounds.  
	// 	   Remember that the x & y position of the particle are it's centerX
	// 	   and centerY, so we'll need to consider the radius to figure out if 
	// 	   it's out of bounds.
	// 	2. Flip the velocity in the x or y direction to create a bounce
	// 	(Note: colliding horizontally is independent of colliding vertically.)
	
	// Left wall
	if (xCenter < radius) { 
		xCenter = radius;
		xVelocity *= -1;
	} 
	// Right wall
	else if (xCenter > (width - radius)) { 
		xCenter = width - radius;
		xVelocity *= -1;
	}
	// Top wall
	if (yCenter < radius) { 
		yCenter = radius;
		yVelocity *= -1;
	}
	// Bottom wall 
	else if (yCenter > (height - radius)) { 
		yCenter = height - radius;
		yVelocity *= -1;
	}

	fill(0, 0, 0);
	noStroke();
	ellipse(xCenter, yCenter, radius * 2, radius * 2);
}
