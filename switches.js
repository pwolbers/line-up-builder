// Function to toggle background of pitch background and whether or not opponents are visible
// Also checks for the ball
var pitchCheckTrue = document.getElementById("pitch-checkbox-true");
pitchCheckTrue.addEventListener("change", changeSwitch);
var pitchCheckFalse = document.getElementById("pitch-checkbox-false");
pitchCheckFalse.addEventListener("change", changeSwitch);

var tacticalCheckTrue = document.getElementById("tactical-checkbox-true");
tacticalCheckTrue.addEventListener("change", changeSwitch);
var tacticalCheckFalse = document.getElementById("tactical-checkbox-false");
tacticalCheckFalse.addEventListener("change", changeSwitch);

var ballCheckTrue = document.getElementById("ball-checkbox-true");
ballCheckTrue.addEventListener("change", changeSwitch);
var ballCheckFalse = document.getElementById("ball-checkbox-false");
ballCheckFalse.addEventListener("change", changeSwitch);

var labelCheckTrue = document.getElementById("label-checkbox-true");
labelCheckTrue.addEventListener("change", changeSwitch);
var labelCheckFalse = document.getElementById("label-checkbox-false");
labelCheckFalse.addEventListener("change", changeSwitch);

var blueArrowCheckTrue = document.getElementById("blueArrow-checkbox-true");
blueArrowCheckTrue.addEventListener("change", changeSwitch);
var blueArrowCheckFalse = document.getElementById("blueArrow-checkbox-false");
blueArrowCheckFalse.addEventListener("change", changeSwitch);

var drawCheckTrue = document.getElementById("draw-checkbox-true");
drawCheckTrue.addEventListener("change", changeSwitch);
var drawCheckFalse = document.getElementById("draw-checkbox-false");
drawCheckFalse.addEventListener("change", changeSwitch);

var oppoCheckTrue = document.getElementById("oppo-checkbox-true");
oppoCheckTrue.addEventListener("change", changeSwitch);
var oppoCheckFalse = document.getElementById("oppo-checkbox-false");
oppoCheckFalse.addEventListener("change", changeSwitch);

var oppoNameCheckTrue = document.getElementById("oppo-column-checkbox-true");
oppoNameCheckTrue.addEventListener("change", changeSwitch);
var oppoNameCheckFalse = document.getElementById("oppo-column-checkbox-false");
oppoNameCheckFalse.addEventListener("change", changeSwitch);

var arrowCheck = document.getElementById("arrow-checkbox");
arrowCheck.addEventListener("change", changeSwitch);

var circleCheck = document.getElementById("circle-checkbox");
circleCheck.addEventListener("change", changeSwitch);

var movingCheck = document.getElementById("moving-checkbox");
movingCheck.addEventListener("change", changeSwitch);

var playCheck = document.getElementById("play-checkbox");
playCheck.addEventListener("change", changeSwitch);

var currentSwitch;

function changeSwitch(evt) {
    currentSwitch = evt.currentTarget;

    if (currentSwitch.id == 'oppo-checkbox-false' || currentSwitch.id == 'oppo-checkbox-true') {
        oppoCheckBox();
    }
    else if (currentSwitch.id == 'oppo-column-checkbox-false' || currentSwitch.id == 'oppo-column-checkbox-true') {
        oppoNameCheckBox();
    }
    else if (currentSwitch.id == 'pitch-checkbox-false' || currentSwitch.id == 'pitch-checkbox-true') {
        pitchCheckBox();
    }
    else if (currentSwitch.id == 'tactical-checkbox-false' || currentSwitch.id == 'tactical-checkbox-true') {
        pitchCheckBox();
    }
    else if (currentSwitch.id == 'ball-checkbox-false' || currentSwitch.id == 'ball-checkbox-true') {
        ballCheckBox();
    }
    else if (currentSwitch.id == 'label-checkbox-false' || currentSwitch.id == 'label-checkbox-true') {
        labelCheckBox();
    }
    else if (currentSwitch.id == 'blueArrow-checkbox-false' || currentSwitch.id == 'blueArrow-checkbox-true') {
        blueArrowCheckBox();
    }
    else if (currentSwitch.id == 'draw-checkbox-false' || currentSwitch.id == 'draw-checkbox-true') {
        drawCheckBox();
    }
    else if ((currentSwitch.id == 'arrow-checkbox') || (currentSwitch.id == 'circle-checkbox') || (currentSwitch.id == 'moving-checkbox')) {
        arrowCircleCheckbox(currentSwitch);
    }
    else if (currentSwitch.id == 'play-checkbox') {
        moveCircles();
    }
}

