// Attach click event listener to the download image button
screenshotButton.addEventListener("click", downloadImage);
//Sets the line up based on the JSON content retrieved from GitHub/locally
selectTeam.addEventListener("change", loadTeam);
//Creates a JSON based on the line up made by the user
downloadButton.addEventListener("click", downloadJSON);
//Sets the formation based on formation select box
selectFormation.addEventListener("change", loadFormation);
//Reads the JSON uploaded and stores it in the textboxes
importButton.addEventListener("click", importJSON);
//Clears all the names from the input boxes
clearNamesButton.addEventListener("click", clearNames);
//Clears all the arrows from the pitch
clearArrowsButton.addEventListener("click", clearArrows);

showLineUpButton.addEventListener('click', switchViews);

function switchViews() {
    showLineUpButton.textContent = 'Switch to input view'; // Change button text
    var pitchDrawingContainer = document.querySelector('.pitchDrawing-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Hide the lineup-container div
        leftContainer.style.display = 'none';
        if (drawCheckTrue.checked) {
            pitchDrawingContainer.classList.add('containerDisplay');
        }
    } else {
        leftContainer.style.display = 'block';
        lineupContainer.style.display = 'none'; // Show the lineup-container div
        showLineUpButton.textContent = 'Switch to pitch view'; // Change button text
        pitchDrawingContainer.classList.remove('containerDisplay');
    }
}

// Function to download a .PNG of the pitch
function downloadImage() {
    const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
    if (displayValue == 'inline-block') {
        switchViews();
    }

    screenshotButton.innerText = "Downloading...";
    var buttonContainer = document.getElementById('button-pitch-container');
    buttonContainer.style.display = 'none';

    // Get a reference to the element that you want to capture.
    const domNode = document.getElementById('image-container');


    // Capture the DOM node as a Blob
    var scale = 2;
    domtoimage.toBlob(domNode, {
        width: domNode.clientWidth * scale,
        height: domNode.clientHeight * scale,
        style: {
            transform: 'scale(' + scale + ')',
            transformOrigin: 'top left'
        }
    }).then((originalBlob) => {

        // Create an image from the originalBlob
        const image = new Image();
        image.src = URL.createObjectURL(originalBlob);

        image.onload = () => {
            // Always download the same size image
            const newWidth = 1095; // Adjust to your desired width
            const newHeight = 1350;

            // Create a canvas for resizing
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');

            // Draw the original image on the canvas with the new dimensions
            ctx.drawImage(image, 0, 0, newWidth, newHeight);

            // Convert the canvas content back to a Blob
            canvas.toBlob((resizedBlob) => {
                // Create a download link for the resized Blob
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(resizedBlob);

                var teamFileName = document.querySelector('#teamNameBox').value;
                if (teamFileName == '') {
                    teamFileName = 'team_lineup_screenshot';
                }
                teamFileName = teamFileName.replaceAll(' ', '_');
                teamFileName = teamFileName.replaceAll('/', '_');
                downloadLink.download = teamFileName; // Set the filename for the download
                downloadLink.style.display = 'none';

                downloadLink.click();
            }, 'image/png');
        }

        var buttonContainer = document.getElementById('button-pitch-container');
        buttonContainer.style.display = 'block';
        screenshotButton.innerText = "Download image (.png)";
    });
}

