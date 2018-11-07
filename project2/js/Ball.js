// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  ///////// NEW /////////
  //check if ball goes off right side
    if (this.x > width) {
  //left paddle will turn green when it gets a point and right paddle red
      leftPaddle.colourPaddle = color(0,255,0);
      rightPaddle.colourPaddle = color(255,0,0);
      return 'r';
    }
  //check if ball goes off left side
    if (this.x + this.size < 0) {
  //right paddle will turn green when it gets a point and left paddle red
      rightPaddle.colourPaddle = color(0,255,0);
      leftPaddle.colourPaddle = color(255,0,0);
      return 'l';
    }
    else {
    //when the ball is neither off the left or right side
      return 'n';
    }
  ///////// END NEW /////////
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size);
}
///////// NEW /////////
Ball.prototype.displayball2 = function () {
  fill(0,0,255);
  rect(this.x,this.y,this.size,this.size);
}
  ///////// END NEW /////////
// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}
  ///////// NEW /////////
Ball.prototype.handleCollisionball2 = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      paddle.h = paddle.h-3;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}
  ///////// END NEW /////////
// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  ///////// NEW /////////
  //reset function to handle ball launching towards winner at random velocity
  if (this.x + this.size < 0){
    //When rightPaddle gets a point, ball launches right
      this.vx = random(3,5);
      //launches at a random y velocity as it goes towards right
      this.vy = random(-4,4);
  }
  if (this.x > width){
    //When leftPaddle gets a point, ball launches left
        this.vx = random(-5,-3);
    //launches at a random y velocity as it goes towards left
        this.vy = random(-4,4);
  }
  ///////// END NEW /////////
  this.x = width/2;
  this.y = height/2;
}
