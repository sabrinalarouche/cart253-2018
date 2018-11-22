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
    if(boxes[i].moveRight === true){
      boxes[i].angle += 0.01;
      fill(255,0,0);
    }
  }
  for (var i = 0; i < 10; i++) {
    if(boxes[i].moveLeft === true){
      boxes[i].angle += -0.01;
    }
  }
    for (var i = 0; i < 10; i++) {
      if(boxes[i].moveUp === true){
        boxes[i].rotate += 0.01;
      }
    }
    for (var i = 0; i < 10; i++) {
      if(boxes[i].moveDown === true){
        boxes[i].rotate += -0.01;
      }
      boxes[i].update();
      boxes[i].display();
    }
  }

  function keyPressed(){
    if(key ==="d"){
      for (var i = 0; i < 10; i++) {
        boxes[i].moveRight = true;
      }
    }
    if(key ==="a"){
      for (var i = 0; i < 10; i++) {
        boxes[i].moveLeft = true;
      }
    }
    if(key ==="w"){
      for (var i = 0; i < 10; i++) {
        boxes[i].moveUp = true;
      }
    }
      if(key ==="s"){
        for (var i = 0; i < 10; i++) {
          boxes[i].moveDown = true;
        }
      }
    }

      function keyReleased() {
        for (var i = 0; i < 10; i++) {
          boxes[i].moveRight =false;
          boxes[i].moveLeft =false;
          boxes[i].moveUp =false;
          boxes[i].moveDown =false;
          fill(255);
        }
      }
