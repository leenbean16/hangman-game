
var wrongCount = 0;
var winCount = 0;
var lives = 10;
var usedChars = [];
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var notify = document.getElementById("notify");

function letterClicked(chosenLetter, el){
	if(el.classList.contains('beenClicked')){
		return;
	}
	el.classList.add('beenClicked');
	notify.innerText = "";
	chosenLetterLower = chosenLetter.toLowerCase();
	var letterz = document.getElementsByClassName("aletter");
	var usedI = usedChars.indexOf(chosenLetterLower);
	if(usedI > -1){
		notify.innerText = "You've alredy used that letter.";
		return;
	}
	var I = currentChars.indexOf(chosenLetterLower);	
	var hasEmpty = false;
	if(I > -1){
		usedChars.push(chosenLetterLower);
		for(var i = 0; i < letterz.length; i++){
			var letr = letterz[i].dataset.letter;
			letr = letr.toLowerCase();
			if(letr == chosenLetterLower){
				letterz[i].innerText = chosenLetterLower;
			}
			if(letterz[i].innerText == ""){
				hasEmpty = true;
			}
		}
		if(!hasEmpty){
			wonAGame();
		}
	}else{
		failedTry();
	}
}


setWord();
function setWord(){
	var wordlist = getWordList();
	currentWord = wordlist[Math.floor(Math.random()*wordlist.length)];
	currentChars = currentWord.split('');
	document.getElementById('word').innerHTML = "";
	for(var i=0; i<currentChars.length; i++){
		var wordChar = document.createElement('p');
		wordChar.className = 'aletter';
		wordChar.setAttribute('data-letter', currentChars[i]);
		document.getElementById('word').appendChild(wordChar);
	}
	var letrButtons = document.getElementsByClassName("letterchoice");
	for(var i = 0; i < letrButtons.length; i++){
		letrButtons[i].classList.remove('beenClicked');
	}
}

function failedTry(){
	wrongCount++;
	if(wrongCount >= 6){
		alert("The word was " + currentWord);
		wrongCount = 0;
		lives--;
		if(lives <= 0){
			lives = 10;
			losses.innerText = lives;
			losses.innerText = "you died.";
		}
	}else{
		notify.innerText = "That letter in not in the word.";
	}	
}

function wonAGame(){
	winCount++;
	wrongCount = 0;
	wins.innerText = winCount;
	notify.innerText = "Winner! Play again!";
	usedChars = [];
	setWord();
}

function lostAGame(){
	losses.innerText = lives;
	usedChars = [];
	setWord();
}


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function getWordList(){
var wordlist = ["paint", "acrylic", "oil", "canvas", "abstract", "portrait", "art", "vangogh", "picasso", "brush"];
return wordlist;
}