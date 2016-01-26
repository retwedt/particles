/*
	Define all variables and methods needed for our custom particles

*/ 


// Particle constructor - defines the Particle object and any of its variables 
function Particle (xCenter, yCenter, radius, xVelocity, yVelocity, colorObj, life, mass) {
	this.x = xCenter;
	this.y = yCenter;
	this.radius = radius;
	this.xVelocity = xVelocity; // Horizontal velocity
	this.yVelocity = yVelocity; // Vertical velocity

	// this.color = color([colorObj.r, colorObj.g, colorObj.b, colorObj.a]);
	this.color = {
		r:colorObj.r,
		g:colorObj.g,
		b:colorObj.b,
		a:colorObj.a
	};

	this.life = life;
	this.mass = mass;

	this.isColliding = false;
}


// Update position of each particle and check for wall collisions
Particle.prototype.update = function (gravity) {
	this.life--; // life of particle goes down each frame

	// Update particle position using velocity
	this.x += this.mass*this.xVelocity;
	this.yVelocity += 1;
	this.y += this.mass*this.yVelocity;

	// Left wall
	if (this.x < this.radius) { 
		this.x = this.radius;
		// this.xVelocity *= -1;
		this.xVelocity *= -0.9; // Friction
	} 
	// Right wall
	else if (this.x > (width - this.radius)) { 
		this.x = width - this.radius;
		// this.xVelocity *= -1;
		this.xVelocity *= -0.9; // Friction
	}
	// Top wall
	if (this.y < this.radius) { 
		this.y = this.radius;
		// this.yVelocity *= -1;
		this.yVelocity *= -0.9; // Friction
	}
	// Bottom wall 
	else if (this.y > (height - this.radius)) { 
		this.y = height - this.radius;
		// this.yVelocity *= -1;
		this.yVelocity *= -0.9; // Friction
	}
};


// Draw the particle
Particle.prototype.draw = function () {
	fill(this.color.r, this.color.g, this.color.b, this.color.a);
	// fill(this.color);
	if (this.isColliding){
		strokeWeight(1);
		stroke('white');
	} else {
		noStroke();
	}
	ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
};
