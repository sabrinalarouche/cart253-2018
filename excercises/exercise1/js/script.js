// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

//Current position of the rectangle
var rectX;
var rectY;

//Width and height of rectangle
var rectWidth;
var rectHeight;

//The image of the butterfly

var buttImage;

// Current position of the butterfly image

var buttImageX;
var buttImageY;

// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
// Added the butterfly image
  buttImage = loadImage("assets/images/butterfly.png")
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  //clownImageX = width/2;
  //clownImageY = height/2;

  buttImageX = width/2;
  buttImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  //feltTextureImageX = width/2;
  //feltTextureImageY = 0 - feltTextureImage.height/2;
  rectX = 0;
  rectY = 0;

  rectWidth = 200;
  rectHeight = 640;
  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the rectangle left to right by increasing its x position
  rectX += 1;

  // Display the felt image
  //image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Display the rectangle
  rect(rectX,rectY,rectWidth, rectHeight);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  //var xDistance = mouseX - clownImageX;
  //var yDistance = mouseY - clownImageY;

  //Calculate the distance in X and Y
  var xDistance = mouseX - buttImageX;
  var yDistance = mouseY - buttImageY;

  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  //clownImageX = clownImageX + xDistance/10;
  //clownImageY = clownImageY + yDistance/10;

// Add 1/10th of the x and y distance to the clown's current (x,y) location
  buttImageX = buttImageX + xDistance/10;
  buttImageY = buttImageY + yDistance/10;

  // Display the clown image
  //image(clownImage,clownImageX,clownImageY);
  // }

//Display butterfly image
  image(buttImage,buttImageX,buttImageY);
  }
