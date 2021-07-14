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
        isAudioPreferred = false
        localStorage.setItem("isAudioPreferred", false);
    }

    else{
        isAudioPreferred = true
        localStorage.setItem("isAudioPreferred", true);
    }

    updateSoundIcon();

}


const getAudioPreferences = () => {

    isAudioPreferred = localStorage.getItem("isAudioPreferred");
    localStorage.setItem("isAudioPreferred", true);
    console.log("getAudioPreferences : isAudioPreferred : "+isAudioPreferred);

    //true

    if(isAudioPreferred === null){
        console.log("getAudioPreferences() - null but : playing audio");
        audio.play();
    }

    else if(isAudioPreferred == "true"){
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

const saveCurrentUserToLocalStorage = () =>{

   const playerName = document.getElementById("playerName").value.trim();

    if(playerName === ""){
        console.log("No name entered");
        alert(`Please enter your name to start playing`);
    }

    else{
        localStorage.setItem("currentUser", playerName);
        console.log(playerName);
        window.open("Gameplay.html", "_self");
    }
}

document.querySelector("#audio-button").addEventListener("click", toggleAudio)

document.getElementById("startGame").addEventListener("click", saveCurrentUserToLocalStorage)

// document.addEventListener("load", getAudioPreferences)

window.onload = getAudioPreferences
