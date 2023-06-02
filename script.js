const lineUpsObj = {};
var startingArray = [];
var backupArray = [];

const jsonFileInput = document.getElementById('jsonFileInput');
const chooseFileButton = document.getElementById('chooseFileButton');
const importButton = document.getElementById('importButton');
const circles = document.querySelectorAll(".circle");
const inputBoxes = document.querySelectorAll(".inputBox");
const backupBoxes = document.querySelectorAll(".backupBox");
const outputStartings = document.querySelectorAll(".outputStarting");
const outputBackups = document.querySelectorAll(".outputBackup");

//Changes color and name of the upload button
jsonFileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        chooseFileButton.textContent = file.name;
        importButton.style.backgroundColor = 'blue';
        importButton.style.display = 'inline-block';
    } else {
        chooseFileButton.textContent = 'Upload your team here';
        importButton.style.display = 'none';
    }
});

//Reads the JSON uploaded and stores it in the textboxes
importButton.addEventListener('click', function () {
    const file = jsonFileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const jsonString = e.target.result;
            const jsonData = JSON.parse(jsonString);
            const startingCount = Object.keys(jsonData.starting).length;
            const backupCount = Object.keys(jsonData.backup).length;
            if (startingCount == 11 && backupCount == 11) {
                startingArray = [];
                backupArray = [];
                for (const [key, value] of Object.entries(jsonData.starting)) {
                    startingArray.push(value);
                }
                for (const [key, value] of Object.entries(jsonData.backup)) {
                    backupArray.push(value);
                }
                setLineUp();
                setCirclePositions(jsonData.formation.replaceAll('-',''));
                document.getElementById("colorPickerMain").value = jsonData.colors.mainColor;
                document.getElementById("colorPickerSecond").value = jsonData.colors.secondColor;
                document.getElementById("colorPickerNumber").value = jsonData.colors.numberColor;
                updateCircleColors(jsonData.colors.mainColor, jsonData.colors.secondColor, jsonData.colors.numberColor);
            }
            else {
                alert("Uploaded JSON not valid. Please check the help button for the correct JSON format.");
            }

        };
        reader.readAsText(file);
    } else {
        console.log('No file selected.');
    }
});


