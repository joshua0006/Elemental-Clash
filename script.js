// Game Variables
let playerScore = 0;
let aiScore = 0;
let playerMove = "";
let aiMove = "";
let moves = ["fire", "plant", "water"];

// Get DOM Elements
const playerScoreEl = document.getElementById("player-score");
const aiScoreEl = document.getElementById("ai-score");
const resultMessageEl = document.getElementById("result-message");
const turnIndicatorEl = document.querySelector(".turn-indicator");
const playerMoveEl = document.getElementById("player-move");
const aiMoveEl = document.getElementById("ai-move");
const nextRoundBtn = document.getElementById("next-round");
const elementButtons = document.querySelectorAll(".element-button");
const gameAudio = document.getElementById("game-audio");
const volumeControl = document.getElementById("volume");

// Set Volume Control
volumeControl.addEventListener("input", (event) => {
  gameAudio.volume = event.target.value;
});

// Add click event listeners to the element buttons
elementButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerSelection = button.id;
    playRound(playerSelection);
  });
});

// Function to play a round
function playRound(playerSelection) {
  playerMove = playerSelection;

  // Disable buttons during the round
  toggleButtons(false);

  // Show player move and animate
  displayMove(playerMoveEl, playerMove);
  playerMoveEl.classList.add("pulse");

  // AI randomly selects a move after a delay
  setTimeout(() => {
    aiMove = getRandomMove();
    displayMove(aiMoveEl, aiMove);
    aiMoveEl.classList.add("pulse");

    // Check winner and update score
    const winner = determineWinner(playerMove, aiMove);
    updateScore(winner);

    // Display result message
    displayResult(winner);

    // Show next round button
    nextRoundBtn.style.display = "block";

    // Enable Next Round button
    nextRoundBtn.addEventListener("click", resetRound);
  }, 1000); // 1 second delay for AI move
}

// Get a random move for the AI
function getRandomMove() {
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

// Function to determine the winner
function determineWinner(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "fire" && ai === "plant") ||
    (player === "plant" && ai === "water") ||
    (player === "water" && ai === "fire")
  ) {
    return "player";
  } else {
    return "ai";
  }
}

// Update score based on winner
function updateScore(winner) {
  if (winner === "player") {
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else if (winner === "ai") {
    aiScore++;
    aiScoreEl.textContent = aiScore;
  }
}

// Display result message
function displayResult(winner) {
  let message = "";
  if (winner === "draw") {
    message = "It's a Draw!";
  } else if (winner === "player") {
    message = "You Win!";
  } else {
    message = "AI Wins!";
  }
  resultMessageEl.textContent = message;
  turnIndicatorEl.textContent = message;
}

// Display the selected move
function displayMove(element, move) {
  const img = element.querySelector(
    `img[alt='${move.charAt(0).toUpperCase() + move.slice(1)}']`
  );
  element
    .querySelectorAll("img")
    .forEach((img) => (img.style.display = "none"));
  img.style.display = "block";
}

// Toggle buttons
function toggleButtons(enable) {
  elementButtons.forEach((button) => {
    button.disabled = !enable;
  });
}

// Reset the round
function resetRound() {
  playerMove = "";
  aiMove = "";

  // Hide moves
  playerMoveEl
    .querySelectorAll("img")
    .forEach((img) => (img.style.display = "none"));
  aiMoveEl
    .querySelectorAll("img")
    .forEach((img) => (img.style.display = "none"));

  // Hide result message
  resultMessageEl.textContent = "";

  // Hide next round button
  nextRoundBtn.style.display = "none";

  // Enable buttons
  toggleButtons(true);

  // Reset animations
  playerMoveEl.classList.remove("pulse");
  aiMoveEl.classList.remove("pulse");

  // Reset turn indicator
  turnIndicatorEl.textContent = "Your Turn";
}

// Helper function to return the capitalized string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
