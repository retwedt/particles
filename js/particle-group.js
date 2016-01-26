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

		// Position Vector
		var x = random(radius, width-radius);
		var y = random(radius, height-radius);
		var posVect = createVector(x, y);

		// Velocity Vector
		var angle = random(0, 360);
		var speed = random(8, 10);
		var xVelocity = speed*cos(angle); // Horizontal velocity
		var yVelocity = speed*sin(angle); // Vertical velocity
		var velVect = createVector(xVelocity, yVelocity);

		var particleColor = {
			r: random(0, 255),
			g: 0,
			b: 0,
			a:200
		};
		var particle = new Particle(radius, posVect, velVect, particleColor);

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

	// with vectors
	var distVect = p5.Vector.sub(ball1.posVect, ball2.posVect);

	// calculate normal plane and collision plane
	var normalPlane = distVect.normalize();
	var collisionPlane = createVector(normalPlane.y * -1, normalPlane.x);

	// calculate initial velocities for particles
	var ball1_normalVel = p5.Vector.dot(normalPlane, ball1.velVect);
	var ball1_collisionVel = p5.Vector.dot(collisionPlane, ball1.velVect);
	var ball2_normalVel = p5.Vector.dot(normalPlane, ball2.velVect);
	var ball2_collisionVel = p5.Vector.dot(collisionPlane, ball2.velVect);

	// calculate scalar velocities of particles after collision
	var ball1_normalVel_after = ((ball1_normalVel * (ball1.mass - ball2.mass)) + (2 * ball2.mass * ball2_normalVel)) / (ball2.mass + ball1.mass);
	var ball2_normalVel_after = ((ball2_normalVel * (ball2.mass - ball1.mass)) + (2 * ball1.mass * ball1_normalVel)) / (ball2.mass + ball1.mass);

	// convert scalars to vectors by multiplying by normalised plane vectors
	var ball1_normalVel_after_vect = ball1_normalVel_after * normalPlane;
	var ball1_collisionVel_vect = ball1_collisionVel * collisionPlane;
	var ball2_normalVel_after_vect = ball2_normalVel_after * normalPlane;
	var ball2_collisionVel_vect = ball2_collisionVel * collisionPlane;

	// combine normal and collision vectors back into a single vector
	var ball1_vel_after = p5.Vector.add(ball1_normalVel_after_vect, ball1_collisionVel_vect);
	var ball2_vel_after = p5.Vector.add(ball2_normalVel_after_vect, ball2_collisionVel_vect);

	// console.log(ball1_vel_after);

	var distance = dist(ball1.posVect.x, ball1.posVect.y, ball2.posVect.x, ball2.posVect.y);

	// labels
	text("1", ball1.posVect.x, ball1.posVect.y);
	stroke("green");
	line(ball1.posVect.x, ball1.posVect.y, ball2.posVect.x, ball2.posVect.y);

	// calculate angle of intersection between two particles
	var slope = (ball2.posVect.y - ball1.posVect.y)/(ball2.posVect.x - ball1.posVect.x);
	var tanSlope =  -(ball2.posVect.x - ball1.posVect.x)/(ball2.posVect.y - ball1.posVect.y);
	var intersectionAngle = atan2((ball2.posVect.y - ball1.posVect.y), (ball2.posVect.x - ball1.posVect.x));
	var lineX = ball1.radius*cos(intersectionAngle);
	var lineY = ball1.radius*sin(intersectionAngle);

	// if particles are colliding, display the intersection point and a
	// the collision plane
	if (distVect.mag() <= ball1.radius + ball2.radius) {

		fill("black");
		stroke("black");
		ellipse((ball1.posVect.x + lineX), (ball1.posVect.y + lineY), 10, 10);
		line((ball1.posVect.x+lineX)-(lineY), (ball1.posVect.y+lineY)+(lineX), (ball1.posVect.x+lineX)+(lineY), (ball1.posVect.y+lineY)-(lineX));

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


