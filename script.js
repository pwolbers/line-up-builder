//Changes color and name of the upload button
jsonFileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        if (file.name.length > 28) {
            const truncatedFilename = file.name.substring(0, 16) + '...';
            chooseFileButton.textContent = truncatedFilename;
        } else {
            chooseFileButton.textContent = file.name;
        }
        importButton.style.backgroundColor = 'blue';
        importButton.style.display = 'inline-block';
    } else {
        chooseFileButton.textContent = 'Upload your team';
        importButton.style.display = 'none';
    }
});

squadNumbers.forEach(squadNumber => {
    squadNumber.addEventListener('dblclick', function () {
        const currentValue = squadNumber.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = '';

        input.classList.add('newNumberInputBox');
        input.style.top = squadNumber.getBoundingClientRect().top + 'px'; //Top + margin set in the newNumberInputBox class gives correct location
        input.style.height = (0.8 * squadNumber.offsetHeight) + 'px'; //Inputbox height slightly smaller than the squadnumber box
        squadNumber.appendChild(input);
        input.focus();

        // Add an event listener to save the edited value on Enter and cancel on Esc
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                var newInput = input.value.toUpperCase();

                changeNumberOnTextboxOrCircle(squadNumber, newInput);
                removeInputBox();
            } else if (event.key === 'Escape') {
                squadNumber.textContent = currentValue;
                removeInputBox();
            }
        });

        // Remove the input field and revert to the number when it loses focus
        input.addEventListener('blur', function () {
            if (input.value.length >= 1 && input.value.length <= 4) {
                var newInput = input.value.toUpperCase();

                squadNumber.textContent = newInput;
                changeNumberOnTextboxOrCircle(squadNumber, newInput);
            }
            else if (input.value.length > 4) {
                squadNumber.textContent = currentValue;
                alert("Input length has to be between 1 and 4 characters");
            }
            else {
                squadNumber.textContent = currentValue;
            }
            removeInputBox();
           
        });
    });
});

//Removes reminder label if teamname box value changes
teamNameBox.addEventListener('input', function () {
    const reminder = document.getElementById('reminderLabel');
    if (reminder.style.display == "flex") {
        reminder.style.display = 'none';
    }
});

