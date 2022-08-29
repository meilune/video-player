const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// video.controls = "";

// Play & Pause --------------------------------//

//Play Icon showing
function showPlayIcon() {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
}

//Pause Icon showing
function showPauseIcon() {
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
}

// Function for video playing
function togglePlay() {
    if(video.paused) {
        video.play();
        showPauseIcon();
    } else {
        video.pause();
        showPlayIcon();
    }
}

//Play/pause video on a click, this needed to be added because after removing standard controls, the video tag element event listener wouldn't work as expected.
video.onclick = () => togglePlay();

// On Video End, show play button
video.addEventListener("ended", showPlayIcon);

// Progress Bar --------------------------------//

//Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`
}

//Update progress bar as the video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} / `;
    duration.textContent = `${displayTime(video.duration)}`
}

// To click to seek (Chrome seems to have a bug that won't allow this to work)
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    video.currentTime = (newTime * video.duration);
}

// Volume Controls --------------------------------//



// Change Playback Speed --------------------------------//

// Fullscreen ---------------------------------------//

// Event Listeners -------------------------------- //
playBtn.addEventListener("click", togglePlay, false);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
