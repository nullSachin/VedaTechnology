# Random Password Generator

**Task 17 · Web Development Track · Veda Technology Internship**
**Level 1 · Day 17**

A password generator with adjustable length and character-type options, built with vanilla HTML5, CSS3, and JavaScript — using the Web Crypto API for genuinely random character selection.

---

## 📋 Task Brief

| | |
|---|---|
| **Objective** | Practice checkboxes, string building, and randomization logic |
| **Deliverables** | Length slider or input · Checkboxes for character types · Generated password display · Copy-to-clipboard button |
| **Tools** | HTML5, CSS3, JavaScript |

## 🔐 What it does

- A **length slider** from 4–32 characters, with the current value shown live
- Four **character-type checkboxes**: Uppercase, Lowercase, Numbers, Symbols — all checked by default
- A **generated password display** that updates instantly whenever the length or any checkbox changes
- A **copy-to-clipboard** button with a brief "Copied!" confirmation
- A **strength meter** (Weak / Medium / Strong) based on the password's entropy
- **Graceful handling of "no option selected"** — the generate/copy/regenerate controls disable, the field shows a clear placeholder, and a warning message appears, instead of silently producing an empty or broken password

## 📁 Files

```
password-generator/
├── index.html     # Page structure and content
├── styles.css      # All styling, layout, and responsive rules
├── script.js       # Pool building, randomization, strength, clipboard
└── README.md        # This file
```

## 🛠️ How to view it

No build step or server required — it's a static page.

1. Download all three files (`index.html`, `styles.css`, `script.js`) into the same folder.
2. Open `index.html` in a modern browser.

> The page loads three Google Fonts (`Manrope`, `Inter`, `JetBrains Mono`) over the network, and falls back to system fonts if you're offline.
>
> Copy-to-clipboard uses the Clipboard API, which needs a secure context (works fine opened locally or over `https`), with an `execCommand` fallback for older browsers.

## 🧠 How the logic works

1. **Character pool** — each checked option contributes its character set (`A–Z`, `a–z`, `0–9`, or symbols) to one combined pool string, built fresh every time the options change.
2. **Cryptographically random picks** — instead of `Math.random()`, character selection uses `crypto.getRandomValues()`, the Web Crypto API's source of cryptographically strong randomness, with **rejection sampling** to avoid modulo bias (so every character in the pool has an exactly equal chance of being picked, regardless of the pool's size).
3. **Guaranteed representation** — if the chosen length can fit one character from every selected type, the generator first picks one guaranteed character per selected type, then fills the rest of the length randomly from the full pool, and finally shuffles the whole result with a Fisher–Yates shuffle. This avoids the common bug where, say, "Symbols" is checked but a long password happens to come out with no symbol in it at all.
4. **Handling no selection** — if every checkbox is unchecked, the pool would be empty, so `generatePassword()` returns early rather than looping forever or throwing. The UI reflects this by disabling Generate/Regenerate/Copy, showing an inline warning, and swapping the field's content for a placeholder.
5. **Strength estimate** — calculated from the password's entropy (`length × log2(poolSize)`), bucketed into Weak / Medium / Strong, and shown as both a label and a fill bar.
6. **Live updates** — every control (slider or checkbox) re-runs the same `refresh()` function, so the displayed password, strength meter, and warning state always match the current options — there's no separate "stale" state to manage.

## 📱 Responsive approach

- A single centred card that scales down gracefully on smaller screens
- The 2×2 checkbox grid collapses to a single column under 480px

## ✅ Deliverables checklist

- [x] Length slider (4–32 characters, with live value display)
- [x] Checkboxes for character types (uppercase, lowercase, numbers, symbols)
- [x] Generated password display
- [x] Copy-to-clipboard button, with confirmation
- [x] Handles the case where no option is selected
- [x] Responsive layout for mobile and desktop

---

**Submitted by:** Sachin
**Track:** Web Development
**Internship:** Veda Technology
