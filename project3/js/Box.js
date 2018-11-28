function Box(x,y,vx,vy,size,speed,image) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.angle = 0;
  this.rotate = 0;
  this.scaleFactor = 1;
  this.moveRight =false;
  this.moveLeft =false;
  this.moveUp =false;
  this.moveDown =false;
  this.image = image;
  }
Box.prototype.display = function () {
  //Display boxes
  push();
  translate(this.x,this.y);
  rotateX(this.rotate);
  rotateY(this.angle);
  scale(this.scaleFactor);
  texture(this.image);
  box(this.size);
  pop();
}

Box.prototype.update = function () {

  //Define the distance between mouse and ball
  let distanceX = (mouseX-this.x);
  let distanceY = (mouseY-this.y);
  //The velocity of the balls is the distance divided by 100
  this.vx = (distanceX/100);
  this.vy = (distanceY/100);
}

Box.prototype.separate = function(boxes) {
//How much the boxes should be separated
  var desiredseparation = 50.0;
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boxes.length; i++) {
    let cPos = createVector(this.x,this.y);
    let otherPos = createVector(boxes[i].x,boxes[i].y);
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
