function stampTool(){
this.icon = "assets/stamp.jpg";
    this.name = "StampTool";
    
    this.type = "RoundedSquare";
    var self = this;
    // draw rounded squares so we can use them later on
    this.drawRoundedSquare = function(xPos, yPos){
        rect(xPos, yPos, 30, 30, 10);
    };
    // draw rounded rectangles so we can use them later on
    this.drawRoundedRectangle = function(xPos, yPos){
        rect(xPos, yPos, 50, 30, 10);
    };
    
    this.draw = function(){
        //if mouse is pressed
            if(mouseIsPressed){
                // draw rounded squares
                if(this.type == "RoundedSquare"){
                    this.drawRoundedSquare(mouseX, mouseY);
                }
                //draw rounded rectangles
                else if(this.type == "RoundedRectangle"){
                    this.drawRoundedRectangle(mouseX, mouseY);
                }
                loadPixels();
            }
        
    };
// clear area after using tool  
    this.unselectTool = function(){
		updatePixels();
		//clear options
		$(".options").html("");
        this.type = "RoundedSquare";
	};
    
    this.populateOptions = function(){
		$(".options").html("<button id='stampButton'>RoundedRectangle</button>");
		//click handler
		$("#stampButton").on("click", function(){
			// click to use rounded rectangles
            if (self.type == "RoundedSquare"){
                self.type = "RoundedRectangle";
                
				$(this).text('RoundedSquare');
			}
			else{
                //click to use rounded squares
                self.type = "RoundedSquare";
				$(this).text('RoundedRectangle');

			}
		});
	};
    
    
}