// Function to load team from predefined JSON
function loadTeam() {
    //Reset upload button
    updateUploadButton();

    const selectedValue = selectTeam.value;

    if (selectedValue === "clear") {
        startingArray = ['', '', '', '', '', '', '', '', '', '', ''];
        secondArray = ['', '', '', '', '', '', '', '', '', '', ''];
        startKeyArray = '';
        secondKeyArray = '';
        document.getElementById("select-formation").value = '';
        document.getElementById("teamNameBox").value = '';

        const defaultColors = { mainColor: '#ff0000', secondColor: '#ffffff', numberColor: '#ffffff' };
        setCircleColor(defaultColors, 'main');
        setCirclePositions('433', 'main');
        setTextBoxOrders();
        //Clear out line up
        setLineUp(startKeyArray, secondKeyArray, 'back-up');
        setLineUp(startKeyArray, secondKeyArray, 'opposition');
    }
    else {
        startingArray = lineUpsObj[selectedValue].starting;
        secondArray = lineUpsObj[selectedValue].second;
        secondType = lineUpsObj[selectedValue].secondType;
        startKeyArray = lineUpsObj[selectedValue].keysArray;
        secondKeyArray = lineUpsObj[selectedValue].oppoKeysArray || lineUpsObj[selectedValue].keysArray;;
        var formattedFormation = lineUpsObj[selectedValue].formation.replaceAll('-', '').replaceAll(" ", "");

        document.getElementById("select-formation").value = formattedFormation;
        document.getElementById("teamNameBox").value = selectedValue;
        setCircleColor(lineUpsObj[selectedValue].colors, 'main');
        setCirclePositions(formattedFormation, 'main');
        if (secondType == 'opposition') {
            if (lineUpsObj[selectedValue].oppoColors) {
                setCircleColor(lineUpsObj[selectedValue].oppoColors, 'oppo');
            }
            if (lineUpsObj[selectedValue].oppoFormation) {
                var formattedOppoFormation = lineUpsObj[selectedValue].oppoFormation.replaceAll('-', '').replaceAll(" ", "")
                setOppoFormation(formattedOppoFormation);
                document.getElementById("oppo-formation").value = formattedOppoFormation;
            }
        }

        setLineUp(startKeyArray, secondKeyArray, secondType);

        //If specific position data is available, use it
        if (lineUpsObj[selectedValue].circlePositions) {
            var circlePositionString = lineUpsObj[selectedValue].circlePositions;
            const result = getSpecificCirclePositions(circlePositionString);
            for (var q = 0; q < 11; q++) {
                var circle = document.getElementById(result.arrayId[q]);
                circle.style.top = result.arrayTop[q];
                circle.style.left = result.arrayLeft[q];
            }
        }

        if (lineUpsObj[selectedValue].oppoCirclePositions) {
            var circlePositionString = lineUpsObj[selectedValue].oppoCirclePositions;
            const result = getSpecificCirclePositions(circlePositionString);
            for (var q = 0; q < 11; q++) {

                var circle = document.getElementById(result.arrayId[q]);
                circle.style.top = result.arrayTop[q];
                circle.style.left = result.arrayLeft[q];
            }
        }
        if (secondType == 'opposition') {
            setOppoTextBoxOrder();

        }
        setTextBoxOrders();
        determineFormation();

        const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
        if (displayValue == 'inline-block') {
            switchViews();
        }
    }
}

// Function to download JSON based on input
function downloadJSON() {
    // Create JSON data
    const jsonData = { "teamName": "", "formation": "", "starting": {}, "colors": {}, "secondType": "", "second": {} };
    if (checkOpposition.checked) {
        jsonData.oppoFormation = "";
        jsonData.oppoColors = {};
    }
    let formation = determineFormation();
    jsonData.formation = formation;

    const teamName = document.querySelector('#teamNameBox');
    jsonData.teamName = teamName.value;

    downloadButton.innerText = "Downloading.....";

    const startingContainers = document.querySelectorAll('.column.starting-column .input-container');
    startingContainers.forEach((container) => {
        let squadNumber = container.querySelector('.numberLabel').textContent.replace("#", '');
        const input = container.querySelector('.inputBox').value;
        var startingObj = {
            "name": input,
            "number": squadNumber
        };
        //Get the corresponding ID for this box
        let textboxId = container.querySelector('.numberLabel').htmlFor.replace('starting', '#');
        jsonData.starting[textboxId] = startingObj;
    });

    const secondContainers = document.querySelectorAll('.column.second-column .input-container');
    secondContainers.forEach((container) => {

        //Get the corresponding ID for this box
        let textboxId = container.querySelector('.positionLabel').htmlFor.replace('second', '#');
        const input = container.querySelector('.secondBox').value;
        //If opposition naming is true, the JSON format is changed to an Obj containing name and number
        if (checkOppositionName.checked) {
            jsonData.secondType = 'opposition';
            var oppoNumberId = "oppo" + textboxId.replace("#", "");
            var oppoObj = {
                "name": input,
                "number": document.getElementById(oppoNumberId).innerText
            }
            jsonData.second[textboxId] = oppoObj;
        }
        else {
            jsonData.secondType = 'back-up';
            jsonData.second[textboxId] = input;
        }

    });

    var allCirclePositions = getCirclePositions(mainCircles);

    jsonData.circlePositions = "" + allCirclePositions;

    jsonData.colors.mainColor = mainPickr.getColor().toHEXA().toString();
    jsonData.colors.secondColor = secondPickr.getColor().toHEXA().toString();
    jsonData.colors.numberColor = numberPickr.getColor().toHEXA().toString();

    if (checkOpposition.checked) {
        jsonData.oppoFormation = determineFormation('oppo').replaceAll('-', '').replaceAll(" ", "");
        jsonData.oppoColors.mainColor = mainOppoPickr.getColor().toHEXA().toString();
        jsonData.oppoColors.secondColor = secondOppoPickr.getColor().toHEXA().toString();
        jsonData.oppoColors.numberColor = numberOppoPickr.getColor().toHEXA().toString();

        var oppoCirclePositions = getCirclePositions(oppoCircles);
        jsonData.oppoCirclePositions = "" + oppoCirclePositions;
    }


    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Create a new Blob object with the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);

    // Programmatically click the anchor element to trigger the download
    if (teamName.value == '') {
        const reminder = document.getElementById('reminderLabel');
        reminder.style.display = "flex";

    }
    else {
        // Set the file name
        var teamFileName = teamName.value;
        teamFileName = teamFileName.replaceAll(' ', '_');
        teamFileName = teamFileName.replaceAll('/', '_');
        anchor.download = teamFileName.toLowerCase() + '.json';
        anchor.click();

    }
    downloadButton.innerText = "Download team (.JSON)";

    // Cleanup by revoking the object URL
    URL.revokeObjectURL(anchor.href);
}

