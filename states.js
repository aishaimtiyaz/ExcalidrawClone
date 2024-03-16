const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
const actionButtons = document.querySelectorAll("#topCenter > div > .option");
const form = document.querySelector(".form");
const dropdownContent = document.querySelector(".dropdown-content");
const edgeDiv = document.querySelector(".edgeDiv");
const actions = {
    freehand: false,
    hand: false,
    arrow: false,
    rectangle: false,
    diamond: false,
    eraser: false,
    circle: false,
    line: false,  
}

actionButtons.forEach(button => {
    button.addEventListener("click", onActionClick);
    console.log(button);
});

function toggleMenu() {
    dropdownContent.classList.toggle("dchide");
}
// function toggleEdge() {
//     console.log("inside toggleEdge");

//     edgeDiv.classList.toggle("edgeHide");
// }

function onActionClick(event) {
    const element = event.target;
    const actionName = element.id;
    form.style.visibility="visible";

    // Set visibility of edgeDiv based on the actionName
    if (actionName === "rectangle") {
        edgeDiv.style.visibility = "visible";
    } else {
        edgeDiv.style.visibility = "hidden";
    }
    console.log(actionName);
    actionButtons.forEach(btn => {
        // for the remaining three options if active class present remove that clas.
        if (btn.classList.contains("active") && btn.id !== actionName) {
            btn.classList.remove("active");
        }
        
    })
    if(actionName=="freehand" || actionName=="rectangle" || actionName=="circle" || actionName=="diamond" || actionName=="line" )
    {
        canvas.style.cursor="crosshair";
    }
    else if(actionName=="hand")
    {
        canvas.style.cursor="grab";
    }
    element.classList.toggle("active");
    
   
    actionButtons.forEach(btn => {
        const isActive = btn.classList.contains("active")
        // {freehand: "active", rectangle: '', circle: '', eraser: ''}
        actions[btn.id] = isActive;
        
    })
      
    if(!element.classList.contains("active"))
    {
      canvas.style.cursor="default";
    }
    
    console.log(actions);
}