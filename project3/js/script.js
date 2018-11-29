/*****************

Project 3
Sabrina Larouche



******************/

// preload()
//
// Description of preload

//Variables
var boxes = [];
var locX;
var locY;
var bg;
var images =[];
var avatar;
var avatarX;
var avatarY;
var state = "TITLE";
var pg;
var sounds = [];
// preload()
//
// Description of preload
function preload(){
  //Array of images
  images.push(loadImage("assets/images/image1.jpg"));
  images.push(loadImage("assets/images/image2.jpg"));
  images.push(loadImage("assets/images/image3.jpg"));
  images.push(loadImage("assets/images/image4.png"));
  images.push(loadImage("assets/images/image5.jpg"));
  //Array of sounds
  sounds.push(loadSound("assets/sounds/sound1.mp3"));
  sounds.push(loadSound("assets/sounds/sound2.mp3"));
  sounds.push(loadSound("assets/sounds/sound3.mp3"));
  sounds.push(loadSound("assets/sounds/sound4.mp3"));
  sounds.push(loadSound("assets/sounds/sound5.mp3"));
  //Array of boxes
  avatar= loadImage("assets/images/ufo.png");
  bg = loadImage("assets/images/galaxy.png");
}
// setup()
//
// Description of setup
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  for (var i = 0; i < 5; i++) {
    boxes.push(new Box(random(0,windowWidth),random(0,windowHeight),0,0,200,2,images[i]));
  }
  //define location
  locX = mouseX - height / 2;
  locY = mouseY - width / 2;
  avatarX = width/2;
  avatarY = height/2;
  pg = createGraphics(256,256);
}

function draw(){
  background(0);
  switch (state) {
    case "TITLE":
    {
    displayTitle();
    break;
    }

    case "GAME":
     {
     displayGame();
    break;
     }
  }
}

  function displayTitle(){

  pg.background(0);
  pg.fill(255,0,0);
  pg.text('Our world...', 50, 50);
  //pass graphics as texture
    texture(pg);
    plane(1000);
  // Plays game if space is pressed
    if (keyIsPressed && key === ' ') {
      console.log("key ");
      state = "GAME";
    }
  }
  function displayGame(){
    translate(-width/2,-height/2);
    push();
    texture(bg);
    translate(width/2,height/2, -200);
    plane(windowWidth*2,windowHeight*2);
    pop();

    //boxes move right
    for (var i = 0; i < 5; i++) {
      if(boxes[i].moveRight === true){
        boxes[i].angle += 0.01;
      }
    }
    //when if is true, boxes move left
    for (var i = 0; i < 5; i++) {
      if(boxes[i].moveLeft === true){
        boxes[i].angle += -0.01;
      }
    }
    //when if is true, boxes move up
    for (var i = 0; i < 5; i++) {
      if(boxes[i].moveUp === true){
        boxes[i].rotate += 0.01;
      }
    }
    //when if is true, boxes move down
    for (var i = 0; i < 5; i++) {
      if(boxes[i].moveDown === true){
        boxes[i].rotate += -0.01;
      }
      boxes[i].update();
      boxes[i].display();
    }

    var xDistance = mouseX - avatarX;
    var yDistance = mouseY - avatarY;

    avatarX = avatarX + xDistance;
    avatarY = avatarY + yDistance;

    push();
    translate(avatarX,avatarY);
    texture(avatar);
    plane(120);
    pop();
}
function keyPressed(){
  //boxes move right when "d" is pressed, since if is true.
  if(key ==="d"){
    for (var i = 0; i < 5; i++) {
      boxes[i].moveRight = true;
    }
  }
  //boxes move left when "a" is pressed, since if is true.
  if(key ==="a"){
    for (var i = 0; i < 5; i++) {
      boxes[i].moveLeft = true;
    }
  }
  //boxes move up when "w" is pressed, since if is true.
  if(key ==="w"){
    for (var i = 0; i < 5; i++) {
      boxes[i].moveUp = true;
    }
  }
  //boxes move down when "s" is pressed, since if is true.
  if(key ==="s"){
    for (var i = 0; i < 5; i++) {
      boxes[i].moveDown = true;
    }
  }
}
//When no key is pressed
function keyReleased() {
  for (var i = 0; i < 5; i++) {
    //no movement
    boxes[i].moveRight =false;
    boxes[i].moveLeft =false;
    boxes[i].moveUp =false;
    boxes[i].moveDown =false;
  }
}

function mousePressed() {
for (var i = 0; i < boxes.length; i++){
  var distance = dist(mouseX,mouseY,boxes[i].x,boxes[i].y);
  if (distance < boxes[i].size/2) {
      for(var j = 0; j < sounds.length; j++){
        if (sounds[j].isPlaying()){
          sounds[j].stop();
        }
      }

    sounds[i].play();
    playOnce = true;
  }
}
}
