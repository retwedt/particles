function ParticleGroup(){
	this.group = [];
	this.maxSize = 0;
}


ParticleGroup.prototype.setup = function(size){
	this.maxSize = size;

	//set up color for orbs
	var particleColor = {
		r: 0,
		g: 0,
		b: 0
	};

	for (var i=0; i<this.maxSize; i++){
		particleColor.r = i * (255/size);
		var particle = new Particle();

		var rndX = random(100, width - 100);
		var rndY = random(100, height - 100);
		particle.setup(rndX, rndY, 120, 120, random(3,4), random(0, 360), 1, particleColor);

		var isColliding = true;
		var attempts = 0;
		while (isColliding) { 
			isColliding = false;				
			for (var j = 0; j < this.group.length; j += 1) {
				var existingBall = this.group[j];
				if (this.checkCollision(particle, existingBall)) {
					particle.x = random(100, width - 100);
					particle.y = random(100, height - 100);
					isColliding = true;
					// console.log("collide attempts: " + attempts);
					attempts++;
					if (attempts > 40){
						// console.log("i'm out!");
						isColliding=false;
						break;
					}
					break;
				}
			}
		}

		particle.id = i;
		this.group.push(particle);
	}
};


ParticleGroup.prototype.update = function(){
	for (var i=0; i<this.maxSize; i++){
		this.group[i].update();
	}
	this.checkAllCollisions();
};


ParticleGroup.prototype.checkCollision = function (ball1, ball2) {
	var distance = dist(ball1.x, ball1.y, ball2.x, ball2.y);
	if (distance <= ball1.radius + ball2.radius) {
		return true;
	}
	return false;
};


ParticleGroup.prototype.checkAllCollisions = function() {
	for (var i=0; i<ballPit.maxSize; i++){
		ballPit.group[i].color.g = 0;
	}

	for (var i=0; i<this.maxSize; i++){
		for (var j=i+1; j<this.maxSize; j++){
			var ball1 = this.group[i];
			var ball2 = this.group[j];
			if (this.checkCollision(ball1, ball2)) {
				this.group[i].color.g = 255;
				this.group[j].color.g = 255;

				// //velocity exchanged in a perfectly elastic collision
				// var tempXVel = this.group[i].xVel;
				// this.group[i].xVel = this.group[j].xVel;
				// this.group[j].xVel = tempXVel;

				// var tempYVel = this.group[i].yVel;
				// this.group[i].yVel = this.group[j].yVel;
				// this.group[j].yVel = tempYVel;
			}
		}
	}
};


ParticleGroup.prototype.draw = function(){
	for (var i=0; i<this.maxSize; i++){
		this.group[i].draw();
	}
};
