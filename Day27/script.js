/* ==========================================================
   Weather Icon Display | Task 27
   Concepts practised: conditional rendering, mapping data
   to the UI (no API), objects, DOM updates, default state
   ========================================================== */

"use strict";

/* ---------- Static data: one object, one entry per condition ---------- */
const WEATHER = {
  "sunny": {
    label: "Sunny",
    icon: "\u2600\uFE0F",
    summary: "Clear and bright",
    description: "Clear skies and bright sunshine all day. Ideal for outdoor plans, although UV levels can be high around midday.",
    temperature: "28\u201336\u00B0C",
    humidity: "30\u201345%",
    wind: "8 km/h",
    tip: "Wear sunscreen and sunglasses, and drink plenty of water."
  },
  "partly-cloudy": {
    label: "Partly cloudy",
    icon: "\u26C5",
    summary: "Sun with passing clouds",
    description: "A mix of sunshine and drifting clouds. You get pleasant light with some shade, so it is a comfortable day to be outside.",
    temperature: "22\u201328\u00B0C",
    humidity: "45\u201360%",
    wind: "12 km/h",
    tip: "Carry a light layer in case the clouds thicken later."
  },
  "cloudy": {
    label: "Cloudy",
    icon: "\u2601\uFE0F",
    summary: "Overcast skies",
    description: "Thick cloud cover hides most of the sun. Temperatures stay mild and the light is soft and even.",
    temperature: "18\u201324\u00B0C",
    humidity: "60\u201375%",
    wind: "10 km/h",
    tip: "A good day for a long walk. Keep a light jacket handy."
  },
  "rainy": {
    label: "Rainy",
    icon: "\uD83C\uDF27\uFE0F",
    summary: "Steady rain",
    description: "Steady rain under grey skies. Roads and footpaths turn slippery, so allow extra time for travel.",
    temperature: "16\u201322\u00B0C",
    humidity: "80\u201395%",
    wind: "15 km/h",
    tip: "Take an umbrella or raincoat and wear shoes with good grip."
  },
  "thunderstorm": {
    label: "Thunderstorm",
    icon: "\u26C8\uFE0F",
    summary: "Heavy rain with lightning",
    description: "Heavy rain with lightning and thunder. Conditions can change quickly and gusts may be strong.",
    temperature: "18\u201324\u00B0C",
    humidity: "85\u201395%",
    wind: "30 km/h",
    tip: "Stay indoors and keep away from open fields and tall trees."
  },
  "snowy": {
    label: "Snowy",
    icon: "\u2744\uFE0F",
    summary: "Snowfall and freezing air",
    description: "Snowfall with freezing temperatures. Expect reduced visibility and icy surfaces on roads and paths.",
    temperature: "-6\u20131\u00B0C",
    humidity: "70\u201390%",
    wind: "12 km/h",
    tip: "Dress in warm layers, wear waterproof boots and drive slowly."
  },
  "foggy": {
    label: "Foggy",
    icon: "\uD83C\uDF2B\uFE0F",
    summary: "Low visibility",
    description: "Low cloud at ground level cuts visibility sharply. Early mornings and late evenings are usually the worst.",
    temperature: "8\u201314\u00B0C",
    humidity: "90\u2013100%",
    wind: "5 km/h",
    tip: "Use low-beam headlights, slow down and leave a bigger gap between vehicles."
  },
  "windy": {
    label: "Windy",
    icon: "\uD83D\uDCA8",
    summary: "Strong, steady gusts",
    description: "Strong, steady winds under mostly clear skies. Loose objects can blow around and it feels cooler than the temperature suggests.",
    temperature: "15\u201322\u00B0C",
    humidity: "40\u201360%",
    wind: "35\u201350 km/h",
    tip: "Secure loose items outdoors and avoid parking under trees or signs."
  }
};

/* ---------- Default state shown before anything is selected ---------- */
const DEFAULT_STATE = {
  label: "No condition selected",
  icon: "\uD83C\uDF26\uFE0F",
  summary: "Waiting for your choice",
  description: "Select a weather condition from the dropdown to see its icon and description here.",
  temperature: "\u2013",
  humidity: "\u2013",
  wind: "\u2013",
  tip: "Tip: the background colour changes with every condition you pick."
};

/* ---------- DOM references ---------- */
const els = {
  select: document.getElementById("condition-select"),
  scene: document.getElementById("scene"),
  icon: document.getElementById("scene-icon"),
  title: document.getElementById("scene-title"),
  sub: document.getElementById("scene-sub"),
  desc: document.getElementById("scene-desc"),
  temp: document.getElementById("reading-temp"),
  humidity: document.getElementById("reading-humidity"),
  wind: document.getElementById("reading-wind"),
  tip: document.getElementById("scene-tip"),
  tableBody: document.getElementById("compare-body")
};

/* ==========================================================
   Rendering
   ========================================================== */

/**
 * Show the weather entry for a given key.
 * If the key is missing or unknown, the default state is shown instead.
 */
function render(key) {
  const isKnown = Object.prototype.hasOwnProperty.call(WEATHER, key);
  const data = isKnown ? WEATHER[key] : DEFAULT_STATE;

  els.icon.textContent = data.icon;
  els.title.textContent = data.label;
  els.sub.textContent = data.summary;
  els.desc.textContent = data.description;
  els.temp.textContent = data.temperature;
  els.humidity.textContent = data.humidity;
  els.wind.textContent = data.wind;
  els.tip.textContent = isKnown ? "Tip: " + data.tip : data.tip;

  // The data-condition attribute picks the background in CSS
  els.scene.setAttribute("data-condition", isKnown ? key : "default");

  // Replay the small icon animation
  els.icon.classList.remove("pop");
  void els.icon.offsetWidth;
  els.icon.classList.add("pop");

  els.select.value = isKnown ? key : "";
  highlightRow(isKnown ? key : "");
}

/** Fill the dropdown from the data object so the two never drift apart */
function buildDropdown() {
  Object.keys(WEATHER).forEach(function (key) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = WEATHER[key].icon + "  " + WEATHER[key].label;
    els.select.appendChild(option);
  });
}

/** Build the comparison table rows from the same data object */
function buildTable() {
  Object.keys(WEATHER).forEach(function (key) {
    const item = WEATHER[key];
    const row = document.createElement("tr");
    row.dataset.key = key;
    row.tabIndex = 0;
    row.setAttribute("aria-label", "Show " + item.label);

    row.innerHTML =
      '<td><span class="cond-cell"><span class="cond-icon" aria-hidden="true">' + item.icon +
      "</span>" + item.label + "</span></td>" +
      "<td>" + item.temperature + "</td>" +
      "<td>" + item.humidity + "</td>" +
      "<td>" + item.wind + "</td>";

    els.tableBody.appendChild(row);
  });
}

function highlightRow(key) {
  els.tableBody.querySelectorAll("tr").forEach(function (row) {
    row.classList.toggle("is-active", row.dataset.key === key);
  });
}

/* ==========================================================
   Events
   ========================================================== */

els.select.addEventListener("change", function () {
  render(els.select.value);
});

els.tableBody.addEventListener("click", function (event) {
  const row = event.target.closest("tr");
  if (row) render(row.dataset.key);
});

els.tableBody.addEventListener("keydown", function (event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  const row = event.target.closest("tr");
  if (row) {
    event.preventDefault();
    render(row.dataset.key);
  }
});

/* ==========================================================
   Start up: build the UI and show the default state
   ========================================================== */
buildDropdown();
buildTable();
render("");