// Sets the circles location on the pitch
function setCirclePositions(formationValue, circleType) {
    if (circleType == 'main') {
        const circles = document.querySelectorAll(".circle");

        var circleWidth = circles[0].getBoundingClientRect().width || standardCircleSize;
        circleWidth = circleWidth / 2;
        percentageChangeLeft = (circleWidth / imageConWidth) * 100;

        circles[0].style.top = '84%'; circles[0].style.left = '50%';  //#1

        //4 at the back
        if (formationValue.charAt(0) === '4') {
            circles[1].style.top = '66.5%'; circles[1].style.left = '81%';    //#2
            circles[2].style.top = '71.5%'; circles[2].style.left = '65%';    //#3
            circles[3].style.top = '71.5%'; circles[3].style.left = '35%';    //#4
            circles[4].style.top = '66.5%'; circles[4].style.left = '19%';    //#5
        }
        //3 at the back
        else if (formationValue.charAt(0) === '3' || formationValue.charAt(0) === '5') {
            circles[1].style.top = '73.5%'; circles[1].style.left = '70%';    //#2
            circles[2].style.top = '73.5%'; circles[2].style.left = '50%';  //#3
            circles[3].style.top = '73.5%'; circles[3].style.left = '30%';    //#4
            if (formationValue.charAt(0) === '5' || formationValue == '352' || formationValue == '3421') {
                circles[4].style.top = '48.5%'; circles[4].style.left = '19%';    //#5
                circles[8].style.top = '48.5%'; circles[8].style.left = '81%';    //#7
            }
        }
        //3 up front
        if (formationValue.charAt(2) === '3' && formationValue != '4231') {
            circles[8].style.top = '28.5%'; circles[8].style.left = '81%';    //#7
            circles[9].style.top = '22.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '28.5%'; circles[10].style.left = '19%';  //#11
        }
        //2 up front (with 0 or 2 wingers)
        else if (formationValue.charAt(2) === '2' || formationValue.charAt(2) === '4') {
            circles[9].style.top = '22.5%'; circles[9].style.left = '65%';    //#9
            circles[10].style.top = '22.5%'; circles[10].style.left = '35%';  //#11
        }
        if (formationValue === '433') {
            circles[5].style.top = '58.5%'; circles[5].style.left = '50%';  //#6
            circles[6].style.top = '41.5%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '41.5%'; circles[7].style.left = '38%';    //#10  
        } else if (formationValue === '442diamond') {
            circles[5].style.top = '58.5%'; circles[5].style.left = '50%';  //#6
            circles[6].style.top = '47.5%'; circles[6].style.left = '32%';    //#8
            circles[7].style.top = '36.5%'; circles[7].style.left = '50%';  //#10
            circles[8].style.top = '47.5%'; circles[8].style.left = '68%';    //#7
        } else if (formationValue === '442flat' || formationValue === '424') {
            circles[5].style.top = '49.5%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '49.5%'; circles[6].style.left = '38%';    //#8
            if (formationValue === '442flat') {
                circles[7].style.top = '41.5%'; circles[7].style.left = '19%';    //#10
                circles[8].style.top = '41.5%'; circles[8].style.left = '81%';    //#7
            }
            else {
                circles[7].style.top = '33.5%'; circles[7].style.left = '19%';    //#10
                circles[8].style.top = '33.5%'; circles[8].style.left = '81%';    //#7
            }
        } else if (formationValue == '343') {
            circles[4].style.top = '58.5%'; circles[4].style.left = '50%';    //#5
            circles[5].style.top = '47.5%'; circles[5].style.left = '68%';    //#6
            circles[6].style.top = '47.5%'; circles[6].style.left = '32%';    //#8
            circles[7].style.top = '36.5%'; circles[7].style.left = '50%';  //#10
        } else if (formationValue === "451" || formationValue === "4231") {
            circles[5].style.top = '56.5%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '56.5%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '36.5%'; circles[7].style.left = '50%';  //#10
            circles[8].style.top = '34.5%'; circles[8].style.left = '81%';    //#7
            circles[9].style.top = '22.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '34.5%'; circles[10].style.left = '19%';  //#11
        } else if (formationValue === "532" || formationValue === "352") {
            circles[5].style.top = '54.5%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '54.5%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '34.5%'; circles[7].style.left = '50%';  //#10
        } else if (formationValue === "3421") {
            circles[5].style.top = '54.5%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '54.5%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '34.5%'; circles[7].style.left = '70%';  //#10
            circles[9].style.top = '22.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '34.5%'; circles[10].style.left = '30%';  //#11
        }
        circles.forEach((circle) => {
            circle.style.left = parseFloat(circle.style.left) - percentageChangeLeft + '%';
        });

        localStorage.setItem('mainCirclePositions', getCirclePositions(circles));
    }
    else if (circleType == 'oppo') {
        const circles = document.querySelectorAll(".oppoCircle");

        var circleWidth = circles[0].getBoundingClientRect().width || standardCircleSize;
        circleWidth = circleWidth / 2;
        percentageChangeLeft = (circleWidth / imageConWidth) * 100;

        circles[0].style.top = '6%'; circles[0].style.left = '50%';  //#1
        if (formationValue === '433') {
            circles[1].style.top = '22.5%'; circles[1].style.left = '19%';    //#2
            circles[2].style.top = '17.5%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '17.5%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '22.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '30.5%'; circles[5].style.left = '50%';    //#6
            circles[6].style.top = '47.5%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '47.5%'; circles[7].style.left = '62%';    //#10
            circles[8].style.top = '60.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '60.5%'; circles[10].style.left = '81%';  //#11
        }
        else if (formationValue === "442diamond") {
            circles[1].style.top = '22.5%'; circles[1].style.left = '19%';    //#2
            circles[2].style.top = '17.5%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '17.5%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '22.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '30.5%'; circles[5].style.left = '50%';    //#6
            circles[6].style.top = '41.5%'; circles[6].style.left = '68%';    //#8
            circles[7].style.top = '52.5%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '41.5%'; circles[8].style.left = '32%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '66.5%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "442flat") {
            circles[1].style.top = '22.5%'; circles[1].style.left = '19%';    //#2
            circles[2].style.top = '17.5%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '17.5%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '22.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '44.5%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '44.5%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '49.5%'; circles[7].style.left = '81%';    //#10
            circles[8].style.top = '49.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '66.5%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "424") {
            circles[1].style.top = '22.5%'; circles[1].style.left = '19%';    //#2
            circles[2].style.top = '17.5%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '17.5%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '22.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '44.5%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '44.5%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '56.5%'; circles[7].style.left = '81%';    //#10
            circles[8].style.top = '56.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '66.5%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "451" || formationValue === '4231') {
            circles[1].style.top = '22.5%'; circles[1].style.left = '19%';    //#2
            circles[2].style.top = '17.5%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '17.5%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '22.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '32.5%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '32.5%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '52.5%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '54.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '54.5%'; circles[10].style.left = '81%';  //#11
        }
        else if (formationValue === "532" || formationValue === "352") {
            circles[1].style.top = '15.5%'; circles[1].style.left = '30%';    //#2
            circles[2].style.top = '15.5%'; circles[2].style.left = '50%';    //#3
            circles[3].style.top = '15.5%'; circles[3].style.left = '70%';    //#4
            circles[4].style.top = '35.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '29.5%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '29.5%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '52.5%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '35.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '66.5%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "343") {
            circles[1].style.top = '15.5%'; circles[1].style.left = '30%';    //#2
            circles[2].style.top = '15.5%'; circles[2].style.left = '50%';    //#3
            circles[3].style.top = '15.5%'; circles[3].style.left = '70%';    //#4
            circles[4].style.top = '30.5%'; circles[4].style.left = '50%';    //#5
            circles[5].style.top = '44.5%'; circles[5].style.left = '32%';    //#6
            circles[6].style.top = '44.5%'; circles[6].style.left = '68%';    //#8
            circles[7].style.top = '52.5%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '60.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '60.5%'; circles[10].style.left = '81%';  //#11
        }
        else if (formationValue === "3421") {
            circles[1].style.top = '15.5%'; circles[1].style.left = '30%';    //#2
            circles[2].style.top = '15.5%'; circles[2].style.left = '50%';    //#3
            circles[3].style.top = '15.5%'; circles[3].style.left = '70%';    //#4
            circles[4].style.top = '35.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '29.5%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '29.5%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '56.5%'; circles[7].style.left = '30%';    //#10
            circles[8].style.top = '35.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '66.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '56.5%'; circles[10].style.left = '70%';  //#11
        }
        else {
            circles[1].style.top = '22.5%'; circles[1].style.left = '19%';    //#2
            circles[2].style.top = '17.5%'; circles[2].style.left = '37%';  //#3
            circles[3].style.top = '17.5%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '22.5%'; circles[4].style.left = '81%';    //#5
            circles[5].style.top = '33.5%'; circles[5].style.left = '50%';    //#6
            circles[6].style.top = '44.5%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '49.5%'; circles[7].style.left = '38%';    //#10
            circles[8].style.top = '60.5%'; circles[8].style.left = '19%';    //#7
            circles[9].style.top = '65.5%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '60.5%'; circles[10].style.left = '81%';  //#11
        }
        circles.forEach((circle) => {
            circle.style.left = parseFloat(circle.style.left) - percentageChangeLeft + '%';
        });
        localStorage.setItem('oppoCirclePositions', getCirclePositions(circles));

    }

}

