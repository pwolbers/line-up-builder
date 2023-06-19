const lineUpsObj = {};
var startingArray = [];
var backupArray = [];
var startKeyArray = [];
var backupKeyArray = [];

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
        if (file.name.length > 28) {
            const truncatedFilename = file.name.substring(0, 28) + '...';
            chooseFileButton.textContent = truncatedFilename;
        } else {
            chooseFileButton.textContent = file.name;
        }
        importButton.style.backgroundColor = 'blue';
        importButton.style.display = 'inline-block';
    } else {
        chooseFileButton.textContent = 'Upload your team here';
        importButton.style.display = 'none';
    }
});

window.onload = () => {
    setCirclePositions('433');
    var json = {
        "teamName": "Barcelona 2009 CL Final",
        "formation": "433",
        "starting": {
            "#1": "Valdés",
            "#2": "Puyol",
            "#3": "Touré",
            "#4": "Piqué",
            "#5": "Sylvinho",
            "#6": "Busquets",
            "#7": "Messi",
            "#8": "Xavi",
            "#9": "Eto'o",
            "#10": "Iniesta",
            "#11": "Henry"
        },
        "backup": {
            "#1": "Pinto",
            "#2": "",
            "#3": "Cáceres",
            "#4": "Muniesa",
            "#5": "",
            "#6": "",
            "#7": "Pedro",
            "#8": "Keita",
            "#9": "Gudjohnsen",
            "#10": "",
            "#11": "Bojan"
        },
        "colors": {
            "mainColor": "#004D98",
            "secondColor": "#A50044",
            "numberColor": "#EDBB00"
        }
    };

    var formattedJSON = JSON.stringify(json, null, 2);
    document.getElementById("jsonContainer").innerText = formattedJSON;
}


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

                setCirclePositions(jsonData.formation.replaceAll('-', ''));

                startingArray = [];
                backupArray = [];
                keyArray = [];
                for (const [key, value] of Object.entries(jsonData.starting)) {
                    startingArray.push(value);
                    keyArray.push(key);
                }
                for (const [key, value] of Object.entries(jsonData.backup)) {
                    backupArray.push(value);
                    backupKeyArray.push(key);
                }

                setLineUp();

                var mainColor = getHexCode(jsonData.colors.mainColor);
                var secondColor = getHexCode(jsonData.colors.secondColor);
                var numberColor = getHexCode(jsonData.colors.numberColor);

                document.getElementById("colorPickerMain").value = mainColor;
                document.getElementById("colorPickerSecond").value = secondColor;
                document.getElementById("colorPickerNumber").value = numberColor;

                updateCircleColors(jsonData.colors.mainColor, jsonData.colors.secondColor, jsonData.colors.numberColor);

                document.getElementById("teamNameBox").value = jsonData.teamName;
                setTextBoxOrders();
            }
            else {
                alert("Uploaded JSON not valid. Please check the help button for the correct JSON format.");
            }

        };
        reader.readAsText(file);
        chooseFileButton.innerHTML = "Upload your team here";
        importButton.style.display = 'none';

    } else {
        console.log('No file selected.');
    }
});

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

