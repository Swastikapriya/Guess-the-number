let randomNumber = parseInt(Math.random() * 100 + 1); //Stores the random number the computer picked.

const submit = document.querySelector('#subt') //Refers to the button the player clicks to submit their guess.
const userInput = document.querySelector('#guessField') //Refers to the text box where the player types their guess.

//`guessSlot`, `remaining`, `lowOrHi`, `startOver`: These refer to parts of the webpage where the game shows the guesses, remaining attempts, hints, and buttons.
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p'); //`p` is a paragraph element created to display the "Start new Game" button later.

// Variables to keep track of guesses
let prevGuess = []; //prevGuess is an array to store all the previous guesses made by the player.
let numGuess = 1; //numGuess keeps track of the number of guesses made.
let playGame = true; //playGame is a boolean flag indicating whether the game is active.


//Event Listener for Submitting Guesses
if(playGame){
    //Initializes the game by setting the random number, and the number of guesses to 1
    // When the submit button is clicked, check the guess
    submit.addEventListener('click', function(e){
        e.preventDefault();// Prevent the page from refreshing
        const guess = parseInt(userInput.value);// Get the player's guess as a number
        console.log(guess);
        validateGuess(guess);// Check if the guess is valid
    });
}

// Validate the player's guess
function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number');
    }else if(guess < 1){
        alert('Please enter a number more than 1')
    }else if(guess > 100){
        alert('Please enter a number between 1 and 100')
    }else{
        prevGuess.push(guess);// Save the guess
        if(numGuess === 11){
            displayGuess(guess)
            displayMessage(`Game Over. Random number was ${randomNumber}`)
            endGame() // End the game if 10 guesses are made
        }else{
            displayGuess(guess);
            checkGuess(guess);// Check if the guess is correct
        }
    }
}

// Check if the guess is correct, too low, or too high
function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You won! The number was ${randomNumber}`)
        endGame()
    }else if(guess < randomNumber){
        displayMessage('Too low')
    }else if(guess > randomNumber){
        displayMessage('Too high')
    }
}

// Show the guess and update the number of remaining guesses
function displayGuess(guess){
    userInput.value = ''; // Clear the input field
    guessSlot.innerHTML += `${guess} `;// Show the guess on the screen
    numGuess++; // Increase the number of guesses
    remaining.innerHTML = `${11 - numGuess}`;
}

// Display a message (like "Too low" or "You won!")
function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// End the game, disable input, and show the "Start New Game" button
function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p)
    playGame = false;// Stop the game
    newGame();
}

// Restart the game by resetting everything
function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];// Clear the old guesses
        numGuess = 1;// Reset the guess count
        guessSlot.innerHTML = '';// Clear the displayed guesses
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)

        playGame = true;// Start the game again
    })
}
