/*
	Define all variables and methods needed for our custom particles

	Use a constructor function to hold variables
		Variable values will be unique for each instance, 
		so don't use prototype!

	Use prototype to create methods that will be inherited
	by all instances of the Particle object
		These methods will not change with each instance,
		so you can use prototype!

*/ 


// Particle constructor - defines the Particle object and any of its variables 
function Particle (xCenter, yCenter, radius, angle, speed, colorObj) {
	this.x = xCenter;
	this.y = yCenter;
	this.radius = radius;

	this.angle = angle;
	this.speed = speed;
	this.xVelocity = this.speed*cos(this.angle); // Horizontal velocity
	this.yVelocity = this.speed*sin(this.angle); // Vertical velocity

	// this.color = color([colorObj.r, colorObj.g, colorObj.b, colorObj.a]);
	this.color = {
		r:colorObj.r,
		g:colorObj.g,
		b:colorObj.b,
		a:colorObj.a
	};

	this.isColliding = false;
}


// Update position of each particle and check for wall collisions
Particle.prototype.update = function () {
	// Update particle position using velocity
	this.x += this.xVelocity;
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

	this.angle = atan2(this.yVelocity, this.xVelocity);
	this.speed = sqrt((this.xVelocity*this.xVelocity) + (this.yVelocity + this.yVelocity));


};


// Draw the particle
Particle.prototype.draw = function () {
	fill(this.color.r, this.color.g, this.color.b, this.color.a);
	if (this.isColliding){
		strokeWeight(1);
		stroke('white');
	} else {
		noStroke();
	}
	ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

	noFill();
	stroke("white");

	var lineX = this.radius*cos(this.angle);
	var lineY = this.radius*sin(this.angle);
	line(this.x, this.y, (this.x+lineX), (this.y+lineY));

	
	var slope = lineY/lineX;
	var tanSlope = -lineX/lineY;

	stroke("blue");

	line((this.x+lineX)-(lineY), (this.y+lineY)+(lineX), (this.x+lineX)+(lineY), (this.y+lineY)-(lineX));

};
