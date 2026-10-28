/* ==========================================================================
   Ledgerly — Interactive Expense Tracker
   Web Development Internship Project
   --------------------------------------------------------------------------
   Structure of this file:
     1. Config & state
     2. Helpers (storage, dates, money)
     3. Data selectors (filter + sort, totals)
     4. Rendering
     5. Form handling (add / edit / validate)
     6. Delete flow
     7. Filters
     8. Init
   ========================================================================== */

// ---- 1. Config & state ------------------------------------------------

const STORAGE_KEY = "ledgerly.expenses.v1";

const CATEGORIES = [
  { id: "food", label: "Food & Dining", color: "#D9532B" },
  { id: "transport", label: "Transport", color: "#2F6FDE" },
  { id: "shopping", label: "Shopping", color: "#B2409A" },
  { id: "bills", label: "Bills & Utilities", color: "#C48A0A" },
  { id: "entertainment", label: "Entertainment", color: "#7A4FD1" },
  { id: "health", label: "Health", color: "#1C9A6C" },
  { id: "education", label: "Education", color: "#0F8FA8" },
  { id: "other", label: "Other", color: "#6C7572" },
];

const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

const state = {
  expenses: [],
  filters: { category: "all", from: "", to: "", sort: "date-desc" },
  editingId: null,
  pendingDeleteId: null,
};

// ---- DOM references -----------------------------------------------------

const $ = (id) => document.getElementById(id);

const dom = {
  form: $("expenseForm"),
  formTitle: $("formTitle"),
  editBadge: $("editBadge"),
  description: $("description"),
  amount: $("amount"),
  date: $("date"),
  category: $("category"),
  submitBtn: $("submitBtn"),
  cancelEditBtn: $("cancelEditBtn"),

  filterCategory: $("filterCategory"),
  filterFrom: $("filterFrom"),
  filterTo: $("filterTo"),
  sortBy: $("sortBy"),
  clearFiltersBtn: $("clearFiltersBtn"),
  filterHint: $("filterHint"),

  list: $("expenseList"),
  listCount: $("listCount"),
  emptyState: $("emptyState"),
  emptyTitle: $("emptyTitle"),
  emptyText: $("emptyText"),
  sampleBtn: $("sampleBtn"),
  template: $("expenseTemplate"),

  statTotal: $("statTotal"),
  statTotalNote: $("statTotalNote"),
  statCount: $("statCount"),
  statAverage: $("statAverage"),
  statLargest: $("statLargest"),
  statLargestNote: $("statLargestNote"),
  statTopCategory: $("statTopCategory"),
  statTopCategoryNote: $("statTopCategoryNote"),

  breakdownList: $("breakdownList"),
  breakdownEmpty: $("breakdownEmpty"),

  dialog: $("confirmDialog"),
  confirmText: $("confirmText"),
};

// ---- 2. Helpers ---------------------------------------------------------

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

function formatMoney(value) {
  return money.format(value);
}

/** Today as YYYY-MM-DD in the user's LOCAL time (toISOString would use UTC). */
function todayString() {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

/** Turns "2026-10-28" into "28 Oct 2026" without any timezone shift. */
function formatDate(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function makeId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Reads saved expenses, ignoring anything corrupt or malformed. */
function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (e) =>
          e &&
          typeof e.id === "string" &&
          typeof e.description === "string" &&
          typeof e.amount === "number" &&
          isFinite(e.amount) &&
          typeof e.date === "string" &&
          CATEGORY_BY_ID[e.category]
      )
      .map((e) => ({ ...e, createdAt: typeof e.createdAt === "number" ? e.createdAt : 0 }));
  } catch (err) {
    console.warn("Could not read saved expenses.", err);
    return [];
  }
}

function saveExpenses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
  } catch (err) {
    console.warn("Could not save expenses.", err);
  }
}

// ---- 3. Data selectors -----------------------------------------------------

