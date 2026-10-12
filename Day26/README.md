# Formly — Signup Form with Validation

A polished, responsive signup form built with HTML5, CSS3, and vanilla JavaScript for **Task 26** of the Veda Technology Web Development Internship.

## Features
- Responsive layout for desktop, tablet, and mobile.
- Full-name validation and email-format checks.
- Password validation: minimum 8 characters, uppercase and lowercase letters, a number, and a symbol.
- Live password-strength indicator.
- Show/hide password control.
- Required Terms checkbox.
- Inline field errors and accessible feedback.
- Submission blocked when inputs are invalid.
- No JavaScript framework or package installation required.

## Technologies
- **HTML5:** semantic structure and form controls.
- **CSS3:** responsive layout, styling, focus states, and validation states.
- **JavaScript:** validation functions, regular expressions, events, and DOM updates.

## Project Structure
```text
signup-form-validation/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally
1. Download or clone this repository.
2. Keep `index.html`, `style.css`, and `script.js` in the same directory.
3. Open `index.html` in a modern browser.
4. Optionally use Live Server in Visual Studio Code.

Google Fonts are loaded online; fallback sans-serif fonts are provided.

## Validation Rules
| Field | Rule |
|---|---|
| Full name | Required, at least 2 characters, common name punctuation allowed |
| Email | Required and must match a practical email-format pattern |
| Password | Minimum 8 characters, uppercase, lowercase, number, and symbol |
| Terms | Must be accepted before submission |

## Testing Checklist
- [ ] Empty or too-short name shows an error.
- [ ] Invalid email format is rejected.
- [ ] Short or weak password shows helpful feedback.
- [ ] Strength indicator updates while typing.
- [ ] Show/hide password works.
- [ ] Terms checkbox is required.
- [ ] Invalid form submission is blocked.
- [ ] Valid input displays a confirmation message.
- [ ] Layout works on mobile screens.

## Security Note
This is a **client-side validation demo only**. Browser-side checks can be bypassed. A production signup system must repeat validation on the server, hash passwords securely, verify email ownership, protect against abuse, and use a database and secure authentication flow. This demo does not create accounts or transmit form data.

## Learning Outcomes
- Form handling and submit events.
- Regular expressions for basic validation.
- Conditional logic and reusable validation functions.
- DOM manipulation and user feedback.
- Accessible form labels and responsive CSS.
- Understanding client-side validation versus server-side security.

## Internship Information
- **Task:** 26 — Signup Form with Validation
- **Organization:** Veda Technology
- **Track:** Web Development
- **Author:** Sachin Kumar

---
Built with HTML, CSS, and JavaScript by Sachin Kumar.

