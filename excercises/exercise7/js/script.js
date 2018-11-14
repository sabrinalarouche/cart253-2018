/*****************

Excercise 7
Sabrina Larouche

For this Excercise I wanted to explore arrays and interacting with them.

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
// Description of draw()

function draw() {
  createCanvas(window.innerWidth,window.innerHeight);
  background(0);
  for (var i = 0; i < 100; i++) {

      balls[i].update();
        balls[i].separate(balls);
      balls[i].display();
    }
}
//Balls change to the same random colour on click of the mouse
function mousePressed(){
  let c =color(random(255),random(255),random(255));
  for (var i = 0; i < 100; i++) {

      balls[i].color = c;
    }
