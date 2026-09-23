// =========================
// Get HTML Elements
// =========================

const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");

const operatorButtons = document.querySelectorAll(".operator");

const decimalButton = document.getElementById("decimal");

const clearButton = document.getElementById("clear");

const equalsButton = document.getElementById("equals");


// =========================
// Calculator State
// =========================

let currentNumber = "";

let firstNumber = null;

let selectedOperator = null;


// =========================
// Number Buttons
// =========================

numberButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const number = button.dataset.number;

        currentNumber += number;

        display.value = currentNumber;

    });

});


// =========================
// Decimal Button
// =========================

decimalButton.addEventListener("click", function () {

    // Prevent multiple decimal points

    if (currentNumber.includes(".")) {
        return;
    }

    // Start with 0 if decimal is clicked first

    if (currentNumber === "") {
        currentNumber = "0";
    }

    currentNumber += ".";

    display.value = currentNumber;

});


// =========================
// Operator Buttons
// =========================

operatorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Do nothing if there is no number

        if (currentNumber === "") {
            return;
        }

        firstNumber = parseFloat(currentNumber);

        selectedOperator = button.dataset.operator;

        currentNumber = "";

    });

});


// =========================
// Equals Button
// =========================

equalsButton.addEventListener("click", function () {

    // Check whether calculation is possible

    if (
        firstNumber === null ||
        selectedOperator === null ||
        currentNumber === ""
    ) {
        return;
    }


    const secondNumber = parseFloat(currentNumber);

    let result;


    // =========================
    // Perform Calculation
    // =========================

    if (selectedOperator === "+") {

        result = firstNumber + secondNumber;

    }
    else if (selectedOperator === "-") {

        result = firstNumber - secondNumber;

    }
    else if (selectedOperator === "*") {

        result = firstNumber * secondNumber;

    }
    else if (selectedOperator === "/") {

        // Divide by zero validation

        if (secondNumber === 0) {

            display.value = "Cannot divide by 0";

            currentNumber = "";

            firstNumber = null;

            selectedOperator = null;

            return;
        }

        result = firstNumber / secondNumber;
    }


    // =========================
    // Display Result
    // =========================

    display.value = result;

    currentNumber = result.toString();

    firstNumber = null;

    selectedOperator = null;

});


// =========================
// Clear Button
// =========================

clearButton.addEventListener("click", function () {

    display.value = "0";

    currentNumber = "";

    firstNumber = null;

    selectedOperator = null;

});