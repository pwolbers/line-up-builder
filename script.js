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
        circles[0].style.top = '86%'; circles[0].style.left = '50%';  //#1
        //4 at the back
        if (formationValue.charAt(0) === '4') {
            circles[1].style.top = '69%'; circles[1].style.left = '79%';    //#2
            circles[2].style.top = '74%'; circles[2].style.left = '65%';    //#3
            circles[3].style.top = '74%'; circles[3].style.left = '35%';    //#4
            circles[4].style.top = '69%'; circles[4].style.left = '21%';    //#5
        }
        //3 at the back
        else if (formationValue.charAt(0) === '3' || formationValue.charAt(0) === '5') {
            circles[1].style.top = '76%'; circles[1].style.left = '70%';    //#2
            circles[2].style.top = '76%'; circles[2].style.left = '50%';  //#3
            circles[3].style.top = '76%'; circles[3].style.left = '30%';    //#4
            if (formationValue.charAt(0) === '5' || formationValue == '352' || formationValue == '3421') {
                circles[4].style.top = '51%'; circles[4].style.left = '21%';    //#5
                circles[8].style.top = '51%'; circles[8].style.left = '79%';    //#7
            }
        }
        //3 up front
        if (formationValue.charAt(2) === '3' && formationValue != '4231') {
            circles[8].style.top = '31%'; circles[8].style.left = '79%';    //#7
            circles[9].style.top = '25%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '31%'; circles[10].style.left = '21%';  //#11
        }
        //2 up front (with 0 or 2 wingers)
        else if (formationValue.charAt(2) === '2' || formationValue.charAt(2) === '4') {
            circles[9].style.top = '25%'; circles[9].style.left = '65%';    //#9
            circles[10].style.top = '25%'; circles[10].style.left = '35%';  //#11
        }
        if (formationValue === '433') {
            circles[5].style.top = '61%'; circles[5].style.left = '50%';  //#6
            circles[6].style.top = '44%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '44%'; circles[7].style.left = '62%';    //#10  
        } else if (formationValue === '442diamond') {
            circles[5].style.top = '61%'; circles[5].style.left = '50%';  //#6
            circles[6].style.top = '50%'; circles[6].style.left = '32%';    //#8
            circles[7].style.top = '39%'; circles[7].style.left = '50%';  //#10
            circles[8].style.top = '50%'; circles[8].style.left = '68%';    //#7
        } else if (formationValue === '442flat' || formationValue === '424') {
            circles[5].style.top = '52%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '52%'; circles[6].style.left = '38%';    //#8
            if (formationValue === '442flat') {
                circles[7].style.top = '44%'; circles[7].style.left = '21%';    //#10
                circles[8].style.top = '44%'; circles[8].style.left = '79%';    //#7
            }
            else {
                circles[7].style.top = '36%'; circles[7].style.left = '21%';    //#10
                circles[8].style.top = '36%'; circles[8].style.left = '79%';    //#7
            }
        } else if (formationValue == '343') {
            circles[4].style.top = '61%'; circles[4].style.left = '50%';    //#5
            circles[5].style.top = '50%'; circles[5].style.left = '68%';    //#6
            circles[6].style.top = '50%'; circles[6].style.left = '32%';    //#8
            circles[7].style.top = '39%'; circles[7].style.left = '50%';  //#10
        } else if (formationValue === "451" || formationValue === "4231") {
            circles[5].style.top = '59%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '59%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '39%'; circles[7].style.left = '50%';  //#10
            circles[8].style.top = '37%'; circles[8].style.left = '79%';    //#7
            circles[9].style.top = '25%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '37%'; circles[10].style.left = '21%';  //#11
        } else if (formationValue === "532" || formationValue === "352") {
            circles[5].style.top = '57%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '57%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '37%'; circles[7].style.left = '50%';  //#10
        } else if (formationValue === "3421") {
            circles[5].style.top = '57%'; circles[5].style.left = '62%';    //#6
            circles[6].style.top = '57%'; circles[6].style.left = '38%';    //#8
            circles[7].style.top = '37%'; circles[7].style.left = '70%';  //#10
            circles[9].style.top = '25%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '37%'; circles[10].style.left = '30%';  //#11
        }
    }
    else if (circleType == 'oppo') {
        const circles = document.querySelectorAll(".oppoCircle");
        circles[0].style.top = '8%'; circles[0].style.left = '50%';  //#1
        if (formationValue === '433') {
            circles[1].style.top = '25%'; circles[1].style.left = '21%';    //#2
            circles[2].style.top = '20%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '20%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '25%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '33%'; circles[5].style.left = '50%';    //#6
            circles[6].style.top = '50%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '50%'; circles[7].style.left = '38%';    //#10
            circles[8].style.top = '63%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '63%'; circles[10].style.left = '79%';  //#11
        }
        else if (formationValue === "442diamond") {
            circles[1].style.top = '25%'; circles[1].style.left = '21%';    //#2
            circles[2].style.top = '20%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '20%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '25%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '33%'; circles[5].style.left = '50%';    //#6
            circles[6].style.top = '44%'; circles[6].style.left = '68%';    //#8
            circles[7].style.top = '55%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '44%'; circles[8].style.left = '32%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '69%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "442flat") {
            circles[1].style.top = '25%'; circles[1].style.left = '21%';    //#2
            circles[2].style.top = '20%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '20%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '25%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '44%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '44%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '52%'; circles[7].style.left = '79%';    //#10
            circles[8].style.top = '52%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '69%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "424") {
            circles[1].style.top = '25%'; circles[1].style.left = '21%';    //#2
            circles[2].style.top = '20%'; circles[2].style.left = '34.5%';  //#3
            circles[3].style.top = '20%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '25%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '44%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '44%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '59%'; circles[7].style.left = '79%';    //#10
            circles[8].style.top = '59%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '69%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "451" || formationValue === '4231') {
            circles[1].style.top = '25%'; circles[1].style.left = '21%';    //#2
            circles[2].style.top = '20%'; circles[2].style.left = '35%';    //#3
            circles[3].style.top = '20%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '25%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '35%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '35%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '55%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '57%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '57%'; circles[10].style.left = '79%';  //#11
        }
        else if (formationValue === "532" || formationValue === "352") {
            circles[1].style.top = '18%'; circles[1].style.left = '30%';    //#2
            circles[2].style.top = '18%'; circles[2].style.left = '50%';    //#3
            circles[3].style.top = '18%'; circles[3].style.left = '70%';    //#4
            circles[4].style.top = '38%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '32%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '32%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '52%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '38%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '35%';    //#9
            circles[10].style.top = '69%'; circles[10].style.left = '65%';  //#11
        }
        else if (formationValue === "343") {
            circles[1].style.top = '18%'; circles[1].style.left = '30%';    //#2
            circles[2].style.top = '18%'; circles[2].style.left = '50%';    //#3
            circles[3].style.top = '18%'; circles[3].style.left = '70%';    //#4
            circles[4].style.top = '33%'; circles[4].style.left = '50%';    //#5
            circles[5].style.top = '44%'; circles[5].style.left = '32%';    //#6
            circles[6].style.top = '44%'; circles[6].style.left = '68%';    //#8
            circles[7].style.top = '55%'; circles[7].style.left = '50%';    //#10
            circles[8].style.top = '63%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '63%'; circles[10].style.left = '79%';  //#11
        }
        else if (formationValue === "3421") {
            circles[1].style.top = '18%'; circles[1].style.left = '30%';    //#2
            circles[2].style.top = '18%'; circles[2].style.left = '50%';    //#3
            circles[3].style.top = '18%'; circles[3].style.left = '70%';    //#4
            circles[4].style.top = '38%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '32%'; circles[5].style.left = '38%';    //#6
            circles[6].style.top = '32%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '59%'; circles[7].style.left = '30%';    //#10
            circles[8].style.top = '38%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '69%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '59%'; circles[10].style.left = '70%';  //#11
        }
        else {
            circles[1].style.top = '25%'; circles[1].style.left = '21%';    //#2
            circles[2].style.top = '20%'; circles[2].style.left = '34.5%';  //#3
            circles[3].style.top = '20%'; circles[3].style.left = '65%';    //#4
            circles[4].style.top = '25%'; circles[4].style.left = '79%';    //#5
            circles[5].style.top = '36%'; circles[5].style.left = '50%';    //#6
            circles[6].style.top = '47%'; circles[6].style.left = '62%';    //#8
            circles[7].style.top = '52%'; circles[7].style.left = '38%';    //#10
            circles[8].style.top = '63%'; circles[8].style.left = '21%';    //#7
            circles[9].style.top = '68%'; circles[9].style.left = '50%';    //#9
            circles[10].style.top = '63%'; circles[10].style.left = '79%';  //#11
        }
    }
}

