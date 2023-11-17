let isRunning = false;
let startTime;
let lapStartTime;
let laps = [];

function startStop() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (lapStartTime || 0);
        update();
    } else {
        isRunning = false;
        lapStartTime = new Date().getTime() - startTime;
    }
    updateStartStopButton();
}

function reset() {
    isRunning = false;
    startTime = 0;
    lapStartTime = 0;
    laps = [];
    document.getElementById("display").innerText = "00:00:00.000";
    updateLaps();
  }
  

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(formatTime(lapTime));
        updateLaps();
        lapStartTime = new Date().getTime();
    }
}

function update() {
    if (isRunning) {
        const currentTime = new Date().getTime() - startTime;
        document.getElementById("display").innerText = formatTime(currentTime);
        setTimeout(update, 10);
    }
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return (new Array(length).join('0') + number).slice(-length);
}

function updateLaps() {
    const lapsBody = document.getElementById("lapsBody");
    lapsBody.innerHTML = "";
    laps.forEach((lap, index) => {
        const tr = document.createElement("tr");
        const tdIndex = document.createElement("td");
        const tdTime = document.createElement("td");

        tdIndex.innerText = index + 1;
        tdTime.innerText = lap;

        tr.appendChild(tdIndex);
        tr.appendChild(tdTime);

        lapsBody.appendChild(tr);
    });
}

function updateStartStopButton() {
    const startStopButton = document.getElementById("startStop");
    startStopButton.innerText = isRunning ? "Pause" : "Start";
}

document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case " ":
            event.preventDefault();
            startStop();
            break;
        case "Enter":
            event.preventDefault();
            lap();
            break;
        case "Escape":
            event.preventDefault();
            reset();
            break;
    }
});

