// Function to toggle background of pitch background and whether or not opponents are visible
// Also checks for the ball
var pitchCheck = document.getElementById("pitch-checkbox");
pitchCheck.addEventListener("change", changeSwitch);

var tacticalCheck = document.getElementById("tactical-checkbox");
tacticalCheck.addEventListener("change", changeSwitch);

var ballCheck = document.getElementById("ball-checkbox");
ballCheck.addEventListener("change", changeSwitch);

var labelCheck = document.getElementById("label-checkbox");
labelCheck.addEventListener("change", changeSwitch);

var oppoCheck = document.getElementById("oppo-checkbox");
oppoCheck.addEventListener("change", changeSwitch);

var oppoNameCheck = document.getElementById("oppo-name-checkbox");
oppoNameCheck.addEventListener("change", changeSwitch);

var arrowCheck = document.getElementById("arrow-checkbox");
arrowCheck.addEventListener("change", changeSwitch);

var circleCheck = document.getElementById("circle-checkbox");
circleCheck.addEventListener("change", changeSwitch);

var currentSwitch;

function changeSwitch(evt) {
    currentSwitch = evt.currentTarget;
    if (currentSwitch.id == 'pitch-checkbox') {
        pitchCheckBox();
    }
    else if (currentSwitch.id == 'tactical-checkbox') {
        pitchCheckBox();
    }
    else if (currentSwitch.id == 'oppo-checkbox') {
        oppoCheckBox(currentSwitch.id);
    }
    else if (currentSwitch.id == 'ball-checkbox') {
        ballCheckBox(currentSwitch.id);
    }
    else if (currentSwitch.id == 'label-checkbox') {
        labelCheckBox(currentSwitch.id);
    }
    else if (currentSwitch.id == 'oppo-name-checkbox') {
        oppoNameCheckBox(currentSwitch.id);
    }
    else if ((currentSwitch.id == 'arrow-checkbox') || (currentSwitch.id == 'circle-checkbox')) {
        arrowCircleCheckbox(currentSwitch);
    }
}

function arrowCircleCheckbox(switchCheckbox) {
    var otherSwitch;
    if (switchCheckbox.id == 'arrow-checkbox') {
        otherSwitch = document.getElementById('circle-checkbox');
    }
    else {
        otherSwitch = document.getElementById('arrow-checkbox');
    }

    // imageOn.style.opacity = 1;
    otherSwitch.checked = false;
    //Not possible to uncheck the active checkbox (always needs to be one of the two checked)
    switchCheckbox.checked = true;
}

function pitchCheckBox() {
    var pitchSwitch = document.getElementById('pitch-checkbox').checked;
    var tacticalSwitch = document.getElementById('tactical-checkbox').checked;
    var footballPitch = document.querySelector('.football-pitch');
    var penaltyBoxTop = document.querySelector('.penalty-box.top');
    var penaltyBoxBottom = document.querySelector('.penalty-box.bottom');

    var tacticalLines = document.querySelectorAll('.tactical');

    //Green
    if (pitchSwitch === true) {
        footballPitch.classList.remove('blackColor');
        penaltyBoxTop.classList.remove('blackColor');
        penaltyBoxBottom.classList.remove('blackColor');
        footballPitch.classList.add('greenColor');
        penaltyBoxTop.classList.add('penaltyBoxGreenTop');
        penaltyBoxBottom.classList.add('penaltyBoxGreenBottom');

        const allGrey = document.querySelectorAll('.lineColorGrey');
        allGrey.forEach((greyLine) => {
            greyLine.classList.remove('lineColorGrey');
            greyLine.classList.add('lineColorWhite');
        });

        document.getElementById("pitch-text").innerHTML = "Green";
        document.getElementById("pitch-text").style.paddingLeft = "10%";

        //Tactical
        if (tacticalSwitch === true) {
            tacticalLines.forEach((tacticalLine) => {
                tacticalLine.style.display = 'block';
            });
            document.getElementById("tactical-text").innerHTML = "On";
            document.getElementById("tactical-text").style.paddingLeft = "10%";
        }
        //Non-tactical
        else {
            tacticalLines.forEach((tacticalLine) => {
                tacticalLine.style.display = 'none';
            });

            document.getElementById("tactical-text").innerHTML = "Off";
            document.getElementById("tactical-text").style.paddingLeft = "65%";
        }
    }
    //Black
    else {
        footballPitch.classList.remove('greenColor');
        penaltyBoxTop.classList.remove('penaltyBoxGreenTop');
        penaltyBoxBottom.classList.remove('penaltyBoxGreenBottom');
        footballPitch.classList.add('blackColor');
        penaltyBoxTop.classList.add('blackColor');
        penaltyBoxBottom.classList.add('blackColor');

        const allWhite = document.querySelectorAll('.lineColorWhite');
        allWhite.forEach((whiteLine) => {
            whiteLine.classList.remove('lineColorWhite');
            whiteLine.classList.add('lineColorGrey');
        });

        document.getElementById("pitch-text").innerHTML = "Black";
        document.getElementById("pitch-text").style.paddingLeft = "55%";
        
        //Tactical
        if (tacticalSwitch === true) {
            tacticalLines.forEach((tacticalLine) => {
                tacticalLine.style.display = 'block';
            });

            document.getElementById("tactical-text").innerHTML = "On";
            document.getElementById("tactical-text").style.paddingLeft = "10%";
        }
        //Non-tactical
        else {
            tacticalLines.forEach((tacticalLine) => {
                tacticalLine.style.display = 'none';
            });

            document.getElementById("tactical-text").innerHTML = "Off";
            document.getElementById("tactical-text").style.paddingLeft = "65%";
        }
        
    }
}

