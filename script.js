const buttons = document.querySelectorAll(".buttons button");
const playerBox = document.querySelector(".box.player"); // Select player box
const enemyBox = document.querySelector(".box.enemy"); // Select enemy box
const resultDisplay = document.createElement("div"); // Create a div to display the result
document.body.appendChild(resultDisplay); // Append the result display to the body

// Reset scores and win streaks
let playerScoreNumber = 0;
let enemyScoreNumber = 0;
let currentWinStreak = 0; // Track current win streak
let highestWinStreak = 0; // Track highest win streak

// Update the displayed scores initially
function updateScoresDisplay() {
  document.querySelector(".player-score").textContent = playerScoreNumber;
  document.querySelector(".enemy-score").textContent = enemyScoreNumber;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerSelection = button.textContent; // Get player's selection
    const computerSelection = getComputerChoice(); // Get computer's selection

    // Update the player and enemy boxes with the selected moves
    playerBox.textContent = playerSelection; // Update player box with player's move
    enemyBox.textContent = computerSelection; // Update enemy box with computer's move

    // Determine the result of the round
    const result = playRound(playerSelection, computerSelection);
    resultDisplay.textContent = result; // Display the result in the result display div

    // Check if either player reaches a score of 5
    if (playerScoreNumber === 5 || enemyScoreNumber === 5) {
      resetScores();
    }
  });
});

function getComputerChoice() {
  const choices = ["✌", "✊", "🤚"]; // Choices for computer
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex]; // Return random choice
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (computerSelection === "✊" && playerSelection === "🤚") || // Rock beats Scissors
    (computerSelection === "✌" && playerSelection === "✊") || // Paper beats Rock
    (computerSelection === "🤚" && playerSelection === "✌") // Scissors beats Paper
  ) {
    playerScoreNumber++;
    currentWinStreak++; // Increment current win streak
    // Update highest win streak if current is greater
    if (currentWinStreak > highestWinStreak) {
      highestWinStreak = currentWinStreak; // Update highest win streak
    }
    updateScoresDisplay(); // Update the displayed scores
    return "You win!";
  } else {
    enemyScoreNumber++;
    currentWinStreak = 0; // Reset current win streak on loss
    updateScoresDisplay(); // Update the displayed scores
    return "You lose!";
  }
}

function resetScores() {
  // Save scores and highest win streak to local storage before redirecting
  localStorage.setItem("playerWins", playerScoreNumber);
  localStorage.setItem("computerWins", enemyScoreNumber);
  localStorage.setItem("highestWinStreak", highestWinStreak); // Save highest win streak

  // Redirect to ranking page immediately
  window.location.href = "ranking.html"; // Redirect to ranking page
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in, .slide-in");
  elements.forEach((element) => {
    element.classList.add("fade-in-active"); // For fade-in
    element.classList.add("slide-in-active"); // For slide-in
  });

  // Example function to handle game over
  function gameOver() {
    // Show the username input form
    const usernameInput = document.getElementById("username-input");
    usernameInput.style.display = "block";
  }

  // Handle username submission
  const saveUsernameButton = document.getElementById("save-username");
  if (saveUsernameButton) {
    saveUsernameButton.addEventListener("click", () => {
      const usernameInput = document.getElementById("username");
      const username = usernameInput.value.trim();

      if (username) {
        // Save the username (you can also save it in local storage if needed)
        console.log("Username saved:", username);
        usernameInput.disabled = true; // Disable input after saving
        saveUsernameButton.disabled = true; // Disable button after saving
        // Optionally, you can hide the input after saving
        usernameInput.style.display = "none";
      } else {
        alert("Please enter a valid username.");
      }
    });
  }

  // Call this function when the game ends
  // For example, you might call it when a button is clicked or a condition is met
  // gameOver(); // Uncomment this line to test the redirection

  // Assuming you have a button to end the game
  const gameOverButton = document.getElementById("game-over-btn");
  if (gameOverButton) {
    gameOverButton.addEventListener("click", gameOver);
  }

  // Example game logic
  function checkGameOver() {
    // Your logic to determine if the game is over
    const isGameOver = true; // Replace with actual condition

    if (isGameOver) {
      gameOver(); // Call the game over function
    }
  }

  // Call checkGameOver at appropriate times in your game logic
});
