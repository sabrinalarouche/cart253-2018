// Retro Pong
// by Sabrina Larouche
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
///////// NEW /////////
//Credit:
//Intro Music: Europe - The Final Countdown
//End Music: Queen - We Are The Champions
//Game Sound Effects: http://www.pacdv.com/sounds/interface_sounds-3.html
//background: Google image
//font: Google fonts
///////// END NEW /////////
// Variable to contain the objects representing our ball and paddles
///////// NEW /////////
var ball1;
//variable for array of bonus objects at end of game
var bonuses =[];
//variable for array of enemy balls
var enemies =[];
///////// END NEW /////////
var leftPaddle;
var rightPaddle;
///////// NEW /////////
//new object
var bonus;
var state = "TITLE";
var winner;
var bg;
var bonusImage;
var ballImage;
var enemyImage;
var enemySound;
var bonusSound;
var introSound;
var endSound;
var beepSFX;
var currentPlayerHit="";

function preload() {
  //game images
  bg = loadImage("assets/images/bg.jpg");
  bonusImage = loadImage("assets/images/disco.png");
  ballImage = loadImage("assets/images/ball.png");
  enemyImage = loadImage("assets/images/enemy.png");
  //audio for the game
  introSound = new Audio("assets/sounds/intro.mp3");
  endSound = new Audio("assets/sounds/end.mp3");
  beepSFX = new Audio("assets/sounds/beep.wav");
  enemySound = new Audio("assets/sounds/enemy.wav");
  bonusSound = new Audio("assets/sounds/bonus.wav");
}
///////// END NEW /////////
// setup()
//
// Creates the ball and paddles
function setup() {
  ///////// NEW /////////
  //Game is full screen
  createCanvas(window.innerWidth-5,window.innerHeight-5);
  // Create a ball
  ball1 = ball = new Ball(width/2,height/2,5,5,50,10);
  // Create the right paddle with UP and DOWN as controls
  //changed sizes to adapt to full screen
  rightPaddle = new Paddle(width-20,height/2,20,90,10,DOWN_ARROW,UP_ARROW,"player2");
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,20,90,10,83,87,"player1");
  //bonus object
  bonus = new Bonus(random(width/2-100,width/2+100),random(height/2-100,height/2+100),5,5,150,10);
  //array of bonus objects that will appear at random places and sizes at the end of game
  for (var i = 0; i < 50; i++){
    bonuses.push (new Bonus(random(0,width),random(0,height),1,2,random(30,150),2));
  }
  //array of enemy balls
  for (var i = 0; i < 3; i++){
    enemies.push (new Ball(random(width/2-100,width/2+100),random(height/2-100,height/2+100),5,5,50,5));
  }
}
///////// END NEW /////////
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  ///////// NEW /////////
  //background is an image
  background(bg);

  //Establish the state of the game and what will be displayed
  switch (state) {
    case "TITLE":
    displayTitle();
    break;

    case "GAME":
    displayGame();
    //display bonus object during the game only
    bonus.display();
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
    textSize(150);
    fill(64,224,208);
    textFont("VT323");
    stroke(255);
    // Display the text
    text("RETRO PONG!",width/2,height/2);
    // Font size goes down
    textSize(25);
    fill(255);
    // Display the instructions
    text("Press SPACE to play\nPlayer 1: WASD to move\n Player 2: ARROWS to move\n Avoid hitting the blue spikes so your paddle doesn't shrink.\n Bounce the pink triangle off your paddle to collide with the disco ball so your paddle grows.\nFirst player to 11 points wins!",width/2,3*height/4);
    pop();
    //play intro music
    introSound.play();
    introSound.loop = true;
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
    ///////// NEW /////////
    ball1.update();
    ///////// END NEW /////////
    leftPaddle.update();
    rightPaddle.update();

    ///////// NEW /////////
    //Display number player score
    fill(255);
    text('Player 1: '+leftPaddle.score,30,30);
    textSize(25);
    textFont("VT323");
    fill(255);
    text('Player 2: '+rightPaddle.score,windowWidth-150,30);
    textSize(25);
    textFont("VT323");

    var ballOffScreen = ball1.isOffScreen();
    //if the ball goes off the left, rightPaddle gets a point.
    if (ballOffScreen === 'l') {
      rightPaddle.score += 1;
      ball1.reset();
      //when player 1 has 11 points, it is the winner
      if (rightPaddle.score == 11){
        winner = "Player 1";
      }
    }
    //if the ball goes off the right, leftPaddle gets a point.
    if (ballOffScreen === 'r') {
      leftPaddle.score += 1;
      ball1.reset();
      //when player 2 has 11 points, it is the winner
      if (leftPaddle.score == 11){
        winner = "Player 2";
      }
    }

    ball1.handleCollision(leftPaddle);
    ball1.handleCollision(rightPaddle);

    bonus.handleCollision(ball1);

    ball1.display();
    ///////// END NEW /////////
    leftPaddle.display();
    rightPaddle.display();
    ///////// NEW /////////
    //if either player 1 or player 2 has 11 points,
    //the state of the game will be 'GAME OVER'
    if (leftPaddle.score === 11 || rightPaddle.score === 11){
      state = "GAME OVER";
    }
    //pause audio
    introSound.pause();
    endSound.pause();
    //loop that displays the array of enemy balls
    for (var i = 0; i < 3; i++){
      enemies[i].update();
      enemies[i].displayball2();
      enemies[i].handleCollisionball2(leftPaddle);
      enemies[i].handleCollisionball2(rightPaddle);
      enemies[i].displayball2();

      var enemyOffScreen = enemies[i].isOffScreen();
      if (enemyOffScreen === 'l') {
        enemies[i].reset();
      }
      if (enemyOffScreen === 'r') {
        enemies[i].reset();
      }
    }

  }



}
//When the state is 'GAME OVER', it will display the following
function displayGameOver() {
  //Display array of bonus object
  for (var i = 0; i < bonuses.length; i++) {
    bonuses[i].display();
    bonuses[i].update();
  }
  push();
  textAlign(CENTER,CENTER);
  textSize(100);
  fill(64,224,208);
  stroke(255);
  textFont("VT323");
  //Text will display which player is the winner
  text(winner+' is the winner!',width/2,height/2);
  pop();
  //start audio
  endSound.play();
  playOnce = true;

}
///////// END NEW /////////
