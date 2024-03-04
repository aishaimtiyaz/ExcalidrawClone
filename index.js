const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

//canvas
canvas.addEventListener("mousedown",onMouseDown);
let drawingColor = "black";
let prevPosition = null;

 function onMouseDown(e)
 {
   prevPosition= [e.clientX,e.clientY];
   c.strokeStyle = drawingColor;
   c.lineWidth=2;
   canvas.addEventListener("mousemove",onMouseMove);
   canvas.addEventListener("mouseup",onMouseUp);
 }

 function onMouseMove(e)
 {
    let currPosition = [e.clientX,e.clientY];
    c.beginpath();
    c.moveTo(...prevPosition);
    c.lineTo(...currPosition);
    c.stroke();
    c.closePath();
    prevPosition = currPosition;
 }

 function onMouseUp(e)
 {
    canvas.removeEventListener("mousemove",onMouseMove);
 }