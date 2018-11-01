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
var state = "TITLE";
///////// END NEW /////////
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

///////// NEW /////////
//Establish the state of the game and what will be displayed
  switch (state) {
    case "TITLE":
    displayTitle();
    break;

    case "GAME":
    displayGame();
    break;

    case "GAME OVER":
    displayGameOver();
    break;
  }
  //Introduction page:
  function displayTitle() {
    // Set up all the styling elements
    push();
    textAlign(CENTER,CENTER);
    textSize(32);
    fill(255);
    stroke(255);
    // Display the text
    text("EXTREME PONG!",width/2,height/2);
    // Font size goes down
    textSize(16);
    // Display the instructions
    text("Press SPACE to play\nPlayer 1 use WASD to move\n Player 2 use ARROWS to move\n First player to 11 points wins!",width/2,3*height/4);
    pop();

    // Plays game if space is pressed
    if (keyIsPressed && key === ' ') {
      state = "GAME";
    }
  }
//When the state is 'Game', it will display the following
function displayGame() {
///////// END NEW /////////
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  //Display number player score
    fill(255)
    text('Player 1: '+leftPaddle.score,30,30);
    fill(255)
    text('Player 2: '+rightPaddle.score,540,30);

  ///////// NEW /////////
  var ballOffScreen = ball.isOffScreen();
  //if the ball goes off the left, rightPaddle gets a point.
    if (ballOffScreen === 'l') {
      rightPaddle.score += 1;
      ball.reset();
    }
  //if the ball goes off the right, leftPaddle gets a point.
    if (ballOffScreen === 'r') {
      leftPaddle.score += 1;
      ball.reset();
    }
  ///////// END NEW /////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
}
