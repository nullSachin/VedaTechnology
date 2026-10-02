/* ==========================================================================
   Simple To-Do List (In-Memory) — logic
   Task 16 · Web Development Track
   ========================================================================== */

// ---- State ------------------------------------------------------------
// Tasks live only in this array — nothing is persisted, so a page
// refresh starts with an empty list again, exactly as the task calls for.
let tasks = [];
let nextId = 1;

// ---- DOM references ------------------------------------------------------
const addForm = document.getElementById("addForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");
const taskTemplate = document.getElementById("taskTemplate");

// ---- Rendering --------------------------------------------------------
// The list is fully re-rendered from the `tasks` array after every
// change, rather than patching individual DOM nodes in place. For a
// small in-memory list this keeps the UI guaranteed to match the data.
function render() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const node = taskTemplate.content.cloneNode(true);
    const li = node.querySelector(".task");
    li.dataset.id = task.id;
    node.querySelector(".task__text").textContent = task.text;
    taskList.appendChild(node);
  });

  emptyState.classList.toggle("is-visible", tasks.length === 0);
  taskCount.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
}

// ---- Task operations --------------------------------------------------

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({ id: nextId++, text: trimmed });
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}

// ---- Event wiring --------------------------------------------------------

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

// Event delegation: a single listener on the list container handles
// clicks for every delete button, including ones added after the page
// loaded — no per-item listeners to attach or clean up.
taskList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".task__delete");
  if (!deleteBtn) return;

  const taskEl = deleteBtn.closest(".task");
  const id = Number(taskEl.dataset.id);
  deleteTask(id);
});

// ---- Init --------------------------------------------------------
render();
