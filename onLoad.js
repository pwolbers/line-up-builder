const lineUpsObj = {};
var startingArray = [];
var secondArray = [];
var startKeyArray = [];
var secondKeyArray = [];
var secondType;
var lines = []; // Array to store line elements
var screenWidth;
var oppoCircleHasBeenDragged = false;
var isDrawing = false;
var secondContainerInputs = [];
var oppoContainerInputs = [];

const jsonFileInput = document.getElementById('jsonFileInput');
const chooseFileButton = document.getElementById('chooseFileButton');
const importButton = document.getElementById('importButton');

const allCircles = document.querySelectorAll(".circle, .oppoCircle");
const mainCircles = document.querySelectorAll(".circle");
const oppoCircles = document.querySelectorAll(".oppoCircle");

const inputBoxes = document.querySelectorAll(".inputBox");
const secondBoxes = document.querySelectorAll(".secondBox");

const outputStartings = document.querySelectorAll(".outputStarting");
const outputSeconds = document.querySelectorAll(".outputSecond");
const outputOppos = document.querySelectorAll(".outputOpponent");

const lineupContainer = document.querySelector(".lineup-container");
const imageContainer = document.getElementById('image-container');
const imageConHeight = imageContainer.offsetHeight;
const imageConWidth = imageContainer.offsetWidth;

const teamNameBox = document.getElementById('teamNameBox');
const screenshotButton = document.getElementById('screenshotButton');
const downloadButton = document.getElementById('downloadButton');
const selectTeam = document.getElementById("select-team");
const selectFormation = document.getElementById("select-formation");

const checkOpposition = document.getElementById("oppo-checkbox");
const checkOppositionName = document.getElementById("oppo-name-checkbox");
const oppoFormation = document.getElementById("oppo-formation");

const lineYOne = (25 / 900) * imageConHeight;
const lineYTwo = (270 / 900) * imageConHeight;
const lineYThree = (360 / 900) * imageConHeight;
const lineYFour = (480 / 900) * imageConHeight;
const lineYFive = (580 / 900) * imageConHeight;
const lineYSix = (710 / 900) * imageConHeight;
const lineYSeven = (835 / 900) * imageConHeight;

const lineXOne = (75 / 730) * imageConWidth;
const lineXTwo = (195 / 730) * imageConWidth;
const lineXThree = (290 / 730) * imageConWidth;
const lineXFour = (403 / 730) * imageConWidth;
const lineXFive = (502 / 730) * imageConWidth;
const lineXSix = (627 / 730) * imageConWidth;

const oppoLineYOne = (25/900) * imageConHeight;
const oppoLineYTwo = (115/900) * imageConHeight;
const oppoLineYThree = (245/900) * imageConHeight;
const oppoLineYFour = (355/900) * imageConHeight;
const oppoLineYFive = (465/900) * imageConHeight;
const oppoLineYSix = (545/900) * imageConHeight;
const oppoLineYSeven = (835/900) * imageConHeight;

let startX, startY;

$(document).ready(function () {
    $("#starting-column-title").click(function () {
        var inputContainers = $(this).siblings(".input-container");
        var showLineUpButton = document.getElementById('showLineUpButton');
        const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
        if (displayValue == 'block') {
            toggleDisplay(inputContainers, true, 'starting');
        } else {
            toggleDisplay(inputContainers, false, 'starting');
            parentContainer.style.boxShadow = 'none';
        }
    });

    $("#second-column-title").click(function () {
        var inputContainers = $(this).siblings(".input-container");
        var showLineUpButton = document.getElementById('showLineUpButton');
        const displayValue = window.getComputedStyle(showLineUpButton).getPropertyValue('display');
        if (displayValue == 'block') {
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


    setCirclePositions('433', 'main');
    determineFormation();

    setTextBoxOrders();
    textToCircle();
}

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

    var mediaQuery = window.matchMedia('(min-width: 825px)'); // Adjust the media query as needed

    handleViewportChange(mediaQuery.matches); // Check initial viewport state

    mediaQuery.addEventListener('change', function (event) {
        handleViewportChange(event.matches); // Handle changes in viewport state
    });

    function handleViewportChange(matches) {
        if (matches) {
            lineupContainer.style.display = 'block'; // Set display to 'block'
        } else {
            lineupContainer.style.display = 'block'; // Set display to 'none'
        }
    }

    var showLineUpButton = document.getElementById('showLineUpButton');
    showLineUpButton.textContent = 'Show line-up and formation'; // Change button text
});

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
        console.log(gearIconLocation.top);
        doTheThing();
        console.log(window.getComputedStyle(gearIcon).getPropertyValue('top'));
        console.log(window.getComputedStyle(gearIcon).getPropertyValue('left'));
        console.log(event.currentTarget.style.top);
        event.stopPropagation();
        if (settings.style.display != 'block') {
            settings.style.display = 'block';
            settings.style.top = gearIconLocation.top + 20 + 'px';
            settings.style.left = gearIconLocation.left + 14 + 'px';
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
                if (clickedElement.id === 'settings') {
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
});

function doTheThing() {

    var gearIcon = document.querySelector('.gear-icon');
    console.log("TEST: " + gearIcon.style.left);
}
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
            outputStarting.innerText = this.value;
            toggleOutputBoxVisibility(outputStarting);
        });

        secondBoxes[i].addEventListener("input", function () {
            if (checkOppositionName.checked == false) {
                outputSecond.innerText = this.value;
                toggleOutputBoxVisibility(outputSecond);
            }
            else {
                outputOppo.innerText = this.value;
                toggleOutputBoxVisibility(outputOppo);
            }
        });
    }
}

//Tabs for the help pop-up
document.getElementById("defaultOpen").click();

function openJSONVariant(evt, jsonVariant) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(jsonVariant).style.display = "block";
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