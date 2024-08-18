loadLocalStorage();
function loadLocalStorage() {
    var tacticalSwitchTrue = document.getElementById('tactical-checkbox-true');
    var tacticalSwitchFalse = document.getElementById('tactical-checkbox-false');

    var pitchSwitchGreen = document.getElementById('pitch-checkbox-green');
    var pitchSwitchBlack = document.getElementById('pitch-checkbox-black');

    var ballCheckTrue = document.getElementById("ball-checkbox-true");
    var ballCheckFalse = document.getElementById("ball-checkbox-false");

    var labelCheckBoxed = document.getElementById("label-checkbox-boxed");
    var labelCheckUnboxed = document.getElementById("label-checkbox-unboxed");

    var blueArrowCheckTrue = document.getElementById("blueArrow-checkbox-true");
    var blueArrowCheckFalse = document.getElementById("blueArrow-checkbox-false");

    var numberCheckTrue = document.getElementById("number-checkbox-true");
    var numberCheckFalse = document.getElementById("number-checkbox-false");

    var drawCheckTrue = document.getElementById("draw-checkbox-true");
    var drawCheckFalse = document.getElementById("draw-checkbox-false");

    var oppoCheckTrue = document.getElementById("oppo-checkbox-true");
    var oppoCheckFalse = document.getElementById("oppo-checkbox-false");

    var oppoNameCheckTrue = document.getElementById("oppo-column-checkbox-true");
    var oppoNameCheckFalse = document.getElementById("oppo-column-checkbox-false");


    //check Settings
    //PitchColor
    const pitchColor = localStorage.getItem('pitchColor');
    const isBlack = pitchColor === 'black' || pitchColor === null;

    pitchSwitchGreen.checked = !isBlack;
    pitchSwitchBlack.checked = isBlack;

    //Tactics
    const tacticsSwitch = localStorage.getItem('pitchTactics');
    const tacticsOn = tacticsSwitch === 'on' || tacticsSwitch === null;

    tacticalSwitchTrue.checked = tacticsOn;
    tacticalSwitchFalse.checked = !tacticsOn;

    //Player name style switch
    const labelStyle = localStorage.getItem('labelStyle');
    const labelBoxed = labelStyle === 'notBoxed' || labelStyle === null;
    labelCheckBoxed.checked = !labelBoxed;
    labelCheckUnboxed.checked = labelBoxed;

    //Ball switch
    const ballSwitch = localStorage.getItem('ballSwitch');
    const ballVisible = ballSwitch === 'off' || ballSwitch === null;

    ballCheckTrue.checked = !ballVisible;
    ballCheckFalse.checked = ballVisible;

    //Pressing line switch
    const blueArrowSwitch = localStorage.getItem('blueArrow');
    const blueArrowVisible = blueArrowSwitch === 'off' || blueArrowSwitch === null;

    blueArrowCheckTrue.checked = !blueArrowVisible;
    blueArrowCheckFalse.checked = blueArrowVisible;

    //Number switch
    const numberSwitch = localStorage.getItem('showNumbers');
    const numberVisible = numberSwitch === 'true' || numberSwitch === null;

    numberCheckTrue.checked = numberVisible;
    numberCheckFalse.checked = !numberVisible;

    //Drawing switch
    const drawingSwitch = localStorage.getItem('drawing');
    const drawingVisible = drawingSwitch === 'off' || numberSwitch === null;

    drawCheckTrue.checked = !drawingVisible;
    drawCheckFalse.checked = drawingVisible;

    //Opposition switch
    const oppoSwitch = localStorage.getItem('opposition');
    const oppositionVisible = oppoSwitch === 'off' || oppoSwitch === null;

    oppoCheckTrue.checked = !oppositionVisible;
    oppoCheckFalse.checked = oppositionVisible;

    //Opposition or backup
    const oppoInputSwitch = localStorage.getItem('oppositionNaming');
    const oppoInputVisible = oppoInputSwitch === 'off' || oppoInputSwitch === null;

    oppoNameCheckTrue.checked = !oppoInputVisible;
    oppoNameCheckFalse.checked = oppoInputVisible;

    mainPickr.setColor(localStorage.getItem('mainColor') || '#FF0000');
    secondPickr.setColor(localStorage.getItem('secondColor') || '#FFFFFF');
    numberPickr.setColor(localStorage.getItem('numberColor') || '#FFFFFF');
    mainOppoPickr.setColor(localStorage.getItem('oppoMainColor') || '#006631');
    secondOppoPickr.setColor(localStorage.getItem('oppoSecondColor') || '#000000');
    numberOppoPickr.setColor(localStorage.getItem('oppoNumberColor') || '#FFFFFF');
    //Still to do
    //Names main team

    //Get values for the inputboxes
    inputBoxes.forEach((element) => {
        var localStorageValue = localStorage.getItem(element.id);
        element.value = localStorageValue;
    });

    outputStartings.forEach((outputStarting) => {
        outputStarting.innerText = localStorage.getItem(outputStarting.id.replace('startingSpan', 'starting'));
        toggleOutputBoxVisibility(outputStarting);

        //set number on circle (localStorage name should be startingNumber#)
        var circleNumber = localStorage.getItem(outputStarting.id.replace('Span', 'Number'));
        if (circleNumber != null) {
            outputStarting.parentElement.previousElementSibling.innerText = circleNumber;
            changeNumberOnTextboxOrCircle(outputStarting.parentNode.parentNode, circleNumber);
        }
    });

    //set number on circle (localStorage name should be oppoNumber#)
    if (oppoNameCheckTrue.checked) {
        outputOppos.forEach((outputOppo) => {
            var circleNumber = localStorage.getItem(outputOppo.id.replace('Span', 'Number'));
            if (circleNumber != null) {
                outputOppo.parentElement.previousElementSibling.innerText = circleNumber;
                changeNumberOnTextboxOrCircle(outputOppo.parentNode.parentNode, circleNumber);
            }
        });
    }

    //Backup and oppo visiblity and output boxes are done through oppoNameCheckBox()

    if (localStorage.getItem('mainCirclePositions') != null) {
        var circlePositionString = localStorage.getItem('mainCirclePositions');
        var result = getSpecificCirclePositions(circlePositionString);

        for (var q = 0; q < 11; q++) {
            var circle = document.getElementById(result.arrayId[q]);
            circle.style.top = result.arrayTop[q];
            circle.style.left = result.arrayLeft[q];
        }
    }

    if (localStorage.getItem('oppoCirclePositions') != null) {
        var circlePositionString = localStorage.getItem('oppoCirclePositions');
        var result = getSpecificCirclePositions(circlePositionString);
        for (var q = 0; q < 11; q++) {
            var circle = document.getElementById(result.arrayId[q]);
            circle.style.top = result.arrayTop[q];
            circle.style.left = result.arrayLeft[q];
        }
    }

    if (localStorage.getItem('ballPosition') != null) {
        var ballPositionString = localStorage.getItem('ballPosition');
        var result = getSpecificCirclePositions(ballPositionString);
        var ball = document.getElementById('ball');
        ball.style.top = result.arrayTop[0];
        ball.style.left = result.arrayLeft[0];
    }

    //Lines
    lines = [];
    movingLines = [];

    var loadedMainLines = loadLines('main');
    var loadedOppoLines = loadLines('oppo');
    var loadedMovingLines = loadLines('moving')
    drawLines(loadedMainLines, 'main');
    drawLines(loadedOppoLines, 'oppo');
    drawLines(loadedMovingLines, 'moving');

    //Call these functions once to set the switches in the settings pop up correct and then execute the settings
    pitchCheckBox();
    ballCheckBox();
    labelCheckBox();
    blueArrowCheckBox();
    var switchCheckBox = document.getElementById(localStorage.getItem('switchCheckBox'));
    arrowCircleCheckbox(switchCheckBox);
    numberCheckBox();
    drawCheckBox();
    oppoCheckBox();
    oppoNameCheckBox();
}

