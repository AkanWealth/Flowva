document.addEventListener('DOMContentLoaded', function() {
  initOnboarding();
});

/**
* Initialize the onboarding process
*/
function initOnboarding() {
  // Elements
  const progressBar = document.getElementById('onboarding-progress');
  const continueBtn = document.getElementById('continue-btn');
  const backBtn = document.getElementById('back-btn');
  const steps = document.querySelectorAll('.step');
  
  // State
  let currentStep = 1;
  const totalSteps = steps.length;
  
  // Tool data for step 2
  const tools = [
      { id: 'figma', name: 'Figma', icon: '🎨' },
      { id: 'sketch', name: 'Sketch', icon: '✏️' },
      { id: 'photoshop', name: 'Photoshop', icon: '📸' },
      { id: 'illustrator', name: 'Illustrator', icon: '🖌️' },
      { id: 'vscode', name: 'VS Code', icon: '💻' },
      { id: 'github', name: 'GitHub', icon: '🐙' },
      { id: 'slack', name: 'Slack', icon: '💬' },
      { id: 'notion', name: 'Notion', icon: '📝' },
      { id: 'asana', name: 'Asana', icon: '📋' },
      { id: 'trello', name: 'Trello', icon: '📊' },
      { id: 'zoom', name: 'Zoom', icon: '🎥' },
      { id: 'dropbox', name: 'Dropbox', icon: '📦' }
  ];
  
  // Generate tool cards for step 2
  const toolsGrid = document.querySelector('.tools-grid');
  if (toolsGrid) {
      tools.forEach(tool => {
          const toolCard = document.createElement('div');
          toolCard.className = 'tool-card';
          toolCard.dataset.id = tool.id;
          
          toolCard.innerHTML = `
              <div class="tool-icon">${tool.icon}</div>
              <div class="tool-name">${tool.name}</div>
          `;
          
          toolCard.addEventListener('click', function() {
              this.classList.toggle('selected');
          });
          
          toolsGrid.appendChild(toolCard);
      });
  }
  
  // Initialize form elements
  initFormElements();
  
  // Show first step and set progress
  showStep(currentStep);
  updateProgress(currentStep, totalSteps);
  
  // Continue button event
  if (continueBtn) {
      continueBtn.addEventListener('click', function() {
          if (validateCurrentStep(currentStep)) {
              if (currentStep < totalSteps) {
                  currentStep++;
                  showStep(currentStep);
                  updateProgress(currentStep, totalSteps);
                  
                  // Show back button after first step
                  if (currentStep > 1) {
                      backBtn.classList.remove('hidden');
                  }
                  
                  // Change button text on last step
                  if (currentStep === totalSteps) {
                      continueBtn.textContent = 'Get Started';
                  }
              } else {
                  // Final step - redirect to dashboard
                  window.location.href = 'dashboard.html';
              }
          }
      });
  }
  
  // Back button event
  if (backBtn) {
      backBtn.addEventListener('click', function() {
          if (currentStep > 1) {
              currentStep--;
              showStep(currentStep);
              updateProgress(currentStep, totalSteps);
              
              // Hide back button on first step
              if (currentStep === 1) {
                  backBtn.classList.add('hidden');
              }
              
              // Reset continue button text
              if (currentStep < totalSteps) {
                  continueBtn.textContent = 'Continue';
              }
          }
      });
  }
}

/**
* Initialize form elements with interactive behavior
*/
function initFormElements() {
  // Radio buttons
  const radioContainers = document.querySelectorAll('.radio-container');
  radioContainers.forEach(container => {
      container.addEventListener('click', function() {
          // Find the radio input
          const radio = this.querySelector('input[type="radio"]');
          if (radio) {
              // Update checked state
              radio.checked = true;
              
              // Update selected class
              radioContainers.forEach(c => c.classList.remove('selected'));
              this.classList.add('selected');
          }
      });
  });
  
  // Checkbox containers
  const checkboxContainers = document.querySelectorAll('.checkbox-container');
  checkboxContainers.forEach(container => {
      container.addEventListener('click', function() {
          // Find the checkbox input
          const checkbox = this.querySelector('input[type="checkbox"]');
          if (checkbox) {
              // Toggle checked state
              checkbox.checked = !checkbox.checked;
              
              // Toggle selected class
              this.classList.toggle('selected', checkbox.checked);
          }
      });
  });
  
  // Toggle buttons
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons in the same group
          const group = this.closest('.toggle-group');
          if (group) {
              group.querySelectorAll('.toggle-btn').forEach(btn => {
                  btn.classList.remove('active');
              });
          }
          
          // Add active class to clicked button
          this.classList.add('active');
      });
  });
}

/**
* Show a specific step and hide others
* @param {number} stepNumber - The step number to show
*/
function showStep(stepNumber) {
  const steps = document.querySelectorAll('.step');
  
  steps.forEach((step, index) => {
      // Hide all steps
      step.classList.add('hidden');
      step.classList.remove('active');
      
      // Show the current step
      if (index + 1 === stepNumber) {
          step.classList.remove('hidden');
          
          // Add active class after a small delay for animation
          setTimeout(() => {
              step.classList.add('active');
          }, 50);
      }
  });
  
  // Scroll to top
  window.scrollTo(0, 0);
}

/**
* Update progress bar
* @param {number} current - The current step
* @param {number} total - The total number of steps
*/
function updateProgress(current, total) {
  const progressBar = document.getElementById('onboarding-progress');
  if (progressBar) {
      const percentage = (current / total) * 100;
      progressBar.style.width = `${percentage}%`;
  }
}

/**
* Validate the current step before proceeding
* @param {number} stepNumber - The current step number
* @returns {boolean} - Whether the step is valid
*/
function validateCurrentStep(stepNumber) {
  switch (stepNumber) {
      case 1:
          // Validate step 1 - User type and work type
          const userType = document.querySelector('input[name="userType"]:checked');
          const workTypes = document.querySelectorAll('input[name="workType"]:checked');
          
          if (!userType) {
              showError('Please select what best describes you');
              return false;
          }
          
          if (workTypes.length === 0) {
              showError('Please select at least one type of work');
              return false;
          }
          
          return true;
          
      case 2:
          // Validate step 2 - Tools selection
          const selectedTools = document.querySelectorAll('.tool-card.selected');
          
          if (selectedTools.length === 0) {
              showError('Please select at least one tool');
              return false;
          }
          
          return true;
          
      case 3:
          // Step 3 doesn't need validation - all fields are optional or have defaults
          return true;
          
      default:
          return true;
  }
}

/**
* Show an error message
* @param {string} message - The error message to display
*/
function showError(message) {
  // Check if error element already exists
  let errorElement = document.querySelector('.onboarding-error');
  
  if (!errorElement) {
      // Create error element
      errorElement = document.createElement('div');
      errorElement.className = 'onboarding-error';
      errorElement.style.cssText = `
          color: var(--error);
          margin: 16px 0;
          padding: 8px 12px;
          border-radius: var(--radius);
          background-color: rgba(229, 57, 53, 0.1);
          border-left: 3px solid var(--error);
          font-size: 14px;
      `;
      
      // Insert before button group
      const buttonGroup = document.querySelector('.button-group');
      buttonGroup.parentNode.insertBefore(errorElement, buttonGroup);
  }
  
  // Set message
  errorElement.textContent = message;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
      errorElement.remove();
  }, 5000);
}