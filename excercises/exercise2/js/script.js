/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 30;
var avatarColour;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

//Enemy image
var enemyImage;

// How many dodges the player has made
var dodges = 0;

//Background image
var backImage;

//Image for the enemy and background
function preload() {
  enemyImage = loadImage("assets/images/enemy.png");
  backImage = loadImage("assets/images/background.jpg");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

avatarColour = color(255,255,255)

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

  // A pink background
//background(255,220,220);

//Background image
  image(backImage,0,0,width,height)

//Display number of dodges
  fill(255)
  text('Dodges: '+dodges,30,30);

//Change text size of number of dodges
  textSize(15);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

//avatarY changes colour 100px away from top and bottom
//100px from bottom, it turns red
if(avatarY > 400) {
  avatarColour = color(255,0,0);
}
//100px from top, it turns orange
else if(avatarY < 100){
  avatarColour = color(255,165,0);
}
//when avatar isn't 100px from top or bottom, it's white
//else {
  //avatarColour = color(255,255,255);
//}

//avatarX changes colour 100px awar from right or Left
//100px from left, it turns green
else if(avatarX > 400) {
  avatarColour = color(0,255,0);
}
//100px from right, it turns magenta
else if(avatarX < 100){
  avatarColour = color(255,0,255);
}
//when avatar isn't 100px from right or left, it's white
else {
  avatarColour = color(255,255,255);
}




  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;

//Avatar changes speed and size after each dodge at a random amount between (-5,5) ,but never less than 0.
    var newSpeed = avatarSpeed + random(-5,5);
    if (newSpeed > 0){
      avatarSpeed = newSpeed;
    }

    var newSize = avatarSize + random(-5,5);
    if (newSize >0){
      avatarSize = newSize;
    }
  }

  // Display the current number of successful in the console
  console.log(dodges);

  // The player is black
  //fill(0);

  //The player is white
  fill(avatarColour);


  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  //fill(255,0,0);
  // Draw the enemy as a circle
  //ellipse(enemyX,enemyY,enemySize,enemySize);

//Display enemy image
 image(enemyImage,enemyX,enemyY,enemySize,enemySize);
}