//Pre loads the JSON files stored locally
document.addEventListener("DOMContentLoaded", function () {
    const jsonFiles = ['2022-23.json', '2023-24.json', 'Voorwaarts4.json'];
    const teamLineups = jsonFiles.map(file => fetch(file).then(response => response.json()));
    Promise.all(teamLineups)
        .then(data => {
            // Process the fetched JSON data
            data.forEach(jsonData => {
                // Access the data for each JSON file
                const info = jsonData.info;
                const starting = Object.values(jsonData.starting);
                const backup = Object.values(jsonData.backup);
                lineUpsObj[info] = {};
                lineUpsObj[info].starting = starting;
                lineUpsObj[info].backup = backup;
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

});

//Adds drag functionality
circles.forEach((circle, index) => {
    const outputStarting = outputStartings[index];
    const outputBackup = outputBackups[index];

    inputBoxes[index].addEventListener("input", function () {
        outputStarting.innerText = this.value;
        toggleOutputBoxVisibility(outputStarting, this.value);

    });

    backupBoxes[index].addEventListener("input", function () {
        outputBackup.innerText = this.value;
        toggleOutputBoxVisibility(outputBackup, this.value);
    });

    let activeCircle = null;
    let initialX = 0;
    let initialY = 0;
    let offsetX = 0;
    let offsetY = 0;

    circle.addEventListener("mousedown", startDrag);
    circle.addEventListener("mouseup", stopDrag);

    function startDrag(e) {
        e.preventDefault();
        activeCircle = this;
        initialX = e.clientX;
        initialY = e.clientY;
        offsetX = activeCircle.offsetLeft;
        offsetY = activeCircle.offsetTop;

        document.addEventListener("mousemove", dragCircle);
        document.addEventListener("mouseup", dropCircle);
    }

    function stopDrag() {
        activeCircle = null;
        document.removeEventListener("mousemove", dragCircle);
        document.removeEventListener("mouseup", dropCircle);
    }

    function dragCircle(e) {
        if (activeCircle) {
            e.preventDefault();
            const currentX = e.clientX - initialX;
            const currentY = e.clientY - initialY;

            var newX = offsetX + currentX;
            var newY = offsetY + currentY;

            if (newX > 85 && newX < 555) {
                activeCircle.style.left = offsetX + currentX + "px";
            }
            if (newY > 45 && newY < 750) {
                activeCircle.style.top = offsetY + currentY + "px";
            }
            console.log(activeCircle.style.left);
            console.log(activeCircle.style.top);
            determineLabel(parseInt(activeCircle.style.left), parseInt(activeCircle.style.top), index);
        }
    }

    function dropCircle() {
        if (activeCircle) {
            offsetX += parseInt(activeCircle.style.left);
            offsetY += parseInt(activeCircle.style.top);
            activeCircle = null;
        }
    }
});

//Shows/hides textboxes below circles based on input
function toggleOutputBoxVisibility(box, inputValue) {

    if (inputValue.trim() !== "") {
        box.style.display = "block";
    } else if (box.style.display != "none") {
        box.style.display = "none";
    }
}

//Determines position label before the text box
function determineLabel(xPos, yPos, index) {
    console.log("XPOS: " + xPos + " | YPOS: " + yPos + " || INDEX: " + index);
    const labels = document.querySelectorAll(".label");
    if (xPos >= 200 && xPos <= 440 && yPos >= 675 && yPos <= 750) {
        labels[index].innerHTML = "GK:";
        labels[index + 11].innerHTML = "GK:";
    } else if (xPos >= 465 && xPos <= 565 && yPos >= 535 && yPos <= 760) {
        labels[index].innerHTML = "RB:";
        labels[index + 11].innerHTML = "RB:";
    } else if (xPos >= 70 && xPos <= 175 && yPos >= 535 && yPos <= 760) {
        labels[index].innerHTML = "LB:";
        labels[index + 11].innerHTML = "LB:";
    } else if (xPos >= 370 && xPos <= 465 && yPos >= 560 && yPos <= 675) {
        labels[index].innerHTML = "RCV:";
        labels[index + 11].innerHTML = "RCV:";
    } else if (xPos >= 270 && xPos <= 370 && yPos >= 560 && yPos <= 675) {
        labels[index].innerHTML = "CV:";
        labels[index + 11].innerHTML = "CV:";
    } else if (xPos >= 175 && xPos <= 270 && yPos >= 560 && yPos <= 675) {
        labels[index].innerHTML = "LCV:";
        labels[index + 11].innerHTML = "LCV:";
    } else if (xPos >= 440 && xPos <= 565 && yPos >= 395 && yPos <= 535) {
        labels[index].innerHTML = "RWB:";
        labels[index + 11].innerHTML = "RWB:";
    } else if (xPos >= 200 && xPos <= 440 && yPos >= 444 && yPos <= 560) {
        labels[index].innerHTML = "DMC:";
        labels[index + 11].innerHTML = "DMC:";
    } else if (xPos >= 75 && xPos <= 200 && yPos >= 395 && yPos <= 535) {
        labels[index].innerHTML = "LWB:";
        labels[index + 11].innerHTML = "LWB:";
    } else if (xPos >= 440 && xPos <= 565 && yPos >= 280 && yPos <= 395) {
        labels[index].innerHTML = "RM:";
        labels[index + 11].innerHTML = "RM:";
    } else if (xPos >= 200 && xPos <= 440 && yPos >= 300 && yPos <= 444) {
        labels[index].innerHTML = "MC:";
        labels[index + 11].innerHTML = "MC:";
    } else if (xPos >= 75 && xPos <= 200 && yPos >= 280 && yPos <= 395) {
        labels[index].innerHTML = "LM:";
        labels[index + 11].innerHTML = "LM:";
    } else if (xPos >= 440 && xPos <= 565 && yPos >= 35 && yPos <= 280) {
        labels[index].innerHTML = "RW:";
        labels[index + 11].innerHTML = "RW:";
    } else if (xPos >= 200 && xPos <= 440 && yPos >= 185 && yPos <= 300) {
        labels[index].innerHTML = "AMC:";
        labels[index + 11].innerHTML = "AMC:";
    } else if (xPos >= 75 && xPos <= 200 && yPos >= 35 && yPos <= 280) {
        labels[index].innerHTML = "LW:";
        labels[index + 11].innerHTML = "LW:";
    } else if (xPos >= 200 && xPos <= 440 && yPos >= 35 && yPos <= 185) {
        labels[index].innerHTML = "ST:";
        labels[index + 11].innerHTML = "ST:";
    }
}

//Sets the line up based on the JSON content
const selectTeam = document.getElementById("select-team");
selectTeam.addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue === "ajax-22-23") {
        startingArray = lineUpsObj['Ajax 2022-2023'].starting;
        backupArray = lineUpsObj['Ajax 2022-2023'].backup;
    } else if (selectedValue === "ajax-23-24") {
        startingArray = lineUpsObj['Ajax 2023-2024'].starting;
        backupArray = lineUpsObj['Ajax 2023-2024'].backup;
    } else if (selectedValue === "voorwaarts-23-24") {
        startingArray = lineUpsObj['Voorwaarts 2023-2024'].starting;
        backupArray = lineUpsObj['Voorwaarts 2023-2024'].backup;
    } else if (selectedValue === "clear") {
        startingArray = [];
        backupArray = [];
    }

    //Changes color of the jersey
    if (selectedValue.indexOf('oorwaarts') > -1) {
        const circleClass = document.querySelectorAll(".circle");
        for (var i = 1; i < circleClass.length; i++) {
            circleClass[i].style.backgroundColor = '#006631';
            circleClass[i].style.borderColor = '#000000';
            circleClass[i].querySelector(".circle-number").style.color = '#FFFFFF';

            document.getElementById("colorPickerMain").value = '#006631';
            document.getElementById("colorPickerSecond").value = '#000000';
            document.getElementById("colorPickerNumber").value = '#FFFFFF';
        }
    }
    else {
        const circleClass = document.querySelectorAll(".circle");
        for (var i = 1; i < circleClass.length; i++) {
            circleClass[i].style.backgroundColor = '#FF0000';
            circleClass[i].style.borderColor = '#FFFFFF';
            circleClass[i].querySelector(".circle-number").style.color = '#FFFFFF';
            
            document.getElementById("colorPickerMain").value = '#FF0000';
            document.getElementById("colorPickerSecond").value = '#FFFFFF';
            document.getElementById("colorPickerNumber").value = '#FFFFFF';
        }
    }

    setLineUp();

});

function updateCircleColors(colorPickerMain, colorPickerSecond, colorPickerNumber) {
    if(colorPickerMain == null){
        colorPickerMain = document.getElementById("colorPickerMain").value;
    }
    if(colorPickerSecond == null){
        colorPickerSecond = document.getElementById("colorPickerSecond").value;
    }
    if(colorPickerNumber == null){
        colorPickerNumber = document.getElementById("colorPickerNumber").value;
    }
    const circleClass = document.querySelectorAll(".circle");
    for (var i = 1; i < circleClass.length; i++) {
        circleClass[i].style.backgroundColor = colorPickerMain;
        circleClass[i].style.borderColor = colorPickerSecond;
        circleClass[i].querySelector(".circle-number").style.color = colorPickerNumber;
    }
    
}

function setLineUp() {
    //Sets the value of each output textbox
    inputBoxes.forEach((inputBox, index) => {
        inputBox.value = startingArray[index] || "";
        toggleOutputBoxVisibility(outputStartings[index], inputBox.value);
        backupBoxes[index].value = backupArray[index] || "";
        toggleOutputBoxVisibility(outputBackups[index], backupBoxes[index].value);
        outputStartings[index].innerText = inputBox.value;
        outputBackups[index].innerText = backupBoxes[index].value;
    });
}

function updateUploadButton() {
    var selectBox = document.getElementById("select-team");
    var chooseFileButton = document.getElementById("chooseFileButton");

    if (selectBox.value !== "clear") {
        chooseFileButton.innerHTML = "Upload your team here";
        importButton.style.display = 'none';
    }
}

//Creates a JSON based on the line up made by the user
document.getElementById('downloadButton').addEventListener('click', function () {
    // Create JSON data
    const jsonData = { "info": "", "formation": "", "starting": {}, "backup": {}, "colors": {} };

    const defenseArr = ['RB', 'RCV', 'CV', 'LCV', 'LB', 'RWB', 'LWB'];
    const midfieldArr = ['DMC', 'RM', 'LM', 'MC', 'AMC'];
    const attackArr = ['RW', 'LW', 'ST'];

    let defenseNr = 0;
    let midfieldNr = 0;
    let attackNr = 0;

    const teamName = document.querySelector('#teamNameBox');
    jsonData.info = teamName.value;
    const startingContainers = document.querySelectorAll('.column.starting-column .input-container');
    startingContainers.forEach((container, index) => {
        let label = container.querySelector('.label').textContent;
        const input = container.querySelector('.inputBox').value;
        label = label.replaceAll(":", "");
        if(defenseArr.includes(label)){
            defenseNr++;
        }
        else if(midfieldArr.includes(label)){
            midfieldNr++;
        }
        else if(attackArr.includes(label)){
            attackNr++;
        }
        if (Object.keys(jsonData.starting).includes(label)) {
            let newLabel = label + "2"; // Append "2" to the existing label
            let counter = 3;

            // Generate a new label by adding a number suffix until a unique label is found
            while (Object.keys(jsonData.starting).includes(newLabel)) {
                newLabel = label + counter;
                counter++;
            }
            jsonData.starting[newLabel] = input; // Add the input with the new label
        } else {
            jsonData.starting[label] = input;
        }
    });

    let formation = "" + defenseNr + midfieldNr + attackNr;
    jsonData.formation = formation;

    const backupContainers = document.querySelectorAll('.column.backup-column .input-container');
    backupContainers.forEach((container, index) => {
        let label = container.querySelector('.label').textContent;
        const input = container.querySelector('.backupBox').value;
        label = label.replaceAll(":", "");
        if (Object.keys(jsonData.backup).includes(label)) {
            let newLabel = label + "2"; // Append "2" to the label
            let counter = 3;

            // Generate a new label by adding a number suffix until a unique label is found
            while (Object.keys(jsonData.backup).includes(newLabel)) {
                newLabel = label + counter;
                counter++;
            }
            jsonData.backup[newLabel] = input; // Add the input with the new label
        } else {
            jsonData.backup[label] = input;
        }
    });

    var keysToUseST = getExistingKeys(jsonData.starting);

    const updatedStarting = Object.entries(jsonData.starting).reduce((result, [key, value]) => {
        if (keysToUseST.includes(key)) {
            const updatedKey = key + "1";
            result[updatedKey] = value;
        } else {
            result[key] = value;
        }
        return result;
    }, {});
    jsonData.starting = updatedStarting;

    var keysToUseBU = getExistingKeys(jsonData.backup);
    const updatedBackup = Object.entries(jsonData.backup).reduce((result, [key, value]) => {
        if (keysToUseBU.includes(key)) {
            const updatedKey = key + "1";
            result[updatedKey] = value;
        } else {
            result[key] = value;
        }
        return result;
    }, {});
    jsonData.backup = updatedBackup;

    var colorPickerMain = document.getElementById("colorPickerMain");
    var colorPickerSecond = document.getElementById("colorPickerSecond");
    var colorPickerNumber = document.getElementById("colorPickerNumber");

    jsonData.colors.mainColor = colorPickerMain.value;
    jsonData.colors.secondColor = colorPickerSecond.value;
    jsonData.colors.numberColor = colorPickerNumber.value;
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
        console.log(reminder);
        reminder.style.display = 'block';
    }
    else {
        // Set the file name
        var teamFileName = teamName.value.toString().replaceAll(' ', '-');
        anchor.download = teamFileName.toLowerCase() + '.json';
        anchor.click();
    }
    // Cleanup by revoking the object URL
    URL.revokeObjectURL(anchor.href);

    function getExistingKeys() {
        var duplicatePositions = [];
        const existingKeys = Object.keys(jsonData.starting);
        existingKeys.forEach(key => {
            if (key.includes("2")) {
                duplicatePositions.push(key.replace("2", ""));
            }
        });
        return duplicatePositions;
    }
});

