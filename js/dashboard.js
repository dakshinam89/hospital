// Dashboard JavaScript for Hospital Management System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dashboard components
    initSidebar();
    initUserDropdown();
    initAvailabilityToggles();
    initTimeSlots();
    initAppointmentActions();
    initLogoutConfirmation();
    initDoctorForm();
    initCharts();
});

// Sidebar Toggle
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebarToggle || !sidebar) return;
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        if (mainContent) {
            mainContent.style.marginLeft = sidebar.classList.contains('collapsed') ? 
                'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
        }
    });
    
    // Mobile sidebar toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-show');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) && 
                sidebar.classList.contains('mobile-show')) {
                sidebar.classList.remove('mobile-show');
            }
        });
    }
}

// User Dropdown
function initUserDropdown() {
    const userDropdownToggle = document.querySelector('.user-dropdown-toggle');
    const userDropdownMenu = document.querySelector('.user-dropdown-menu');
    
    if (!userDropdownToggle || !userDropdownMenu) return;
    
    userDropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdownMenu.classList.toggle('show');
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userDropdownToggle.contains(e.target) && !userDropdownMenu.contains(e.target)) {
            userDropdownMenu.classList.remove('show');
            const icon = userDropdownToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-chevron-down');
                icon.classList.remove('fa-chevron-up');
            }
        }
    });
}

// Doctor Availability Toggles
function initAvailabilityToggles() {
    const availabilityToggles = document.querySelectorAll('.day-label .toggle input');
    
    if (!availabilityToggles.length) return;
    
    availabilityToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const dayContainer = this.closest('.availability-day');
            const timeSlots = dayContainer.querySelector('.time-slots');
            
            if (timeSlots) {
                timeSlots.style.display = this.checked ? 'flex' : 'none';
            }
            
            // In a real application, you would send this update to the server
            console.log(`Availability for ${dayContainer.querySelector('.day-name').textContent} set to ${this.checked ? 'available' : 'unavailable'}`);
        });
        
        // Initialize time slots visibility based on toggle state
        const dayContainer = toggle.closest('.availability-day');
        const timeSlots = dayContainer.querySelector('.time-slots');
        if (timeSlots) {
            timeSlots.style.display = toggle.checked ? 'flex' : 'none';
        }
    });
}

// Time Slots Selection
function initTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    if (!timeSlots.length) return;
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // In a real application, you would send this update to the server
            const dayName = this.closest('.availability-day').querySelector('.day-name').textContent;
            const time = this.textContent.trim();
            const isActive = this.classList.contains('active');
            console.log(`Time slot ${time} on ${dayName} set to ${isActive ? 'active' : 'inactive'}`);
        });
    });
}

