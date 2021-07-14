
class Question {
    constructor(question, answer) {
      this.question = question;
      this.answer = answer;
    }
}

class Highscore {
    constructor(name, score) {
        this.name = name;
        this.score = score;
      }
}


const totalLevels = 5;

var currentLevelQuestions = []
var currentLevel = 1;
var timer = 60;
var wizardPosition = 2;
var currentAnswer = 0;
var intervals = []
var gameTimer = null
var username = null;
var timeRemaining = 60



const generateQuestionsAndAnswers = () => {
    currentLevelQuestions = []
    for(let i = 0 ; i < 5; i++){

        let randomNumber1 = Math.floor(Math.random() * 15) + 1;
        let randomNumber2 = Math.floor(Math.random() * 10) + 1;
        let answer = randomNumber1 * randomNumber2;

        let question = new Question(`${randomNumber1} x ${randomNumber2} = ?`, answer)
        currentLevelQuestions.push(question);
    }

}


const resetQandAForLevel = () =>
{
    wizardPosition = 2;
    currentAnswer = currentLevelQuestions[0].answer;
    shuffle(currentLevelQuestions);
    let innerHTML = ""   

    for(let i = 0; i < 5; i++)
    {
        let question = currentLevelQuestions[i];

        //GhostDiv
        innerHTML += `<div class="holderDiv">
            <div class="ghostDiv" >
                <img class="ghostImage" src="assets/ghost_sprite.png" alt="ghost">
                <p>${question.question}</p>
            </div>
        </div>`

        //Wizard Div
        innerHTML += '<div class="wizardHolder holderDiv">'
        if (wizardPosition == i)
        {
            innerHTML += `<div class="wizardDiv">
                <img class="wizardImage" src="assets/wizard.png" alt="wizard">
                <p id="keyboardInput">${currentAnswer}</p>
            </div>`
        }
        innerHTML += '</div>'
    }

    document.querySelector("main").innerHTML = innerHTML;
}

const changeQandAforLevelinHTML = () =>
{
    currentAnswer = currentLevelQuestions[0].answer;
    shuffle(currentLevelQuestions);

    let mainTag = document.querySelector("main")

    let holderDivElems = mainTag.children;

    for (let index = 0; index < holderDivElems.length; index++)
    {
        let holderDiv = holderDivElems[index];
        let pos = Math.floor(index/2)

        if (index % 2 === 0)
        {
            let question = currentLevelQuestions[pos];
            //GhostDiv

            let ghostDiv = holderDiv.children[0];
            let questionPTag = ghostDiv.children[1];

            questionPTag.innerHTML = question.question;

            // holderDiv.innerHTML = `<div class="ghostDiv" >
            //     <img class="ghostImage" src="assets/ghost_sprite.png" alt="ghost">
            //     <p>${question.question}</p>
            // </div>`
        }
        else
        {
            //Wizard Div
            if (holderDiv.childElementCount > 0)
            {
                let wizardDiv = holderDiv.children[0];
                let answerPTag = wizardDiv.children[1];
                answerPTag.innerHTML = currentAnswer;
            }
        }
    }
}

const startLevel = () => {
    let animatables = document.getElementsByClassName("ghostDiv")

    for (let index = 0; index < animatables.length; index++)
    {
        let elem = animatables[index];
        let secondsToFinish = (Math.floor(Math.random() * 6) + 10) * 1000; // random between 10-15s
        
        clearInterval(intervals[index]);
        intervals[index] = setInterval(frame, 1); //in milliseconds 1s = 1000 milliseconds

        let start = Date.now();


        function frame() {

            let timePassed = Date.now() - start;
            let percentageDone = timePassed/secondsToFinish;

            let width = elem.parentElement.clientWidth;
            let maxPos = width - elem.clientWidth;

            let pos =  percentageDone * maxPos;

            if (pos >= maxPos ) {
                clearInterval(intervals[index]);
                elem.style.left = 0 + "px"
                elem.setAttribute("style", "float:right;")

                showGameOverScreen(false)
                

            } else {
                elem.style.left = pos + "px"; 
            }
        }
    }

}

const keyboardPressed = (event) =>
{
    let keyCode = event.keyCode;
    
    if (keyCode === 32)
    {
        validateAnswer();
    }
    else
    {
        return;
    }
}

const keyBoardkeyDown = (event) =>
{
    let keyCode = event.keyCode;
    if (keyCode !== 38 && keyCode !== 40 )
    {
        return;
    }
    let main = document.querySelector("main");
    let wizardHolders = main.querySelectorAll(".wizardHolder");
    let wizardHolder = wizardHolders[wizardPosition]
    let html = wizardHolder.innerHTML.trim();

    if (keyCode === 38)
    {
        //up
        if (wizardPosition == 0)
        {
            return;
        }
        wizardHolders[wizardPosition].innerHTML = "";
        wizardPosition--;        
    }
    else
    {
        //down
        if (wizardPosition == 4)
        {
            return;
        }
        wizardHolders[wizardPosition].innerHTML = "";
        wizardPosition++;
    }
    wizardHolders[wizardPosition].innerHTML = html;
    
}

const validateAnswer = () =>
{
    let currentQn = currentLevelQuestions[wizardPosition];

    if (currentQn.answer === currentAnswer)
    {
        //Answer Correct

        clearAllTimers()

        currentLevel++;

        if(currentLevel > 5)
        {
            showGameOverScreen(true)
            return;
        }

        document.getElementById("currentLevel").innerText = `Level ${currentLevel} of 5`
        
        generateQuestionsAndAnswers()
        resetQandAForLevel()
        startLevel()
    }
    else
    {
        generateQuestionsAndAnswers()
        changeQandAforLevelinHTML()

    }

}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