// Sets the color of the color pickers and the circles
function setCircleColor(colors, teamType) {
    if (teamType == 'main' || teamType == undefined) {
        var mainColor = getHexCode(colors.mainColor);
        var secondColor = getHexCode(colors.secondColor);
        var numberColor = getHexCode(colors.numberColor);

        mainPickr.setColor(mainColor);
        secondPickr.setColor(secondColor);
        numberPickr.setColor(numberColor);
    }
    else if (teamType == 'oppo') {
        var mainColor = getHexCode(colors.mainColor);
        var secondColor = getHexCode(colors.secondColor);
        var numberColor = getHexCode(colors.numberColor);

        mainOppoPickr.setColor(mainColor);
        secondOppoPickr.setColor(secondColor);
        numberOppoPickr.setColor(numberColor);
    }
}

// Changes the order of the input boxes and labels based on the circle Array order and determines labels
function setTextBoxOrders() {
    //Gets order of circles based on first their y and then their x (7 11 9)
    var startingCircleArray = getCurrentCircleOrder();
    var startingColumn = document.querySelector('.starting-column');
    var startingContainers = startingColumn.getElementsByClassName('input-container');
    addInputContainersInOrder(startingContainers, startingCircleArray, 'starting');
    startingCircleArray.forEach((circle, index) => {
        var posX = circle.x;
        var posY = circle.y;
        determineLabel(posX, posY, index);
    });

    if (checkOppositionName.checked == false) {
        var secondColumn = document.querySelector('.second-column');
        var secondContainers = secondColumn.getElementsByClassName('input-container');
        var secondCircleArray = getCurrentCircleOrder();
        addInputContainersInOrder(secondContainers, secondCircleArray, 'second');

        secondCircleArray.forEach((circle, index) => {
            var posX = circle.x;
            var posY = circle.y;
            determineLabel(posX, posY, index);
        });
    }
}

// Subfunction of setTextBoxOrders
function addInputContainersInOrder(containers, circleArray, column) {
    var listOfDivs = [];
    for (var i = 0; i < containers.length; i++) {
        //Gets current order of divs as it stands
        var inputElement = containers[i].querySelector('input[class*="pos"]');
        if (inputElement) {
            listOfDivs.push(containers[i]);
        }
    }
    for (var j = 0; j < listOfDivs.length; j++) {
        listOfDivs[j].parentNode.removeChild(listOfDivs[j]);
    }
    if (column == 'starting') {
        var column = document.querySelector('.starting-column');
    }
    else if (column == 'second') {
        var column = document.querySelector('.second-column');
    }

    //Adds the elements back in the right order
    var i = 0;
    circleArray.forEach(function (orderObj, i) {
        var posClass = orderObj.pos;
        var element = listOfDivs.find(function (el) {
            return el.querySelector('input.' + posClass);
        });

        if (element) {
            column.appendChild(element);
            if (i % 2 == 0) {
                element.style.backgroundColor = "#1B1D2C";
            }
            else {
                element.style.backgroundColor = "#32154E";
            }
        }
    });

}

// Changes the color of the circles when using the color picker (or when loaded from JSON)
mainPickr.on('change', (color) => {
    var hexa = color.toHEXA().toString();
    var mainColorCircles = document.querySelectorAll('.circleColor');
    mainColorCircles.forEach((circle) => {
        circle.style.backgroundColor = hexa;
    });
    localStorage.setItem('mainColor', hexa);
});

secondPickr.on('change', (color) => {
    var hexa = color.toHEXA().toString();
    var mainColorCircles = document.querySelectorAll('.circleColor');
    mainColorCircles.forEach((circle) => {
        circle.style.borderColor = hexa;
    });
    localStorage.setItem('secondColor', hexa);
});

