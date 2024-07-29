loadLocalStorage();
function loadLocalStorage() {

    var tacticalSwitchTrue = document.getElementById('tactical-checkbox-true');
    var tacticalSwitchFalse = document.getElementById('tactical-checkbox-false');

    var pitchSwitchTrue = document.getElementById('pitch-checkbox-true');
    var pitchSwitchFalse = document.getElementById('pitch-checkbox-false');

    var ballCheckTrue = document.getElementById("ball-checkbox-true");
    var ballCheckFalse = document.getElementById("ball-checkbox-false");

    var labelCheckTrue = document.getElementById("label-checkbox-true");
    var labelCheckFalse = document.getElementById("label-checkbox-false");

    var blueArrowCheckTrue = document.getElementById("blueArrow-checkbox-true");
    var blueArrowCheckFalse = document.getElementById("blueArrow-checkbox-false");

    var drawCheckTrue = document.getElementById("draw-checkbox-true");
    var drawCheckFalse = document.getElementById("draw-checkbox-false");

    var oppoCheckTrue = document.getElementById("oppo-checkbox-true");
    var oppoCheckFalse = document.getElementById("oppo-checkbox-false");

    var oppoNameCheckTrue = document.getElementById("oppo-column-checkbox-true");
    var oppoNameCheckFalse = document.getElementById("oppo-column-checkbox-false");

    var arrowCheck = document.getElementById("arrow-checkbox");

    var circleCheck = document.getElementById("circle-checkbox");

    var movingCheck = document.getElementById("moving-checkbox");

    var playCheck = document.getElementById("play-checkbox");
    //check Settings
    //PitchColor
    var pitchSwitch = (localStorage.getItem('pitchColor') == 'green') || false;
    pitchSwitchTrue.checked = pitchSwitch;
    pitchSwitchFalse.checked = !pitchSwitch;

    //Tactics
    var tacticalSwitch = (localStorage.getItem('pitchTactics') == 'on') || true;
    tacticalSwitchTrue.checked = tacticalSwitch;
    tacticalSwitchFalse.checked = !tacticalSwitch;

    //Ball switch
    var ballSwitch = (localStorage.getItem('ballSwitch') == 'on') || false;
    ballCheckTrue.checked = ballSwitch;
    ballCheckFalse.checked = !ballSwitch;

    var labelSwitch = (localStorage.getItem('labelStyle') == 'boxed') || false;
    labelCheckTrue.checked = labelSwitch;
    labelCheckFalse.checked = !labelSwitch;

    var blueArrowSwitch = (localStorage.getItem('blueArrow') == 'on') || false;
    blueArrowCheckTrue.checked = blueArrowSwitch;
    blueArrowCheckFalse.checked = !blueArrowSwitch;

    var drawSwitch = (localStorage.getItem('drawing') == 'on') || false;
    drawCheckTrue.checked = drawSwitch;
    drawCheckFalse.checked = !drawSwitch;

    var oppoSwitch = (localStorage.getItem('opposition') == 'on') || false;
    oppoCheckTrue.checked = oppoSwitch;
    oppoCheckFalse.checked = !oppoSwitch;

    var oppoNameSwitch = (localStorage.getItem('oppositionNaming') == 'on') || false;
    oppoNameCheckTrue.checked = oppoNameSwitch;
    oppoNameCheckFalse.checked = !oppoNameSwitch;

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

    //Show the circles for oppo
    outputStartings.forEach((outputStarting) => {
        outputStarting.innerText = localStorage.getItem(outputStarting.id.replace('startingSpan', 'starting'));
        toggleOutputBoxVisibility(outputStarting);
    });

    if (oppoNameCheckTrue.checked) {
        secondBoxes.forEach((element) => {
            var localStorageName = "oppo" + element.id;
            element.value = localStorage.getItem(localStorageName);
        });
    }
    else {
        secondBoxes.forEach((element) => {
            var localStorageName = "backup" + element.id;
            element.value = localStorage.getItem(localStorageName);
        });
    }

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
    //Names back ups
    //Names opponent
    //Teamname


    //Call these functions once to set the switches in the settings pop up correct and then execute the settings
    pitchCheckBox();
    ballCheckBox();
    labelCheckBox();
    blueArrowCheckBox();
    drawCheckBox();
    oppoCheckBox();
    oppoNameCheckBox();
    var loadedLine = loadLines();
    drawLines(loadedLine);

    function drawLines(loadedLine) {
        for (var x = 0; x < loadedLine.arrayId.length; x++) {
            const line = document.createElement("div");
            line.classList.add("line");
            var movingLine = false;
            if (movingLine) {
                line.classList.add("movingLine");
            }
            else {
                line.classList.add("normalLine");
            }

            // Create arrowheads
            const arrowhead1 = document.createElement("div");
            arrowhead1.classList.add("arrowhead");
            arrowhead1.style.borderBottom = '10px solid yellow';
            arrowhead1.style.transform = `rotate(180deg)`;
            arrowhead1.style.display = 'flex';

            var angleDeg = loadedLine.arrayAD[x];
            // Append arrowheads to the line
            line.appendChild(arrowhead1);
            line.style.position = 'absolute';
            line.style.height = loadedLine.arrayHP[x] + 'px';
            line.style.backgroundColor = 'transparent';
            line.style.borderLeftStyle = 'dotted';
            line.style.borderLeftColor = 'yellow';
            line.style.transformOrigin = 'left top';
            line.style.transform = `rotate(${angleDeg}deg)`;
            line.style.zindex = '1';

            var hypotenusePct = (loadedLine.arrayHP[x] / imageConHeight).toFixed(5);
            line.setAttribute("hypotenusePct", hypotenusePct);
            line.setAttribute('height', loadedLine.arrayHP[x]);
            line.setAttribute('angleDeg', angleDeg);
            line.setAttribute('parentCircleId', loadedLine.arrayId[x].replace('#', ''));
            var activeCircle = document.getElementById(loadedLine.arrayId[x].replace('#', ''));
            activeCircle.append(line);
        }
    }

    function loadLines() {
        var inputString = localStorage.getItem('lineInfo');
        const result = {
            arrayId: [],
            arrayAD: [],
            arrayHP: []
        };

        let currentIndex = 0;

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
        return result;
    }
}