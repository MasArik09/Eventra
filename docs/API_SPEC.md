# API Specification

# Eventra

Version: 1.0

Status: Draft

Last Updated: June 2026

---

# 1. API Overview

Base URL

/api/v1

Response Format

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Error message"
}
```

Authentication

JWT Bearer Token

Authorization Header

```http
Authorization: Bearer <token>
```

---

# 2. Authentication Module

## Register

POST

/auth/register

Request

```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirm_password": "password123",
  "full_name": "John Doe"
}
```

Response

```json
{
  "success": true,
  "message": "Account created successfully"
}
```

---

## Login

POST

/auth/login

Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response

```json
{
  "access_token": "...",
  "refresh_token": "..."
}
```

---

## Refresh Token

POST

/auth/refresh

---

## Logout

POST

/auth/logout

---

## Get Profile

GET

/users/me

---

## Update Profile

PATCH

/users/me

---

# 3. Categories Module

## Get Categories

GET

/categories

Response

```json
[
  {
    "id": 1,
    "name": "Seminar",
    "slug": "seminar"
  }
]
```

---

# 4. Events Module

## Get Events

GET

/events

Query Parameters

```http
?page=1
&search=python
&category=seminar
&status=published
```

---

## Get Event Detail

GET

/events/{id}

---

## Create Event

POST

/events

Permission

Organizer

Request

```json
{
  "title": "Python Workshop",
  "description": "Learn Python",
  "category_id": 1,
  "location_name": "Auditorium",
  "location_address": "Surabaya",
  "event_date": "2026-07-01T09:00:00",
  "capacity": 100,
  "ticket_price": 50000
}
```

---

## Update Event

PATCH

/events/{id}

Permission

Organizer Owner

---

## Delete Event

DELETE

/events/{id}

Permission

Organizer Owner

---

## Publish Event

POST

/events/{id}/publish

---

## Cancel Event

POST

/events/{id}/cancel

---

# 5. Coupon Module

## Get Coupons

GET

/events/{id}/coupons

---

## Create Coupon

POST

/events/{id}/coupons

Request

```json
{
  "code": "EVENTRA10",
  "discount_type": "percentage",
  "discount_value": 10,
  "usage_limit": 100,
  "expires_at": "2026-12-31"
}
```

---

## Update Coupon

PATCH

/coupons/{id}

---

## Delete Coupon

DELETE

/coupons/{id}

---

## Validate Coupon

POST

/coupons/validate

Request

```json
{
  "event_id": 1,
  "coupon_code": "EVENTRA10"
}
```

---

# 6. Booking Module

## Create Booking

POST

/bookings

Request

```json
{
  "event_id": 1,
  "coupon_code": "EVENTRA10"
}
```

Response

```json
{
  "booking_id": 1,
  "booking_code": "BK-2026-001",
  "status": "pending_payment",
  "final_price": 45000
}
```

---

## Get My Bookings

GET

/bookings

---

## Get Booking Detail

GET

/bookings/{id}

---

## Cancel Booking

POST

/bookings/{id}/cancel

---

# 7. Payment Module

## Simulate Payment

POST

/payments

Request

```json
{
  "booking_id": 1,
  "result": "success"
}
```

Possible Result

```text
success
pending
failed
```

---

## Get Payment Detail

GET

/payments/{id}

---

# 8. Ticket Module

## Get My Tickets

GET

/tickets

---

## Get Ticket Detail

GET

/tickets/{id}

---

## Download Ticket

GET

/tickets/{id}/download

Response

PDF File

---

## Get Ticket QR

GET

/tickets/{id}/qr

Response

Image File

---

# 9. Organizer Dashboard Module

## Dashboard Summary

GET

/dashboard/summary

Response

```json
{
  "total_events": 10,
  "total_bookings": 230,
  "total_revenue": 5000000,
  "attendance_count": 180
}
```

---

## Event Participants

GET

/dashboard/events/{id}/participants

---

## Event Analytics

GET

/dashboard/events/{id}/analytics

---

# 10. Check-In Module

## Validate Ticket

POST

/check-ins/validate

Request

```json
{
  "ticket_code": "TCK-2026-001"
}
```

Response

```json
{
  "valid": true,
  "status": "unused"
}
```

---

## Check-In Ticket

POST

/check-ins

Request

```json
{
  "ticket_code": "TCK-2026-001"
}
```

Response

```json
{
  "success": true,
  "message": "Check-in successful"
}
```

---

# 11. Admin Module

## Get Users

GET

/admin/users

Permission

Admin

---

## User Detail

GET

/admin/users/{id}

---

## Suspend User

POST

/admin/users/{id}/suspend

---

## Activate User

POST

/admin/users/{id}/activate

---

## Get Events

GET

/admin/events

---

## Delete Event

DELETE

/admin/events/{id}

---

# 12. Pagination Standard

Response

```json
{
  "count": 100,
  "next": "...",
  "previous": "...",
  "results": []
}
```

---

# 13. Error Codes

400

Bad Request

---

401

Unauthorized

---

403

Forbidden

---

404

Not Found

---

409

Conflict

---

422

Validation Error

---

500

Internal Server Error

---

# 14. API Versioning

Current Version

v1

Base URL

/api/v1

Future

/api/v2

---

End of Document