/** Applies the category filter, date range and sort order to the full list. */
function getVisibleExpenses() {
  const { category, from, to, sort } = state.filters;

  const visible = state.expenses.filter((e) => {
    if (category !== "all" && e.category !== category) return false;
    // YYYY-MM-DD strings sort the same way as real dates, so plain
    // string comparison is enough here.
    if (from && e.date < from) return false;
    if (to && e.date > to) return false;
    return true;
  });

  const sorters = {
    "date-desc": (a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt,
    "date-asc": (a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt,
    "amount-desc": (a, b) => b.amount - a.amount,
    "amount-asc": (a, b) => a.amount - b.amount,
  };

  return visible.sort(sorters[sort]);
}

function sumAmounts(expenses) {
  // Work in paise (integers) to avoid floating-point drift like 0.1 + 0.2.
  const paise = expenses.reduce((total, e) => total + Math.round(e.amount * 100), 0);
  return paise / 100;
}

function totalsByCategory(expenses) {
  const totals = {};
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + Math.round(e.amount * 100);
  });
  return Object.entries(totals)
    .map(([id, paise]) => ({ id, total: paise / 100 }))
    .sort((a, b) => b.total - a.total);
}

function hasActiveFilters() {
  const { category, from, to } = state.filters;
  return category !== "all" || Boolean(from) || Boolean(to);
}

// ---- 4. Rendering ---------------------------------------------------------

function renderSummary(visible) {
  const total = sumAmounts(visible);
  const count = visible.length;

  dom.statTotal.textContent = formatMoney(total);
  dom.statTotalNote.textContent = hasActiveFilters() ? "Matching your filters" : "All expenses";
  dom.statCount.textContent = count;

  if (count === 0) {
    dom.statAverage.textContent = "No data yet";
    dom.statLargest.textContent = "—";
    dom.statLargestNote.innerHTML = "&nbsp;";
    dom.statTopCategory.textContent = "—";
    dom.statTopCategoryNote.innerHTML = "&nbsp;";
    return;
  }

  dom.statAverage.textContent = `${formatMoney(total / count)} on average`;

  const largest = visible.reduce((max, e) => (e.amount > max.amount ? e : max), visible[0]);
  dom.statLargest.textContent = formatMoney(largest.amount);
  dom.statLargestNote.textContent = largest.description;

  const top = totalsByCategory(visible)[0];
  dom.statTopCategory.textContent = CATEGORY_BY_ID[top.id].label;
  dom.statTopCategoryNote.textContent = `${formatMoney(top.total)} spent`;
}

function renderBreakdown(visible) {
  dom.breakdownList.innerHTML = "";
  const rows = totalsByCategory(visible);
  dom.breakdownEmpty.hidden = rows.length > 0;

  const grand = sumAmounts(visible);

  rows.forEach(({ id, total }) => {
    const cat = CATEGORY_BY_ID[id];
    const percent = grand > 0 ? (total / grand) * 100 : 0;

    const li = document.createElement("li");
    li.style.setProperty("--cat", cat.color);

    const top = document.createElement("div");
    top.className = "breakdown__top";

    const name = document.createElement("span");
    name.className = "breakdown__name";
    name.textContent = cat.label;

    const amount = document.createElement("span");
    amount.className = "breakdown__amount";
    amount.textContent = `${formatMoney(total)} · ${Math.round(percent)}%`;

    top.append(name, amount);

    const track = document.createElement("div");
    track.className = "breakdown__track";
    const fill = document.createElement("span");
    fill.className = "breakdown__fill";
    fill.style.width = `${percent}%`;
    track.appendChild(fill);

    li.append(top, track);
    dom.breakdownList.appendChild(li);
  });
}

