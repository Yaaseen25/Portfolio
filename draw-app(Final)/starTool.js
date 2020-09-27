function StarTool(){
    
    this.name = "starTool";
    this.icon = "assets/star.jpg";
    
    // variable which determins how much spaccing between stars
	var spread = 12;
    //image of the star
    img = loadImage('assets/StarImg.jpg');
    //functions which draws stars when mouse is pressed
    this.draw = function(){
        // takes input from user and saves it
        var stars = document.getElementById('numOfStars').value;
        // if result equals 0, stars has no decimals
        var result = (stars - Math.floor(stars)) == 0;
        // checks if input is number
        var isNumber = parseInt(document.getElementById('numOfStars').value)  
//        console.log(isNumber)
        // if input passes these checks, they'll be able to draw
        if(stars < 6 && result && isNumber != "NaN" ){
            if(mouseIsPressed){
                for(var i = 0; i < stars; i++){
//                    image(img,random(mouseX-spread, mouseX+spread), random(mouseY-spread, mouseY+spread),12,12);
                    var X = random(spread) * (stars);
                    var Y = random(spread) * stars;
                    beginShape();
                    vertex(mouseX+X,mouseY+Y);
                    vertex(mouseX+X+6,mouseY+Y+00);
                    vertex(mouseX+X+9,mouseY+Y-6);
                    vertex(mouseX+X+12,mouseY+Y+00);
                    vertex(mouseX+X+18,mouseY+Y+00);
                    vertex(mouseX+X+12.6,mouseY+Y+3);
                    vertex(mouseX+X+15,mouseY+Y+9);
                    vertex(mouseX+X+9,mouseY+Y+3.6);
                    vertex(mouseX+X+3,mouseY+Y+9);
                    vertex(mouseX+X+5.4,mouseY+Y+3);
                    endShape();    
                    
                }
            }
            // updates canvas once they are done
            loadPixels();            
        }
        
        // if input fails check, they get an alert
        else
        {
             window.alert("Please enter a valid number between 1 and 5");
             document.getElementById('numOfStars').value = "1";
        }
	};
    
    // this creates the input box near the colour palette
    this.populateOptions = function(){
        $(".options").html("<div id=sliders><div id=text><text>Enter number of stars</text><br><input type = 'integer' id='numOfStars' min = '1' max = '5' placeholder = 'Enter number of stars' value = 1 style = 'width: 144px;top:10px;left:0px'></><div>");  

    };
    
    // once they click something else, input box disapears and black colour is selected so they don't have to click the colour again.
    this.unselectTool = function(){
		updatePixels();
		//clear options
		$(".options").html("");
//        ColourPalette();
	};      
// TO DO:
// fix up progress log.   
// fix eraserTool back to colour.
// eraser line up

}