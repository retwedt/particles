/*
	Define all variables and methods needed for our custom Particle Group

*/ 


// ParticleGroup constructor - defines the ParticleGroup and any of it's 
// variables
function ParticleGroup(size) {
	this.particles = [];
	this.colX = 0;
	this.colY = 0;

	// Create the number of particles specified and store them in the group
	for (var i = 0; i < size; i++) {
		// Random values for particle parameters
		var radius = random(80, 120);
		var angle = random(0, 360);
		var speed = random(8, 10);
		var x = random(radius, width-radius);
		var y = random(radius, height-radius);
		var particleColor = {
			r: random(0, 255),
			g: 0,
			b: 0,
			a:200
		};
		var particle = new Particle(x, y, radius, angle, speed, particleColor);

		this.particles.push(particle);
	}
}


// Update all particles in the group
ParticleGroup.prototype.update = function () {
	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].update();
	}
	this.checkAllCollisions();
};


// Draw function added to prototype of Particle Group
ParticleGroup.prototype.draw = function () {
	for (var i = 0; i < this.particles.length; i++) {
		// Call the particle's draw function
			this.particles[i].draw();
	}
};


ParticleGroup.prototype.checkCollision = function (ball1, ball2) {
	var distance = dist(ball1.x, ball1.y, ball2.x, ball2.y);

	// labels
	text("1", ball1.x, ball1.y);
	stroke("green");
	line(ball1.x, ball1.y, ball2.x, ball2.y);


	// calculate angle of intersection between two particles
	var slope = (ball2.y - ball1.y)/(ball2.x - ball1.x);
	var tanSlope =  -(ball2.x - ball1.x)/(ball2.y - ball1.y);
	var intersectionAngle = atan2((ball2.y - ball1.y), (ball2.x - ball1.x));
	var lineX = ball1.radius*cos(intersectionAngle);
	var lineY = ball1.radius*sin(intersectionAngle);

	// if particles are colliding, display the intersection point and a
	// the collision plane
	if (distance <= ball1.radius + ball2.radius) {

		fill("black");
		stroke("black");
		ellipse((ball1.x + lineX), (ball1.y + lineY), 10, 10);
		line((ball1.x+lineX)-(lineY), (ball1.y+lineY)+(lineX), (ball1.x+lineX)+(lineY), (ball1.y+lineY)-(lineX));

		// if particles are colliding, return true
		return true;
	}
	// if particles are not colliding, return false
	return false;
};


ParticleGroup.prototype.checkAllCollisions = function() {

	// reset particles to default state (not green, not colliding)
	for (var i=0; i<this.particles.length; i++){
		this.particles[i].color.g = 0;
		this.particles[i].isColliding = false;
	}

	for (var i=0; i<this.particles.length; i++){
		for (var j=i+1; j<this.particles.length; j++){
			var ball1 = this.particles[i];
			var ball2 = this.particles[j];
			// if there is a collision between two particles, 
			if (this.checkCollision(ball1, ball2)) {
	// 			this.colX = ball1.radius*cos(ball1.angle);
	// 			this.colY = ball1.radius*sin(ball1.angle);
	// ellipse(this.particles[i].x+this.colX, this.particles[i].y+this.colY, 5, 5);
				ball1.isColliding = true;
				ball2.isColliding = true;
				ball1.color.g = 50;
				ball2.color.g = 50;
			}
		}
	}
};


