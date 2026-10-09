
"use strict";

const form = document.getElementById("tip-form");

const billInput = document.getElementById("bill-amount");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people-count");

const tipButtons = document.querySelectorAll(".tip-button");
const decreaseButton = document.getElementById("decrease-people");
const increaseButton = document.getElementById("increase-people");

const errorMessage = document.getElementById("error-message");

const output = {
    bill: document.getElementById("result-bill"),
    tip: document.getElementById("result-tip"),
    total: document.getElementById("result-total"),
    tipPerPerson: document.getElementById("result-tip-person"),
    totalPerPerson: document.getElementById("per-person-total"),
    people: document.getElementById("result-people")
};

const MAX_BILL = 1_000_000_000;
const MAX_TIP = 1000;
const MAX_PEOPLE = 10000;

let selectedTip = 15;

const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function formatCurrency(amount) {
    return currencyFormatter.format(amount);
}

function readNumber(input) {
    const value = input.value.trim();

    if (value === "") {
        return null;
    }

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
}

function setError(message = "") {
    errorMessage.textContent = message;
}

function setSelectedTip(percentage) {
    selectedTip = percentage;
    customTipInput.value = String(percentage);

    tipButtons.forEach((button) => {
        const isSelected =
            Number(button.dataset.tip) === percentage;

        button.classList.toggle("active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    calculateTip();
}

function updateOutputs(bill, tip, people) {
    const total = bill + tip;

    output.bill.textContent = formatCurrency(bill);
    output.tip.textContent = formatCurrency(tip);
    output.total.textContent = formatCurrency(total);
    output.tipPerPerson.textContent = formatCurrency(tip / people);
    output.totalPerPerson.textContent = formatCurrency(total / people);

    output.people.textContent =
        `${people} ${people === 1 ? "person" : "people"}`;
}

function clearOutputs() {
    updateOutputs(0, 0, 1);
    output.people.textContent = "—";
}

function calculateTip() {
    setError("");

    const bill = readNumber(billInput);
    const customTip = readNumber(customTipInput);
    const people = readNumber(peopleInput);

    if (bill === null) {
        clearOutputs();

        if (billInput.value.trim() !== "") {
            setError("Please enter a valid bill amount.");
        }

        return;
    }

    if (bill < 0 || bill > MAX_BILL) {
        clearOutputs();
        setError("Bill amount must be between ₹0 and ₹1,000,000,000.");
        return;
    }

    if (customTip === null) {
        clearOutputs();
        setError("Please enter a valid tip percentage.");
        return;
    }

    if (customTip < 0 || customTip > MAX_TIP) {
        clearOutputs();
        setError("Tip percentage must be between 0% and 1000%.");
        return;
    }

    if (
        people === null ||
        !Number.isInteger(people) ||
        people < 1 ||
        people > MAX_PEOPLE
    ) {
        clearOutputs();
        setError(`Number of people must be a whole number from 1 to ${MAX_PEOPLE}.`);
        return;
    }

    selectedTip = customTip;

    // Keep the preset selection in sync with the custom value.
    tipButtons.forEach((button) => {
        const isSelected = Number(button.dataset.tip) === customTip;

        button.classList.toggle("active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    const tipAmount = bill * (customTip / 100);

    updateOutputs(bill, tipAmount, people);
}

tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setSelectedTip(Number(button.dataset.tip));
    });
});

customTipInput.addEventListener("input", () => {
    const value = readNumber(customTipInput);

    if (value !== null && value >= 0 && value <= MAX_TIP) {
        selectedTip = value;
    }

    calculateTip();
});

billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

decreaseButton.addEventListener("click", () => {
    const current = readNumber(peopleInput) ?? 1;

    peopleInput.value = String(Math.max(1, Math.floor(current) - 1));
    calculateTip();
});

increaseButton.addEventListener("click", () => {
    const current = readNumber(peopleInput) ?? 1;

    peopleInput.value = String(Math.min(MAX_PEOPLE, Math.floor(current) + 1));
    calculateTip();
});

form.addEventListener("reset", () => {
    // The reset event fires before the browser restores default values.
    window.setTimeout(() => {
        selectedTip = 15;

        tipButtons.forEach((button) => {
            const isSelected = Number(button.dataset.tip) === 15;

            button.classList.toggle("active", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        setError("");
        calculateTip();
    }, 0);
});

// Initialise the calculator on page load.
setSelectedTip(15);