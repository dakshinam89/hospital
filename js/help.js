/**
 * Help Center JavaScript
 * Handles search functionality and topic navigation for the help center
 */

document.addEventListener('DOMContentLoaded', function() {
    initHelpSearch();
    initTopicNavigation();
});

/**
 * Initialize the help center search functionality
 */
function initHelpSearch() {
    const searchInput = document.getElementById('helpSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        searchHelpContent(searchTerm);
    });

    // Clear search when ESC key is pressed
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            searchHelpContent('');
        }
    });
}

/**
 * Search through help content based on search term
 * @param {string} searchTerm - The term to search for
 */
function searchHelpContent(searchTerm) {
    const helpSections = document.querySelectorAll('.help-section');
    const helpArticles = document.querySelectorAll('.help-article');
    let resultsFound = false;

    if (!searchTerm) {
        // If search is empty, show all sections and articles
        helpSections.forEach(section => section.style.display = 'block');
        helpArticles.forEach(article => article.style.display = 'block');
        removeNoResultsMessage();
        return;
    }

    // First hide all sections
    helpSections.forEach(section => section.style.display = 'none');

    // Check each article for matches
    helpArticles.forEach(article => {
        const articleText = article.textContent.toLowerCase();
        const articleTitle = article.querySelector('h3').textContent.toLowerCase();
        
        if (articleText.includes(searchTerm) || articleTitle.includes(searchTerm)) {
            article.style.display = 'block';
            // Show the parent section
            const parentSection = article.closest('.help-section');
            if (parentSection) {
                parentSection.style.display = 'block';
            }
            resultsFound = true;
        } else {
            article.style.display = 'none';
        }
    });

    // Show no results message if needed
    if (!resultsFound) {
        showNoResultsMessage(searchTerm);
    } else {
        removeNoResultsMessage();
    }
}

/**
 * Display a message when no search results are found
 * @param {string} searchTerm - The term that was searched
 */
function showNoResultsMessage(searchTerm) {
    removeNoResultsMessage(); // Remove any existing message first
    
    const helpContent = document.querySelector('.help-content');
    if (!helpContent) return;
    
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = 'no-results-message';
    noResultsDiv.innerHTML = `
        <div class="no-results-icon">
            <i class="fas fa-search"></i>
        </div>
        <h3>No results found for "${searchTerm}"</h3>
        <p>Try using different keywords or check out our popular topics.</p>
        <div class="popular-topics-inline">
            <a href="#appointments" class="topic-tag">Appointments</a>
            <a href="#insurance" class="topic-tag">Insurance</a>
            <a href="#billing" class="topic-tag">Billing</a>
            <a href="#medical-records" class="topic-tag">Medical Records</a>
        </div>
    `;
    
    helpContent.prepend(noResultsDiv);

    // Add event listeners to the topic tags
    const topicTags = noResultsDiv.querySelectorAll('.topic-tag');
    topicTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById('helpSearch').value = '';
            searchHelpContent('');
            scrollToSection(targetId);
        });
    });
}

/**
 * Remove the no results message if it exists
 */
function removeNoResultsMessage() {
    const noResultsMessage = document.querySelector('.no-results-message');
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

/**
 * Initialize topic navigation functionality
 */
function initTopicNavigation() {
    // Add smooth scrolling to topic tags and category cards
    const topicLinks = document.querySelectorAll('.topic-tag, .category-card');
    
    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Handle hash changes for direct links
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            scrollToSection(hash);
        }
    });

    // Check for hash on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSection(hash);
        }, 500); // Small delay to ensure page is fully loaded
    }
}

/**
 * Scroll to a specific section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Show all sections first (in case they were hidden by search)
    const helpSections = document.querySelectorAll('.help-section');
    helpSections.forEach(section => section.style.display = 'block');
    
    // Show all articles
    const helpArticles = document.querySelectorAll('.help-article');
    helpArticles.forEach(article => article.style.display = 'block');
    
    // Scroll to the section with offset for header
    const headerHeight = document.querySelector('.header').offsetHeight;
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: sectionPosition - headerHeight - 20, // 20px extra padding
        behavior: 'smooth'
    });
    
    // Highlight the section briefly
    section.classList.add('highlight-section');
    setTimeout(() => {
        section.classList.remove('highlight-section');
    }, 2000);
}