//Sets the formation based on selection
const selectFormation = document.getElementById("select-formation");
selectFormation.addEventListener("change", function () {
    const selectedValue = this.value;
    setCirclePositions(selectedValue);
});

function setCirclePositions(formationValue) {
    if (formationValue === "442") {
        circles[0].style.top = '76%'; circles[0].style.left = '47%';    //#1
        circles[1].style.top = '60%'; circles[1].style.left = '78%';    //#2
        circles[2].style.top = '65%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '65%'; circles[3].style.left = '34%';    //#4
        circles[4].style.top = '60%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '52%'; circles[5].style.left = '47%';    //#6
        circles[6].style.top = '40%'; circles[6].style.left = '24%';     //#8
        circles[7].style.top = '28%'; circles[7].style.left = '47%';    //#10
        circles[8].style.top = '40%'; circles[8].style.left = '70%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '60%';    //#9
        circles[10].style.top = '10%'; circles[10].style.left = '34%';    //#11
    }
    else if (formationValue === "532") {
        circles[0].style.top = '76%'; circles[0].style.left = '47%';    //#1
        circles[1].style.top = '65%'; circles[1].style.left = '67%';    //#2
        circles[2].style.top = '65%'; circles[2].style.left = '47%';    //#3
        circles[3].style.top = '65%'; circles[3].style.left = '27%';    //#4
        circles[4].style.top = '45%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '50%'; circles[5].style.left = '57%';    //#6
        circles[6].style.top = '44%'; circles[6].style.left = '37%';     //#8
        circles[7].style.top = '28%'; circles[7].style.left = '47%';    //#10
        circles[8].style.top = '45%'; circles[8].style.left = '78%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '60%';    //#9
        circles[10].style.top = '10%'; circles[10].style.left = '34%';    //#11
    }
    else {
        circles[0].style.top = '76%'; circles[0].style.left = '47%';    //#1
        circles[1].style.top = '60%'; circles[1].style.left = '78%';    //#2
        circles[2].style.top = '65%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '65%'; circles[3].style.left = '34%';    //#4
        circles[4].style.top = '60%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '50%'; circles[5].style.left = '52%';    //#6
        circles[6].style.top = '38%'; circles[6].style.left = '34%';     //#8
        circles[7].style.top = '28%'; circles[7].style.left = '57%';    //#10
        circles[8].style.top = '13%'; circles[8].style.left = '78%';    //#7
        circles[9].style.top = '5%'; circles[9].style.left = '47%';    //#9
        circles[10].style.top = '13%'; circles[10].style.left = '16%';    //#11
    } 
    circles.forEach((circle, index) => {
        var posX = (parseInt(circle.style.left) / 100) * 680;
        var posY = (parseInt(circle.style.top) / 100) * 900;
        determineLabel(posX, posY, index);
    });
    console.log(circles[10].style.top);
}
// Initial update on page load
selectTeam.dispatchEvent(new Event("change"));