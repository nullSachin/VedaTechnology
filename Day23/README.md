
# Tiply — Smart Tip Calculator

A modern, responsive tip calculator built using HTML5, CSS3, and JavaScript. Tiply helps users calculate restaurant tips, split bills between multiple people, and view individual payment amounts instantly.

## Overview

Tiply provides a simple and intuitive interface for calculating tips and sharing a bill fairly. Users can enter a bill amount, select a predefined tip percentage or enter a custom percentage, and specify the number of people sharing the bill.

The results update automatically as the inputs change, making the application quick and easy to use.

## Features

- **Live calculations:** Updates results as the user changes inputs.
- **Preset tip percentages:** Select 10%, 15%, 18%, or 20%.
- **Custom tip percentage:** Enter a personalised tip rate.
- **Bill splitting:** Divide the bill between multiple people.
- **Detailed summary:** View the original bill, total tip, total bill, tip per person, and total per person.
- **Input validation:** Handles invalid amounts, negative values, and invalid people counts.
- **People counter:** Increase or decrease the number of people with dedicated controls.
- **Reset functionality:** Restore the calculator to its default state.
- **Responsive UI:** Works across desktop, tablet, and mobile screens.
- **Currency formatting:** Displays amounts in Indian Rupees (INR).

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and input controls |
| CSS3 | Layout, styling, responsive design, and interactive states |
| JavaScript | Calculations, validation, and DOM updates |

## Project Structure

```text
tip-calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run the Project

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Ensure `index.html`, `style.css`, and `script.js` are in the same directory.
4. Open `index.html` in your browser, or use the VS Code Live Server extension.

No package installation or backend server is required.

## Calculation Formulas

**Tip Amount**

`Tip Amount = Bill Amount × (Tip Percentage / 100)`

**Total Bill**

`Total Bill = Bill Amount + Tip Amount`

**Tip Per Person**

`Tip Per Person = Tip Amount / Number of People`

**Total Per Person**

`Total Per Person = Total Bill / Number of People`

## Example

For a bill of ₹1,000 with a 15% tip shared by 2 people:

| Calculation | Result |
|---|---:|
| Original bill | ₹1,000.00 |
| Tip amount | ₹150.00 |
| Total bill | ₹1,150.00 |
| Tip per person | ₹75.00 |
| Total per person | ₹575.00 |

## Validation

The application validates the bill amount, tip percentage, and number of people before displaying calculated results. It prevents division by zero and uses two decimal places for monetary values.

## Learning Outcomes

Through this project, I practised:

- JavaScript event handling and DOM manipulation.
- Arithmetic operations and percentage calculations.
- Form input validation.
- Updating UI elements dynamically.
- Responsive design using CSS media queries.
- Separating HTML, CSS, and JavaScript into maintainable files.

## Internship Context

This project was developed as **Task 23** of my Web Development Internship at **Veda Technology**.

## Author

**Sachin Kumar**

B.Tech Computer Science and Engineering Student  
Web Development Intern — Veda Technology

## Future Improvements

- Add more currencies.
- Support rounding and bill adjustments.
- Add a dark mode.
- Add automated tests for calculation logic.

---

Built with HTML, CSS, and JavaScript.
