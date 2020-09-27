function SpirographTool(){
    this.name = "spirographTool";
    this.icon = "assets/spiro.jpg";
    // variable for the spirograph
    let width = 400,
          height = 400,
          PR = window.devicePixelRatio || 1,
          scaledWidth = width*PR,
          scaledHeight = height*PR,
          showCircles = true,
          loopTime = 2000,
          tickTime = 10,
          R = 150, r = 52, l = 0.6,
          p = l*r,
          k = r/R,
          t;
          color = 'rgba(0, 0, 0, 0.0)'
    // set the width and height for the canvas
    let backContext = d3.select('canvas#circle')
    .attrs({
      width: scaledWidth,
      height: scaledHeight,
      background:'white',
    })
    .styles({
      width: `${width}px`,
      height: `${height}px`,
      background: `${color}`
    })
    .node().getContext("2d");
      
    //set the width and height for the spirograph
    let context = d3.select('canvas#spiro')
    .attrs({
      width: scaledWidth,
      height: scaledHeight,
    })
    .styles({
      width: `${width}px`,
      height: `${height}px`
    })
    .node().getContext("2d");
    
    //set width and height for when user saves image of spirograph 
    let contextIMG = d3.select('canvas#image')
    .attrs({
      width: scaledWidth,
      height: scaledHeight,
    })
    .styles({
      width: `${width}px`,
      height: `${height}px`
    })
    .node().getContext("2d");

    backContext.scale(PR, PR);
    context.scale(PR, PR);
    contextIMG.scale(PR, PR);
    // draw the spirograph using the inputs from the user.
    this.draw = function(){
    function pinPoint(angle){
      return [
      (R*( ((1-k)*(Math.cos(angle))) + (l*k*Math.cos(((1-k)/k)*angle)) )) + (width/2),
      (R*( ((1-k)*(Math.sin(angle))) - (l*k*Math.sin(((1-k)/k)*angle)) )) + (height/2)
      ]
    }

    let p0 = [(width/2)+(R-r)+p,height/2];

    // set the colour of the drawing ball
    backContext.strokeStyle = 'gray';
    backContext.fillStyle = 'rgba(50, 50, 50, 0.2)';

    context.strokeStyle = 'gold';

    function initCircles(){

      p = l*r;
      k = r/R;
      p0 = [(width/2)+(R-r)+p,height/2];
      
      backContext.clearRect(0, 0, width, height);

      backContext.beginPath();
      backContext.arc(width/2, height/2, R, 0, Math.PI * 2);
      backContext.stroke();

      backContext.beginPath();
      backContext.arc((R-r)*Math.cos(0) + (width/2), (R-r)*Math.sin(0) + (height/2), Math.abs(r), 0, Math.PI * 2);
      backContext.fill();

      backContext.fillStyle = 'gold';
      backContext.beginPath();
      backContext.arc(...p0, 3, 0, Math.PI * 2);
      backContext.fill();
      
      backContext.fillStyle = 'rgba(255, 255, 255, 0.2)';
    }

    d3.select('#bigCircle').on('input', () => {
      R = d3.select('#bigCircle').node().value;
      initCircles();
    });

    d3.select('#smallCircle').on('input', () => {
      r = d3.select('#smallCircle').node().value;
      initCircles();
    });

    d3.select('#p').on('input', () => {
      l = d3.select('#p').node().value;
      initCircles();
    });

    d3.select('#loopTime').on('input', () => {
      loopTime = d3.select('#loopTime').node().value;
    });

    d3.select('#showCircles').on('click', () => {
      showCircles = d3.select('#showCircles').node().checked;
      initCircles();
      if(showCircles == false) backContext.clearRect(0, 0, width, height);  
    });

    initCircles();

    d3.select('#draw').on('click', () => {
      d3.selectAll('#draw, #showCircles, #sliders input').attr('disabled', 1);
      t = d3.interval((e) => {
        let a = (e/loopTime) * Math.PI * 2;
        let xy = pinPoint(a);

        if(showCircles == true){
          backContext.clearRect(0, 0, width, height);

          backContext.beginPath();
          backContext.arc(width/2, height/2, R, 0, Math.PI * 2);
          backContext.stroke();

          backContext.beginPath();
          backContext.arc((R-r)*Math.cos(a) + (width/2), (R-r)*Math.sin(a) + (height/2), Math.abs(r), 0, Math.PI * 2);
          backContext.fill();

          backContext.fillStyle = 'gold';
          backContext.beginPath();
          backContext.arc(...xy, 3, 0, Math.PI * 2);
          backContext.fill();
          
          backContext.fillStyle = 'rgba(255, 255, 255, 0.2)';
        }

        context.beginPath();
        context.moveTo(...p0);
        context.lineTo(...xy);
        context.stroke();

        p0 = xy;

      },tickTime);
    });

    d3.select('#save').on('click', () => {
      
    // stop drawing when save button pressed
        t.stop();
        //disable save button
      d3.select('#save button').attr('disabled', 1);
      
      contextIMG.fillStyle = 'white';
      contextIMG.fillRect(0, 0, width, height);
      contextIMG.drawImage(d3.select('#spiro').node(), 0, 0, width, height);
      
      let image = d3.select('#image').node().toDataURL();  
      d3.select('#save').node().href = image;
      d3.select('#save').node().download = "spiro.png";  
    });

    d3.select('#reset').on('click', () => {
      if(typeof(t) == 'object') t.stop();
      
      showCircles = true;
      R = 150; r = 52; l = 0.6;
      p = l*r;
      k = r/R;
      loopTime = 2000;
      
      p0 = [(width/2)+(R-r)+p,height/2];
      backContext.clearRect(0, 0, width, height);
      context.clearRect(0, 0, width, height);
      initCircles();
      
      d3.selectAll('#draw, #showCircles, #save button, #sliders input').attr('disabled', null);
      showCircles = d3.select('#showCircles').node().checked = true;
      d3.select('#bigCircle').node().value = 150;
      d3.select('#smallCircle').node().value = 52;
      d3.select('#p').node().value = 0.6;
      d3.select('#loopTime').node().value = 2000;
    });
      };
    // these are the sliders which the user will use to set the sprograph they want.
    this.populateOptions = function(){
        $(".options").html("<div id=sliders><div id=text>Show circles <input type=checkbox id=showCircles checked style='top:0px;left: 0px'><span>Set outer circle size</span><input type=range min=50 max=190 value=150 id=bigCircle style='top:0px;left: 0px'><br><span>Set inner circle size</span><input type=range min=-100 max=100 value=52 id=smallCircle style='top:0px;left: 0px'><br><span>Set pen position</span><input type=range min=0 max=1 value=0.6 step=any id=p style='top:0px;left: 0px'><br><span>Set duration of one circuit</span><input type=range min=1000 max=5000 value=2000 id=loopTime style='top:0px;left: 0px'><br><button id=draw>Draw</button><a id=save><button>Save image*</button></a><button id=reset>Reset</button><div><div>"); 
    };
    
    //when spirograph unselected,clear the option area.
        this.unselectTool = function(){
		updatePixels();
		//clear options
		$(".options").html("");
            
	}; 

}