//Pre loads the JSON files stored locally
document.addEventListener("DOMContentLoaded", function () {
    const jsonFiles = ['2022-23.json', '2023-24.json', 'Voorwaarts4.json'];
    const teamLineups = jsonFiles.map(file => fetch(file).then(response => response.json()));
    Promise.all(teamLineups)
        .then(data => {
            // Process the fetched JSON data
            data.forEach(jsonData => {
                // Access the data for each JSON file
                const teamName = jsonData.teamName;
                lineUpsObj[teamName] = {};
                lineUpsObj[teamName].teamName = teamName;
                lineUpsObj[teamName].formation = jsonData.formation;
                lineUpsObj[teamName].starting = Object.values(jsonData.starting);
                lineUpsObj[teamName].backup = Object.values(jsonData.backup);
                lineUpsObj[teamName].colors = {};
                lineUpsObj[teamName].colors.mainColor = jsonData.colors.mainColor;
                lineUpsObj[teamName].colors.secondColor = jsonData.colors.secondColor;
                lineUpsObj[teamName].colors.numberColor = jsonData.colors.numberColor;
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
    circle.addEventListener("touchstart", startDrag);

    function startDrag(e) {
        e.preventDefault();
        if (e.type === "mousedown") {
            activeCircle = this;
            initialX = e.clientX;
            initialY = e.clientY;
        } else if (e.type === "touchstart") {
            activeCircle = this;
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        }
        offsetX = activeCircle.offsetLeft;
        offsetY = activeCircle.offsetTop;
        document.addEventListener("mousemove", dragCircle);
        document.addEventListener("touchmove", dragCircle, { passive: false });
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }

    function stopDrag() {
        activeCircle = null;
        document.removeEventListener("mousemove", dragCircle);
        document.removeEventListener("touchmove", dragCircle);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchend", stopDrag);
        setTextBoxOrders();
    }

    function dragCircle(e) {
        if (activeCircle) {
            e.preventDefault();

            let currentX, currentY;

            if (e.type === "mousemove") {
                currentX = e.clientX;
                currentY = e.clientY;
            } else if (e.type === "touchmove") {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            }

            const deltaX = currentX - initialX;
            const deltaY = currentY - initialY;

            const newX = offsetX + deltaX;
            const newY = offsetY + deltaY;

            if (newX > 88 && newX < 590) {
                activeCircle.style.left = `${newX}px`;
            }
            if (newY > 48 && newY < 800) {
                activeCircle.style.top = `${newY}px`;
            }

            setTextBoxOrders();
            determineFormation();
        }
    }
});

function setTextBoxOrders() {
    //Gets order of circles based on first their y and then their x (7 11 9)
    var startingCircleArray = getCurrentCircleOrder();
    var backupCircleArray = getCurrentCircleOrder();
    var startingColumn = document.querySelector('.starting-column');
    var startingContainers = startingColumn.getElementsByClassName('input-container');

    var backupColumn = document.querySelector('.backup-column');
    var backupContainers = backupColumn.getElementsByClassName('input-container');

    addInputContainersInOrder(startingContainers, startingCircleArray, 'starting');
    addInputContainersInOrder(backupContainers, backupCircleArray, 'backup');

    startingCircleArray.forEach((circle, index) => {
        var posX = circle.x;
        var posY = circle.y;
        determineLabel(posX, posY, index);
    });

    backupCircleArray.forEach((circle, index) => {
        var posX = circle.x;
        var posY = circle.y;
        determineLabel(posX, posY, index);
    });
}

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
    else if (column == 'backup') {
        var column = document.querySelector('.backup-column');

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

function getCurrentCircleOrder() {
    const listOfCircles = document.querySelectorAll(".circle");
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
        //Adds a buffer of 75px (if within 75px, it's considered the same y)
        if (Math.abs(a.y - b.y) < 50) {
            return a.x > b.x ? -1 : 1
        } else {
            return a.y > b.y ? -1 : 1
        }
    })
    return circleArray;
}

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
    const inputBoxes = document.querySelectorAll(".inputBox");
    const backupBoxes = document.querySelectorAll(".backupBox");
    const labels = document.querySelectorAll(".label");
    if (xPos >= 190 && xPos <= 490 && yPos >= 675 && yPos <= 800) {
        labels[index].innerHTML = "GK";
        labels[index + 11].innerHTML = "GK";
        inputBoxes[index].placeholder = "Starting GK";
        backupBoxes[index].placeholder = "Back-up GK";
    } else if (xPos >= 490 && xPos <= 610 && yPos >= 535 && yPos <= 800) {
        labels[index].innerHTML = "RB";
        labels[index + 11].innerHTML = "RB";
        inputBoxes[index].placeholder = "Starting RB";
        backupBoxes[index].placeholder = "Back-up RB";
    } else if (xPos >= 70 && xPos <= 190 && yPos >= 535 && yPos <= 800) {
        labels[index].innerHTML = "LB";
        labels[index + 11].innerHTML = "LB";
        inputBoxes[index].placeholder = "Starting LB ";
        backupBoxes[index].placeholder = "Back-up LB";
    } else if (xPos >= 400 && xPos <= 490 && yPos >= 535 && yPos <= 675) {
        labels[index].innerHTML = "RCB";
        labels[index + 11].innerHTML = "RCB";
        inputBoxes[index].placeholder = "Starting RCB";
        backupBoxes[index].placeholder = "Back-up RCB";
    } else if (xPos >= 280 && xPos <= 400 && yPos >= 535 && yPos <= 675) {
        labels[index].innerHTML = "CB";
        labels[index + 11].innerHTML = "CB";
        inputBoxes[index].placeholder = "Starting CB"
        backupBoxes[index].placeholder = "Back-up CB";
    } else if (xPos >= 190 && xPos <= 280 && yPos >= 535 && yPos <= 675) {
        labels[index].innerHTML = "LCB";
        labels[index + 11].innerHTML = "LCB";
        inputBoxes[index].placeholder = "Starting LCB";
        backupBoxes[index].placeholder = "Back-up LCB";
    } else if (xPos >= 490 && xPos <= 610 && yPos >= 424 && yPos <= 535) {
        labels[index].innerHTML = "RWB";
        labels[index + 11].innerHTML = "RWB";
        inputBoxes[index].placeholder = "Starting RWB";
        backupBoxes[index].placeholder = "Back-up RWB";
    } else if (xPos >= 400 && xPos <= 490 && yPos >= 424 && yPos <= 535) {
        labels[index].innerHTML = "DMCR";
        labels[index + 11].innerHTML = "DMCR";
        inputBoxes[index].placeholder = "Starting DMCR";
        backupBoxes[index].placeholder = "Back-up DMCR";
    } else if (xPos >= 280 && xPos <= 400 && yPos >= 424 && yPos <= 535) {
        labels[index].innerHTML = "DMC";
        labels[index + 11].innerHTML = "DMC";
        inputBoxes[index].placeholder = "Starting DMC";
        backupBoxes[index].placeholder = "Back-up DMC";
    } else if (xPos >= 190 && xPos <= 280 && yPos >= 424 && yPos <= 535) {
        labels[index].innerHTML = "DMCL";
        labels[index + 11].innerHTML = "DMCL";
        inputBoxes[index].placeholder = "Starting DMCL";
        backupBoxes[index].placeholder = "Back-up DMCL";
    } else if (xPos >= 70 && xPos <= 190 && yPos >= 424 && yPos <= 535) {
        labels[index].innerHTML = "LWB";
        labels[index + 11].innerHTML = "LWB";
        inputBoxes[index].placeholder = "Starting LWB";
        backupBoxes[index].placeholder = "Back-up LWB";
    } else if (xPos >= 490 && xPos <= 610 && yPos >= 280 && yPos <= 424) {
        labels[index].innerHTML = "RM";
        labels[index + 11].innerHTML = "RM";
        inputBoxes[index].placeholder = "Starting RM";
        backupBoxes[index].placeholder = "Back-up RM";
    } else if (xPos >= 190 && xPos <= 490 && yPos >= 300 && yPos <= 424) {
        labels[index].innerHTML = "MC";
        labels[index + 11].innerHTML = "MC";
        inputBoxes[index].placeholder = "Starting MC";
        backupBoxes[index].placeholder = "Back-up MC";
    } else if (xPos >= 70 && xPos <= 190 && yPos >= 280 && yPos <= 424) {
        labels[index].innerHTML = "LM";
        labels[index + 11].innerHTML = "LM";
        inputBoxes[index].placeholder = "Starting LM";
        backupBoxes[index].placeholder = "Back-up LM";
    } else if (xPos >= 490 && xPos <= 610 && yPos >= 35 && yPos <= 280) {
        labels[index].innerHTML = "RW";
        labels[index + 11].innerHTML = "RW";
        inputBoxes[index].placeholder = "Starting RW";
        backupBoxes[index].placeholder = "Back-up RW";
    } else if (xPos >= 190 && xPos <= 490 && yPos >= 185 && yPos <= 300) {
        labels[index].innerHTML = "AMC";
        labels[index + 11].innerHTML = "AMC";
        inputBoxes[index].placeholder = "Starting AMC";
        backupBoxes[index].placeholder = "Back-up AMC";
    } else if (xPos >= 70 && xPos <= 190 && yPos >= 35 && yPos <= 280) {
        labels[index].innerHTML = "LW";
        labels[index + 11].innerHTML = "LW";
        inputBoxes[index].placeholder = "Starting LW";
        backupBoxes[index].placeholder = "Back-up LW";
    } else if (xPos >= 200 && xPos <= 440 && yPos >= 35 && yPos <= 185) {
        labels[index].innerHTML = "ST";
        labels[index + 11].innerHTML = "ST";
        inputBoxes[index].placeholder = "Starting ST";
        backupBoxes[index].placeholder = "Back-up ST";
    }
}

//Sets the line up based on the JSON content
const selectTeam = document.getElementById("select-team");
selectTeam.addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue === "ajax-22-23") {
        startingArray = lineUpsObj['Ajax 2022-2023'].starting;
        backupArray = lineUpsObj['Ajax 2022-2023'].backup;
        setCircleColor(lineUpsObj['Ajax 2022-2023'].colors);
        document.getElementById("teamNameBox").value = "Ajax 2022-2023";
    } else if (selectedValue === "ajax-23-24") {
        startingArray = lineUpsObj['Ajax 2023-2024'].starting;
        backupArray = lineUpsObj['Ajax 2023-2024'].backup;
        setCircleColor(lineUpsObj['Ajax 2023-2024'].colors);
        document.getElementById("teamNameBox").value = "Ajax 2023-2024";
    } else if (selectedValue === "voorwaarts-23-24") {
        startingArray = lineUpsObj['Voorwaarts 2023-2024'].starting;
        backupArray = lineUpsObj['Voorwaarts 2023-2024'].backup;
        setCircleColor(lineUpsObj['Voorwaarts 2023-2024'].colors);
        document.getElementById("teamNameBox").value = "Voorwaarts 2023-2024";
    } else if (selectedValue === "clear") {
        startingArray = [];
        backupArray = [];
    }
    setLineUp();
    determineFormation();
});

