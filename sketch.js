var ghoststanding,ghoststandingimage,ghostjumpingimage;
 var door,doorimage;
var climber,climberimage;
 var gameState="play" ;
var tower,towerimage;
var doorgroup,climbergroup;
var invisibleblock,invisibleblockgroup;
var spookysound;


function preload(){
 ghoststandingimage = loadImage("ghost-standing.png");
ghostjumpingimage = loadImage("ghost-jumping.png");
doorimage = loadImage("door.png");
climberimage = loadImage("climber.png");
  towerimage= loadImage("tower.png");
  spookysound = loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);
  spookysound.loop();
  tower= createSprite(300,300);
  tower.addImage(towerimage);
  tower.velocityY= 2;
  
  ghost= createSprite(150,275,50,50);
  ghost.addImage(ghoststandingimage);
  ghost.scale=0.4;
  
  doorgroup = new Group();
  climbergroup = new Group();
  invisibleblockgroup = new Group();
}

function draw(){
  background(0);
 // console.log(tower.y);
  if(gameState==="play"){
     if(tower.y>400){
    tower.y=300;
  }
     if(keyDown("space")){
    ghost.velocityY=-7 ;
  }
  ghost.velocityY= ghost.velocityY+0.5;
  if(keyDown("RIGHT_ARROW")){
    ghost.x= ghost.x+5;
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-5;
  }
  if(climbergroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
   spawndoors();
   if(ghost.y>600 || invisibleblockgroup.isTouching(ghost)){
     gameState="end";
   }
  }
  else if(gameState==="end"){
    tower.destroy();
     ghost.destroy();
    climbergroup.destroyEach();
    doorgroup.destroyEach();
    invisibleblockgroup.destroyEach();
    
    stroke("yellow");
    fill("blue");
    textSize(40);
    text("GAME OVER",180,300);
  }
 
  
 drawSprites();
}

function spawndoors(){
  if(frameCount%200===0){
   door= createSprite(Math.round(random(100,500)),20);
    door.addImage(doorimage);
    door.velocityY=2;
    
    climber = createSprite(door.x,door.y+60);
    climber.addImage(climberimage);
    climber.velocityY=2;
    
    invisibleblock= createSprite(climber.x,climber.y+5,climber.width,2);
    invisibleblock.velocityY=2;
    invisibleblock.visible=false;
    
    
    invisibleblock.lifetime=300;
     door.lifetime=300;
    climber.lifetime=300;
    
    
    doorgroup.add(door);
    climbergroup.add(climber);
    invisibleblockgroup.add(invisibleblock);
    ghost.depth= climber.depth;
   
  }
  
}