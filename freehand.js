const pencil = document.getElementById("pencil");
console.log(pencil);
const colorPicker = document.getElementById("colorPicker");
let isPencilActive = false;

colorPicker.addEventListener("change",()=>drawingColor=colorPicker.value);

function onPencilClick()
{console.log("OnpencilClick");
    pencil.classList.toggle("active");
    isPencilActive = !isPencilActive;
    if(isPencilActive)
    {
        drawingColor=colorPicker.value;
        console.log(drawingColor);
        canvas.style.cursor="crosshair";
        console.log(canvas.style.cursor);
        canvas.addEventListener("mousedown",onMouseDown);
    }
    else{
        canvas.style.cursor="auto";
        canvas.removeEventListener("mousedown",onMouseDown);
    }
}
pencil.addEventListener("click",onPencilClick);