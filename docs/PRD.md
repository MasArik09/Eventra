# Product Requirements Document (PRD)

# Eventra

Version: 1.0

Status: Draft

Last Updated: June 2026

---

# 1. Product Overview

## Product Name

Eventra

## Tagline

Create Events. Book Tickets. Manage Everything.

## Product Description

Eventra is a full-stack event management and digital ticketing platform that enables organizers to create and manage events while allowing attendees to discover events, book tickets, apply promotional coupons, receive QR-code-based electronic tickets, and check in through a digital verification system.

The platform supports both free and paid events through a simulated payment workflow and focuses on providing a modern event management experience.

---

# 2. Problem Statement

Many event organizers, especially small communities, student organizations, and independent organizers, struggle to manage event registration and attendance efficiently.

Common issues include:

* Manual participant registration
* Spreadsheet-based attendee management
* Lack of digital ticket verification
* Difficulty managing promotional campaigns
* Inefficient attendance tracking
* Lack of centralized event management tools

Eventra aims to solve these problems through a centralized digital platform.

---

# 3. Vision Statement

To provide a modern, scalable, and user-friendly platform for creating, managing, and attending events through seamless digital ticketing and attendance management.

---

# 4. Product Goals

## Business Goals

* Provide a complete event management workflow
* Simplify event registration and attendance processes
* Demonstrate a production-style portfolio project architecture
* Showcase full-stack engineering capabilities

## User Goals

### For Attendees

* Easily discover events
* Quickly register for events
* Receive digital tickets instantly
* Check event participation status

### For Organizers

* Create and manage events efficiently
* Track ticket sales and attendance
* Validate participants using QR codes
* Manage promotional campaigns

### For Administrators

* Monitor platform activities
* Moderate event content
* Manage platform users

---

# 5. Target Users

## Attendee

People who want to join events.

Examples:

* Students
* Professionals
* Community members
* General public

---

## Organizer

People who create and manage events.

Examples:

* Student organizations
* Event organizers
* Communities
* Educational institutions

---

## Administrator

Platform managers responsible for moderation and oversight.

---

# 6. User Roles

## Guest

Permissions:

* Browse events
* Search events
* View event details
* Register account

---

## Attendee

Permissions:

* Book tickets
* Apply coupons
* View booking history
* Download tickets
* Manage profile

---

## Organizer

Permissions:

* Create events
* Edit events
* Delete events
* Publish events
* Manage coupons
* View participants
* Validate tickets
* Access organizer dashboard

---

## Admin

Permissions:

* Manage users
* Manage events
* View platform statistics
* Moderate content

---

# 7. Scope

## In Scope (MVP)

### Authentication

* User registration
* User login
* User logout
* JWT authentication
* Profile management

### Event Management

* Create event
* Edit event
* Delete event
* Publish event
* Cancel event

### Event Discovery

* Browse events
* Search events
* Filter events
* View event details

### Booking System

* Book ticket
* Capacity validation
* Booking history

### Coupon System

* Percentage discount
* Fixed amount discount
* Coupon expiration
* Usage limit

### Payment Simulation

* Successful payment
* Failed payment
* Pending payment

### Ticket System

* QR code generation
* Ticket download
* Email ticket delivery

### Organizer Dashboard

* Participant management
* Ticket sales monitoring
* Event statistics

### Check-In System

* QR ticket validation
* Attendance tracking

### Admin Panel

* User management
* Event moderation

---

## Out of Scope

* Real payment gateway integration
* Refund management
* Recommendation engine
* Mobile applications
* Team-based organizer management
* Live chat functionality
* Multi-ticket booking

---

# 8. User Stories

## Attendee

As an attendee, I want to browse available events so that I can find events that interest me.

As an attendee, I want to book an event ticket so that I can attend the event.

As an attendee, I want to receive a QR-code ticket so that I can check in quickly at the venue.

---

## Organizer

As an organizer, I want to create events so that participants can register.

As an organizer, I want to manage coupons so that I can run promotional campaigns.

As an organizer, I want to validate tickets using QR codes so that attendance can be tracked efficiently.

---

## Admin

As an admin, I want to moderate events so that platform content remains appropriate.

---

# 9. Business Rules

## Event Capacity

Event bookings cannot exceed available capacity.

---

## Free Events

Events with ticket price equal to zero bypass payment processing.

---

## Paid Events

Events with ticket price greater than zero require payment completion before ticket generation.

---

## Coupon Validation

Coupons must:

* Be active
* Not be expired
* Not exceed usage limits

---

## Ticket Usage

Each ticket may only be used once.

---

# 10. Success Metrics

## User Metrics

* Successful registrations
* Successful bookings
* Successful check-ins

## System Metrics

* Ticket generation success rate
* QR validation success rate
* Event creation success rate

## Project Metrics

* Complete documentation
* Clean architecture implementation
* Full test coverage for core modules

---

# 11. Risks and Assumptions

## Risks

* Email delivery failures
* QR code duplication attempts
* Invalid coupon usage
* Booking race conditions

## Assumptions

* Users have internet access
* Email services are available
* PostgreSQL database is operational

---

# 12. Future Enhancements

* Real payment gateway integration
* Wishlist feature
* Event reviews and ratings
* Recommendation engine
* Push notifications
* Mobile application
* Advanced analytics dashboard

---

# 13. Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query

## Backend

* Django
* Django REST Framework
* Simple JWT

## Database

* PostgreSQL

## Additional Services

* QR Code Generator
* Email Service
* Dummy Payment Simulator

---

# 14. Project Architecture

Frontend and backend are developed as separate applications.

Frontend communicates with backend through REST APIs.

Architecture Style:

Frontend (React SPA)
↓
REST API
↓
Django REST Framework
↓
PostgreSQL

---

# 15. Release Plan

## Version 1.0

* Authentication
* Event Management
* Booking System
* Coupon System
* Payment Simulation
* QR Ticketing
* Check-In System
* Organizer Dashboard
* Admin Panel

End of Document
