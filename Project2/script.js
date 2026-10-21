const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
if (menuToggle && nav) {
  const closeMenu = () => { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation menu'); };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menuToggle.setAttribute('aria-label', open ? 'Open navigation menu' : 'Close navigation menu');
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.contains('open');
    item.classList.toggle('open', !open);
    button.setAttribute('aria-expanded', String(!open));
    button.querySelector('b').textContent = open ? '+' : '−';
  });
});

const form = document.querySelector('#contact-form');
if (form) {
  const fields = {
    name: { input: form.elements.name, error: document.querySelector('#name-error'), validate(value) { if (!value.trim()) return 'Please enter your name.'; if (value.trim().length < 2) return 'Name should contain at least 2 characters.'; return ''; } },
    email: { input: form.elements.email, error: document.querySelector('#email-error'), validate(value) { if (!value.trim()) return 'Please enter your email address.'; return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? '' : 'Please enter a valid email address.'; } },
    message: { input: form.elements.message, error: document.querySelector('#message-error'), validate(value) { if (!value.trim()) return 'Please add a short message.'; if (value.trim().length < 10) return 'Please write at least 10 characters.'; return ''; } }
  };
  function validateField(field) {
    const message = field.validate(field.input.value);
    field.error.textContent = message;
    field.input.classList.toggle('invalid', Boolean(message));
    field.input.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  }
  Object.values(fields).forEach(field => {
    field.input.addEventListener('blur', () => validateField(field));
    field.input.addEventListener('input', () => { if (field.input.classList.contains('invalid')) validateField(field); });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const valid = Object.values(fields).map(validateField).every(Boolean);
    const status = document.querySelector('#form-status');
    if (!valid) {
      status.textContent = 'Please review the highlighted fields and try again.';
      status.className = 'form-status error';
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    const firstName = fields.name.input.value.trim().split(/\s+/)[0];
    status.textContent = `Thanks, ${firstName}! Your form passed validation. This demo does not send messages to a server.`;
    status.className = 'form-status success';
    form.reset();
    Object.values(fields).forEach(field => { field.input.classList.remove('invalid'); field.input.removeAttribute('aria-invalid'); field.error.textContent = ''; });
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
