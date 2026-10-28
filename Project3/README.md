# Ledgerly — Interactive Expense Tracker

A browser-based expense tracker where you can add, edit, delete, categorise and filter expenses, with totals and spending summaries. Everything is saved in your browser's LocalStorage, so your data is still there when you come back.

Built with **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step, no backend.

**Veda Technology · Web Development Internship · Project (Day 3 of 4)**

![Dashboard](screenshots/dashboard.png)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Expense entry form** | Description, amount (₹), date and category, with inline validation |
| **Expense listing** | Colour-coded rows showing description, category, date and amount |
| **Edit & delete** | Edit loads the expense back into the form; delete asks for confirmation first |
| **Category filtering** | Filter by any of 8 categories, or view all |
| **Date filtering** | Filter by a "From" date, a "To" date, or a range |
| **Sorting** | Newest, oldest, highest amount or lowest amount |
| **Total calculation** | Live total for whatever is currently shown |
| **Spending summaries** | Total, expense count and average, largest expense, top category, and a per-category breakdown with percentage bars |
| **LocalStorage persistence** | Data survives refreshes and browser restarts |
| **Responsive UI** | Works on desktop, tablet and phone |

Extras: a "Load sample data" button for demos, empty states that explain what to do next, and a safe-start behaviour if saved data is ever corrupted.

## 🖼️ Screenshots

| Filtering and sorting | Editing an expense | Mobile |
|---|---|---|
| ![Filtered](screenshots/filtered.png) | ![Edit](screenshots/edit.png) | ![Mobile](screenshots/mobile.png) |

## 🧰 Tech stack

- **HTML5** — semantic structure, `<template>` for list rows, `<dialog>` for the delete confirmation
- **CSS3** — custom properties, Grid and Flexbox, responsive breakpoints
- **JavaScript (ES6+)** — DOM manipulation, events, arrays and objects, `Intl` formatting
- **LocalStorage** — persistence
- **Git & GitHub** — version control and hosting

## 📁 Project structure

```
expense-tracker/
├── index.html        # Page structure, row template, delete dialog
├── styles.css        # All styling and responsive rules
├── script.js         # State, rendering, form handling, filters, storage
├── screenshots/      # Images used in this README
└── README.md
```

## 🚀 Getting started

No installation needed.

```bash
git clone https://github.com/nullSachin/expense-tracker.git
cd expense-tracker
```

Then open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

> The page loads two Google Fonts (`Onest` and `IBM Plex Mono`). If you are offline it falls back to system fonts and works exactly the same.

## 🧠 How it works

### Data model

Each expense is a plain object:

```js
{
  id: "b1f2…",            // unique id (crypto.randomUUID)
  description: "Groceries",
  amount: 2310,           // number, rounded to 2 decimals
  category: "food",       // one of the category ids
  date: "2026-10-13",     // YYYY-MM-DD
  createdAt: 1793165670827 // used to order same-day expenses
}
```

All expenses live in one array, `state.expenses`. The screen is always rendered *from* that array, so the UI and the data can never drift apart.

### Rendering

After every change (add, edit, delete, filter, sort) a single `render()` function recomputes what is visible and redraws the summary cards, the category breakdown and the list. Keeping one render path makes the app easy to reason about and debug.

### Filtering and sorting

`getVisibleExpenses()` applies the category filter, the date range and the sort order to a copy of the data. Dates are stored as `YYYY-MM-DD` strings, which sort in the same order as real dates, so plain string comparison is enough for the date range.

### Add / edit / delete

- **Add** validates the form, builds a new object and pushes it onto the array.
- **Edit** copies the expense back into the same form, switches the button to *Save changes*, and updates that object in place.
- **Delete** opens a `<dialog>` confirmation; only "Delete" removes the item.
- One **delegated click listener** on the list handles the edit and delete buttons for every row, including rows re-created on each render.

### Validation

- Description is required
- Amount must be a number greater than zero (and not absurdly large)
- Date is required
- Errors appear next to the field, not in a pop-up

### LocalStorage

Data is saved under the key `ledgerly.expenses.v1` after every change. On load, saved data is parsed inside a `try/catch` and each record is checked; anything corrupt or malformed is ignored, so a bad value can never stop the app from starting.

### Details worth noting

- **Money is summed in paise (integers)**, not floating-point rupees, to avoid errors like `0.1 + 0.2 = 0.30000000000000004`.
- **Dates use local time.** Today's date is built from local date parts, because `toISOString()` uses UTC and can show the wrong day.
- **Descriptions are inserted with `textContent`**, never `innerHTML`, so typed text such as `<b>hi</b>` is displayed literally and can't inject markup.
- **Currency formatting** uses `Intl.NumberFormat("en-IN", { currency: "INR" })`, giving Indian digit grouping (₹1,23,456.00).

## ✅ Deliverables checklist

- [x] Expense entry form
- [x] Expense listing
- [x] Edit and delete functionality
- [x] Category filtering
- [x] Date filtering
- [x] Total expense calculation
- [x] LocalStorage persistence
- [x] Responsive UI
- [x] README documentation
- [x] Version control with Git, hosted on GitHub

## 🧪 Testing performed

Manually tested in the browser:

- Empty form and negative amounts are rejected with clear messages
- Added expenses update the list, total and summaries immediately
- Total matches an independently calculated sum of the sample data
- Category filter, date range and all four sort orders return correct results
- A "From" date after the "To" date shows a hint and an explanatory empty state
- Edit pre-fills the form and saves changes; cancelling leaves data untouched
- Delete requires confirmation and updates totals
- Data persists across a page reload
- Corrupted LocalStorage does not crash the app
- Layout checked at desktop, tablet and phone widths

## 🔮 Possible improvements

- Export and import expenses as CSV
- Monthly budget with a progress indicator
- Charts (pie or monthly trend)
- Search by description
- Recurring expenses
- Dark mode

---

**Author:** Sachin · **Track:** Web Development · **Internship:** Veda Technology
