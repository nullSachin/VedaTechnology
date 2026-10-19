const navToggle = document.querySelector('#navToggle');
const navLinks = document.querySelector('#navLinks');
const navItems = document.querySelectorAll('#navLinks a');

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  document.body.classList.remove('menu-open');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  document.body.classList.toggle('menu-open', isOpen);
});

navItems.forEach((item) => item.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 700) closeMenu();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contactForm');
const fields = {
  name: document.querySelector('#name'),
  email: document.querySelector('#email'),
  message: document.querySelector('#message')
};
const errors = {
  name: document.querySelector('#nameError'),
  email: document.querySelector('#emailError'),
  message: document.querySelector('#messageError')
};
const status = document.querySelector('#formStatus');

function validateField(key) {
  const field = fields[key];
  const value = field.value.trim();
  let message = '';

  if (key === 'name') {
    if (!value) message = 'Please enter your name.';
    else if (value.length < 2) message = 'Name must contain at least 2 characters.';
  }
  if (key === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!value) message = 'Please enter your email address.';
    else if (!emailPattern.test(value)) message = 'Enter a valid email address, for example name@example.com.';
  }
  if (key === 'message') {
    if (!value) message = 'Please write a short message.';
    else if (value.length < 10) message = 'Your message must contain at least 10 characters.';
  }

  errors[key].textContent = message;
  field.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

Object.keys(fields).forEach((key) => {
  fields[key].addEventListener('blur', () => validateField(key));
  fields[key].addEventListener('input', () => {
    if (fields[key].getAttribute('aria-invalid') === 'true') validateField(key);
    status.textContent = '';
    status.classList.remove('error');
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const valid = Object.keys(fields).map(validateField).every(Boolean);
  if (!valid) {
    status.textContent = 'Please fix the highlighted fields and try again.';
    status.classList.add('error');
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  status.classList.remove('error');
  status.textContent = 'Validation successful! This demo does not send or store messages yet.';
  form.reset();
  Object.values(fields).forEach((field) => field.setAttribute('aria-invalid', 'false'));
  Object.values(errors).forEach((error) => { error.textContent = ''; });
});