function arrowCircleCheckbox(switchCheckbox) {
    document.querySelector('.play-checkbox').style.display = 'none';

    if (switchCheckbox.id == 'arrow-checkbox') {
        document.getElementById('circle-checkbox').checked = false;
        document.getElementById('moving-checkbox').checked = false;
        //Show all normal lines
        for (var i = 0; i < lines.length; i++) {
            lines[i].div.style.display = 'block';
        }
        //Hide all moving lines
        for (var x = 0; x < movingLines.length; x++) {
            movingLines[x].div.style.display = 'none';
        }
    }
    else if (switchCheckbox.id == 'circle-checkbox') {
        document.getElementById('arrow-checkbox').checked = false;
        document.getElementById('moving-checkbox').checked = false;
    }
    else if (switchCheckbox.id == 'moving-checkbox') {
        document.getElementById('arrow-checkbox').checked = false;
        document.getElementById('circle-checkbox').checked = false;
        document.querySelector('.play-checkbox').style.display = 'block';
        //Hide all normal lines
        for (var i = 0; i < lines.length; i++) {
            lines[i].div.style.display = 'none';
        }

        //Show all moving lines if play button is not checked
        if (playCheck.checked == false) {
            for (var x = 0; x < movingLines.length; x++) {
                movingLines[x].div.style.display = 'block';
            }
            //Set 'Hide pressing line' switch to true and run functionality
            blueArrowCheckTrue.checked = true;
            blueArrowCheckBox();
        }

        //Reset 'Hide blue arrow checkbox
    }

    //Not possible to uncheck the active checkbox (always needs to be one of the two checked)
    switchCheckbox.checked = true;
}

function pitchCheckBox() {
    var pitchSwitch = document.getElementById('pitch-checkbox-true');
    var fillingPitch = pitchSwitch.nextElementSibling.nextElementSibling;

    var footballPitch = document.querySelector('.football-pitch');
    var penaltyBoxTop = document.querySelector('.penalty-box.top');
    var penaltyBoxBottom = document.querySelector('.penalty-box.bottom');

    var tacticalSwitch = document.getElementById('tactical-checkbox-true');
    var fillingTactical = tacticalSwitch.nextElementSibling.nextElementSibling;
    var tacticalLines = document.querySelectorAll('.tactical');

    var pitchDrawingContainer = document.querySelector('.pitchDrawing-container');

    //Green
    if (pitchSwitch.checked === true) {
        localStorage.setItem('pitchColor', 'green');
        fillingPitch.style.transform = 'translateX(100%)';
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

        const pitchDots = document.querySelectorAll('.penaltyDot, .middleDot');
        pitchDots.forEach((dot) => {
            dot.style.background = 'white';
        });

        pitchDrawingContainer.classList.remove('containerBlackBackground');
        pitchDrawingContainer.classList.add('containerGreenBackground');
    }
    //Black
    else {
        localStorage.setItem('pitchColor', 'black');
        fillingPitch.style.transform = 'translateX(0%)';
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
        const pitchDots = document.querySelectorAll('.penaltyDot, .middleDot');
        pitchDots.forEach((dot) => {
            dot.style.background = '#808080';
        });
        pitchDrawingContainer.classList.remove('containerGreenBackground');
        pitchDrawingContainer.classList.add('containerBlackBackground');
    }
    //Tactical
    if (tacticalSwitch.checked === true) {
        localStorage.setItem('pitchTactics', 'on');
        fillingTactical.style.transform = 'translateX(100%)';
        tacticalLines.forEach((tacticalLine) => {
            tacticalLine.style.display = 'block';
        });

    }
    //Non-tactical
    else {
        localStorage.setItem('pitchTactics', 'off');
        fillingTactical.style.transform = 'translateX(0%)';
        tacticalLines.forEach((tacticalLine) => {
            tacticalLine.style.display = 'none';
        });
    }
}

function ballCheckBox() {
    ballSwitch = document.getElementById('ball-checkbox-true');
    var fillingBall = ballSwitch.nextElementSibling.nextElementSibling;

    var ball = document.getElementById('ball');
    if (ballSwitch.checked === true) {
        localStorage.setItem('ballSwitch', 'on');
        fillingBall.style.transform = 'translateX(100%)';
        ball.style.display = 'flex';
        ball.style.top = '49%';
        ball.style.left = '49%';

        ball.addEventListener("touchstart", handleSingleClick);
        ball.addEventListener("mousedown", handleSingleClick);
    }
    else {
        localStorage.setItem('ballSwitch', 'off');
        fillingBall.style.transform = 'translateX(0%)';

        ball.style.display = 'none';
    }
}

function labelCheckBox() {
    labelSwitch = document.getElementById('label-checkbox-true');
    var fillingLabel = labelSwitch.nextElementSibling.nextElementSibling;
    if (labelSwitch.checked) {
        localStorage.setItem('labelStyle', 'boxed');
        fillingLabel.style.transform = 'translateX(100%)';

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
    }
    else {
        localStorage.setItem('labelStyle', 'notBoxed');
        fillingLabel.style.transform = 'translateX(0%)';
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
    }

    setCircleAndTextSize();
}

