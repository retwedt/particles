/*
	Define all variables and methods needed for our custom Particle Group

*/ 


/**
 * ParticleGroup - a group of particles that bounce around the screen
 * 
 * size {number} number of particles to create
 * x {number} x position where particles start
 * y {number} y position where particles start
 * gravity {number} strength of gravity (downward speed in px/frame)
*/
function ParticleGroup(size, x, y, gravity) {
	this.particles = [];
	this.gravity = gravity;

	// Create the number of particles specified and store them in the group
	for (var i = 0; i < size; i++) {
		// Create a randomized particle that is centered on the x and y position
		// passed into the ParticleGroup
		var radius = random(20, 60);
		var xVelocity = random(-12, 12);
		// var yVelocity = random(-12, 12);
		var yVelocity = random(-16, -8);
		var particleColor = {r: random(0, 255), g: 0, b: 0};
		var life = random(40, 200);
		var particle = new Particle(x, y, radius, xVelocity, yVelocity, 
									particleColor, life, gravity);
		this.particles.push(particle);
	}
}


// Update all particles in the group
ParticleGroup.prototype.update = function () {
	// Call the particle's update function
	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].update(); 
	}

	// Remove any dead particles.  We need to loop backwards here so that when 
	// we remove an element, we don't run into problems.
	for (var i = this.particles.length - 1; i >= 0; i--) {
		var isAlive = this.particles[i].checkIsAlive();
		if (!isAlive) {			


			// if (this.particles.length <= 200){
			if (this.particles[i].depth <= 1){
				// console.log(this.particles[i].depth);
				var rndBurst = random(4, 10);
				// Create the number of particles specified and store them in the group
				for (var j = 0; j < rndBurst; j++) {
					// Create a randomized particle that is centered on the x and y position
					// passed into the ParticleGroup
					var radius = random(10, 30);
					var xVelocity = random(-12, 12);
					var yVelocity = random(-12, 12);
					var particleColor = {r: random(0, 255), g: 0, b: 0};
					var life = random(40, 200);
					var particle = new Particle(this.particles[i].x, this.particles[i].y, radius, xVelocity, yVelocity, 
												particleColor, life, this.gravity);
					particle.depth = this.particles[i].depth + 1;
					this.particles.push(particle);
				}				
			}

			this.particles.splice(i, 1);



		}
	}	
	
	// this.colorCollisions();
};


// Draw all the live particles in the group
ParticleGroup.prototype.draw = function() {
	for (var i = 0; i < this.particles.length; i++) {
		var particle = this.particles[i];
		if (particle.checkIsAlive()){
			particle.draw();
		}
	}
};




ParticleGroup.prototype.checkIsAlive = function(){
	// The particle group is "dead" when all of the particles within it are 
	// dead.  Since we remove any dead particles as we update, if there are any
	// particles in this.particles, then the particle system is alive.
	if (this.particles.length > 0) {
		return true;
	}
	return false;
};


ParticleGroup.prototype.checkCollision = function (ball1, ball2) {
	var distance = dist(ball1.x, ball1.y, ball2.x, ball2.y);
	if (distance <= (ball1.radius + ball2.radius)) {
		return true; // The balls are within collision range
	}
	return false; // The balls were not within collision range
};


ParticleGroup.prototype.colorCollisions = function() {
	for (var i=0; i<this.particles.length; i++){
		this.particles[i].color.b = 0;
	}

	for (var i=0; i<this.particles.length; i++){
		for (var j=i+1; j<this.particles.length; j++){
			var ball1 = this.particles[i];
			var ball2 = this.particles[j];
			if (this.checkCollision(ball1, ball2)) {
				this.particles[i].color.b = 255;
				this.particles[j].color.b = 255;
			}
		}
	}
};