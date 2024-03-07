const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");



//canvas
let drawingColor = "black";
let prevPosition = null;

 function onMouseDown(e)
 { console.log("mouseDown");
   prevPosition= [e.clientX,e.clientY];
   c.strokeStyle = drawingColor;
   c.lineWidth=2;
   canvas.addEventListener("mousemove",onMouseMove);
   canvas.addEventListener("mouseup",onMouseUp);
 }

 function onMouseMove(e)
 {
    console.log("mouse move");
    let currPosition = [e.clientX,e.clientY];
    c.beginPath();
    c.moveTo(...prevPosition);
    c.lineTo(...currPosition);
    c.stroke();
    c.closePath();
    prevPosition = currPosition;
 }

 function onMouseUp(e)
 {
    console.log("mouse up");
    canvas.removeEventListener("mousemove",onMouseMove);
 }