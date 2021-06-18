var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana_img, foodGroup;
var obstacle_img, obstacleGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var gameOver, gameOver_img;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  gameOver_img = loadImage("gameOver.png");
}

function setup() {
  createCanvas(1200,1000);
  
  backgr=createSprite(0,100,1200,800);
  backgr.addImage(backImage);
  backgr.scale=2;
  backgr.x=backgr.width/2;
  backgr.velocityX= -4;
  
  player = createSprite(150,590,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(600,600,1200,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(600, 400, 50, 50)
  gameOver.addImage(gameOver_img)
  gameOver.scale = 2;

  gameOver.visible = false;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() { 
  background("green");

  
  if(gameState===PLAY){
  
  if(backgr.x<200){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y > 300) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    for(var i = 0; i < foodGroup.length; i++)
{
  if(foodGroup.get(i).isTouching(player))
  {
     foodGroup.get(i).destroy();
     player.scale += 0.02
     score += 5;
  }
}

  spawnFood();
  spawnObstacle();

  if(obstacleGroup.isTouching(player))
  {
     gameState = END;
  }

  }

  if(gameState === END)
  {
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    player.visible = false;
    backgr.velocityX = 0;
    gameOver.visible = true;
  }

  textSize(50)
  fill("white")
  text("SCORE : " + score, 450, 950)
  
  drawSprites();
}

function spawnFood()
{
   if(frameCount % 80 === 0)
   {
     var banana = createSprite(1200, Math.round(random(300, 500)), 50, 50)
     banana.addImage(banana_img)
     banana.scale = 0.1;
     banana.velocityX = -(6 + 5*score/10);
     banana.lifetime = 200;

     player.depth = banana.depth + 1;

     foodGroup.add(banana);
   }
}

function spawnObstacle()
{
   if(frameCount % 180 === 0)
   {
     var obstacle = createSprite(1200, 550, 50, 50)
     obstacle.addImage(obstacle_img)
     obstacle.scale = 0.3;
     obstacle.velocityX = -(6 + 5*score/10);
     obstacle.lifetime = 200;

     player.depth = obstacle.depth + 1;

     obstacleGroup.add(obstacle);
   }
}