let activeCircle = null;
let lastClick = 0;
let initialX = 0;
let initialY = 0;
let offsetX = 0;
let offsetY = 0;

let isEditing = false;
var lineColor = 'yellow';
var lineStyle = 'dotted';
var startTime = 0;
var startedWithThree = false;

var arrowSwitch = document.getElementById('arrow-checkbox');
var circleSwitch = document.getElementById('circle-checkbox');
var animationPlaying = document.getElementById("play-checkbox");
//Adds drag functionality
allCircles.forEach((circle) => {
    circle.addEventListener("dblclick", handleDoubleClick);
    circle.addEventListener("mousedown", handleSingleClick);
    circle.addEventListener("touchstart", handleSingleClick);
});

function changeNumber(circle, input) {
    var number = circle.querySelector('.circle-number');
    const currentValue = number.textContent;

    // Add an event listener to save the edited value on Enter and cancel on Esc
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            isEditing = false;
            changeNumberOnTextboxOrCircle(circle, input.value);
            removeInputBox();
        } else if (event.key === 'Escape') {
            number.textContent = currentValue;
            isEditing = false;
            removeInputBox();
        }
    });

    // Remove the input field and revert to the number when it loses focus
    input.addEventListener('blur', function () {
        if (input.value.length >= 1 && input.value.length <= 4) {
            getFontSize(input.value.length, number);
            number.textContent = input.value;
            isEditing = false;
            changeNumberOnTextboxOrCircle(circle, input.value);
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

function changePlayerName(circle, input, span) {
    const currentValue = span.innerText;
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            isEditing = false;
            changeNameInTextbox(circle, input.value, span);
            removeInputBox();
        } else if (event.key === 'Escape') {
            number.textContent = currentValue;
            isEditing = false;
            removeInputBox();
        }
    });

    // Remove the input field and revert to the number when it loses focus
    input.addEventListener('blur', function () {
        if (input.value.length >= 2) {
            span.innerText = input.value;
            isEditing = false;
            changeNameInTextbox(circle, input.value, span);
        }
        else if (input.value.length == 1) {
            span.innerText = currentValue;
            isEditing = false;
            alert("Input length has to be more than 1 character");
        }
        else {
            span.innerText = currentValue;
            isEditing = false;
        }
        removeInputBox();
    });
}

function handleDoubleClick(e) {
    //this localstorage is set to false during GIF creation and the pressing animation
    if (localStorage.getItem('allowClickAndDrag') != 'false' && !animationPlaying.checked) {
        circle = e.currentTarget;
        if (e.button == 0 || (e.button == undefined && circleSwitch.checked)) {
            if (!isEditing) {
                isEditing = true;

                const input = document.createElement('input');
                input.type = 'text';
                input.value = '';

                input.classList.add('inputBox');
                input.classList.add('newNumberInputBox');

                var top = 1.2 * circle.offsetHeight;
                var left = 0.25 * circle.offsetWidth;
                input.style.top = '-' + top + 'px';
                input.style.left = '-' + left + 'px';
                input.style.width = '100%';

                circle.appendChild(input);


                //If names are clicked or other part of the circle
                if (e.target.id.indexOf('Span') > -1) {
                    input.style.width = '100px';
                    input.style.left = '-40px';
                    input.focus();
                    changePlayerName(circle, input, e.target);

                }
                else {
                    input.focus();
                    changeNumber(circle, input);
                }
            }
        }
        else {
            removeLines(circle);
        }
    }

}