window.loadLines = loadLines;
window.drawLines = drawLines;
function loadLines(team) {
    var inputString;
    if (team == 'main') {
        inputString = localStorage.getItem('mainLineInfo');
    }
    else if (team == 'oppo') {
        inputString = localStorage.getItem('oppoLineInfo');
    }
    else if (team == 'moving') {
        inputString = localStorage.getItem('movingLineInfo');;
    }
    const result = {
        arrayId: [],
        arrayAD: [],
        arrayHP: []
    };
    let currentIndex = 0;
    if (inputString != null) {
        while (currentIndex < inputString.length) {
            var hashIndex = inputString.indexOf('#', currentIndex);
            var hIndex = inputString.indexOf('H', hashIndex);
            var dIndex = inputString.indexOf('D', hIndex);
            var newHashIndex = inputString.indexOf('#', dIndex);

            if (hashIndex === -1 || hIndex === -1 || dIndex === -1) {
                break; // Exit the loop if any of the markers are not found
            }
            const value1 = inputString.slice(hashIndex + 1, hIndex);
            const value2 = inputString.slice(hIndex + 1, dIndex);
            const value3 = inputString.slice(dIndex + 1, newHashIndex);

            result.arrayId.push(value1);
            result.arrayHP.push(value2);
            result.arrayAD.push(value3);
            currentIndex = dIndex + 1; // Move the current index to the next '#'
        }
    }
    return result;
}

