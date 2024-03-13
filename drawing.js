let intialPosition = null;
const history = [];
let historyIndex = -1;

    function onMouseDown(e)
    { 
        console.log("mouseDown");
        if (!(actions.circle || actions.rectangle || actions.eraser || actions.freehand || actions.line)) 
        {
            return;
        }
        
        intialPosition = [e.clientX,e.clientY];
        startIndex = history.length - 1;
        c.strokeStyle = formState.strokestyle;
        c.lineWidth = formState.strokewidth;
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
        console.log(currentPosition,intialPosition)
            c.beginPath();
            // draw rectangle
            c.lineCap = "round";
            c.lineJoin = "round";
            let width = currentPosition[0] - intialPosition[0];
            let height = currentPosition[1] - intialPosition[1];
            c.strokeRect(intialPosition[0], intialPosition[1], width, height);
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
canvas.addEventListener("mousedown", onMouseDown);
 