// Function to load formation
function loadFormation() {
    const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
    if (displayValue == 'inline-block') {
        switchViews();
    }

    const selectedValue = this.value;
    setCirclePositions(selectedValue, 'main');
    setTextBoxOrders();
    determineFormation();
}

//Imports the JSON into the tool
function importJSON() {
    const file = jsonFileInput.files[0];
    try {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const jsonString = e.target.result;
                const jsonData = JSON.parse(jsonString);
                const startingCount = Object.keys(jsonData.starting).length;
                const secondCount = Object.keys(jsonData.second).length;
                if (startingCount == 11 && secondCount == 11) {
                    startingArray = [];
                    secondArray = [];
                    startKeyArray = [];
                    secondType = jsonData.secondType;
                    for (const [key, value] of Object.entries(jsonData.starting)) {
                        var valueObj = {
                            "name": value.name,
                            "number": value.number
                        };
                        startingArray.push(valueObj);
                        startKeyArray.push(key);
                    }
                    for (const [key, value] of Object.entries(jsonData.second)) {
                        if (secondType == 'opposition') {
                            var valueObj = {
                                "name": value.name,
                                "number": value.number
                            };
                            secondArray.push(valueObj);
                        }
                        else {
                            secondArray.push(value);
                        }
                        secondKeyArray.push(key);
                    }
                    if (jsonData.secondType == 'opposition') {
                        document.getElementById("oppo-checkbox-true").checked = true;
                        document.getElementById("oppo-column-checkbox-true").checked = true;
                        oppoCheckBox();
                        oppoNameCheckBox();
                    }

                    document.getElementById("teamNameBox").value = jsonData.teamName;
                    setCircleColor(jsonData.colors, 'main');
                    setCirclePositions(jsonData.formation.replaceAll('-', '').replaceAll(' ', ''), 'main');
                    setTextBoxOrders();
                    setLineUp(startKeyArray, secondKeyArray, secondType);
                    determineFormation();
                    if (secondType == 'opposition') {
                        if (jsonData.oppoColors) {
                            setCircleColor(jsonData.oppoColors, 'oppo');
                        }
                        if (jsonData.oppoFormation) {
                            setOppoFormation(jsonData.oppoFormation.replaceAll('-', '').replaceAll(" ", ""));
                        }
                    }

                    if (jsonData.circlePositions) {
                        var circlePositionString = jsonData.circlePositions;
                        const result = getSpecificCirclePositions(circlePositionString);
                        for (var q = 0; q < 11; q++) {
                            var circle = document.getElementById(result.arrayId[q]);
                            circle.style.top = result.arrayTop[q];
                            circle.style.left = result.arrayLeft[q];
                        }
                    }

                    if (jsonData.oppoCirclePositions) {
                        var circlePositionString = jsonData.oppoCirclePositions;
                        const result = getSpecificCirclePositions(circlePositionString);
                        for (var q = 0; q < 11; q++) {
                            var circle = document.getElementById(result.arrayId[q]);
                            circle.style.top = result.arrayTop[q];
                            circle.style.left = result.arrayLeft[q];
                        }
                    }
                }
                else {
                    throw Error("Uploaded JSON not valid. Please check the help button for the correct JSON format.");
                }

            };
            reader.readAsText(file);
            chooseFileButton.innerHTML = "Upload your team";
            importButton.style.display = 'none';

        }
    }
    catch (ex) {
        alert("Uploaded JSON not valid. Please check the help button for the correct JSON format.");
        console.error(ex);
    }
}

