const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

const clearButton = document.getElementById('clearDrawingButton');
clearButton.addEventListener('click', clearCanvas);

const undoButton = document.getElementById('undoStrokeButton');
undoButton.addEventListener('click', undoStroke);

const pitchClearButton = document.getElementById('pitchClearDrawingButton');
pitchClearButton.addEventListener('click', clearCanvas);

const pitchUndoButton = document.getElementById('pitchUndoStrokeButton');
pitchUndoButton.addEventListener('click', undoStroke);

let isPainting = false;
let startingX;
let startingY;
let undoStack = [canvas.toDataURL()];

var newOffSetX = document.querySelector('.field').offsetLeft || 48;
var newOffSetY = document.querySelector('.field').offsetTop || 35;

var offsetWidthField = document.querySelector('.field').offsetWidth || 485;
var offsetHeightField = document.querySelector('.field').offsetHeight || 647;
canvas.width = offsetWidthField - 8;
canvas.height = offsetHeightField - 8;
canvas.style.left = newOffSetX + 4 + 'px';
canvas.style.top = newOffSetY + 4 + 'px';
ctx.strokeStyle = drawingPickr.getColor().toHEXA().toString();
const canvasX = canvas.offsetLeft;
const canvasY = canvas.offsetTop;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = [canvas.toDataURL()];
}

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
    
    ctx.lineWidth = pitchDrawingSlider.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = pitchDrawingPickr.getColor().toHEXA().toString();
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

    undoStack.push(canvas.toDataURL()); // Add this line
});