function renderList(visible) {
  dom.list.innerHTML = "";

  visible.forEach((expense) => {
    const node = dom.template.content.cloneNode(true);
    const li = node.querySelector(".expense");
    const cat = CATEGORY_BY_ID[expense.category];

    li.dataset.id = expense.id;
    li.style.setProperty("--cat", cat.color);
    li.classList.toggle("is-editing", expense.id === state.editingId);

    // textContent (never innerHTML) so typed descriptions can't inject markup.
    node.querySelector(".expense__title").textContent = expense.description;
    node.querySelector(".expense__category").textContent = cat.label;

    const time = node.querySelector(".expense__date");
    time.textContent = formatDate(expense.date);
    time.dateTime = expense.date;

    node.querySelector(".expense__amount").textContent = formatMoney(expense.amount);
    node.querySelector('[data-action="edit"]').setAttribute("aria-label", `Edit ${expense.description}`);
    node.querySelector('[data-action="delete"]').setAttribute("aria-label", `Delete ${expense.description}`);

    dom.list.appendChild(node);
  });

  dom.listCount.textContent = `${visible.length} ${visible.length === 1 ? "item" : "items"}`;

  // Empty state: different wording for "nothing saved" vs "nothing matches".
  const isEmpty = visible.length === 0;
  dom.emptyState.hidden = !isEmpty;

  if (isEmpty) {
    const nothingSaved = state.expenses.length === 0;
    dom.emptyTitle.textContent = nothingSaved ? "No expenses yet" : "No matching expenses";
    dom.emptyText.textContent = nothingSaved
      ? "Add your first expense using the form to get started."
      : "Try a different category or widen the date range.";
    dom.sampleBtn.hidden = !nothingSaved;
  }
}

function render() {
  const visible = getVisibleExpenses();
  renderSummary(visible);
  renderBreakdown(visible);
  renderList(visible);

  const { from, to } = state.filters;
  dom.filterHint.hidden = !(from && to && from > to);
}

// ---- 5. Form handling -----------------------------------------------------

function fillCategorySelects() {
  CATEGORIES.forEach((c) => {
    const option = new Option(c.label, c.id);
    dom.category.add(option);
  });

  dom.filterCategory.add(new Option("All categories", "all"));
  CATEGORIES.forEach((c) => dom.filterCategory.add(new Option(c.label, c.id)));
}

function setError(field, message) {
  const el = document.querySelector(`[data-error-for="${field}"]`);
  el.textContent = message;
  el.closest(".field").classList.toggle("has-error", Boolean(message));
}

function clearErrors() {
  ["description", "amount", "date"].forEach((f) => setError(f, ""));
}

/** Returns a clean expense object, or null if the form isn't valid. */
function validateForm() {
  clearErrors();
  let valid = true;

  const description = dom.description.value.trim();
  const amount = parseFloat(dom.amount.value);
  const date = dom.date.value;

  if (!description) {
    setError("description", "Please describe what this expense was for.");
    valid = false;
  }

  if (dom.amount.value === "" || Number.isNaN(amount)) {
    setError("amount", "Enter an amount.");
    valid = false;
  } else if (amount <= 0) {
    setError("amount", "Amount must be greater than zero.");
    valid = false;
  } else if (amount > 100000000) {
    setError("amount", "That amount looks too large.");
    valid = false;
  }

  if (!date) {
    setError("date", "Pick a date.");
    valid = false;
  }

  if (!valid) return null;

  return {
    description,
    amount: Math.round(amount * 100) / 100,
    date,
    category: dom.category.value,
  };
}

function resetForm() {
  state.editingId = null;
  dom.form.reset();
  dom.date.value = todayString();
  clearErrors();

  dom.formTitle.textContent = "Add expense";
  dom.submitBtn.textContent = "Add expense";
  dom.editBadge.hidden = true;
  dom.cancelEditBtn.hidden = true;
}