numberPickr.on('change', (color) => {
    var hexa = color.toHEXA().toString();
    var mainColorCircles = document.querySelectorAll('.circleColor');
    mainColorCircles.forEach((circle) => {
        circle.nextElementSibling.style.color = hexa;
    });
    localStorage.setItem('numberColor', hexa);
});

mainOppoPickr.on('change', (color) => {
    var hexa = color.toHEXA().toString();
    var oppoColorCircles = document.querySelectorAll('.oppoCircleColor');
    oppoColorCircles.forEach((circle) => {
        circle.style.backgroundColor = hexa;
    });
    localStorage.setItem('oppoMainColor', hexa);
});

secondOppoPickr.on('change', (color) => {
    var hexa = color.toHEXA().toString();
    var oppoColorCircles = document.querySelectorAll('.oppoCircleColor');
    oppoColorCircles.forEach((circle) => {
        circle.style.borderColor = hexa;
    });
    localStorage.setItem('oppoSecondColor', hexa);
});

numberOppoPickr.on('change', (color) => {
    var hexa = color.toHEXA().toString();
    var oppoColorCircles = document.querySelectorAll('.oppoCircleColor');
    oppoColorCircles.forEach((circle) => {
        circle.nextElementSibling.style.color = hexa;
    });
    localStorage.setItem('oppoNumberColor', hexa);
});

//Changes the color of the color picker in the pitch drawing settings to the one set in the main settings window
drawingPickr.on('change', (color) => {
    var hexa = color.toHEXA().toString();
    pitchDrawingPickr.setColor(hexa);
})

// Determines the order of the circles from bottom to top, from right to left
function getCurrentCircleOrder() {
    var listOfCircles = document.querySelectorAll(".circle");
    var circleArray = [];
    listOfCircles.forEach(circle => {
        var circleObj = {};
        if (circle.style.left.toString().indexOf('%') > -1) {
            var posX = parseInt((parseInt(circle.style.left) / 100) * imageConWidth);
            var posY = parseInt((parseInt(circle.style.top) / 100) * imageConHeight);
        }
        else {
            var posX = parseInt(circle.style.left);
            var posY = parseInt(circle.style.top);
        }

        circleObj.x = posX;
        circleObj.y = posY;
        circleObj.id = circle.id;
        circleObj.pos = circle.classList.item(1);
        circleArray.push(circleObj);
    });
    circleArray.sort((a, b) => {
        //Adds a buffer of 60 (if difference of height is within 60px, it's considered the same y)
        if (Math.abs(a.y - b.y) < ((60 / 900) * imageConHeight)) {
            return a.x > b.x ? -1 : 1
        } else {
            return a.y > b.y ? -1 : 1
        }
    })
    circleArray.sort(customSort);
    function customSort(a, b) {
        if (a.id === 'circle1') return -1;  // 'circle1' comes first
        if (b.id === 'circle1') return 1;   // 'circle1' comes first

        // If neither is 'circle1', maintain the original order
        return a.pos - b.pos;
    }
    return circleArray;
}

// Shows/hides textboxes below circles based on input
function toggleOutputBoxVisibility(box) {
    if (box.innerText.trim() !== "") {
        box.style.display = "block";
    } else if (box.style.display != "none") {
        box.style.display = "none";
    }
}

