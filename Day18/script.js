/* ==========================================================================
   Character & Word Counter — logic
   Task 18 · Web Development Track
   ========================================================================== */

const dom = {
  textInput: document.getElementById("textInput"),
  charCount: document.getElementById("charCount"),
  charNoSpaceCount: document.getElementById("charNoSpaceCount"),
  wordCount: document.getElementById("wordCount"),
  sentenceCount: document.getElementById("sentenceCount"),
  clearBtn: document.getElementById("clearBtn"),
};

/** Raw character count, including spaces and line breaks. */
function countCharacters(text) {
  return text.length;
}

/** Character count with all whitespace (spaces, tabs, newlines) removed. */
function countCharactersNoSpaces(text) {
  return text.replace(/\s/g, "").length;
}

/**
 * Word count: trim first so leading/trailing whitespace never counts as
 * a "gap", then split on any run of whitespace. An empty, trimmed string
 * has zero words rather than one (naively splitting "" still yields a
 * single empty-string element, which filter() removes here).
 */
function countWords(text) {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/**
 * Sentence count: split on runs of sentence-ending punctuation (. ! ?),
 * then drop any resulting empty/whitespace-only fragments (e.g. the
 * trailing piece after a final period). Text with no terminal
 * punctuation at all still counts as one sentence, since the whole
 * trimmed string comes back as a single non-empty fragment.
 */
function countSentences(text) {
  const trimmed = text.trim();
  if (trimmed === "") return 0;

  return trimmed
    .split(/[.!?]+/)
    .map((fragment) => fragment.trim())
    .filter((fragment) => fragment.length > 0).length;
}

function updateCounts() {
  const text = dom.textInput.value;

  dom.charCount.textContent = countCharacters(text);
  dom.charNoSpaceCount.textContent = countCharactersNoSpaces(text);
  dom.wordCount.textContent = countWords(text);
  dom.sentenceCount.textContent = countSentences(text);
}

// The task's hint calls out the `input` event specifically — unlike
// `change`, it fires on every keystroke, paste, and delete, which is
// what makes the counts feel truly live.
dom.textInput.addEventListener("input", updateCounts);

dom.clearBtn.addEventListener("click", () => {
  dom.textInput.value = "";
  dom.textInput.focus();
  updateCounts();
});

// Init (covers the case where the textarea loads with existing content).
updateCounts();
