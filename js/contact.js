/**
 * Contact Form Handling
 * This script handles the contact form submission and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

/**
 * Initialize the contact form with validation and submission handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            // Simulate form submission
            showSubmissionMessage(true);
            
            // Reset form after successful submission
            contactForm.reset();
        }
    });
    
    // Add input validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

/**
 * Validate the entire contact form
 * @returns {boolean} - Whether the form is valid
 */
function validateContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate an individual form input
 * @param {HTMLElement} input - The input element to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    let isValid = true;
    const errorClass = 'input-error';
    
    // Remove any existing error messages
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Check if required field is empty
    if (input.hasAttribute('required') && !input.value.trim()) {
        addErrorMessage(input, 'This field is required');
        isValid = false;
    }
    
    // Validate email format
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            addErrorMessage(input, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Validate phone format if provided
    if (input.type === 'tel' && input.value.trim()) {
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (!phoneRegex.test(input.value.trim())) {
            addErrorMessage(input, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    // Add or remove error class
    if (!isValid) {
        input.classList.add(errorClass);
    } else {
        input.classList.remove(errorClass);
    }
    
    return isValid;
}

/**
 * Add an error message below an input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function addErrorMessage(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
}

/**
 * Show a submission message after form submission
 * @param {boolean} success - Whether the submission was successful
 */
function showSubmissionMessage(success) {
    // Create modal for submission message
    const modal = document.createElement('div');
    modal.className = 'modal show-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    const title = document.createElement('h3');
    const message = document.createElement('p');
    
    if (success) {
        title.textContent = 'Message Sent!';
        message.textContent = 'Thank you for contacting us. We will get back to you as soon as possible.';
    } else {
        title.textContent = 'Error';
        message.textContent = 'There was a problem sending your message. Please try again later.';
    }
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Auto close after 5 seconds
    setTimeout(function() {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 5000);
}