// Determines the label (RB, MC, AMC, etc) that is shown before the input box
function determineLabel(xPos, yPos, index) {
    const inputBoxes = document.querySelectorAll(".inputBox");
    const secondBoxes = document.querySelectorAll(".secondBox");
    const labels = document.querySelectorAll(".positionLabel");

    if (xPos >= lineXTwo && xPos <= lineXFive && yPos >= lineYSix && yPos <= lineYSeven) {
        labels[index].innerHTML = "GK";
        inputBoxes[index].placeholder = "Starting GK";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "GK";
            secondBoxes[index].placeholder = "Back-up GK";
        }
    } else if (xPos >= lineXFive && xPos <= lineXSix && yPos >= lineYFive && yPos <= lineYSeven) {
        labels[index].innerHTML = "RB";
        inputBoxes[index].placeholder = "Starting RB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RB";
            secondBoxes[index].placeholder = "Back-up RB";
        }
    } else if (xPos >= lineXFive && xPos <= lineXSix && yPos >= lineYFour && yPos <= lineYFive) {
        labels[index].innerHTML = "RWB";
        inputBoxes[index].placeholder = "Starting RWB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RWB";
            secondBoxes[index].placeholder = "Back-up RWB";
        }
    } else if (xPos >= lineXFive && xPos <= lineXSix && yPos >= lineYThree && yPos <= lineYFour) {
        labels[index].innerHTML = "RM";
        inputBoxes[index].placeholder = "Starting RM";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RM";
            secondBoxes[index].placeholder = "Back-up RM";
        }
    } else if (xPos >= lineXFive && xPos <= lineXSix && yPos >= lineYOne && yPos <= lineYThree) {
        labels[index].innerHTML = "RW";
        inputBoxes[index].placeholder = "Starting RW";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RW";
            secondBoxes[index].placeholder = "Back-up RW";
        }
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= lineYFive && yPos <= lineYSeven) {
        labels[index].innerHTML = "LB";
        inputBoxes[index].placeholder = "Starting LB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LB";
            secondBoxes[index].placeholder = "Back-up LB";
        }
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= lineYFour && yPos <= lineYFive) {
        labels[index].innerHTML = "LWB";
        inputBoxes[index].placeholder = "Starting LWB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LWB";
            secondBoxes[index].placeholder = "Back-up LWB";
        }
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= lineYThree && yPos <= lineYFour) {
        labels[index].innerHTML = "LM";
        inputBoxes[index].placeholder = "Starting LM";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LM";
            secondBoxes[index].placeholder = "Back-up LM";
        }
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= lineYOne && yPos <= lineYThree) {
        labels[index].innerHTML = "LW";
        inputBoxes[index].placeholder = "Starting LW";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LW";
            secondBoxes[index].placeholder = "Back-up LW";
        }
    } else if (xPos >= lineXFour && xPos <= lineXFive && yPos >= lineYFive && yPos <= lineYSix) {
        labels[index].innerHTML = "RCB";
        inputBoxes[index].placeholder = "Starting RCB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RCB";
            secondBoxes[index].placeholder = "Back-up RCB";
        }
    } else if (xPos >= lineXThree && xPos <= lineXFour && yPos >= lineYFive && yPos <= lineYSix) {
        labels[index].innerHTML = "CB";
        inputBoxes[index].placeholder = "Starting CB"
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "CB";
            secondBoxes[index].placeholder = "Back-up CB";
        }
    } else if (xPos >= lineXTwo && xPos <= lineXThree && yPos >= lineYFive && yPos <= lineYSix) {
        labels[index].innerHTML = "LCB";
        inputBoxes[index].placeholder = "Starting LCB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LCB";
            secondBoxes[index].placeholder = "Back-up LCB";
        }
    } else if (xPos >= lineXFour && xPos <= lineXFive && yPos >= lineYFour && yPos <= lineYFive) {
        labels[index].innerHTML = "DMCR";
        inputBoxes[index].placeholder = "Starting DMCR";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "DMCR";
            secondBoxes[index].placeholder = "Back-up DMCR";
        }
    } else if (xPos >= lineXThree && xPos <= lineXFour && yPos >= lineYFour && yPos <= lineYFive) {
        labels[index].innerHTML = "DMC";
        inputBoxes[index].placeholder = "Starting DMC";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "DMC";
            secondBoxes[index].placeholder = "Back-up DMC";
        }
    } else if (xPos >= lineXTwo && xPos <= lineXThree && yPos >= lineYFour && yPos <= lineYFive) {
        labels[index].innerHTML = "DMCL";
        inputBoxes[index].placeholder = "Starting DMCL";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "DMCL";
            secondBoxes[index].placeholder = "Back-up DMCL";
        }
    } else if (xPos >= lineXTwo && xPos <= lineXFive && yPos >= lineYThree && yPos <= lineYFour) {
        labels[index].innerHTML = "MC";
        inputBoxes[index].placeholder = "Starting MC";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "MC";
            secondBoxes[index].placeholder = "Back-up MC";
        }
    } else if (xPos >= lineXFour && xPos <= lineXFive && yPos >= lineYTwo && yPos <= lineYThree) {
        labels[index].innerHTML = "AMCR";
        inputBoxes[index].placeholder = "Starting AMCR";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "AMCR";
            secondBoxes[index].placeholder = "Back-up AMCR";
        }
    } else if (xPos >= lineXThree && xPos <= lineXFour && yPos >= lineYTwo && yPos <= lineYThree) {
        labels[index].innerHTML = "AMC";
        inputBoxes[index].placeholder = "Starting AMC";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "AMC";
            secondBoxes[index].placeholder = "Back-up AMC";
        }
    } else if (xPos >= lineXTwo && xPos <= lineXThree && yPos >= lineYTwo && yPos <= lineYThree) {
        labels[index].innerHTML = "AMCL";
        inputBoxes[index].placeholder = "Starting AMCL";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "AMCL";
            secondBoxes[index].placeholder = "Back-up AMCL";
        }
    } else if (xPos >= lineXTwo && xPos <= lineXFive && yPos >= lineYOne && yPos <= lineYTwo) {
        labels[index].innerHTML = "ST";
        inputBoxes[index].placeholder = "Starting ST";
        if (checkOppositionName.checked == false) {
            secondBoxes[index].placeholder = "Back-up ST";
            labels[index + 11].innerHTML = "ST";
        }
    } else {
        labels[index].innerHTML = "UNK";
        inputBoxes[index].placeholder = "Starting UNK";
        if (checkOppositionName.checked == false) {
            secondBoxes[index].placeholder = "Back-up UNK";
            labels[index + 11].innerHTML = "UNK";
        }
    }
}

// Converts RGB or plain names ('red', 'darkgreen') to hexcode (#00ff00)
function getHexCode(color) {
    if (color.startsWith('#')) {
        return color;
    }

    var tempElement = document.createElement('div');
    tempElement.style.color = color;
    document.body.appendChild(tempElement);
    var computedColor = window.getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    var rgbValues = computedColor.match(/\d+/g);
    var hexValues = rgbValues.map(function (value) {
        var hex = parseInt(value).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });
    var hexColor = '#' + hexValues.join('');
    return hexColor;
}

