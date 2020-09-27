/*
The Game Project 5 - Bring it all together
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var treePos_y

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var game_score;
var lives;
var flagpole;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 4;
    startGame();
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    push()
    translate(scrollPos,0);  
	
    // Draw clouds.
    drawClouds();
    
    // Draw mountains.
    drawMountains();
    
	// Draw trees.
    drawTrees();
    
	// Draw canyons
    for(var i = 0; i < canyon.length; i++)
    {
        drawCanyon(canyon[i]);
        checkCanyon(canyon[i])
    }
    
	// Draw collectable items
    for(var i = 0; i < collectable.length; i ++)
    {
        if(collectable[i].isFound == false)
        {
            drawCollectable(collectable[i]);
            checkCollectable(collectable[i]) 
        }   
    }
   

    // Draw Flagpole
    renderFlagpole();
    if(flagpole.isReached == false)
    {
        checkFlagpole()  
    }

    pop();
    
    //Score
    fill(0);
    textSize(15);
    text("score: " + game_score,20,20);
    
    //Draw life hearts
    for(var i = 0; i < lives; i++)
    {
 
        fill(255,0,0);
        ellipse(25+i*30,50,10,10);
        ellipse(33+i*30,50,10,10);
        triangle(20+i*30, 52, 38+i*30, 52, 28.5+i*30, 63);
  
    }
	drawGameChar();
    
    // Logic to make game end
    if(lives < 1)
    {
        fill(255,0,0);
        textSize(15);
        text("Game Over",width/2,height/2);
        return;
    }
    if(flagpole.isReached == true)
    {
        fill(0);
        textSize(15);
        text("Level complete",width/2,height/2);
        return;        
    }
    
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}
            
    if(isPlummeting)
    {
        gameChar_y += 5;
    }

	// Logic to make the game character rise and fall.
    if(gameChar_y != floorPos_y)
     {
         gameChar_y += 2.5;
         isFalling = true;
     }
    else
    {
        isFalling = false;
    }
    
    //Logic to start or end the game
    if(gameChar_y > height && lives > 0)
    {
        startGame();
    }
    

	
    // Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){
        if(flagpole.isReached && key == ' ')
        {
            nextLevel();
            return
        }
        else if(lives == 0 && key == ' ')
        {
            returnToStart();
            return
        }
        if(keyCode == 37)
        {
           isLeft = true; 
        }
        if(keyCode == 39)
        {
            isRight = true;
        }
        //JUMP
        if(keyCode == 32 && gameChar_y == floorPos_y)
        {
            gameChar_y = gameChar_y - 100;
        }

	console.log("press" + keyCode);
	console.log("press" + key);

}

function keyReleased()
{
        if(keyCode == 37)
        {
            isLeft = false;
        }
        if(keyCode == 39)
        {
            isRight = false;
        }
    
	console.log("release" + keyCode);
	console.log("release" + key);

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{

    // draw game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        
        //head
        stroke(0);
        fill(255,185,61);
        ellipse(gameChar_x, gameChar_y - 55, 10,20);
        //body
        fill(0,0,255);
        rect(gameChar_x - 7.5 , gameChar_y - 45 , 15,20);
        //arms
        rect(gameChar_x - 15, gameChar_y - 40, 15, 5);
        rect(gameChar_x - 20, gameChar_y - 50, 5, 15);
        //legs
        fill(0);
        rect(gameChar_x - 20 , gameChar_y - 30 ,15,5);
        rect(gameChar_x -20 , gameChar_y - 25 ,5,15);
        rect(gameChar_x +2, gameChar_y -25,5,10);
        rect(gameChar_x + 2, gameChar_y -15,15,5);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        
        //head
        stroke(0); 
        fill(255,185,61);
        ellipse(gameChar_x, gameChar_y - 55, 10,20);
        //body
        fill(0,0,255);
        rect(gameChar_x - 7.5 , gameChar_y - 45 , 15,20);
        //arms
        rect(gameChar_x, gameChar_y - 40, 20, 5);
        rect(gameChar_x +15 , gameChar_y - 50, 5, 10);
        //legs
        fill(0);
        rect(gameChar_x +5 , gameChar_y - 30 ,15,5);
        rect(gameChar_x +15 , gameChar_y - 25 ,5,15);
        rect(gameChar_x  -7.5, gameChar_y -25,5,10);
        rect(gameChar_x  -17.5, gameChar_y -15,15,5);
	}
	else if(isLeft)
	{
		// add your walking left code
        
        //head
        stroke(0);
        fill(255,185,61);
        ellipse(gameChar_x, gameChar_y - 55, 10,20);
        //body
        fill(0,0,255);
        rect(gameChar_x - 7.5 , gameChar_y - 45 , 15,20);
        //arms
        rect(gameChar_x - 20, gameChar_y - 40, 20, 5);
        //legs
        fill(0)
        rect(gameChar_x - 22, gameChar_y - 25, 29, 5);
        rect(gameChar_x + 2, gameChar_y - 25, 5, 25);
    }
	else if(isRight)
	{
		// add your walking right code
        
        //head
        stroke(0);
        fill(255,185,61);
        ellipse(gameChar_x, gameChar_y - 55, 10,20);
        //body
        fill(0,0,255);
        rect(gameChar_x - 7.5 , gameChar_y - 45 , 15,20);
        //arms
        rect(gameChar_x, gameChar_y - 40, 20, 5);
        //legs
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 25, 25,5);
        rect(gameChar_x - 8 , gameChar_y - 25, 5,25);
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        
        //head
        stroke(0);
        fill(255,185,61);
        ellipse(gameChar_x , gameChar_y - 55, 15,20);
        //body
        fill(0,0,255);
        rect(gameChar_x - 10 , gameChar_y - 45, 20,25)
        //arms
        rect(gameChar_x - 15, gameChar_y - 65, 5 , 20);
        rect(gameChar_x + 10, gameChar_y - 65, 5 , 20);
        //legs
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 20, 5 , 20);
        rect(gameChar_x + 5, gameChar_y - 20, 5 , 20);

   
	}
	else
	{
		// add your standing front facing code
        
        //head
        stroke(0);
        fill(255,185,61)
        ellipse(gameChar_x , gameChar_y - 55, 15, 20);
        //body
        fill(0,0,255);
        rect(gameChar_x - 10, gameChar_y - 45, 20,25);
        //arms
        rect(gameChar_x - 25, gameChar_y - 45,15,5);
        rect(gameChar_x + 10, gameChar_y - 45,15,5);
        //legs
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 20 ,5,20);
        rect(gameChar_x + 5, gameChar_y - 20 ,5,20);

	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {       
        fill(255); 
        rect(clouds[i].x_pos, clouds[i].y_pos - 20, clouds[i].size + 60, clouds[i].size);
        ellipse(clouds[i].x_pos, clouds[i].y_pos , clouds[i].size);
        ellipse(clouds[i].x_pos + 100, clouds[i].y_pos, clouds[i].size);
        ellipse(clouds[i].x_pos + 50, clouds[i].y_pos -20, clouds[i].size + 60, clouds[i].size);
        ellipse(clouds[i].x_pos + 50, clouds[i].y_pos - 30, clouds[i].size + 20, clouds[i].size -5);
    }
}

// Function to draw mountains objects.
function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
        fill(125);
        triangle(mountains[i].x_pos,mountains[i].y_pos,mountains[i].x_pos2, 
                 mountains[i].y_pos2,mountains[i].x_pos3,mountains[i].y_pos3);
        triangle(mountains[i].x_pos + 75 ,mountains[i].y_pos,mountains[i].x_pos2 + 125, 
                 mountains[i].y_pos2,mountains[i].x_pos3 + 100,mountains[i].y_pos3 - 50);
        triangle(mountains[i].x_pos + 175 ,mountains[i].y_pos,mountains[i].x_pos2 + 175, 
                 mountains[i].y_pos2,mountains[i].x_pos3 + 175,mountains[i].y_pos3);
        fill(255);
        triangle(mountains[i].x_pos + 175 ,mountains[i].y_pos- 307 ,mountains[i].x_pos2+ 14 , 
                 mountains[i].y_pos2 - 272 ,mountains[i].x_pos3 + 111 ,mountains[i].y_pos3- 15);
    }
}

// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
    {
        fill(139,69,19);
        rect(trees_x[i],treePos_y + 45,30,100);
        fill(34,139,34);
        triangle(trees_x[i] - 30,treePos_y +45,trees_x[i] +60,treePos_y +45 ,trees_x[i] +15,treePos_y -15);
        triangle(trees_x[i] - 30,treePos_y +25,trees_x[i] +60,treePos_y +25 ,trees_x[i] +15,treePos_y -30);
        triangle(trees_x[i] - 30,treePos_y +5,trees_x[i] +60,treePos_y +5 ,trees_x[i] +15,treePos_y -45);
          
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon)
{
    //CANYON
    fill(189,165,15);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.Width, floorPos_y - 288);
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon)
{
    if(gameChar_world_x >= t_canyon.x_pos && gameChar_world_x <= t_canyon.x_pos + t_canyon.Width && gameChar_y == floorPos_y)
    {
        isPlummeting = true;     
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable)
{
    fill(255,215,0);
    ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size);
    fill(125);
    ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - 10);
}

// Function to check character has collected an item.
function checkCollectable(t_collectable)
{
    if( dist(t_collectable.x_pos, t_collectable.y_pos,gameChar_world_x,gameChar_y) < t_collectable.size)
    {
        t_collectable.isFound = true;
        game_score += 1;
    }
}

// Function to draw flagpole
function renderFlagpole()
{
    push();
    fill(125);
    rect(flagpole.x_pos ,floorPos_y - 300,20,300);
    if(flagpole.isReached == true)
    {
        fill(125,200,175);
        rect(flagpole.x_pos,floorPos_y-365,120,65)
    }
    else
    {

        fill(125,200,175);
        rect(flagpole.x_pos,floorPos_y - 65,120,65)
    }
    pop();
}

// Function to check if character has reached flagpole
function checkFlagpole()
{
    var distance = abs(gameChar_world_x - flagpole.x_pos)
    if(distance < 50)
     {
         flagpole.isReached = true;
     }
}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    treePos_y = floorPos_y - 145

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    
    game_score = 0;
    lives -= 1;
    
  
    
	// Initialise arrays of scenery objects.
        trees_x = [-100,-450,-750,40,450,550,1050,1300,1600,1750,2000];
    
       clouds = [
        {x_pos: 200,y_pos: 50,size: 40},
        {x_pos: 750,y_pos: 50,size: 40},
        {x_pos: 1050,y_pos: 50,size: 40}  
        ];
    
    mountains = [
        {x_pos:-1000,y_pos:floorPos_y,x_pos2:-850,y_pos2:floorPos_y,x_pos3:-925,y_pos3:175},
        
        {x_pos:0,y_pos:floorPos_y,x_pos2:150, y_pos2:floorPos_y,x_pos3:75,y_pos3:175},
        
        {x_pos:1000,y_pos:floorPos_y,x_pos2:1150, y_pos2:floorPos_y, x_pos3:1075,y_pos3:175}
        ]
    
    canyon = [
        {x_pos:75,Width:100},
        {x_pos:900,Width:100}
        ]
    
    collectable = [
        {x_pos:250,y_pos:floorPos_y -15,size:30 ,isFound:false},
        {x_pos:1200,y_pos:floorPos_y -15,size:30, isFound:false}
        ]
    
    flagpole = 
        {x_pos: 1500, isReached:false};   
    
}