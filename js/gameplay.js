const level1Questions = ["10 * 12", "3 * 3", "14 * 3 ", "8 * 7"]
const level2Questions = ["10 * 12", "3 * 3", "14 * 3 ", "8 * 7"]
var questionsArray = [];
var answersArray = [];
const noOfEnemies = 5;

var currentLevel = 1;
var totalLevels = 5;
var timer = 60;

var audio = document.getElementById('audio')

const toggleAudio = () => {
    
    let image = document.querySelector(".audioButton").src
    console.log(image);
    audio.paused ? document.querySelector(".audioButton").src="assets/sound_muted.png" : document.querySelector(".audioButton").src="assets/sound_on.png" ;
    audio.paused ? audio.play() : audio.pause();

}

document.querySelector("#audio-button").addEventListener("click", toggleAudio);

const generateQuestionsAndAnswers = () => {

    for(let i = 0 ; i < noOfEnemies; i++){

        const randomNumber1 = Math.floor(Math.random() * 15) + 1;
        console.log(randomNumber1);
        const randomNumber2 = Math.floor(Math.random() * 10) + 1;
        console.log(randomNumber2)
        const currentAnswer = randomNumber1 * randomNumber2;
        console.log(currentAnswer)

        questionsArray.push(randomNumber1+" * "+randomNumber2+" = ");
     
        answersArray.push(currentAnswer);
        
    }

    console.log(questionsArray);
    console.log(answersArray);
}

const loadWizard = () => {

    let html = `<p>`+answersArray[currentLevel]+`</p>`;
    return html;

}


const loadAllEnemies = (i) => {
    let html = ``;

    for (let i = 0; i < 5; i++){

        html += `<p id=enemy_`+i+`>`+questionsArray[i]+`</p>`;
    }
    
    return html;
}

const startGame = () => {

    generateQuestionsAndAnswers();

    document.querySelector(".gameplayPageContainerGridLayout").innerHTML = `
    <div class="enemyDiv">`
    +loadAllEnemies()+
    `</div>`
    +
    `<div class="wizardDiv">
    <img class="wizardImage">`
    +loadWizard()+ 
    `</div>
    `;
    
console.log("ok");

}
startGame();