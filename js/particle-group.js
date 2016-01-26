/*
	Define all variables and methods needed for our custom Particle Group

*/ 


// ParticleGroup constructor - defines the ParticleGroup and any of it's 
// variables
function ParticleGroup(size, x, y) {
	this.particles = [];

	// Create the number of particles specified and store them in the group
	for (var i = 0; i < size; i++) {
		// Random values for particle parameters
		var radius = random(20, 60);
		var xVelocity = random(-12, 12);
		var yVelocity = random(-12, 12);
		if (xVelocity > 0){ // Add min x values
			xVelocity += random(3, 5);
		} else {
			xVelocity -= random(3, 5);
		}
		if (yVelocity > 0){ // Add min y values
			yVelocity += random(3, 5);
		} else {
			yVelocity -= random(3, 5);
		}
		// var particleColor = [random(0, 255), 0, 0, 100];
		var particleColor = {
			r: random(0, 255),
			g: 0,
			b: 0,
			a:200
		};
		var life = random(40, 200);
		var mass = random(1, 2);
		var particle = new Particle(x, y, radius, xVelocity, yVelocity, particleColor, life, mass);

		this.particles.push(particle);
	}
}


// Update all particles in the group
ParticleGroup.prototype.update = function (gravity) {
	for (var i = 0; i < this.particles.length; i++) {
		// Call the particle's update function, pass gravity as a parameter
		this.particles[i].update(gravity);
	}
	this.isAlive();
	this.checkAllCollisions();
};


// Draw function added to prototype of Particle Group
ParticleGroup.prototype.draw = function () {
	for (var i = 0; i < this.particles.length; i++) {
		// Call the particle's draw function
		if (this.particles[i].life>=0){
			this.particles[i].draw();
		}
	}
};


ParticleGroup.prototype.checkCollision = function (ball1, ball2) {
	var distance = dist(ball1.x, ball1.y, ball2.x, ball2.y);
	if (distance <= ball1.radius + ball2.radius && ball1.life>=0 && ball2.life>=0) {
		return true;
	}
	return false;
};


ParticleGroup.prototype.checkAllCollisions = function() {
	for (var i=0; i<this.particles.length; i++){
		// this.particles[i].color.g = 0;
		// this.particles[i].color[1] = 0;
		this.particles[i].isColliding = false;
	}

	for (var i=0; i<this.particles.length; i++){
		for (var j=i+1; j<this.particles.length; j++){
			var ball1 = this.particles[i];
			var ball2 = this.particles[j];
			if (this.checkCollision(ball1, ball2)) {
				ball1.isColliding = true;
				ball2.isColliding = true;
				// ball1.color.g = 255;
				// ball2.color.g = 255;
				// ball1.color[1] = 255;
				// ball2.color[1] = 255;
			}
		}
	}
};


// Check if any particles are alive in the group
// If a particle's life is 0 or less, remove it from the particles array
ParticleGroup.prototype.isAlive = function(){
	for (var i=0; i<this.particles.length; i++){
		if (this.particles[i].life<= 40){
			// var x = 100;
			// var a = map(x, 0, this.particles[i].color.a, 0, 60);
			// this.particles[i].color.a = a;
			this.particles[i].color.a -= 5;
		}

		if (this.particles[i].life<=0){
			this.particles.splice(i, 1);
			i--;
		}
	}
};


