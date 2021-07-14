var audio = document.getElementById('audio')
var isAudioPreferred;
var highScoresList = new Array();
const highScoresName  = "HighScores";

const getHighScoresFromLocalDb = () => {

    // const scoresList = {"Rd", 1};
    // localStorage.setItem("HighScores", scoresList);

    if("HighScores" in localStorage){

        const scoresList = JSON.parse(localStorage.getItem("HighScores"));
        console.log("SCORES: "+list);

        document.querySelectorAll("highScoresContainer").innerHTML = `<div>
        <tr>
        <th> Rank </tr>
        <th> NAME </tr>
        <th> SCORE </tr>
        </tr>       
        </div>
        `

        for(let i = 0 ; i < scoresList.size(); i++){

            document.querySelector("#highScoresContainer").innerHTML += `<div>
            <tr>
            <td> <p> `+i+`. </p> </td>
            <td> <p> `+scoresList[i].getName+` </p> </td>
            <td> <p> `+scoresList[i].getScore+` </p> </td>
            </tr>
            </div>
            `
        }

    }

    else{
        console.log("No scores saved");
        
        document.querySelector(".highScoresContainer").innerHTML += `<div>
        <p>NO SCORES EXIST IN DATABASE.  </p>
        </div>` 
    }

}

const updateSoundIcon = () => {
    
    let image = document.querySelector(".audioButton").src
    console.log(image);

    if(isAudioPreferred == "true"){
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
    getHighScoresFromLocalDb();
}

document.querySelector("#audio-button").addEventListener("click", toggleAudio);
window.onload = getAudioPreferences


// document.addEventListener('load', getAudioPreferences)
