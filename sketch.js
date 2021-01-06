var trex , trex_running , trex_collided

var ground , groundimage

var invisibleground

var cloudimage

var score

var obstaclesGroup 
var cloudsGroup 

var obstacle1 , obstacle2 , obstacle3 , obstacle4 , obstacle5 , obstacle6

var gameOver , restart , gameOverimage , restartimage

var jumpsound , diesound , cpsound

var PLAY = 1
var END = 0

var gameState = PLAY 

localStorage["highscore"] = 0




function preload (){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  
  trex_collided = loadImage("trex_collided.png")
  
  groundimage = loadImage("ground2.png")
  
  cloudimage = loadImage("cloud.png")
  
  obstacle1 = loadImage("obstacle1.png") 
  
  
  obstacle2 = loadImage("obstacle2.png")
  
  
  obstacle3 = loadImage("obstacle3.png")
  
  
  obstacle4 = loadImage("obstacle4.png")
  
  
  obstacle5 = loadImage("obstacle5.png")
  
  
  obstacle6 = loadImage("obstacle6.png")
  
  gameOverimage = loadImage("gameOver.png")
  
  restartimage = loadImage("restart.png")
  
  jumpsound = loadSound("jump.mp3")
  
  diesound = loadSound("die.mp3")
  
  cpsound = loadSound("checkPoint.mp3")
  
}



function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,25,20)
  trex.addAnimation("trex_running" , trex_running)
  trex.addImage("trex_collided" , trex_collided)
  trex.scale = 0.4
  
  ground = createSprite (300, 180, 600, 20)
  ground.addImage("ground", groundimage )
  ground.velocityX = -2
  ground.x = ground.width/2
  
  invisibleground = createSprite (300, 190, 600, 20)
  invisibleground.visible = false 
  
  score = 0 
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group(); 
  
  //place gameOver and restart icon on the screen
 gameOver = createSprite(300, 100);
 restart = createSprite(300 , 140);
gameOver.addImage("gameOver" , gameOverimage);
restart.addImage("restart" , restartimage);
gameOver.scale = 0.5;
restart.setAnimation("restart");
restart.scale = 0.5;


  
}

function draw() {
  background(180);
  
  console.log(gameState)
  text("Created By Yatish", 20 , 20 )
  text("Score = " + score , 500 , 50 )
  text("HighScore = " + localStorage["highscore"] , 400 , 50 )
  
  if (gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -(2+3*score/100) 
    score = score + Math.round(getFrameRate()/60)
    if(score > 0 && score % 100 === 0){
      cpsound.play()
    }
  if (keyDown ("space") && trex.y > 160 ){
     trex.velocityY = -10
    
    jumpsound.play ()
    
    }
  
  if (ground.x < 0){
     ground.x = ground.width/2
    }
    
    if ( obstaclesGroup.isTouching(trex)){
      gameState = END
      diesound.play()
    }
    
    
    spawnClouds()
  spawnObstacles()
    
    trex.velocityY = trex.velocityY + 0.8
    
  }
  
  
  
  else if(gameState === END){
    
    ground.velocityX = 0
    trex.velocityY = 0
    
gameOver.visible = true;
restart.visible = true;
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    cloudsGroup.setLifetimeEach(-10);
    obstaclesGroup.setLifetimeEach(-10);
    
trex.changeImage("trex_collided")
    
    if(mousePressedOver(restart)) {
    reset();
  }
    
    }
  
  
  
  
  trex.collide(invisibleground)
  
  
  
  drawSprites()
  
  
  
}

function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("trex_running");
  
  if(localStorage["highscore"] < score){
    localStorage["highscore"] = score
  }
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,50,40,10);
    cloud.y = Math.round(random(50 , 100));
    cloud.addImage("cloud" , cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 150;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
  switch(rand){
      case 1 : obstacle.addImage(obstacle1);
      break;
      
      case 2 : obstacle.addImage(obstacle2);
      break;
      
      case 3 : obstacle.addImage(obstacle3);
      break;
      
      case 4 : obstacle.addImage(obstacle4);
      break;
      
      case 5 : obstacle.addImage(obstacle5);
      break;
      
      case 6 : obstacle.addImage(obstacle6);
      break;
      
      default : break;
      
  }
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle)
  }
}