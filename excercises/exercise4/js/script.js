// Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

// Game colors
var bgColor = 0;
var fgColor = 255;

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
///////// NEW /////////
  size: 40, //made ball bigger
///////// END NEW /////////
  vx: 0,
  vy: 0,
  speed: 5,
///////// NEW /////////
  picture: 0,
  imageChosen: 1
///////// END NEW /////////
}
///////// NEW /////////
//Variables for ball textures
var textureImage1;
var textureImage2;
var textureImage3;
///////// END NEW /////////

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
///////// NEW /////////
  score: 0, //variable for leftPaddle score
  colourPaddle: 0 //variable for colour
///////// END NEW /////////
}




// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
///////// NEW /////////
  score: 0, //variable for rightPaddle score
  colourPaddle: 0 //variable for colour
///////// END NEW /////////
}



// A variable to hold the beep sound we will play on bouncing
var beepSFX;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
///////// NEW /////////
// define ball texture images
  textureImage1 = loadImage("assets/images/text1.png");
  textureImage2 = loadImage("assets/images/text2.png");
  textureImage3 = loadImage("assets/images/text3.png");
  textureImage4 = loadImage("assets/images/text4.png");
  textureImage5 = loadImage("assets/images/text5.png");
///////// END NEW /////////
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640,480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  ///////// NEW /////////
  leftPaddle.colourPaddle = color(255) //gives paddle initial colour of white
  ///////// END NEW /////////

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;

  ///////// NEW /////////
  rightPaddle.colourPaddle = color(255) //gives paddle initial colour of white
  ///////// END NEW /////////

}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
  ///////// NEW /////////
  //Initial ball texture
  ball.picture = textureImage1;
  ///////// END NEW /////////
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(bgColor);

  // Handle input
  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!
  handleInput(leftPaddle);
  handleInput(rightPaddle);

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  updatePosition(leftPaddle);
  updatePosition(rightPaddle);
  updatePosition(ball);

  // Handle collisions
  handleBallWallCollision();
  handleBallPaddleCollision(leftPaddle);
  handleBallPaddleCollision(rightPaddle);

  // Handle the ball going off screen
  handleBallOffScreen();

  // Display the paddles and ball
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}


// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
///////// NEW /////////
//Change ball texture whenever it hits the paddle
// but never to the same texture it already is.
  let randomX = Math.floor (random(1,5));
  while (ball.imageChosen == randomX){
    randomX = Math.floor (random(1,5));
  }
  ball.imageChosen = randomX;
// Define the random number generated
if (ball.imageChosen == 1)
  ball.picture = textureImage1;
if (ball.imageChosen == 2)
  ball.picture = textureImage2;
if (ball.imageChosen == 3)
    ball.picture = textureImage3;
if (ball.imageChosen == 4)
    ball.picture = textureImage4;
if (ball.imageChosen == 5)
    ball.picture = textureImage5;
///////// END NEW /////////
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

///////// NEW /////////
//When the ball goes off the screen on the right, leftPaddle gets a point.
  if (ballLeft > width){
    leftPaddle.score = leftPaddle.score + 1;
//When leftPaddle gets a point, it changes to a random colour.
    leftPaddle.colourPaddle = color(random(255),random(255),random(255));
//When leftPaddle gets a point, ball launches left
    ball.vx = random(-5,-3);
  }

  //When the ball goes off the screen on the left, rightPaddle gets a point.
  if (ballRight < 0){
    rightPaddle.score = rightPaddle.score + 1;
  //When rightPaddle gets a point, it changes to a random colour.
    rightPaddle.colourPaddle = color(random(255),random(255),random(255));
  //When rightPaddle gets a point, ball launches left
    ball.vx = random(3,5);
  }
///////// END NEW /////////

  // Check for ball going off the sides
  if (ballRight < 0 || ballLeft > width) {
    // If it went off either side, reset it to the centre
    ball.x = width/2;
    ball.y = height/2;
    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!


  }
}

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
///////// NEW /////////
  fill(255); //gives ball fill of white so it doesn't change like paddles.
  //make ball texture image
  image(ball.picture,ball.x-ball.size/2,ball.y-ball.size/2,ball.size,ball.size)
///////// END NEW /////////
  /*rect(ball.x,ball.y,ball.size,ball.size);*/
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
///////// NEW /////////
  fill(paddle.colourPaddle); //gives paddles fill
///////// END NEW /////////
  rect(paddle.x,paddle.y,paddle.w,paddle.h);
}
