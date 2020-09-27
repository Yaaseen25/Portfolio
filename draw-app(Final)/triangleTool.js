function triangleTool(){
    this.name = "TriangleTool";
    this.icon = "assets/triangleImg.jpg";

        
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

    this.value = "x";		
		
		
    this.draw = function(){
        
        if(mouseIsPressed){
			
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}

			else{
				
				updatePixels();
				triangle(startMouseX, startMouseY, startMouseX, mouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		} 
    }
    
    this.unselectTool = function(){
		updatePixels();
		//clear options
		$(".options").html("");
        ColourPalette();
	};
    
    this.populateOptions = function(){
		$(".options").html("<button id='fillButton'>Outline Triangle</button>");
		//click handler
		$("#fillButton").on("click", function(){
			if (this.draw == "x"){
                ColourPalette();
                this.draw = "y";
                
				$(this).text('Outline Triangle');
			}
			else{
                this.draw = "x";
				noFill();
				$(this).text('Fill Triangle');

			}
		});
	};
}