function oppoCheckBox(switchId) {
    currentSwitch = document.getElementById(switchId);
    var circles = Array.from(document.getElementsByClassName('oppoCircle'));
    if (currentSwitch.checked === true) {
        document.getElementById("oppo-text").innerHTML = "On";
        document.getElementById("oppo-text").style.paddingLeft = "10%";

        //Show opposition circles
        circles.forEach(function (circle) {
            circle.style.display = 'flex';
            if (circle.id == 'oppoCircle1') {
                circle.querySelector('.oppoCircleColorGK').style.display = 'flex';
            }
            else {
                circle.querySelector('.oppoCircleColor').style.display = 'flex';
            }
        });

        if (!oppoCircleHasBeenDragged) {
            setCirclePositions('433', 'oppo');
            oppoCircleHasBeenDragged = true;
        }
        document.getElementById('oppo-name-switch-container').style.display = 'flex';
        document.getElementById('oppo-color-container').style.display = 'flex';
        document.getElementById('oppo-formation-box').style.display = 'flex';

        //Change size of circles
        allCircles.forEach((circle) => {
            //Change width and height
            var circleClass = circle.querySelector('.circleStyle, .circleStyleSmall');
            circleClass.classList.remove('circleStyle');
            circleClass.classList.add('circleStyleSmall');

            //Change number size
            var circleNumber = circle.querySelector('.circle-number');
            getFontSize(circleNumber.innerText.length, circleNumber);
        });

        //Change starting position of drawn lines
        var allLines = document.querySelectorAll('.line');
        allLines.forEach((line) => {
            line.classList.remove('lineSingle');
            line.classList.add('lineOppo');
        });

        //Change ball size
        document.getElementById('ball').classList.remove('ball');
        document.getElementById('ball').classList.add('smallBall');

    }
    else {
        document.getElementById("oppo-text").innerHTML = "Off";
        document.getElementById("oppo-text").style.paddingLeft = "65%";
        if (checkOppositionName.checked) {
            checkOppositionName.checked = false;
            oppoNameCheckBox("oppo-name-checkbox");
        }

        circles.forEach(function (circle) {
            circle.style.display = 'none';
        });
        document.getElementById('oppo-name-switch-container').style.display = 'none';
        document.getElementById('oppo-color-container').style.display = 'none';
        document.getElementById('oppo-formation-box').style.display = 'none';

        //Change size of circles
        allCircles.forEach((circle) => {
            //Change width and height
            var circleClass = circle.querySelector('.circleStyle, .circleStyleSmall');
            circleClass.classList.remove('circleStyleSmall');
            circleClass.classList.add('circleStyle');

            //Change number size
            var circleNumber = circle.querySelector('.circle-number');
            getFontSize(circleNumber.innerText.length, circleNumber);
        });

        //Change starting position of drawn lines
        var allLines = document.querySelectorAll('.line');
        allLines.forEach((line) => {
            line.classList.remove('lineOppo');
            line.classList.add('lineSingle');
        });

        //Change ball size
        document.getElementById('ball').classList.remove('smallBall');
        document.getElementById('ball').classList.add('ball');
    }
}

