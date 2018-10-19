var myTime = {};

function time() {
    var myMinutes = Number(document.getElementById("myMinutes").value);
    var mySeconds = Number(document.getElementById("mySeconds").value);
    localStorage.setItem("myMinutes", myMinutes);
    localStorage.setItem("mySeconds", mySeconds);
    openWindow();
};

// Open window
function openWindow() {
    var width = 1920;
    var left = 1000;

    left += window.screenX;

    window.open("kello.html", 'countdown',
                'resizable=1,scrollbars=1,fullscreen=0,height=1080,width=' +
                width + ' , left=' + left + ', toolbar=0, menubar=0,status=1');
    startTimer(duration, display);
    return 0;
}

function startTimer(duration, display) {
    display = document.querySelector('#time');
    var timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        console.log(minutes + ":" + seconds);
        if (--timer < 0) {
            timer = 0;
            // document.querySelector('#time').style.visibility = "hidden";
        }
    }, 1000);
};

function getTime() {
};

// Display input time on page load
function displayTime() {
    display = document.querySelector('#time');
    localStorage.setItem("display", display);

    var myMinutes = localStorage.getItem("myMinutes");
    var mySeconds = localStorage.getItem("mySeconds");
    var duration = (60 * Number(myMinutes)) + Number(mySeconds);

    localStorage.setItem("duration", duration);

    var timer = duration,
        minutes, seconds;

    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    startTimer(duration, display);
}

// Find the right method, call on correct element
function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    getTime();
}

// Handling the info button
var counter = 0;

function information(){
    if (counter == 0){
        document.querySelector("#infoButton").className = "fa fa-times-circle fa-2x";
        document.querySelector(".informationBox").style.height = "50px";
        counter = 1;
    } else if (counter == 1) {
        document.querySelector("#infoButton").className = "fa fa-info-circle fa-2x";
        document.querySelector(".informationBox").style.height = "0px";
        counter = 0;
    }
}
