function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}
Ball.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size);
}
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
}
