const oppoLineYOne = (25/900) * imageContainer.offsetHeight;
const oppoLineYTwo = (125/900) * imageContainer.offsetHeight;
const oppoLineYThree = (255/900) * imageContainer.offsetHeight;
const oppoLineYFour = (355/900) * imageContainer.offsetHeight;
const oppoLineYFive = (385/900) * imageContainer.offsetHeight;
const oppoLineYSix = (495/900) * imageContainer.offsetHeight;
const oppoLineYSeven = (595/900) * imageContainer.offsetHeight;
const oppoLineYEight = (835/900) * imageContainer.offsetHeight;

function setOppoTextBoxOrder() {
    var secondColumn = document.querySelector('.second-column');
    var secondContainers = secondColumn.getElementsByClassName('input-container');
    var secondCircleArray = getOppoCircleOrder();

    addOppoInputContainersInOrder(secondContainers, secondCircleArray, 'second');

    secondCircleArray.forEach((circle, index) => {
        var posX = circle.x;
        var posY = circle.y;
        determineOppoLabel(posX, posY, index);
    });
}

function addOppoInputContainersInOrder(containers, circleArray, column) {
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

    var column = document.querySelector('.second-column');

    //Adds the elements back in the right order
    var i = 0;

    circleArray.forEach(function (orderObj, i) {
        //OrderObj.pos is obtained from the class of the circle. For opposition circles, it's oppo[x], not pos[x], which is the class from the inputbox
        var posClass = orderObj.pos.replace('oppo', 'pos');

        var element = listOfDivs.find(function (el) {
            return el.querySelector('input.' + posClass);
        });

        if (element) {
            column.appendChild(element);
            if (i % 2 == 0) {
                element.style.backgroundColor = "#1D2C1B";
            }
            else {
                element.style.backgroundColor = "#154E32";
            }
        }
    });
}

function getOppoCircleOrder() {
    var listOfCircles = document.querySelectorAll(".oppoCircle");
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
        //Adds a buffer of 70 (if difference of height is within 70px, it's considered the same y)
        if (Math.abs(a.y - b.y) < 70) {
            return a.x < b.x ? -1 : 1
        } else {
            return a.y < b.y ? -1 : 1
        }
    })
    circleArray.sort(customSort);
    function customSort(a, b) {
        if (a.id === 'oppoCircle1') return -1;  // 'oppoCircle1' comes first
        if (b.id === 'oppoCircle1') return 1;   // 'oppoCircle1' comes first

        // If neither is 'oppoCircle1', maintain the original order
        return a.pos - b.pos;
    }
    return circleArray;
}

