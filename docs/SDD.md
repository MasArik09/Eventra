# Software Design Document (SDD)

# Eventra

Version: 1.0

Status: Draft

Last Updated: June 2026

---

# 1. System Overview

Eventra is a full-stack event management and digital ticketing platform.

The system consists of:

* Frontend Application
* Backend API
* PostgreSQL Database
* QR Generation Service
* Email Service

Architecture Style:

* Client-Server Architecture
* REST API
* Feature-Based Modular Design
* Separation of Concerns

---

# 2. High-Level Architecture

┌─────────────────────┐
│ React Frontend │
└──────────┬──────────┘
│
REST API
│
┌──────────▼──────────┐
│ Django REST API │
└──────────┬──────────┘
│
┌──────────▼──────────┐
│ PostgreSQL │
└─────────────────────┘

Supporting Services:

* QR Code Generator
* Email Delivery Service

---

# 3. Technology Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* React Router
* TanStack Query
* React Hook Form
* Zod

---

## Backend

* Django
* Django REST Framework
* Simple JWT

---

## Database

* PostgreSQL

---

## Utilities

* qrcode
* Pillow

---

# 4. Frontend Architecture

Architecture Pattern:

Feature-Based Structure

---

frontend/src

app/
├── router/
├── providers/

features/
├── auth/
├── events/
├── bookings/
├── coupons/
├── tickets/
├── dashboard/
├── admin/

shared/
├── api/
├── components/
├── hooks/
├── lib/
├── types/
├── utils/

pages/

---

# 5. Frontend Module Design

## Auth Module

Responsibilities:

* Login
* Register
* Logout
* Token Handling

Components:

* LoginForm
* RegisterForm
* ProtectedRoute

---

## Event Module

Responsibilities:

* Event Listing
* Event Detail
* Event CRUD

Components:

* EventCard
* EventForm
* EventTable

---

## Booking Module

Responsibilities:

* Ticket Booking
* Booking History

Components:

* BookingForm
* BookingHistoryTable

---

## Coupon Module

Responsibilities:

* Apply Coupon
* Coupon Management

---

## Ticket Module

Responsibilities:

* View Ticket
* Download Ticket
* QR Display

---

## Dashboard Module

Responsibilities:

* Statistics
* Participant List

---

# 6. Backend Architecture

Architecture Pattern:

Modular Monolith

Reason:

* Easier maintenance
* Clear separation
* Suitable for portfolio projects
* Easy future migration to microservices

---

backend/apps

accounts/
events/
bookings/
payments/
tickets/
coupons/
analytics/
audit_logs/

---

# 7. Backend Layer Design

Each module follows:

Controller Layer
↓
Service Layer
↓
Repository Layer
↓
Database

---

Example:

EventViewSet
↓
EventService
↓
EventRepository
↓
Event Model

---

# 8. Django Application Structure

events/

api/
services/
repositories/
selectors/
models/
serializers/
permissions/
tests/

---

Example:

events/

api/
├── views.py
├── urls.py

services/
├── create_event.py
├── update_event.py

repositories/
├── event_repository.py

selectors/
├── event_selector.py

models/
├── event.py

serializers/
├── event_serializer.py

permissions/
├── event_permission.py

tests/

---

# 9. Authentication Design

Authentication Method:

JWT

Library:

Simple JWT

Flow:

User Login
↓
Access Token
↓
Refresh Token
↓
Authenticated Requests

---

Protected Routes:

* Create Event
* Book Ticket
* Dashboard
* Ticket Download

---

# 10. Authorization Design

Role Types:

* Attendee
* Organizer
* Admin

Authorization Strategy:

Role-Based Access Control (RBAC)

---

Examples:

Attendee

Can:

* Book Ticket
* Download Ticket

Cannot:

* Create Event

---

Organizer

Can:

* Create Event
* Manage Coupons
* Scan Tickets

---

Admin

Can:

* Manage Platform

---

# 11. Event Creation Flow

Organizer
↓
Submit Event Form
↓
Frontend Validation
↓
API Request
↓
Serializer Validation
↓
Event Service
↓
Database
↓
Success Response

---

# 12. Booking Flow

Attendee
↓
Select Event
↓
Book Ticket
↓
Capacity Validation
↓
Booking Created
↓
Pending Payment

---

# 13. Coupon Flow

User Enters Coupon
↓
Coupon Validation
↓
Discount Calculation
↓
Booking Updated

---

# 14. Payment Flow

Booking
↓
Pending Payment
↓
Dummy Gateway

Success
↓
Generate Ticket

Pending
↓
Waiting

Failed
↓
Booking Failed

---

# 15. Ticket Generation Flow

Payment Success
↓
Generate Ticket Code
↓
Generate QR Code
↓
Save Ticket
↓
Send Email
↓
Ticket Available

---

# 16. QR Validation Flow

Organizer
↓
Scan QR
↓
Lookup Ticket
↓
Validate Status

Unused
↓
Check In

Used
↓
Reject

Invalid
↓
Reject

---

# 17. Email Delivery Flow

Ticket Generated
↓
Build Email
↓
Attach Ticket
↓
Send Email
↓
Delivery Result

---

# 18. Error Handling Strategy

API Response Format

Success:

{
"success": true,
"data": {}
}

Error:

{
"success": false,
"message": "Error message"
}

---

Validation Errors:

HTTP 400

Authentication Errors:

HTTP 401

Authorization Errors:

HTTP 403

Not Found:

HTTP 404

Server Error:

HTTP 500

---

# 19. Security Design

Security Measures:

* Password Hashing
* JWT Authentication
* Role Validation
* Input Validation
* SQL Injection Protection
* XSS Protection
* CSRF Protection

---

# 20. Logging Strategy

Log Types:

* Authentication Logs
* Event Logs
* Booking Logs
* Payment Logs
* Ticket Logs

Stored In:

audit_logs

---

# 21. Testing Strategy

Backend

* Unit Tests
* Integration Tests
* API Tests

Frontend

* Component Tests
* Page Tests

---

Coverage Goal

Minimum 80%

---

# 22. Scalability Considerations

Future Improvements:

* Redis Caching
* Celery Background Jobs
* Cloud Storage
* Payment Gateway Integration
* Recommendation Engine

---

# 23. Deployment Considerations

Not included in v1.0

Future Possibilities:

* VPS Deployment
* CI/CD Pipeline
* Containerization
* Cloud Hosting

---

End of Document
