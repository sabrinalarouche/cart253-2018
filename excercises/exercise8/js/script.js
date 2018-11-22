/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
var boxes = [];
var locX;
var locY;
var vid;
var theta = 0;
// preload()
//
// Description of preload
function preload(){
//Array of boxes
  for (var i = 0; i < 10; i++) {
    boxes.push(new Box(random(0,windowWidth),random(0,windowHeight),0,0,100,2));
  }
}
// setup()
//
// Description of setup
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  locX = mouseX - height / 2;
  locY = mouseY - width / 2;
  vid = createVideo(["assets/videos/fireworks.mp4"]);
  vid.elt.muted = true;
  vid.loop();
  vid.hide();
}

// draw()
//
// Description of draw()
function draw(){
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, locX, locY, 100);
  translate(-width/2,-height/2);
  background(0);

  push();
  translate(width/2,height/2);
    rotateZ(theta * mouseX * 0.001);
    rotateX(theta * mouseX * 0.001);
    rotateY(theta * mouseX * 0.001);
    //pass image as texture
    texture(vid);
    sphere(150);
    theta += 0.05;
  pop();
  //boxes move right
  for (var i = 0; i < 10; i++) {
    if(boxes[i].moveRight === true){
      boxes[i].angle += 0.01;
    }
  }
  //when if is true, boxes move left
  for (var i = 0; i < 10; i++) {
    if(boxes[i].moveLeft === true){
      boxes[i].angle += -0.01;
    }
  }
  //when if is true, boxes move up
    for (var i = 0; i < 10; i++) {
      if(boxes[i].moveUp === true){
        boxes[i].rotate += 0.01;
      }
    }
  //when if is true, boxes move down
    for (var i = 0; i < 10; i++) {
      if(boxes[i].moveDown === true){
        boxes[i].rotate += -0.01;
      }
      boxes[i].update();
      boxes[i].display();
    }
  }

  function keyPressed(){
  //boxes move right when "d" is pressed, since if is true.
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
