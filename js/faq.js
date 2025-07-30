/**
 * FAQ Page Functionality
 * This script handles the FAQ page search, filtering, and accordion functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initFaqAccordion();
    initFaqSearch();
    initFaqCategories();
});

/**
 * Initialize the accordion functionality for FAQ items
 */
function initFaqAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (!accordionHeaders.length) return;
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the header
            this.classList.toggle('active');
            
            // Toggle the content visibility
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Initialize the search functionality for FAQ items
 */
function initFaqSearch() {
    const searchInput = document.getElementById('faqSearch');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterFaqItems(searchTerm);
    });
}

/**
 * Filter FAQ items based on search term
 * @param {string} searchTerm - The search term to filter by
 */
function filterFaqItems(searchTerm) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const noResultsMessage = document.getElementById('noResultsMessage') || createNoResultsMessage();
    
    let hasResults = false;
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header span').textContent.toLowerCase();
        const content = item.querySelector('.accordion-content').textContent.toLowerCase();
        
        if (header.includes(searchTerm) || content.includes(searchTerm)) {
            item.style.display = '';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show or hide no results message
    if (hasResults) {
        noResultsMessage.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'block';
    }
    
    // Update visible FAQ groups
    updateFaqGroups();
}

/**
 * Create a "no results" message element
 * @returns {HTMLElement} - The created message element
 */
function createNoResultsMessage() {
    const message = document.createElement('div');
    message.id = 'noResultsMessage';
    message.className = 'no-results';
    message.innerHTML = `
        <i class="fas fa-search"></i>
        <h3>No results found</h3>
        <p>We couldn't find any FAQs matching your search. Please try different keywords or browse by category.</p>
    `;
    message.style.display = 'none';
    
    const faqContainer = document.querySelector('.faq-container');
    faqContainer.appendChild(message);
    
    return message;
}

/**
 * Initialize the category filtering functionality
 */
function initFaqCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    if (!categoryButtons.length) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter by category
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
}

/**
 * Filter FAQ items by category
 * @param {string} category - The category to filter by
 */
function filterByCategory(category) {
    const faqGroups = document.querySelectorAll('.faq-group');
    
    faqGroups.forEach(group => {
        if (category === 'all' || group.dataset.category === category) {
            group.style.display = '';
        } else {
            group.style.display = 'none';
        }
    });
    
    // Reset search
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Show all accordion items in visible groups
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.style.display = '';
    });
    
    // Hide no results message
    const noResultsMessage = document.getElementById('noResultsMessage');
    if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }
}

/**
 * Update FAQ groups visibility based on visible accordion items
 */
function updateFaqGroups() {
    const faqGroups = document.querySelectorAll('.faq-group');
    
    faqGroups.forEach(group => {
        const accordionItems = group.querySelectorAll('.accordion-item');
        let hasVisibleItems = false;
        
        accordionItems.forEach(item => {
            if (item.style.display !== 'none') {
                hasVisibleItems = true;
            }
        });
        
        if (hasVisibleItems) {
            group.style.display = '';
        } else {
            group.style.display = 'none';
        }
    });
}