const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
const actionButtons = document.querySelectorAll("#topCenter > div > .option");
const form = document.querySelector(".form");

// console.log("action buttons");
// console.log(actionButtons);
const formState = {
    strokewidth: 2,
    strokestyle: "black"
}

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
    form.classList.toggle("hide");
}

function onInput(element) {
    const newValue = element.value;
    if (element.name === "strokewidth")
        formState[element.name] = parseInt(newValue);
    else
        formState[element.name] = newValue;

    console.log(formState);
}


function onActionClick(event) {
    const element = event.target;
    const actionName = element.id;
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