function handleSingleClick(e) {
    //this localstorage is set to false during GIF creation and the pressing animation
    if (localStorage.getItem('allowClickAndDrag') != 'false' && !animationPlaying.checked) {
        //Check if click is on the circle or line
        var clickedOnLine = (e.target.classList.toString().indexOf('line') > -1 || e.target.classList.toString().indexOf('arrowhead') > -1);
        //Set up variables for mobile tap and right click
        //Undefined = mobile tap
        if (e.button == undefined) {
            if (clickedOnLine) {
                removeSpecificLine(e.target);
            }
            else {
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
        }
        //2 = right click
        if (e.button == 2) {

            var doubleTap = false;
            e.preventDefault(); // to disable browser default zoom on double tap
            let date = new Date();
            let time = date.getTime();
            const time_between_taps = 200; // 150ms
            if (time - lastClick < time_between_taps) {
                var doubleTap = true;
                handleDoubleClick(e);
            }
            lastClick = time;
        }
        //0 == left click
        if (e.button === 0 || (e.button === undefined && doubleTap == false)) {
            if (e.button === 0 || (e.button === undefined && circleSwitch.checked)) {
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
            else if (!clickedOnLine) {
                drawLineFunctionality(e, this, true);
            }
        }
        else if (e.button === 2 && doubleTap == false) {
            if (clickedOnLine) {
                removeSpecificLine(e.target);
            }
            else {
                drawLineFunctionality(e, this, false);
            }
        }
    }
}

function removeSpecificLine(line) {
    //add arrowhead functionality
    if (line.classList.value.indexOf('normalLine') > -1) {
        // Use the filter method to create a new array without the elements that match the condition
        lines = lines.filter(function (normalLine) {
            return normalLine.div !== line;
        });
    }
    else if (line.classList.value.indexOf('movingLine') > -1) {
        // Use the filter method to create a new array without the elements that match the condition
        movingLines = movingLines.filter(function (movingLine) {
            return movingLine.div !== line;
        });
    }

    arrowLocationArray = arrowLocationArray.filter(item => item.id !== line.getAttribute('parentCircleId'));
    if (arrowLocationArray.length == 0) {
        var playButton = document.querySelector('.play-checkbox .checkmark');
        if (playButton.classList.toString().indexOf('orangeBackgroundButton') > -1) {
            playButton.classList.remove('orangeBackgroundButton');
        }
        var recordButton = document.querySelector('.record-checkbox .checkmark');
        if (recordButton.classList.toString().indexOf('orangeBackgroundButton') > -1) {
            recordButton.classList.remove('orangeBackgroundButton');
        }
    }
    line.remove();
    //arrowLocationArray = filteredArray;
    setLocalStorageForLines();
}

function removeLines(circle) {
    //Remove all lines drawn from circle
    var playingArrows = document.getElementById('play-checkbox').checked;
    //If not currently moving
    if (!playingArrows) {
        var normalLineDivs = circle.querySelectorAll('.normalLine');
        normalLineDivs.forEach(function (lineElement) {
            lineElement.parentNode.removeChild(lineElement);
        });
        const filteredData = lines.filter(item => item.circle !== circle.id);
        lines = filteredData;
        setLocalStorageForLines();
    }
}

window.setLocalStorageForLines = setLocalStorageForLines;
function setLocalStorageForLines() {
    //After the lines from 1 circle are removed, we neet to set all the remaining lines to the local storage
    var allNormalLines = document.getElementsByClassName('normalLine');
    var allMovingLines = document.getElementsByClassName('movingLine');
    var mainLineInfo = '#';
    var oppoLineInfo = '#';
    var movingLineInfo = '#';
    for (var i = 0; i < allNormalLines.length; i++) {
        var parentCircleId = allNormalLines[i].getAttribute('parentcircleid');
        var height = allNormalLines[i].getAttribute('height');
        var angleDeg = allNormalLines[i].getAttribute('angledeg');
        if (parentCircleId.indexOf('oppo') == -1) {
            mainLineInfo += parentCircleId + 'H' + height + 'D' + angleDeg + "#";
        }
        else {
            oppoLineInfo += parentCircleId + 'H' + height + 'D' + angleDeg + "#";
        }
    }
    for (var j = 0; j < allMovingLines.length; j++) {
        var parentCircleId = allMovingLines[j].getAttribute('parentcircleid');
        var height = allMovingLines[j].getAttribute('height');
        var angleDeg = allMovingLines[j].getAttribute('angledeg');
        movingLineInfo += parentCircleId + 'H' + height + 'D' + angleDeg + "#";
    }
    localStorage.setItem('mainLineInfo', mainLineInfo);
    localStorage.setItem('oppoLineInfo', oppoLineInfo);
    localStorage.setItem('movingLineInfo', movingLineInfo);

}


function drawLineFunctionality(e, circle, mobile) {
    startTime = new Date().getTime();

    var movingLine = document.getElementById('moving-checkbox').checked;

    //Ball cant have pressing lines
    if (movingLine && e.target.id == 'ball') {
        return;
    }
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
    if (movingLine) {
        line.classList.add("movingLine");
    }
    else {
        line.classList.add("normalLine");
    }


    if (movingLine) {
        lineStyle = 'dashed';
        lineColor = '#4696ff';
    }
    else {
        lineStyle = 'dotted';
        if (e.currentTarget.id.indexOf('oppo') > -1) {
            lineColor = 'purple';
        }
        else if (e.currentTarget.id.indexOf('ball') > -1) {
            lineColor = 'white';
        }
        else {
            lineColor = 'yellow';
        }
    }
    // Create arrowheads
    const arrowhead1 = document.createElement("div");
    arrowhead1.classList.add("arrowhead");
    arrowhead1.style.borderBottomColor = lineColor;
    arrowhead1.style.transform = `rotate(180deg)`;
    arrowhead1.style.display = 'none';

    // Append arrowheads to the line
    line.appendChild(arrowhead1);

    var normalLineDivs = activeCircle.querySelectorAll('.normalLine');
    var movingLineDiv = activeCircle.querySelector('.movingLine');

    // Remove old moving line
    if (movingLine) {
        if (movingLineDiv) {
            movingLineDiv.parentNode.removeChild(movingLineDiv);
            movingLines = [];
        }
    }
    else {
        if (normalLineDivs.length >= 3) {
            startedWithThree = true;

            const firstLine = normalLineDivs[0];
            firstLine.parentNode.removeChild(firstLine);

            // Find the index of the first occurrence where circle matches the id of the activeCircle
            const indexToRemove = lines.findIndex(item => item.circle === activeCircle.id);

            // Remove the element at the found index
            if (indexToRemove !== -1) {
                lines.splice(indexToRemove, 1);
            }
        }
    }

    activeCircle.appendChild(line);
    var lineObj = {
        "circle": activeCircle.id,
        "div": line
    }
    if (!movingLine) {
        lines.push(lineObj);
    }
    else {
        movingLines.push(lineObj);
    }
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

        var newX = offsetX + deltaX;
        var newY = offsetY + deltaY;


        //Blue line height determines how far the circle can go on the pitch
        var yCoordinate = 0;
        var xCoordinate = 0;
        var movingLine = activeCircle.querySelector('.movingLine');
        if (movingLine) {
            var height = parseInt(movingLine.style.height); // Height of the line
            var angleDegrees = movingLine.style.transform.split('(')[1].split('deg')[0];

            const angleInRadians = angleDegrees * Math.PI / 180;

            yCoordinate = height * Math.cos(angleInRadians);
            xCoordinate = height * Math.sin(angleInRadians);

        }


        //max changes based on size of the imageContainer
        const maxLeft = (62 / 730) * imageContainer.offsetWidth;
        const maxRight = (637 / 730) * imageContainer.offsetWidth;
        const maxTop = (45 / 900) * imageContainer.offsetHeight;
        const maxBottom = (822 / 900) * imageContainer.offsetHeight;

        //Check X & Y location with and without Line
        var newXCheck = newX > maxLeft && newX < maxRight;
        var newYCheck = newY > maxTop && newY < maxBottom;
        var newXCheckWithMovingLine = (newX - xCoordinate) > maxLeft && (newX - xCoordinate) < maxRight;
        var newYCheckWithMovingLine = (newY + yCoordinate) > maxTop && (newY + yCoordinate) < maxBottom;

        if (newXCheck && newXCheckWithMovingLine) {
            activeCircle.style.left = newX / imageContainer.offsetWidth * 100 + '%';
        }
        if (newYCheck && newYCheckWithMovingLine) {
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
    if (activeCircle.id.indexOf('oppo') > -1) {
        localStorage.setItem('oppoCirclePositions', getCirclePositions(oppoCircles));
    }
    else if (activeCircle.id.indexOf('ball') > -1) {
        localStorage.setItem('ballPosition', getCirclePositions(activeCircle));
    }
    else {
        localStorage.setItem('mainCirclePositions', getCirclePositions(mainCircles));
    }
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

    var movingLine = document.getElementById('moving-checkbox').checked;
    if (isDrawing) {
        if (!movingLine) {
            var line = lines[lines.length - 1].div;
        }
        else {
            var line = movingLines[movingLines.length - 1].div;
        }
        if (line) {
            if (e.type === "mousemove" || e.type === "touchmove") {
                currentX = e.clientX || e.touches[0].pageX;
                currentY = e.clientY || e.touches[0].pageY;
            }

            var lineX = currentX - imageContainer.getBoundingClientRect().left;
            var lineY = currentY - imageContainer.getBoundingClientRect().top;

            var offsetX = activeCircle.offsetWidth / 2;
            var offsetY = activeCircle.offsetHeight / 2;

            //set limits of the lines based on the pitch dimensions
            const maxLeft = ((65 / 730) * imageContainer.offsetWidth) + offsetX;
            const maxRight = ((660 / 730) * imageContainer.offsetWidth) - offsetX;
            const maxTop = ((50 / 900) * imageContainer.offsetHeight) + offsetY;
            const maxBottom = ((850 / 900) * imageContainer.offsetHeight) - offsetY;


            if (lineX < maxLeft) {
                currentX = imageContainer.getBoundingClientRect().left + maxLeft;
            }
            if (lineX > maxRight) {
                currentX = imageContainer.getBoundingClientRect().left + maxRight;
            }
            if (lineY < maxTop) {
                currentY = imageContainer.getBoundingClientRect().top + maxTop;
            }
            if (lineY > maxBottom) {
                currentY = imageContainer.getBoundingClientRect().top + maxBottom;
            }

            // Calculate the horizontal and vertical differences
            var deltaX = currentX - startX;
            var deltaY = currentY - startY;

            // Calculate the angle in radians
            const angleInRadians = Math.atan2(deltaY, deltaX);
            const angleDeg = ((angleInRadians * 180) / Math.PI) - 90;

            // Calculate the hypotenuse (line length)
            const hypotenuse = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (hypotenuse > 10) {
                const arrowheadDiv = line.querySelector(".arrowhead");
                if (arrowheadDiv.style.display == 'none') {
                    //If line is drawn higher than 20px further
                    if (Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {
                        arrowheadDiv.style.display = 'flex';
                    }
                };


                // Create a div element to represent the line
                //Circle size depends on opposition or not, so that means so does line position
                line.style.position = 'absolute';
                line.style.height = hypotenuse + 'px';

                line.style.backgroundColor = 'transparent';
                line.style.borderLeftStyle = lineStyle;
                line.style.borderLeftColor = lineColor;
                line.style.transformOrigin = 'left top';
                line.style.transform = `rotate(${angleDeg}deg)`;
                line.style.zindex = '1';

                var hypotenusePct = (hypotenuse / imageConHeight).toFixed(5);
                line.setAttribute('hypotenusePct', hypotenusePct);
                line.setAttribute('height', hypotenuse.toFixed(3));
                line.setAttribute('angleDeg', angleDeg.toFixed(3));
                line.setAttribute('parentCircleId', activeCircle.id);
            }
        }
    }
}

function stopLine(e) {
    var movingLine = document.getElementById('moving-checkbox').checked;
    var latestLine;
    //Get last line added to the array
    if (movingLine) {
        latestLine = movingLines[movingLines.length - 1].div
    }
    else {
        latestLine = lines[lines.length - 1].div
    }

    //If line is too short, dont keep it
    if (parseInt(latestLine.style.height) < 22 || latestLine.style.height == '') {
        var circleId = latestLine.parentNode.id;
        latestLine.parentNode.removeChild(latestLine);
        if (movingLine) {
            //If blue arrow is short, it should get removed from the movingLines array as well as the arrowLocationArray
            movingLines.pop();
            const filteredArray = arrowLocationArray.filter(item => item.id !== circleId);

            arrowLocationArray = filteredArray;
            if (arrowLocationArray.length == 0) {
                var playButton = document.querySelector('.play-checkbox .checkmark');
                if (playButton.classList.toString().indexOf('orangeBackgroundButton') > -1) {
                    playButton.classList.remove('orangeBackgroundButton');
                }
                var recordButton = document.querySelector('.record-checkbox .checkmark');
                if (recordButton.classList.toString().indexOf('orangeBackgroundButton') > -1) {
                    recordButton.classList.remove('orangeBackgroundButton');
                }
            }
        }
        else {
            //Remove last line added to the array
            lines.pop();
        }
    }
    //If long enough, keep it and add it to the information
    else {
        if (movingLine) {
            //Push data for line to array for movement functionality 
            addLineDataToArray(latestLine, activeCircle);

            //Set color of 'play button' to orange to illustrate it is ready to be clicked
            var playButton = document.querySelector('.play-checkbox .checkmark');
            if (playButton.classList.toString().indexOf('orangeBackgroundButton') == -1) {
                playButton.classList.add('orangeBackgroundButton');
            }
            var recordButton = document.querySelector('.record-checkbox .checkmark');
            if (recordButton.classList.toString().indexOf('orangeBackgroundButton') == -1) {
                recordButton.classList.add('orangeBackgroundButton');
            }
        }
    }

    //If double clicked, delete all lines
    let endTime = new Date().getTime();
    //HoldTime = time between start of click and release of click
    var holdTime = endTime - startTime;

    if (holdTime < 90) {
        //Check if the oldest line wasn't already removed due to the limit of 3 lines
        if (!movingLine && !startedWithThree) {
            var normalLineDivs = activeCircle.querySelectorAll('.normalLine');
            if (normalLineDivs.length > 0) {
                const firstLine = normalLineDivs[0];
                firstLine.parentNode.removeChild(firstLine);

                // Find the index of the first occurrence where circle matches the id of the activeCircle
                const indexToRemove = lines.findIndex(item => item.circle === activeCircle.id);

                // Remove the element at the found index
                if (indexToRemove !== -1) {
                    lines.splice(indexToRemove, 1);
                }
            }
        }
    }

    setLocalStorageForLines();
    //Reset functionality
    activeCircle = null;
    document.removeEventListener("mousemove", dragLine);
    document.removeEventListener("touchmove", dragLine);
    document.removeEventListener("mouseup", stopLine);
    document.removeEventListener("touchend", stopLine);
    isDrawing = false;
    startedWithThree = false;
}

window.removeInputBox = removeInputBox;
function removeInputBox() {
    var inputBoxes = document.querySelectorAll('.newNumberInputBox');
    inputBoxes.forEach(function (inputBox) {
        inputBox.parentNode.removeChild(inputBox);
    });
}

//Used to determine where the circles have to move for the moving lines (pressing arrows)
//Normal lines are not included
function addLineDataToArray(newLine, activeCircle) {
    // Given values
    var height = newLine.style.height; // Height of the line
    var angleDegrees = newLine.style.transform.split('(')[1].split('deg')[0];
    var angleRadians = (angleDegrees * Math.PI) / 180;

    // Calculate the x and y components
    var x = height.split('px')[0] * Math.sin(angleRadians);
    var y = height.split('px')[0] * Math.cos(angleRadians);

    var arrowLocationObj = {
        "id": activeCircle.id,
        "top": y,
        "left": x
    };
    arrowLocationArray.push(arrowLocationObj);
}
