

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
let myDatabase = firebase.database();


var programming_languages = [
    "python",
    "javascript",
    "mongodb",
    "json",
    "java",
    "html",
    "css",
    "c",
    "csharp",
    "golang",
    "kotlin",
    "php",
    "sql",
    "ruby"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    //answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
    myDatabase.ref("words").child("cword").once('value', ss => {
        let wordcount = 227;
        let randomword = parseInt(Math.floor(wordcount * Math.random()));
        myDatabase.ref("words").child("cword").child(randomword).once('value', ss2 => {
            answer = ss2.val();
            //myDatabase.ref("dictionary").child("alphabetized").child(rack).once('value', ss3 => {
                //let words = ss3.val();
                //answer = randomword;
            });
        });
    //});
            console.log("Answer is: " + answer);

        }

function generateButtons() {
                let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
                    `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');

                document.getElementById('keyboard').innerHTML = buttonsHTML;
            }

function handleGuess(chosenLetter) {
                guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
                document.getElementById(chosenLetter).setAttribute('disabled', true);

                if (answer.indexOf(chosenLetter) >= 0) {
                    guessedWord();
                    checkIfGameWon();
                } else if (answer.indexOf(chosenLetter) === -1) {
                    mistakes++;
                    updateMistakes();
                    checkIfGameLost();
                    updateHangmanPicture();
                }
            }

function updateHangmanPicture() {
                document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
            }

function checkIfGameWon() {
                if (wordStatus === answer) {
                    document.getElementById('keyboard').innerHTML = 'You Won!!!';
                }
            }

function checkIfGameLost() {
                if (mistakes === maxWrong) {
                    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
                    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
                }
            }

function guessedWord() {
                wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

                document.getElementById('wordSpotlight').innerHTML = wordStatus;
            }

function updateMistakes() {
                document.getElementById('mistakes').innerHTML = mistakes;
            }

function reset() {
                mistakes = 0;
                guessed = [];
                document.getElementById('hangmanPic').src = './images/0.jpg';

                randomWord();
                guessedWord();
                updateMistakes();
                generateButtons();
            }

document.getElementById('maxWrong').innerHTML = maxWrong;

        randomWord();
        generateButtons();
        guessedWord();