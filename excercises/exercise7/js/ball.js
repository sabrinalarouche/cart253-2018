function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  //initial ball colour
  this.color = color(255);
  }

  Ball.prototype.display = function () {
    fill(this.color);
    rect(this.x,this.y,this.size,this.size);
  }

Ball.prototype.update = function () {
  //Define the distance between mouse and ball
  let distanceX = (mouseX-this.x);
  let distanceY = (mouseY-this.y);
  //The velocity of the balls is the distance divided by 100
  this.vx = (distanceX/100);
  this.vy = (distanceY/100);
}
//https://p5js.org/examples/simulate-flocking.html
//Modified Boid algorithm
//Separation
// Method checks for nearby boids and steers away
Ball.prototype.separate = function(balls) {
//How much the balls should be separated
  var desiredseparation = 50.0;
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < balls.length; i++) {
    let cPos = createVector(this.x,this.y);
    let otherPos = createVector(balls[i].x,balls[i].y);
    var d = p5.Vector.dist(cPos,otherPos);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(cPos,otherPos);
      diff.normalize();
      diff.div(d);        // Weight by distance
      this.vx+=diff.x;
      this.vy+=diff.y;
      this.x += this.vx;
      this.y += this.vy;
      count++;            // Keep track of how many
    }
  }
}
