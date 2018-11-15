/*****************

Excercise 7
Sabrina Larouche

For this excercise I wanted to explore arrays and making them interactive. I didnt want to make anything too complicated but something I can potentially add onto for my final project.
The array follows the movement of the mouse and changes colour when you left click the mouse.
******************/

var balls = [];

function preload() {
  for (var i = 0; i < 100; i++) {
    balls.push(new Ball(random(0,innerWidth),random(0,innerHeight),0,0,10,2));
  }
}


// setup()
//
// Description of setup

function setup() {

}


// draw()
//
// Displays black background with array of white balls at random locations
function draw() {
  createCanvas(window.innerWidth,window.innerHeight);
  background(0);
  for (var i = 0; i < 100; i++) {
      balls[i].update();
      balls[i].separate(balls);
      balls[i].display();
    }
}
// Balls change to the same random colour on click of the mouse
function mousePressed(){
  let c = color(random(255),random(255),random(255));
  for (var i = 0; i < 100; i++) {
      balls[i].color = c;
    }
}
