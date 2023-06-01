const lineUpsObj = {};

document.addEventListener("DOMContentLoaded", function () {
    const jsonFiles = ['2022-23.json', '2023-24.json', 'Voorwaarts4.json'];
    const teamLineups = jsonFiles.map(file => fetch(file).then(response => response.json()));
    console.log(teamLineups);
    Promise.all(teamLineups)
        .then(data => {
            // Process the fetched JSON data
            data.forEach(jsonData => {
                // Access the data for each JSON file
                const info = jsonData.info;
                console.log(info);
                const starting = Object.values(jsonData.starting);
                const backup = Object.values(jsonData.backup);
                lineUpsObj[info] = {};
                lineUpsObj[info].starting = starting;
                lineUpsObj[info].backup = backup;
                console.log(JSON.stringify(lineUpsObj));
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

});

var startingArray = [];
var backupArray = [];

const circles = document.querySelectorAll(".circle");
const inputBoxes = document.querySelectorAll(".inputBox");
const backupBoxes = document.querySelectorAll(".backupBox");
const outputStartings = document.querySelectorAll(".outputStarting");
const outputBackups = document.querySelectorAll(".outputBackup");

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

function toggleOutputBoxVisibility(box, inputValue) {
    if (inputValue.trim() !== "") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

function determineLabel(xPos, yPos, index){
    const labels = document.querySelectorAll(".label");
    const circleNr = document.querySelectorAll(".circle-number");
    if(xPos >= 200 && xPos <= 440 && yPos >= 675 && yPos <= 750){
        labels[index].innerHTML = "GK:";
        labels[index+11].innerHTML = "GK:";
    } else if(xPos >= 440 && xPos <= 565 && yPos >= 560 && yPos <= 760){
        labels[index].innerHTML = "RB:";
        labels[index+11].innerHTML = "RB:";
    } else if(xPos >= 75 && xPos <= 200 && yPos >= 560 && yPos <= 760){
        labels[index].innerHTML = "LB:";
        labels[index+11].innerHTML = "LB:";
    } else if(xPos >= 320 && xPos <= 440 && yPos >= 560 && yPos <= 675){
        labels[index].innerHTML = "RCV:";
        labels[index+11].innerHTML = "RCV:";
    } else if(xPos >= 200 && xPos <= 320 && yPos >= 560 && yPos <= 675){
        labels[index].innerHTML = "LCV:";
        labels[index+11].innerHTML = "LCV:";
    } else if(xPos >= 440 && xPos <= 565 && yPos >= 465 && yPos <= 560){
        labels[index].innerHTML = "RWB:";
        labels[index+11].innerHTML = "RWB:";
    } else if(xPos >= 200 && xPos <= 440 && yPos >= 444 && yPos <= 560){
        labels[index].innerHTML = "DMC:";
        labels[index+11].innerHTML = "DMC:";
    } else if(xPos >= 75 && xPos <= 200 && yPos >= 465 && yPos <= 560){
        labels[index].innerHTML = "LWB:";
        labels[index+11].innerHTML = "LWB:";
    } else if(xPos >= 440 && xPos <= 565 && yPos >= 280 && yPos <= 465){
        labels[index].innerHTML = "RM:";
        labels[index+11].innerHTML = "RM:";
    } else if(xPos >= 200 && xPos <= 440 && yPos >= 300 && yPos <= 444){
        labels[index].innerHTML = "MC:";
        labels[index+11].innerHTML = "MC:";
    } else if(xPos >= 75 && xPos <= 200 && yPos >= 280 && yPos <= 465){
        labels[index].innerHTML = "LM:";
        labels[index+11].innerHTML = "LM:";
    } else if(xPos >= 440 && xPos <= 565 && yPos >= 35 && yPos <= 280){
        labels[index].innerHTML = "RW:";
        labels[index+11].innerHTML = "RW:";
    } else if(xPos >= 200 && xPos <= 440 && yPos >= 185 && yPos <= 300){
        labels[index].innerHTML = "AMC:";
        labels[index+11].innerHTML = "AMC:";
    } else if(xPos >= 75 && xPos <= 200 && yPos >= 35 && yPos <= 280){
        labels[index].innerHTML = "LW:";
        labels[index+11].innerHTML = "LW:";
    } else if(xPos >= 200 && xPos <= 440 && yPos >= 35 && yPos <= 185){
        labels[index].innerHTML = "ST:";
        labels[index+11].innerHTML = "ST:   ";
    }
}

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

    inputBoxes.forEach((inputBox, index) => {
        inputBox.value = startingArray[index] || "";
        toggleOutputBoxVisibility(outputStartings[index], inputBox.value);
        backupBoxes[index].value = backupArray[index] || "";
        toggleOutputBoxVisibility(outputBackups[index], backupBoxes[index].value);
        outputStartings[index].innerText = inputBox.value;
        outputBackups[index].innerText = backupBoxes[index].value;
    });
});

// Initial update on page load
selectTeam.dispatchEvent(new Event("change"));