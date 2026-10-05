// Star Rating Widget - Task 19
(() => {
  "use strict";

  const LABELS = {
    0: "Not rated yet",
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very good",
    5: "Excellent"
  };

  // UI state: the selected rating is kept separate from the hover state
  const state = { rating: 0, hover: 0 };

  const starsEl = document.getElementById("stars");
  const stars = [...starsEl.querySelectorAll(".star")];
  const valueEl = document.getElementById("value");
  const statusEl = document.getElementById("status");
  const hintEl = document.getElementById("hint");
  const resetBtn = document.getElementById("reset");
  const DEFAULT_HINT = hintEl.textContent;

  const valueOf = (star) => Number(star.dataset.value);

  function render() {
    stars.forEach((star) => {
      const v = valueOf(star);
      star.classList.toggle("filled", v <= state.rating);
      // preview only shows on stars that are not already selected
      star.classList.toggle("preview", state.hover > 0 && v <= state.hover && v > state.rating);
      star.setAttribute("aria-checked", String(v === state.rating));
      star.tabIndex = v === (state.rating || 1) ? 0 : -1;
    });

    valueEl.textContent = state.rating;
    statusEl.textContent = LABELS[state.rating];
    resetBtn.disabled = state.rating === 0;
    hintEl.textContent = state.hover
      ? `${LABELS[state.hover]} (${state.hover} of 5)`
      : state.rating ? "Thanks for your feedback! Click a star to change it." : DEFAULT_HINT;
  }

  function setRating(value) {
    state.rating = value;
    render();
    const chosen = stars[value - 1];
    if (chosen) {
      chosen.classList.remove("pop");
      void chosen.offsetWidth; // restart animation
      chosen.classList.add("pop");
    }
  }

  stars.forEach((star) => {
    star.addEventListener("mouseenter", () => { state.hover = valueOf(star); render(); });
    star.addEventListener("click", () => setRating(valueOf(star)));
  });
  starsEl.addEventListener("mouseleave", () => { state.hover = 0; render(); });

  // Keyboard support: arrow keys move and select, like a native radio group
  starsEl.addEventListener("keydown", (e) => {
    const keys = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = Math.min(5, Math.max(1, (state.rating || 0) + keys[e.key]));
    setRating(next);
    stars[next - 1].focus();
  });

  resetBtn.addEventListener("click", () => { state.hover = 0; setRating(0); });

  render();
})();
