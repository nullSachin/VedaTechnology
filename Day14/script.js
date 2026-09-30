/* ==========================================================================
   Color Palette Generator logic
   Task 14 · Web Development Track
   ========================================================================== */

const SWATCH_COUNT = 5;
const COPY_CONFIRM_DURATION = 1200; // ms

const paletteEl = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const swatchTemplate = document.getElementById("swatchTemplate");

/**
 * Generates a random 6-digit hex color, e.g. "#3F9ADB".
 * Builds the value byte-by-byte so it's always a full 6 characters
 * (no missing leading zeroes), using Math.random + toString(16).
 */
function generateHexColor() {
  let hex = "#";
  for (let i = 0; i < 3; i++) {
    const byte = Math.floor(Math.random() * 256);
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex.toUpperCase();
}

function generatePalette(count = SWATCH_COUNT) {
  return Array.from({ length: count }, generateHexColor);
}

/** Copies text to the clipboard, with a fallback for older browsers. */
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback: temporary off-screen textarea + execCommand
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function showCopiedConfirmation(swatchEl) {
  clearTimeout(swatchEl._copyTimeout);
  swatchEl.classList.add("is-copied");
  swatchEl._copyTimeout = setTimeout(() => {
    swatchEl.classList.remove("is-copied");
  }, COPY_CONFIRM_DURATION);
}

function handleSwatchActivate(swatchEl, hex) {
  copyToClipboard(hex)
    .then(() => showCopiedConfirmation(swatchEl))
    .catch(() => {
      // Clipboard access can be blocked by the browser/permissions;
      // fail quietly rather than breaking the rest of the UI.
      console.warn("Couldn't copy to clipboard.");
    });
}

function renderPalette(colors) {
  paletteEl.innerHTML = "";

  colors.forEach((hex) => {
    const node = swatchTemplate.content.cloneNode(true);
    const swatchEl = node.querySelector(".swatch");
    const colorEl = node.querySelector(".swatch__color");
    const hexEl = node.querySelector(".swatch__hex");

    colorEl.style.backgroundColor = hex;
    hexEl.textContent = hex;
    swatchEl.setAttribute("aria-label", `Copy color ${hex}`);

    swatchEl.addEventListener("click", () => handleSwatchActivate(swatchEl, hex));
    swatchEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSwatchActivate(swatchEl, hex);
      }
    });

    paletteEl.appendChild(node);
  });
}

function spinGenerateIcon() {
  generateBtn.classList.add("is-spinning");
  setTimeout(() => generateBtn.classList.remove("is-spinning"), 400);
}

function newPalette() {
  renderPalette(generatePalette());
  spinGenerateIcon();
}

generateBtn.addEventListener("click", newPalette);

// Spacebar shortcut for generating a new palette, as long as focus
// isn't on the button itself (which already handles space natively)
// or on a swatch (where space should copy that swatch's hex).
document.addEventListener("keydown", (e) => {
  const isTypingTarget = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
  const isSwatchFocused = document.activeElement.classList?.contains("swatch");
  const isButtonFocused = document.activeElement === generateBtn;

  if (e.code === "Space" && !isTypingTarget && !isSwatchFocused && !isButtonFocused) {
    e.preventDefault();
    newPalette();
  }
});

// Generate an initial palette as soon as the page loads.
newPalette();
