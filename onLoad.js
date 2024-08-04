const lineUpsObj = {};

var startingArray = [];
var secondArray = [];
var startKeyArray = [];
var secondKeyArray = [];
var secondType;
var lines = []; // Array to store yellow/purple lines
var movingLines = []; //Array to store blue lines
var screenWidth;
var oppoCircleHasBeenDragged = false;
var isDrawing = false;
var secondContainerInputs = [];
var oppoContainerInputs = [];

const jsonFileInput = document.getElementById('jsonFileInput');
const chooseFileButton = document.getElementById('chooseFileButton');
const importButton = document.getElementById('importButton');
const clearNamesButton = document.getElementById('clearNamesButton');
const clearArrowsButton = document.getElementById('clearArrowsButton');
const showLineUpButton = document.getElementById('showLineUpButton');
const resetButton = document.getElementById('resetButton');

const allCircles = document.querySelectorAll(".circle, .oppoCircle");
const mainCircles = document.querySelectorAll(".circle");
const oppoCircles = document.querySelectorAll(".oppoCircle");

const inputBoxes = document.querySelectorAll(".inputBox");
const secondBoxes = document.querySelectorAll(".secondBox");

const drawingSlider = document.getElementById('drawingSlider');
const circleSlider = document.getElementById('circleSlider');
const pitchDrawingSlider = document.getElementById('pitchDrawingSlider');

const outputStartings = document.querySelectorAll(".outputStarting");
const outputSeconds = document.querySelectorAll(".outputSecond");
const outputOppos = document.querySelectorAll(".outputOpponent");

const leftContainer = document.querySelector('.left-container');
const lineupContainer = document.getElementById("lineupContainer");
const imageContainer = document.getElementById('image-container');
const imageConHeight = imageContainer.offsetHeight || 720; //If offsetHeight is empty, it means we're on mobiel and it is hidden, set to default height
const imageConWidth = imageContainer.offsetWidth || 584; //Same for offsetWidth
const canvasContainer = document.getElementById('drawingCanvas');

const teamNameBox = document.getElementById('teamNameBox');
const downloadButton = document.getElementById('downloadButton');
const screenshotButton = document.getElementById('screenshotButton');
const copyImageButton = document.getElementById('copyImageButton');
const recordButton = document.getElementById('recordButton');
const selectTeam = document.getElementById("select-team");
const selectFormation = document.getElementById("select-formation");

const checkOpposition = document.getElementById("oppo-checkbox-true");
const checkOppositionName = document.getElementById("oppo-column-checkbox-true");
const oppoFormation = document.getElementById("oppo-formation");

const mainPickr = createPickr('.mainColorPicker', '#ff0000');
const secondPickr = createPickr('.secondColorPicker', '#ffffff');
const numberPickr = createPickr('.numberColorPicker', '#ffffff');
const mainOppoPickr = createPickr('.mainOppoColorPicker', '#006631');
const secondOppoPickr = createPickr('.secondOppoColorPicker', '#000000');
const numberOppoPickr = createPickr('.numberOppoColorPicker', '#ffffff');
const drawingPickr = createPickr('.drawingColorPicker', '#ffffff');
const pitchDrawingPickr = createPickr('.pitchDrawingColorPicker', '#ffffff');
const createdPickrs = document.querySelectorAll('.pcr-app');

const lineYOne = (20 / 900) * imageConHeight;
const lineYTwo = (270 / 900) * imageConHeight;
const lineYThree = (360 / 900) * imageConHeight;
const lineYFour = (480 / 900) * imageConHeight;
const lineYFive = (580 / 900) * imageConHeight;
const lineYSix = (710 / 900) * imageConHeight;
const lineYSeven = (840 / 900) * imageConHeight;

const lineXOne = (55 / 730) * imageConWidth;
const lineXTwo = (195 / 730) * imageConWidth;
const lineXThree = (290 / 730) * imageConWidth;
const lineXFour = (403 / 730) * imageConWidth;
const lineXFive = (502 / 730) * imageConWidth;
const lineXSix = (642 / 730) * imageConWidth;

