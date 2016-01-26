/*
	Define all variables and methods needed for our custom particles

*/ 



/**
 * Particle - a circle particle that bounces around the screen
 * 
 * xCenter {number} x position of center of circle (px)
 * yCenter {number} y position of center of circle (px)
 * radius {number} radius of circle (px)
 * xVelocity {number} horizontal velocity of particle (px/frame)
 * yVelocity {number} vertical velocity of particle (px/frame)
 * colorObj {object} color of particle, in the form {r: 255, g: 0, b: 0}
 * life {number} number of frames the particle is alive
 * gravity {number} added vertical velocity of particle to simulate gravity (px/frame)
*/
function Particle (xCenter, yCenter, radius, xVelocity, yVelocity, colorObj, life, gravity) {
	this.x = xCenter;
	this.y = yCenter;
	this.radius = radius;
	this.startRadius = radius;  // Hold on to starting point for radius, for mapping
	this.xVelocity = xVelocity;
	this.yVelocity = yVelocity;
	this.gravity = gravity;
	this.color = colorObj;
	this.initialLife = life; // Hold on to starting point for life, for mapping
	this.life = life;
	this.depth = 0; // used to keep track of # of times particle has burst, for fireworks
}


// Update position of each particle and check for wall collisions
Particle.prototype.update = function () {
	this.life -= 1;

	// Update particle position
	this.x += this.xVelocity;
	this.yVelocity += this.gravity; // Apply gravity
	this.y += this.yVelocity;

	// Left wall
	if (this.x < this.radius) { 
		this.x = this.radius;
		this.xVelocity *= -1;
	} 
	// Right wall
	else if (this.x > (width - this.radius)) { 
		this.x = width - this.radius;
		this.xVelocity *= -1;
	}
	// Top wall
	if (this.y < this.radius) { 
		this.y = this.radius;
		this.yVelocity *= -1;
	}
	// Bottom wall 
	else if (this.y > (height - this.radius)) { 
		this.y = height - this.radius;
		this.yVelocity *= -1;
	}
};


Particle.prototype.checkIsAlive = function(){
	if (this.life <= 0) {
		return false;
	}
	return true;
};


// Draw the particle
Particle.prototype.draw = function () {
	// Use the value of life to control the alpha of the particle.  When life
	// is at it's starting point, the particle should be opaque.  When the 
	// particle is dead (life === 0), it should be transparent.

	// var alpha = map(this.life, 0, this.initialLife, 0, 255);

	// var dr = 0;
	// if (this.life<=10){
	// dr = map(this.radius, 0, this.startRadius, 10, 0);  // change in radius
	// }

	// fill(this.color.r, this.color.g, this.color.b, alpha);
	fill(this.color.r, this.color.g, this.color.b, this.color.a);

	noStroke();
	
	ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
	// ellipse(this.x, this.y, dr * 2, dr * 2);
};