function ballCheckBox(switchId) {
    currentSwitch = document.getElementById(switchId);
    if (currentSwitch.checked === true) {
        var ball = document.getElementById('ball');

        ball.style.display = 'flex';
        ball.style.top = '48.5%';
        ball.style.left = '48.5%';
        document.getElementById("ball-text").innerHTML = "On";
        document.getElementById("ball-text").style.paddingLeft = "10%";

        ball.addEventListener("touchstart", handleSingleClick);
        ball.addEventListener("mousedown", handleSingleClick);
    }
    else {
        document.getElementById("ball-text").innerHTML = "Off";
        document.getElementById("ball-text").style.paddingLeft = "65%";
        document.getElementById('ball').style.display = 'none';
    }
}

function labelCheckBox(switchId) {
    currentSwitch = document.getElementById(switchId);
    if (currentSwitch.checked === false) {
        var startingBoxes = document.querySelectorAll('.outputStarting.startingStyleOne');
        startingBoxes.forEach((box) => {
            box.classList.remove('startingStyleOne');
            box.classList.add('startingStyleTwo');
            box.nextElementSibling.classList.remove('secondStyleOne');
            box.nextElementSibling.classList.add('secondStyleTwo');
        });

        var oppoBoxes = document.querySelectorAll('.outputOpponent.startingStyleOne');
        oppoBoxes.forEach((box) => {
            box.classList.remove('startingStyleOne');
            box.classList.add('startingStyleTwo');
        });
        document.getElementById("label-text").innerHTML = "No box";
        document.getElementById("label-text").style.paddingLeft = "40%";
    }
    else {
        var startingBoxes = document.querySelectorAll('.outputStarting.startingStyleTwo');
        startingBoxes.forEach((box) => {
            box.classList.remove('startingStyleTwo');
            box.classList.add('startingStyleOne');
            box.nextElementSibling.classList.remove('secondStyleTwo');
            box.nextElementSibling.classList.add('secondStyleOne');
        });

        var oppoBoxes = document.querySelectorAll('.outputOpponent.startingStyleTwo');
        oppoBoxes.forEach((box) => {
            box.classList.remove('startingStyleTwo');
            box.classList.add('startingStyleOne');
        });

        document.getElementById("label-text").innerHTML = "Box";
        document.getElementById("label-text").style.paddingLeft = "10px";
    }
}

