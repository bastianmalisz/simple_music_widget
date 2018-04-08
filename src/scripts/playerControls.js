let currentTrack = 0;
let state = 0;
let seconds = 0;
let iterval = "";
const musicCollection = [{
    artist: "Tool",
    track: "The Pot",
    album: "10,000 Days",
    duration: 387,
    coverURL: "cover1.jpg"
}, {
    artist: "A Perfect Circle",
    track: "Imagine",
    album: "eMOTIVe",
    duration: 297,
    coverURL: "cover2.jpg"
}, {
    artist: "Dead Can Dance",
    track: "The Carnival Is Over",
    album: "Into the Labyrinth",
    duration: 272,
    coverURL: "cover3.jpg"

}, {
    artist: "Pendulum",
    track: "Tarantula",
    album: "Hold Your Colour",
    duration: 332,
    coverURL: "cover4.jpg"
}];

const playBtn = document.querySelector(".player__controls--play");
const prevBtn = document.querySelector(".player__controls--prev");
const nextBtn = document.querySelector(".player__controls--next");
const mainPlayer = document.querySelector(".player");
const progress = document.querySelector(".player__timeline");
const progressBar = document.querySelector(".player__timeline--range");
playMusic();
stopMusic();

function changeState(e) {
    // currently playing
    if (mainPlayer.classList.contains("playing")) {
        mainPlayer.classList.remove("playing");
        mainPlayer.classList.add("paused");
        e.target.innerText = "▶";
        stopMusic();
    }
    // paused
    else {
        mainPlayer.classList.remove("paused");
        mainPlayer.classList.add("playing");
        e.target.innerText = "❚❚";
        playMusic();
    }
}

function countSeconds() {
    let minutes = 0;
    let rest = 0;
    seconds++;
    let percentageTime = (seconds / musicCollection[currentTrack].duration) * 100;
    document.querySelector(".player__timeline--range").style.flexBasis = percentageTime + "%";
    if (seconds < 60) {
        if (seconds < 10) {
            document.querySelector(".currPlayStat").innerHTML = "0:0" + seconds;
        } else {
            document.querySelector(".currPlayStat").innerHTML = "0:" + seconds;
        }
    } else {
        minutes = ~~(seconds / 60);
        rest = (seconds % 60);
        if (rest < 10) {
            document.querySelector(".currPlayStat").innerHTML = minutes + ":0" + rest;
        } else {
            document.querySelector(".currPlayStat").innerHTML = minutes + ":" + rest;
        }
    }
    if (seconds >= musicCollection[currentTrack].duration) {
        nextTrack();
    }
}

function playMusic() {
    interval = setInterval(countSeconds, 1000);
}

function stopMusic() {
    clearInterval(interval);
}

function clickOnProgressBar(e) {
    // width of clicked element
    let elWidth = e.target.clientWidth;
    // position of clicked element in X axis
    let elClickedXpos = e.offsetX;
    console.log(e, elWidth, elClickedXpos);
    let percentageProgressBarPos = (elClickedXpos / elWidth) * 100;
    progressBar.style.flexBasis = percentageProgressBarPos + "%";
    seconds = Math.round((musicCollection[currentTrack].duration * (percentageProgressBarPos / 100)));
    if (seconds < 60) {
        if (seconds < 10) {
            document.querySelector(".currPlayStat").innerHTML = "0:0" + seconds;
        } else {
            document.querySelector(".currPlayStat").innerHTML = "0:" + seconds;
        }
    } else {
        minutes = ~~(seconds / 60);
        rest = (seconds % 60);
        if (rest < 10) {
            document.querySelector(".currPlayStat").innerHTML = minutes + ":0" + rest;
        } else {
            document.querySelector(".currPlayStat").innerHTML = minutes + ":" + rest;
        }
    }
}

function nextTrack() {
    currentTrack += 1;
    if (currentTrack == 4) {
        currentTrack = 0;
    }
    console.log(currentTrack);
    stopMusic();
    if (mainPlayer.classList.contains("playing") || mainPlayer.classList.contains("paused")) {
        mainPlayer.classList.remove("playing");
        mainPlayer.classList.remove("paused");
    }
    mainPlayer.classList.add("loading");

    // simulation of music loading - set 2s
    setTimeout(function () {
        mainPlayer.classList.remove("loading");
        document.querySelector(".img-responsive").src = "assets/" + musicCollection[currentTrack].coverURL + "";
        document.querySelector(".player__info--trackName").innerHTML = musicCollection[currentTrack].track;
        document.querySelector(".player__info--artist").innerHTML = musicCollection[currentTrack].artist;
        document.querySelector(".player__info--album").innerHTML = musicCollection[currentTrack].album;
        document.querySelector(".totalTrackTime").innerHTML = ~~(musicCollection[currentTrack].duration / 60) + ":" + (musicCollection[currentTrack].duration % 60);
        document.querySelector(".currPlayStat").innerHTML = "0:00";
        document.querySelector(".player__timeline--range").style.flexBasis = 0 + "%";
        playBtn.innerText = "▶";
        seconds = 0;
    }, 2000);
}

function prevTrack() {
    currentTrack -= 1;
    if (currentTrack == -1) {
        currentTrack = 3;
    }
    stopMusic();
    if (mainPlayer.classList.contains("playing") || mainPlayer.classList.contains("paused")) {
        mainPlayer.classList.remove("playing");
        mainPlayer.classList.remove("paused");
    }
    mainPlayer.classList.add("loading");
    // simulation of music loading - set .5s because loaded files loads faster!
    setTimeout(function () {
        mainPlayer.classList.remove("loading");
        document.querySelector(".img-responsive").src = "assets/" + musicCollection[currentTrack].coverURL + "";
        document.querySelector(".player__info--trackName").innerHTML = musicCollection[currentTrack].track;
        document.querySelector(".player__info--artist").innerHTML = musicCollection[currentTrack].artist;
        document.querySelector(".player__info--album").innerHTML = musicCollection[currentTrack].album;
        document.querySelector(".totalTrackTime").innerHTML = ~~(musicCollection[currentTrack].duration / 60) + ":" + (musicCollection[currentTrack].duration % 60);
        document.querySelector(".currPlayStat").innerHTML = "0:00";
        document.querySelector(".player__timeline--range").style.flexBasis = 0 + "%";
        playBtn.innerText = "▶";
    }, 500);
    seconds = 0;
}

playBtn.addEventListener("click", changeState);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
progress.addEventListener("click", clickOnProgressBar);