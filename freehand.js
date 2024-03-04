const pencil = document.getElementById("pencil");
console.log(pencil);
const colorPicker = document.getElementById("colorPicker");
let isPencilActive = false;

colorPicker.addEventListener("change",()=>drawingColor=colorPicker.value);

function onPencilClick()
{
    pencil.classList.toggle("active");
    isPenciActive = !isPencilActive;
    if(isPencilActive)
    {
        drawingColor=colorPicker.value;
        canvas.style.cursor="crosshair";
        canvas.addEventListener("mousedown",onMouseDown);
    }
    else{
        canvas.style.cursor="auto";
        canvas.removeEventListener("mousedown",onMouseDown);
    }
}
pencil.addEventListener("click",onPencilClick);