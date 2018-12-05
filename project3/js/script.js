/*****************

Project 3
Sabrina Larouche
For this project I wanted to create a more abstract art piece using, 3D, sound, images, and movement.
The concept is that you are an alien in a UFO moving around with the mouse. Earth has sent up boxes into space that hold information of things our earth contains.
I just chose 5 themes among many that represent earth: war, world events, leaders, music and space exploration.
The user used WASD to rotate the boxes to look at all sides with different images regarding the theme.
As you click on a box, audio will play and the top will disappear revealing an "object" which is an image.

Sources:
Audio from Youtube converted to MP3 audio
Images are from Google



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
var imagesMoon = [];
var imagesLeaders = [];
var imagesMusic = [];
var imagesWar = [];
var imagesEvents = [];
var imageSmallMoon = [];
var imageSmallMusic = [];
var imageSmallLeaders = [];
var imageSmallEvents = [];
var imageSmallWar = [];
var alien
// preload()
//
// Description of preload
function preload(){
  //Array of Moon images
  imagesMoon.push(loadImage("assets/images/moon/image1.jpg"));
  imagesMoon.push(loadImage("assets/images/moon/image2.jpeg"));
  imagesMoon.push(loadImage("assets/images/moon/image3.jpg"));
  imagesMoon.push(loadImage("assets/images/moon/image4.jpeg"));
  imagesMoon.push(loadImage("assets/images/moon/image5.jpg"));
  imagesMoon.push(loadImage("assets/images/moon/image6.jpg"));
  imageSmallMoon.push(loadImage("assets/images/moon/rocket.png"));
  //Array of Leader images
  imagesLeaders.push(loadImage("assets/images/leaders/image1.jpg"));
  imagesLeaders.push(loadImage("assets/images/leaders/image2.jpg"));
  imagesLeaders.push(loadImage("assets/images/leaders/image3.jpg"));
  imagesLeaders.push(loadImage("assets/images/leaders/image4.jpg"));
  imagesLeaders.push(loadImage("assets/images/leaders/image5.jpg"));
  imagesLeaders.push(loadImage("assets/images/leaders/image6.jpg"));
  imageSmallLeaders.push(loadImage("assets/images/leaders/peace.png"));
  //Array of Music images
  imagesMusic.push(loadImage("assets/images/music/image1.jpg"));
  imagesMusic.push(loadImage("assets/images/music/image2.jpg"));
  imagesMusic.push(loadImage("assets/images/music/image3.jpg"));
  imagesMusic.push(loadImage("assets/images/music/image4.jpg"));
  imagesMusic.push(loadImage("assets/images/music/image5.jpeg"));
  imagesMusic.push(loadImage("assets/images/music/image6.jpg"));
  imageSmallMusic.push(loadImage("assets/images/music/radio.png"));
  //Array of Events images
  imagesEvents.push(loadImage("assets/images/events/image1.jpg"));
  imagesEvents.push(loadImage("assets/images/events/image2.jpg"));
  imagesEvents.push(loadImage("assets/images/events/image3.jpeg"));
  imagesEvents.push(loadImage("assets/images/events/image4.jpg"));
  imagesEvents.push(loadImage("assets/images/events/image5.jpeg"));
  imagesEvents.push(loadImage("assets/images/events/image6.jpg"));
  imageSmallEvents.push(loadImage("assets/images/events/calendar.png"));
  //Array of War images
  imagesWar.push(loadImage("assets/images/war/image1.jpg"));
  imagesWar.push(loadImage("assets/images/war/image2.jpg"));
  imagesWar.push(loadImage("assets/images/war/image3.jpg"));
  imagesWar.push(loadImage("assets/images/war/image4.jpg"));
  imagesWar.push(loadImage("assets/images/war/image5.jpg"));
  imagesWar.push(loadImage("assets/images/war/image6.jpg"));
  imageSmallWar.push(loadImage("assets/images/war/gun.png"));
  // //Array of sounds
  sounds.push(loadSound("assets/sounds/sound1.mp3"));
  sounds.push(loadSound("assets/sounds/sound2.mp3"));
  sounds.push(loadSound("assets/sounds/sound3.mp3"));
  sounds.push(loadSound("assets/sounds/sound4.mp3"));
  sounds.push(loadSound("assets/sounds/sound5.mp3"));
  //Array of boxes
  avatar= loadImage("assets/images/ufo.png");
  bg = loadImage("assets/images/galaxy.png");
  alien = loadImage("assets/images/alien.png")
}
// setup()
//
// Description of setup
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  boxes.push(new Box(random(100,windowWidth-100),random(100,windowHeight-100),0,0,200,2,imagesMusic,imageSmallMusic[0],150));
  boxes.push(new Box(random(100,windowWidth-100),random(100,windowHeight-100),0,0,200,2,imagesLeaders,imageSmallLeaders[0],150));
  boxes.push(new Box(random(100,windowWidth-100),random(100,windowHeight-100),0,0,200,2,imagesWar,imageSmallWar[0],150));
  boxes.push(new Box(random(100,windowWidth-100),random(100,windowHeight-100),0,0,200,2,imagesEvents,imageSmallEvents[0],150));
  boxes.push(new Box(random(100,windowWidth-100),random(100,windowHeight-100),0,0,200,2,imagesMoon,imageSmallMoon[0],150));
  //define location
  locX = mouseX - height / 2;
  locY = mouseY - width / 2;
  avatarX = width/2;
  avatarY = height/2;
  pg = createGraphics(800,800);
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
  pg.fill(0,0,255);
  pg.textSize(18);
  pg.text('You are an alien riding in your UFO threw space.\nYou then discover knowledge boxes sent from earth.\nYou decide to explore them and see what earth has to offer.\nStart your mission using SPACE\nUse WASD to rotate the boxes\nClick the box to see what happens', 50, 50);
  //pass graphics as texture
  pg.image(alien,300,200,300,425);
  texture(pg);
  plane(750);
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
  translate(avatarX,avatarY,100);
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
      boxes[i].topHidden =true;
      for(var j = 0; j < sounds.length; j++){
        if (sounds[j].isPlaying()){
          sounds[j].stop();
        }
      }
      sounds[i].play();
      playOnce = true;
    }
    else{
        boxes[i].topHidden =false;
    }
  }
}
