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
function Particle (radius, posVect, velVect, colorObj) {
	this.radius = radius;
	this.posVect = posVect;
	this.velVect = velVect;

	this.angle = atan2(this.velVect.y, this.velVect.x);

	this.color = {
		r:colorObj.r,
		g:colorObj.g,
		b:colorObj.b,
		a:colorObj.a
	};

	this.mass = 1; // only used in collision detection currently

	this.isColliding = false;
}


// Update position of each particle and check for wall collisions
Particle.prototype.update = function () {
	// Update particle position using velocity
	this.posVect.x += this.velVect.x;
	this.posVect.y += this.velVect.y;

	// Left wall
	if (this.posVect.x < this.radius) { 
		this.posVect.x = this.radius;
		this.velVect.x *= -1;
	} 
	// Right wall
	else if (this.posVect.x > (width - this.radius)) { 
		this.posVect.x = width - this.radius;
		this.velVect.x *= -1;
	}

	// Top wall
	if (this.posVect.y < this.radius) { 
		this.posVect.y = this.radius;
		this.velVect.y *= -1;
	}
	// Bottom wall 
	else if (this.posVect.y > (height - this.radius)) { 
		this.posVect.y = height - this.radius;
		this.velVect.y *= -1;
	}

	// for graphics calculations
	this.angle = atan2(this.velVect.y, this.velVect.x);
	this.speed = sqrt((this.velVect.x*this.velVect.x) + (this.velVect.y + this.velVect.y));


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
	ellipse(this.posVect.x, this.posVect.y, this.radius * 2, this.radius * 2);

	noFill();
	stroke("white");

	var lineX = this.radius*cos(this.angle);
	var lineY = this.radius*sin(this.angle);
	line(this.posVect.x, this.posVect.y, (this.posVect.x+lineX), (this.posVect.y+lineY));

	
	var slope = lineY/lineX;
	var tanSlope = -lineX/lineY;

	stroke("blue");

	line((this.posVect.x+lineX)-(lineY), (this.posVect.y+lineY)+(lineX), (this.posVect.x+lineX)+(lineY), (this.posVect.y+lineY)-(lineX));

};
