# Eventra Architecture Rules

Version: 1.0

---

# Backend Architecture

Framework:

Django REST Framework

Architecture:

Modular Monolith

Pattern:

API Layer
↓
Service Layer
↓
Selector Layer
↓
Model Layer

---

# Backend Folder Rules

Each app must contain:

api/
services/
selectors/
models/
serializers/
permissions/
tests/

---

# Service Rules

Services contain business logic.

Examples:

create_event

apply_coupon

generate_ticket

complete_check_in

Services may:

* Validate business rules
* Call models
* Call selectors

Services must NOT:

* Return HTTP responses
* Contain serializer logic

---

# Selector Rules

Selectors contain query logic.

Examples:

get_event_by_slug

get_booking_by_code

list_event_participants

Selectors should be read-only.

---

# API Layer Rules

Views should remain thin.

Allowed:

* Request handling
* Serializer execution
* Service invocation

Not Allowed:

* Complex business logic

---

# Model Rules

Models should remain lightweight.

Allowed:

* Relationships
* Constraints
* Simple helpers

Not Allowed:

* Large business workflows

---

# Frontend Architecture

Architecture:

Feature-Based

---

src/

app/
features/
shared/
pages/

---

# Feature Rules

Each feature owns:

components/
hooks/
services/
types/

Example:

features/events/

components/
hooks/
services/
types/

---

# Shared Rules

shared/

Contains:

* UI components
* Utilities
* API client
* Global types

Must not contain feature-specific logic.

---

# React Rules

Prefer functional components.

Use hooks.

Avoid class components.

---

# State Management

Server State:

TanStack Query

Local State:

useState

Complex State:

useReducer

Do not introduce Redux unless necessary.

---

# Form Handling

Use:

React Hook Form

Validation:

Zod

---

# API Rules

All API requests go through:

shared/api

Never call fetch directly from pages.

---

# Error Handling

Backend returns standardized responses.

Frontend handles:

* Loading
* Success
* Error

for every request.

---

# Authentication Rules

JWT only.

Access Token:

Short-lived.

Refresh Token:

Long-lived.

---

# Database Rules

Use PostgreSQL.

All tables must include:

created_at

updated_at

where applicable.

---

# Migration Rules

One feature.

One migration.

Keep migrations small.

---

# Dependency Rules

Prefer standard libraries.

Avoid unnecessary packages.

Every package must have a clear reason.

---

# Scalability Rules

Design for:

* Multiple organizers
* Thousands of events
* Thousands of tickets

Avoid assumptions that only one organizer exists.

---

End of Document