// Sets the color of the color pickers and the circles
function setCircleColor(colors, teamType) {
    if (teamType == 'main' || teamType == undefined) {
        var mainColor = getHexCode(colors.mainColor);
        var secondColor = getHexCode(colors.secondColor);
        var numberColor = getHexCode(colors.numberColor);

        document.getElementById("colorPickerMain").value = mainColor;
        document.getElementById("colorPickerSecond").value = secondColor;
        document.getElementById("colorPickerNumber").value = numberColor;
    }
    else if (teamType == 'oppo') {
        var mainColor = getHexCode(colors.mainColor);
        var secondColor = getHexCode(colors.secondColor);
        var numberColor = getHexCode(colors.numberColor);

        document.getElementById("oppoColorMain").value = mainColor;
        document.getElementById("oppoColorSecond").value = secondColor;
        document.getElementById("oppoColorNumber").value = numberColor;
    }
    updateCircleColors(teamType);
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
document.getElementById("colorPickerMain").addEventListener("change", function () { updateCircleColors('main'); }, false);
document.getElementById("colorPickerSecond").addEventListener("change", function () { updateCircleColors('main'); }, false);
document.getElementById("colorPickerNumber").addEventListener("change", function () { updateCircleColors('main'); }, false);
document.getElementById("oppoColorMain").addEventListener("change", function () { updateCircleColors('oppo'); }, false);
document.getElementById("oppoColorSecond").addEventListener("change", function () { updateCircleColors('oppo'); }, false);
document.getElementById("oppoColorNumber").addEventListener("change", function () { updateCircleColors('oppo'); }, false);

function updateCircleColors(teamColor) {
    var colorPickerMain;
    var colorPickerSecond;
    var colorPickerNumber;
    var circleClassName;
    var circleColorClass;
    var circleColorNumber = '.circle-number';

    if (teamColor == 'main') {
        circleClassName = ".circle";
        circleColorClass = '.circleColor';
        colorPickerMain = document.getElementById("colorPickerMain").value;
        colorPickerSecond = document.getElementById("colorPickerSecond").value;
        colorPickerNumber = document.getElementById("colorPickerNumber").value;
    }
    else if (teamColor == 'oppo') {
        circleClassName = ".oppoCircle";
        circleColorClass = '.oppoCircleColor';
        colorPickerMain = document.getElementById("oppoColorMain").value;
        colorPickerSecond = document.getElementById("oppoColorSecond").value;
        colorPickerNumber = document.getElementById("oppoColorNumber").value;
    }
    const circleClass = document.querySelectorAll(circleClassName);
    for (var i = 1; i < circleClass.length; i++) {
        circleClass[i].querySelector(circleColorClass).style.backgroundColor = colorPickerMain;
        circleClass[i].querySelector(circleColorClass).style.borderColor = colorPickerSecond;
        circleClass[i].querySelector(circleColorNumber).style.color = colorPickerNumber;
    }
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }
}

