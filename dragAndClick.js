let activeCircle = null;
let lastClick = 0;
let initialX = 0;
let initialY = 0;
let offsetX = 0;
let offsetY = 0;

let isEditing = false;
var lineColor = 'yellow';
//Adds drag functionality
allCircles.forEach((circle, index) => {
    circle.addEventListener("dblclick", handleDoubleClick);
    circle.addEventListener("mousedown", handleSingleClick);
    circle.addEventListener("touchstart", handleSingleClick);
});

function handleDoubleClick(e) {
    circle = e.currentTarget;
    if (e.button != 2) {
        if (!isEditing) {
            isEditing = true;
            var number = circle.querySelector('.circle-number');
            const currentValue = number.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = '';

            input.classList.add('inputBox');
            input.classList.add('newNumberInputBox');
            input.style.zIndex = '50';
            var top = circle.getBoundingClientRect().top;
            var left = circle.getBoundingClientRect().left;
            input.style.top = (top - 50) + 'px';
            input.style.left = (left - 24) + 'px';
            console.log(top);
            console.log(left);

            var mainContainer = document.getElementById('main-container');
            mainContainer.appendChild(input);

            input.focus();

            // Add an event listener to save the edited value on Enter and cancel on Esc
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    number.textContent = input.value;
                    isEditing = false;
                } else if (event.key === 'Escape') {
                    number.textContent = currentValue;
                    isEditing = false;
                }
            });

            // Remove the input field and revert to the number when it loses focus
            input.addEventListener('blur', function () {
                if (input.value.length >= 1 && input.value.length <= 4) {
                    getFontSize(input.value.length, number);
                    number.textContent = input.value;
                    isEditing = false;
                    changeNumberOnTextbox(circle, input.value);
                }
                else if (input.value.length > 4) {
                    number.textContent = currentValue;
                    isEditing = false;
                    alert("Input length has to be between 1 and 4 characters");
                }
                else {
                    number.textContent = currentValue;
                    isEditing = false;
                }
                removeInputBox();
            });
        }
    }
    else {
        //Remove all lines drawn from circle
        var lineDivs = circle.querySelectorAll('.line');
        lineDivs.forEach(function (lineElement) {
            lineElement.parentNode.removeChild(lineElement);
        });
        const filteredData = lines.filter(item => item.circle !== circle.id);
        lines = filteredData;
    }
}

function handleSingleClick(e) {
    //Set up variables for mobile tap and right click
    //Undefined = mobile tap
    if (e.button == undefined) {
        var doubleTap = false;
        e.preventDefault(); // to disable browser default zoom on double tap
        let date = new Date();
        let time = date.getTime();
        const time_between_taps = 200; // 250ms
        if (time - lastClick < time_between_taps) {
            var doubleTap = true;
            handleDoubleClick(e);
        }
        lastClick = time;
    }
    //2 = right click
    if (e.button == 2) {
        var doubleTap = false;
        e.preventDefault(); // to disable browser default zoom on double tap
        let date = new Date();
        let time = date.getTime();
        const time_between_taps = 250; // 250ms
        if (time - lastClick < time_between_taps) {
            var doubleTap = true;
            handleDoubleClick(e);
        }
        lastClick = time;
    }
    //0 == left click
    if (e.button === 0 || (e.button === undefined && doubleTap == false)) {
        e.preventDefault();
        if (e.type === "mousedown") {
            activeCircle = this;
            initialX = e.clientX;
            initialY = e.clientY;
        } else if (e.type === "touchstart") {
            activeCircle = this;
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        }
        offsetX = activeCircle.offsetLeft;
        offsetY = activeCircle.offsetTop;
        document.addEventListener("mousemove", dragCircle);
        document.addEventListener("touchmove", dragCircle, { passive: false });
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }
    else if (e.button === 2 && doubleTap == false && e.currentTarget.id != 'ball') {
        e.preventDefault();
        activeCircle = this;
        document.addEventListener("mousemove", dragLine);
        document.addEventListener("touchmove", dragLine, { passive: false });
        document.addEventListener("mouseup", stopLine);
        document.addEventListener("touchend", stopLine);

        startX = e.clientX;
        startY = e.clientY;
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.left = startX + "px";
        line.style.top = startY + "px";
        var lineDivs = activeCircle.querySelectorAll('.line');

        if (e.currentTarget.id.indexOf('oppo') > -1) {
            lineColor = 'red';
        }
        else {
            lineColor = 'yellow';
        }
        // Create arrowheads
        const arrowhead1 = document.createElement("div");
        arrowhead1.classList.add("arrowhead");
        arrowhead1.style.position = 'absolute';
        arrowhead1.style.width = '0';
        arrowhead1.style.height = '0';
        arrowhead1.style.borderLeft = '8px solid transparent';
        arrowhead1.style.borderRight = '8px solid transparent';
        arrowhead1.style.borderBottom = '10px solid ' + lineColor;
        arrowhead1.style.left = '-10px';
        arrowhead1.style.top = '100%';
        arrowhead1.style.transform = `rotate(180deg)`;
        arrowhead1.style.display = 'none';

        // Append arrowheads to the line
        line.appendChild(arrowhead1);

        if (lineDivs.length >= 2) {
            const firstLine = lineDivs[0];
            firstLine.parentNode.removeChild(firstLine);

            // Find the index of the first occurrence where circle matches the id of the activeCircle
            const indexToRemove = lines.findIndex(item => item.circle === activeCircle.id);

            // Remove the element at the found index
            if (indexToRemove !== -1) {
                lines.splice(indexToRemove, 1);
            }
        }
        activeCircle.appendChild(line);
        var lineObj = {
            "circle": activeCircle.id,
            "div": line
        }
        lines.push(lineObj);
        isDrawing = true;
    }
}

