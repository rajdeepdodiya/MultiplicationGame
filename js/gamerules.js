var audio = document.getElementById('audio')
var isAudioPreferred;

const updateSoundIcon = () => {
    
    let image = document.querySelector(".audioButton").src
    console.log(image);

    if(isAudioPreferred){
        document.querySelector(".audioButton").src="assets/sound_muted.png"
    }
    else{
        document.querySelector(".audioButton").src="assets/sound_on.png"
    }
    
}

const toggleAudio = () => {
    
    audio.paused ? audio.play() : audio.pause();
    
    if(audio.paused){
        isAudioPreferred = "false"
        localStorage.setItem("isAudioPreferred", "false");
    }

    else{

        isAudioPreferred = "true"
        localStorage.setItem("isAudioPreferred", "true");
    }

    updateSoundIcon();
    console.log(localStorage.getItem("isAudioPreferred"));

}

const getAudioPreferences = () => {

    isAudioPreferred = localStorage.getItem("isAudioPreferred");
    console.log("getAudioPreferences : isAudioPreferred : "+isAudioPreferred);

    //true
    if(isAudioPreferred == "true"){
        console.log("getAudioPreferences(): playing audio");
        audio.play();
    }
    //false
    else{
        console.log("getAudioPreferences(): not playing audio");
        audio.pause();
    }
    updateSoundIcon();
}

document.querySelector("#audio-button").addEventListener("click", toggleAudio);
window.onload = getAudioPreferences

// document.addEventListener('load', getAudioPreferences)