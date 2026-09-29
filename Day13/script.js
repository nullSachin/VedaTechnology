/* ==========================================================================
   New Year 2027 — Countdown Timer logic
   Task 13 · Web Development Track
   ========================================================================== */

// ---- Configure the target date here ----------------------------------
// Any valid Date string/constructor works. Change this line to point the
// countdown at a different moment — everything else updates automatically.
const TARGET_DATE = new Date("2027-01-01T00:00:00");
// ------------------------------------------------------------------------

const dom = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  timer: document.getElementById("timer"),
  complete: document.getElementById("completeMessage"),
};

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

function pad(number) {
  return String(number).padStart(2, "0");
}

function renderCompleted() {
  dom.timer.hidden = true;
  dom.complete.hidden = false;
}

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    dom.days.textContent = "00";
    dom.hours.textContent = "00";
    dom.minutes.textContent = "00";
    dom.seconds.textContent = "00";
    renderCompleted();
    clearInterval(intervalId);
    return;
  }

  const days = Math.floor(diff / ONE_DAY);
  const hours = Math.floor((diff % ONE_DAY) / ONE_HOUR);
  const minutes = Math.floor((diff % ONE_HOUR) / ONE_MINUTE);
  const seconds = Math.floor((diff % ONE_MINUTE) / ONE_SECOND);

  dom.days.textContent = pad(days);
  dom.hours.textContent = pad(hours);
  dom.minutes.textContent = pad(minutes);
  dom.seconds.textContent = pad(seconds);
}

// Run immediately so the page doesn't show 00:00:00 for the first second,
// then tick once per second.
updateCountdown();
const intervalId = setInterval(updateCountdown, ONE_SECOND);