function dragCircle(e) {
    if (activeCircle) {
        e.preventDefault();

        let currentX, currentY;

        if (e.type === "mousemove") {
            currentX = e.clientX;
            currentY = e.clientY;
        } else if (e.type === "touchmove") {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }

        const deltaX = currentX - initialX;
        const deltaY = currentY - initialY;

        const newX = offsetX + deltaX;
        const newY = offsetY + deltaY;

        if (newX > 0 && newX < 620) {
            activeCircle.style.left = `${newX}px`;
        }
        if (newY > 0 && newY < 835) {
            activeCircle.style.top = `${newY}px`;
        }


        if (activeCircle.id.indexOf('oppo') > -1 && checkOppositionName.checked) {
            setOppoTextBoxOrder();
        }
        else {
            setTextBoxOrders();
        }
        determineFormation();
    }
}

function stopDrag() {
    activeCircle = null;
    document.removeEventListener("mousemove", dragCircle);
    document.removeEventListener("touchmove", dragCircle);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);

    if (document.getElementById("select-formation").value != '') {
        document.getElementById("select-formation").value = '';
    }
}

function dragLine(e) {
    //e.preventDefault();
    let currentX, currentY;

    if (isDrawing) {
        const line = lines[lines.length - 1].div;
        if (line) {
            if (e.type === "mousemove") {
                currentX = e.clientX;
                currentY = e.clientY;
            }


            // Calculate the horizontal and vertical differences
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            // Calculate the angle in radians
            const angleInRadians = Math.atan2(deltaY, deltaX);
            const angleDeg = ((angleInRadians * 180) / Math.PI) - 90;

            // Calculate the hypotenuse (line length)
            const hypotenuse = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (hypotenuse > 10) {
                const arrowheadDiv = line.querySelector(".arrowhead");
                if (arrowheadDiv.style.display == 'none') {
                    if (Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {
                        arrowheadDiv.style.display = 'flex';
                    }
                };
                // Create a div element to represent the line
                //Circle size depends on opposition or not, so that means so does line position
                line.style.top = '0px';
                line.style.left = '0px';
                line.style.position = 'absolute';
                line.style.height = hypotenuse + 'px';
                line.style.backgroundColor = 'transparent';
                line.style.borderLeft = '4px dotted ' + lineColor;
                line.style.transformOrigin = 'left top';
                line.style.transform = `rotate(${angleDeg}deg)`;

            }
        }
    }
}

function stopLine(e) {
    var lineDivs = activeCircle.querySelectorAll('.line');
    lineDivs.forEach(function (lineElement) {
        if (!(parseInt(lineElement.style.height) > 22)) {
            lineElement.parentNode.removeChild(lineElement);
        }

    });

    activeCircle = null;
    document.removeEventListener("mousemove", dragLine);
    document.removeEventListener("touchmove", dragLine);
    document.removeEventListener("mouseup", stopLine);
    document.removeEventListener("touchend", stopLine);
    isDrawing = false;
}

function removeInputBox() {
    var inputBoxes = document.querySelectorAll('.newNumberInputBox');
    inputBoxes.forEach(function (inputBox) {
        inputBox.parentNode.removeChild(inputBox);
    });
}