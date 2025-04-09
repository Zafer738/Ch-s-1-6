// Game Variables
let rgbValueDisplay = document.getElementById('rgbValue');
let colorsContainer = document.querySelector('.colors');
let messageDisplay = document.getElementById('message');
let livesDisplay = document.getElementById('lives');
let scoreDisplay = document.getElementById('score');
let playAgainButton = document.getElementById('playAgain');
let lives = 5;
let score = 0;
let correctColor;

// Function to generate random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to generate RGB color to guess and options
function setupGame() {
    // Random RGB color to guess
    correctColor = generateRandomColor();
    rgbValueDisplay.textContent = `Guess this color: ${correctColor}`;

    // Clear previous options
    colorsContainer.innerHTML = '';

    // Generate 3 random color options including the correct one
    let colors = [correctColor, generateRandomColor(), generateRandomColor()];
    colors = colors.sort(() => Math.random() - 0.5); // Shuffle the colors

    // Create color option buttons
    colors.forEach(color => {
        const colorButton = document.createElement('div');
        colorButton.classList.add('color-option');
        colorButton.style.backgroundColor = color;
        colorButton.addEventListener('click', () => checkAnswer(color));
        colorsContainer.appendChild(colorButton);
    });
}

// Function to check if the clicked color is correct
function checkAnswer(selectedColor) {
    if (selectedColor === correctColor) {
        messageDisplay.textContent = 'Correct!';
        score++;
        scoreDisplay.textContent = score;
    } else {
        messageDisplay.textContent = 'Incorrect!';
        lives--;
        livesDisplay.textContent = lives;
    }

    if (lives === 0) {
        gameOver();
    } else {
        setupGame();
    }
}

// Function to end the game
function gameOver() {
    messageDisplay.textContent = `Game Over! Final Score: ${score}`;
    playAgainButton.style.display = 'inline-block';
}

// Restart the game
playAgainButton.addEventListener('click', () => {
    lives = 5;
    score = 0;
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
    messageDisplay.textContent = '';
    playAgainButton.style.display = 'none';
    setupGame();
});

// Initialize the game
setupGame();