const oppoLineYOne = (20 / 900) * imageConHeight;
const oppoLineYTwo = (115 / 900) * imageConHeight;
const oppoLineYThree = (245 / 900) * imageConHeight;
const oppoLineYFour = (355 / 900) * imageConHeight;
const oppoLineYFive = (465 / 900) * imageConHeight;
const oppoLineYSix = (545 / 900) * imageConHeight;
const oppoLineYSeven = (840 / 900) * imageConHeight;

let previousWindowHeight = window.innerHeight;
let previousWindowWidth = window.innerWidth;

var standardSizes;
var standardCircleSize;
var standardBorderSize;
var standardNumberSizeLarge;
var standardNumberSizeMedium;
var standardNumberSizeSmall;
var standardNumberSizeLargeOppo;
var standardNumberSizeMediumOppo;
var standardNumberSizeSmallOppo;
var standardTextBoxOne;
var standardTextBoxTwo;


const mainColor = document.getElementById("colorPickerMain");

var arrowLocationArray = [];
let startX, startY;


$(document).ready(function () {
    $("#starting-column-title").click(function () {
        var inputContainers = $(this).siblings(".input-container");
        var showLineUpButton = document.getElementById('showLineUpButton');
        const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
        if (displayValue == 'inline-block') {
            toggleDisplay(inputContainers, true, 'starting');
        } else {
            toggleDisplay(inputContainers, false, 'starting');
        }
    });

    $("#second-column-title").click(function () {
        var inputContainers = $(this).siblings(".input-container");
        var showLineUpButton = document.getElementById('showLineUpButton');
        const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
        if (displayValue == 'inline-block') {
            toggleDisplay(inputContainers, true, 'second');
        } else {
            toggleDisplay(inputContainers, false, 'second');
        }
    });
});


function toggleDisplay(elements, mobileCheck, type) {
    if (mobileCheck) {
        var parentContainer;
        var otherColumn;

        if (type == 'starting') {
            parentContainer = document.getElementById('starting-column');

            otherColumn = document.querySelector('button.second-column');
            const children = otherColumn.querySelectorAll('*:not(.oppo-label-position)');

            children.forEach((child) => {
                if (child.tagName == 'DIV') {
                    child.style.display = 'none';
                }
                else if (child.tagName == 'P') {
                    child.style.display = 'flex';
                }
                else {
                    child.style.display = 'flex';
                }
            });
        }
        else if (type == 'second') {
            parentContainer = document.getElementById('second-column');

            otherColumn = document.querySelector('button.starting-column');
            const children = otherColumn.querySelectorAll('*');

            children.forEach((child) => {
                if (child.tagName == 'DIV') {
                    child.style.display = 'none';
                }
                else if (child.tagName == 'P') {
                    child.style.display = 'flex';
                }
                else {
                    child.style.display = 'flex';
                }
            });
        }

        var newDisplay;
        elements.each(function () {
            var displayValue = $(this).css("display");
            newDisplay = (displayValue === "flex") ? "none" : "flex";
            $(this).css("display", newDisplay);
        });

        newDisplay == 'none' ? parentContainer.classList.add('column-shadow') : parentContainer.classList.remove('column-shadow');
        otherColumn.classList.add('column-shadow');

    }
    else {
        elements.each(function () {
            $(this).css("display", "flex");
        });
    }
}

window.addEventListener('resize', resizeFunctionality);

