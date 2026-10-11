
# Guess It — Number Guessing Game

A clean, responsive number guessing game built with HTML5, CSS3, and vanilla JavaScript.

The objective is simple: guess the secret number between 1 and 100 using the hints provided after every attempt.

## Overview

**Guess It** is an interactive browser-based game created to practise core JavaScript concepts while building a polished and user-friendly interface.

Every valid guess receives feedback indicating whether the number is too high or too low. The game tracks attempts, stores previous guesses during the current game, and celebrates the player when the correct number is found.

## Features

- Random number generation between 1 and 100.
- Higher/lower hints after every valid guess.
- Attempt counter.
- Previous guesses displayed as visual chips.
- Input validation for empty, decimal, and out-of-range values.
- Duplicate guess detection.
- Winning message and disabled input after success.
- Best attempt score maintained during the current page session.
- New Game button to restart the challenge.
- Responsive desktop and mobile layout.
- Accessible feedback messages and keyboard-friendly controls.
- No external JavaScript libraries or frameworks.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure and form controls |
| CSS3 | Styling, responsive layouts, and interactive states |
| JavaScript | Randomization, validation, game logic, and DOM updates |

## Project Structure

```text
number-guessing-game/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

### Prerequisites

- A modern web browser.
- A code editor such as Visual Studio Code (optional).

### Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Ensure all three source files are in the same directory.
4. Open `index.html` in your browser.

You can also use the Live Server extension in Visual Studio Code.

No package installation, build tools, or backend server is required.

## How to Play

1. Start a new game.
2. Enter a whole number between 1 and 100.
3. Click **Make a guess** or press Enter.
4. Read the hint:
   - **Too low:** Try a higher number.
   - **Too high:** Try a lower number.
   - **Correct:** The game is complete.
5. Use the attempt counter and guess history to follow your progress.
6. Select **Start a new game** to play again.

Repeated guesses are rejected and do not increase the attempt counter.

## Random Number Formula

```javascript
Math.floor(Math.random() * (max - min + 1)) + min;
```

For this project, `min` is 1 and `max` is 100.

The formula generates an integer that can include both boundaries.

## Game Logic

1. Generate the secret number.
2. Read and validate the user's input.
3. Reject duplicate guesses.
4. Increment the attempt counter for a valid new guess.
5. Compare the guess with the secret number.
6. Display a hint or complete the game.
7. Reset the current game state when requested.

## Testing Checklist

- [ ] A new game starts with zero attempts.
- [ ] Empty input shows a validation message.
- [ ] Decimal and out-of-range values are rejected.
- [ ] A lower guess displays a higher-number hint.
- [ ] A higher guess displays a lower-number hint.
- [ ] Duplicate guesses do not increase attempts.
- [ ] A correct guess displays the success message.
- [ ] Input is disabled after winning.
- [ ] Starting a new game resets the current attempts and history.
- [ ] The best attempt score remains available during the page session.
- [ ] The interface works on desktop and mobile screens.

## Learning Outcomes

This project helped me practise:

- `Math.random()` and `Math.floor()`.
- Conditional statements and comparison operators.
- Form submission and input validation.
- Event listeners and DOM manipulation.
- Arrays and array methods.
- Tracking application state.
- Creating responsive interfaces with CSS media queries.
- Writing readable and maintainable JavaScript.

## Internship Details

**Task:** 25 — Number Guessing Game  
**Organization:** Veda Technology  
**Track:** Web Development  
**Author:** Sachin Kumar

## Future Improvements

- Add difficulty levels.
- Add a maximum-attempt challenge mode.
- Save best scores using local storage.
- Add sound effects and additional animations.
- Add automated tests for game logic.

---

Built with HTML, CSS, and JavaScript by Sachin Kumar.
