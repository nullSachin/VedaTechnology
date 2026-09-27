# Recipe Card Page — Chole Masala

**Task 11 · Web Development Track · Veda Technology Internship**
**Level 1 · Day 11**

A single, responsive recipe card built with semantic HTML5 and hand-written CSS3 — no frameworks, no libraries.

---

## 📋 Task Brief

| | |
|---|---|
| **Objective** | Practice semantic HTML structure and CSS card styling |
| **Deliverables** | A styled recipe card with image, ingredients, and steps · Responsive layout for mobile and desktop |
| **Tools** | HTML5, CSS3 |

## 🍲 What's on the card

The recipe featured is **Chole Masala** (spiced chickpea curry), including:

- A hero section with title, description, and quick-glance metadata (prep time, cook time, servings, spice level)
- A `<figure>` + `<figcaption>` illustration of the finished dish, built as inline SVG so the page has zero external image dependencies
- An ingredients list grouped by stage, marked up as an unordered list (`<ul>`)
- A five-step method marked up as an ordered list (`<ol>`), since preparation genuinely is sequential
- A closing chef's note

## 📁 Files

```
recipe-card/
├── index.html     # Page structure and content
├── styles.css      # All styling, layout, and responsive rules
└── README.md       # This file
```

## 🛠️ How to view it

No build step or server required — it's a static page.

1. Download `index.html` and `styles.css` into the same folder.
2. Double-click `index.html` (or right-click → Open with → your browser).

> The page loads two Google Fonts (`Fraunces` and `Work Sans`) over the network. If you're offline, it will fall back gracefully to system serif/sans-serif fonts.

## 🧩 Structure & semantics

- `<header>` for the title, tagline, and meta info
- `<figure>` / `<figcaption>` for the dish illustration, as the task hints suggested
- `<section>` for the ingredients and the preparation steps, each with its own heading (`aria-labelledby` linked for accessibility)
- `<ul>` for ingredients (unordered — order doesn't matter), `<ol>` for steps (ordered — sequence matters)
- `<footer>` for the closing note

## 📱 Responsive approach

- **Desktop (≥ 760px):** two-column layout — a fixed-width ingredients rail beside the preparation steps
- **Mobile (< 760px):** single column — ingredients stack above the steps, spacing and font sizes scale down
- Built with CSS Grid for the two-column layout and Flexbox for the meta strip, using relative units so text reflows cleanly at any width

## 🎨 Design notes

- **Palette:** warm ivory background with a paprika-rust accent and an olive-green secondary accent — colours pulled straight from the dish itself
- **Type:** `Fraunces` (serif) for the title and section headings to give the card an editorial, cookbook feel; `Work Sans` (sans-serif) for body copy and labels for readability
- **Illustration over photography:** the dish is rendered as inline SVG rather than a stock photo, keeping the card fully self-contained and fast-loading

## ✅ Deliverables checklist

- [x] Styled recipe card with image, ingredients, and steps
- [x] Responsive layout for mobile and desktop
- [x] Semantic HTML5 (`figure`/`figcaption`, `ul`/`ol`, `section`, `header`, `footer`)
- [x] Consistent spacing within a single card container

---

**Submitted by:** Sachin
**Track:** Web Development
**Internship:** Veda Technology
