let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
let previousGuesses = [];

document.getElementById('submitGuess').addEventListener('click', function() {
    let userGuess = parseInt(document.getElementById('guessInput').value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        document.getElementById('message').textContent = "Please enter a valid number between 1 and 100.";
        return;
    }
    
    previousGuesses.push(userGuess);
    document.getElementById('previousGuesses').textContent = "Previous guesses: " + previousGuesses.join(', ');

    if (userGuess === randomNumber) {
        document.getElementById('message').textContent = "Congratulations! You guessed the correct number!";
        resetGame();
    } else {
        attempts--;
        if (attempts === 0) {
            document.getElementById('message').textContent = "Game over! The correct number was " + randomNumber + ".";
            resetGame();
        } else {
            let message = userGuess < randomNumber ? "Too low!" : "Too high!";
            document.getElementById('message').textContent = message + " You have " + attempts + " attempts left.";
        }
    }
    document.getElementById('attempts').textContent = "Attempts left: " + attempts;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
});

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    previousGuesses = [];
    document.getElementById('message').textContent = "";
    document.getElementById('attempts').textContent = "Attempts left: " + attempts;
    document.getElementById('previousGuesses').textContent = "";
}
