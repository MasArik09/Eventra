# Eventra Project Rules

Version: 1.0

---

# Project Goal

Build a portfolio-grade full-stack event management and digital ticketing platform using modern software engineering practices.

Priority Order:

1. Correctness
2. Maintainability
3. Readability
4. Scalability
5. Performance

Never sacrifice maintainability for premature optimization.

---

# General Principles

## Rule 1

Write code for humans first.

Code is read more often than it is written.

---

## Rule 2

Avoid spaghetti code.

Large files must be split into smaller modules.

---

## Rule 3

Single Responsibility Principle.

Each file should have one clear responsibility.

---

## Rule 4

Prefer composition over duplication.

Extract reusable logic.

---

## Rule 5

Do not introduce unnecessary complexity.

No over-engineering.

---

# Naming Conventions

## Variables

Use descriptive names.

Good:

user_profile
ticket_code

Bad:

x
data
temp

---

## Functions

Use verbs.

Examples:

create_event
update_booking
generate_ticket

---

## Components

Use PascalCase.

Examples:

EventCard
BookingForm
DashboardLayout

---

## Files

Use snake_case for backend.

Use kebab-case or PascalCase consistently for frontend.

---

# Git Rules

Branch Naming:

feature/authentication

feature/event-management

feature/booking-system

bugfix/payment-validation

refactor/ticket-service

---

Commit Convention

feat:

fix:

refactor:

docs:

test:

chore:

Examples:

feat: add event creation endpoint

fix: resolve coupon validation bug

docs: update api specification

---

# Testing Rules

Every critical feature requires tests.

Required:

* Authentication
* Booking
* Payment
* Ticket Generation
* Check-In

---

# Security Rules

Never store plaintext passwords.

Never expose internal IDs unnecessarily.

Validate all inputs.

Use role-based authorization.

---

# Documentation Rules

Whenever a major feature changes:

Update:

* PRD
* SRS
* API_SPEC
* ERD

if affected.

---

# Code Review Checklist

Before merging:

* Code works
* Tests pass
* No duplicated logic
* Naming is clear
* Documentation updated

---

End of Document
