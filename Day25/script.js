
"use strict";

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const newGameButton = document.getElementById("new-game-button");

const attemptCount = document.getElementById("attempt-count");
const bestScore = document.getElementById("best-score");
const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackMessage = document.getElementById("feedback-message");
const guessHistory = document.getElementById("guess-history");
const guessTotal = document.getElementById("guess-total");

let targetNumber;
let attempts;
let previousGuesses;
let gameOver;
let bestAttempts = null;

function generateRandomNumber() {
    return Math.floor(
        Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)
    ) + MIN_NUMBER;
}

function updateBestScore() {
    bestScore.textContent = bestAttempts === null
        ? "—"
        : String(bestAttempts);
}

function showFeedback(title, message, type = "default") {
    feedback.className = "feedback";

    if (type !== "default") {
        feedback.classList.add(`is-${type}`);
    }

    feedbackTitle.textContent = title;
    feedbackMessage.textContent = message;

    const icons = {
        default: "✦",
        low: "↓",
        high: "↑",
        success: "✓",
        error: "!"
    };

    feedback.querySelector(".feedback-icon").textContent =
        icons[type] || icons.default;
}

function updateAttemptDisplay() {
    attemptCount.textContent = String(attempts);

    guessTotal.textContent =
        `${previousGuesses.length} ${
            previousGuesses.length === 1 ? "guess" : "guesses"
        }`;
}

function renderGuessHistory() {
    guessHistory.replaceChildren();

    if (previousGuesses.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-history";
        emptyMessage.textContent = "Your guesses will appear here.";
        guessHistory.appendChild(emptyMessage);
        return;
    }

    previousGuesses.forEach((entry) => {
        const chip = document.createElement("span");
        chip.className = `guess-chip ${entry.result}`;
        chip.textContent = String(entry.value);
        chip.title = entry.label;
        guessHistory.appendChild(chip);
    });
}

function finishGame() {
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;

    if (bestAttempts === null || attempts < bestAttempts) {
        bestAttempts = attempts;
        updateBestScore();
    }

    showFeedback(
        "Excellent work — you got it!",
        `The secret number was ${targetNumber}. You found it in ${
            attempts
        } ${attempts === 1 ? "attempt" : "attempts"}. Start a new game to play again.`,
        "success"
    );
}

function handleGuess(event) {
    event.preventDefault();

    if (gameOver) {
        return;
    }

    const rawValue = guessInput.value.trim();

    if (rawValue === "") {
        showFeedback(
            "A guess is needed",
            "Enter a whole number between 1 and 100 to continue.",
            "error"
        );
        guessInput.focus();
        return;
    }

    const guess = Number(rawValue);

    if (
        !Number.isInteger(guess) ||
        guess < MIN_NUMBER ||
        guess > MAX_NUMBER
    ) {
        showFeedback(
            "Check your number",
            "Only whole numbers from 1 to 100 are accepted.",
            "error"
        );
        guessInput.focus();
        return;
    }

    if (previousGuesses.some((entry) => entry.value === guess)) {
        showFeedback(
            "You've tried that number",
            "Choose a different number. Repeated guesses do not count as new attempts.",
            "error"
        );
        guessInput.select();
        return;
    }

    attempts += 1;

    let result;
    let label;

    if (guess < targetNumber) {
        result = "too-low";
        label = "Too low";
        showFeedback(
            "A little too low",
            "Try a higher number. You're getting closer!",
            "low"
        );
    } else if (guess > targetNumber) {
        result = "too-high";
        label = "Too high";
        showFeedback(
            "A little too high",
            "Try a lower number. Keep narrowing it down!",
            "high"
        );
    } else {
        result = "correct";
        label = "Correct";
    }

    previousGuesses.push({
        value: guess,
        result,
        label
    });

    updateAttemptDisplay();
    renderGuessHistory();

    if (guess === targetNumber) {
        finishGame();
    } else {
        guessInput.value = "";
        guessInput.focus();
    }
}

function startNewGame() {
    targetNumber = generateRandomNumber();
    attempts = 0;
    previousGuesses = [];
    gameOver = false;

    guessInput.disabled = false;
    guessButton.disabled = false;
    guessInput.value = "";

    updateAttemptDisplay();
    updateBestScore();
    renderGuessHistory();

    showFeedback(
        "A new challenge awaits!",
        "Enter a number between 1 and 100 and use the hints to find the secret number."
    );

    guessInput.focus();
}

guessForm.addEventListener("submit", handleGuess);
newGameButton.addEventListener("click", startNewGame);

startNewGame();
