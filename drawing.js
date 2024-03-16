let intialPosition = null;
const history = [];
let historyIndex = -1;

    function onMouseDown(e)
    { 
        console.log("mouseDown");
        if (!(actions.circle || actions.rectangle || actions.eraser || actions.freehand || actions.line || actions.arrow || actions.diamond)) 
        {
            return;
        }
        
        intialPosition = [e.clientX,e.clientY];
        startIndex = history.length - 1;
        c.strokeStyle = formState.strokestyle;
        c.lineWidth = formState.strokewidth;
        c.fillStyle = formState.fillbackground;
        console.log(intialPosition,c.strokeStyle,c.lineWidth );
        canvas.addEventListener("mousemove",onMouseMove);
        canvas.addEventListener("mouseup",onMouseUp);
    }

    function onMouseMove(e)
    {
        console.log("mouse move");
        let currentPosition = [e.clientX,e.clientY];
        console.log(currentPosition);
        if (actions.freehand) 
        {
            drawFreeHand(currentPosition);
        }
        else if (actions.eraser) 
        {
            handleErase(currentPosition);
        }
        else if (actions.circle) 
        {
            resetToOriginalImage();
            drawCircle(currentPosition);
        }
        else if (actions.rectangle) 
        {
            resetToOriginalImage();
            drawRectangle(currentPosition);
        }
        else if (actions.line) 
        {
            resetToOriginalImage();
            drawLine(currentPosition);
        }
        else if(actions.arrow)
        {
            resetToOriginalImage();
            drawArrow(currentPosition);
        }
        else if(actions.diamond)
        {
            resetToOriginalImage();
            drawDimond(currentPosition);
        }
    }

        function onMouseUp() 
        {
            // cleanup
            console.log("onmouseup");
            history.push(c.getImageData(0, 0, canvas.width, canvas.height));
            historyIndex++;
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
        }

        function resetToOriginalImage() 
        {
            if (startIndex !== -1)
            {
                // we have some drawings before we start the rectangle drawing.
                c.putImageData(history[startIndex], 0, 0);
            }
            else 
            {
                // if i do not have drawings before we start rectangle drawing.
                c.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    
        function drawFreeHand(currentPosition) 
        {console.log("inside freehand");
            c.beginPath();
            c.moveTo(...intialPosition);
            c.lineTo(...currentPosition);
            c.lineCap = "round";
            c.lineJoin = "round";
            c.stroke();
            c.closePath();
            intialPosition = currentPosition;
        }
        
        function handleErase(currentPosition)
        {
            c.clearRect(...currentPosition, 10, 10);
        }
    
        function drawCircle(currentPosition)
        {
            console.log("inside drawCircle");
            c.beginPath();
            c.lineCap = "round";
            c.lineJoin = "round";
            const radius = Math.sqrt(
                (currentPosition[0] - intialPosition[0]) ** 2 +
                (currentPosition[1] - intialPosition[1]) ** 2
            );
        
            c.arc(intialPosition[0], intialPosition[1], radius, 0, 2 * Math.PI, true);
            c.stroke();
        }
    
        function drawRectangle(currentPosition)
        {console.log("inside drawRectangle");
        console.log(currentPosition,intialPosition);
            c.beginPath();
            // draw rectangle
            c.lineCap = "round";
            c.lineJoin = "round";
            let width = currentPosition[0] - intialPosition[0];
            let height = currentPosition[1] - intialPosition[1];
         if(formState.edgeRound === "round")
           {
            c.roundRect(intialPosition[0], intialPosition[1], width, height,[20]);
           }
         else 
         {
            c.rect(intialPosition[0], intialPosition[1], width, height);
         }
         if(formState.fill === "fill")
         {
            c.fill();
         }
          
            c.stroke();
        }
        function drawDimond(currentPosition) {
            console.log("inside drawdimond");
            c.beginPath();
            // Calculate the center point between initial and current position
            let centerX = (currentPosition[0] + intialPosition[0]) / 2;
            let centerY = (currentPosition[1] + intialPosition[1]) / 2;
        
            // Calculate half of the width and height
            let halfWidth = Math.abs(currentPosition[0] - intialPosition[0]) / 2;
            let halfHeight = Math.abs(currentPosition[1] - intialPosition[1]) / 2;
        
            // Draw the diamond shape
            c.moveTo(centerX, intialPosition[1]); // Top point
            c.lineTo(currentPosition[0], centerY); // Right point
            c.lineTo(centerX, currentPosition[1]); // Bottom point
            c.lineTo(intialPosition[0], centerY); // Left point
            c.closePath(); // Close the path
        
            // Draw stroke and fill the diamond based on the form state
            if (formState.fill === "fill") {
                c.fill();
            }
            c.stroke();
        }
        
    
        function drawLine(currentPosition)
            {console.log("inside drawLine");
                c.beginPath();
                c.lineCap = "round";
                c.lineJoin = "round";
                c.moveTo(intialPosition[0], intialPosition[1]);
                c.lineTo(currentPosition[0], currentPosition[1]);
                c.stroke();
            }

        function drawArrow(currentPosition) 
        {
            console.log("inside arrowDraw");
                let fromx = intialPosition[0];
                let fromy = intialPosition[1];
                let tox = currentPosition[0];
                let toy = currentPosition[1];
                console.log(fromx,fromy,tox,toy);
                var headlen = 10; // length of head in pixels
                var dx = tox - fromx;
                var dy = toy - fromy;
                var angle = Math.atan2(dy, dx);
                c.beginPath();
                c.moveTo(fromx, fromy);
                c.lineTo(tox, toy);
                c.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
                c.moveTo(tox, toy);
                c.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
                c.stroke();
        }
canvas.addEventListener("mousedown", onMouseDown);
 