function blueArrowCheckBox() {
    blueArrowSwitch = document.getElementById('blueArrow-checkbox-true');
    var fillingBlueArrow = blueArrowSwitch.nextElementSibling.nextElementSibling;
    const allBlueArrows = document.querySelectorAll('.movingLine');
    if (blueArrowSwitch.checked) {
        localStorage.setItem('blueArrow', 'on');
        fillingBlueArrow.style.transform = 'translateX(100%)';

        allBlueArrows.forEach((blueArrow) => {
            if (blueArrow.style.display != 'block') {
                blueArrow.style.display = 'block';
            }
        });
    }
    else {
        localStorage.setItem('blueArrow', 'off');
        fillingBlueArrow.style.transform = 'translateX(0%)';
        allBlueArrows.forEach((blueArrow) => {
            if (blueArrow.style.display != 'none') {
                blueArrow.style.display = 'none';
            }
        });

    }
}

function drawCheckBox() {
    var drawSwitch = document.getElementById('draw-checkbox-true');
    var drawingSettings = document.querySelector('.drawing-settings');
    var fillingDraw = drawSwitch.nextElementSibling.nextElementSibling;
    if (drawSwitch.checked) {
        localStorage.setItem('drawing', 'on');
        fillingDraw.style.transform = 'translateX(100%)';
        canvasContainer.style.display = 'block';
        drawingSettings.style.display = 'grid';
        drawSwitch.parentNode.parentNode.style.paddingBottom = '0px';
        drawSwitch.parentNode.parentNode.style.borderBottom = '0px dashed white';
    }
    else {
        localStorage.setItem('drawing', 'off');
        fillingDraw.style.transform = 'translateX(0%)';
        canvasContainer.style.display = 'none';
        drawingSettings.style.display = 'none';
        drawSwitch.parentNode.parentNode.style.paddingBottom = '8px';
        drawSwitch.parentNode.parentNode.style.borderBottom = '1px dashed white';
    }

}

function oppoCheckBox() {
    var oppoTrue = document.getElementById('oppo-checkbox-true');
    var oppoFilling = oppoTrue.nextElementSibling.nextElementSibling;
    var circles = Array.from(document.getElementsByClassName('oppoCircle'));
    if (oppoTrue.checked === true) {
        localStorage.setItem('opposition', 'on');
        oppoFilling.style.transform = 'translateX(100%)';
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

        if (!oppoCircleHasBeenDragged && localStorage.getItem('oppoCirclePositions') == null) {
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
        localStorage.setItem('opposition', 'off');
        oppoFilling.style.transform = 'translateX(0%)';
        if (checkOppositionName.checked) {
            checkOppositionName.checked = false;
            oppoNameCheckBox();
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

    //Reset circle sizing to standard
    circleSlider.value = 5;
    outputElement = document.querySelector('.circleSliderOutput');
    setSliderOutputLabel(circleSlider, outputElement);
    setCircleAndTextSize();
}

function oppoNameCheckBox() {
    trueSwitch = document.getElementById('oppo-column-checkbox-true');

    var oppoNameFilling = trueSwitch.nextElementSibling.nextElementSibling;
    var secondContainers = document.querySelectorAll('.column.second-column .input-container');
    var secondBoxes = document.querySelectorAll('.secondBox');

    if (trueSwitch.checked === true) {
        localStorage.setItem('oppositionNaming', 'on');
        oppoNameFilling.style.transform = 'translateX(100%)';
        secondContainerInputs = [];
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

        //Loop through all the outputSeconds (i.e. the text below the circles) and empty and hide it
        outputSeconds.forEach((outputSecond) => {
            outputSecond.innerText = '';
            toggleOutputBoxVisibility(outputSecond);
        });

        secondBoxes.forEach((element) => {
            var localStorageName = "oppo" + element.id;
            element.value = localStorage.getItem(localStorageName);
            element.style.backgroundColor = 'rgba(20, 20, 20, 0.14)';
        });

        //Show the circles for oppo
        outputOppos.forEach((outputOppo) => {
            var localStorageName = outputOppo.id.replace('oppoSpan', 'opposecond');
            outputOppo.innerText = localStorage.getItem(localStorageName);
            toggleOutputBoxVisibility(outputOppo);
        });

        //Display all numbers from the opposition
        var oppoNumberLabels = document.querySelectorAll('.oppoNumberLabel');
        oppoNumberLabels.forEach((oppoNumberLabel) => {
            oppoNumberLabel.style.display = 'inline-flex';
        });

        setOppoTextBoxOrder();
    }

    else {
        localStorage.setItem('oppositionNaming', 'off');
        oppoNameFilling.style.transform = 'translateX(0%)';
        oppoContainerInputs = [];

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

        secondBoxes.forEach((element) => {
            var localStorageName = "backup" + element.id;
            element.value = localStorage.getItem(localStorageName);
            element.style.backgroundColor = 'rgba(200, 200, 200, 0.14)';
        });

        outputSeconds.forEach((outputSecond) => {
            var localStorageName = outputSecond.id.replace('secondSpan', 'backupsecond');
            outputSecond.innerText = localStorage.getItem(localStorageName);
            toggleOutputBoxVisibility(outputSecond);
        });

        //Hide all opposition numbers 
        var oppoNumberLabels = document.querySelectorAll('.oppoNumberLabel');
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