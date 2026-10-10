# Rock Paper Scissors Game

A responsive Rock Paper Scissors game played against the computer, with a live running score, round history and win-rate statistics. Built as **Task 24** of the Web Development Internship at **Veda Technology**.

## Overview

The player picks rock, paper or scissors. The computer picks a move at random, the winner is decided with simple conditional logic, and the score updates after every round. A reset button clears the score and starts a fresh match.

## Features

- Three choice buttons: Rock, Paper and Scissors
- Computer's random choice using `Math.random()`
- Win, lose and draw logic in a dedicated comparison function
- Running score display for You, Draws and Computer
- Reset button to clear the score and history
- Recent rounds panel showing the last six results
- Statistics panel with rounds played and win rate
- Keyboard shortcuts: `R`, `P` and `S`
- Short "thinking" delay before the computer reveals its move
- Responsive layout for desktop, tablet and mobile
- Accessible: live result announcements, visible keyboard focus and reduced-motion support

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| HTML5 | Page structure and semantic markup |
| CSS3 | Layout (Grid and Flexbox), theming with CSS variables, animations |
| JavaScript (ES6) | Game logic, state management and DOM updates |

## Project Structure

```
rock-paper-scissors/
├── index.html    # Page structure
├── style.css     # Styling and responsive layout
├── script.js     # Game logic and state
└── README.md     # Project documentation
```

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox or Safari).
3. No installation or build step is needed.

## How to Play

1. Click **Rock**, **Paper** or **Scissors** (or press `R`, `P`, `S`).
2. Wait a moment while the computer chooses.
3. See the result and the updated score.
4. Click **Reset score** to start over.

**Rules:** Rock beats scissors, scissors beat paper, paper beats rock. Matching moves are a draw.

## Key Code Concepts

**Random choice** — the computer picks from an array using `Math.random()`:

```js
function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}
```

**Winner logic** — a lookup object stores which move each choice beats:

```js
const BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };

function determineWinner(player, computer) {
  if (player === computer) return "draw";
  if (BEATS[player] === computer) return "win";
  return "lose";
}
```

**Game state** — one `state` object tracks the score, round count, history and a lock that prevents clicks during a round.

## Learning Outcomes

- Using conditional statements to decide outcomes
- Generating random values with `Math.random()`
- Managing simple game state in JavaScript
- Updating the DOM in response to events
- Building a responsive, accessible interface with CSS

## Possible Improvements

- Best-of-five match mode with a winner announcement
- Sound effects and a mute toggle
- Saving the score with `localStorage`
- Light and dark theme switch

## Author

**Sachin** — Web Development Intern, Veda Technology

## License

This project was created for learning purposes as part of an internship task.