const clearAllTimers = () =>
{
    for(let i = 0; i < intervals.length; i++)
    {
        clearInterval(intervals[i])
    }
}

const showGameOverScreen = (isClear) =>
{
    clearInterval(gameTimer);
    clearAllTimers()

    document.removeEventListener("keydown",keyBoardkeyDown);
    document.removeEventListener("keypress", keyboardPressed);
    document.querySelector("#audio-button").removeEventListener("click", toggleAudio);

    let body = document.querySelector("body")

    let text = "Game Over"
    if (isClear === true)
    {
        text = "Congrats!!! You cleared all Levels"
        checkAndAddForHighScores()

    }


    body.innerHTML += `<div class="gameOver center">
        <h1>${text}</h1>
        <button id="btn-playAgain" class="center-Horizontally">Play Again</button><br>
        <button id="btn-viewScores" class="center-Horizontally" type="button" onclick="Highscores.html" >View Highscores</button><br>        
    </div>`

    document.getElementById("btn-playAgain").addEventListener("click",playAgainClicked);
    document.getElementById("btn-viewScores").addEventListener("click",viewScoresClicked);

}

const checkAndAddForHighScores = () =>
{
    let scores = JSON.parse(localStorage.getItem("HighScores"));

    console.log(scores)
    if (scores == null)
    {
        scores = []
    }

    let correctPosition = scores.length
    for(let index = 0; index < scores.length; index++)
    {
        if (scores[index].score < timeRemaining)
        {
            console.log(scores[index].score)
            console.log(index)
            console.log(timeRemaining)

            correctPosition = index;
            break;
        }
    }

    let highScore = new Highscore(username,timeRemaining)

    scores.splice(correctPosition,0,highScore)

    if (scores.length > 5)
    {
        scores.pop()
    }

    localStorage.setItem("HighScores", JSON.stringify(scores));

}

const playAgainClicked = () =>
{
    console.log("Play again Called")
    let body = document.querySelector("body")
    body.removeChild(body.lastChild)
    startGame()
    setGameSound()
}

const viewScoresClicked = () =>
{
    window.location.href = "Highscores.html"
}

const startGame = () => {
    localStorage.removeItem("Highscores") //remove later

    clearAllTimers()
    clearInterval(gameTimer)

    wizardPosition = 2;
    currentLevel = 1;

    generateQuestionsAndAnswers();
    resetQandAForLevel();
    startLevel();

    document.getElementById("remainingTime").innerText = `Time remaining: 60`
    document.getElementById("currentLevel").innerText = `Level ${currentLevel} of 5`

    timeRemaining = 60

    gameTimer = setInterval( function() {

        timeRemaining--;

        let text = `Time remaining: ${timeRemaining}`
        document.getElementById("remainingTime").innerText = text

        if (timeRemaining === 0)
        {
            //GameOver
            showGameOverScreen(false)

        }


    },1000 )

    
    document.addEventListener("keydown",keyBoardkeyDown);
    document.addEventListener("keypress", keyboardPressed)


}

const toggleAudio = () => {

    let isAudioPreferred = localStorage.getItem("isAudioPreferred")

    if (isAudioPreferred == "true")
    {
        localStorage.setItem("isAudioPreferred", "false")
        document.querySelector(".audioButton").src="assets/sound_on.png"
        audio.pause()
    }
    else
    {
        localStorage.setItem("isAudioPreferred", "true")
        document.querySelector(".audioButton").src="assets/sound_muted.png"
        audio.play()
    }

    // var audio = document.getElementById('audio')
    // audio.paused ? document.querySelector(".audioButton").src="assets/sound_muted.png" : document.querySelector(".audioButton").src="assets/sound_on.png" ;
    // audio.paused ? audio.play() : audio.pause();
}     

const setGameSound = () =>
{

    let isAudioPreferred = localStorage.getItem("isAudioPreferred")

    if (isAudioPreferred == null)
    {
        isAudioPreferred = "true"
    }

    var audio = document.getElementById('audio')
    document.querySelector("#audio-button").addEventListener("click", toggleAudio);

    let src = document.querySelector(".audioButton").src 

    if (isAudioPreferred = "true")
    {
        document.querySelector(".audioButton").src = "assets/sound_muted.png"
        audio.play()
        console.log("play")
    }
    else
    {
        document.querySelector(".audioButton").src = "assets/sound_on.png"
        audio.pause()
        console.log("pause")

    }
}

const initialGameStart = () =>
{

    username = localStorage.getItem("currentUser")

    startGame()
    setGameSound()
}   

initialGameStart();


// let scores = [
//     new Highscore("inzi",45),
//     new Highscore("abc",33),
//     new Highscore("abc",31),
// ]

// localStorage.setItem("HighScores",JSON.stringify(scores))

// let correctPosition = scores.length;

// let newscore = 27

// for(let index = 0; index < scores.length; index++)
// {
//     if (scores[index].score < newscore)
//     {

//         correctPosition = index;
//         break;
//     }
// }

// let highScore = new Highscore("123",newscore)


// scores.splice(correctPosition,0,highScore)

// localStorage.setItem("HighScores",JSON.stringify(scores))
