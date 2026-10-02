# Simple To-Do List (In-Memory)

**Task 16 · Web Development Track · Veda Technology Internship**
**Level 1 · Day 16**

A minimal to-do list where tasks live only in memory — add them, delete them, and a refresh starts clean. Built with vanilla HTML5, CSS3, and JavaScript.

---

## 📋 Task Brief

| | |
|---|---|
| **Objective** | Practice array manipulation, DOM rendering, and event delegation |
| **Deliverables** | Input field to add tasks · List rendering from an array · Delete button per task |
| **Tools** | HTML5, CSS3, JavaScript |

## ✅ What it does

- Type a task and press **Enter** (or click **Add**) to add it to the list
- Every task shows in a clean row with its own **delete (×)** button
- A live counter shows how many tasks are currently in the list ("3 tasks", "1 task")
- An **empty state** appears automatically when the list has no tasks — including right after the last one is deleted
- Nothing is saved anywhere — by design, this is an **in-memory only** list, so refreshing the page clears it

## 📁 Files

```
todo-list/
├── index.html     # Page structure and content
├── styles.css      # All styling, layout, and responsive rules
├── script.js       # Task array, rendering, and event delegation
└── README.md        # This file
```

## 🛠️ How to view it

No build step or server required — it's a static page.

1. Download all three files (`index.html`, `styles.css`, `script.js`) into the same folder.
2. Open `index.html` in any modern browser.

> The page loads two Google Fonts (`Plus Jakarta Sans` and `Inter`) over the network, and falls back to system fonts if you're offline.

## 🧠 How the logic works

1. **Array as the single source of truth** — all tasks live in one JavaScript array, `tasks`, as `{ id, text }` objects. There's no hidden state anywhere else.
2. **Re-render after every change** — rather than manually inserting or removing individual `<li>` elements, `render()` clears the list and rebuilds it from the current `tasks` array every time something changes. For a list this size, that keeps the UI guaranteed to match the data, with no risk of the two drifting apart.
3. **Adding a task** — submitting the form calls `addTask()`, which trims the input, ignores empty/whitespace-only submissions, pushes a new task object onto the array, and re-renders.
4. **Event delegation for delete** — rather than attaching a click listener to every individual delete button (which would need re-attaching after every re-render), a single listener lives on the `<ul>` container itself. It checks whether the click happened inside a `.task__delete` button using `event.target.closest()`, and looks up that task's `id` from its row's `data-id` attribute. This means delete buttons work correctly no matter how many times the list has been re-rendered.
5. **Deleting a task** — `deleteTask(id)` filters that task out of the array by `id` and re-renders.

## 📱 Responsive approach

- A single centred card that scales down gracefully on narrower screens
- The add-task row stays side-by-side (input + button) down to small phone widths, just with tighter padding

## ✅ Deliverables checklist

- [x] Input field to add tasks
- [x] List rendering from an array
- [x] Delete button per task
- [x] Event delegation used for delete buttons
- [x] Responsive layout for mobile and desktop

---

**Submitted by:** Sachin
**Track:** Web Development
**Internship:** Veda Technology
