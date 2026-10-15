/* ==========================================================
   Animated Skill Bars | Task 29
   Concepts practised: CSS transitions, scroll detection with
   IntersectionObserver, data attributes, configurable values
   ========================================================== */

"use strict";

/* ---------- Settings ---------- */
const FILL_MS = 1300;       // must match --fill-duration in style.css
const STAGGER_MS = 120;     // delay between bars that appear together
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- DOM references ---------- */
const skills = Array.from(document.querySelectorAll(".skill"));
const replayBtn = document.getElementById("replay");
const stat = {
  count: document.getElementById("stat-count"),
  average: document.getElementById("stat-average"),
  top: document.getElementById("stat-top")
};

/* Running count-up animations, so a replay can cancel them */
const timers = new Map();

/* ==========================================================
   Helpers
   ========================================================== */

/** Read the target percentage from the data-level attribute (kept between 0 and 100) */
function getLevel(skill) {
  const raw = Number(skill.querySelector(".fill").dataset.level);
  if (Number.isNaN(raw)) return 0;
  return Math.min(100, Math.max(0, raw));
}

function getName(skill) {
  return skill.querySelector(".skill-name").textContent.trim();
}

/** Turn a percentage into a level label */
function getLevelLabel(level) {
  if (level >= 85) return "Advanced";
  if (level >= 65) return "Proficient";
  if (level >= 40) return "Intermediate";
  return "Beginner";
}

/** Smooth deceleration, similar to the CSS easing on the bar */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ==========================================================
   Count-up number
   ========================================================== */

function animateCount(skill, target, delay) {
  const output = skill.querySelector(".count");
  cancelCount(skill);

  if (prefersReducedMotion) {
    output.textContent = target;
    return;
  }

  const startTimer = setTimeout(function () {
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / FILL_MS, 1);
      output.textContent = Math.round(easeOutCubic(progress) * target);
      if (progress < 1) {
        timers.set(skill, { raf: requestAnimationFrame(frame) });
      } else {
        timers.delete(skill);
      }
    }
    timers.set(skill, { raf: requestAnimationFrame(frame) });
  }, delay);

  timers.set(skill, { timeout: startTimer });
}

function cancelCount(skill) {
  const running = timers.get(skill);
  if (!running) return;
  if (running.timeout) clearTimeout(running.timeout);
  if (running.raf) cancelAnimationFrame(running.raf);
  timers.delete(skill);
}

/* ==========================================================
   Reveal and reset
   ========================================================== */

function revealSkill(skill, delay) {
  const fill = skill.querySelector(".fill");
  const level = getLevel(skill);
  const wait = prefersReducedMotion ? 0 : delay;

  fill.style.transitionDelay = wait + "ms";
  fill.style.width = level + "%";     // the CSS transition animates this change
  skill.classList.add("is-visible");
  animateCount(skill, level, wait);
}

function resetSkill(skill) {
  const fill = skill.querySelector(".fill");

  cancelCount(skill);
  skill.classList.remove("is-visible");

  // Jump back to 0 without animating, then restore the transition
  fill.style.transition = "none";
  fill.style.width = "0";
  void fill.offsetWidth;
  fill.style.transition = "";
  fill.style.transitionDelay = "0ms";

  skill.querySelector(".count").textContent = "0";
}

/* ==========================================================
   Scroll detection
   ========================================================== */

let observer = null;

function onIntersect(entries) {
  let order = 0;

  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    revealSkill(entry.target, order * STAGGER_MS);
    observer.unobserve(entry.target);   // animate only once per view
    order += 1;
  });
}

function watchSkills() {
  if (!("IntersectionObserver" in window)) {
    // Very old browsers: show everything after a short delay
    skills.forEach(function (skill, i) {
      setTimeout(function () { revealSkill(skill, 0); }, 300 + i * STAGGER_MS);
    });
    return;
  }

  observer = new IntersectionObserver(onIntersect, { threshold: 0.4 });
  skills.forEach(function (skill) { observer.observe(skill); });
}

/* ==========================================================
   Summary, level tags and replay
   ========================================================== */

function fillLevelTags() {
  skills.forEach(function (skill) {
    skill.querySelector(".level-tag").textContent = getLevelLabel(getLevel(skill));
  });
}

/** The hero numbers are calculated from the same data-level values */
function fillSummary() {
  const levels = skills.map(getLevel);
  const total = levels.reduce(function (sum, value) { return sum + value; }, 0);
  const strongestIndex = levels.indexOf(Math.max.apply(null, levels));

  stat.count.textContent = skills.length;
  stat.average.textContent = Math.round(total / skills.length) + "%";
  stat.top.textContent = getName(skills[strongestIndex]);
}

function replay() {
  skills.forEach(resetSkill);
  document.getElementById("skills").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

  if (observer) {
    // Observing again fires right away for bars already on screen
    skills.forEach(function (skill) { observer.observe(skill); });
  } else {
    watchSkills();
  }
}

replayBtn.addEventListener("click", replay);

/* ==========================================================
   Start up
   ========================================================== */
fillLevelTags();
fillSummary();
watchSkills();
