/*
	Particle Burst!

*/ 


var allParticles = []; // Array to hold all particle groups on screen
var gravity = 0.6; // Global variable for gravity


function setup(){
	createCanvas(windowWidth, windowHeight); // Create canvas that fills screen

}


function draw() {
	fill(255, 255, 255, 30);
	rect(0,0, width, height);

	noStroke();

	// If a particle group has particles in it, draw the particles and update their position
	// If the particle group is empty, remove it from the allparticles array
	for (var i=0; i<allParticles.length; i++){
		if (allParticles[i].particles.length > 0){
			allParticles[i].draw();
			allParticles[i].update(gravity);
		} else {
			allParticles.splice(i, 1);
			i--;
		}
	}
}


function mousePressed(){
	var burst = new ParticleGroup(random(60, 80), mouseX, mouseY);
	allParticles.push(burst);
}


function touchStarted(){
	var burst = new ParticleGroup(random(60, 80), touchX, touchY);
	allParticles.push(burst);
}


function touchMoved(){
	return false;
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}