function resizeFunctionality(e) {
    const currentWindowHeight = window.innerHeight;
    const currentWindowWidth = window.innerWidth;
    //Some stupid bug on phone makes it so it seems there is a resize even though the width and height stay the same
    //To prevent resize functionality to occur (which resets some things) when there is no resize, I build in this if statement
    if (currentWindowHeight != previousWindowHeight || currentWindowWidth != previousWindowWidth) {
        //Set array for circle movement for the new line data
        arrowLocationArray = [];

        var allLines = document.querySelectorAll('.line');
        allLines.forEach((line) => {
            var hypotenusePct = line.getAttribute("hypotenusePct");
            line.style.height = hypotenusePct * imageContainer.offsetHeight + 'px';

            //Push new moving line data to array
            var circle = document.getElementById(line.getAttribute("parentCircleId"));
            if (line.classList.toString().indexOf('moving') > -1) {
                addLineDataToArray(line, circle);
            }
        });

        //Reset 'Move circles' button if resized
        if (document.getElementById("play-checkbox").checked) {
            document.getElementById("play-checkbox").checked = false;
            moveCircles();
        }

        //Get new current standard Circle Size
        standardSizes = getStandardSizes();
        standardCircleSize = standardSizes[0];
        standardBorderSize = standardSizes[1];
        standardNumberSizeLarge = standardSizes[2];
        standardNumberSizeMedium = standardSizes[3];
        standardNumberSizeSmall = standardSizes[4];
        standardNumberSizeLargeOppo = standardSizes[5];
        standardNumberSizeMediumOppo = standardSizes[6];
        standardNumberSizeSmallOppo = standardSizes[7];
        standardTextBoxOne = standardSizes[8];
        standardTextBoxTwo = standardSizes[9];
        setCircleAndTextSize();

        if (window.innerWidth > 780) {
            document.getElementById('arrow-checkbox').checked = true;

            leftContainer.style.display = 'block';
            lineupContainer.style.display = 'block';
            var startingInputContainers = document.querySelectorAll('.starting-column > .input-container');
            startingInputContainers.forEach((inputContainer) => {
                inputContainer.style.display = 'flex';
            });
            var secondInputContainers = document.querySelectorAll('.second-column > .input-container');
            secondInputContainers.forEach((inputContainer) => {
                inputContainer.style.display = 'flex';
            });
        }
        else {
            document.getElementById('circle-checkbox').checked = true;
            if (window.getComputedStyle(leftContainer).getPropertyValue('display') == 'block') {
                lineupContainer.style.display = 'none';
                showLineUpButton.textContent = 'Switch to pitch view';
            }
            else {
                leftContainer.style.display = 'none';
                showLineUpButton.textContent = 'Switch to input view';
            }

            var secondInputContainers = document.querySelectorAll('.second-column > .input-container');
            secondInputContainers.forEach((inputContainer) => {
                inputContainer.style.display = 'none';
            });

        }
        previousWindowHeight = currentWindowHeight;
        previousWindowWidth = currentWindowWidth;
    }
}

