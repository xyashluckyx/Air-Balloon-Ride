var balloon;
var backgroundImg,balloonImg;
var database, position;

function preload(){
  backgroundImg=loadImage("images/cityImage.png");

  balloonImg=loadAnimation("images/HotAirBallon-01.png","images/HotAirBallon-02.png","images/HotAirBallon-03.png");

  balloonImg2=loadAnimation("images/HotAirBallon-01.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500,500);

  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on('value',readPosition,showError);
  
  balloon=createSprite(100,380);
  balloon.addAnimation("balloon",balloonImg2);
  balloon.scale=0.5;  


 }

function draw() {
  background(backgroundImg); 

  textSize(15);
  fill("blue");
  stroke(5);
  text("Use Arrow Keys To Move Hot Air Balloon !",5,15);

  if(keyDown(LEFT_ARROW)){
   updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
   updateHeight(10,0);
  } 
  else if(keyDown(DOWN_ARROW)){
   updateHeight(0,10);
   balloon.addAnimation("balloon",balloonImg);
   balloon.scale=balloon.scale+0.01;
  } 
  else if(keyDown(UP_ARROW)){
   updateHeight(0,-10);
   balloon.addAnimation("balloon",balloonImg);
   balloon.scale=balloon.scale-0.01;
  } 

  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x' : height.x+x,
    'y' : height.y+y
  })
}

function readPosition(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("Error in writting to the database");
}