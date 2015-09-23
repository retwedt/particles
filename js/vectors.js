//global variables
var mainCanvas;

var balls;


function setup(){
	mainCanvas = createCanvas(windowWidth, windowHeight);

	angleMode(DEGREES);

	balls = new ParticleGroup(2);

}


function draw() {
	background(255);

	balls.draw();
	balls.update();

}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}