window.onload = () => {
    
    var buJson = {
        "teamName": "Argentina WC 2022",
        "formation": "4-3-3",
        "starting": {
            "#1": {
                "name": "E. Martínez",
                "number": "23"
            },
            "#2": {
                "name": "Molina",
                "number": "26"
            },
            "#3": {
                "name": "Romero",
                "number": "13"
            },
            "#4": {
                "name": "Otamendi",
                "number": "19"
            },
            "#5": {
                "name": "Tagliafico",
                "number": "3"
            },
            "#6": {
                "name": "Fernández",
                "number": "24"
            },
            "#8": {
                "name": "Mac Allister",
                "number": "20"
            },
            "#10": {
                "name": "De Paul",
                "number": "7"
            },
            "#7": {
                "name": "Messi",
                "number": "10"
            },
            "#11": {
                "name": "Di María",
                "number": "11"
            },
            "#9": {
                "name": "Álvarez",
                "number": "9"
            }
        },
        "colors": {
            "mainColor": "#ffffff",
            "secondColor": "#6cace4",
            "numberColor": "#6cace4"
        },
        "secondType": "back-up",
        "second": {
            "#1": "Armani | Rulli",
            "#2": "Montiel",
            "#3": "Foyth | Pezzella",
            "#4": "Li. Martínez",
            "#5": "Acuña",
            "#6": "Paredes | Rodríguez",
            "#8": "Palacios",
            "#10": "Almada",
            "#7": "Correa",
            "#11": "Gómez",
            "#9": "Dybala | La. Martínez"
        }
    };

    var backupJson = JSON.stringify(buJson, null, 2);
    document.getElementById("backupJson").innerText = backupJson;

    var oppoJson = {
        "teamName": "Barcelona vs Man Utd - 2009 CL Final",
        "formation": "4-3-3",
        "starting": {
            "#1": {
                "name": "Valdés",
                "number": "1"
            },
            "#2": {
                "name": "Puyol",
                "number": "5"
            },
            "#3": {
                "name": "Touré",
                "number": "24"
            },
            "#4": {
                "name": "Piqué",
                "number": "3"
            },
            "#5": {
                "name": "Sylvinho",
                "number": "16"
            },
            "#6": {
                "name": "Busquets",
                "number": "28"
            },
            "#8": {
                "name": "Xavi",
                "number": "6"
            },
            "#10": {
                "name": "Iniesta",
                "number": "8"
            },
            "#7": {
                "name": "Messi",
                "number": "10"
            },
            "#11": {
                "name": "Henry",
                "number": "14"
            },
            "#9": {
                "name": "Eto'o",
                "number": "9"
            }
        },
        "colors": {
            "mainColor": "#004d98",
            "secondColor": "#a50044",
            "numberColor": "#edbb00"
        },
        "secondType": "opposition",
        "second": {
            "#1": {
                "name": "Van der Sar",
                "number": "1"
            },
            "#2": {
                "name": "O'Shea",
                "number": "22"
            },
            "#3": {
                "name": "Ferdinand",
                "number": "5"
            },
            "#4": {
                "name": "Vidić",
                "number": "15"
            },
            "#5": {
                "name": "Evra",
                "number": "3"
            },
            "#6": {
                "name": "Carrick",
                "number": "16"
            },
            "#8": {
                "name": "Anderson",
                "number": "8"
            },
            "#10": {
                "name": "Giggs",
                "number": "11"
            },
            "#7": {
                "name": "Park",
                "number": "13"
            },
            "#11": {
                "name": "Rooney",
                "number": "10"
            },
            "#9": {
                "name": "Ronaldo",
                "number": "7"
            }
        },
        "oppoFormation": "4-2-3-1",
        "oppoColors": {
            "mainColor": "#ffffff",
            "secondColor": "#000080",
            "numberColor": "#000080"
        }
    };

    var oppositionJson = JSON.stringify(oppoJson, null, 2);
    document.getElementById("oppositionJson").innerText = oppositionJson;

    if (window.innerWidth > 780) {
        document.getElementById('arrow-checkbox').checked = true;
    }
    else {
        document.getElementById('circle-checkbox').checked = true;
    }
    if (localStorage.getItem('mainCirclePositions') == null) {
        setCirclePositions('433', 'main');
    }
    if (localStorage.getItem('oppoCirclePositions') == null) {
        setCirclePositions('433', 'oppo');
    }
    
    determineFormation();

    setTextBoxOrders();
    textToCircle();

    standardSizes = getStandardSizes();
    standardCircleSize = standardSizes[0];
    standardBorderSize = standardSizes[1];
    standardNumberSizeLarge = standardSizes[2];
    standardNumberSizeMedium = standardSizes[3];
    standardNumberSizeSmall = standardSizes[4];
    standardNumberSizeLargeOppo = standardSizes[5];
    standardNumberSizeMediumOppo = standardSizes[6];
    standardNumberSizeSmallOppo = standardSizes[7];
    standardTextBoxOne = standardSizes[8];
    standardTextBoxTwo = standardSizes[9];
}