// Appointment Actions
function initAppointmentActions() {
    const viewButtons = document.querySelectorAll('.action-btn.view');
    const editButtons = document.querySelectorAll('.action-btn.edit');
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    // View appointment details
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const appointmentId = this.closest('tr').getAttribute('data-id');
            // In a real application, you would fetch appointment details and show them
            console.log(`Viewing appointment ${appointmentId}`);
            
            // Show appointment details modal
            const modal = document.getElementById('view-appointment-modal');
            if (modal) {
                // Populate modal with appointment details (simulated)
                const appointmentRow = this.closest('tr');
                const patientName = appointmentRow.querySelector('.patient-name').textContent;
                const appointmentDate = appointmentRow.querySelector('td:nth-child(3)').textContent;
                const appointmentTime = appointmentRow.querySelector('td:nth-child(4)').textContent;
                const appointmentStatus = appointmentRow.querySelector('.appointment-status').textContent;
                
                modal.querySelector('#view-patient-name').textContent = patientName;
                modal.querySelector('#view-appointment-date').textContent = appointmentDate;
                modal.querySelector('#view-appointment-time').textContent = appointmentTime;
                modal.querySelector('#view-appointment-status').textContent = appointmentStatus;
                
                modal.classList.add('show');
            }
        });
    });
    
    // Edit appointment
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const appointmentId = this.closest('tr').getAttribute('data-id');
            // In a real application, you would fetch appointment details and populate the edit form
            console.log(`Editing appointment ${appointmentId}`);
            
            // Show edit appointment modal
            const modal = document.getElementById('edit-appointment-modal');
            if (modal) {
                // Populate modal with appointment details (simulated)
                const appointmentRow = this.closest('tr');
                const patientName = appointmentRow.querySelector('.patient-name').textContent;
                const appointmentDate = appointmentRow.querySelector('td:nth-child(3)').textContent;
                const appointmentTime = appointmentRow.querySelector('td:nth-child(4)').textContent;
                const appointmentStatus = appointmentRow.querySelector('.appointment-status').textContent;
                
                modal.querySelector('#edit-patient-name').value = patientName;
                
                // Convert date to YYYY-MM-DD format for input
                const dateParts = appointmentDate.split('/');
                if (dateParts.length === 3) {
                    const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
                    modal.querySelector('#edit-appointment-date').value = formattedDate;
                }
                
                modal.querySelector('#edit-appointment-time').value = appointmentTime;
                
                // Set status dropdown
                const statusSelect = modal.querySelector('#edit-appointment-status');
                for (let i = 0; i < statusSelect.options.length; i++) {
                    if (statusSelect.options[i].text === appointmentStatus) {
                        statusSelect.selectedIndex = i;
                        break;
                    }
                }
                
                modal.classList.add('show');
            }
        });
    });
    
    // Delete appointment
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const appointmentId = this.closest('tr').getAttribute('data-id');
            // In a real application, you would show a confirmation dialog
            console.log(`Deleting appointment ${appointmentId}`);
            
            // Show delete confirmation modal
            const modal = document.getElementById('delete-appointment-modal');
            if (modal) {
                const appointmentRow = this.closest('tr');
                const patientName = appointmentRow.querySelector('.patient-name').textContent;
                
                modal.querySelector('#delete-patient-name').textContent = patientName;
                
                // Set appointment ID for delete confirmation
                const confirmDeleteBtn = modal.querySelector('#confirm-delete-btn');
                confirmDeleteBtn.setAttribute('data-id', appointmentId);
                
                modal.classList.add('show');
            }
        });
    });
    
    // Handle delete confirmation
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const appointmentId = this.getAttribute('data-id');
            // In a real application, you would send a delete request to the server
            console.log(`Confirmed deletion of appointment ${appointmentId}`);
            
            // Remove the appointment row from the table
            const appointmentRow = document.querySelector(`tr[data-id="${appointmentId}"]`);
            if (appointmentRow) {
                appointmentRow.remove();
            }
            
            // Close the modal
            const modal = document.getElementById('delete-appointment-modal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    }
}

// Logout Confirmation
function initLogoutConfirmation() {
    const logoutBtn = document.querySelector('.logout-btn');
    const logoutModal = document.getElementById('logout-modal');
    const confirmLogoutBtn = document.getElementById('confirm-logout-btn');
    const cancelLogoutBtn = document.getElementById('cancel-logout-btn');
    
    if (!logoutBtn || !logoutModal) return;
    
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logoutModal.classList.add('show');
    });
    
    if (cancelLogoutBtn) {
        cancelLogoutBtn.addEventListener('click', function() {
            logoutModal.classList.remove('show');
        });
    }
    
    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', function() {
            // In a real application, you would perform logout actions
            console.log('Logging out...');
            window.location.href = 'login.html';
        });
    }
    
    // Close modal when clicking outside
    logoutModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
}

// Add Doctor Form
function initDoctorForm() {
    const addDoctorForm = document.getElementById('add-doctor-form');
    
    if (!addDoctorForm) return;
    
    addDoctorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('doctor-name').value;
        const specialty = document.getElementById('doctor-specialty').value;
        const email = document.getElementById('doctor-email').value;
        const phone = document.getElementById('doctor-phone').value;
        
        if (!name || !specialty || !email || !phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real application, you would send this data to the server
        console.log('Adding new doctor:', { name, specialty, email, phone });
        
        // Show success message
        alert('Doctor added successfully!');
        
        // Reset form
        this.reset();
    });
}

// Charts for Dashboard
function initCharts() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not loaded. Charts will not be rendered.');
        return;
    }
    
    // Appointments Chart
    const appointmentsChartEl = document.getElementById('appointments-chart');
    if (appointmentsChartEl) {
        new Chart(appointmentsChartEl, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Appointments',
                    data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 90],
                    fill: false,
                    borderColor: '#1a73e8',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Patients by Department Chart
    const departmentChartEl = document.getElementById('department-chart');
    if (departmentChartEl) {
        new Chart(departmentChartEl, {
            type: 'doughnut',
            data: {
                labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Other'],
                datasets: [{
                    data: [25, 20, 15, 18, 12, 10],
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#fbbc04',
                        '#ea4335',
                        '#9c27b0',
                        '#607d8b'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Revenue Chart
    const revenueChartEl = document.getElementById('revenue-chart');
    if (revenueChartEl) {
        new Chart(revenueChartEl, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 17000, 22000, 25000],
                    backgroundColor: '#34a853'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
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