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

//Sets the oppo formation based on formation select box
oppoFormation.addEventListener("change", function () {
    setOppoFormation(this.value);
});


function downloadImage() {
    var lineupContainer = document.getElementById("lineupContainer");

    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
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

    const selectedValue = this.value;
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }
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
                setOppoFormation(lineUpsObj[selectedValue].oppoFormation.replaceAll('-', '').replaceAll(" ", ""));
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

    }
}

// Function to download JSON based on input
function downloadJSON() {
    // Create JSON data
    const jsonData = { "teamName": "", "formation": "", "starting": {}, "colors": {}, "secondType": "", "second": {} };
    if (checkOppositionName.checked) {
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
        let squadNumber = container.querySelector('.label-position').textContent.replace("#", '');
        const input = container.querySelector('.inputBox').value;
        var startingObj = {
            "name": input,
            "number": squadNumber
        };
        //Get the corresponding ID for this box
        let textboxId = container.querySelector('.label-position').htmlFor.replace('starting', '#');
        jsonData.starting[textboxId] = startingObj;
    });

    const secondContainers = document.querySelectorAll('.column.second-column .input-container');
    secondContainers.forEach((container) => {

        //Get the corresponding ID for this box
        let textboxId = container.querySelector('.label').htmlFor.replace('second', '#');
        const input = container.querySelector('.secondBox').value;
        //If opposition naming is true, the JSON format is changed to an Obj containing name and number
        if (checkOppositionName.checked) {
            var oppoNumberId = "oppo" + textboxId.replace("#", "");
            var oppoObj = {
                "name": input,
                "number": document.getElementById(oppoNumberId).innerText
            }
            jsonData.second[textboxId] = oppoObj;
        }
        else {
            jsonData.second[textboxId] = input;
        }

    });

    var allCirclePositions = "#";
    mainCircles.forEach((circle) => {
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
        allCirclePositions += circle.id + "T" + circleStyleTop + "L" + circleStyleLeft + "#";
    });

    jsonData.circlePositions = "" + allCirclePositions;

    jsonData.colors.mainColor = document.getElementById("colorPickerMain").value;
    jsonData.colors.secondColor = document.getElementById("colorPickerSecond").value;
    jsonData.colors.numberColor = document.getElementById("colorPickerNumber").value;

    if (checkOppositionName.checked) {
        jsonData.secondType = 'opposition';
        jsonData.oppoFormation = determineFormation('oppo').replaceAll('-', '').replaceAll(" ", "");
        jsonData.oppoColors.mainColor = document.getElementById("oppoColorMain").value;
        jsonData.oppoColors.secondColor = document.getElementById("oppoColorSecond").value;
        jsonData.oppoColors.numberColor = document.getElementById("oppoColorNumber").value;

        var oppoCirclePositions = "#";
        oppoCircles.forEach((circle) => {
            oppoCirclePositions += circle.id + "T" + circle.style.top + "L" + circle.style.left + "#";
        });

        jsonData.oppoCirclePositions = "" + oppoCirclePositions;
    }
    else {
        jsonData.secondType = 'back-up';
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
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
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
                        document.getElementById("oppo-checkbox").checked = true;
                        document.getElementById("oppo-name-checkbox").checked = true;
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
    var circleCheck = document.getElementById("circle-checkbox");
    var arrowCheck = document.getElementById("arrow-checkbox");
    var movingCheck = document.getElementById("moving-checkbox");
    var playCheck = document.getElementById("play-checkbox");
    if (playCheck.checked) {
        if (arrowLocationArray.length > 0) {
            circleCheck.disabled = true;
            arrowCheck.disabled = true;
            playCheck.disabled = true;
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
        else{
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
            var lineElements = document.querySelectorAll('.movingLine');
            lineElements.forEach((lineElement) => {
                lineElement.style.display = 'block';
            });
            circleCheck.disabled = false;
            arrowCheck.disabled = false;
            playCheck.disabled = false;
        }, animationDuration);
    }
}

