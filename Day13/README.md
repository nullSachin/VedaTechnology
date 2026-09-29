# Countdown Timer — New Year 2027

**Task 13 · Web Development Track · Veda Technology Internship**
**Level 1 · Day 13**

A responsive countdown timer that counts down to a configurable target date and displays days, hours, minutes, and seconds remaining — updated live with vanilla JavaScript.

---

## 📋 Task Brief

| | |
|---|---|
| **Objective** | Practice JavaScript Date math, `setInterval`, and DOM updates |
| **Deliverables** | Countdown display updating every second · Target date configurable in code · Message shown when countdown reaches zero |
| **Tools** | HTML5, CSS3, JavaScript |

## ⏱️ What it does

The page counts down to **1 January 2027, 12:00 AM** by default, updating a four-part display (days / hours / minutes / seconds) once per second. When the countdown reaches zero, it automatically stops and swaps in a completion message.

## 📁 Files

```
countdown-timer/
├── index.html     # Page structure and content
├── styles.css      # All styling, layout, and responsive rules
├── script.js       # Countdown logic — Date math, setInterval, DOM updates
└── README.md        # This file
```

## 🛠️ How to view it

No build step or server required — it's a static page.

1. Download all three files (`index.html`, `styles.css`, `script.js`) into the same folder.
2. Double-click `index.html` (or right-click → Open with → your browser).

> The page loads two Google Fonts (`Space Grotesk` and `Inter`) over the network. If you're offline, it will fall back gracefully to system fonts.

## ⚙️ Changing the target date

The target date lives in one place, right at the top of `script.js`:

```js
const TARGET_DATE = new Date("2027-01-01T00:00:00");
```

Change this line to any valid date/time and the whole page — including the "Counting down to…" caption — will count down to the new target automatically on next load.

## 🧠 How the logic works

1. **Date math** — on each tick, the target date's timestamp (`TARGET_DATE.getTime()`) is subtracted from the current time (`new Date().getTime()`) to get the remaining milliseconds.
2. **Unit conversion** — that millisecond difference is broken down into whole days, hours, minutes, and seconds using simple division and the modulo operator, so each unit only shows its own remainder (e.g. "hours" never exceeds 23).
3. **`setInterval`** — `updateCountdown()` runs once immediately (so the page never flashes `00:00:00:00` before the first tick), then again every 1000ms via `setInterval`.
4. **DOM updates** — each tick writes the new, zero-padded values into the four `<span>` elements via `textContent`, rather than re-rendering the whole page.
5. **Reaching zero** — once the difference is `<= 0`, the timer is zeroed out, `clearInterval` stops further ticks, the timer block is hidden, and the completion message is revealed.

## 📱 Responsive approach

- A centred single card that scales down gracefully on smaller screens
- The four digit units shrink and tighten their gaps under 560px
- Below 380px, the colon separators are hidden and the units wrap onto two rows so nothing gets cramped or clipped

## ✅ Deliverables checklist

- [x] Countdown display updating every second
- [x] Target date configurable in code (single constant at the top of `script.js`)
- [x] Message shown when the countdown reaches zero
- [x] Responsive layout for mobile and desktop

---

**Submitted by:** Sachin
**Track:** Web Development
**Internship:** Veda Technology
