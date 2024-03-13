const tooltiptext = {
    lock: "Keep selected tool active after drawing",
    hand: "Hand (panning tool)",
    arrow: "Selection",
    rectangle: "Rectangle",
    diamond: "Diamond",
    circle: "Ellipse",
    forwardArrow: "Arrow",
    line: "Line",
    freehand: "Draw",
    colorPicker:"ink Color",
    text: "Text",
    image: "Insert image",
    eraser: "Eraser",
    tools: "More tools",
    share: "Live collaboration",
    library: "Library",
    zoomIn:"Zoom in",
    zoomOut:"Zoom out",
    resetZoom: "Reset Zoom",
    undo: "Undo",
    redo: "Redo",
    security: "Your drawings are end-to-end encrypted, so the Excalidraw server will never see them.",
    help: "Help?",
};
const tooltipButtons = document.querySelectorAll(".option");

const tooltipElement = document.createElement("span");
tooltipElement.className = "tooltip";

// console.log(tooltipButtons);

tooltipButtons.forEach(button => {
    button.addEventListener("mouseover", displayTooltip);
    button.addEventListener("mouseout", hideTooltip);
    // console.log(button);
});

function displayTooltip(event) {
    // console.log("displayTooltip trigerred for "+event.target);
    const buttonText = event.target.id;
    const tooltipText = tooltiptext[buttonText];

    tooltipElement.innerText = tooltipText;

    // Position the tooltip below the button
    const isBottomLeft = event.target.closest("#bottomLeft"); // Check if the target is within #bottomLeft
    const isBottomRight = event.target.closest("#bottomRight"); // Check if the target is within #bottomRight
    if (isBottomLeft || isBottomRight) {
        tooltipElement.style.top = event.target.offsetTop + tooltipElement.offsetHeight +590 + "px";
    } else {
        tooltipElement.style.top = event.target.offsetTop + event.target.offsetHeight + 23 + "px";
    }
    tooltipElement.style.left = event.target.offsetLeft + "px";

    document.body.appendChild(tooltipElement);
}

function hideTooltip() {
    // console.log("hideTooltip trigerred for ");
    document.body.removeChild(tooltipElement);
}