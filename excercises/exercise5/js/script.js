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

///////// NEW /////////
// variable for image textures
var textureImage1;
var textureImage2;
var textureImage3;
var textureImage4;
var textureImage5;
var textureImage6;
var textureImage7;

// A variable to hold the beep sound we will play on bouncing
var beepSFX;
//variables for need audio sounds
var gruntSFX;
var crowdSFX;
var crowd2SFX;
// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");

//audio for ball off screen and collision with paddles
  gruntSFX = new Audio("assets/sounds/grunt.mp3");
  crowdSFX = new Audio("assets/sounds/crowd.mp3");
  crowd2SFX = new Audio("assets/sounds/crowd2.mp3");
// define ball texture images
  textureImage1 = loadImage("assets/images/text1.png");
  textureImage2 = loadImage("assets/images/text2.png");
  textureImage3 = loadImage("assets/images/text3.png");
  textureImage4 = loadImage("assets/images/text4.png");
  textureImage5 = loadImage("assets/images/text5.png");
  textureImage6 = loadImage("assets/images/text6.png");
  textureImage7 = loadImage("assets/images/text7.png");
}
///////// END NEW /////////
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
// Create a ball
///////// NEW /////////
  // changed ball size
  ball = new Ball(width/2,height/2,5,5,40,5);
// Create the right paddle with UP and DOWN as controls
  //changed paddle size
  rightPaddle = new Paddle(width-50,height/2,20,60,10,DOWN_ARROW,UP_ARROW);
// Create the left paddle with W and S as controls
// Keycodes 83 and 87 are W and S respectively
  //changed paddle size
  leftPaddle = new Paddle(50,height/2,20,60,10,83,87);
//stop the audio from playing unless instructed to
  gruntSFX.pause();
  crowdSFX.pause();
  crowd2SFX.pause();
///////// END NEW /////////
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
