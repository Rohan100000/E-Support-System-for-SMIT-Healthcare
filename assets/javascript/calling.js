const videoCall = document.getElementById("videoCall");
const speaker = document.getElementById("speaker");
const mic = document.getElementById("mic");

const videoCallIcon = document.getElementById("videoCallIcon");
const speakerIcon = document.getElementById("speakerIcon");
const micIcon = document.getElementById("micIcon");

let isSpeakerMuted = false;
let isMicMuted = false;
let isVideoCall = false;

videoCall.addEventListener("click", () => {
  if (isVideoCall) {
    videoCallIcon.src = "../assets/images/icons8-video-call-48.png";
    isVideoCall = false;
  } else {
    videoCallIcon.src = "../assets/images/icons8-no-video-48.png";
    isVideoCall = true;
  }
});

speaker.addEventListener("click", () => {
  if (isSpeakerMuted) {
    speakerIcon.src = "../assets/images/icons8-sound-48.png";
    isSpeakerMuted = false;
  } else {
    speakerIcon.src = "../assets/images/icons8-speaker-off-48.png";
    isSpeakerMuted = true;
  }
});

mic.addEventListener("click", () => {
  if (isMicMuted) {
    micIcon.src = "../assets/images/icons8-mic-48.png";
    isMicMuted = false;
  } else {
    micIcon.src = "../assets/images/icons8-mic-off-48.png";
    isMicMuted = true;
  }
});
