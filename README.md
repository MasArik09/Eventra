# Eventra

> Create Events. Book Tickets. Manage Everything.

Eventra is a full-stack event management and digital ticketing platform that enables organizers to create and manage events while allowing attendees to discover events, book tickets, apply promotional coupons, receive QR-code-based e-tickets, and check in through a digital verification system.

This project is built as a portfolio-grade application using React, Django REST Framework, and PostgreSQL with a strong focus on clean architecture, maintainability, and scalability.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (RBAC)
* Profile Management

### Event Management

* Create Events
* Edit Events
* Publish Events
* Cancel Events
* Event Categories
* Event Banner Upload

### Event Discovery

* Browse Events
* Search Events
* Filter Events
* Event Details

### Booking System

* Ticket Booking
* Capacity Validation
* Booking History

### Coupon System

* Percentage Discounts
* Fixed Amount Discounts
* Usage Limits
* Expiration Validation

### Payment Simulation

* Success Payment
* Pending Payment
* Failed Payment

### Digital Ticketing

* QR Code Generation
* E-Ticket Download
* Ticket Validation

### Organizer Dashboard

* Participant Management
* Ticket Sales Statistics
* Attendance Tracking

### Admin Panel

* User Management
* Event Moderation
* Platform Statistics

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* React Hook Form
* Zod

### Backend

* Django
* Django REST Framework
* Simple JWT

### Database

* PostgreSQL

### Utilities

* QR Code Generator
* Email Service

---

## Architecture

Frontend and backend are developed as separate applications.

```text
React SPA
    │
    ▼
REST API
    │
    ▼
Django REST Framework
    │
    ▼
PostgreSQL
```

Architecture Style:

* Modular Monolith Backend
* Feature-Based Frontend
* Service + Selector Pattern
* RESTful API

---

## Project Structure

```text
eventra/

├── docs/
│   ├── PRD.md
│   ├── SRS.md
│   ├── ERD.md
│   ├── SDD.md
│   ├── API_SPEC.md
│   ├── UI_UX_FLOW.md
│   ├── TASK_BREAKDOWN.md
│   ├── PROJECT_RULES.md
│   └── ARCHITECTURE_RULES.md
│
├── frontend/
│
├── backend/
│
├── database/
│
├── assets/
│
└── README.md
```

---

## User Roles

### Guest

* Browse Events
* Search Events
* View Event Details

### Attendee

* Book Tickets
* Apply Coupons
* Download Tickets
* View Booking History

### Organizer

* Create Events
* Manage Events
* Manage Coupons
* View Participants
* Scan Tickets

### Admin

* Manage Users
* Moderate Events
* Monitor Platform Statistics

---

## Event Lifecycle

```text
Draft
 ↓
Published
 ↓
Ongoing
 ↓
Completed
```

Alternative:

```text
Draft
 ↓
Published
 ↓
Cancelled
```

---

## Booking Lifecycle

```text
Pending Payment
 ↓
Paid
 ↓
Ticket Generated
```

Alternative:

```text
Pending Payment
 ↓
Failed
```

---

## Ticket Lifecycle

```text
Unused
 ↓
Used
```

Alternative:

```text
Unused
 ↓
Expired
```

---

## Documentation

Project documentation is available in the `docs/` directory.

| Document              | Description                         |
| --------------------- | ----------------------------------- |
| PRD.md                | Product Requirements Document       |
| SRS.md                | Software Requirements Specification |
| ERD.md                | Database Design                     |
| SDD.md                | Software Design Document            |
| API_SPEC.md           | REST API Specification              |
| UI_UX_FLOW.md         | User Journey & Navigation           |
| TASK_BREAKDOWN.md     | Development Roadmap                 |
| PROJECT_RULES.md      | Project Standards                   |
| ARCHITECTURE_RULES.md | Architecture Guidelines             |

---

## Development Roadmap

### Phase 0

Project Foundation

### Phase 1

Authentication System

### Phase 2

Event Categories

### Phase 3

Event Management

### Phase 4

Event Discovery

### Phase 5

Booking System

### Phase 6

Coupon System

### Phase 7

Payment Simulation

### Phase 8

Ticket Generation

### Phase 9

Email Delivery

### Phase 10

Organizer Dashboard

### Phase 11

QR Check-In System

### Phase 12

Admin Panel

### Phase 13

Audit Logging

### Phase 14

Testing & Hardening

### Phase 15

Documentation & Release

---

## MVP Scope

### Included

* Authentication
* Event Management
* Booking System
* Coupons
* Payment Simulation
* QR Tickets
* Organizer Dashboard
* Check-In System
* Admin Panel

### Not Included

* Real Payment Gateway
* Refund System
* Mobile Application
* Recommendation System
* Multi-Ticket Booking

---

## Goals

The primary goals of Eventra are:

* Demonstrate full-stack engineering skills
* Showcase clean architecture practices
* Implement real-world business workflows
* Build a portfolio-grade project

---

## License

This project is created for educational and portfolio purposes.
<!-- 
```

---

# Saran Tambahan Sebelum Mulai Coding

Menurutku dokumentasi inti Eventra sudah **90–95% lengkap**.

Sebelum masuk implementasi, ada 3 aset tambahan yang akan membuat repository terlihat sangat profesional:

### 1. `docs/ERD.drawio`

Diagram visual database.

Bukan hanya teks ERD.

---

### 2. `docs/SEQUENCE_DIAGRAMS.md`

Berisi:

- Register Flow
- Booking Flow
- Payment Flow
- Ticket Generation Flow
- Check-In Flow

---

### 3. `docs/OPENAPI.yaml`

Swagger/OpenAPI Specification.

Karena nanti bisa langsung diimpor ke Swagger UI atau Postman.

Kalau tujuanmu benar-benar membuat **Eventra** sebagai project unggulan GitHub yang bisa bersaing dengan portfolio fresh graduate sampai junior developer, tiga dokumen tambahan itu adalah peningkatan kualitas terbesar berikutnya sebelum mulai coding.
``` -->