// Calculates what formation is currently shown based on # of defenders, midfielders and attackers
function determineFormation(teamType) {
    const defenseArr = ['RB', 'RCB', 'CB', 'LCB', 'LB', 'RWB', 'LWB'];
    const midfieldArr = ['DMCR', 'DMC', 'DMCL', 'RM', 'LM', 'MC', 'AMCR', 'AMC', 'AMCL'];
    const attackArr = ['RW', 'LW', 'ST'];
    var containersToCheck;
    let defenseNr = 0;
    let midfieldNr = 0;
    let attackNr = 0;

    if (teamType != 'oppo') {
        containersToCheck = document.querySelectorAll('.column.starting-column .input-container');
    }
    else {
        containersToCheck = document.querySelectorAll('.column.second-column .input-container');
    }
    const lineupArray = [];
    containersToCheck.forEach((container) => {
        let label = container.querySelector('.positionLabel').textContent;
        label = label.replaceAll(":", "");
        lineupArray.push(label);
        if (defenseArr.includes(label)) {
            defenseNr++;
        }
        else if (midfieldArr.includes(label)) {
            midfieldNr++;
        }
        else if (attackArr.includes(label)) {
            attackNr++;
        }
    });
    let formation = "" + defenseNr + "-" + midfieldNr + "-" + attackNr;
    if (formation == '4-3-3') {
        if (lineupArray.includes('DMCR') && lineupArray.includes('DMCL') && lineupArray.includes('AMC')) {
            formation = '4231 / 451';
        }
    }
    if (formation == '4-4-2') {
        if (lineupArray.includes('DMC') && lineupArray.includes('AMC')) {
            formation = '442diamond';
        }
        else if (lineupArray.includes('LM') && lineupArray.includes('RM')) {
            formation = '442flat';
        }
    }

    var formationLabel = document.querySelector('.formation-label');
    formation = formatFormationString(formation);
    formationLabel.textContent = 'Formation: ' + formation;

    return formation;
}

// Changes the formation string from 433 to 4-3-3 or 442diamond to 4-4-2 diamond
function formatFormationString(value) {
    const valueString = String(value);
    const resultArray = [];

    for (let i = 0; i < valueString.length; i++) {
        const currentChar = valueString[i];
        const nextChar = valueString[i + 1];
        var tenOrEleven = ((currentChar + nextChar) == '10' || (currentChar + nextChar) == '11');
        resultArray.push(currentChar);
        if (/[0-9]/.test(currentChar) && /[a-zA-Z]/.test(nextChar) && nextChar != undefined && !tenOrEleven) {
            resultArray.push(' ');
        } else if (/[0-9]/.test(currentChar) && /[0-9]/.test(nextChar) && nextChar != undefined && !tenOrEleven) {
            resultArray.push('-');
        }
    }
    const formattedValue = resultArray.join('');
    return formattedValue;
}

function changeNumberOnTextboxOrCircle(element, newInput) {
    newInput = newInput.toUpperCase();
    var originalInput = newInput;
    var localStorageName = '';
    //Change input box numbering
    if (element.classList.toString().indexOf('circle') > -1 || element.classList.toString().indexOf('oppoCircle') > -1) {
        var circleClass = element.classList[1];
        var inputType = '';

        if (element.id.indexOf('oppo') > -1) {
            inputType = '.secondBox';
            circleClass = circleClass.replace('oppo', 'pos');
            localStorageName = circleClass.replace('pos', 'oppoNumber');
        }
        else {
            inputType = '.inputBox';
            localStorageName = circleClass.replace('pos', 'startingNumber');
        }
        var query = 'input.' + circleClass + inputType;
        const divElement = document.querySelector(query);
        divElement.nextElementSibling.innerText = newInput;

    }

    //Change circle numbering
    else {
        var elementId = element.getAttribute('for');
        var circleElementId;
        //starting8 or oppo8
        if (elementId.indexOf('oppo') > -1) {
            //oppoCircle8
            circleElementId = elementId.replace('oppo', 'oppoCircle');
            localStorageName = elementId.replace('oppo', 'oppoNumber');
        }
        else {
            //circle8            
            circleElementId = elementId.replace('starting', 'circle');
            localStorageName = elementId.replace('starting', 'startingNumber');
        }
        var circleElement = document.getElementById(circleElementId);
        var spanElement = circleElement.querySelector('span');
        spanElement.innerText = newInput;
        getFontSize(newInput.length, spanElement);
    }
    localStorage.setItem(localStorageName, originalInput);
}

function changeNameInTextbox(circle, newInput, outputBox) {
    var circleClass = circle.classList[1];
    var inputType = '';
    if (outputBox.id.indexOf('oppo') > -1 || outputBox.id.indexOf('second') > -1) {
        inputType = '.secondBox';
        circleClass = circleClass.replace('oppo', 'pos');
    }
    else {
        inputType = '.inputBox';
    }
    var query = inputType + "." + circleClass;
    const divElement = document.querySelector(query);

    divElement.value = newInput;

}