function drawLines(loadedLines, team) {
    if (loadedLines != null) {
        if (team == 'main') {
        }
        for (var x = 0; x < loadedLines.arrayId.length; x++) {
            const line = document.createElement("div");
            line.classList.add("line");
            if (team == 'moving') {
                line.classList.add("movingLine");
            }
            else {
                line.classList.add("normalLine");
            }


            var lineColor = (team == 'main') ? 'yellow' : (team == 'oppo') ? 'purple' : '#4696ff';
            var lineStyle = (team == 'main' || team == 'oppo') ? 'dotted' : 'dashed';
            if (loadedLines.arrayId[x] == 'ball') {
                lineColor = 'white';
            }


            // Create arrowheads
            const arrowhead1 = document.createElement("div");
            arrowhead1.classList.add("arrowhead");
            arrowhead1.style.borderBottomColor = lineColor;
            arrowhead1.style.transform = `rotate(180deg)`;
            arrowhead1.style.display = 'flex';

            var angleDeg = loadedLines.arrayAD[x];
            // Append arrowheads to the line
            line.appendChild(arrowhead1);
            line.style.position = 'absolute';
            line.style.height = loadedLines.arrayHP[x] + 'px';
            line.style.backgroundColor = 'transparent';
            line.style.borderLeftStyle = lineStyle;
            line.style.borderLeftColor = lineColor;
            line.style.transformOrigin = 'left top';
            line.style.transform = `rotate(${angleDeg}deg)`;
            line.style.zindex = '1';
            var hypotenusePct = (loadedLines.arrayHP[x] / imageConHeight).toFixed(5);
            line.setAttribute("hypotenusePct", hypotenusePct);
            line.setAttribute('height', loadedLines.arrayHP[x]);
            line.setAttribute('angleDeg', angleDeg);
            line.setAttribute('parentCircleId', loadedLines.arrayId[x].replace('#', ''));
            var activeCircle = document.getElementById(loadedLines.arrayId[x].replace('#', ''));
            activeCircle.append(line);

            var lineObj = {
                "circle": activeCircle.id,
                "div": line
            }
            if (team == 'moving') {
                movingLines.push(lineObj);
                addLineDataToArray(line, activeCircle);
            }
            else {
                lines.push(lineObj);
            }

        }
    }
    //Hide all moving lines since on load we first show the normal arrows
    for (var i = 0; i < movingLines.length; i++) {
        movingLines[i].div.style.display = 'none';
    }
}