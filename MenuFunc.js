const strokeStyleBtn = document.getElementsByName("strokestyle");
const fillBackgroundBtn = document.getElementsByName("fillbackground");
const strokeWidthBtn = document.getElementsByName("strokewidth");
console.log(strokeStyleBtn);
console.log(strokeWidthBtn);

const formState = {
    strokewidth: 2,
    strokestyle: "black",
    fillbackground:"transparent",
    fill:"hollow",
    edgeRound:"round"
}
function onClick(element){
    const Btn = document.getElementsByName(element.name+"");
    const actionName = element.id;
    console.log(actionName);
    Btn.forEach(btn => {
        // for the remaining three options if active class present remove that clas.
        if (btn.classList.contains("border") && btn.id !== actionName) {
            btn.classList.remove("border");
        }
    })
    element.classList.toggle("border");
}
function onInput(element) {
    const newValue = element.value;
    console.log("newVal"+newValue);
    console.log(element);
    if (element.name === "strokewidth")
    {    
        formState[element.name] = parseInt(newValue);
    }
    else
        {
            formState[element.name] = newValue;
        }
    // element.classList.toggle("border");

}

