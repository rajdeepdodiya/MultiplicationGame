const level1Questions = ["10 * 12", "3 * 3", "14 * 3 ", "8 * 7"]
const level2Questions = ["10 * 12", "3 * 3", "14 * 3 ", "8 * 7"]

var currentLevel = 1;
var timer = 60;

const loadquestions = () => {

    var questions1Array = [];
    for(let i = 0; i < 5 ; i++){
        const randomNo = Math.floor(Math.random(10)) + 1;
        console.log(randomNo)
        questions1Array.append(randomNo);
    }

    console.log(questions1Array);
    
    let html = `
    <div>
    <img class="wizardImage"> 
    </div>

    <div> 
    <p class="largeText">3 + 2 = </p>
    <p class="largeText">14 * 7 = </p>
    <p class="largeText">12 - 12 + 2 = </p>
    </div>
    `;

    return html;
}

const startGame = () => {

    document.querySelector(".gameplayPageContainerGridLayout").innerHTML = loadquestions

    // while(timer != 0 ){
        
    // }
    
console.log("ok");
}

const moveWizard = (evt) => {

    console.log("moveWizard");

    if(evt.keyCode === 38){
        alert("UP PRESSED");
    }

    else if(evt.keyCode === 40){
        console.log("DOWN PRESSED");
    }

    else if(evt.keyCode === 32){
        console.log("SPACE PRESSED");
    }

}

startGame();

document.querySelector("body").addEventListener("onkeydown", moveWizard)