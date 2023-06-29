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

$(document).ready(function () {
    function handleWindowResize() {
        screenWidth = screen.width;
    }

    $(window).on('resize', handleWindowResize);


    $(".starting-column > h2").click(function () {
        var inputContainers = $(this).siblings(".input-container");

        var showLineUpButton = document.getElementById('showLineUpButton');
        const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
        if (displayValue == 'block') {
            toggleDisplay(inputContainers, true);
        } else {
            toggleDisplay(inputContainers, false);
        }
    });

    $(".backup-column > h2").click(function () {
        var inputContainers = $(this).siblings(".input-container");

        var showLineUpButton = document.getElementById('showLineUpButton');
        const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
        if (displayValue == 'block') {
            toggleDisplay(inputContainers, true);
        } else {
            toggleDisplay(inputContainers, false);
        }
    });
});

function toggleDisplay(elements, mobileCheck) {
    if (mobileCheck) {
        elements.each(function () {
            var displayValue = $(this).css("display");
            var newDisplay = (displayValue === "flex") ? "none" : "flex";
            $(this).css("display", newDisplay);
        });
    }
    else {
        elements.each(function () {
            $(this).css("display", "flex");
        });
    }
}

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
    setTextBoxOrders();
    determineFormation();
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
                startKeyArray = [];
                for (const [key, value] of Object.entries(jsonData.starting)) {
                    startingArray.push(value);
                    startKeyArray.push(key);
                }
                for (const [key, value] of Object.entries(jsonData.backup)) {
                    backupArray.push(value);
                    backupKeyArray.push(key);
                }

                setLineUp(startKeyArray, backupKeyArray);

                var mainColor = getHexCode(jsonData.colors.mainColor);
                var secondColor = getHexCode(jsonData.colors.secondColor);
                var numberColor = getHexCode(jsonData.colors.numberColor);

                document.getElementById("colorPickerMain").value = mainColor;
                document.getElementById("colorPickerSecond").value = secondColor;
                document.getElementById("colorPickerNumber").value = numberColor;

                updateCircleColors(jsonData.colors.mainColor, jsonData.colors.secondColor, jsonData.colors.numberColor);

                document.getElementById("teamNameBox").value = jsonData.teamName;
                setTextBoxOrders();
                determineFormation();
            }
            else {
                alert("Uploaded JSON not valid. Please check the help button for the correct JSON format.");
            }

        };
        reader.readAsText(file);
        chooseFileButton.innerHTML = "Upload your team here";
        importButton.style.display = 'none';

    } else {
        console.error('No file selected.');
    }
});
window.addEventListener('DOMContentLoaded', function () {
    var lineupContainer = document.querySelector('.lineup-container');

    var showLineUpButton = document.getElementById('showLineUpButton');

    showLineUpButton.addEventListener('click', function () {
        if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
            lineupContainer.style.display = 'block'; // Show the lineup-container div
            showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
        } else {
            lineupContainer.style.display = 'none'; // Hide the lineup-container div
            showLineUpButton.textContent = 'Show line-up and formation'; // Change button text
        }

    });

    var mediaQuery = window.matchMedia('(min-width: 1001px)'); // Adjust the media query as needed

    handleViewportChange(mediaQuery.matches); // Check initial viewport state

    mediaQuery.addEventListener('change', function (event) {
        handleViewportChange(event.matches); // Handle changes in viewport state
    });

    function handleViewportChange(matches) {
        if (matches) {
            lineupContainer.style.display = 'block'; // Set display to 'block'
        } else {
            lineupContainer.style.display = 'none'; // Set display to 'none'
        }
    }

    var showLineUpButton = document.getElementById('showLineUpButton');
    showLineUpButton.textContent = 'Show line-up and formation'; // Change button text
});

