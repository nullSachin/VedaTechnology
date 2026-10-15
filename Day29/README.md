# Animated Skill / Progress Bars

A responsive skills section where progress bars fill to a percentage as they scroll into view. Built as **Task 29** of the Web Development Internship at **Veda Technology**.

## Overview

Each skill has a label, a percentage and a bar. The target percentage is stored in a `data-level` attribute. When a bar scrolls into view, an `IntersectionObserver` triggers JavaScript to set the width of the fill, and a CSS transition on `width` animates it smoothly. The percentage number counts up in step with the bar.

## Features

- 10 skill bars in three groups: Frontend core, Tools and workflow, and Currently learning
- Fill animation triggered when a bar scrolls into view (or immediately if it is already visible)
- Bars that appear together fill one after another with a short stagger
- Percentage numbers count up in sync with the fill
- Target percentages configured with a `data-level` attribute, so changing a value means editing one number
- Level tag under each bar (Beginner, Intermediate, Proficient or Advanced) calculated from its percentage
- Summary figures (skills tracked, average level and strongest skill) calculated from the same data
- "Replay animation" button to run the animation again
- Fully responsive layout for desktop, tablet and mobile
- Accessible: each bar has `role="progressbar"` with its value, visible focus styles, and reduced-motion support (bars show their final value without animation)

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| HTML5 | Page structure, `data-level` attributes and progressbar roles |
| CSS3 | Transitions on `width`, Grid and Flexbox layout, CSS variables |
| JavaScript (ES6) | IntersectionObserver, count-up numbers and summary calculations |

## Project Structure

```
skill-bars/
├── index.html    # Page structure and skill data
├── style.css     # Styling, transitions and responsive layout
├── script.js     # Scroll detection and animation logic
└── README.md     # Project documentation
```

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox or Safari).
3. Scroll down the page, or press **Replay animation**, to watch the bars fill.
4. No installation or build step is needed. An internet connection is only used to load Google Fonts; the page still works without it. JavaScript must be enabled for the bars to fill.

## How to Edit Your Skills

Each bar looks like this in `index.html`:

```html
<div class="fill" data-level="90"></div>
```

1. Change the number in `data-level` (0 to 100).
2. Update the matching `aria-valuenow` and `aria-valuetext` on the parent `.track` element so screen readers hear the same value.
3. Change the skill name and note text.

The level tag, the average and the strongest skill update automatically. The percentages in the sample page are example values; replace them with your own honest self-assessment.

## How It Works

**1. Animate the bar with a CSS transition on width**

```css
.fill {
  width: 0;
  transition: width 1.3s cubic-bezier(0.22, 0.8, 0.26, 1);
}
```

**2. Set the target width from a data attribute**

```js
const level = Number(fill.dataset.level);
fill.style.width = level + "%";
```

**3. Trigger the animation with IntersectionObserver**

```js
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    revealSkill(entry.target, 0);
    observer.unobserve(entry.target);   // animate only once
  });
}, { threshold: 0.4 });

skills.forEach(function (skill) { observer.observe(skill); });
```

**4. Keep percentages configurable**

All values live in the HTML as `data-level` attributes. The script reads them, so no number is repeated in CSS or JavaScript.

## Learning Outcomes

- Using CSS transitions on the `width` property
- Setting target values with `data-*` attributes
- Detecting scroll position with `IntersectionObserver`
- Staggering animations and counting numbers up in sync with them
- Respecting `prefers-reduced-motion`
- Building a responsive layout with Grid and Flexbox

## Possible Improvements

- Generate the bars from a JavaScript array instead of writing the HTML by hand
- Add a filter to show one skill group at a time
- Add circular progress indicators
- Add a dark theme

## Author

**Sachin**, Web Development Intern, Veda Technology

## License

This project was created for learning purposes as part of an internship task.
