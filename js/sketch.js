/*
	Particle Burst!

*/ 

var particleGroups = [];

function setup(){
	createCanvas(windowWidth, windowHeight); // Create canvas that fills screen

}


function draw() {
	background(255, 255, 255, 100);

	// We need to loop backwards here so that when we remove an element, we 
	// don't run into problems.
	for (var i = particleGroups.length - 1; i >= 0; i--) {
		if (particleGroups[i].checkIsAlive()){
			// Particle group is alive and well, so it can update and draw
			particleGroups[i].draw();
			particleGroups[i].update();
		} 
		else {
			// Particle group is dead, so we can stop holding on to it.
			particleGroups.splice(i, 1);
		}
	}
}


function mousePressed() {
	// var numParticles = random(60, 80);
	var numParticles = random(2, 3);
	var gravity = 0.6;
	var burst = new ParticleGroup(numParticles, mouseX, mouseY, gravity);
	particleGroups.push(burst);
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}