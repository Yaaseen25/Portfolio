function EraserTool(){
	
	this.name = "eraserTool";
	this.icon = "assets/eraser.jpg";
    
    var previousMouseX = -1;
	var previousMouseY = -1;

    // this function will draw a white line when mouse is pressed 
	this.draw = function(){		
        var eraserSize = document.getElementById('eraserSize').value;
        //if the mouse is pressed
        if(mouseIsPressed){
            // change colour to white
            stroke(255);
            //change thickness to what user has inputted
            strokeWeight(eraserSize);
            //check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
        loadPixels();
	};
    //allow user to change thickness of the eraser.
    this.populateOptions = function(){
        $(".options").html("<div id = text><span>Change size of eraser</span><input type = 'range' id='eraserSize' min = '1' max = '100' style = top:0px;left:0px></><div>");
    };
    
    // When another tool is selected the colour goes back to black and strokeWeight to 1
    this.unselectTool = function(){
		updatePixels();
		//clear options
		$(".options").html("");
        strokeWeight(1);
        ColourPalette();
        
	};   
}