function startEditing(id) {
  const expense = state.expenses.find((e) => e.id === id);
  if (!expense) return;

  state.editingId = id;
  dom.description.value = expense.description;
  dom.amount.value = expense.amount;
  dom.date.value = expense.date;
  dom.category.value = expense.category;
  clearErrors();

  dom.formTitle.textContent = "Edit expense";
  dom.submitBtn.textContent = "Save changes";
  dom.editBadge.hidden = false;
  dom.cancelEditBtn.hidden = false;

  render(); // highlights the row being edited
  dom.form.scrollIntoView({ behavior: "smooth", block: "center" });
  dom.description.focus({ preventScroll: true });
}

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = validateForm();
  if (!data) return;

  if (state.editingId) {
    const target = state.expenses.find((x) => x.id === state.editingId);
    if (target) Object.assign(target, data);
  } else {
    state.expenses.push({ id: makeId(), createdAt: Date.now(), ...data });
  }

  saveExpenses();
  resetForm();
  render();
});

dom.cancelEditBtn.addEventListener("click", () => {
  resetForm();
  render();
});

// ---- 6. Delete flow ------------------------------------------------------

// One delegated listener handles Edit and Delete for every row,
// including rows that are re-created on each render.
dom.list.addEventListener("click", (e) => {
  const button = e.target.closest("[data-action]");
  if (!button) return;

  const id = button.closest(".expense").dataset.id;

  if (button.dataset.action === "edit") {
    startEditing(id);
  } else if (button.dataset.action === "delete") {
    const expense = state.expenses.find((x) => x.id === id);
    state.pendingDeleteId = id;
    dom.confirmText.textContent = expense
      ? `“${expense.description}” (${formatMoney(expense.amount)}) will be removed. This cannot be undone.`
      : "This cannot be undone.";
    dom.dialog.showModal();
  }
});

dom.dialog.addEventListener("close", () => {
  const id = state.pendingDeleteId;
  state.pendingDeleteId = null;

  if (dom.dialog.returnValue !== "delete" || !id) return;

  state.expenses = state.expenses.filter((e) => e.id !== id);
  saveExpenses();

  if (state.editingId === id) resetForm();
  render();
});

// ---- 7. Filters ---------------------------------------------------------

function readFilters() {
  state.filters.category = dom.filterCategory.value;
  state.filters.from = dom.filterFrom.value;
  state.filters.to = dom.filterTo.value;
  state.filters.sort = dom.sortBy.value;
  render();
}

[dom.filterCategory, dom.filterFrom, dom.filterTo, dom.sortBy].forEach((el) =>
  el.addEventListener("change", readFilters)
);

dom.clearFiltersBtn.addEventListener("click", () => {
  dom.filterCategory.value = "all";
  dom.filterFrom.value = "";
  dom.filterTo.value = "";
  dom.sortBy.value = "date-desc";
  readFilters();
});

// ---- Sample data (for demos) --------------------------------------------

function loadSampleData() {
  const today = new Date();
  const daysAgo = (n) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - n);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const samples = [
    ["Monthly rent", 12000, "bills", 24],
    ["Electricity bill", 1840.5, "bills", 18],
    ["Groceries — weekly shop", 2310, "food", 15],
    ["Metro card recharge", 500, "transport", 12],
    ["Lunch with team", 640, "food", 9],
    ["Running shoes", 3499, "shopping", 7],
    ["Movie night", 780, "entertainment", 5],
    ["Online course subscription", 1299, "education", 4],
    ["Pharmacy", 415.75, "health", 2],
    ["Auto fare to office", 180, "transport", 1],
    ["Coffee and snacks", 260, "food", 0],
  ];

  state.expenses = samples.map(([description, amount, category, ago], i) => ({
    id: makeId(),
    createdAt: Date.now() + i,
    description,
    amount,
    category,
    date: daysAgo(ago),
  }));

  saveExpenses();
  render();
}

dom.sampleBtn.addEventListener("click", loadSampleData);

// ---- 8. Init -------------------------------------------------------------

fillCategorySelects();
state.expenses = loadExpenses();
dom.date.value = todayString();
render();