function getFontSize(inputLength, number) {
    number.classList.remove('circle-number-font-large');
    number.classList.remove('circle-number-font-medium');
    number.classList.remove('circle-number-font-small');
    number.classList.remove('circle-number-font-large-oppo');
    number.classList.remove('circle-number-font-medium-oppo');
    number.classList.remove('circle-number-font-small-oppo');
    number.style.fontSize = '';
    //Length = 4
    if (inputLength == 4) {
        checkOpposition.checked ? number.classList.add('circle-number-font-small-oppo') : number.classList.add('circle-number-font-small');
    }
    //Length = 3
    else if (inputLength == 3) {
        checkOpposition.checked ? number.classList.add('circle-number-font-medium-oppo') : number.classList.add('circle-number-font-medium');
    }
    //1 or 2
    else {
        checkOpposition.checked ? number.classList.add('circle-number-font-large-oppo') : number.classList.add('circle-number-font-large');
    }
}

// Adds the names of the players added in the left columns to the circles on the right
// Used when loading (predetermined) JSON 
function setLineUp(startKeyArray, secondKeyArray, secondType) {
    const outputContainer = document.querySelectorAll(".output-container");
    const oppoOutputContainer = document.querySelectorAll(".oppo-output-container");
    if (startKeyArray.length > 0) {
        if (secondType == 'opposition') {
            checkOpposition.checked = true;
            checkOppositionName.checked = true;
        }
        else {
            checkOpposition.checked = false;
            checkOppositionName.checked = false;
        }

        startingArray.forEach(function (starter, index) {

            var inputContainers = document.querySelectorAll('.column.starting-column .input-container');
            inputContainers.forEach(function (inputContainer) {
                var labelElement = inputContainer.querySelector('label.numberLabel');
                if (labelElement.htmlFor.replace('starting', '#') == startKeyArray[index]) {
                    var inputElement = inputContainer.querySelector('input');
                    inputElement.value = starter.name;
                    localStorage.setItem(inputElement.id, starter.name);
                    outputContainer.forEach(function (outputStarter) {
                        if (outputStarter.previousElementSibling.id == startKeyArray[index].replace("#", "")) {
                            var outputElement = outputStarter.querySelector('.outputStarting');
                            outputElement.innerText = starter.name;
                            outputStarter.previousElementSibling.innerText = starter.number;
                            toggleOutputBoxVisibility(outputElement);
                            changeNumberOnTextboxOrCircle(outputElement.parentNode.parentNode, starter.number);

                            //localStorage item is called startingNumber#
                            localStorage.setItem(inputElement.id.replace('starting', 'startingNumber'), starter.number);
                        }
                    });
                }
            });
        });
        secondArray.forEach(function (second, index) {
            var inputContainers = document.querySelectorAll('.column.second-column .input-container');
            inputContainers.forEach(function (inputContainer) {
                var inputElement = inputContainer.querySelector('input');
                if (inputElement.id.replace("second", "") == secondKeyArray[index].replace("#", "")) {
                    //Second type is opposition
                    if (secondType == 'opposition') {
                        inputElement.value = second.name;
                        var localStorageName = 'oppo' + inputElement.id;
                        localStorage.setItem(localStorageName, second.name);
                        oppoOutputContainer.forEach(function (outputOppo) {
                            if (outputOppo.parentElement.id.replace('oppoCircle', '') == secondKeyArray[index].replace("#", "")) {
                                var outputElement = outputOppo.querySelector('.outputOpponent');
                                outputElement.innerText = second.name;
                                outputOppo.previousElementSibling.innerText = second.number;
                                toggleOutputBoxVisibility(outputElement);
                                changeNumberOnTextboxOrCircle(outputElement.parentNode.parentNode, second.number);

                                //localStorage item is called oppoNumber#
                                localStorage.setItem(inputElement.id.replace('second', 'oppoNumber'), second.number);
                            }
                        });
                        secondContainerInputs = [];
                    }
                    //Second type is back-up
                    else {
                        inputElement.value = second;
                        var localStorageName = 'backup' + inputElement.id;
                        localStorage.setItem(localStorageName, second);
                        var outputSecond = document.getElementById(inputElement.id.replace('second', 'secondSpan'))
                        setOutputSecond(outputSecond, localStorage.getItem(localStorageName));
                        oppoContainerInputs = [];
                    }
                }
            });

        });

        oppoCheckBox("oppo-checkbox");
        oppoNameCheckBox("oppo-name-checkbox");
    }
    else {
        clearOutBoxes('starting');
        clearOutBoxes('second');
        clearOutBoxes('oppo');
    }
}

