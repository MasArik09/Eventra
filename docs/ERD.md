# Entity Relationship Diagram (ERD)

# Eventra

Version: 1.0

Last Updated: June 2026

---

# 1. Database Overview

Database Engine:

PostgreSQL

Naming Convention:

* snake_case
* singular table names
* UUID for public-facing entities
* timestamps on all major entities

---

# 2. Entity List

Core Entities:

1. users
2. profiles
3. categories
4. events
5. coupons
6. bookings
7. payments
8. tickets
9. check_ins
10. audit_logs

---

# 3. Entity Definitions

---

# users

Purpose:

Store authentication information.

Fields:

* id (BIGSERIAL, PK)
* email (VARCHAR, UNIQUE)
* password_hash (VARCHAR)
* role (VARCHAR)
* is_active (BOOLEAN)
* created_at
* updated_at

Relationships:

* One User has One Profile
* One User can Create Many Events
* One User can Create Many Bookings

---

# profiles

Purpose:

Store user profile information.

Fields:

* id (BIGSERIAL, PK)
* user_id (FK -> users.id)
* full_name
* avatar_url
* bio
* created_at
* updated_at

Relationships:

* Belongs to User

---

# categories

Purpose:

Event categorization.

Fields:

* id (BIGSERIAL, PK)
* name
* slug
* created_at

Examples:

* Seminar
* Workshop
* Competition
* Webinar
* Conference

Relationships:

* One Category has Many Events

---

# events

Purpose:

Store event information.

Fields:

* id (BIGSERIAL, PK)

* organizer_id (FK -> users.id)

* category_id (FK -> categories.id)

* title

* slug

* description

* location_name

* location_address

* event_date

* capacity

* ticket_price

* banner_image

* status

* published_at

* created_at

* updated_at

Status Values:

* draft
* published
* ongoing
* completed
* cancelled

Relationships:

* Belongs to Organizer
* Belongs to Category
* Has Many Bookings
* Has Many Coupons
* Has Many Tickets

---

# coupons

Purpose:

Discount management.

Fields:

* id (BIGSERIAL, PK)

* event_id (FK -> events.id)

* code

* discount_type

* discount_value

* usage_limit

* used_count

* expires_at

* is_active

* created_at

* updated_at

Discount Types:

* percentage
* fixed

Relationships:

* Belongs to Event

---

# bookings

Purpose:

Store ticket reservation information.

Fields:

* id (BIGSERIAL, PK)

* attendee_id (FK -> users.id)

* event_id (FK -> events.id)

* coupon_id (FK -> coupons.id, nullable)

* booking_code

* original_price

* discount_amount

* final_price

* status

* booked_at

* created_at

* updated_at

Status Values:

* pending_payment
* paid
* failed
* cancelled

Relationships:

* Belongs to User
* Belongs to Event
* Has One Payment
* Has One Ticket

---

# payments

Purpose:

Store payment information.

Fields:

* id (BIGSERIAL, PK)

* booking_id (FK -> bookings.id)

* payment_reference

* amount

* payment_method

* status

* paid_at

* created_at

* updated_at

Payment Methods:

* dummy_gateway

Status:

* pending
* success
* failed

Relationships:

* Belongs to Booking

---

# tickets

Purpose:

Store generated tickets.

Fields:

* id (BIGSERIAL, PK)

* booking_id (FK -> bookings.id)

* event_id (FK -> events.id)

* attendee_id (FK -> users.id)

* ticket_code

* qr_code_path

* status

* generated_at

* created_at

* updated_at

Status:

* unused
* used
* expired

Relationships:

* Belongs to Booking
* Belongs to Event
* Belongs to User
* Has One Check-In

---

# check_ins

Purpose:

Store attendance records.

Fields:

* id (BIGSERIAL, PK)

* ticket_id (FK -> tickets.id)

* checked_in_by (FK -> users.id)

* checked_in_at

* created_at

Relationships:

* Belongs to Ticket
* Belongs to Organizer

---

# audit_logs

Purpose:

Track important system activities.

Fields:

* id (BIGSERIAL, PK)

* user_id (FK -> users.id)

* action

* entity_type

* entity_id

* metadata

* created_at

Examples:

* Event Created
* Event Updated
* Coupon Created
* Ticket Checked In

Relationships:

* Belongs to User

---

# 4. Relationship Diagram

users
│
├── profile (1:1)
│
├── events (1:N)
│
├── bookings (1:N)
│
├── tickets (1:N)
│
└── audit_logs (1:N)

categories
│
└── events (1:N)

events
│
├── coupons (1:N)
├── bookings (1:N)
└── tickets (1:N)

bookings
│
├── payment (1:1)
└── ticket (1:1)

tickets
│
└── check_in (1:1)

---

# 5. Database Constraints

---

Unique Constraints

users.email

categories.slug

events.slug

coupons.code

bookings.booking_code

tickets.ticket_code

payments.payment_reference

---

Foreign Key Constraints

profiles.user_id

events.organizer_id

events.category_id

coupons.event_id

bookings.attendee_id

bookings.event_id

bookings.coupon_id

payments.booking_id

tickets.booking_id

tickets.event_id

tickets.attendee_id

check_ins.ticket_id

audit_logs.user_id

---

# 6. Recommended Indexes

users.email

events.slug

events.status

events.event_date

bookings.booking_code

tickets.ticket_code

payments.payment_reference

coupons.code

audit_logs.created_at

---

# 7. Future Expansion

Not Included in v1.0

Possible Future Tables:

* reviews
* wishlists
* notifications
* organizer_teams
* payment_transactions
* event_tags
* recommendation_logs

---

End of Document