function setCircleColor(colors) {
    const circleClass = document.querySelectorAll(".circle");
    for (var i = 1; i < circleClass.length; i++) {

        var mainColor = getHexCode(colors.mainColor);
        var secondColor = getHexCode(colors.secondColor);
        var numberColor = getHexCode(colors.numberColor);

        circleClass[i].style.backgroundColor = mainColor;
        circleClass[i].style.borderColor = secondColor;
        circleClass[i].querySelector(".circle-number").style.color = numberColor;

        document.getElementById("colorPickerMain").value = mainColor;
        document.getElementById("colorPickerSecond").value = secondColor;
        document.getElementById("colorPickerNumber").value = numberColor;
    }
}

function updateCircleColors(colorPickerMain, colorPickerSecond, colorPickerNumber) {
    if (colorPickerMain == null) {
        colorPickerMain = document.getElementById("colorPickerMain").value;
    }
    if (colorPickerSecond == null) {
        colorPickerSecond = document.getElementById("colorPickerSecond").value;
    }
    if (colorPickerNumber == null) {
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
    const outputContainer = document.querySelectorAll(".output-container");

    startingArray.forEach(function (starter, index) {
        var inputContainers = document.querySelectorAll('.column.starting-column .input-container');
        inputContainers.forEach(function (inputContainer) {
            var labelElement = inputContainer.querySelector('label.label-position');
            if (labelElement.innerHTML == keyArray[index]) {
                var inputElement = inputContainer.querySelector('input');
                inputElement.value = starter;
                outputContainer.forEach(function (outputStarter) {
                    if (outputStarter.previousElementSibling.innerText == keyArray[index].replace("#", "")) {
                        var outputElement = outputStarter.querySelector('.outputStarting');
                        outputElement.innerText = starter;
                        toggleOutputBoxVisibility(outputElement, starter);

                    }
                });
            }
        });
    });

    backupArray.forEach(function (backup, index) {
        var inputContainers = document.querySelectorAll('.column.backup-column .input-container');
        inputContainers.forEach(function (inputContainer) {
            var labelElement = inputContainer.querySelector('label.label-position');
            if (labelElement.innerHTML == backupKeyArray[index]) {
                var inputElement = inputContainer.querySelector('input');
                inputElement.value = backup;
                outputContainer.forEach(function (outputBackup) {
                    if (outputBackup.previousElementSibling.innerText == keyArray[index].replace("#", "")) {
                        var outputElement = outputBackup.querySelector('.outputBackup');
                        outputElement.innerText = backup;
                        toggleOutputBoxVisibility(outputElement, backup);

                    }
                });
            }
        });

        toggleOutputBoxVisibility(outputBackups[index], backupBoxes[index].value);
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

function determineFormation() {
    const defenseArr = ['RB', 'RCB', 'CB', 'LCB', 'LB', 'RWB', 'LWB'];
    const midfieldArr = ['DMCR', 'DMC', 'DMCL', 'RM', 'LM', 'MC', 'AMC'];
    const attackArr = ['RW', 'LW', 'ST'];

    let defenseNr = 0;
    let midfieldNr = 0;
    let attackNr = 0;

    const startingContainers = document.querySelectorAll('.column.starting-column .input-container');
    const lineupArray = [];
    startingContainers.forEach((container) => {
        let label = container.querySelector('.label').textContent;
        const input = container.querySelector('.inputBox').value;
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
    let formation = "" + defenseNr + midfieldNr + attackNr;
    if (formation == '433') {
        if (lineupArray.includes('DMCR') && lineupArray.includes('DMCL') && lineupArray.includes('AMC')) {
            formation = '4231';
        }
    }
    if (formation == '442') {
        if (lineupArray.includes('DMC') && lineupArray.includes('AMC')) {
            formation = '442diamond';
        }
        else if (lineupArray.includes('LM') && lineupArray.includes('RM')) {
            formation = '442flat';
        }
    }

    var formationLabel = document.querySelector('.formation-label');
    formationLabel.textContent = 'Formation: ' + formation;

    return formation;
}

//Creates a JSON based on the line up made by the user
document.getElementById('downloadButton').addEventListener('click', function () {
    // Create JSON data
    const jsonData = { "teamName": "", "formation": "", "starting": {}, "backup": {}, "colors": {} };

    let formation = determineFormation();
    jsonData.formation = formation;

    const teamName = document.querySelector('#teamNameBox');
    jsonData.teamName = teamName.value;

    const startingContainers = document.querySelectorAll('.column.starting-column .input-container');
    startingContainers.forEach((container) => {
        let label = container.querySelector('.label-position').textContent;
        const input = container.querySelector('.inputBox').value;
        jsonData.starting[label] = input;

    });

    const backupContainers = document.querySelectorAll('.column.backup-column .input-container');
    backupContainers.forEach((container, index) => {
        let label = container.querySelector('.label-position').textContent;
        const input = container.querySelector('.backupBox').value;
        jsonData.backup[label] = input;

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
        reminder.style.display = "inline";
    }
    else {
        // Set the file name
        var teamFileName = teamName.value;
        teamFileName = teamFileName.replaceAll(' ', '_');
        teamFileName = teamFileName.replaceAll('/', '_');
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
    determineFormation();
    setTextBoxOrders();
});

function setCirclePositions(formationValue) {
    const circles = document.querySelectorAll(".circle");
    if (formationValue === "442flat") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '63%'; circles[1].style.left = '77%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '68%'; circles[3].style.left = '33%';    //#4
        circles[4].style.top = '63%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '47%'; circles[5].style.left = '58%';    //#6
        circles[6].style.top = '47%'; circles[6].style.left = '36%';    //#8
        circles[7].style.top = '37%'; circles[7].style.left = '16%';    //#10
        circles[8].style.top = '37%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '34%';    //#11
        circles[10].style.top = '10%'; circles[10].style.left = '60%';  //#9
    } else if (formationValue === "442diamond") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '63%'; circles[1].style.left = '77%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '68%'; circles[3].style.left = '33%';    //#4
        circles[4].style.top = '63%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '52%'; circles[5].style.left = '46.5%';  //#6
        circles[6].style.top = '40%'; circles[6].style.left = '28%';    //#8
        circles[7].style.top = '28%'; circles[7].style.left = '46.5%';  //#10
        circles[8].style.top = '40%'; circles[8].style.left = '66%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '34%';    //#11
        circles[10].style.top = '10%'; circles[10].style.left = '60%';  //#9
    } else if (formationValue === "451" || formationValue === "4231") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '63%'; circles[1].style.left = '77%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '68%'; circles[3].style.left = '33%';    //#4
        circles[4].style.top = '63%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '48%'; circles[5].style.left = '58%';    //#6
        circles[6].style.top = '48%'; circles[6].style.left = '36%';    //#8
        circles[7].style.top = '28%'; circles[7].style.left = '46.5%';  //#10
        circles[8].style.top = '28%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '28%'; circles[9].style.left = '16%';  //#11
        circles[10].style.top = '10%'; circles[10].style.left = '46.5%';  //#9
    } else if (formationValue === "532") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '68%'; circles[1].style.left = '67%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '46.5%';  //#3
        circles[3].style.top = '68%'; circles[3].style.left = '27%';    //#4
        circles[4].style.top = '53%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '53%'; circles[5].style.left = '58%';    //#6
        circles[6].style.top = '53%'; circles[6].style.left = '36%';    //#8
        circles[7].style.top = '28%'; circles[7].style.left = '46.5%';  //#10
        circles[8].style.top = '53%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '34%';    //#9
        circles[10].style.top = '10%'; circles[10].style.left = '60%';  //#11
    } else if (formationValue === "343") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '65%'; circles[1].style.left = '67%';    //#2
        circles[2].style.top = '65%'; circles[2].style.left = '46.5%';  //#3
        circles[3].style.top = '52%'; circles[3].style.left = '46.5%';  //#4
        circles[4].style.top = '65%'; circles[4].style.left = '27%';    //#5
        circles[5].style.top = '40%'; circles[5].style.left = '66%';    //#6
        circles[6].style.top = '40%'; circles[6].style.left = '28%';    //#8
        circles[7].style.top = '28%'; circles[7].style.left = '46.5%';  //#10
        circles[8].style.top = '18%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '18%'; circles[9].style.left = '16%';  //#11
        circles[10].style.top = '10%'; circles[10].style.left = '46.5%';  //#9
    } else { //4-3-3
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '63%'; circles[1].style.left = '77%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '68%'; circles[3].style.left = '33%';    //#4
        circles[4].style.top = '63%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '52%'; circles[5].style.left = '46.5%';  //#6
        circles[6].style.top = '38%'; circles[6].style.left = '33%';    //#8
        circles[7].style.top = '30%'; circles[7].style.left = '60%';    //#10
        circles[8].style.top = '18%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '18%'; circles[9].style.left = '16%';  //#11
        circles[10].style.top = '10%'; circles[10].style.left = '46.5%';  //#9
    }
    setTextBoxOrders();
    circles.forEach((circle, index) => {
        var posX = (parseInt(circle.style.left) / 100) * 730;
        var posY = (parseInt(circle.style.top) / 100) * 900;
        determineLabel(posX, posY, index);
    });
    setTextBoxOrders();
}


// Function to capture screenshot and trigger download
function captureScreenshotAndDownload() {
    const divElement = document.getElementById('image-container'); // Replace 'yourDivId' with the actual ID of your div
    const rect = divElement.getBoundingClientRect();

    // Extract the values
    var imgX = rect.left + (0.041 * rect.width);     // X coordinate 30 730    4.1
    var imgY = rect.top + (0.011 * rect.height);      // Y coordinate 10 900    1.1
    var imgWidth = rect.width - (0.082 * rect.width);   // Width -60 730       8.2
    var imgHeight = rect.height - (0.011 * rect.height); // Height -20 900      2.2

    const options = {
        // Set the x and y coordinates to capture the middle section
        x: imgX,
        y: imgY,
        // Set the desired width and height for the screenshot
        width: imgWidth,
        height: imgHeight
    };

    html2canvas(divElement).then(function (canvas) {
        // Create a new canvas to hold the trimmed image
        var trimmedCanvas = document.createElement('canvas');
        var trimmedContext = trimmedCanvas.getContext('2d');

        // Calculate the trimming dimensions
        var widthToTrim = canvas.width * 0.05;
        var heightToTrim = canvas.height * 0.02;
        var trimmedWidth = canvas.width - (widthToTrim * 2); //5% of the width on both (2) sides
        var trimmedHeight = canvas.height - (heightToTrim * 2); //5% of the height on both (2) sides

        // Draw the trimmed image onto the new canvas
        trimmedCanvas.width = trimmedWidth;
        trimmedCanvas.height = trimmedHeight;
        trimmedContext.drawImage(
            canvas,
            widthToTrim,
            heightToTrim,
            trimmedWidth,
            trimmedHeight,
            0,
            0,
            trimmedWidth,
            trimmedHeight
        );

        // Create an anchor element to download the image
        var link = document.createElement('a');
        link.href = trimmedCanvas.toDataURL('image/png');
        const teamName = document.querySelector('#teamNameBox');
        var teamFileName = teamName.value;
        teamFileName = teamFileName.replaceAll(' ', '_');
        teamFileName = teamFileName.replaceAll('/', '_');
        link.download = teamFileName; // Set the filename for the download

        //document.body.appendChild(link);
        link.click();
        //document.body.removeChild(link);
    });
}

// Attach click event listener to the button
const screenshotButton = document.getElementById('screenshotButton');
screenshotButton.addEventListener('click', captureScreenshotAndDownload);

document.addEventListener('DOMContentLoaded', function () {
    const helpIcon = document.querySelector('.help-icon');
    const popup = document.querySelector('#popup');
    const closeBtn = document.querySelector('#closeBtn');

    helpIcon.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click event propagation to the document
        popup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    document.addEventListener('click', function (event) {
        if (event.target.id == 'popup') {
            popup.style.display = 'none'; // Hide the popup when clicking outside of it
        }
    });
});


// Initial update on page load
selectTeam.dispatchEvent(new Event("change"));