window.setCircleAndTextSize = setCircleAndTextSize;
function setCircleAndTextSize() {
    var stepDifference = ((parseInt(circleSlider.max) + parseInt(circleSlider.min)) / 2) - circleSlider.value;
    var changePercentage = (1 + Math.abs(stepDifference * 0.08)).toFixed(2);
    var percentageChangeLeft;
    var percentageChangeTop;

    allCircles.forEach((circle) => {
        var circleWidthBefore = circle.getBoundingClientRect().width || standardCircleSize;
        //If stepDifference is negative (meaning size increases), we increase circle size by multiplying. Otherwise, we decrease by dividing
        circle.style.width = (stepDifference < 0) ? standardCircleSize * changePercentage + 'px' : standardCircleSize / changePercentage + 'px';
        circle.style.height = (stepDifference < 0) ? standardCircleSize * changePercentage + 'px' : standardCircleSize / changePercentage + 'px';

        //Only have to retrieve this info once, since this is applicable for each circle
        if (circle.id == 'circle1') {
            var widthDifference = (circleWidthBefore - parseFloat(circle.style.width)) / 2;
            percentageChangeLeft = (widthDifference / imageConWidth) * 100;
            percentageChangeTop = (widthDifference / imageConHeight) * 100;
        }
        circle.style.left = parseFloat(circle.style.left) + percentageChangeLeft + '%';
        circle.style.top = parseFloat(circle.style.top) + percentageChangeTop + '%';
        var border = circle.querySelector('.circleColor, .circleColorGK, .oppoCircleColor, .oppoCircleColorGK');

        border.style.borderWidth = (stepDifference < 0) ? standardBorderSize * changePercentage + 'px' : standardBorderSize / changePercentage + 'px';

        var number = circle.querySelector('.circle-number');
        var standardNumberSize;
        for (var i = 2; i < 8; i++) {
            if (standardSizes[i].id == number.classList[1]) {
                standardNumberSize = standardSizes[i].size;
            }
        }
        number.style.fontSize = (stepDifference < 0) ? standardNumberSize * changePercentage + 'px' : standardNumberSize / changePercentage + 'px';

        var textBoxOne = circle.querySelector('.output-container, .oppo-output-container').querySelector('span');
        var textBoxOneFontSize = (textBoxOne.classList[1] == 'startingStyleOne') ? standardSizes[8].fontSize : standardSizes[9].fontSize;
        var textBoxOneBottom = (textBoxOne.classList[1] == 'startingStyleOne') ? standardSizes[8].bottomStarting : standardSizes[9].bottomStarting;

        var textPercentage = (1 + Math.abs(stepDifference * 0.04)).toFixed(2);
        textBoxOne.style.fontSize = (stepDifference < 0) ? textBoxOneFontSize * textPercentage + 'px' : textBoxOneFontSize / textPercentage + 'px';
        textBoxOne.style.bottom = (stepDifference < 0) ? textBoxOneBottom * textPercentage + 'px' : textBoxOneBottom / textPercentage + 'px';
        if (textBoxOne.classList[0] == 'outputStarting') {
            var textBoxTwo = textBoxOne.nextElementSibling;
            var textBoxTwoFontSize = (textBoxTwo.classList[1] == 'secondStyleOne') ? standardSizes[8].fontSize : standardSizes[9].fontSize;
            var textBoxTwoBottom = (textBoxTwo.classList[1] == 'secondStyleOne') ? standardSizes[8].bottomSecond : standardSizes[9].bottomSecond;

            textBoxTwo.style.fontSize = (stepDifference < 0) ? textBoxTwoFontSize * textPercentage + 'px' : textBoxTwoFontSize / textPercentage + 'px';
            textBoxTwo.style.bottom = (stepDifference < 0) ? textBoxTwoBottom * textPercentage + 'px' : textBoxTwoBottom / textPercentage + 'px';
        }


    });
}

function getCirclePositions(objects) {

    if (objects.id == 'ball') {
        var ball = objects;
        var ballPosition = '#';
        var ballStyleTop = ball.style.top;
        var ballStyleLeft = ball.style.left;
        if (ball.style.top.indexOf('px') > -1) {
            ballStyleTop = ball.style.top.replace('px', '') / document.querySelector(".image-container").offsetHeight;
            ballStyleTop = (ballStyleTop * 100).toFixed(2) + '%';
        }
        if (ball.style.left.indexOf('px') > -1) {
            ballStyleLeft = ball.style.left.replace('px', '') / document.querySelector(".image-container").offsetWidth;
            ballStyleLeft = (ballStyleLeft * 100).toFixed(2) + '%';
        }
        ballPosition += ball.id + "T" + ballStyleTop + "L" + ballStyleLeft + "#";
        return ballPosition;
    }
    else {
        var circlePositions = "#";
        objects.forEach((circle) => {
            var circleStyleTop = circle.style.top;
            var circleStyleLeft = circle.style.left;
            if (circle.style.top.indexOf('px') > -1) {
                circleStyleTop = circle.style.top.replace('px', '') / document.querySelector(".image-container").offsetHeight;
                circleStyleTop = (circleStyleTop * 100).toFixed(2) + '%';
            }
            if (circle.style.left.indexOf('px') > -1) {
                circleStyleLeft = circle.style.left.replace('px', '') / document.querySelector(".image-container").offsetWidth;
                circleStyleLeft = (circleStyleLeft * 100).toFixed(2) + '%';
            }
            circlePositions += circle.id + "T" + circleStyleTop + "L" + circleStyleLeft + "#";

        });

        return circlePositions;
    }
}



function blockAllInputs(onOffButton) {
    if (onOffButton) {
        var leftContainer = document.getElementById('leftContainer');
        var inputs = leftContainer.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            input.disabled = true;
        });
        localStorage.setItem('allowClickAndDrag', false);
    }
    else {
        var leftContainer = document.getElementById('leftContainer');
        var inputs = leftContainer.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            input.disabled = false;
        });

        localStorage.setItem('allowClickAndDrag', true);
    }
}
