const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const speed = document.querySelector(".player-speed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

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
let lastVolume = 1;

// Volume Icon changes
function volumeIconChange() {
    volumeIcon.className = "";
    if(video.volume > 0.7) {
        volumeIcon.classList.add("fa-solid", "fa-volume-high");
        volumeIcon.setAttribute("title", "Mute");
    } else if (video.volume > 0) {
        volumeIcon.classList.add("fa-solid","fa-volume-low");
        volumeIcon.setAttribute("title", "Mute");
    } else {
        volumeIcon.classList.add("fa-solid","fa-volume-xmark");
        volumeIcon.setAttribute("title", "Sound");
    }
}

//Volume Bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    //Call the icon changing function:
    volumeIconChange();
    lastVolume = video.volume;
} 

//Mute/unmute volume
function toggleMute() {
    if(video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIconChange();
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${video.volume * 100}%`;
        volumeIconChange();
    }
}

// Change Playback Speed --------------------------------//

function changeSpeed() {
    video.playbackRate = speed.value;
}

// Fullscreen ---------------------------------------//
  /* Open fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    player.classList.add("video-fullscreen");
  }

  /* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    player.classList.remove("video-fullscreen");
  }

  let fullscreen = false;

  // Toggle fullscreen
  function toggleFullscreen() {
    !fullscreen ? openFullscreen(player) : closeFullscreen();
    fullscreen = !fullscreen;
  }

// Event Listeners -------------------------------- //
playBtn.addEventListener("click", togglePlay, false);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
