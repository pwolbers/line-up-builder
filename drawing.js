const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

const canvasX = canvas.offsetLeft;
const canvasY = canvas.offsetTop;
console.log(canvasX);
console.log(canvasY);

let isPainting = false;
let lineWidth = 80;
let startingX;
let startingY;

var newOffSetX = document.querySelector('.field').offsetLeft + document.querySelector('.image-container').offsetLeft - 2;
var newOffsetY = document.querySelector('.field').offsetTop + document.querySelector('.image-container').offsetTop - 2;
console.log("OFFSETY: " +newOffsetY);

canvas.width = document.querySelector('.field').offsetWidth;
canvas.height = document.querySelector('.field').offsetHeight;
canvas.style.left = newOffSetX + 'px';
canvas.style.top = newOffsetY + 'px';
console.log(canvas.width);
console.log(canvas.height);
ctx.strokeStyle = 'red';


const draw = (e) => {
    if(!isPainting){
        return;
    }
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startingX = e.clientX;
    startingY = e.clientY;
});

canvas.addEventListener('mouseup', () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);