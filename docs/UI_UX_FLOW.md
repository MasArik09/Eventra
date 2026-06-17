# UI/UX Flow

# Eventra

Version: 1.0

Last Updated: June 2026

---

# 1. Design Principles

Eventra follows these design principles:

* Clean Interface
* Mobile Responsive
* Minimal Click Navigation
* Consistent User Experience
* Accessible Design
* Fast Information Discovery

---

# 2. User Roles

The platform supports:

* Guest
* Attendee
* Organizer
* Admin

---

# 3. Application Navigation Structure

Guest
│
├── Home
├── Event List
├── Event Detail
├── Login
└── Register

Attendee
│
├── Home
├── Event List
├── Event Detail
├── Booking
├── My Bookings
├── My Tickets
├── Profile
└── Settings

Organizer
│
├── Dashboard
├── My Events
├── Create Event
├── Coupons
├── Participants
├── Analytics
├── Check-In Scanner
└── Profile

Admin
│
├── Dashboard
├── Users
├── Events
├── Reports
└── Settings

---

# 4. Guest User Journey

Goal:

Discover an event and create an account.

Flow:

Landing Page
↓
Browse Events
↓
View Event Detail
↓
Click Book Ticket
↓
Redirect to Login/Register
↓
Account Created
↓
Become Attendee

---

# 5. Attendee User Journey

Goal:

Book an event ticket.

Flow:

Login
↓
Browse Events
↓
View Event Detail
↓
Book Ticket
↓
Apply Coupon
↓
Review Booking
↓
Payment Simulation
↓
Ticket Generated
↓
Email Sent
↓
View Ticket

---

# 6. Organizer User Journey

Goal:

Create and manage events.

Flow:

Activate Organizer Profile
↓
Create Event
↓
Publish Event
↓
Monitor Participants
↓
Manage Coupons
↓
Track Sales
↓
Check-In Attendees

---

# 7. Admin User Journey

Goal:

Maintain platform quality.

Flow:

Login
↓
Dashboard
↓
Review Events
↓
Manage Users
↓
Monitor Statistics

---

# 8. Screen Inventory

Public Screens

* Landing Page
* Event Listing
* Event Detail
* Login
* Register

Attendee Screens

* My Bookings
* Booking Detail
* My Tickets
* Ticket Detail
* Profile

Organizer Screens

* Dashboard
* Event List
* Event Form
* Coupon Management
* Participant List
* Analytics
* QR Scanner

Admin Screens

* Admin Dashboard
* User Management
* Event Moderation

---

# 9. Landing Page Structure

Navbar
↓
Hero Section
↓
Featured Events
↓
Event Categories
↓
Upcoming Events
↓
Footer

---

# 10. Event Listing Page

Components:

* Search Bar
* Category Filter
* Status Filter
* Event Cards
* Pagination

Event Card Information:

* Banner
* Title
* Date
* Location
* Price
* Remaining Seats

---

# 11. Event Detail Page

Sections:

* Event Banner
* Event Information
* Organizer Information
* Ticket Information
* Booking Button

Displayed Information:

* Title
* Description
* Date
* Location
* Capacity
* Remaining Seats
* Price

---

# 12. Booking Flow Screens

Event Detail
↓
Booking Review
↓
Apply Coupon
↓
Booking Summary
↓
Payment Simulation
↓
Booking Success

---

# 13. Payment Simulation Screen

Display:

Booking Information

Buttons:

* Simulate Success
* Simulate Pending
* Simulate Failed

Result:

Update Booking Status

---

# 14. Ticket Screen

Display:

* Ticket Code
* Event Name
* Attendee Name
* QR Code
* Event Date
* Event Location

Actions:

* Download Ticket
* View QR Code

---

# 15. Organizer Dashboard Layout

Sidebar
│
├── Dashboard
├── Events
├── Coupons
├── Participants
├── Analytics
├── Scanner

Main Content

Statistics Cards:

* Total Events
* Total Tickets Sold
* Revenue
* Attendance

---

# 16. Create Event Screen

Fields:

* Event Title
* Description
* Category
* Location Name
* Address
* Event Date
* Capacity
* Ticket Price
* Banner Upload

Buttons:

* Save Draft
* Publish Event

---

# 17. Coupon Management Screen

Table Columns:

* Code
* Discount Type
* Discount Value
* Usage Limit
* Used Count
* Expiration Date
* Status

Actions:

* Create
* Edit
* Delete

---

# 18. Participant Management Screen

Table Columns:

* Ticket Code
* Name
* Email
* Booking Date
* Ticket Status

Actions:

* View
* Export (Future)

---

# 19. QR Scanner Screen

Purpose:

Validate attendee tickets.

Flow:

Open Scanner
↓
Scan QR
↓
Validate Ticket
↓
Show Result

Results:

* Valid
* Already Used
* Invalid

---

# 20. Admin Dashboard Layout

Sidebar
│
├── Dashboard
├── Users
├── Events
├── Reports

Statistics:

* Total Users
* Total Events
* Total Bookings
* Total Revenue

---

# 21. Empty States

Examples:

No Events Found

Message:

"No events available."

---

No Bookings

Message:

"You have not booked any events yet."

---

No Participants

Message:

"No participants registered yet."

---

# 22. Error States

Examples:

401 Unauthorized

Message:

"Please log in to continue."

---

404 Not Found

Message:

"The requested resource could not be found."

---

500 Server Error

Message:

"Something went wrong. Please try again."

---

# 23. Success States

Examples:

Event Created

"Event created successfully."

Booking Success

"Your ticket has been generated."

Coupon Applied

"Discount applied successfully."

Check-In Success

"Attendee checked in successfully."

---

# 24. Responsive Design

Breakpoints:

Mobile
Tablet
Desktop

Priority:

Mobile First Design

---

End of Document
