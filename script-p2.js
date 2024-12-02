// Game Variables
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let player1Move = null;
let player2Move = null;

// Get DOM Elements
const player1ScoreEl = document.getElementById("player1-score");
const player2ScoreEl = document.getElementById("player2-score");
const resultMessageEl = document.getElementById("result-message");
const turnIndicatorEl = document.getElementById("turn-indicator");
const player1MoveBox = document.getElementById("player1-move-box");
const player2MoveBox = document.getElementById("player2-move-box");
const nextRoundBtn = document.getElementById("next-round-btn");
const elementButtons = document.querySelectorAll(".element-button");
const gameAudio = document.getElementById("game-audio");
const volumeControl = document.getElementById("volume");

// Set Volume Control
volumeControl.addEventListener("input", (event) => {
  gameAudio.volume = event.target.value;
});

function makeMove(element) {
  const moveBox = document.getElementById(`player${currentPlayer}-move`);
  const playerMoveBox = document.getElementById(
    `player${currentPlayer}-move-box`
  );

  playerMoveBox.classList.add("add-bg");
  moveBox.innerHTML = `<img src="/images/${element}.png" alt="${element}" style="width: 100px; height: 100px" />`;
  moveBox.classList.remove("hidden-move");

  if (currentPlayer === 1) {
    player1Move = element;
    currentPlayer = 2;
    turnIndicatorEl.textContent = "Player 2's Turn";
  } else {
    player2Move = element;
    turnIndicatorEl.textContent = "Round Complete!";
    revealMoves();
  }
}

function revealMoves() {
  const player1MoveEl = document.getElementById("player1-move");
  const player2MoveEl = document.getElementById("player2-move");

  player1MoveEl.classList.remove("hidden-move");
  player2MoveEl.classList.remove("hidden-move");

  player1MoveEl.classList.add("shuffle");
  player2MoveEl.classList.add("shuffle");

  setTimeout(() => {
    player1MoveEl.classList.remove("shuffle");
    player2MoveEl.classList.remove("shuffle");
    player1MoveBox.classList.remove("add-bg");
    player2MoveBox.classList.remove("add-bg");
    determineWinner();
  }, 500);

  document.getElementById("element-buttons").style.display = "none";
  nextRoundBtn.style.display = "block";
}

function determineWinner() {
  if (player1Move === player2Move) {
    resultMessageEl.textContent = "It's a tie!";
    return;
  }

  // Define winning combinations: fire beats plant, plant beats water, water beats fire
  const rules = {
    fire: "plant", // fire beats plant
    plant: "water", // plant beats water
    water: "fire", // water beats fire
  };

  if (rules[player1Move] === player2Move) {
    resultMessageEl.textContent = "Player 1 wins this round!";
    player1Score++;
    player1ScoreEl.textContent = player1Score;
  } else {
    resultMessageEl.textContent = "Player 2 wins this round!";
    player2Score++;
    player2ScoreEl.textContent = player2Score;
  }

  // Check if either player has reached 5 points
  if (player1Score >= 5 || player2Score >= 5) {
    endGame();
  }
}

function endGame() {
  const modal = document.getElementById("game-over-modal");
  const winnerText = document.getElementById("winner-text");
  const winner = player1Score >= 5 ? 1 : 2;

  winnerText.textContent = `Congratulations! Player ${winner} Won!`;
  modal.style.display = "block";
  disableGameButtons(true);

  // Save scores and redirect
  saveScoreAndRedirect();
}

function saveScoreAndRedirect() {
  // Save both players' actual scores
  localStorage.setItem("player1_wins", player1Score.toString());
  localStorage.setItem("player1_losses", player2Score.toString());
  localStorage.setItem("player1_winStreak", player1Score.toString());

  localStorage.setItem("player2_wins", player2Score.toString());
  localStorage.setItem("player2_losses", player1Score.toString());
  localStorage.setItem("player2_winStreak", player2Score.toString());

  // Set flags for the ranking page
  localStorage.setItem("isPlayer2Game", "true");
  localStorage.setItem("needBothPlayers", "true");

  // Redirect to ranking page after a short delay
  setTimeout(() => {
    window.location.href = "ranking.html";
  }, 2000);
}

function startNewRound() {
  player1Move = null;
  player2Move = null;
  currentPlayer = 1;

  const player1MoveEl = document.getElementById("player1-move");
  const player2MoveEl = document.getElementById("player2-move");

  player1MoveEl.innerHTML = "";
  player2MoveEl.innerHTML = "";
  player1MoveEl.classList.add("hidden-move");
  player2MoveEl.classList.add("hidden-move");

  turnIndicatorEl.textContent = "Player 1's Turn";
  resultMessageEl.textContent = "";
  document.getElementById("element-buttons").style.display = "flex";
  nextRoundBtn.style.display = "none";
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  player1ScoreEl.textContent = "0";
  player2ScoreEl.textContent = "0";
  document.getElementById("game-over-modal").style.display = "none";
  resultMessageEl.textContent = "";
  disableGameButtons(false);
  startNewRound();
}

function disableGameButtons(disabled) {
  elementButtons.forEach((button) => {
    button.disabled = disabled;
  });
}
