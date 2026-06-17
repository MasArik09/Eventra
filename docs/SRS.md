# Software Requirements Specification (SRS)

# Eventra

Version: 1.0

Status: Draft

Last Updated: June 2026

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for Eventra, a web-based event management and digital ticketing platform.

The purpose of this document is to provide a clear technical specification for developers, testers, and future maintainers.

---

## 1.2 Scope

Eventra allows organizers to create and manage events while attendees can discover events, book tickets, apply coupons, complete simulated payments, receive QR-code-based tickets, and check in through a ticket validation system.

---

# 2. System Actors

## Guest

Unauthenticated visitor.

## Attendee

Authenticated user who participates in events.

## Organizer

Authenticated user with event management privileges.

## Admin

Platform administrator.

---

# 3. Functional Requirements

---

# FR-01 Authentication Module

## FR-01.1 User Registration

Description:

Users shall be able to create a new account.

Input:

* Full Name
* Email
* Password
* Confirm Password

Validation:

* Email must be unique
* Password minimum 8 characters

Output:

* User account created successfully

---

## FR-01.2 User Login

Description:

Users shall be able to authenticate using email and password.

Input:

* Email
* Password

Output:

* Access Token
* Refresh Token

---

## FR-01.3 User Logout

Description:

Users shall be able to terminate active sessions.

Output:

* Token invalidated

---

## FR-01.4 Profile Management

Description:

Users shall be able to update profile information.

Editable Fields:

* Full Name
* Profile Picture
* Bio

---

# FR-02 Event Module

## FR-02.1 Create Event

Actor:

Organizer

Fields:

* Title
* Description
* Category
* Location
* Event Date
* Capacity
* Ticket Price
* Banner Image

Output:

* Event created

---

## FR-02.2 Edit Event

Actor:

Organizer

Conditions:

* Organizer owns event
* Event not completed

---

## FR-02.3 Delete Event

Actor:

Organizer

Conditions:

* Organizer owns event

---

## FR-02.4 Publish Event

Actor:

Organizer

Output:

Event status becomes:

Published

---

## FR-02.5 Cancel Event

Actor:

Organizer

Output:

Event status becomes:

Cancelled

---

## FR-02.6 Browse Events

Actor:

Guest
Attendee

Features:

* Pagination
* Search
* Category Filter

---

## FR-02.7 View Event Detail

Actor:

All users

Displayed Information:

* Event Title
* Description
* Organizer
* Date
* Location
* Capacity
* Remaining Seats
* Price

---

# FR-03 Booking Module

## FR-03.1 Create Booking

Actor:

Attendee

Conditions:

* Event Published
* Capacity Available

Output:

Booking Created

Status:

Pending Payment

---

## FR-03.2 View Booking History

Actor:

Attendee

Output:

List of bookings

---

## FR-03.3 Cancel Booking

Actor:

Attendee

Conditions:

Ticket not generated

---

# FR-04 Coupon Module

## FR-04.1 Create Coupon

Actor:

Organizer

Fields:

* Code
* Discount Type
* Discount Value
* Usage Limit
* Expiration Date

---

## FR-04.2 Apply Coupon

Actor:

Attendee

Validation:

* Coupon exists
* Coupon active
* Not expired
* Usage limit not exceeded

Output:

Discount applied

---

# FR-05 Payment Module

## FR-05.1 Simulate Payment

Actor:

Attendee

Available Actions:

* Success
* Pending
* Failed

Output:

Payment Status Updated

---

## FR-05.2 Payment Validation

System shall verify payment result before ticket generation.

---

# FR-06 Ticket Module

## FR-06.1 Generate Ticket

Conditions:

* Booking Paid

Output:

* Ticket Record
* QR Code

---

## FR-06.2 Download Ticket

Actor:

Attendee

Output:

PDF Ticket

---

## FR-06.3 Send Ticket Email

Actor:

System

Trigger:

Ticket generated

Output:

Email sent

---

# FR-07 Check-In Module

## FR-07.1 Scan QR Ticket

Actor:

Organizer

Input:

QR Code

Output:

* Valid
* Invalid
* Already Used

---

## FR-07.2 Check-In Attendee

Actor:

Organizer

Output:

Ticket status updated to Used

---

# FR-08 Organizer Dashboard

## FR-08.1 View Participants

Actor:

Organizer

Output:

Participant list

---

## FR-08.2 View Ticket Sales

Actor:

Organizer

Output:

Sales statistics

---

## FR-08.3 View Event Summary

Actor:

Organizer

Output:

* Total Tickets Sold
* Capacity Remaining
* Attendance Count

---

# FR-09 Admin Module

## FR-09.1 Manage Users

Actor:

Admin

Actions:

* View
* Suspend
* Activate

---

## FR-09.2 Manage Events

Actor:

Admin

Actions:

* View
* Remove
* Moderate

---

# 4. Non-Functional Requirements

---

# NFR-01 Performance

API response time should be less than:

2 seconds

for normal operations.

---

# NFR-02 Security

Requirements:

* JWT Authentication
* Password Hashing
* Role-Based Access Control
* CSRF Protection
* Input Validation

---

# NFR-03 Reliability

System availability target:

99%

during development testing.

---

# NFR-04 Maintainability

Requirements:

* Modular Architecture
* Feature-Based Frontend Structure
* Separate Django Apps
* Consistent Coding Standards

---

# NFR-05 Scalability

Database design shall support:

* Multiple organizers
* Thousands of events
* Thousands of tickets

---

# 5. Permission Matrix

| Feature           | Guest | Attendee | Organizer | Admin |
| ----------------- | ----- | -------- | --------- | ----- |
| Browse Events     | ✓     | ✓        | ✓         | ✓     |
| View Event Detail | ✓     | ✓        | ✓         | ✓     |
| Register          | ✓     | ✗        | ✗         | ✗     |
| Book Ticket       | ✗     | ✓        | ✓         | ✓     |
| Create Event      | ✗     | ✗        | ✓         | ✓     |
| Manage Own Event  | ✗     | ✗        | ✓         | ✓     |
| Create Coupon     | ✗     | ✗        | ✓         | ✓     |
| Download Ticket   | ✗     | ✓        | ✓         | ✓     |
| Scan Ticket       | ✗     | ✗        | ✓         | ✓     |
| Manage Users      | ✗     | ✗        | ✗         | ✓     |

---

# 6. Acceptance Criteria

## Event Creation

Given organizer is authenticated

When organizer submits valid event data

Then event shall be created successfully

---

## Booking

Given event has remaining capacity

When attendee books a ticket

Then booking shall be created

---

## Payment

Given booking exists

When payment result is Success

Then ticket shall be generated

---

## Check-In

Given ticket status is Unused

When organizer scans valid QR code

Then ticket status shall become Used

---

# 7. Constraints

* PostgreSQL database
* Django REST Framework backend
* React frontend
* Dummy payment only
* One booking equals one ticket

---

# 8. Assumptions

* Email service available
* QR generation library available
* Internet connection available

---

End of Document
