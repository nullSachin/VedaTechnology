// Formly — Task 26: Signup Form with Validation
const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const termsInput = document.querySelector("#terms");
const message = document.querySelector("#formMessage");
const strengthRow = document.querySelector(".strength-row");
const strengthText = document.querySelector("#strengthText");

const fields = {
  fullName: { input: nameInput, error: document.querySelector("#nameError"), wrapper: nameInput.closest(".input-wrap"), status: document.querySelector("#nameStatus") },
  email: { input: emailInput, error: document.querySelector("#emailError"), wrapper: emailInput.closest(".input-wrap"), status: document.querySelector("#emailStatus") },
  password: { input: passwordInput, error: document.querySelector("#passwordError"), wrapper: passwordInput.closest(".input-wrap"), status: null }
};

function setFieldState(key, errorText = "") {
  const field = fields[key];
  const hasValue = field.input.value.trim().length > 0;
  field.error.textContent = errorText;
  field.wrapper.classList.toggle("invalid", Boolean(errorText));
  field.wrapper.classList.toggle("valid", !errorText && hasValue);
  field.input.setAttribute("aria-invalid", String(Boolean(errorText)));
  if (field.status) field.status.textContent = !errorText && hasValue ? "✓" : "";
}

function validateName() {
  const value = nameInput.value.trim();
  if (!value) return "Please enter your full name.";
  if (value.length < 2) return "Name must contain at least 2 characters.";
  if (!/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(value)) return "Use letters, spaces, apostrophes, periods, or hyphens only.";
  return "";
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) return "Please enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Enter a valid email address, such as name@example.com.";
  return "";
}

function getPasswordStrength(value) {
  if (!value) return { score: 0, label: "Password strength" };
  let score = 0;
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return { score, label: ["", "Needs work", "Fair", "Good", "Strong"][score] };
}

function validatePassword() {
  const value = passwordInput.value;
  if (!value) return "Please create a password.";
  if (value.length < 8) return "Use at least 8 characters.";
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) return "Include uppercase and lowercase letters.";
  if (!/\d/.test(value)) return "Include at least one number.";
  if (!/[^A-Za-z0-9]/.test(value)) return "Include at least one symbol (e.g. !, @, or #).";
  return "";
}

function updateStrength() {
  const result = getPasswordStrength(passwordInput.value);
  strengthRow.dataset.level = String(result.score);
  strengthText.textContent = result.label;
}

function validateTerms() {
  const error = document.querySelector("#termsError");
  error.textContent = termsInput.checked ? "" : "Please accept the terms to continue.";
  termsInput.setAttribute("aria-invalid", String(!termsInput.checked));
  return termsInput.checked;
}

function hideMessage() {
  message.hidden = true;
  message.textContent = "";
  message.className = "message";
}

function validateAll() {
  const nameError = validateName();
  const emailError = validateEmail();
  const passwordError = validatePassword();
  setFieldState("fullName", nameError);
  setFieldState("email", emailError);
  setFieldState("password", passwordError);
  const termsValid = validateTerms();
  return !nameError && !emailError && !passwordError && termsValid;
}

nameInput.addEventListener("input", () => { setFieldState("fullName", validateName()); hideMessage(); });
emailInput.addEventListener("input", () => { setFieldState("email", validateEmail()); hideMessage(); });
passwordInput.addEventListener("input", () => { setFieldState("password", validatePassword()); updateStrength(); hideMessage(); });
termsInput.addEventListener("change", () => { validateTerms(); hideMessage(); });

document.querySelector("#togglePassword").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const reveal = passwordInput.type === "password";
  passwordInput.type = reveal ? "text" : "password";
  button.textContent = reveal ? "Hide" : "Show";
  button.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
  passwordInput.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  hideMessage();
  if (!validateAll()) {
    message.hidden = false;
    message.className = "message error";
    message.textContent = "Please review the highlighted fields and correct the errors before continuing.";
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  const firstName = nameInput.value.trim();
  message.hidden = false;
  message.className = "message success";
  message.textContent = `Looks good, ${firstName}! Your form passed client-side validation. This demo does not create an account or send your details to a server.`;
  form.reset();
  Object.keys(fields).forEach((key) => setFieldState(key, ""));
  document.querySelector("#termsError").textContent = "";
  updateStrength();
});

document.querySelector("#signInLink").addEventListener("click", (event) => {
  event.preventDefault();
  message.hidden = false;
  message.className = "message";
  message.textContent = "This is a signup-form demo; sign-in functionality is not connected.";
});
for (const id of ["termsLink", "privacyLink"]) {
  document.querySelector(`#${id}`).addEventListener("click", (event) => {
    event.preventDefault();
    message.hidden = false;
    message.className = "message";
    message.textContent = "Demo notice: add your actual terms and privacy policy before publishing a production application.";
  });
}
updateStrength();