//Pre loads the JSON files stored locally
document.addEventListener("DOMContentLoaded", function () {
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

    getJsonFiles()
        .then(jsonFiles => {
            jsonFiles.forEach(jsonData => {
                const teamName = jsonData.teamName;

                const selectElement = document.getElementById("select-team");

                const optionElement = document.createElement("option");
                optionElement.value = teamName;
                optionElement.textContent = teamName;
                selectElement.appendChild(optionElement);
                // Access the data for each JSON file

                lineUpsObj[teamName] = {};
                lineUpsObj[teamName].teamName = teamName;
                lineUpsObj[teamName].formation = jsonData.formation;
                lineUpsObj[teamName].starting = Object.values(jsonData.starting);
                lineUpsObj[teamName].backup = Object.values(jsonData.backup);
                lineUpsObj[teamName].colors = {};
                lineUpsObj[teamName].colors.mainColor = jsonData.colors.mainColor;
                lineUpsObj[teamName].colors.secondColor = jsonData.colors.secondColor;
                lineUpsObj[teamName].colors.numberColor = jsonData.colors.numberColor;
                lineUpsObj[teamName].keysArray = Object.keys(jsonData.starting);
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

        if (document.getElementById("select-formation").value != '') {
            document.getElementById("select-formation").value = '';
        }
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

//Sets the line up based on the JSON content retried from GitHub
const selectTeam = document.getElementById("select-team");
selectTeam.addEventListener("change", function () {

    const selectedValue = this.value;
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }
    if (selectedValue === "clear") {
        startingArray = ['', '', '', '', '', '', '', '', '', '', ''];
        backupArray = ['', '', '', '', '', '', '', '', '', '', ''];

        document.getElementById("select-formation").value = '';
        document.getElementById("teamNameBox").value = '';

        const defaultColors = { mainColor: '#ff0000', secondColor: '#ffffff', numberColor: '#ffffff' };
        setCircleColor(defaultColors);
        setCirclePositions('433');
        setTextBoxOrders();
    }
    else {
        startingArray = lineUpsObj[selectedValue].starting;
        backupArray = lineUpsObj[selectedValue].backup;
        startKeyArray = lineUpsObj[selectedValue].keysArray;
        backupKeyArray = lineUpsObj[selectedValue].keysArray;
        var formattedFormation = lineUpsObj[selectedValue].formation.replaceAll('-', '').replaceAll(" ", "");

        document.getElementById("select-formation").value = formattedFormation;
        document.getElementById("teamNameBox").value = selectedValue;

        setCircleColor(lineUpsObj[selectedValue].colors);
        setCirclePositions(formattedFormation);
        setTextBoxOrders();
    }

    setLineUp(startKeyArray, backupKeyArray);
    determineFormation();
});

// Attach click event listener to the button
const screenshotButton = document.getElementById('screenshotButton');
screenshotButton.addEventListener('click', captureScreenshotAndDownload);

// Initial update on page load
selectTeam.dispatchEvent(new Event("change"));

//Creates a JSON based on the line up made by the user
document.getElementById('downloadButton').addEventListener('click', function () {
    // Create JSON data
    const currentWidth = screenshotButton.offsetWidth;
    const currentHeight = screenshotButton.offsetHeight;

    screenshotButton.innerText = "Downloading.....";

    screenshotButton.style.width = currentWidth + 'px';
    screenshotButton.style.height = currentHeight + 'px';

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

    screenshotButton.innerText = "Download team (.JSON)";
});

//Sets the formation based on formation select box
const selectFormation = document.getElementById("select-formation");
selectFormation.addEventListener("change", function () {
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }
    const selectedValue = this.value;
    setCirclePositions(selectedValue);
    determineFormation();
    setTextBoxOrders();
});

// Retrieves the JSONs loaded in the GitHub
function getJsonFiles() {
    return new Promise((resolve, reject) => {
        const isFileServer = window.location.href.includes('127');

        if (isFileServer) {
            // Fetch JSON files locally
            const jsonFileNames = ['Ajax CL 18-19.json', 'Ajax Possible 23-24.json', 'Argentina WC 2022.json', 'Man Utd CL 1999.json']; // Replace with actual file names

            const jsonFilePromises = jsonFileNames.map(fileName => {
                return fetch(fileName)
                    .then(response => response.json())
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error('Error fetching JSON file:', error);
                        return null;
                    });
            });

            Promise.all(jsonFilePromises)
                .then(files => {
                    const fileArray = files.filter(file => file !== null);
                    resolve(fileArray);
                })
                .catch(error => {
                    console.error('Error resolving JSON files:', error);
                    reject(error);
                });
        } else {
            fetch('https://api.github.com/repos/pwolbers/line-up-builder/contents/')
                .then(response => response.json())
                .then(gitHubContent => {
                    const jsonFilePromises = gitHubContent
                        .filter(file => file.name.endsWith('.json'))
                        .map(file => {
                            return fetch(file.download_url)
                                .then(response => response.json())
                                .then(data => {
                                    return data;
                                })
                                .catch(error => {
                                    console.error('Error fetching JSON file:', error);
                                    return null;
                                });
                        });

                    Promise.all(jsonFilePromises)
                        .then(files => {
                            const fileArray = files.filter(file => file !== null);
                            resolve(fileArray);
                        })
                        .catch(error => {
                            console.error('Error resolving JSON files:', error);
                            reject(error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching GitHub content:', error);
                    reject(error);
                });
        }
    });
}

// Sets the circles location on the pitch
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
        circles[9].style.top = '10%'; circles[9].style.left = '60%';    //#9
        circles[10].style.top = '10%'; circles[10].style.left = '34%';  //#11
    } else if (formationValue === "424") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '63%'; circles[1].style.left = '77%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '68%'; circles[3].style.left = '33%';    //#4
        circles[4].style.top = '63%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '47%'; circles[5].style.left = '58%';    //#6
        circles[6].style.top = '47%'; circles[6].style.left = '36%';    //#8
        circles[7].style.top = '28%'; circles[7].style.left = '16%';    //#10
        circles[8].style.top = '28%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '60%';    //#9
        circles[10].style.top = '10%'; circles[10].style.left = '34%';  //#11
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
        circles[9].style.top = '10%'; circles[9].style.left = '60%';    //#9
        circles[10].style.top = '10%'; circles[10].style.left = '34%';  //#11
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
        circles[9].style.top = '10%'; circles[9].style.left = '46.5%';    //#9
        circles[10].style.top = '28%'; circles[10].style.left = '16%';  //#11
    } else if (formationValue === "532") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '68%'; circles[1].style.left = '67%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '46.5%';  //#3
        circles[3].style.top = '68%'; circles[3].style.left = '27%';    //#4
        circles[4].style.top = '56%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '50%'; circles[5].style.left = '58%';    //#6
        circles[6].style.top = '50%'; circles[6].style.left = '36%';    //#8
        circles[7].style.top = '28%'; circles[7].style.left = '46.5%';  //#10
        circles[8].style.top = '56%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '60%';    //#9
        circles[10].style.top = '10%'; circles[10].style.left = '34%';  //#11
    } else if (formationValue === "343") {
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '65%'; circles[1].style.left = '67%';    //#2
        circles[2].style.top = '65%'; circles[2].style.left = '46.5%';  //#3
        circles[3].style.top = '52%'; circles[3].style.left = '46.5%';  //#4
        circles[4].style.top = '65%'; circles[4].style.left = '27%';    //#5
        circles[5].style.top = '40%'; circles[5].style.left = '66%';    //#6
        circles[6].style.top = '40%'; circles[6].style.left = '28%';    //#8
        circles[7].style.top = '28%'; circles[7].style.left = '46.5%';  //#10
        circles[8].style.top = '14%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '46.5%';    //#9
        circles[10].style.top = '14%'; circles[10].style.left = '16%';  //#11
    } else { //4-3-3
        circles[0].style.top = '82%'; circles[0].style.left = '46.5%';  //#1
        circles[1].style.top = '63%'; circles[1].style.left = '77%';    //#2
        circles[2].style.top = '68%'; circles[2].style.left = '60%';    //#3
        circles[3].style.top = '68%'; circles[3].style.left = '33%';    //#4
        circles[4].style.top = '63%'; circles[4].style.left = '16%';    //#5
        circles[5].style.top = '52%'; circles[5].style.left = '46.5%';  //#6
        circles[6].style.top = '38%'; circles[6].style.left = '33%';    //#8
        circles[7].style.top = '30%'; circles[7].style.left = '60%';    //#10
        circles[8].style.top = '14%'; circles[8].style.left = '77%';    //#7
        circles[9].style.top = '10%'; circles[9].style.left = '46.5%';    //#9
        circles[10].style.top = '14%'; circles[10].style.left = '16%';  //#11
    }
    setTextBoxOrders();
    circles.forEach((circle, index) => {
        var posX = (parseInt(circle.style.left) / 100) * 730;
        var posY = (parseInt(circle.style.top) / 100) * 900;
        determineLabel(posX, posY, index);
    });
}

// Sets the color of the color pickers and the circles
function setCircleColor(colors) {
    var mainColor = getHexCode(colors.mainColor);
    var secondColor = getHexCode(colors.secondColor);
    var numberColor = getHexCode(colors.numberColor);

    document.getElementById("colorPickerMain").value = mainColor;
    document.getElementById("colorPickerSecond").value = secondColor;
    document.getElementById("colorPickerNumber").value = numberColor;

    updateCircleColors(mainColor, secondColor, numberColor);
}

// Changes the order of the input boxes and labels based on the circle Array order and determines labels
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

// Changes the color of the circles when using the color picker (or when loaded from JSON)
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
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }

}

