/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

//Giving velocity, speed, and radius to the dog
var targetVelocityX = 0;
var targetVelocityY = 0;
var targetSpeed = 5;
var targetRadiusX;
var targetRadiusY;

//Variable for dog size
var dogSize;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images

//Increased number of decoys
var numDecoys = 300;

// Keep track of whether they've won
var gameOver = false;


// Variables for the rectangle for lost dog poster
var rectCenterX;
var rectCenterY;
var rectSide;

// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  backgroundImage();
  imageMode(CENTER);

//define the variables
 rectCenterX = width-100;
 rectCenterY = 100;
 rectSide = 200;

//Define the variables for dog:
//radius is equal to dog width
 targetRadiusX = targetImage.width;
//radius is equal to dog height
 targetRadiusY = targetImage.height;
//velocity is equal to speed of 5
 targetVelocityX = targetSpeed;
 targetVelocityY = targetSpeed;

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough

    // Give a random width and height to all the animals, making it more difficult to find the target.
    var randomSize = random(50,250);

    if (r < 0.1) {
      image(decoyImage1,x,y,randomSize,randomSize);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,randomSize,randomSize);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,randomSize,randomSize);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,randomSize,randomSize);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,randomSize,randomSize);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,randomSize,randomSize);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,randomSize,randomSize);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,randomSize,randomSize);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,randomSize,randomSize);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,randomSize,randomSize);
    }
  }

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  // And draw it (this means it will always be on top)

  //While loop that will draw the dog anywhere thats not where the lost dog sign is located.
  while(targetX < rectCenterX + rectSide/2 &&
        targetX > rectCenterX - rectSide/2 &&
        targetY > rectCenterY + rectSide/2 &&
        targetY < rectCenterY - rectSide/2)
        {
  targetX = random(0,width);
  targetY = random(0,height);
 }
 // Define dogSize variable:
 // random height and width between 50 and 250
  dogSize = random(50,250);

//Draw dog
  image(targetImage,targetX,targetY,dogSize,dogSize);



  // Display lost dog poster
  rectMode(CENTER);
  fill(0,0,255);
//draw square in upper right corner
  rect(rectCenterX,rectCenterY,rectSide,rectSide);
//add dog on top of blue square
  image(targetImage,rectCenterX,rectCenterY);

//Added caption to image
  textAlign(CENTER);
  fill(255);
  textSize(20);
  text('LOST DOG',rectCenterX,160);
}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WIN!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
/*ellipse(targetX,targetY,targetImage.width,targetImage.height);*/

//If dog collides with the wall, it will bounce off it.
if (targetX < 0 || targetX > width) {
  targetVelocityX = -targetVelocityX;
}
if (targetY < 0 || targetY > height) {
  targetVelocityY = -targetVelocityY;
}
// Giving movement to the dog
    targetX = targetX + targetVelocityX;
    targetY = targetY + targetVelocityY;
    image(targetImage,targetX,targetY,dogSize,dogSize);

  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
