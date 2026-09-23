# Basic Calculator

A responsive web-based calculator that performs basic arithmetic operations including addition, subtraction, multiplication, and division.

This project was developed as **Task 7 of my Web Development Internship** to practice JavaScript event handling, arithmetic operations, DOM manipulation, state management, decimal values, validation, and CSS Grid.

---

## 📌 Project Overview

The Basic Calculator provides a simple and interactive interface for performing common arithmetic calculations.

Users can enter numbers using the calculator buttons, select an arithmetic operator, enter another number, and press the equals button to calculate the result.

The calculator also includes decimal number support, a clear button, and protection against division by zero.

---

## 🎯 Objective

The main objectives of this project were:

- Practice JavaScript event handling
- Perform arithmetic operations using JavaScript
- Understand DOM manipulation
- Manage calculator state
- Handle decimal values
- Implement clear and equals functionality
- Handle division-by-zero errors
- Create a button layout using CSS Grid
- Avoid using `eval()` for calculations

---

## ✨ Features

- Addition
- Subtraction
- Multiplication
- Division
- Decimal number support
- Clear button
- Equals button
- Division-by-zero handling
- Responsive design
- CSS Grid button layout
- Dynamic display updates
- JavaScript-based calculation logic
- No use of `eval()`

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)

### Concepts Practiced

- DOM Manipulation
- Event Handling
- JavaScript Variables
- Conditional Statements
- Arithmetic Operations
- State Management
- Data Attributes
- CSS Grid
- Responsive Web Design
- Input Validation

---

## 🧮 Supported Operations

| Operator | Operation |
|----------|-----------|
| + | Addition |
| − | Subtraction |
| × | Multiplication |
| ÷ | Division |
| . | Decimal |
| C | Clear |
| = | Calculate Result |

---

## ⚙️ How It Works

The calculator maintains three important pieces of state:

```javascript
currentNumber
firstNumber
selectedOperator
