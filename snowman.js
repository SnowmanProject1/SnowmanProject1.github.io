

var firebaseConfig = {
    apiKey: "AIzaSyACLphdsKvBnDcxPjS7Vr7QZjieQyiLnw8",
    authDomain: "hangman-a1fd6.firebaseapp.com",
    databaseURL: "https://hangman-a1fd6.firebaseio.com",
    projectId: "hangman-a1fd6",
    storageBucket: "hangman-a1fd6.appspot.com",
    messagingSenderId: "21454876467",
    appId: "1:21454876467:web:99637cafa665eb60e25846"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//let myDatabase = firebase.database().ref("words");
let myDatabase = firebase.database();

let answer = '';
let answerLength = 0; 
let c1 = '';
let c2 = '';
let maxWrong = 8;
let wrongCount = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
        let wordcount = 224;
        let randomword = Math.floor(wordcount * Math.random());
      
  myDatabase.ref("cword").child(randomword).once("value", ss=>{
    answer = ss.val().toString();
  });
 
            console.log("Answer is: " + answer);
        }

function fillLetters(){
  
   answerLength = answer.length;
  c1 = String(answer).charAt(Math.floor(answerLength * Math.random()));
  c2 = String(answer).charAt(Math.floor(answerLength * Math.random()));
  guessed.push(c1);
  guessed.push(c2);
  
  wordStatus = answer.split('').map(c1 => (guessed.indexOf(c1) >= 0 ? c1 : " _ ")).join('');

                document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function generateButtons() {
                let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz '.split('').map(letter =>
                    `
        <button
          class="btn btn-lg btn-dark m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');

                document.getElementById('keyboard').innerHTML = buttonsHTML;
            }

function handleGuess(chosenLetter) {
                //guessed.push(c1);
                //guessed.push(c2);
                guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
                document.getElementById(chosenLetter).setAttribute('disabled', true);

                if (answer.indexOf(chosenLetter) >= 0) {
                    guessedWord();
                    checkIfGameWon();
                } else if (answer.indexOf(chosenLetter) === -1) {
                    wrongCount++;
                    updateWrongCount();
                    checkIfGameLost();
                    updateHangmanPicture();
                }
            }

function updateHangmanPicture() {
                document.getElementById('hangmanPic').src = './images/' + wrongCount + '.jpg';
            }

function checkIfGameWon() {
                if (wordStatus === answer) {
                    document.getElementById('keyboard').innerHTML = 'Game Over: You Win';
                }
            }

function checkIfGameLost() {
                if (wrongCount === maxWrong) {
                    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
                    document.getElementById('keyboard').innerHTML = 'Game Over: Snowman wins';
                }
            }

function guessedWord() {
                wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

                document.getElementById('wordSpotlight').innerHTML = wordStatus;
            }

function updateWrongCount() {
                document.getElementById('wrongCount').innerHTML = wrongCount;
            }

function reset() {
                wrongCount = 0;
                guessed = [];
                document.getElementById('hangmanPic').src = './images/0.jpg';

                randomWord();
                guessedWord();
                updateWrongCount();
                generateButtons();
                //fillLetters();
            }

document.getElementById('maxWrong').innerHTML = maxWrong;

        randomWord();
        generateButtons();
        guessedWord();
        //fillLetters();