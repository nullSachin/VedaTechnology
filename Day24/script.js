/* ==========================================================
   Rock Paper Scissors | Task 24
   Concepts practised: conditional logic, random choice,
   simple game state, DOM manipulation, event handling
   ========================================================== */

"use strict";

/* ---------- Game data ---------- */
const CHOICES = ["rock", "paper", "scissors"];

const ICONS = {
  rock: "\u270A",          // raised fist
  paper: "\u270B",         // raised hand
  scissors: "\u270C\uFE0F" // victory hand
};

// Each key beats the value it points to
const BEATS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

const THINKING_DELAY = 700;  // ms, short pause before the computer reveals its move
const HISTORY_LIMIT = 6;

/* ---------- Game state ---------- */
const state = {
  player: 0,
  computer: 0,
  draws: 0,
  rounds: 0,
  history: [],
  locked: false
};

/* ---------- DOM references ---------- */
const el = {
  scorePlayer: document.getElementById("score-player"),
  scoreComputer: document.getElementById("score-computer"),
  scoreDraws: document.getElementById("score-draws"),
  handPlayer: document.getElementById("hand-player"),
  handComputer: document.getElementById("hand-computer"),
  namePlayer: document.getElementById("name-player"),
  nameComputer: document.getElementById("name-computer"),
  cardPlayer: document.getElementById("card-player"),
  cardComputer: document.getElementById("card-computer"),
  result: document.getElementById("result"),
  statRounds: document.getElementById("stat-rounds"),
  statRate: document.getElementById("stat-rate"),
  rateFill: document.getElementById("rate-fill"),
  history: document.getElementById("history"),
  resetBtn: document.getElementById("reset"),
  choiceBtns: document.querySelectorAll(".choice")
};

/* ==========================================================
   Core logic
   ========================================================== */

/** Computer picks one move at random using Math.random() */
function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

/**
 * Compare two choices.
 * @returns {"win" | "lose" | "draw"} result from the player's point of view
 */
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  }
  if (BEATS[playerChoice] === computerChoice) {
    return "win";
  }
  return "lose";
}

/** Capitalise the first letter, e.g. "rock" -> "Rock" */
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Build the message shown after each round */
function buildMessage(outcome, playerChoice, computerChoice) {
  if (outcome === "win") {
    return "You win this round. " + capitalise(playerChoice) + " beats " + computerChoice + ".";
  }
  if (outcome === "lose") {
    return "Computer wins this round. " + capitalise(computerChoice) + " beats " + playerChoice + ".";
  }
  return "It's a draw. You both chose " + playerChoice + ".";
}

/* ==========================================================
   Round flow
   ========================================================== */

function playRound(playerChoice) {
  if (state.locked) return;       // ignore clicks while a round is in progress
  setLocked(true);

  // Show the player's move and let the computer "think"
  showHand("player", playerChoice);
  el.handComputer.textContent = "?";
  el.nameComputer.textContent = "Thinking...";
  el.handComputer.classList.add("shake");
  clearHighlights();
  setResult("Computer is choosing...", "");

  setTimeout(function () {
    const computerChoice = getComputerChoice();
    const outcome = determineWinner(playerChoice, computerChoice);

    el.handComputer.classList.remove("shake");
    showHand("computer", computerChoice);

    updateScore(outcome);
    highlightWinner(outcome);
    setResult(buildMessage(outcome, playerChoice, computerChoice), outcome);
    addToHistory(outcome, playerChoice, computerChoice);
    renderStats();

    setLocked(false);
  }, THINKING_DELAY);
}

function updateScore(outcome) {
  state.rounds += 1;

  if (outcome === "win") {
    state.player += 1;
    bump(el.scorePlayer);
  } else if (outcome === "lose") {
    state.computer += 1;
    bump(el.scoreComputer);
  } else {
    state.draws += 1;
    bump(el.scoreDraws);
  }

  el.scorePlayer.textContent = state.player;
  el.scoreComputer.textContent = state.computer;
  el.scoreDraws.textContent = state.draws;
}

