# Flashcard App (Static Deck)

A responsive flashcard app with a fixed deck of 12 web development questions. Cards flip in 3D when clicked, can be navigated with Next and Previous buttons, and show a progress indicator. Built as **Task 28** of the Web Development Internship at **Veda Technology**.

## Overview

The deck is stored as an array of objects, each with a topic, a question and an answer. A single index in the app's state decides which card is shown. Clicking the card toggles a CSS class that rotates it by 180 degrees, revealing the answer on the back.

## Features

- 12 flashcards covering HTML, CSS and JavaScript basics
- 3D flip animation on click, built with CSS transforms
- Next and Previous buttons, disabled at the start and end of the deck
- Progress indicator: "Card 3 of 12", a progress bar and a row of dots showing the current and viewed cards
- Dots can be clicked to jump straight to any card
- Shuffle button using the Fisher-Yates algorithm, plus a button to restore the original order
- Topic tag on every card (HTML, CSS or JavaScript)
- Moving to another card while the answer is showing flips it back first, so the next answer is never revealed early
- Keyboard support: `Space` or `Enter` to flip, `←` and `→` to navigate, `S` to shuffle, `F` to flip
- Responsive layout for desktop, tablet and mobile
- Accessible: labelled controls, a card that works as a button, live status messages, visible focus and reduced-motion support

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| HTML5 | Page structure and semantic markup |
| CSS3 | 3D transforms, Grid and Flexbox layout, CSS variables |
| JavaScript (ES6) | Deck data, state tracking, navigation and shuffle |

## Project Structure

```
flashcard-app/
├── index.html    # Page structure
├── style.css     # Styling, flip effect and responsive layout
├── script.js     # Deck data, state and interactions
└── README.md     # Project documentation
```

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox or Safari).
3. No installation or build step is needed. An internet connection is only used to load Google Fonts; the app still works without it.

## How to Use

1. Read the question on the front of the card.
2. Click the card (or press `Space`) to see the answer.
3. Use **Next** and **Previous** to move through the deck.
4. Use **Shuffle deck** for a random order and **Restore original order** to go back.

## How It Works

**1. Store cards as an array of objects**

```js
const CARDS = [
  {
    topic: "HTML",
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language..."
  },
  // 11 more cards
];
```

**2. Use a CSS transform for the flip effect**

```css
.card        { perspective: 1400px; }
.card-inner  { transform-style: preserve-3d; transition: transform 0.6s; }
.card.is-flipped .card-inner { transform: rotateY(180deg); }
.face        { backface-visibility: hidden; }
.face-back   { transform: rotateY(180deg); }
```

**3. Track the current card index in state**

```js
const state = {
  order: [0, 1, 2, /* ... */],  // card order
  position: 0,                  // current card
  flipped: false,
  seen: new Set([0])            // cards already viewed
};
```

**4. Shuffle with Fisher-Yates**

```js
function shuffleArray(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
```

## Learning Outcomes

- Creating a flip effect with `perspective`, `transform-style`, `rotateY` and `backface-visibility`
- Tracking the current item in a list with a state variable
- Building next, previous and jump navigation with boundary checks
- Showing progress with text, a bar and dots
- Shuffling an array correctly without changing the original

## Possible Improvements

- Mark cards as "known" or "review again" and study only the ones to review
- Filter the deck by topic
- Let users add their own cards and save them with `localStorage`
- Add a timer and a quiz mode with scoring

## Author

**Sachin**, Web Development Intern, Veda Technology

## License

This project was created for learning purposes as part of an internship task.
