var obs1,obs2
var runner,runnerImg
var bg,ground
function preload(){

obs1=loadImage("ob.png")
obs2=loadImage('ob1.png')

runnerImg=loadAnimation("r1.png","r2.png","r3.png","r4.png")
bg=loadImage("bg.png")
}

function setup() {
    createCanvas(1200,500)
  
 ground=createSprite(width/2,height/2,width,height)
 ground.addImage(bg)
 ground.velocityX=-3
 runner=createSprite(100,height-130)
 runner.addAnimation("darsh",runnerImg)
runner.scale=0.7
ground.scale=4
}

function draw() {
    background(255)
if(ground.x<0)
{
ground.x=ground.width/2

}    
spawnObstacles();

    drawSprites();
}
function spawnObstacles(){
    if (frameCount % 200 === 0){
      var obstacle = createSprite(width,height-35,10,40);
      obstacle.velocityX = -(3);
      
       //generate random obstacles
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: obstacle.addImage(obs1);
                 break;
         case 2: obstacle.addImage(obs2);
                 break;
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
}
}