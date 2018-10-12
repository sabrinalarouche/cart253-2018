/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

Credit:
player icon: http://www.stickpng.com/img/holidays/halloween/zombie-icon-from-zombie-smasher-defense/
prey icon: https://www.kisspng.com/png-brain-cartoon-drawing-clip-art-1935228/
gameSound: https://soundimage.org/horrorsurreal/
endSound: http://soundbible.com/1035-Zombie-Moan.html/
background: https://www.shutterstock.com/video/search/silence-cartoon/
font: Google fonts
******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 75;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;

//Player icon
var playerImage;

//Speed added to playerMaxSpeed when shift is pressed
var playerSprint = 0.5;

// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 75;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;

//Prey icon
var preyImage;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// time variables
var tx = 0;
var ty = 0;

//Background image
var bg;

var gameSound;
var endSound;
var playOnce = true;

// Loads player and prey images, and audio for the game.
function preload() {
 playerImage = loadImage("assets/images/player.png");
 preyImage = loadImage("assets/images/prey.png");
 bg = loadImage("assets/images/wallpaper.jpg")
 gameSound = new Audio("assets/sounds/Zombie_Game_Looping.mp3");
 endSound = new Audio("assets/sounds/zombie_moan.mp3");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  //createCanvas(500,500);

  //Game takes up whole screen
  createCanvas(windowWidth,windowHeight)

  noStroke();
  setupPrey();
  setupPlayer();

  //When the game starts so will the gameSound which will play on a loop.
  gameSound.play();
  gameSound.loop = true;
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(bg);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    //Display number of prey eaten while game
      fill(255)
      textFont("Roboto");
      text('Prey eaten: '+preyEaten,30,60);
      textSize(25);

      fill(255)
      textFont("Roboto");
      text('(Use keys to move and shift to sprint)',200,60);
      textSize(25);
//gameSound will play as the game is going on, endSound will be on pause.
      gameSound.play();
      endSound.pause();
      playOnce = true;
  }
//When the game is over
  else {
    showGameOver();
//gameSound will pause
    gameSound.pause();
//endSound will play but only once.
  if (playOnce === true){
    endSound.play();
    playOnce = false;
  }
  }

}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }

  else if (keyIsDown(SHIFT)) {
  // When shift is pressed it will add 0.5 to speed until it reaches 7
    if (playerMaxSpeed < 7) {
    playerMaxSpeed += playerSprint;
    }

  }

  else {
// If shift isn't pressed the player will move at playerMaxSpeed again
    playerMaxSpeed = 2;
    playerVY = 0;
  }
  /*playerVX += playerSprint;*/


  /*playerVX = playerSprint;
  playerVY = playerSprint;*/

}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

//Prey gets faster everytime it is eaten until speed of 10.
if(preyMaxSpeed < 10){
    preyMaxSpeed = preyMaxSpeed + 0.1;
}

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      /*preyX = random(0,width);
      preyY = random(0,height);*/


      // moving prey x and y according to noise instead of random
      preyX = noise(tx) * width;
      preyY = noise(ty) * height;
      tx += 0.1;
      ty += 0.1;

      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;

//Add 1 to the radius of the player whenever it eats the prey, with max radius of 75.
    if (playerRadius < 90)
      playerRadius = playerRadius + 1;
      ;


    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);
  }

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  //Added random size to be generated for the prey everytime it goes offscreen
    preyRadius = random(35,75);
  }
  else if (preyX > width) {
    preyX -= width;
    preyRadius = random(35,75);
  }

  if (preyY < 0) {
    preyY += height;
    preyRadius = random(35,75);
  }
  else if (preyY > height) {
    preyY -= height;
    preyRadius = random(35,75);
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth);
  //ellipse(preyX,preyY,preyRadius*2);
  image(preyImage,preyX,preyY,preyRadius*2,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  //ellipse(playerX,playerY,playerRadius*2);

  // Player icon fades as it loses health
  push();
  var playerAlpha = map(playerHealth,0,255,0,255);
  console.log (playerAlpha)
  tint(255,255,255,playerAlpha);
  image(playerImage,playerX,playerY,playerRadius*2,playerRadius*2);
  pop();
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(50);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
