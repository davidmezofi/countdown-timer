var myTime = {};
var myVideo;
var myImage;

//INIT VIDEO

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var playerDefaults = {
    autoplay: 0,
    autohide: 1,
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 0,
    disablekb: 1,
    enablejsapi: 0,
    iv_load_policy: 3
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: playerDefaults
    });
}



function time() {
    var myMinutes = Number(document.getElementById("myMinutes").value);
    var mySeconds = Number(document.getElementById("mySeconds").value);
    localStorage.setItem("myMinutes", myMinutes);
    localStorage.setItem("mySeconds", mySeconds);
    openWindow();
};

function getTime() {
    
};

// DISPLAY INPUTTED TIME ON PAGE LOAD

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
}

function getCssValuePrefix() {
    var rtrnVal = ''; //default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background) {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}

// OPEN WINDOW

function openWindow() {

    var width = 1920;
    var left = 1000;

    left += window.screenX;

    window.open("kello.html", 'countdown', 'resizable=1,scrollbars=1,fullscreen=0,height=1080,width=' + width + '  , left=' + left + ', toolbar=0, menubar=0,status=1');
    return 0;

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
var videolive = 0;

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



//VIDEO STUFF

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    vidRescale();

    var duration = localStorage.getItem("duration");
    var display = localStorage.getItem("display");
    startTimer(duration, display);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function vidRescale() {
    var w = window.innerWidth,
        h = window.innerHeight;
    if (w / h > 16 / 9) {
        player.setSize(w, w / 16 * 9);
        $('#player').css({
            'left': '0px'
        });
    } else {
        player.setSize(h / 9 * 16, h);
        $('#player').css({
            'left': -($('#player').outerWidth() - w) / 2
        });
    }
}


var videoid;
function parseVideo() {
    var url = myVideo;
    videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
        console.log("video id = ", videoid[1]);
    } else {
        console.log("The youtube url is not valid.");
    }
}

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