// Determines the order of the circles from bottom to top, from right to left
function getCurrentCircleOrder() {
    var listOfCircles = document.querySelectorAll(".circle");
    var circleArray = [];
    listOfCircles.forEach(circle => {
        var circleObj = {};
        if (circle.style.left.toString().indexOf('%') > -1) {
            var posX = parseInt((parseInt(circle.style.left) / 100) * 730);
            var posY = parseInt((parseInt(circle.style.top) / 100) * 900);
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
        if (Math.abs(a.y - b.y) < 60) {
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
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }
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
    const labels = document.querySelectorAll(".label");

    if (xPos >= 210 && xPos <= 520 && yPos >= 710 && yPos <= 830) {
        labels[index].innerHTML = "GK";
        inputBoxes[index].placeholder = "Starting GK";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "GK";
            secondBoxes[index].placeholder = "Back-up GK";
        }
    } else if (xPos >= 520 && xPos <= 620 && yPos >= 565 && yPos <= 830) {
        labels[index].innerHTML = "RB";
        inputBoxes[index].placeholder = "Starting RB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RB";
            secondBoxes[index].placeholder = "Back-up RB";
        }
    } else if (xPos >= 520 && xPos <= 620 && yPos >= 450 && yPos <= 565) {
        labels[index].innerHTML = "RWB";
        inputBoxes[index].placeholder = "Starting RWB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RWB";
            secondBoxes[index].placeholder = "Back-up RWB";
        }
    } else if (xPos >= 520 && xPos <= 620 && yPos >= 340 && yPos <= 450) {
        labels[index].innerHTML = "RM";
        inputBoxes[index].placeholder = "Starting RM";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RM";
            secondBoxes[index].placeholder = "Back-up RM";
        }
    } else if (xPos >= 520 && xPos <= 620 && yPos >= 65 && yPos <= 340) {
        labels[index].innerHTML = "RW";
        inputBoxes[index].placeholder = "Starting RW";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RW";
            secondBoxes[index].placeholder = "Back-up RW";
        }
    } else if (xPos >= 110 && xPos <= 210 && yPos >= 565 && yPos <= 830) {
        labels[index].innerHTML = "LB";
        inputBoxes[index].placeholder = "Starting LB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LB";
            secondBoxes[index].placeholder = "Back-up LB";
        }
    } else if (xPos >= 110 && xPos <= 210 && yPos >= 450 && yPos <= 565) {
        labels[index].innerHTML = "LWB";
        inputBoxes[index].placeholder = "Starting LWB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LWB";
            secondBoxes[index].placeholder = "Back-up LWB";
        }
    } else if (xPos >= 110 && xPos <= 210 && yPos >= 340 && yPos <= 450) {
        labels[index].innerHTML = "LM";
        inputBoxes[index].placeholder = "Starting LM";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LM";
            secondBoxes[index].placeholder = "Back-up LM";
        }
    } else if (xPos >= 110 && xPos <= 210 && yPos >= 65 && yPos <= 340) {
        labels[index].innerHTML = "LW";
        inputBoxes[index].placeholder = "Starting LW";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LW";
            secondBoxes[index].placeholder = "Back-up LW";
        }
    } else if (xPos >= 380 && xPos <= 520 && yPos >= 580 && yPos <= 710) {
        labels[index].innerHTML = "RCB";
        inputBoxes[index].placeholder = "Starting RCB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "RCB";
            secondBoxes[index].placeholder = "Back-up RCB";
        }
    } else if (xPos >= 300 && xPos <= 380 && yPos >= 580 && yPos <= 710) {
        labels[index].innerHTML = "CB";
        inputBoxes[index].placeholder = "Starting CB"
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "CB";
            secondBoxes[index].placeholder = "Back-up CB";
        }
    } else if (xPos >= 200 && xPos <= 300 && yPos >= 580 && yPos <= 710) {
        labels[index].innerHTML = "LCB";
        inputBoxes[index].placeholder = "Starting LCB";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "LCB";
            secondBoxes[index].placeholder = "Back-up LCB";
        }
    } else if (xPos >= 400 && xPos <= 520 && yPos >= 480 && yPos <= 580) {
        labels[index].innerHTML = "DMCR";
        inputBoxes[index].placeholder = "Starting DMCR";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "DMCR";
            secondBoxes[index].placeholder = "Back-up DMCR";
        }
    } else if (xPos >= 320 && xPos <= 400 && yPos >= 480 && yPos <= 580) {
        labels[index].innerHTML = "DMC";
        inputBoxes[index].placeholder = "Starting DMC";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "DMC";
            secondBoxes[index].placeholder = "Back-up DMC";
        }
    } else if (xPos >= 200 && xPos <= 320 && yPos >= 480 && yPos <= 580) {
        labels[index].innerHTML = "DMCL";
        inputBoxes[index].placeholder = "Starting DMCL";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "DMCL";
            secondBoxes[index].placeholder = "Back-up DMCL";
        }
    } else if (xPos >= 200 && xPos <= 520 && yPos >= 380 && yPos <= 480) {
        labels[index].innerHTML = "MC";
        inputBoxes[index].placeholder = "Starting MC";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "MC";
            secondBoxes[index].placeholder = "Back-up MC";
        }
    } else if (xPos >= 460 && xPos <= 520 && yPos >= 240 && yPos <= 380) {
        labels[index].innerHTML = "AMCR";
        inputBoxes[index].placeholder = "Starting AMCR";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "AMCR";
            secondBoxes[index].placeholder = "Back-up AMCR";
        }
    } else if (xPos >= 260 && xPos <= 460 && yPos >= 240 && yPos <= 380) {
        labels[index].innerHTML = "AMC";
        inputBoxes[index].placeholder = "Starting AMC";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "AMC";
            secondBoxes[index].placeholder = "Back-up AMC";
        }
    } else if (xPos >= 200 && xPos <= 260 && yPos >= 240 && yPos <= 380) {
        labels[index].innerHTML = "AMCL";
        inputBoxes[index].placeholder = "Starting AMCL";
        if (checkOppositionName.checked == false) {
            labels[index + 11].innerHTML = "AMCL";
            secondBoxes[index].placeholder = "Back-up AMCL";
        }
    } else if (xPos >= 200 && xPos <= 520 && yPos >= 65 && yPos <= 240) {
        labels[index].innerHTML = "ST";
        inputBoxes[index].placeholder = "Starting ST";
        if (checkOppositionName.checked == false) {
            secondBoxes[index].placeholder = "Back-up ST";
            labels[index + 11].innerHTML = "ST";
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
        let label = container.querySelector('.label').textContent;
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

function changeNumberOnTextbox(circle, newInput) {
    const regex = /[^0-9]/;
    //anything else than digits
    if (!regex.test(newInput)) {
        newInput = '#' + newInput;
    }

    var circleClass = circle.classList[1];
    var query = 'input.' + circleClass;

    const divElements = document.querySelectorAll(query);

    divElements.forEach((div) => {
        if (div.id.indexOf('starting') > -1) {
            div.nextElementSibling.innerText = newInput;
            if (newInput.length > 4) {
                div.nextElementSibling.style.fontSize = '10px';
                div.nextElementSibling.style.marginRight = '8px';
            }
            else if (newInput.length == 4) {
                div.nextElementSibling.style.fontSize = '11px';
                div.nextElementSibling.style.marginRight = '6px';
            }
            else {
                div.nextElementSibling.style.fontSize = '12px';
                div.nextElementSibling.style.marginRight = '';
            }
        }
    });
}

function getFontSize(inputLength, number) {
    number.classList.remove('circle-number-font-large');
    number.classList.remove('circle-number-font-medium');
    number.classList.remove('circle-number-font-small');
    number.classList.remove('circle-number-font-large-oppo');
    number.classList.remove('circle-number-font-medium-oppo');
    number.classList.remove('circle-number-font-small-oppo');
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
        oppoCheckBox("oppo-checkbox");
        oppoNameCheckBox("oppo-name-checkbox");

        startingArray.forEach(function (starter, index) {
            var inputContainers = document.querySelectorAll('.column.starting-column .input-container');
            inputContainers.forEach(function (inputContainer) {
                var labelElement = inputContainer.querySelector('label.label-position');
                if (labelElement.htmlFor.replace('starting', '#') == startKeyArray[index]) {
                    var inputElement = inputContainer.querySelector('input');
                    inputElement.value = starter.name;

                    outputContainer.forEach(function (outputStarter) {
                        if (outputStarter.previousElementSibling.id == startKeyArray[index].replace("#", "")) {
                            var outputElement = outputStarter.querySelector('.outputStarting');
                            outputElement.innerText = starter.name;
                            outputStarter.previousElementSibling.innerText = starter.number;
                            toggleOutputBoxVisibility(outputElement);
                            changeNumberOnTextbox(outputElement.parentNode.parentNode, starter.number);
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
                        oppoOutputContainer.forEach(function (outputOppo) {
                            if (outputOppo.parentElement.id.replace('oppoCircle', '') == secondKeyArray[index].replace("#", "")) {
                                var outputElement = outputOppo.querySelector('.outputOpponent');
                                outputElement.innerText = second.name;
                                outputOppo.previousElementSibling.innerText = second.number;
                                toggleOutputBoxVisibility(outputElement);
                            }
                        });
                        secondContainerInputs = [];
                    }
                    //Second type is back-up
                    else {
                        inputElement.value = second;
                        outputContainer.forEach(function (outputSecond) {
                            if (outputSecond.previousElementSibling.id == secondKeyArray[index].replace("#", "")) {
                                var outputElement = outputSecond.querySelector('.outputSecond');
                                outputElement.innerText = second;
                                toggleOutputBoxVisibility(outputElement);
                            }
                        });
                        oppoContainerInputs = [];
                    }
                }
            });

        });
    }
    else {
        clearOutBoxes('starting');
        clearOutBoxes('second');
        clearOutBoxes('oppo');
    }
}