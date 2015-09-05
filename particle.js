function Particle () {
	this.x = 0;
	this.y = 0;

	this.width = 0;
	this.height = 0;
	this.radius = 0;

	this.speed = 0;
	this.angle = 0;
	this.xVel = 0;
	this.yVel = 0;

	this.id = 0;

	this.mass = 0;

	this.color = {
		r:0,
		g:0,
		b:0
	};
}


Particle.prototype.setup = function(newX, newY, newWidth, newHeight, newSpeed, newAngle, newMass, colorObj){
	this.x = newX;
	this.y = newY;

	this.width = newWidth;
	this.height = newHeight;
	this.radius = this.width/2;

	this.speed = newSpeed;
	this.angle = newAngle;
	this.xVel = this.speed*cos(this.angle);
	this.yVel = this.speed*sin(this.angle);

	// console.log(this.angle);

	this.mass = newMass;

	this.color.r = colorObj.r;
	this.color.g = colorObj.g;
	this.color.b = colorObj.b;
};


Particle.prototype.update = function(){
	this.x += this.mass*this.xVel;
	this.y += this.mass*this.yVel;

	if (this.x < this.width/3){
		this.x = this.width/3;
		this.xVel = -this.xVel;
	} else if (this.x > mainCanvas.width-(this.width/4)){
		this.x = mainCanvas.width-this.width/4;
		this.xVel = -this.xVel;
	}
	if (this.y < this.height/3){
		this.y = this.height/3;
		this.yVel = -this.yVel;
	} else if (this.y > mainCanvas.height-(this.height/4)){
		this.y = mainCanvas.height-this.height/4;
		this.yVel = -this.yVel;
	}

};


Particle.prototype.draw = function(){
	fill(this.color.r, this.color.g, this.color.b);
	noStroke();
	ellipse(this.x, this.y, this.width, this.height);

	fill("white");
	ellipse(this.x, this.y, 5, 5);
	text(this.id, this.x-3, this.y-3);

	// this.speed = sqrt((this.xVel*this.xVel) + (this.yVel*this.yVel));
	// // this.angle = atan(this.yVel/this.xVel);
	// this.angle = atan2(this.yVel,this.xVel);
	// text(this.speed, this.x-8, this.y+20);


	// noFill();
	// stroke("white");

	// var xLine = 60*cos(this.angle);
	// var yLine =60*sin(this.angle);

	// if (this.xVel<0){
	// 	xLine = -xLine;
	// }
	// if (this.yVel<0){
	// 	yLine = -yLine;
	// }

	// line(this.x, this.y, this.x+xLine, this.y+yLine);
};
