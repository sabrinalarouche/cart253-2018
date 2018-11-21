/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
var boxes = [];

// preload()
//
// Description of preload
function preload(){
  for (var i = 0; i < 10; i++) {
    boxes.push(new Box(random(0,windowWidth),random(0,windowHeight),0,0,50,2));

    }
}
// setup()
//
// Description of setup
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);

}

// draw()
//
// Description of draw()
function draw(){
  translate(-width/2,-height/2);
background(0);
for (var i = 0; i < 10; i++) {
  if(boxes[i].move ===true){
    boxes[i].angle += 0.01;
  }
     boxes[i].update();
    // boxes[i].separate(boxes);
      boxes[i].display();
    }
 }