// Determines the order of the circles from bottom to top, from right to left
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
        //Adds a buffer of 50 (if within 50px, it's considered the same y)
        if (Math.abs(a.y - b.y) < 50) {
            return a.x > b.x ? -1 : 1
        } else {
            return a.y > b.y ? -1 : 1
        }
    })
    return circleArray;
}

// Shows/hides textboxes below circles based on input
function toggleOutputBoxVisibility(box, inputValue) {
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }
    if (inputValue.trim() !== "") {
        box.style.display = "block";
    } else if (box.style.display != "none") {
        box.style.display = "none";
    }
}

// Determines the label (RB, MC, AMC, etc) that is shown before the input box
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

// Adds the names of the players added in the left columns to the circles on the right
function setLineUp(startKeyArray, backupKeyArray) {
    const outputContainer = document.querySelectorAll(".output-container");
    if (startKeyArray.length > 0) {
        startingArray.forEach(function (starter, index) {
            var inputContainers = document.querySelectorAll('.column.starting-column .input-container');
            inputContainers.forEach(function (inputContainer) {
                var labelElement = inputContainer.querySelector('label.label-position');
                if (labelElement.innerHTML == startKeyArray[index]) {
                    var inputElement = inputContainer.querySelector('input');
                    inputElement.value = starter;
                    outputContainer.forEach(function (outputStarter) {
                        if (outputStarter.previousElementSibling.innerText == startKeyArray[index].replace("#", "")) {
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
                        if (outputBackup.previousElementSibling.innerText == backupKeyArray[index].replace("#", "")) {
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
    else {
        inputBoxes.forEach((inputBox, index) => {
            inputBox.value = startingArray[index] || "";
            toggleOutputBoxVisibility(outputStartings[index], inputBox.value);
            backupBoxes[index].value = backupArray[index] || "";
            toggleOutputBoxVisibility(outputBackups[index], backupBoxes[index].value);
            outputStartings[index].innerText = inputBox.value;
            outputBackups[index].innerText = backupBoxes[index].value;
        });
    }
}

// Resets the upload button when the select team field is changed
function updateUploadButton() {
    var selectBox = document.getElementById("select-team");
    var chooseFileButton = document.getElementById("chooseFileButton");
    var jsonFileInput = document.getElementById("jsonFileInput");

    if (selectBox.value !== "clear") {
        chooseFileButton.innerHTML = "Upload your team here";
        importButton.style.display = 'none';
        jsonFileInput.value = "";
    }
}

// Calculates what formation is currently shown based on # of defenders, midfielders and attackers
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
            formation = '4231 / 451';
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

        resultArray.push(currentChar);

        if (/[0-9]/.test(currentChar) && /[a-zA-Z]/.test(nextChar)) {
            resultArray.push(' ');
        } else if (/[0-9]/.test(currentChar) && /[0-9]/.test(nextChar)) {
            resultArray.push('-');
        }
    }

    const formattedValue = resultArray.join('');
    return formattedValue;
}

// Function to capture screenshot and trigger download
function captureScreenshotAndDownload() {
    document.body.classList.add('desktop-mode');
    
    var lineupContainer = document.querySelector('.lineup-container');
    if (lineupContainer.style.display === 'none' || lineupContainer.style.display === '') {
        lineupContainer.style.display = 'block'; // Show the lineup-container div
        showLineUpButton.textContent = 'Hide line-up and formation'; // Change button text
    }
    const divElement = document.getElementById('image-container');

    const currentWidth = screenshotButton.getBoundingClientRect().width;
    const currentHeight = screenshotButton.getBoundingClientRect().height;

    var downloadButton = document.getElementById('downloadButton');
    const downloadWidth = downloadButton.getBoundingClientRect().width;
    const downloadHeight = downloadButton.getBoundingClientRect().height;

    screenshotButton.innerText = "Downloading...";

    var widthAndHeightSB = 'width: ' + currentWidth + 'px; height: ' + currentHeight + 'px;'
    var widthAndHeightDB = 'width: ' + downloadWidth + 'px; height: ' + downloadHeight + 'px;'
    screenshotButton.style.cssText += widthAndHeightSB;
    downloadButton.style.cssText += widthAndHeightDB;

    var timeOutValue;
    const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
    if (displayValue == 'block') {
        timeOutValue = 1414;
    } else {
        timeOutValue = 1;
    }

    setTimeout(function () {
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

            screenshotButton.innerText = "Download image (.png)";

            document.body.classList.remove('desktop-mode');
        });
    }, timeOutValue);

    downloadButton.style.setProperty('height', downloadWidth);
    downloadButton.style.setProperty('height', downloadHeight);
}