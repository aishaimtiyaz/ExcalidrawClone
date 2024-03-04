const tooltiptext = {
    lock: "Keep selected tool active after drawing",
    hand: "Hand (panning tool)",
    arrow: "Selection",
    rectangle: "Rectangle",
    diamond: "Diamond",
    circle: "Ellipse",
    forwardArrow: "Arrow",
    line: "Line",
    pencil: "Draw",
    colorPicker:"ink Color",
    text: "Text",
    image: "Insert image",
    eraser: "Eraser",
    tools: "More tools",
    share: "Live collaboration",
    library: "Library",
    resetZoom: "Reset Zoom",
    undo: "Undo",
    redo: "Redo",
    security: "Your drawings are end-to-end encrypted, so the Excalidraw server will never see them.",
    help: "Help?",
};
const tooltipButtons = document.querySelectorAll(".option");
// console.log(tooltipButtons);
tooltipButtons.forEach(button => {
    button.addEventListener("mouseover", displayTooltip);
    button.addEventListener("mouseout", hideTooltip);
});

const tooltipElement = document.createElement("span");
tooltipElement.className = "tooltip";

function displayTooltip(event) {
    const buttonText = event.target.id;
    const tooltipText = tooltiptext[buttonText];

    tooltipElement.innerText = tooltipText;

    // Position the tooltip below the button
    tooltipElement.style.top = event.target.offsetTop + event.target.offsetHeight +10+ "px";
    tooltipElement.style.left = event.target.offsetLeft + "px";

    document.body.appendChild(tooltipElement);
}

function hideTooltip() {
    document.body.removeChild(tooltipElement);
}