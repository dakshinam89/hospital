// Main JavaScript for Hospital Management System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    // Appointment form is now handled in appointment.js
    initDoctorFilters();
    initLoginTabs();
    initPasswordToggle();
    initUserDropdown();
    initSidebar();
    initModalHandlers();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const loginButtons = document.querySelector('.login-buttons');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            loginButtons.classList.toggle('show');
        });
    }
}

// Appointment Form Handling is now in appointment.js
// The appointment form functionality has been moved to appointment.js
                // Doctor Filters

// Doctor Filters
function initDoctorFilters() {
    // Doctor filtering functionality
    const specialtyFilter = document.getElementById('specialty-filter');
    const searchInput = document.getElementById('doctor-search');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', filterDoctors);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterDoctors);
    }
    
    function filterDoctors() {
        const specialty = specialtyFilter ? specialtyFilter.value : '';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        doctorCards.forEach(card => {
            const doctorSpecialty = card.dataset.specialty;
            const doctorName = card.querySelector('.doctor-name').textContent.toLowerCase();
            
            const matchesSpecialty = !specialty || doctorSpecialty === specialty;
            const matchesSearch = !searchTerm || doctorName.includes(searchTerm);
            
            if (matchesSpecialty && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}
}

// Doctor Filters
function initDoctorFilters() {
    const searchInput = document.getElementById('doctor-search');
    const specialtyFilter = document.getElementById('specialty-filter');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    if (!searchInput && !specialtyFilter) return;
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterDoctors);
    }
    
    // Specialty filter
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', filterDoctors);
    }
    
    function filterDoctors() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const specialty = specialtyFilter ? specialtyFilter.value.toLowerCase() : '';
        
        let hasVisibleCards = false;
        
        doctorCards.forEach(card => {
            const doctorName = card.querySelector('h3').textContent.toLowerCase();
            const doctorSpecialty = card.querySelector('.specialty').textContent.toLowerCase();
            
            const matchesSearch = !searchTerm || doctorName.includes(searchTerm);
            const matchesSpecialty = !specialty || specialty === 'all' || doctorSpecialty.includes(specialty);
            
            if (matchesSearch && matchesSpecialty) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show or hide no results message
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.style.display = hasVisibleCards ? 'none' : 'flex';
        }
    }
}

// Login Tabs
function initLoginTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form-wrapper');
    
    if (!tabBtns.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all forms
            loginForms.forEach(form => form.style.display = 'none');
            
            // Show selected form
            const formId = this.getAttribute('data-form');
            document.getElementById(formId).style.display = 'block';
        });
    });
}

// Password Toggle
function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-password');
    
    if (!toggleBtns.length) return;
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle icon
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    });
}

// User Dropdown in Dashboard
function initUserDropdown() {
    const userDropdownToggle = document.querySelector('.user-dropdown-toggle');
    const userDropdownMenu = document.querySelector('.user-dropdown-menu');
    
    if (!userDropdownToggle || !userDropdownMenu) return;
    
    userDropdownToggle.addEventListener('click', function() {
        userDropdownMenu.classList.toggle('show');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userDropdownToggle.contains(e.target) && !userDropdownMenu.contains(e.target)) {
            userDropdownMenu.classList.remove('show');
            const icon = userDropdownToggle.querySelector('i');
            icon.classList.add('fa-chevron-down');
            icon.classList.remove('fa-chevron-up');
        }
    });
}

// Sidebar Toggle
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebarToggle || !sidebar) return;
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });
    
    // Mobile sidebar toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-show');
        });
    }
}

// Modal Handlers
function initModalHandlers() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    if (!modals.length) return;
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add('show');
        });
    });
    
    // Close modal with close button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.classList.remove('show');
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
}