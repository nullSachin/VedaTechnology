/* ==========================================================
   Web Dev Flashcards | Task 28
   Concepts practised: CSS 3D transforms, state tracking,
   simple navigation, arrays of objects, shuffling
   ========================================================== */

"use strict";

/* ---------- Static deck: an array of objects ---------- */
const CARDS = [
  {
    topic: "HTML",
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language. It defines the structure and content of a web page using elements and tags."
  },
  {
    topic: "HTML",
    question: "Why does an img element need an alt attribute?",
    answer: "The alt text describes the image for screen readers and is shown when the image cannot load. It also helps search engines understand the image."
  },
  {
    topic: "HTML",
    question: "Why use semantic elements like header, nav and main?",
    answer: "They describe the meaning of each part of the page. This improves accessibility, helps search engines and makes the code easier to read."
  },
  {
    topic: "CSS",
    question: "What is the CSS box model?",
    answer: "Every element is a box made of four layers. From the inside out they are content, padding, border and margin."
  },
  {
    topic: "CSS",
    question: "What is the difference between Flexbox and Grid?",
    answer: "Flexbox lays items out in one dimension, either a row or a column. Grid controls rows and columns together, so it suits full page layouts."
  },
  {
    topic: "CSS",
    question: "What does transform-style: preserve-3d do?",
    answer: "It lets child elements keep their own position in 3D space instead of being flattened into the parent's plane. A flip card needs it so both faces can rotate."
  },
  {
    topic: "CSS",
    question: "What does backface-visibility: hidden do?",
    answer: "It hides an element when its back is turned toward the viewer. On a flip card, only the face pointing at you stays visible."
  },
  {
    topic: "JavaScript",
    question: "What is the difference between var, let and const?",
    answer: "var is function-scoped and hoisted. let and const are block-scoped, and const cannot be reassigned after it is set."
  },
  {
    topic: "JavaScript",
    question: "What does Math.random() return?",
    answer: "A decimal from 0 up to, but not including, 1. Multiply it by an array's length and use Math.floor() to get a random index."
  },
  {
    topic: "JavaScript",
    question: "What is the DOM?",
    answer: "The Document Object Model is a tree of objects that represents the page. JavaScript uses it to read and change content, styles and structure."
  },
  {
    topic: "JavaScript",
    question: "What does addEventListener do?",
    answer: "It attaches a function that runs when an event such as a click happens. You can add several listeners to the same element without overwriting each other."
  },
  {
    topic: "JavaScript",
    question: "How does the Fisher-Yates shuffle work?",
    answer: "Go through the array from the end to the start. At each position, swap the item with another one chosen at random from the positions before it."
  }
];

/* ---------- Settings ---------- */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FLIP_BACK_DELAY = prefersReducedMotion ? 0 : 300; // ms, half of the 0.6s flip

/* ---------- State ---------- */
const state = {
  order: CARDS.map(function (_, i) { return i; }),  // which card sits at each position
  position: 0,                                       // current index in the deck
  flipped: false,
  shuffled: false,
  seen: new Set([0])                                 // positions already viewed
};

/* ---------- DOM references ---------- */
const els = {
  card: document.getElementById("card"),
  frontText: document.getElementById("front-text"),
  backText: document.getElementById("back-text"),
  frontTopic: document.getElementById("front-topic"),
  backTopic: document.getElementById("back-topic"),
  progressText: document.getElementById("progress-text"),
  progress: document.getElementById("progress"),
  progressFill: document.getElementById("progress-fill"),
  orderChip: document.getElementById("order-chip"),
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  flip: document.getElementById("flip"),
  shuffle: document.getElementById("shuffle"),
  reset: document.getElementById("reset"),
  dots: document.getElementById("dots"),
  message: document.getElementById("deck-message")
};

const total = CARDS.length;

/* ==========================================================
   Helpers
   ========================================================== */

function currentCard() {
  return CARDS[state.order[state.position]];
}

