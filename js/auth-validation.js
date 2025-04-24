document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('sign-in-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailPopup = document.getElementById('email-popup');
  const passwordPopup = document.getElementById('password-popup');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const togglePasswordButton = document.querySelector('.toggle-password');

  // Email validation
  emailInput.addEventListener('blur', function () {
    validateEmail();
  });

  emailInput.addEventListener('focus', function () {
    hidePopup(emailPopup);
    emailError.textContent = '';
    emailInput.classList.remove('error');
  });

  // Password validation
  passwordInput.addEventListener('blur', function () {
    validatePassword();
  });

  passwordInput.addEventListener('focus', function () {
    hidePopup(passwordPopup);
    passwordError.textContent = '';
    passwordInput.classList.remove('error');
  });

  // Toggle password visibility
  togglePasswordButton.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Hide' : 'Show';
  });

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      // Form is valid, proceed with submission
      console.log('Form submitted successfully');
      // You can add AJAX submission here
      // form.submit();
    }
  });

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      showError(emailInput, emailPopup, 'Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, emailPopup, 'Please enter a valid email address');
      return false;
    }

    emailInput.classList.add('valid');
    return true;
  }

  function validatePassword() {
    const password = passwordInput.value.trim();

    if (password === '') {
      showError(passwordInput, passwordPopup, 'Password is required');
      return false;
    } else if (password.length < 6) {
      showError(passwordInput, passwordPopup, 'Password must be at least 6 characters');
      return false;
    }

    passwordInput.classList.add('valid');
    return true;
  }

  function showError(input, popup, message) {
    input.classList.add('error');
    input.classList.remove('valid');
    popup.textContent = message;
    popup.classList.add('show');

    // Position the popup
    const inputRect = input.getBoundingClientRect();
    popup.style.top = (input.offsetHeight + 5) + 'px';
    popup.style.left = '0';
  }

  function hidePopup(popup) {
    popup.classList.remove('show');
  }
});