function oppoNameCheckBox(switchId) {
    currentSwitch = document.getElementById(switchId);
    var secondContainers = document.querySelectorAll('.column.second-column .input-container');
    var secondBoxes = document.querySelectorAll('.secondBox');

    if (currentSwitch.checked === true) {
        secondContainerInputs = [];
        document.getElementById("oppo-name-text").innerText = "Opposition";
        document.getElementById("oppo-name-text").style.paddingLeft = "10%";
        document.getElementById("second-column-title").innerHTML = "Opposition eleven";
        document.querySelector('.second-column').style.background = '#154E32';

        //Change background color of input row
        secondContainers.forEach((container, index) => {
            if (index % 2 == 0) {
                container.style.backgroundColor = "#1D2C1B"; //"#3E4475";
            }
            else {
                container.style.backgroundColor = "#154E32";
            }
        });

        //Loop through all the outputSeconds and empty it
        outputSeconds.forEach((outputSecond) => {
            outputSecond.innerText = '';
            toggleOutputBoxVisibility(outputSecond);
        });

        //Get current values from second column and store it in array secondContainerInputs
        secondBoxes.forEach((secondBox) => {
            var namePosObj = {
                "name": secondBox.value,
                "pos": secondBox.id
            };
            secondContainerInputs.push(namePosObj);

            //Clear secondBox value
            secondBox.value = '';

            //Change background of actual text box
            secondBox.style.backgroundColor = 'rgba(20, 20, 20, 0.14)';
        });

        //Add value from oppoContainerInputs to the second boxes and output boxes
        for (var i = 0; i < oppoContainerInputs.length; i++) {
            for (var x = 0; x < secondBoxes.length; x++) {
                if (secondBoxes[x].id == oppoContainerInputs[i].pos) {
                    secondBoxes[x].value = oppoContainerInputs[i].name;
                    x = secondBoxes.length;
                }
            }
            for (var y = 0; y < outputOppos.length; y++) {
                if (outputOppos[y].id.replace("oppoSpan", "") == oppoContainerInputs[i].pos.replace("second", "")) {
                    outputOppos[y].innerText = oppoContainerInputs[i].name;
                    toggleOutputBoxVisibility(outputOppos[y]);
                    y = outputOppos.length;
                }
            }
        }

        //Display all numbers from the opposition
        var oppoNumberLabels = document.querySelectorAll('.oppo-label-position');
        oppoNumberLabels.forEach((oppoNumberLabel) => {
            oppoNumberLabel.style.display = 'inline-flex';
        });

        setOppoTextBoxOrder();
    }

    else {
        oppoContainerInputs = [];
        document.getElementById("oppo-name-text").innerHTML = "Back-up";
        document.getElementById("oppo-name-text").style.paddingLeft = "48%";
        document.getElementById("second-column-title").innerHTML = "Back-up eleven";
        document.querySelector('.second-column').style.background = 'linear-gradient(#32154E, #32154E 98%, #1B1D2C 2%, #1B1D2C)';

        //Change background color of input row
        secondContainers.forEach((container, index) => {
            if (index % 2 == 0) {
                container.style.backgroundColor = "#1B1D2C";
            }
            else {
                container.style.backgroundColor = "#32154E";
            }
        });

        //Loop through all the outputOppos and empty it
        outputOppos.forEach((outputOppo) => {
            outputOppo.innerText = '';
            toggleOutputBoxVisibility(outputOppo);
        });

        //Get current values from second column and store it in array oppoContainerInputs
        secondBoxes.forEach((secondBox) => {
            var namePosObj = {
                "name": secondBox.value,
                "pos": secondBox.id
            };
            oppoContainerInputs.push(namePosObj);

            //Clear secondBox value
            secondBox.value = '';
            //Change background of actual text box
            secondBox.style.backgroundColor = 'rgba(200, 200, 200, 0.14)';
        });

        //Add value from secondContainerInputs to the second boxes and output boxes
        for (var i = 0; i < secondContainerInputs.length; i++) {
            for (var x = 0; x < secondBoxes.length; x++) {
                if (secondBoxes[x].id == secondContainerInputs[i].pos) {
                    secondBoxes[x].value = secondContainerInputs[i].name;
                    x = secondBoxes.length;
                }
            }
            for (var y = 0; y < outputSeconds.length; y++) {
                if (outputSeconds[y].id.replace("secondSpan", "") == secondContainerInputs[i].pos.replace("second", "")) {
                    outputSeconds[y].innerText = secondContainerInputs[i].name;
                    toggleOutputBoxVisibility(outputSeconds[y]);
                    y = outputSeconds.length;
                }
            }
        }

        //Hide all opposition numbers 
        var oppoNumberLabels = document.querySelectorAll('.oppo-label-position');
        oppoNumberLabels.forEach((oppoNumberLabel) => {
            oppoNumberLabel.style.display = 'none';
        });
        setTextBoxOrders();
    }
}

//Clears all inputs for specified boxType
function clearOutBoxes(boxType) {
    inputBoxes.forEach((inputBox, index) => {
        //Resets the whole view
        //Get the squad number (starting1 means 1)
        const clearSquadNumber = inputBox.nextElementSibling.htmlFor.replace('starting', '');
        //Change number next to textbox
        inputBox.nextElementSibling.innerText = '#' + clearSquadNumber;

        //Change number within circle to the default number
        var spanElement = document.getElementById(clearSquadNumber);
        spanElement.innerHTML = clearSquadNumber;

        if (boxType == 'starting') {
            inputBox.value = "";
            toggleOutputBoxVisibility(outputStartings[index]);
            outputStartings[index].innerText = inputBox.value;
        }
        if (boxType == 'second') {
            secondBoxes[index].value = "";
            toggleOutputBoxVisibility(outputSeconds[index]);
            outputSeconds[index].innerText = secondBoxes[index].value;
        }
        if (boxType == 'oppo') {
            secondBoxes[index].value = "";
            toggleOutputBoxVisibility(outputOppos[index]);
            outputOppos[index].innerText = secondBoxes[index].value;
        }
    });
}