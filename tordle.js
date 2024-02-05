var activeRow = document.getElementById('row1');

var activeWord = '_____';
var currentLetter = 0;

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

document.onkeydown = function (e) {
    console.log(e.key);
    handleKeyEvent(e);
};

function handleKeyEvent(e) {
    const input = String.fromCharCode(e.keyCode)
    if(currentLetter < 0){
        currentLetter = 0;
        console.log(activeWord + " at " + currentLetter);
        return;
    }
    if(e.keyCode === '8' && currentLetter !== 0){
        currentLetter--;
        activeWord = setCharAt(activeWord, currentLetter, ' ');
    }
    if(currentLetter === 5){
        currentLetter = 5;
        console.log(activeWord + " at " + currentLetter);
        return;
    }
    if(/[A-Za-z]/.test(input)){
        activeWord = setCharAt(activeWord, currentLetter, input);
        currentLetter++;
    }
    console.log(activeWord + " at " + currentLetter);
    updateActiveRow();
}

function updateActiveRow(){
    var rowChildren = activeRow.children
    
    for(var i = 0; i < rowChildren.length; i++){
        rowChildren[i].innerText = activeWord.charAt(i);
    }
}