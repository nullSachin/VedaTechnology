# Color Palette Generator

**Task 14 · Web Development Track · Veda Technology Internship**
**Level 1 · Day 14**

A small tool that generates a random five-color palette and copies any swatch's hex code to the clipboard on click.

---

## 📋 Task Brief

| | |
|---|---|
| **Objective** | Practice random value generation, the Clipboard API, and DOM rendering |
| **Deliverables** | Button to generate a new palette · At least 5 color swatches with hex codes · Click-to-copy functionality |
| **Tools** | HTML5, CSS3, JavaScript |

## 🎨 What it does

- Generates a random **5-color palette** on load, and again on demand
- Each swatch shows a large color block with its **hex code** underneath
- Clicking (or tapping, or pressing Enter/Space on) a swatch **copies its hex code** to the clipboard and shows a brief **"Copied!"** confirmation
- Pressing the **spacebar** anywhere on the page also generates a new palette, as a quick keyboard shortcut

## 📁 Files

```
color-palette-generator/
├── index.html     # Page structure and content
├── styles.css      # All styling, layout, and responsive rules
├── script.js       # Random color generation, rendering, Clipboard API
└── README.md        # This file
```

## 🛠️ How to view it

No build step or server required — it's a static page.

1. Download all three files (`index.html`, `styles.css`, `script.js`) into the same folder.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).

> The page loads three Google Fonts (`Sora`, `Inter`, `JetBrains Mono`) over the network, and it falls back to system fonts if you're offline.
>
> The Clipboard API (`navigator.clipboard`) requires a **secure context** — it works when the file is opened locally or served over `https`. A fallback using the older `execCommand("copy")` is included for browsers where it isn't available.

## 🧠 How the logic works

1. **Random color generation** — `generateHexColor()` builds a hex string one byte at a time: `Math.random()` picks a number from 0–255 for each of the red, green, and blue channels, which is then converted to a 2-digit hex string with `toString(16)` and padded with `padStart(2, "0")` so single-digit values (like `5` → `05`) never break the hex code.
2. **Rendering** — `renderPalette()` clones a `<template>` for each color, sets its background and hex label, and appends it to the grid — keeping the markup for a single swatch defined once, in the HTML, rather than built up as a JavaScript string.
3. **Clipboard API** — clicking a swatch calls `navigator.clipboard.writeText(hex)`, the modern, promise-based way to write to the system clipboard, with an `execCommand` fallback for older or non-secure contexts.
4. **Confirmation** — on a successful copy, the swatch gets an `is-copied` class that reveals a "Copied!" overlay via CSS, which is then removed automatically after 1.2 seconds with `setTimeout`.

## 📱 Responsive approach

- **Desktop (> 860px):** all 5 swatches in a single row
- **Tablet (≤ 860px):** wraps to a 3-column grid
- **Mobile (≤ 560px):** 2-column grid, with the "Generate palette" button expanding to full width
- **Small phones (≤ 360px):** single column, so nothing gets cramped

## ✅ Deliverables checklist

- [x] Button to generate a new palette
- [x] At least 5 color swatches with hex codes
- [x] Click-to-copy functionality
- [x] Brief confirmation shown when a color is copied
- [x] Responsive layout for mobile and desktop

---

**Submitted by:** Sachin
**Track:** Web Development
**Internship:** Veda Technology
