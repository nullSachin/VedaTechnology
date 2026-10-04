# Character & Word Counter

**Task 18 · Web Development Track · Veda Technology Internship**
**Level 1 · Day 18**

A text-area tool that counts characters, words, and sentences live as you type, built with vanilla HTML5, CSS3, and JavaScript.

---

## 📋 Task Brief

| | |
|---|---|
| **Objective** | Practice input events, string methods, and live DOM updates |
| **Deliverables** | Live character count · Live word count · Optional sentence count |
| **Tools** | HTML5, CSS3, JavaScript |

## ✍️ What it does

- **Characters** — a raw count of every character typed, spaces and line breaks included
- **Words** — counted by splitting on whitespace, after trimming
- **Sentences** — counted by splitting on `.`, `!`, and `?`
- **No spaces** — a bonus stat showing the character count with all whitespace stripped out, for anywhere a strict character limit matters (e.g. a tweet or an SMS)
- All four stats update **live**, on every keystroke, paste, or deletion
- A **Clear** button resets the textarea and the stats in one click

## 📁 Files

```
word-counter/
├── index.html     # Page structure and content
├── styles.css      # All styling, layout, and responsive rules
├── script.js       # Counting logic and live input handling
└── README.md        # This file
```

## 🛠️ How to view it

No build step or server required — it's a static page.

1. Download all three files (`index.html`, `styles.css`, `script.js`) into the same folder.
2. Open `index.html` in any modern browser.

> The page loads three Google Fonts (`Lora`, `Inter`, `JetBrains Mono`) over the network, and falls back to system fonts if you're offline.

## 🧠 How the counting logic works

1. **The `input` event, specifically** — the textarea listens for `input`, not `change`. `change` only fires once the field loses focus; `input` fires on every keystroke, paste, and deletion, which is what makes the counts feel genuinely live.
2. **Characters** — simply `text.length`. A second stat, "No spaces," strips whitespace first with `text.replace(/\s/g, "")` for a stricter count.
3. **Words** — the text is **trimmed first** (per the task's hint), so leading/trailing whitespace never creates a phantom "gap." An empty, trimmed string returns `0` words rather than `1` — a common off-by-one bug, since naively splitting an empty string still yields one (empty) array element. The trimmed text is then split on any run of whitespace (`/\s+/`) and empty fragments are filtered out, so multiple spaces between words never inflate the count.
4. **Sentences** — the (trimmed) text is split on runs of sentence-ending punctuation (`/[.!?]+/`), and any empty or whitespace-only fragments from that split are dropped. Text with **no terminal punctuation at all** still counts as one sentence, since the whole string then comes back as a single non-empty fragment — a sensible fallback for a half-typed sentence rather than reporting zero.
5. **Live DOM updates** — one `updateCounts()` function reads the textarea's current value and writes all four results straight into their `<span>` elements via `textContent`, keeping the update path simple and fast.

## 📱 Responsive approach

- A single centred card that scales down gracefully on smaller screens
- The 4-stat row collapses to a 2×2 grid under 560px, and the textarea's minimum height shrinks slightly to keep the whole card comfortable on a phone screen

## ✅ Deliverables checklist

- [x] Live character count
- [x] Live word count
- [x] Sentence count
- [x] Responsive layout for mobile and desktop

---

**Submitted by:** Sachin
**Track:** Web Development
**Internship:** Veda Technology
