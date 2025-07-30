/**
 * Feedback Form JavaScript
 * Handles form submission, validation, and star rating functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initFeedbackForm();
    initStarRatings();
    initFaqAccordion();
    initTestimonialSlider();
});

/**
 * Initialize the feedback form submission and validation
 */
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (!feedbackForm) return;

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateFeedbackForm()) {
            // Simulate form submission
            submitFeedback();
        }
    });

    // Reset button functionality
    const resetButton = feedbackForm.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset star ratings
            const stars = document.querySelectorAll('.rating input[type="radio"]');
            stars.forEach(star => star.checked = false);
            
            // Reset rating text
            const ratingText = document.getElementById('ratingText');
            if (ratingText) ratingText.textContent = 'Select a rating';
            
            // Clear any validation errors
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
            
            const invalidFields = document.querySelectorAll('.invalid-field');
            invalidFields.forEach(field => field.classList.remove('invalid-field'));
        });
    }
}

/**
 * Validate the feedback form
 * @returns {boolean} Whether the form is valid
 */
function validateFeedbackForm() {
    let isValid = true;
    
    // Remove any existing error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const invalidFields = document.querySelectorAll('.invalid-field');
    invalidFields.forEach(field => field.classList.remove('invalid-field'));
    
    // Required fields validation
    const requiredFields = [
        { id: 'visitType', message: 'Please select a visit type' },
        { id: 'visitDate', message: 'Please enter the date of your visit' },
        { id: 'department', message: 'Please select a department' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            showValidationError(element, field.message);
            isValid = false;
        }
    });
    
    // Rating validation
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    let ratingSelected = false;
    ratingInputs.forEach(input => {
        if (input.checked) ratingSelected = true;
    });
    
    if (!ratingSelected) {
        const ratingContainer = document.querySelector('.rating-container');
        showValidationError(ratingContainer, 'Please select an overall rating');
        isValid = false;
    }
    
    // Privacy consent validation
    const privacyConsent = document.getElementById('privacyConsent');
    if (privacyConsent && !privacyConsent.checked) {
        showValidationError(privacyConsent, 'You must agree to the Privacy Policy');
        isValid = false;
    }
    
    // Email validation if provided
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value.trim() !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showValidationError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Show validation error for a form field
 * @param {HTMLElement} element - The form element with error
 * @param {string} message - The error message to display
 */
function showValidationError(element, message) {
    if (!element) return;
    
    element.classList.add('invalid-field');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Insert error message after the element or its parent container
    const parent = element.closest('.form-group') || element.parentNode;
    parent.appendChild(errorMessage);
    
    // Focus on the first invalid field
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
        element.focus();
    }
}

/**
 * Simulate form submission and show success message
 */
function submitFeedback() {
    // Simulate API call with a timeout
    setTimeout(() => {
        // Show success modal
        const successModal = document.getElementById('feedbackSuccessModal');
        if (successModal) {
            successModal.classList.add('show');
            
            // Add event listeners to close the modal
            const closeButtons = successModal.querySelectorAll('.modal-close, .modal-close-btn');
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    successModal.classList.remove('show');
                    // Reset the form after successful submission
                    document.getElementById('feedbackForm').reset();
                    
                    // Reset star ratings
                    const stars = document.querySelectorAll('.rating input[type="radio"]');
                    stars.forEach(star => star.checked = false);
                    
                    // Reset rating text
                    const ratingText = document.getElementById('ratingText');
                    if (ratingText) ratingText.textContent = 'Select a rating';
                });
            });
        }
    }, 1000);
}

/**
 * Initialize star rating functionality
 */
function initStarRatings() {
    // Main rating
    const mainRatingInputs = document.querySelectorAll('input[name="rating"]');
    const ratingText = document.getElementById('ratingText');
    
    if (mainRatingInputs.length && ratingText) {
        const ratingLabels = {
            '5': 'Excellent',
            '4': 'Very Good',
            '3': 'Good',
            '2': 'Fair',
            '1': 'Poor'
        };
        
        mainRatingInputs.forEach(input => {
            input.addEventListener('change', function() {
                ratingText.textContent = ratingLabels[this.value] || 'Select a rating';
                
                // Remove any validation error
                const ratingContainer = document.querySelector('.rating-container');
                if (ratingContainer) {
                    ratingContainer.classList.remove('invalid-field');
                    const errorMessage = ratingContainer.querySelector('.error-message');
                    if (errorMessage) errorMessage.remove();
                }
            });
        });
    }
    
    // Aspect ratings (smaller ratings)
    const aspectRatings = document.querySelectorAll('.aspect-rating .rating.small-rating input[type="radio"]');
    aspectRatings.forEach(input => {
        input.addEventListener('change', function() {
            // Visual feedback only, no text change needed
        });
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle icon
                if (item.classList.contains('active')) {
                    toggle.innerHTML = '<i class="fas fa-chevron-up"></i>';
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
                    answer.style.maxHeight = '0';
                }
            });
        }
    });
}

/**
 * Initialize testimonial slider functionality
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    
    if (!slider || !dots.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.testimonial-card').length;
    
    // Set initial state
    updateSlider();
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
    });
    
    /**
     * Update the slider position and active dot
     */
    function updateSlider() {
        // Update slider position
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}