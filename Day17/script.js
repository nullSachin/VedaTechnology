/* ==========================================================================
   Random Password Generator — logic
   Task 17 · Web Development Track
   ========================================================================== */

const CHAR_SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const dom = {
  passwordField: document.getElementById("passwordField"),
  lengthSlider: document.getElementById("lengthSlider"),
  lengthValue: document.getElementById("lengthValue"),
  optUpper: document.getElementById("optUpper"),
  optLower: document.getElementById("optLower"),
  optNumbers: document.getElementById("optNumbers"),
  optSymbols: document.getElementById("optSymbols"),
  generateBtn: document.getElementById("generateBtn"),
  regenBtn: document.getElementById("regenBtn"),
  copyBtn: document.getElementById("copyBtn"),
  copyConfirm: document.getElementById("copyConfirm"),
  warningMsg: document.getElementById("warningMsg"),
  strengthFill: document.getElementById("strengthFill"),
  strengthLabel: document.getElementById("strengthLabel"),
};

const optionCheckboxes = [
  { el: dom.optUpper, key: "upper" },
  { el: dom.optLower, key: "lower" },
  { el: dom.optNumbers, key: "numbers" },
  { el: dom.optSymbols, key: "symbols" },
];

// ---- Randomness helpers --------------------------------------------------
// Uses the Web Crypto API rather than Math.random() for the actual
// character picks, since crypto.getRandomValues() is designed for
// unpredictable, security-sensitive output.

function randomInt(maxExclusive) {
  const range = new Uint32Array(1);
  crypto.getRandomValues(range);
  // Reject values that would bias the result via modulo, for an even
  // distribution across [0, maxExclusive).
  const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
  let value = range[0];
  while (value >= limit) {
    crypto.getRandomValues(range);
    value = range[0];
  }
  return value % maxExclusive;
}

function randomChar(str) {
  return str[randomInt(str.length)];
}

/** Fisher–Yates shuffle using the same crypto-backed randomInt(). */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---- Options & pool building --------------------------------------------

function getSelectedTypes() {
  return optionCheckboxes.filter((opt) => opt.el.checked).map((opt) => opt.key);
}

function buildCharacterPool(selectedTypes) {
  return selectedTypes.map((key) => CHAR_SETS[key]).join("");
}

// ---- Password generation -------------------------------------------------

function generatePassword(length, selectedTypes) {
  if (selectedTypes.length === 0) return "";

  const pool = buildCharacterPool(selectedTypes);
  const chars = [];

  // Guarantee at least one character from each selected type, as long
  // as the requested length can fit them all.
  if (selectedTypes.length <= length) {
    selectedTypes.forEach((key) => chars.push(randomChar(CHAR_SETS[key])));
  }

  while (chars.length < length) {
    chars.push(randomChar(pool));
  }

  return shuffle(chars).join("");
}

// ---- Strength estimate ----------------------------------------------------

function estimateStrength(length, selectedTypes) {
  if (selectedTypes.length === 0 || length === 0) {
    return { percent: 0, label: "—", level: "none" };
  }

  const poolSize = buildCharacterPool(selectedTypes).length;
  const entropyBits = length * Math.log2(poolSize);

  if (entropyBits < 40) return { percent: 33, label: "Weak", level: "weak" };
  if (entropyBits < 65) return { percent: 66, label: "Medium", level: "medium" };
  return { percent: 100, label: "Strong", level: "strong" };
}

function renderStrength(length, selectedTypes) {
  const { percent, label, level } = estimateStrength(length, selectedTypes);
  dom.strengthFill.style.width = `${percent}%`;
  dom.strengthLabel.textContent = label;

  const colors = { weak: "var(--red)", medium: "var(--amber)", strong: "var(--mint)", none: "var(--muted)" };
  dom.strengthFill.style.background = colors[level];
}

// ---- Rendering / state sync ----------------------------------------------

function setControlsEnabled(enabled) {
  dom.generateBtn.disabled = !enabled;
  dom.regenBtn.disabled = !enabled;
  dom.copyBtn.disabled = !enabled;
}

function refresh() {
  const length = Number(dom.lengthSlider.value);
  dom.lengthValue.textContent = length;

  const selectedTypes = getSelectedTypes();
  const noOptionsSelected = selectedTypes.length === 0;

  dom.warningMsg.hidden = !noOptionsSelected;
  setControlsEnabled(!noOptionsSelected);

  if (noOptionsSelected) {
    dom.passwordField.value = "";
    dom.passwordField.placeholder = "Select at least one character type";
  } else {
    dom.passwordField.value = generatePassword(length, selectedTypes);
  }

  renderStrength(length, selectedTypes);
}

// ---- Copy to clipboard ----------------------------------------------------

async function copyPassword() {
  if (!dom.passwordField.value) return;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(dom.passwordField.value);
    } else {
      dom.passwordField.select();
      document.execCommand("copy");
    }
    dom.copyConfirm.classList.add("is-visible");
    setTimeout(() => dom.copyConfirm.classList.remove("is-visible"), 1200);
  } catch (err) {
    console.warn("Couldn't copy to clipboard.");
  }
}

// ---- Event wiring --------------------------------------------------------

dom.lengthSlider.addEventListener("input", refresh);
optionCheckboxes.forEach((opt) => opt.el.addEventListener("change", refresh));
dom.generateBtn.addEventListener("click", refresh);
dom.regenBtn.addEventListener("click", refresh);
dom.copyBtn.addEventListener("click", copyPassword);

// ---- Init --------------------------------------------------------
refresh();
