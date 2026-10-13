# Weather Icon Display (Static Data)

A responsive web page where selecting a weather condition from a dropdown shows a matching icon, a description, typical readings and a practical tip. The background changes with each condition. All data is stored in a JavaScript object, so no API is used. Built as **Task 27** of the Web Development Internship at **Veda Technology**.

## Overview

The page keeps every weather condition in one object. When the user picks a condition, the script looks up that entry and updates the display. If nothing is selected yet, or the key is unknown, a default state is shown instead of an empty page.

## Features

- Dropdown of eight weather conditions: Sunny, Partly cloudy, Cloudy, Rainy, Thunderstorm, Snowy, Foggy and Windy
- Icon and description that update as soon as a condition is selected
- A different styled background for every condition, with a smooth colour fade
- Typical temperature, humidity and wind readings plus a practical tip
- A sensible default state before anything is selected
- "All conditions at a glance" table; selecting a row loads that condition
- "How the mapping works" section that explains the object lookup
- Dropdown and table are generated from the same data object, so they never drift apart
- Responsive layout for desktop, tablet and mobile
- Accessible: labelled dropdown, live-region updates, keyboard-friendly table rows, visible focus and reduced-motion support

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| HTML5 | Page structure and semantic markup |
| CSS3 | Layout (Grid and Flexbox), CSS variables, per-condition backgrounds |
| JavaScript (ES6) | Data object, conditional rendering and DOM updates |

## Project Structure

```
weather-icon-display/
├── index.html    # Page structure
├── style.css     # Styling, themes and responsive layout
├── script.js     # Weather data and rendering logic
└── README.md     # Project documentation
```

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox or Safari).
3. No installation, build step or internet API is required. An internet connection is only used to load Google Fonts; the page still works without it.

## How It Works

**1. Store conditions and icons in an object**

```js
const WEATHER = {
  sunny: {
    label: "Sunny",
    icon: "☀️",
    description: "Clear skies and bright sunshine all day...",
    temperature: "28–36°C",
    humidity: "30–45%",
    wind: "8 km/h",
    tip: "Wear sunscreen and sunglasses..."
  },
  rainy: { /* ... */ }
};
```

**2. Update the display based on the selected key**

```js
function render(key) {
  const isKnown = Object.prototype.hasOwnProperty.call(WEATHER, key);
  const data = isKnown ? WEATHER[key] : DEFAULT_STATE;
  // update icon, text, readings and the data-condition attribute
}
```

**3. Provide a default state**

`DEFAULT_STATE` is rendered on page load and whenever the key is missing, so the page never looks broken.

**4. Style the background per condition**

JavaScript sets `data-condition="rainy"` on the display card, and CSS picks the matching gradient:

```css
.scene[data-condition="rainy"] { --c1: #33557f; --c2: #172a47; }
```

## Learning Outcomes

- Mapping data to the UI without an API
- Using objects as lookup tables instead of long if/else chains
- Conditional rendering and default states
- Working with the `select` element and the `change` event
- Switching styles with data attributes and CSS variables

## Possible Improvements

- Connect a real weather API such as Open-Meteo
- Add a Celsius and Fahrenheit toggle
- Animate the icons (falling rain, drifting clouds)
- Remember the last selected condition with `localStorage`

## Author

**Sachin**, Web Development Intern, Veda Technology

## License

This project was created for learning purposes as part of an internship task.