function resetGame() {
  state.player = 0;
  state.computer = 0;
  state.draws = 0;
  state.rounds = 0;
  state.history = [];

  el.scorePlayer.textContent = 0;
  el.scoreComputer.textContent = 0;
  el.scoreDraws.textContent = 0;

  el.handPlayer.textContent = "?";
  el.handComputer.textContent = "?";
  el.handComputer.classList.remove("shake");
  el.namePlayer.textContent = "Waiting";
  el.nameComputer.textContent = "Waiting";

  clearHighlights();
  setResult("Score reset. Make your move to start a new match.", "");
  renderHistory();
  renderStats();
  setLocked(false);
}

/* ==========================================================
   UI helpers
   ========================================================== */

function showHand(who, choice) {
  const hand = who === "player" ? el.handPlayer : el.handComputer;
  const name = who === "player" ? el.namePlayer : el.nameComputer;
  hand.textContent = ICONS[choice];
  name.textContent = capitalise(choice);
}

function setResult(message, outcome) {
  el.result.textContent = message;
  el.result.className = "result" + (outcome ? " " + outcome : "");
}

function setLocked(isLocked) {
  state.locked = isLocked;
  el.choiceBtns.forEach(function (btn) {
    btn.disabled = isLocked;
  });
}

function highlightWinner(outcome) {
  clearHighlights();
  if (outcome === "win") {
    el.cardPlayer.classList.add("is-winner");
    el.cardComputer.classList.add("is-loser");
  } else if (outcome === "lose") {
    el.cardComputer.classList.add("is-winner");
    el.cardPlayer.classList.add("is-loser");
  }
}

function clearHighlights() {
  el.cardPlayer.classList.remove("is-winner", "is-loser");
  el.cardComputer.classList.remove("is-winner", "is-loser");
}

function bump(node) {
  node.classList.remove("bump");
  void node.offsetWidth;          // restart the CSS animation
  node.classList.add("bump");
}

/* ---------- History and statistics ---------- */

function addToHistory(outcome, playerChoice, computerChoice) {
  state.history.unshift({
    round: state.rounds,
    outcome: outcome,
    player: playerChoice,
    computer: computerChoice
  });
  state.history = state.history.slice(0, HISTORY_LIMIT);
  renderHistory();
}

function renderHistory() {
  el.history.innerHTML = "";

  if (state.history.length === 0) {
    const empty = document.createElement("li");
    empty.className = "history-empty";
    empty.textContent = "No rounds yet. Your last six results will appear here.";
    el.history.appendChild(empty);
    return;
  }

  const labels = { win: "Win", lose: "Loss", draw: "Draw" };

  state.history.forEach(function (item) {
    const li = document.createElement("li");

    const round = document.createElement("span");
    round.className = "history-round";
    round.textContent = "#" + item.round;

    const moves = document.createElement("span");
    moves.className = "history-moves";
    moves.textContent = ICONS[item.player] + "  vs  " + ICONS[item.computer];

    const badge = document.createElement("span");
    badge.className = "badge " + item.outcome;
    badge.textContent = labels[item.outcome];

    li.appendChild(round);
    li.appendChild(moves);
    li.appendChild(badge);
    el.history.appendChild(li);
  });
}

function renderStats() {
  el.statRounds.textContent = state.rounds;

  if (state.rounds === 0) {
    el.statRate.textContent = "\u2013";
    el.rateFill.style.width = "0%";
    return;
  }

  const rate = Math.round((state.player / state.rounds) * 100);
  el.statRate.textContent = rate + "%";
  el.rateFill.style.width = rate + "%";
}

/* ==========================================================
   Event listeners
   ========================================================== */

el.choiceBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    playRound(btn.dataset.choice);
  });
});

el.resetBtn.addEventListener("click", resetGame);

// Keyboard shortcuts: R, P, S
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  const keyMap = { r: "rock", p: "paper", s: "scissors" };
  const choice = keyMap[event.key.toLowerCase()];
  if (choice) playRound(choice);
});

// Initial render
renderHistory();
renderStats();
