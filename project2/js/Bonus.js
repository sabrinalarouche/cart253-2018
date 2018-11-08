///////// NEW /////////
function Bonus(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.originx = x;
  this.originy = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.picture = bonusImage;
  //random border of how far the object can move travel before reversing direction
  this.border = random(20,100);
}
// Draw the ball as a rectangle on the screen
Bonus.prototype.display = function () {
  fill(255);
  image(this.picture,this.x,this.y,this.size,this.size);
}
Bonus.prototype.handleCollision = function(ball) {
  // Check if the ball overlaps the bonus object
  if (ball.x + ball.size > this.x && ball.x < this.x + this.size) {
    // Check if the ball overlaps the bonus object
    if (ball.y + ball.size > this.y && ball.y < this.y + this.size) {
      this.x = random(width/2-200,width/2+200);
      this.y = random(height/2-200,height/2+200);
      //sound whenever there is a collision between ball and bonus
      bonusSound.play();
      //if player 2 is the last one to hit the ball before it overlaps the bonus
      if(currentPlayerHit ==="player2"){
        //the paddle will increase by 5
        rightPaddle.h += 5;
        console.log("playerHitR");
        //if player 1 is the last one to hit the ball before it overlaps the bonus
      }
      if(currentPlayerHit ==="player1"){
        //the paddle will increase by 5
        leftPaddle.h += 5;
        console.log("playerHitL");
      }
    }
  }
}
//Adding movement to the array of objects at the end
//the objects will move left to right, reversing direction when they hit the border (random amount from 20-100)
Bonus.prototype.update = function(){
  this.x += this.vx;
  if (this.x> this.border+this.originx ){
    this.vx = -this.vx;
  }
  if (this.x< this.originx-this.border){
    this.vx = -this.vx;
  }
}
///////// END NEW /////////
