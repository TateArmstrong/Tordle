import words from '../valid-wordle-words.json' assert { type: 'json' };

var activeRow = document.getElementById('row1');
var info = document.getElementById('info');

var activeWord = '     '; 
var answer = 'SALET';
var currentLetter = 0;

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

document.onkeydown = function (e) {
    handleKeyEvent(e);
};

function handleKeyEvent(e) {
    const input = String.fromCharCode(e.keyCode)
    info.innerText = '';

    if(e.keyCode === 13){
        if(isValidWord()){
            info.innerText = 'YOU WIN!!!'
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
    var rowChildren = activeRow.children
    
    for(var i = 0; i < rowChildren.length; i++){
        rowChildren[i].innerText = activeWord.charAt(i);
    }
}