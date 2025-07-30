# Hospital Management System

## Overview

This is a modern, mobile-responsive Hospital Management System website designed to provide a seamless experience for patients, doctors, and administrators. The system allows patients to book appointments with doctors, view doctor profiles, and receive SMS confirmations. Doctors can manage their schedules and view appointments, while administrators have full control over the system.

## Features

### For Patients
- Browse doctor profiles and specialties
- Book appointments with preferred doctors
- View available time slots
- Receive SMS confirmation for bookings
- Mobile-friendly interface

### For Doctors
- Secure login system
- View daily appointments
- Mark availability/unavailability
- Manage profile information

### For Administrators
- Add/remove doctors
- Set or override doctor schedules
- View and manage all appointments
- System monitoring

## Pages

1. **Home Page** - Main landing page with hero section, categories, offers, and why choose us sections
2. **Appointment Page** - Form to book appointments with doctors
3. **Doctors Page** - Directory of all doctors with filtering options
4. **Login Page** - Combined login for doctors and administrators
5. **Doctor Dashboard** - Interface for doctors to manage their schedule and appointments
6. **Admin Dashboard** - Interface for administrators to manage the entire system

## Project Structure

```
Hospital/
├── index.html              # Home page
├── appointment.html        # Appointment booking page
├── doctors.html            # Doctors directory page
├── login.html              # Login page for doctors and admins
├── doctor-dashboard.html   # Dashboard for doctors
├── admin-dashboard.html    # Dashboard for administrators
├── styles/
│   ├── main.css            # Main stylesheet for public pages
│   └── dashboard.css       # Stylesheet for dashboard pages
├── js/
│   ├── main.js             # Main JavaScript for public pages
│   └── dashboard.js        # JavaScript for dashboard functionality
└── images/
    ├── hospital-logo.svg   # Hospital logo
    ├── doctor-avatar.svg   # Default doctor avatar
    ├── patient-avatar.svg  # Default patient avatar
    ├── admin-avatar.svg    # Default admin avatar
    ├── hero-illustration.svg # Hero section illustration
    └── why-choose-us.svg   # Why Choose Us section illustration
```

## How to Run

This is a static website that can be run directly in a web browser without any server-side requirements. Simply open the `index.html` file in a web browser to view the website.

For a more production-like environment, you can use a local server:

### Using Python

```bash
# Python 3.x
python -m http.server

# Python 2.x
python -m SimpleHTTPServer
```

Then open `http://localhost:8000` in your web browser.

### Using Node.js

Install `http-server` globally:

```bash
npm install -g http-server
```

Then run:

```bash
http-server
```

And open `http://localhost:8080` in your web browser.

## Future Enhancements

1. **Backend Integration** - Connect to a backend server for real data storage and retrieval
2. **User Authentication** - Implement secure authentication for patients, doctors, and administrators
3. **SMS Integration** - Integrate with SMS API for real notification delivery
4. **Payment Gateway** - Add payment processing for appointment bookings
5. **Electronic Health Records** - Implement EHR system for patient medical history
6. **Telemedicine** - Add video consultation capabilities

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- SVG for illustrations
- Responsive design principles

## Design Principles

- **Mobile-First Approach** - Designed to work seamlessly on all devices
- **Clean Healthcare Theme** - Using blue, green, and white color scheme
- **Accessibility** - Following web accessibility guidelines
- **User-Centered Design** - Focused on providing the best user experience

## License

This project is licensed under the MIT License - see the LICENSE file for details.