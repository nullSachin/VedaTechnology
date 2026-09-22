// Get HTML elements

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const calculateButton = document.getElementById("calculateBtn");

const bmiValue = document.getElementById("bmiValue");
const category = document.getElementById("category");

const errorMessage = document.getElementById("error");


// =========================
// Calculate BMI
// =========================

calculateButton.addEventListener("click", function () {

    // Get input values

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);


    // =========================
    // Validation
    // =========================

    if (heightInput.value === "" || weightInput.value === "") {

        errorMessage.textContent =
            "Please enter both height and weight.";

        bmiValue.textContent = "--";

        category.textContent =
            "Enter your details to calculate BMI.";

        return;
    }


    // Check for invalid values

    if (isNaN(height) || isNaN(weight)) {

        errorMessage.textContent =
            "Please enter valid numbers.";

        return;
    }


    // Reject zero and negative values

    if (height <= 0 || weight <= 0) {

        errorMessage.textContent =
            "Height and weight must be greater than zero.";

        bmiValue.textContent = "--";

        category.textContent =
            "Enter valid values.";

        return;
    }


    // Check unrealistic height

    if (height < 50 || height > 300) {

        errorMessage.textContent =
            "Please enter a valid height between 50 and 300 cm.";

        return;
    }


    // Remove error message

    errorMessage.textContent = "";


    // =========================
    // BMI Calculation
    // =========================

    // Convert height from cm to meters

    const heightInMeters = height / 100;


    // BMI formula

    const bmi = weight / (heightInMeters * heightInMeters);


    // Round BMI to two decimal places

    const roundedBMI = bmi.toFixed(2);


    // Display BMI

    bmiValue.textContent = roundedBMI;


    // =========================
    // BMI Category
    // =========================

    if (bmi < 18.5) {

        category.textContent = "Underweight";

    }
    else if (bmi < 25) {

        category.textContent = "Normal weight";

    }
    else if (bmi < 30) {

        category.textContent = "Overweight";

    }
    else {

        category.textContent = "Obesity";

    }

});