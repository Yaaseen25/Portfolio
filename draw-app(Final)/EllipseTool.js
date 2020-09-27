function EllipseTool(){
	this.icon = "assets/EllipseImg.jpg";
	this.name = "EllipseTool";
    // they are -1 because we haven't started drawing yet  
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
    this.value = "x";		
		
		
    this.draw = function(){
       if(mouseIsPressed){
           	//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				updatePixels();
				ellipse((startMouseX + mouseX)/2, (startMouseY + mouseY)/2, mouseX - startMouseX, mouseY - startMouseY);
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else if(drawing){
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
    }
// clear options area after using tool 
    this.unselectTool = function(){
		updatePixels();
		//clear options
		$(".options").html("");
        ColourPalette();
	};
    
    this.populateOptions = function(){
		$(".options").html("<button id='fillButton'>Outline Ellipse</button>");
		//click handler
		$("#fillButton").on("click", function(){
			if (this.draw == "x"){
                ColourPalette();
                this.draw = "y";
                //fill in ellipse
				$(this).text('Outline Ellipse');
			}
			else{
                this.draw = "x";
                // no fill in ellipse 
				noFill();
				$(this).text('Fill Ellipse');

			}
		});
	};
}