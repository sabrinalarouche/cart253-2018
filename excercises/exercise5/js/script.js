// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

///////// NEW /////////
var ballOffScreen = ball.isOffScreen();
//if the ball goes off the left, rightPaddle gets a point and changes colour.
  if (ballOffScreen === 'l') {
    rightPaddle.score += 1;
    rightPaddle.colourPaddle = color(random(255),random(255),random(255));
    ball.reset();
  }
//if the ball goes off the right, leftPaddle gets a point and changes colour.
  if (ballOffScreen === 'r') {
    leftPaddle.score += 1;
    leftPaddle.colourPaddle = color(random(255),random(255),random(255));
    ball.reset();
  }
///////// END NEW /////////
  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();

}