function determineOppoLabel(xPos, yPos, index) {
    var oppoLabels = document.querySelectorAll(".label");
    const secondBoxes = document.querySelectorAll(".secondBox");

    if (xPos >= lineXTwo && xPos <= lineXSeven && yPos >= oppoLineYOne && yPos <= oppoLineYTwo) {
        oppoLabels[index + 11].innerHTML = "GK";
        secondBoxes[index].placeholder = "Opposition GK";
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= oppoLineYOne && yPos <= oppoLineYThree) {
        oppoLabels[index + 11].innerHTML = "RB";
        secondBoxes[index].placeholder = "Opposition RB";
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= oppoLineYThree && yPos <= oppoLineYFour) {
        oppoLabels[index + 11].innerHTML = "RWB";
        secondBoxes[index].placeholder = "Opposition RWB";
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= oppoLineYFour && yPos <= oppoLineYSix) {
        oppoLabels[index + 11].innerHTML = "RM";
        secondBoxes[index].placeholder = "Opposition RM";
    } else if (xPos >= lineXOne && xPos <= lineXTwo && yPos >= oppoLineYSix && yPos <= oppoLineYEight) {
        oppoLabels[index + 11].innerHTML = "RW";
        secondBoxes[index].placeholder = "Opposition RW";
    } else if (xPos >= lineXSeven && xPos <= lineXEight && yPos >= oppoLineYOne && yPos <= oppoLineYThree) {
        oppoLabels[index + 11].innerHTML = "LB";
        secondBoxes[index].placeholder = "Opposition LB";
    } else if (xPos >= lineXSeven && xPos <= lineXEight && yPos >= oppoLineYThree && yPos <= oppoLineYFour) {
        oppoLabels[index + 11].innerHTML = "LWB";
        secondBoxes[index].placeholder = "Opposition LWB";
    } else if (xPos >= lineXSeven && xPos <= lineXEight && yPos >= oppoLineYFour && yPos <= oppoLineYSix) {
        oppoLabels[index + 11].innerHTML = "LM";
        secondBoxes[index].placeholder = "Opposition LM";
    } else if (xPos >= lineXSeven && xPos <= lineXEight && yPos >= oppoLineYSix && yPos <= oppoLineYEight) {
        oppoLabels[index + 11].innerHTML = "LW";
        secondBoxes[index].placeholder = "Opposition LW";
    } else if (xPos >= lineXTwo && xPos <= lineXFour && yPos >= oppoLineYTwo && yPos <= oppoLineYThree) {
        oppoLabels[index + 11].innerHTML = "RCB";
        secondBoxes[index].placeholder = "Opposition RCB";
    } else if (xPos >= lineXFour && xPos <= lineXFive && yPos >= oppoLineYTwo && yPos <= oppoLineYThree) {
        oppoLabels[index + 11].innerHTML = "CB";
        secondBoxes[index].placeholder = "Opposition CB";
    } else if (xPos >= lineXFive && xPos <= lineXSeven && yPos >= oppoLineYTwo && yPos <= oppoLineYThree) {
        oppoLabels[index + 11].innerHTML = "LCB";
        secondBoxes[index].placeholder = "Opposition LCB";
    } else if (xPos >= lineXTwo && xPos <= lineXFour && yPos >= oppoLineYThree && yPos <=oppoLineYFour) {
        oppoLabels[index + 11].innerHTML = "DMCR";
        secondBoxes[index].placeholder = "Opposition DMCR";
    } else if (xPos >= lineXFour && xPos <= lineXFive && yPos >= oppoLineYThree && yPos <=oppoLineYFour) {
        oppoLabels[index + 11].innerHTML = "DMC";
        secondBoxes[index].placeholder = "Opposition DMC";
    } else if (xPos >= lineXFive && xPos <= lineXSeven && yPos >= oppoLineYThree && yPos <=oppoLineYFour) {
        oppoLabels[index + 11].innerHTML = "DMCL";
        secondBoxes[index].placeholder = "Opposition DMCL";
    } else if (xPos >= lineXTwo && xPos <= lineXSeven && yPos >=oppoLineYFour && yPos <= oppoLineYSix) {
        oppoLabels[index + 11].innerHTML = "MC";
        secondBoxes[index].placeholder = "Opposition MC";
    } else if (xPos >= lineXTwo && xPos <= lineXThree && yPos >= oppoLineYSix && yPos <= oppoLineYSeven) {
        oppoLabels[index + 11].innerHTML = "AMCR";
        secondBoxes[index].placeholder = "Opposition AMCR";
    } else if (xPos >= lineXThree && xPos <= lineXSix && yPos >= oppoLineYSix && yPos <= oppoLineYSeven) {
        oppoLabels[index + 11].innerHTML = "AMC";
        secondBoxes[index].placeholder = "Opposition AMC";
    } else if (xPos >= lineXSix && xPos <= lineXSeven && yPos >= oppoLineYSix && yPos <= oppoLineYSeven) {
        oppoLabels[index + 11].innerHTML = "AMCL";
        secondBoxes[index].placeholder = "Opposition AMCL";
    } else if (xPos >= lineXTwo && xPos <= lineXSeven && yPos >= oppoLineYSeven && yPos <= oppoLineYEight) {
        secondBoxes[index].placeholder = "Opposition ST";
        oppoLabels[index + 11].innerHTML = "ST";
    } else {
        secondBoxes[index].placeholder = "Opposition UNK";
        oppoLabels[index + 11].innerHTML = "UNK";
    }
}

//Sets the oppo formation based on formation select box
function setOppoFormation(selectedValue) {
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }

    setCirclePositions(selectedValue, 'oppo');
    if (checkOppositionName.checked) {
        setOppoTextBoxOrder();
        oppoCircleHasBeenDragged = true;
    }
}