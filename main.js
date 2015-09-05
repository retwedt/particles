//global variables
var mainCanvas;
var ballPit;

function setup(){
	mainCanvas = createCanvas(windowWidth, windowHeight);

	// angleMode(DEGREES);

	ballPit = new ParticleGroup();
	ballPit.setup(40);
}


function draw() {
	background(255);

	ballPit.draw();
	// debugger;
	ballPit.update();
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}