//Clears the names from the input boxes
function clearNames() {
    var allInputContainers = document.querySelectorAll('.inputBox, .secondBox');
    allInputContainers.forEach((inputContainer) => {
        inputContainer.value = '';
        
        //Reset local storage items for starting input
        if (inputContainer.id.indexOf('starting') > -1) {
            localStorage.setItem(inputContainer.id, '');
        }
        //Reset local storage items for oppo and backup input
        else if (inputContainer.id.toString().indexOf('second') > -1) {
            var backupStorageName = 'backup' + inputContainer.id;
            var oppoStorageName = 'oppo' + inputContainer.id;
            localStorage.setItem(backupStorageName, '');
            localStorage.setItem(oppoStorageName, '');
        }
    });

    var allOutputBoxes = document.querySelectorAll('.outputStarting, .outputSecond, .outputOpponent');
    allOutputBoxes.forEach((outputBox) => {
        outputBox.innerHTML = '';
        toggleOutputBoxVisibility(outputBox);
    });
    selectTeam.value = 'clear';
}

//Clears the arrows on the pitch
function clearArrows() {
    var allLines = document.querySelectorAll('.normalLine, .movingLine');
    allLines.forEach((lineElement) => {
        lineElement.parentNode.removeChild(lineElement);
    });
    lines = [];
    movingLines = [];
    arrowLocationArray = [];
    var playButton = document.querySelector('.play-checkbox .checkmark');
    if (playButton.classList.toString().indexOf('orangeBackgroundButton') > -1) {
        playButton.classList.remove('orangeBackgroundButton');
    }
    localStorage.removeItem('lineInfo');
}

// Resets the upload button if selectTeam is changed
function updateUploadButton() {
    var selectBox = document.getElementById("select-team");
    var chooseFileButton = document.getElementById("chooseFileButton");
    var jsonFileInput = document.getElementById("jsonFileInput");

    if (selectBox.value !== "clear") {
        chooseFileButton.innerHTML = "Upload your team";
        importButton.style.display = 'none';
        jsonFileInput.value = "";
    }
}

function moveCircles() {
    if (playCheck.checked) {
        if (arrowLocationArray.length > 0) {
            circleCheck.disabled = true;
            arrowCheck.disabled = true;
            playCheck.disabled = true;
            blueArrowCheckFalse.disabled = true;
            blueArrowCheckTrue.disabled = true;
            for (var q = 0; q < arrowLocationArray.length; q++) {
                var circleTest = document.getElementById(arrowLocationArray[q].id);
                var lineElement = circleTest.querySelector('.movingLine');
                lineElement.style.display = 'none';

                //Get previous transform X and Y to add to the current position
                var computedStyle = window.getComputedStyle(circleTest);
                var transformMatrix = new DOMMatrix(computedStyle.transform);

                var xTranslation = transformMatrix.m41;
                var yTranslation = transformMatrix.m42;

                // Calculate the new position
                var currentX = circleTest.getBoundingClientRect().left;
                var currentY = circleTest.getBoundingClientRect().top;
                var targetX = currentX - arrowLocationArray[q].left + xTranslation;
                var targetY = currentY + arrowLocationArray[q].top + yTranslation;


                // Apply the new position using a CSS transform
                circleTest.style.transform = `translate(${targetX - currentX}px, ${targetY - currentY}px)`;
            }

            setTimeout(function () {

                //Set to empty, so that another button press resets the location
                playCheck.disabled = false;
            }, animationDuration);
        }
        else {
            playCheck.checked = false;
        }
    }
    else {
        playCheck.disabled = true;
        allCircles.forEach((circle) => {
            circle.style.transform = '';

        });

        // Schedule your script to run after the animation duration
        setTimeout(function () {
            // This code block will execute after the animation is expected to have ended
            //If 'Show pressing lines' switch is set to 'Hide', don't show the arrows
            if (blueArrowCheckTrue.checked) {
                var lineElements = document.querySelectorAll('.movingLine');
                lineElements.forEach((lineElement) => {
                    lineElement.style.display = 'block';
                });
            }
            circleCheck.disabled = false;
            arrowCheck.disabled = false;
            playCheck.disabled = false;

            blueArrowCheckFalse.disabled = false;
            blueArrowCheckTrue.disabled = false;

        }, animationDuration);

    }
}

