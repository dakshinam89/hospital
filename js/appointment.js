// Appointment Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    initAppointmentForm();
});

function initAppointmentForm() {
    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');
    const dateInput = document.getElementById('appointmentDate');
    const timeSelect = document.getElementById('appointmentTime');
    const appointmentForm = document.getElementById('appointmentForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeModal = document.getElementById('closeModal');
    const closeModalX = document.querySelector('.close-modal');
    
    // Initialize date picker
    if (dateInput) {
        flatpickr(dateInput, {
            minDate: "today",
            dateFormat: "Y-m-d",
            disable: [function(date) {
                // Disable weekends (0 is Sunday, 6 is Saturday)
                return (date.getDay() === 0 || date.getDay() === 6);
            }],
            onChange: function(selectedDates, dateStr) {
                // Enable time selection once date is selected
                if (timeSelect) {
                    timeSelect.disabled = false;
                    populateTimeSlots(doctorSelect.value, dateStr);
                }
            }
        });
    }
    
    // Handle specialty change
    if (specialtySelect) {
        specialtySelect.addEventListener('change', function() {
            const specialty = this.value;
            
            // Reset and disable dependent fields
            if (doctorSelect) {
                doctorSelect.innerHTML = '<option value="" disabled selected>Select doctor</option>';
                doctorSelect.disabled = !specialty;
            }
            
            if (dateInput) {
                dateInput.value = '';
            }
            
            if (timeSelect) {
                timeSelect.innerHTML = '<option value="" disabled selected>Select time</option>';
                timeSelect.disabled = true;
            }
            
            if (!specialty) return;
            
            // Populate doctors based on specialty
            const doctors = getDoctorsBySpecialty(specialty);
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = doctor.name;
                doctorSelect.appendChild(option);
            });
        });
    }
    
    // Handle doctor selection
    if (doctorSelect) {
        doctorSelect.addEventListener('change', function() {
            const doctorId = this.value;
            
            // Reset date and time
            if (dateInput) {
                dateInput.value = '';
            }
            
            if (timeSelect) {
                timeSelect.innerHTML = '<option value="" disabled selected>Select time</option>';
                timeSelect.disabled = true;
            }
        });
    }
    
    // Handle form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show confirmation modal
            if (confirmationModal) {
                const doctorName = doctorSelect.options[doctorSelect.selectedIndex].text;
                const appointmentDate = formatDate(dateInput.value);
                const appointmentTime = timeSelect.value;
                
                // Update confirmation message
                document.getElementById('confirmationMessage').textContent = 
                    `Your appointment with ${doctorName} on ${appointmentDate} at ${appointmentTime} is confirmed.`;
                
                confirmationModal.style.display = 'block';
            }
        });
    }
    
    // Close modal handlers
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            // Reset form after successful submission
            appointmentForm.reset();
            // Reset dependent fields
            doctorSelect.disabled = true;
            timeSelect.disabled = true;
        });
    }
    
    if (closeModalX) {
        closeModalX.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
}

// Helper function to get doctors by specialty
function getDoctorsBySpecialty(specialty) {
    // This would typically be an API call to the server
    // For demo purposes, we'll use mock data
    const doctorsBySpecialty = {
        'cardiology': [
            { id: 'c1', name: 'Dr. John Smith' },
            { id: 'c2', name: 'Dr. Emily Johnson' },
            { id: 'c3', name: 'Dr. Michael Chen' }
        ],
        'general': [
            { id: 'g1', name: 'Dr. Sarah Williams' },
            { id: 'g2', name: 'Dr. David Miller' }
        ],
        'ent': [
            { id: 'e1', name: 'Dr. Robert Davis' },
            { id: 'e2', name: 'Dr. Lisa Thompson' }
        ],
        'neurology': [
            { id: 'n1', name: 'Dr. James Wilson' },
            { id: 'n2', name: 'Dr. Patricia Brown' }
        ],
        'orthopedics': [
            { id: 'o1', name: 'Dr. Thomas Anderson' },
            { id: 'o2', name: 'Dr. Jennifer Martinez' }
        ],
        'ophthalmology': [
            { id: 'op1', name: 'Dr. Richard Taylor' },
            { id: 'op2', name: 'Dr. Elizabeth Lee' }
        ]
    };
    
    return doctorsBySpecialty[specialty] || [];
}

// Helper function to populate time slots
function populateTimeSlots(doctorId, date) {
    const timeSelect = document.getElementById('appointmentTime');
    if (!timeSelect) return;
    
    // Clear existing options
    timeSelect.innerHTML = '<option value="" disabled selected>Select time</option>';
    
    // This would typically be an API call to get available time slots for the doctor on the selected date
    // For demo purposes, we'll use mock data
    const availableTimeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
    ];
    
    // Add time slots to select
    availableTimeSlots.forEach(timeSlot => {
        const option = document.createElement('option');
        option.value = timeSlot;
        option.textContent = timeSlot;
        timeSelect.appendChild(option);
    });
}

// Helper function to format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}