# Task Breakdown

# Eventra

Version: 1.0

Last Updated: June 2026

---

# Overview

This document defines the implementation roadmap for Eventra.

Development Strategy:

* Feature-based development
* Backend-first approach
* Incremental delivery
* Test-driven mindset
* Clean Architecture

---

# PHASE 0 — Project Foundation

Goal:

Prepare project structure and development environment.

## Backend Tasks

* Create Django project
* Configure PostgreSQL
* Configure environment variables
* Configure DRF
* Configure JWT Authentication
* Configure CORS
* Configure media storage
* Configure static files

## Frontend Tasks

* Create React project using Vite
* Configure TypeScript
* Configure TailwindCSS
* Configure React Router
* Configure TanStack Query
* Configure Axios
* Configure ESLint
* Configure Prettier

## Documentation Tasks

* Setup README
* Create contribution guidelines
* Define coding standards

Deliverables:

* Backend boots successfully
* Frontend boots successfully
* Database connected

---

# PHASE 1 — Authentication System

Goal:

Implement user authentication.

## Backend

### Accounts App

* User model
* Profile model
* JWT login
* JWT refresh
* Registration endpoint
* Profile endpoint

### Tests

* Registration test
* Login test
* Authentication test

## Frontend

### Auth Pages

* Login page
* Register page

### Features

* Login form
* Register form
* Protected routes
* Token storage
* Auto logout

Deliverables:

* Users can register
* Users can login
* Protected pages work

---

# PHASE 2 — Event Categories

Goal:

Manage event classifications.

## Backend

### Categories App

* Category model
* CRUD endpoints
* Seed categories

### Default Categories

* Seminar
* Workshop
* Competition
* Webinar
* Conference

## Frontend

* Category selector
* Category filter

Deliverables:

* Categories available system-wide

---

# PHASE 3 — Event Management

Goal:

Allow organizers to manage events.

## Backend

### Events App

* Event model
* Event CRUD
* Publish event
* Cancel event
* Event validation

### Uploads

* Event banner upload

### Tests

* Create event
* Update event
* Delete event

## Frontend

### Pages

* Event list
* Event detail
* Create event
* Edit event

### Components

* Event form
* Event card
* Event table

Deliverables:

* Organizers can manage events

---

# PHASE 4 — Event Discovery

Goal:

Allow users to find events.

## Backend

* Search endpoint
* Filter endpoint
* Pagination

## Frontend

### Features

* Search bar
* Filters
* Pagination

Deliverables:

* Users can browse events efficiently

---

# PHASE 5 — Booking System

Goal:

Allow attendees to reserve tickets.

## Backend

### Bookings App

* Booking model
* Capacity validation
* Booking creation
* Booking cancellation

### Tests

* Capacity limit test
* Booking creation test

## Frontend

### Pages

* Booking review
* Booking history

### Components

* Booking summary
* Booking card

Deliverables:

* Ticket reservation works

---

# PHASE 6 — Coupon System

Goal:

Support event promotions.

## Backend

### Coupons App

* Coupon model
* Coupon CRUD
* Coupon validation
* Usage tracking

### Tests

* Expired coupon
* Usage limit
* Discount calculation

## Frontend

### Pages

* Coupon management

### Components

* Coupon form
* Coupon table

Deliverables:

* Discount system operational

---

# PHASE 7 — Payment Simulation

Goal:

Simulate ticket payments.

## Backend

### Payments App

* Payment model
* Payment status update
* Payment validation

### Statuses

* Success
* Pending
* Failed

## Frontend

### Payment Page

Actions:

* Simulate Success
* Simulate Pending
* Simulate Failed

Deliverables:

* Booking-payment workflow completed

---

# PHASE 8 — Ticket Generation

Goal:

Generate digital tickets.

## Backend

### Tickets App

* Ticket model
* Ticket code generation
* QR code generation
* Ticket status tracking

### Libraries

* qrcode
* Pillow

### Tests

* Ticket generation
* QR generation

## Frontend

### Ticket Pages

* My tickets
* Ticket detail

Deliverables:

* Tickets generated automatically

---

# PHASE 9 — Email Delivery

Goal:

Send tickets through email.

## Backend

### Notifications Module

* Email templates
* Ticket attachment
* Email delivery service

### Tests

* Email sent successfully

## Frontend

### UX

* Email delivery notification

Deliverables:

* Ticket emails delivered

---

# PHASE 10 — Organizer Dashboard

Goal:

Provide organizer insights.

## Backend

### Analytics App

* Ticket statistics
* Attendance statistics
* Revenue statistics

## Frontend

### Dashboard Pages

* Summary
* Participants
* Analytics

### Components

* Statistic cards
* Participant table

Deliverables:

* Organizer dashboard functional

---

# PHASE 11 — QR Check-In System

Goal:

Validate attendee tickets.

## Backend

### Check-In Logic

* Ticket validation
* Check-in creation
* Duplicate prevention

### Tests

* Valid ticket
* Invalid ticket
* Used ticket

## Frontend

### Scanner Page

* QR scanner
* Validation result

Deliverables:

* Check-in workflow complete

---

# PHASE 12 — Admin Panel

Goal:

Manage platform resources.

## Backend

### Admin Features

* User management
* Event moderation
* Dashboard statistics

## Frontend

### Admin Pages

* Users
* Events
* Reports

Deliverables:

* Admin panel operational

---

# PHASE 13 — Audit Logging

Goal:

Track critical system actions.

## Backend

### Audit Logs App

Track:

* Login
* Event creation
* Event update
* Booking creation
* Ticket generation
* Check-in

## Frontend

### Admin

* Log viewer

Deliverables:

* System activity traceability

---

# PHASE 14 — Testing & Hardening

Goal:

Improve reliability and quality.

## Backend

* Unit tests
* Integration tests
* API tests

## Frontend

* Component tests
* Route tests

## Security

* Permission review
* Input validation review

Deliverables:

* Stable MVP

---

# PHASE 15 — Documentation & Release

Goal:

Prepare repository for public release.

## Documentation

* Final README
* API examples
* ERD diagram
* Screenshots

## Repository

* License
* GitHub Topics
* Issue Templates

Deliverables:

* Portfolio-ready repository

---

# MVP Completion Checklist

Authentication

* [ ] Register
* [ ] Login
* [ ] Logout

Event Management

* [ ] Create Event
* [ ] Update Event
* [ ] Delete Event

Booking

* [ ] Book Ticket
* [ ] Cancel Booking

Coupons

* [ ] Create Coupon
* [ ] Apply Coupon

Payments

* [ ] Success
* [ ] Pending
* [ ] Failed

Tickets

* [ ] Generate QR
* [ ] Download Ticket

Dashboard

* [ ] Statistics
* [ ] Participants

Check-In

* [ ] Validate Ticket
* [ ] Attendance Tracking

Admin

* [ ] User Management
* [ ] Event Moderation

---

End of Document
