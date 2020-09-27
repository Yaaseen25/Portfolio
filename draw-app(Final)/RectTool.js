

function RectTool(){
	this.icon = "assets/RectImg.jpg";
	this.name = "RectTool";
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
				rect(startMouseX, startMouseY, mouseX-startMouseX, mouseY-startMouseY);
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else if(drawing){
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		} 
    }
// clear area after using tool
    this.unselectTool = function(){
		updatePixels();
		//clear options
		$(".options").html("");
        ColourPalette();
	};
    
    this.populateOptions = function(){
		$(".options").html("<button id='fillButton'>Outline Rectangle</button>");
		//click handler
		$("#fillButton").on("click", function(){
			if (this.draw == "x"){
                ColourPalette();
                this.draw = "y";
                // fill in rectangle
				$(this).text('Outline Rectangle');
			}
			else{
                this.draw = "x";
				noFill();
                // no fill in rectangle
				$(this).text('Fill Rectangle');

			}
		});
	};
}