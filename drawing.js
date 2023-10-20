const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearCanvas);

const undoButton = document.getElementById('undoButton');
undoButton.addEventListener('click', undoStroke);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let isPainting = false;
let startingX;
let startingY;
let undoStack = [canvas.toDataURL()];

var newOffSetX = document.querySelector('.field').offsetLeft;
var newOffSetY = document.querySelector('.field').offsetTop;

canvas.width = document.querySelector('.field').offsetWidth - 8;
canvas.height = document.querySelector('.field').offsetHeight - 8;
canvas.style.left = newOffSetX + 4 + 'px';
canvas.style.top = newOffSetY + 4 + 'px';
ctx.strokeStyle = drawingPickr.getColor().toHEXA().toString();
const canvasX = canvas.offsetLeft;
const canvasY = canvas.offsetTop;

function undoStroke() {
    if (undoStack.length > 1) {
        undoStack.pop();
        let savedCanvas = new Image();
        savedCanvas.src = undoStack[undoStack.length - 1];
        savedCanvas.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(savedCanvas, 0, 0);
        }
    }
}

const draw = (e) => { 
    if (!isPainting) {
        return;
    }
    ctx.lineWidth = drawingSlider.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = drawingPickr.getColor().toHEXA().toString();
    var clientDrawX = e.clientX || e.touches[0].clientX;
    var clientDrawY = e.clientY || e.touches[0].clientY;
    ctx.lineTo(clientDrawX - canvas.offsetLeft - lineupContainer.offsetLeft + window.scrollX, clientDrawY - canvas.offsetTop - lineupContainer.offsetTop + window.scrollY);

    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isPainting = true;
    startingX = e.clientX || e.touches[0].clientX;
    startingY = e.clientY || e.touches[0].clientY;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    
    undoStack.push(canvas.toDataURL()); // Add this line
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isPainting = true;
    startingX = e.clientX || e.touches[0].clientX;
    startingY = e.clientY || e.touches[0].clientY;
});

canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});
