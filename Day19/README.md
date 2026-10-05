# Star Rating Widget

An interactive 5-star rating component built as **Task 19** of the Web Development Track at **Veda Technology**.

Users can hover over the stars to preview a rating, click to select one, and see the current rating and its label update instantly.

## Features

- 5 clickable stars, each storing its value in a `data-value` attribute
- Hover preview that is independent of the selected rating
- Selected rating stored in a JavaScript state object
- Live display of the current rating (`3 / 5`) with a text label (Poor to Excellent)
- Clear rating button
- Keyboard accessible (Tab and arrow keys) with ARIA radio roles
- Responsive layout, automatic dark mode, and reduced-motion support

## Tech Stack

HTML5, CSS3, JavaScript (ES6, no libraries)

## Project Structure

```
star-rating-widget/
├── index.html   # markup and accessibility roles
├── style.css    # design tokens, layout, states
├── script.js    # state and event handling
├── README.md
└── REPORT.md
```

## How to Run

1. Download or clone the folder.
2. Open `index.html` in any modern browser. No build step or server is needed.

## How It Works

- `state = { rating, hover }` keeps the selected value and the hover value separate.
- `render()` toggles the `filled` class (selected) and the `preview` class (hover) on every star.
- Hover sets `state.hover`, click sets `state.rating`, and `mouseleave` clears the hover.

## Learning Outcomes

- Handling DOM events (`click`, `mouseenter`, `mouseleave`, `keydown`)
- Dynamic class toggling with `classList.toggle`
- Using `data-*` attributes to store values
- Managing simple UI state and rendering from it
- Building accessible, responsive components

## Author

Sachin, Web Development Intern, Veda Technology
