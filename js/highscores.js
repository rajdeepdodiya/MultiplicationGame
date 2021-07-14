var audio = document.getElementById('audio')
var isAudioPreferred;
var highScoresList = new Array();
const highScoresName  = "HighScores";

const getHighScoresFromLocalDb = () => {

    // const scoresList = {"Rd", 1};
    // localStorage.setItem("HighScores", scoresList);

    let scoresList = []

    if("HighScores" in localStorage){

        scoresList = JSON.parse(localStorage.getItem("HighScores"));

        if (scoresList === null)
        {
            scoresList = []
        }

        console.log("SCORES: "+scoresList);
        let highScoresContainer = document.querySelector(".highScoresContainer")

        let innerHTML = ""

        innerHTML += `<table>
        <tr>
        <th> Rank </th>
        <th> NAME </th>
        <th> SCORE </th>
        </tr>       
        `

        for(let i = 0 ; i < scoresList.length; i++){

            innerHTML += `
            <tr>
            <td>`+`${i+1}`+` </td>
            <td>`+scoresList[i].name+`</td>
            <td>`+scoresList[i].score+`</td>
            </tr> `
        }

        innerHTML += `</table>`

        highScoresContainer.innerHTML = innerHTML

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
