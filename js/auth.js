document.addEventListener('DOMContentLoaded', function() {
  // Get the current page
  const currentPage = window.location.pathname.split('/').pop();
  
  // Initialize appropriate form handler
  if (currentPage === 'sign-in.html') {
      initSignInForm();
  } else if (currentPage === 'sign-up.html') {
      initSignUpForm();
  }
  
  // Initialize password toggle functionality for all password fields
  initPasswordToggles();
});

/**
* Initialize sign in form validation and submission
*/
function initSignInForm() {
  const form = document.getElementById('sign-in-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset errors
      resetErrors();
      
      // Validate inputs
      let isValid = true;
      
      if (!emailInput.value) {
          displayError(emailError, 'Email is required');
          isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
          displayError(emailError, 'Please enter a valid email address');
          isValid = false;
      }
      
      if (!passwordInput.value) {
          displayError(passwordError, 'Password is required');
          isValid = false;
      }
      
      if (isValid) {
          // Simulate successful login
          simulateAuth(form, 'onboarding.html');
      }
  });
}

/**
* Initialize sign up form validation and submission
*/
function initSignUpForm() {
  const form = document.getElementById('sign-up-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('signup-email');
  const passwordInput = document.getElementById('signup-password');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('signup-email-error');
  const passwordError = document.getElementById('signup-password-error');
  
  if (!form) return;
  
  // Password strength indicator
  if (passwordInput) {
      const passwordContainer = passwordInput.parentElement.parentElement;
      
      // Create strength indicator elements
      const strengthContainer = document.createElement('div');
      strengthContainer.className = 'password-strength';
      
      for (let i = 0; i < 3; i++) {
          const bar = document.createElement('div');
          bar.className = 'strength-bar';
          strengthContainer.appendChild(bar);
      }
      
      const strengthText = document.createElement('div');
      strengthText.className = 'strength-text';
      
      passwordContainer.insertBefore(strengthContainer, passwordError);
      passwordContainer.insertBefore(strengthText, passwordError);
      
      // Update strength indicator on password input
      passwordInput.addEventListener('input', function() {
          updatePasswordStrength(passwordInput.value, strengthContainer.children, strengthText);
      });
  }
  
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset errors
      resetErrors();
      
      // Validate inputs
      let isValid = true;
      
      if (!nameInput.value) {
          displayError(nameError, 'Name is required');
          isValid = false;
      }
      
      if (!emailInput.value) {
          displayError(emailError, 'Email is required');
          isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
          displayError(emailError, 'Please enter a valid email address');
          isValid = false;
      }
      
      if (!passwordInput.value) {
          displayError(passwordError, 'Password is required');
          isValid = false;
      } else if (passwordInput.value.length < 8) {
          displayError(passwordError, 'Password must be at least 8 characters');
          isValid = false;
      }
      
      if (isValid) {
          // Simulate successful registration
          simulateAuth(form, 'onboarding.html');
      }
  });
}

/**
* Initialize password visibility toggle for all password fields
*/
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  
  toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
          const passwordInput = this.previousElementSibling;
          
          // Toggle password visibility
          if (passwordInput.type === 'password') {
              passwordInput.type = 'text';
              this.textContent = 'Show';
          } else {
              passwordInput.type = 'password';
              this.textContent = 'Hide';
          }
      });
  });
}

/**
* Update password strength indicator
* @param {string} password - The password to check
* @param {NodeList} bars - The strength indicator bars
* @param {HTMLElement} text - The strength text element
*/
function updatePasswordStrength(password, bars, text) {
  let strength = 0;
  
  // Check password strength
  if (password.length >= 8) strength++;
  if (password.match(/[A-Z]/) && password.match(/[a-z]/)) strength++;
  if (password.match(/[0-9]/) || password.match(/[^A-Za-z0-9]/)) strength++;
  
  // Reset all bars
  for (let i = 0; i < bars.length; i++) {
      bars[i].className = 'strength-bar';
  }
  
  // Update active bars
  for (let i = 0; i < strength; i++) {
      bars[i].classList.add('active');
      
      if (strength === 1) {
          text.textContent = 'Weak';
      } else if (strength === 2) {
          bars[i].classList.add('medium');
          text.textContent = 'Medium';
      } else {
          bars[i].classList.add('strong');
          text.textContent = 'Strong';
      }
  }
  
  if (strength === 0) {
      text.textContent = '';
  }
}

/**
* Display error message
* @param {HTMLElement} element - The error element
* @param {string} message - The error message
*/
function displayError(element, message) {
  element.textContent = message;
  element.parentElement.classList.add('error');
}

/**
* Reset all error messages
*/
function resetErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
      element.textContent = '';
      element.parentElement.classList.remove('error');
  });
}

/**
* Validate email format
* @param {string} email - The email to validate
* @returns {boolean} - Whether the email is valid
*/
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
* Simulate authentication process with loading state
* @param {HTMLFormElement} form - The form element
* @param {string} redirectUrl - The URL to redirect to on success
*/
function simulateAuth(form, redirectUrl) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="spinner"></span> Processing...';
  
  // Simulate server request
  setTimeout(() => {
      // Redirect on success
      window.location.href = redirectUrl;
  }, 1500);
}