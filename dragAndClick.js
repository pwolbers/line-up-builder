let activeCircle = null;
let lastClick = 0;
let initialX = 0;
let initialY = 0;
let offsetX = 0;
let offsetY = 0;

let isEditing = false;
var lineColor = 'yellow';

var arrowSwitch = document.getElementById('arrow-checkbox');
//Adds drag functionality
allCircles.forEach((circle, index) => {
    circle.addEventListener("dblclick", handleDoubleClick);
    circle.addEventListener("mousedown", handleSingleClick);
    circle.addEventListener("touchstart", handleSingleClick);
});

function handleDoubleClick(e) {
    circle = e.currentTarget;
    if (e.button == 0 || e.button == undefined && arrowSwitch.checked == false) {
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
            input.style.top = (top - 30) + 'px';
            input.style.left = (left - 8) + 'px';

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
        removeLines(circle);
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
        if (e.button === 0 || (e.button === undefined && arrowSwitch.checked == false)) {
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
        else {
            drawLineFunctionality(e, this, true);
        }
    }
    else if (e.button === 2 && doubleTap == false && e.currentTarget.id != 'ball') {
        drawLineFunctionality(e, this);
    }
}

function removeLines(circle) {
    //Remove all lines drawn from circle
    var lineDivs = circle.querySelectorAll('.line');
    lineDivs.forEach(function (lineElement) {
        lineElement.parentNode.removeChild(lineElement);
    });
    const filteredData = lines.filter(item => item.circle !== circle.id);
    lines = filteredData;
}

function drawLineFunctionality(e, circle, mobile) {
    e.preventDefault();
    activeCircle = circle;
    document.addEventListener("mousemove", dragLine);
    document.addEventListener("touchmove", dragLine, { passive: false });
    document.addEventListener("mouseup", stopLine);
    document.addEventListener("touchend", stopLine);

    startX = e.clientX || e.touches[0].pageX;
    startY = e.clientY || e.touches[0].pageY;

    const line = document.createElement("div");
    line.classList.add("line");

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
    arrowhead1.style.borderBottom = '10px solid ' + lineColor;
    arrowhead1.style.transform = `rotate(180deg)`;
    arrowhead1.style.display = 'none';

    // Append arrowheads to the line
    line.appendChild(arrowhead1);

    // Maximum amount of lines
    if (lineDivs.length >= 3) {
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

function dragCircle(e) {
    if (activeCircle) {
        e.preventDefault();
        let currentX, currentY;

        if (e.type === "mousemove" || e.type === "touchmove") {
            currentX = e.clientX || e.touches[0].clientX;
            currentY = e.clientY || e.touches[0].clientY;
        }

        const deltaX = currentX - initialX;
        const deltaY = currentY - initialY;

        const newX = offsetX + deltaX;
        const newY = offsetY + deltaY;
        console.log("newX: " + newX);
        console.log("newY: " + newY);
        //max changes based on size of the imageContainer
        const maxLeft = (75 / 730) * imageContainer.offsetWidth;
        const maxRight = (623 / 730) * imageContainer.offsetWidth;
        const maxTop = (30 / 900) * imageContainer.offsetHeight;
        const maxBottom = (835 / 900) * imageContainer.offsetHeight;

        if (newX > maxLeft && newX < maxRight) {
            activeCircle.style.left = newX / imageContainer.offsetWidth * 100 + '%';
        }
        if (newY > maxTop && newY < maxBottom) {
            activeCircle.style.top = newY / imageContainer.offsetHeight * 100 + '%';
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
            if (e.type === "mousemove" || e.type === "touchmove") {
                currentX = e.clientX || e.touches[0].pageX;
                currentY = e.clientY || e.touches[0].pageY;
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
                line.style.position = 'absolute';
                line.style.height = hypotenuse + 'px';
                line.style.backgroundColor = 'transparent';
                line.style.borderLeft = '4px dotted ' + lineColor;
                line.style.transformOrigin = 'left top';
                line.style.transform = `rotate(${angleDeg}deg)`;
                line.style.zindex = '1';

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