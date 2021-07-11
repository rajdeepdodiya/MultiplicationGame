var audio = document.getElementById('audio')

const toggleAudio = () => {
    
    let image = document.querySelector(".audioButton").src
    console.log(image);
    audio.paused ? document.querySelector(".audioButton").src="assets/sound_muted.png" : document.querySelector(".audioButton").src="assets/sound_on.png" ;
    audio.paused ? audio.play() : audio.pause();

}

document.querySelector("#audio-button").addEventListener("click", toggleAudio)

