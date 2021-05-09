var obs1,obs2
var runner,runnerImg
var bg,ground,inground
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var obstaclesGroup;
var runnerjumpimg,fallimg
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
function preload(){
    runnerjumpimg=loadAnimation("j.png")
fallimg=loadImage("fall.png")
obs1=loadImage("ob.png")
obs2=loadImage('ob1.png')

runnerImg=loadAnimation("r1.png","r2.png","r3.png","r4.png")
bg=loadImage("bg.png")

restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")

jumpSound = loadSound("jump.mp3")
dieSound = loadSound("die.mp3")
checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
    createCanvas(1200,500)
    obstaclesGroup=new Group()
 ground=createSprite(width/2,height/2,width,50)
 inground=createSprite(width/2,height-40,width,1)
 ground.addImage(bg)
 ground.velocityX=-3
 runner=createSprite(100,height-130)
 runner.addAnimation("darsh",runnerImg)
 runner.addAnimation("jump",runnerjumpimg)
 runner.addAnimation("fall",fallimg)
runner.scale=0.7
ground.scale=4
score = 0;

console.log("hi")

gameOver = createSprite(600,250);
gameOver.addImage(gameOverImg);

restart = createSprite(600,290);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;
runner.setCollider("rectangle",0,0,runner.width-20,runner.height-20)
runner.collider.visible=true
}

function draw() {
    background(255)

//console.log(score)
    if(gameState === PLAY){
        runner.changeAnimation("darsh",runnerImg)
        

        spawnObstacles();
        if(frameCount%5===0){
            score = score +1
            
            }
         
            
            if(keyDown("space")&& runner.y>380) {
         runner.velocityY=-7;
   runner.changeAnimation("jump",runnerjumpimg)
   jumpSound.play();
            }
              //add gravity
     runner.velocityY = runner.velocityY + 0.1
     console.log(runner.y)
    if(runner.isTouching(obstaclesGroup)){
        
 gameState=END
 dieSound.play()
}
  
restart.visible=false;
gameOver.visible=false;
    }
   else if (gameState === END) {
ground.velocityX=0;
runner.velocityY=0;
runner.changeAnimation("fall",fallimg)
runner.y=410;
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
if(mousePressedOver(restart)){
    reset()
    
  }
  
  restart.visible=true;
  gameOver.visible=true;



    }
if(ground.x<0)
{
ground.x=ground.width/2

}    

runner.collide(inground)
    drawSprites();
    
    textSize(20)
    fill("red")
    text("Score: "+ score, width-100,50);

}
function spawnObstacles(){
    if (frameCount % 150 === 0){
      var obstacle = createSprite(width,height-35,10,40);
      obstacle.velocityX = -(3);
      
       //generate random obstacles
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: obstacle.addImage(obs1);
                 break;
         case 2: obstacle.addImage(obs2);
                 break;
       }
       //assign scale and lifetime to the obstacle           
      // obstacle.scale = 1;
       obstacle.lifetime = 420;
     //  console.log(obstacle.lifetime)
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
       console.log("obsticles")
    

}
}
function reset (){
  
    gameState = PLAY;
    
     restart.visible=false;
     gameOver.visible=false;
     score=0;
     ground.velocityX=-3,
     
     obstaclesGroup.destroyEach()
     
    
   }