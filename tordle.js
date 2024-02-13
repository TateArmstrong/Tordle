import { words } from './valid-words.js';
import { answers } from './answers.js';

var activeRow = document.getElementById('row1');
var info = document.getElementById('info');

var activeWord = '     '; 
var answer = getRandomWord().toUpperCase();
var currentLetter = 0;
var currentRow = 1;

function setCharAt(str, index, chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function getRandomWord(){
    return answers[Math.floor(Math.random() * answers.length)];
}

document.onkeydown = function (e) {
    handleKeyEvent(e);
};

function handleKeyEvent(e) {
    const input = String.fromCharCode(e.keyCode)
    info.innerText = '';

    if(e.keyCode === 13){
        if(isValidWord()){
            if(activeWord === answer){
                info.innerText = 'YOU WIN!!!'
                setColors();
            }
            else {
                setColors();
                nextRow();
            }
        }
    }
    if(currentLetter === 0){
        if(/[A-Za-z]/.test(input)){
            activeWord = setCharAt(activeWord, currentLetter, input);
            currentLetter++;
        }
    }
    else if(currentLetter === 5){
        if(e.keyCode === 8){
            currentLetter--;
            activeWord = setCharAt(activeWord, currentLetter, ' ');
        }
    }
    else {
        if(/[A-Za-z]/.test(input)){
            activeWord = setCharAt(activeWord, currentLetter, input);
            currentLetter++;
        }
        if(e.keyCode === 8){
            currentLetter--;
            activeWord = setCharAt(activeWord, currentLetter, ' ');
        }
    }
    
    updateActiveRow();
}

function isValidWord(){
    if(activeWord.includes(' ')){
        info.innerText = 'Not enough letters. ';
        return false;
    }
    if(words.includes(activeWord.toLowerCase())){
        return true;
    }
    else {
        info.innerText = 'Not a valid word. ';
        return false;
    }
}

function updateActiveRow(){
    var rowChildren = activeRow.children;
    
    for(var i = 0; i < rowChildren.length; i++){
        rowChildren[i].innerText = activeWord.charAt(i);
    }
}

function nextRow(){
    if(currentRow === 6){
        info.innerText = 'You Lose. ';
        return;
    }
    currentRow++;
    activeRow = document.getElementById('row' + currentRow);
    activeWord = '     ';
    currentLetter = 0;
}

// TO-DO: Only show 1 hint (color) per letter. Ex: If your guess has
// 2 'L's, only show the hint for the first 'L' and not the second. 
function setColors(){
    var colorOrder = []
    var usedLetters = []

    // Set the color order of the word. 
    for(var i = 0; i < activeWord.length; i++){

        if(activeWord[i] === answer[i]){
            colorOrder.push('green');
        }
        else if(usedLetters.includes(activeWord[i])){
            colorOrder.push('gray');
        }
        else if(answer.includes(activeWord[i])){
            // Yellow color. 
            colorOrder.push('#afaf01');
        }
        else {
            colorOrder.push('gray');
        }

        usedLetters.push(activeWord[i]);
    }

    // Loop through children of active row and set the colors. 
    var rowChildren = activeRow.children;
    for(var i = 0; i < rowChildren.length; i++){
        rowChildren[i].style.backgroundColor = colorOrder[i];
    }
}
