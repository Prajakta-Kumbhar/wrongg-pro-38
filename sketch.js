//variables of gamestate
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//variable for sprites and images
var rocket, rocketImage;
var obstacle, obstacleImage, obstacleGroup;
var galaxy, backgroundImage;

//variable for sprites and images
var restart, restartImage;
var gameOver, gameOverImage;

//variable for score
var score;

//a function to load images
function preload()
{
  //a function to load images
  backgroundImage = loadImage("galaxy.jpg");
  rocketImage = loadImage("rocket.png");
  obstacleImage = loadImage("asteroid.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("game_over.png");
}


function setup() 
{
  //to create a canvas
  createCanvas(650,350);
  
  //to create galaxy,add image,scale and velocity
  galaxy = createSprite(100,200,0,0);
  galaxy.addImage("background",backgroundImage);
  galaxy.scale = 0.2;
 // galaxy.velocityX = -6;
  galaxy.x = camera.position.x-25
  
  //to create rocket,add image and scale
  rocket = createSprite(70,280,0,0);
  rocket.addImage("rocket",rocketImage);
  rocket.scale = 0.2;
  
  //to create restart,add image and scale
  restart = createSprite(250,280,0,0);
  restart.addImage("restart",restartImage);
  restart.scale = 0.1;
  
  //to create game over,add image and scale
  gameOver = createSprite(240,150,0,0);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 0.5;
  
  //to make things invisible
  restart.visible = false;
  gameOver.visible = false;
  
  //to declare a new grp
  obstaclesGroup = new Group();
  
  score = 0;
}


function draw() 
{
  //to make the background yellow in colour
  background("blue");
  
  //if the gamestate is play then..
  if (gameState===PLAY)
  {
    //spawn obstacles
    spawnObstacles();
    
    //keep the score increasing as the ground moves
   score = score + Math.round(getFrameRate()/60);
    
    //but if galaxy's x position is less than 0 then..
    if (galaxy.x < 0)
     {
       //write In in console and galaxy's x position will be 250
       console.log("In");
       galaxy.x = 250;
     }
    
    //but if we press up arrow...
    // if(keyDown("UP_ARROW"))
    //   {
    //     //the rocket's y position will be rocket's y position minus 20
    //     rocket.y = rocket.y - 20;
    //   }
    
    // //but if we press down arrow...
    // if(keyDown("DOWN_ARROW"))
    //   {
    //     //the rocket's y position will be rocket's y position plus 20
    //     rocket.y = rocket.y+20;
    //   }

    // camera.position.x = rocket.x
    // camera.position.y = width/2

    rocket.x = camera.position.x - 250
    camera.position.x += 6
    
    if(score === 2000)
      {
        fill("blue");
        text("YOU WIN!",260,250);
      }
    //but if rocket is touching the obstacles..
    if(rocket.isTouching(obstaclesGroup))
      {
        //the gamestate will be end
        gameState = END; 
      }
  
   // else if the gamestate is end then... 
   }else if(gameState===END)
     {
       //restart and gameover will be visible
       restart.visible = true;
       gameOver.visible = true;
       //galaxy and rocket will be invisible
       galaxy.visible = false;
       rocket.visible = false;
       
       //all obstacles will be destroyed
       obstaclesGroup.destroyEach();
     }

  
      
 rocket.setCollider("rectangle",0,0,rocket.height,rocket.width);
 rocket.debug = true
  
   // if we click on restart then...
   if(mousePressedOver(restart))
    {
      //reset the game
      reset();
    }
  
    //to draw the sprites
    drawSprites();
  
    //fill the text yellow and size 20 
    fill("yellow");
    textSize(20);
    //text score at certain position
    text("Score: "+ score,410,30);

    gameOver.x = camera.position.x;
}


function spawnObstacles()
{
  //after every 250th frame...
  if(frameCount % 130 === 0)
    {
      //obstacles will be created
      var obstacle = createSprite(camera.position.x+300,230,0,0);
      //obstacles y position should be random
      obstacle.y = Math.round(random(30,400));
      //to add image,scale,velocity and lifetime
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      obstacle.velocityX = -3;
      obstacle.lifetime = 200;
      
      //when the obstacles will be created wtite obstacle in console
      console.log("obstacle");
      
      //to add the grp
      obstaclesGroup.add(obstacle);
    }  
}


function reset()
{
  //the gaestate will be play again
  gameState = PLAY;
  
  //restart and gameover will be invisible
  restart.visible = false;
  gameOver.visible = false;
  //galaxy and rocket will be visible
  galaxy.visible = true;
  rocket.visible = true;
  
  //obstacles will be destroyed as they stay
  obstaclesGroup.destroyEach();
  
  //score will be 0
  score = 0;
}