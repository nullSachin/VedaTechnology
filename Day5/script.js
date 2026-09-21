// Get HTML elements

const celsiusInput = document.getElementById("celsius");
const fahrenheitInput = document.getElementById("fahrenheit");
const kelvinInput = document.getElementById("kelvin");

const errorMessage = document.getElementById("error");

const clearButton = document.getElementById("clearBtn");


// =========================
// Conversion Functions
// =========================


// Celsius → Fahrenheit

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}


// Celsius → Kelvin

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}


// Fahrenheit → Celsius

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}


// Kelvin → Celsius

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}


// =========================
// Celsius Input
// =========================

celsiusInput.addEventListener("input", function () {

    const celsius = parseFloat(celsiusInput.value);

    // Empty input
    if (celsiusInput.value === "") {
        fahrenheitInput.value = "";
        kelvinInput.value = "";
        errorMessage.textContent = "";
        return;
    }

    // Check valid number
    if (isNaN(celsius)) {
        errorMessage.textContent = "Please enter a valid temperature.";
        return;
    }

    // Kelvin cannot be below absolute zero
    if (celsius < -273.15) {
        errorMessage.textContent =
            "Temperature cannot be below -273.15°C.";

        fahrenheitInput.value = "";
        kelvinInput.value = "";

        return;
    }

    errorMessage.textContent = "";

    const fahrenheit = celsiusToFahrenheit(celsius);
    const kelvin = celsiusToKelvin(celsius);

    fahrenheitInput.value = fahrenheit.toFixed(2);
    kelvinInput.value = kelvin.toFixed(2);
});


// =========================
// Fahrenheit Input
// =========================

fahrenheitInput.addEventListener("input", function () {

    const fahrenheit = parseFloat(fahrenheitInput.value);

    if (fahrenheitInput.value === "") {
        celsiusInput.value = "";
        kelvinInput.value = "";
        errorMessage.textContent = "";
        return;
    }

    if (isNaN(fahrenheit)) {
        errorMessage.textContent = "Please enter a valid temperature.";
        return;
    }

    const celsius = fahrenheitToCelsius(fahrenheit);

    if (celsius < -273.15) {
        errorMessage.textContent =
            "Temperature cannot be below absolute zero.";

        celsiusInput.value = "";
        kelvinInput.value = "";

        return;
    }

    errorMessage.textContent = "";

    const kelvin = celsiusToKelvin(celsius);

    celsiusInput.value = celsius.toFixed(2);
    kelvinInput.value = kelvin.toFixed(2);
});


// =========================
// Kelvin Input
// =========================

kelvinInput.addEventListener("input", function () {

    const kelvin = parseFloat(kelvinInput.value);

    if (kelvinInput.value === "") {
        celsiusInput.value = "";
        fahrenheitInput.value = "";
        errorMessage.textContent = "";
        return;
    }

    if (isNaN(kelvin)) {
        errorMessage.textContent = "Please enter a valid temperature.";
        return;
    }

    // Kelvin cannot be negative

    if (kelvin < 0) {
        errorMessage.textContent =
            "Kelvin temperature cannot be negative.";

        celsiusInput.value = "";
        fahrenheitInput.value = "";

        return;
    }

    errorMessage.textContent = "";

    const celsius = kelvinToCelsius(kelvin);
    const fahrenheit = celsiusToFahrenheit(celsius);

    celsiusInput.value = celsius.toFixed(2);
    fahrenheitInput.value = fahrenheit.toFixed(2);
});


// =========================
// Clear Button
// =========================

clearButton.addEventListener("click", function () {

    celsiusInput.value = "";
    fahrenheitInput.value = "";
    kelvinInput.value = "";

    errorMessage.textContent = "";
});