/** Fisher-Yates shuffle on a copy of the array */
function shuffleArray(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/* ==========================================================
   Rendering
   ========================================================== */

/** Fill both faces with the current card's text (does not touch the flip) */
function renderCardContent() {
  const card = currentCard();
  els.frontText.textContent = card.question;
  els.backText.textContent = card.answer;

  [els.frontTopic, els.backTopic].forEach(function (chip) {
    chip.textContent = card.topic;
    chip.setAttribute("data-topic", card.topic);
  });

  els.card.classList.remove("is-changing");
  void els.card.offsetWidth;
  if (!state.flipped) els.card.classList.add("is-changing");
}

/** Update flip state, progress and controls */
function renderStatus() {
  els.card.classList.toggle("is-flipped", state.flipped);
  els.card.setAttribute("aria-pressed", String(state.flipped));
  els.card.setAttribute(
    "aria-label",
    state.flipped ? "Flashcard showing the answer. Press to return to the question."
                  : "Flashcard showing the question. Press to reveal the answer."
  );
  els.flip.textContent = state.flipped ? "Show question" : "Show answer";

  const number = state.position + 1;
  els.progressText.textContent = "Card " + number + " of " + total;
  els.progress.setAttribute("aria-valuenow", number);
  els.progressFill.style.width = (number / total * 100) + "%";

  els.prev.disabled = state.position === 0;
  els.next.disabled = state.position === total - 1;
  els.orderChip.textContent = state.shuffled ? "Shuffled order" : "Original order";

  renderDots();
  renderMessage();
}

function buildDots() {
  els.dots.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", "Go to card " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); });
    els.dots.appendChild(dot);
  }
}

function renderDots() {
  els.dots.querySelectorAll(".dot").forEach(function (dot, i) {
    dot.classList.toggle("is-current", i === state.position);
    dot.classList.toggle("is-seen", state.seen.has(i) && i !== state.position);
    if (i === state.position) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function renderMessage() {
  const studied = state.seen.size;
  if (studied === total) {
    els.message.textContent = "You have seen every card in this deck. Shuffle to go again in a new order.";
  } else if (state.position === total - 1) {
    els.message.textContent = "This is the last card. Use the dots to revisit any you skipped.";
  } else {
    els.message.textContent = "You have studied " + studied + " of " + total + " cards so far.";
  }
}

/* ==========================================================
   Actions
   ========================================================== */

function flipCard() {
  state.flipped = !state.flipped;
  renderStatus();
}

/**
 * Move to a card by position.
 * If the card is showing its answer, flip it back first and swap the text
 * halfway through the flip so the next answer is never revealed early.
 */
function goTo(position) {
  if (position < 0 || position >= total || position === state.position) return;

  state.position = position;
  state.seen.add(position);

  if (state.flipped) {
    state.flipped = false;
    renderStatus();
    setTimeout(renderCardContent, FLIP_BACK_DELAY);
  } else {
    renderCardContent();
    renderStatus();
  }
}

function nextCard()     { goTo(state.position + 1); }
function previousCard() { goTo(state.position - 1); }

function startOver(order, shuffled) {
  state.order = order;
  state.shuffled = shuffled;
  state.position = 0;
  state.seen = new Set([0]);

  const wasFlipped = state.flipped;
  state.flipped = false;
  renderStatus();

  if (wasFlipped) setTimeout(renderCardContent, FLIP_BACK_DELAY);
  else renderCardContent();
}

function shuffleDeck() {
  startOver(shuffleArray(state.order), true);
}

function restoreOrder() {
  startOver(CARDS.map(function (_, i) { return i; }), false);
}

/* ==========================================================
   Events
   ========================================================== */

els.card.addEventListener("click", flipCard);
els.card.addEventListener("keydown", function (event) {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    flipCard();
  }
});

els.flip.addEventListener("click", flipCard);
els.next.addEventListener("click", nextCard);
els.prev.addEventListener("click", previousCard);
els.shuffle.addEventListener("click", shuffleDeck);
els.reset.addEventListener("click", restoreOrder);

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  switch (event.key) {
    case "ArrowRight": nextCard(); break;
    case "ArrowLeft":  previousCard(); break;
    case "f": case "F": flipCard(); break;
    case "s": case "S": shuffleDeck(); break;
  }
});

/* ==========================================================
   Start up
   ========================================================== */
buildDots();
renderCardContent();
renderStatus();
