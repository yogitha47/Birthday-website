// Handles game logic, unlocking system, and UI rendering
console.log("JS Loaded ✅");

// 🆕 INIT
if(localStorage.getItem("initialized") !== "true"){
    localStorage.clear();

    localStorage.setItem("initialized", "true");
    localStorage.setItem("currentDay", "1");
    localStorage.setItem("lastOpenedTime", "0");
    localStorage.setItem("unlocked", JSON.stringify({}));
}

// 🔐 STORAGE
let unlockedLetters = JSON.parse(localStorage.getItem("unlocked")) || {};
let lastOpenedTime = parseInt(localStorage.getItem("lastOpenedTime"));

let selectedLetter = null;
let currentPuzzle = null;

let currentGuess = '';
let attempts = 0;
let maxAttempts = 5;
let guesses = [];

// ⌨️ KEYBOARD
let keyboard = [
['Q','W','E','R','T','Y','U','I','O','P'],
['A','S','D','F','G','H','J','K','L'],
['ENTER','Z','X','C','V','B','N','M','⌫']
];

// ⏳ TIMER CHECK
function canUnlockNextDay(){
    if(lastOpenedTime === 0) return false;
    return (Date.now() - lastOpenedTime) >= 86400000;
}

// 📦 RENDER
function renderEnvelopes(){
    let container = document.getElementById("envelopes");
    if(!container) return;

    container.innerHTML = "";

    for(let i=1;i<=7;i++){

        let div=document.createElement("div");

        div.style="background:rgba(255,255,255,0.5);padding:20px;border-radius:15px;text-align:center;margin:10px;cursor:pointer;";

        // Day 1–5
        if(i <= 5){
            div.innerHTML=`Day ${i}<br>🎮`;
            div.onclick=()=>startGame(i);
        }

        // Day 6
        else if(i === 6){
            if(canUnlockNextDay()){
                div.innerHTML=`Day 6<br>🎮`;
                div.onclick=()=>startGame(6);
            }else{
                div.innerHTML=`Day 6<br>🔒`;
                div.style.opacity="0.5";
            }
        }

        // Day 7
        else{
            div.innerHTML=`Day 7<br>🔒`;
            div.style.opacity="0.5";
        }

        container.appendChild(div);
    }
}

// 🎮 START GAME
function startGame(day){

    if(day === 6 && !canUnlockNextDay()){
        alert("Please try again later.");
        return;
    }

    selectedLetter = letters[day-1];
    currentPuzzle = wordPuzzles[day];

    document.getElementById("gameView").style.display="block";
    document.getElementById("letterView").style.display="none";

    document.getElementById("gameDay").textContent=day;
    document.getElementById("hintSection").textContent=currentPuzzle.hint;

    currentGuess="";
    attempts=0;
    guesses=[];

    renderKeyboard();
    renderGuesses();
}

// ⌨️ KEYBOARD
function renderKeyboard(){
    let container=document.getElementById("keyboard");
    container.innerHTML="";

    keyboard.forEach(row=>{
        let rowDiv=document.createElement("div");

        row.forEach(key=>{
            let btn=document.createElement("button");
            btn.textContent=key;
            btn.onclick=()=>handleKeyPress(key);
            rowDiv.appendChild(btn);
        });

        container.appendChild(rowDiv);
    });
}

// 🔤 GRID
function renderGuesses(){
    let container=document.getElementById("guessesContainer");
    container.innerHTML="";

    let len=currentPuzzle.word.length;

    for(let i=0;i<maxAttempts;i++){
        let row=document.createElement("div");

        for(let j=0;j<len;j++){
            let box=document.createElement("span");

            box.style="display:inline-block;width:45px;height:45px;margin:5px;border-radius:10px;background:#fff;text-align:center;line-height:45px;font-weight:bold;";

            if(guesses[i]){
                box.textContent=guesses[i][j];

                if(guesses[i][j]===currentPuzzle.word[j]){
                    box.style.background="#d8b4f8";
                }else{
                    box.style.background="#fbcfe8";
                }
            }
            else if(i===attempts){
                box.textContent=currentGuess[j]||"";
            }

            row.appendChild(box);
        }

        container.appendChild(row);
    }
}

// 🎯 INPUT
function handleKeyPress(key){
    if(key==="⌫") currentGuess=currentGuess.slice(0,-1);
    else if(key==="ENTER") submitGuess();
    else if(currentGuess.length<currentPuzzle.word.length) currentGuess+=key;

    renderGuesses();
}

// ✅ CHECK
function submitGuess(){

    if(currentGuess.length!==currentPuzzle.word.length){
        alert("Please enter the complete word.");
        return;
    }

    guesses.push(currentGuess);
    attempts++;

    // 🎉 CORRECT
    if(currentGuess===currentPuzzle.word){

        unlockedLetters[selectedLetter.day]=true;
        localStorage.setItem("unlocked",JSON.stringify(unlockedLetters));

        setTimeout(()=>openLetter(selectedLetter),400);
        return;
    }

    // ❌ FAIL
    if(attempts===maxAttempts){
        alert("Incorrect. Try again.");
        attempts=0;
        guesses=[];
    }

    currentGuess="";
    renderGuesses();
}

// 💌 LETTER
function openLetter(letter){

    document.getElementById("gameView").style.display="none";
    document.getElementById("letterView").style.display="block";

    document.getElementById("letterTitle").textContent=letter.title;
    document.getElementById("letterDay").textContent="Day "+letter.day;

    document.getElementById("letterText").innerHTML=`
    <div style="background:rgba(255,255,255,0.7);padding:20px;border-radius:15px;white-space:pre-line;">
    ${letter.content}
    </div>`;

    // Start timer when Day 5 is opened first time
    if(letter.day === 5 && lastOpenedTime === 0){
        lastOpenedTime = Date.now();
        localStorage.setItem("lastOpenedTime", lastOpenedTime);
    }
}

// 🔙
function closeGame(){
    document.getElementById("gameView").style.display="none";
}

function closeLetter(){
    document.getElementById("letterView").style.display="none";
    renderEnvelopes();
}

// ⏳ COUNTDOWN
function updateCountdown(){

    let el = document.getElementById("countdown");
    if(!el) return;

    if(lastOpenedTime === 0){
        el.innerText="Days 1–5 are available";
        return;
    }

    let remaining = 86400000 - (Date.now() - lastOpenedTime);

    if(remaining <= 0){
        el.innerText="Day 6 is now available";
        return;
    }

    let h = Math.floor(remaining / (1000*60*60));
    let m = Math.floor((remaining % (1000*60*60)) / (1000*60));
    let s = Math.floor((remaining % (1000*60)) / 1000);

    el.innerText=`Day 6 unlocks in ${h}h ${m}m ${s}s`;
}

// 🚀 INIT
window.onload=function(){
    renderEnvelopes();
    updateCountdown();
    setInterval(updateCountdown,1000);
};

window.closeGame=closeGame;
window.closeLetter=closeLetter;