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
    // If we are at the start
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
    
    console.log(activeWord + " at " + currentLetter);
    updateActiveRow();
}

function updateActiveRow(){
    var rowChildren = activeRow.children
    
    for(var i = 0; i < rowChildren.length; i++){
        rowChildren[i].innerText = activeWord.charAt(i);
    }
}