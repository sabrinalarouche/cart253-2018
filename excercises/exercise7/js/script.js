/*****************

Exercise 7
Sabrina Larouche

For this exercise I wanted to explore arrays and making them interactive. I didnt want to make anything too complicated but something I can potentially add onto for my final project.
The array follows the movement of the mouse and changes colour when you left click the mouse.
I also explored the Boid algorithm to keep the balls seperate from each other to not overlap.
Also, explored p5.sound and changing the rate of audio based on mouse movement.
The faster you move the mouse the higher the rate, no audio if you don't move the mouse.
******************/

//Variables for exercise
var balls = [];
var mySound;
var previousMouseX;
var previousMouseY;

function preload() {
  mySound = loadSound("assets/sounds/sound.wav");
  for (var i = 0; i < 100; i++) {
    balls.push(new Ball(random(0,innerWidth),random(0,innerHeight),0,0,10,2));
  }
}

// setup()
//
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    //sound for the exercise
    mySound.setVolume(1);
    mySound.loop();
    //initial value previous mouse position
    previousMouseX = 0;
    previousMouseY = 0;
}

// draw()
//
// Displays black background with array of white balls at random locations
function draw() {
  background(0);
  for (var i = 0; i < 100; i++) {
      balls[i].update();
      balls[i].separate(balls);
      balls[i].display();
    }
//Audio effect for exercise
    //Calculating the distance between the mouse's current position and previous position.
    var distance = dist(mouseX,mouseY,previousMouseX,previousMouseY);
    //Changing maping the mouse which changes the rate of sound, faster you move the mouse higher the rate.
    mySound.rate(map(abs(distance),0,50,0,1));
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }

// Balls change to the same random colour on left click of the mouse
function mousePressed(){
  let c = color(random(255),random(255),random(255));
  for (var i = 0; i < 100; i++) {
      balls[i].color = c;
    }
}