//Pre loads the JSON files stored locally
//Also enables help icon functionality
//Also enables gear icon functionality
document.addEventListener("DOMContentLoaded", function () {
    const helpIcon = document.querySelector('.help-icon');
    const gearIcon = document.querySelector('.gear-icon');
    const popup = document.querySelector('#popup');
    const closeBtn = document.querySelector('#closeBtn');
    const settings = document.querySelector('#settings');

    helpIcon.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click event propagation to the document
        popup.style.display = 'flex';
    });

    gearIcon.addEventListener('click', function (event) {
        var gearIconLocation = event.currentTarget.getBoundingClientRect();

        event.stopPropagation();
        if (settings.style.display != 'block') {
            settings.style.display = 'block';
            if (imageConWidth > 600) {
                settings.style.left = gearIconLocation.left + 14 + 'px';
                settings.style.top = gearIconLocation.top + 20 + 'px';
            }
            else {
                settings.style.left = gearIconLocation.left + 'px';
                settings.style.top = gearIconLocation.top - 10 + 'px';
            }
        }
        else {
            settings.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    document.addEventListener('click', function (event) {
        //Remove pop up help form if clicked outside
        if (event.target.id == 'popup') {
            popup.style.display = 'none'; // Hide the popup when clicking outside of it
        }
        //Remove settings menu if clicked outside
        else if (settings.style.display == 'block') {
            var clickedElement = event.target;
            // Check if the clicked element or any of its ancestors has id="settings"
            while (clickedElement) {
                if (clickedElement.id === 'settings' || clickedElement.id === 'drawingCanvas' || clickedElement.classList.toString().indexOf('pcr-') > -1) {
                    return; // Exit the function early
                }
                clickedElement = clickedElement.parentElement;
            }
            if (clickedElement == null) {
                event.stopPropagation();
                settings.style.display = 'none';
            }
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
                lineUpsObj[teamName].second = Object.values(jsonData.second);
                lineUpsObj[teamName].secondType = jsonData.secondType;
                lineUpsObj[teamName].colors = {};
                lineUpsObj[teamName].colors.mainColor = jsonData.colors.mainColor;
                lineUpsObj[teamName].colors.secondColor = jsonData.colors.secondColor;
                lineUpsObj[teamName].colors.numberColor = jsonData.colors.numberColor;
                lineUpsObj[teamName].keysArray = Object.keys(jsonData.starting);
                if (jsonData.secondType == 'opposition') {
                    if (jsonData.oppoFormation) {
                        lineUpsObj[teamName].oppoFormation = jsonData.oppoFormation;
                        lineUpsObj[teamName].oppoKeysArray = Object.keys(jsonData.second);
                    }
                    if (jsonData.oppoColors) {
                        lineUpsObj[teamName].oppoColors = {};
                        lineUpsObj[teamName].oppoColors.mainColor = jsonData.oppoColors.mainColor;
                        lineUpsObj[teamName].oppoColors.secondColor = jsonData.oppoColors.secondColor;
                        lineUpsObj[teamName].oppoColors.numberColor = jsonData.oppoColors.numberColor;
                    }
                }
                //If specific circle position data is available, use it
                if (jsonData.circlePositions) {
                    lineUpsObj[teamName].circlePositions = jsonData.circlePositions;
                }
                if (jsonData.oppoCirclePositions) {
                    lineUpsObj[teamName].oppoCirclePositions = jsonData.oppoCirclePositions;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

    var outputElementOne = document.querySelector('.circleSliderOutput');
    var outputElementTwo = document.querySelector('.drawSliderOutput');
    var outputElementThree = document.querySelector('.pitch-drawSliderOutput');
    setSliderOutputLabel(circleSlider, outputElementOne);
    setSliderOutputLabel(drawingSlider, outputElementTwo);
    setSliderOutputLabel(pitchDrawingSlider, outputElementThree);
});


// Retrieves the JSONs loaded in the GitHub
function getJsonFiles() {
    return new Promise((resolve, reject) => {
        const isFileServer = window.location.href.includes('127');

        if (isFileServer) {
            // Fetch JSON files locally
            const jsonFileNames = ['Ajax CL 18-19.json', 'Ajax Possible 23-24.json', 'Argentina WC 2022.json', 'Man Utd CL 1999.json', 'Barcelona vs Man Utd 2009 CL Final.json']; // Replace with actual file names

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

//Text to circle functionality
function textToCircle() {
    for (var i = 0; i < 11; i++) {
        const outputStarting = outputStartings[i];
        const outputSecond = outputSeconds[i];
        const outputOppo = outputOppos[i];

        inputBoxes[i].addEventListener("input", function () {
            console.log("TYPING");
            outputStarting.textContent = this.value;
            toggleOutputBoxVisibility(outputStarting);

            //Sets the local storage item named 'starting#'
            localStorage.setItem(this.id, this.value);
        });

        secondBoxes[i].addEventListener("input", function () {
            if (checkOppositionName.checked == false) {
                outputSecond.textContent = this.value;
                toggleOutputBoxVisibility(outputSecond);

                //Sets the local storage item named 'backupsecond#'
                var localStorageName = "backup" + this.id;
                localStorage.setItem(localStorageName, this.value);
            }
            else {
                outputOppo.textContent = this.value;
                toggleOutputBoxVisibility(outputOppo);

                //Sets the local storage item named 'opposecond#'
                var localStorageName = "oppo" + this.id;
                localStorage.setItem(localStorageName, this.value);
            }
        });
    }
}


//Tabs for the help pop-up
document.getElementById("defaultOpen").click();
document.getElementById("defaultOpen2").click();

function openHelpTab(evt, helpTab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("helpTabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("helpTabLinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (window.innerWidth > 780) {
        document.getElementById(helpTab).style.display = "inline-block";
    }
    else {

        document.getElementById(helpTab).style.display = "contents";
    }
    evt.currentTarget.className += " active";
}

function openJSONVariant(evt, jsonVariant) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(jsonVariant).style.display = "contents";
    evt.currentTarget.className += " active";
}

function getSpecificCirclePositions(inputString) {

    const result = {
        arrayId: [],
        arrayTop: [],
        arrayLeft: []
    };

    let currentIndex = 0;

    while (currentIndex < inputString.length) {
        var hashIndex = inputString.indexOf('#', currentIndex);
        var tIndex = inputString.indexOf('T', hashIndex);
        var lIndex = inputString.indexOf('L', tIndex);
        var newHashIndex = inputString.indexOf('#', lIndex);

        if (hashIndex === -1 || tIndex === -1 || lIndex === -1) {
            break; // Exit the loop if any of the markers are not found
        }
        const value1 = inputString.slice(hashIndex + 1, tIndex);
        const value2 = inputString.slice(tIndex + 1, lIndex);
        const value3 = inputString.slice(lIndex + 1, newHashIndex);

        result.arrayId.push(value1);
        result.arrayTop.push(value2);
        result.arrayLeft.push(value3);
        currentIndex = lIndex + 1; // Move the current index to the next '#'

    }
    return result;
}

const playButton = document.getElementById('playButton');
const circleButton = document.getElementById('circleButton');
const arrowButton = document.getElementById('arrowButton');
const movingButton = document.getElementById('movingButton');

playButton.addEventListener('mousedown', function () {
    playButton.classList.add('activePlay');
    playButton.parentNode.style.backgroundColor = 'rgba(36, 200, 36, 0.7)';
    setTimeout(function () {
        playButton.classList.remove('activePlay');

        playButton.parentNode.style.backgroundColor = 'rgba(200, 36, 36, 0.7)';
    }, 1200);
});

circleButton.addEventListener('mousedown', function () {
    circleButton.classList.add('activeCircle');
    circleButton.style.transform = 'translateY(-10%)';
    setTimeout(function () {
        circleButton.style.transform = 'translateY(10%) translateX(10%)';
        setTimeout(function () {
            circleButton.style.transform = 'translateY(10%) translateX(-10%)';
            setTimeout(function () {
                circleButton.style.transform = '';
            }, 200);
        }, 200);
    }, 200);
    circleButton.parentNode.style.backgroundColor = 'rgba(36, 200, 36, 0.7)';
    setTimeout(function () {
        circleButton.style.transform = '';
        circleButton.classList.remove('activeCircle');
        circleButton.parentNode.style.backgroundColor = 'rgba(200, 36, 36, 0.7)';
    }, 1000);
});

arrowButton.addEventListener('mousedown', function () {
    var arrowImage = document.getElementById('arrowImage');
    arrowImage.classList.add('activeArrow');
    arrowButton.style.backgroundColor = 'rgba(36, 200, 36, 0.7)';
    setTimeout(function () {
        arrowImage.classList.remove('activeArrow');

        arrowButton.style.backgroundColor = 'rgba(200, 36, 36, 0.7)';
    }, 1200);
});

movingButton.addEventListener('mousedown', function () {
    var movingCircle = document.getElementById('movingCircle');
    movingCircle.classList.add('activeMovingCircle')
    movingCircle.parentNode.style.backgroundColor = 'rgba(36, 200, 36, 0.7)';
    setTimeout(function () {
        movingCircle.classList.remove('activeMovingCircle');

        movingCircle.parentNode.style.backgroundColor = 'rgba(200, 36, 36, 0.7)';
    }, 1200);
});

var leftContainerWidth = document.querySelector('.left-container').getBoundingClientRect().width;
if (leftContainerWidth < 608) {

    var allColorPickers = document.querySelectorAll('.pickr > button');

    for (var x = 0; x < allColorPickers.length; x++) {
        allColorPickers[x].addEventListener('click', setPickrWindowLocation);
    }

    function setPickrWindowLocation(evt) {
        var grandParentPickr = evt.currentTarget.parentNode.parentNode;
        var currentButton = evt.currentTarget;
        var value;
        if (grandParentPickr.id == 'mainColorContainer') {
            value = 0;
        }
        else if (grandParentPickr.id == 'secondColorContainer') {
            value = 1;
        }
        else if (grandParentPickr.id == 'numberColorContainer') {
            value = 2;
        }
        else if (grandParentPickr.id == 'mainOppoColorContainer') {
            value = 3;
        }
        else if (grandParentPickr.id == 'secondOppoColorContainer') {
            value = 4;
        }
        else if (grandParentPickr.id == 'numberOppoColorContainer') {
            value = 5;
        }
        else if (grandParentPickr.id == 'colorPickerDrawingContainer') {
            value = 6;
        }
        else if (grandParentPickr.id == 'pitchColorPickerContainer') {
            value = 7;
        }
        var pickrHeight = parseFloat(createdPickrs[value].getBoundingClientRect().height);
        createdPickrs[value].style.top = parseFloat(currentButton.getBoundingClientRect().top) - pickrHeight + 'px';
        createdPickrs[value].style.left = parseFloat(currentButton.getBoundingClientRect().left) + 'px';
    }
}

function createPickr(elValue, defaultColor) {
    const tempPickr = new Pickr({
        el: elValue,
        container: 'body',
        theme: 'nano',
        default: defaultColor,
        comparison: false,
        adjustableNumbers: true,
        position: 'top-start',
        autoReposition: false,

        swatches: [

            '#800080', // Purple
            '#7A263A', // Maroon
            '#FF0000', // Red
            '#F36C21', // Orange
            '#F7B7D3', // Pink
            '#FFD700', // Gold
            '#006631', // Green
            '#000080', // Navy blue
            '#034694', // Chelsea Blue
            '#87CEEB', // Sky Blue
            '#FFFFFF', // White
            '#C0C0C0', // Silver
            '#808080', // Gray
            '#000000', // Black

        ],

        components: {
            palette: true,
            preview: true,
            opacity: true,
            hue: true,

            interaction: {
                hex: true,
                rgba: true,
                input: true
            },
        },
    });
    return tempPickr;
}



var oldValue = circleSlider.value;
var newValue;

circleSlider.oninput = function () {
    newValue = this.value;
    setCircleAndTextSize();
    oldValue = newValue;

    var outputElement = document.querySelector('.circleSliderOutput');
    setSliderOutputLabel(this, outputElement);
}

drawingSlider.oninput = function () {
    var outputElement = document.querySelector('.drawSliderOutput');
    setSliderOutputLabel(this, outputElement);
    updateOtherDrawingSliderValue(pitchDrawingSlider, this.value, '.pitch-drawSliderOutput');
}
pitchDrawingSlider.oninput = function () {
    var outputElement = document.querySelector('.pitch-drawSliderOutput');
    setSliderOutputLabel(this, outputElement);
    updateOtherDrawingSliderValue(drawingSlider, this.value, '.drawSliderOutput');
}

function updateOtherDrawingSliderValue(otherSlider, newBrushSize, otherElement) {
    otherSlider.value = newBrushSize;
    var outputElement = document.querySelector(otherElement);
    setSliderOutputLabel(otherSlider, outputElement);
}

function setSliderOutputLabel(slider, output) {
    output.innerHTML = slider.value;
    var leftPercentage = slider.value / slider.getAttribute('max') * 100;
    output.style.left = leftPercentage + '%';
    if (slider.id == 'circleSlider') {
        var middleSlider = (parseInt(slider.max) + parseInt(slider.min)) / 2;
        var transformPercentage = 75 + (50 / (slider.max - slider.min)) * (middleSlider - slider.value);
        output.style.transform = 'translate(-' + transformPercentage + '%, 0%)';
    }
    else if (slider.id == 'pitchDrawingSlider') {
        var pitchLeftPercentage = (slider.value - 1) / (slider.max - 1) * 100;
        output.style.left = pitchLeftPercentage + '%';
    }
}
var standardSizes = getStandardSizes();
function getStandardSizes() {
    var standardSizes = [];
    var numberCircle;
    var invisibleCircle = document.getElementById('invisibleCircle');

    //Circle
    standardSizes.push(parseFloat(invisibleCircle.getBoundingClientRect().width));
    //Border
    var borderCircle = invisibleCircle.querySelector('.circleStyle');
    standardSizes.push(parseFloat(window.getComputedStyle(borderCircle).getPropertyValue('border-width')));
    //Number Large
    var largeNumberObj = {};
    largeNumberObj.id = 'circle-number-font-large';
    numberCircle = invisibleCircle.querySelector('.circle-number-font-large');
    largeNumberObj.size = (parseFloat(window.getComputedStyle(numberCircle).getPropertyValue('font-size')));
    standardSizes.push(largeNumberObj);
    //Number Medium
    var mediumNumberObj = {};
    mediumNumberObj.id = 'circle-number-font-medium';
    numberCircle = invisibleCircle.querySelector('.circle-number-font-medium');
    mediumNumberObj.size = (parseFloat(window.getComputedStyle(numberCircle).getPropertyValue('font-size')));
    standardSizes.push(mediumNumberObj);
    //Number Small
    var smallNumberObj = {};
    smallNumberObj.id = 'circle-number-font-small';
    numberCircle = invisibleCircle.querySelector('.circle-number-font-small');
    smallNumberObj.size = (parseFloat(window.getComputedStyle(numberCircle).getPropertyValue('font-size')));
    standardSizes.push(smallNumberObj);
    //Number Large Oppo
    var largeOppoNumberObj = {};
    largeOppoNumberObj.id = 'circle-number-font-large-oppo';
    numberCircle = invisibleCircle.querySelector('.circle-number-font-large-oppo');
    largeOppoNumberObj.size = (parseFloat(window.getComputedStyle(numberCircle).getPropertyValue('font-size')));
    standardSizes.push(largeOppoNumberObj);
    //Number Medium Oppo
    var mediumOppoNumberObj = {};
    mediumOppoNumberObj.id = 'circle-number-font-medium-oppo';
    numberCircle = invisibleCircle.querySelector('.circle-number-font-medium-oppo');
    mediumOppoNumberObj.size = (parseFloat(window.getComputedStyle(numberCircle).getPropertyValue('font-size')));
    standardSizes.push(mediumOppoNumberObj);
    //Number Small Oppo
    var smallOppoNumberObj = {};
    smallOppoNumberObj.id = 'circle-number-font-small-oppo';
    numberCircle = invisibleCircle.querySelector('.circle-number-font-small-oppo');
    smallOppoNumberObj.size = (parseFloat(window.getComputedStyle(numberCircle).getPropertyValue('font-size')));
    standardSizes.push(smallOppoNumberObj);
    //Text style one
    var textStyleOneObj = {};
    var textStyleOneStarting = invisibleCircle.querySelector('.invisible-container > .startingStyleOne');
    var textStyleOneSecond = textStyleOneStarting.nextElementSibling;
    textStyleOneObj.fontSize = (parseFloat(window.getComputedStyle(textStyleOneStarting).getPropertyValue('font-size')));
    textStyleOneObj.bottomStarting = (parseFloat(window.getComputedStyle(textStyleOneStarting).getPropertyValue('bottom')));
    textStyleOneObj.bottomSecond = (parseFloat(window.getComputedStyle(textStyleOneSecond).getPropertyValue('bottom')));
    standardSizes.push(textStyleOneObj);

    //Text style two
    var textStyleTwoObj = {};
    var textStyleTwoStarting = invisibleCircle.querySelector('.invisible-container > .startingStyleTwo');
    var textStyleTwoSecond = textStyleTwoStarting.nextElementSibling;
    textStyleTwoObj.fontSize = (parseFloat(window.getComputedStyle(textStyleTwoStarting).getPropertyValue('font-size')));
    textStyleTwoObj.bottomStarting = (parseFloat(window.getComputedStyle(textStyleTwoStarting).getPropertyValue('bottom')));
    textStyleTwoObj.bottomSecond = (parseFloat(window.getComputedStyle(textStyleTwoSecond).getPropertyValue('bottom')));
    standardSizes.push(textStyleTwoObj);

    return standardSizes;
}
