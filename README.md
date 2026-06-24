<p align="center">
  <h1 align="center">🎫 Eventra</h1>
  <p align="center">
    <strong>Create Events. Book Tickets. Manage Everything.</strong>
  </p>
  <p align="center">
    A full-stack event management & digital ticketing platform.
  </p>
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#contributing">Contributing</a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/Django-4.2-092E20?style=flat-square&logo=django&logoColor=white" alt="Django 4.2" />
    <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
    <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/License-Educational-yellow?style=flat-square" alt="License" />
  </p>
</p>

---

## 📖 About

**Eventra** is a portfolio-grade, full-stack event management and digital ticketing platform. It enables organizers to create and manage events while allowing attendees to discover events, book tickets, apply promotional coupons, receive QR-code-based e-tickets, and check in through a digital verification system.

This project is built with a strong focus on **clean architecture**, **maintainability**, and **scalability** — designed to demonstrate real-world software engineering skills applicable in professional environments.

> **💡 Why Eventra?**
> Eventra was created as a comprehensive showcase of full-stack engineering — from database design and RESTful API development to modern frontend UI/UX. It covers real-world workflows like payment simulation, QR ticketing, role-based access control, and more.

---

## ✨ Features

<table>
  <tr>
    <td>

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT-based Authentication
- Role-Based Access Control (RBAC)
- Profile Management

### 📅 Event Management
- Create, Edit, Publish & Cancel Events
- Event Categories & Banner Upload
- Event Lifecycle Tracking

### 🔍 Event Discovery
- Browse, Search & Filter Events
- Detailed Event Pages

</td>
<td>

### 🎟️ Booking & Ticketing
- Ticket Booking with Capacity Validation
- Booking History
- QR Code Generation & E-Ticket Download
- Ticket Validation & Check-In

### 💰 Coupon & Payment
- Percentage & Fixed Amount Discounts (e.g., promo codes `EVENTRA10`, `WELCOME5`)
- Live Currency Preferences (dynamic toggle between USD and IDR)
- Real-time exchange rate calculation via Frankfurter API
- Payment Simulation (Success / Pending / Failed results)

### 📊 Dashboards & Admin
- Organizer: Participant Management & Sales Stats
- Admin: User Management & Platform Statistics

</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                           |
| ------------ | ---------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Router 7, TanStack Query, Axios |
| **Backend**  | Django 4.2, Django REST Framework, Simple JWT, Django CORS Headers      |
| **Database** | PostgreSQL (production) / SQLite (development)                          |
| **Tooling**  | ESLint, Prettier, PostCSS, Autoprefixer                                |
| **Others**   | QR Code Generator, Email Service                                       |

---

## 🚀 Getting Started

Follow these instructions to get a local copy of Eventra up and running on your machine.

### Prerequisites

Make sure you have the following installed:

| Tool           | Version  | Download                                                     |
| -------------- | -------- | ------------------------------------------------------------ |
| **Python**     | ≥ 3.10   | [python.org](https://www.python.org/downloads/)              |
| **Node.js**    | ≥ 18     | [nodejs.org](https://nodejs.org/)                            |
| **PostgreSQL** | ≥ 14     | [postgresql.org](https://www.postgresql.org/download/)       |
| **Git**        | Latest   | [git-scm.com](https://git-scm.com/downloads)                |

> **📝 Note:** SQLite is used by default for development. PostgreSQL is recommended for production-like environments.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MasArik09/Eventra.git
cd Eventra
```

---

### 2️⃣ Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Windows (CMD):
.venv\Scripts\activate.bat
# On macOS / Linux:
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create environment file from template
cp .env.example .env
# On Windows (CMD) use: copy .env.example .env
```

#### Configure Environment Variables

Open `backend/.env` and update the values as needed:

```env
DEBUG=True
SECRET_KEY=django-insecure-some-secret-key-change-this-in-production
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/eventra
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
ALLOWED_HOSTS=localhost,127.0.0.1
```

> **⚠️ Important:** For production, always generate a strong `SECRET_KEY` and set `DEBUG=False`.

#### Set Up the Database

```bash
# Run migrations
python manage.py migrate

# (Optional) Create a superuser for admin access
python manage.py createsuperuser
```

#### Start the Backend Server

```bash
python manage.py runserver
```

The backend API will be available at: **http://localhost:8000**

---

### 3️⃣ Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Create environment file from template
cp .env.example .env
# On Windows (CMD) use: copy .env.example .env
```

#### Configure Environment Variables

Open `frontend/.env` and verify the API base URL:

```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

#### Start the Frontend Dev Server

```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173**

---

### 4️⃣ Verify the Setup

| Service      | URL                                   | Description          |
| ------------ | ------------------------------------- | -------------------- |
| Frontend     | http://localhost:5173                  | React SPA            |
| Backend API  | http://localhost:8000/api/            | REST API             |
| Admin Panel  | http://localhost:8000/admin/          | Django Admin         |

> **✅ Tip:** If everything is running correctly, the frontend should be able to communicate with the backend API. Open the browser console (F12) to check for any connection errors.

#### 👥 Demo / Testing Credentials

For testing and verification, the following predefined accounts can be used:

| Role | Name | Email | Password | Access / Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Admin (Superuser)** | Admin | `admin@eventra.com` | `admin123` | Django Admin & Full Access |
| **Attendee** | user | `user@eventra.com` | `user1234` | Discover & Book Tickets |
| **Organizer** | organize | `organize@eventra.com` | `organize123` | Create & Manage Events |

---

## 🏗️ Architecture

Eventra follows a **decoupled architecture** where frontend and backend are developed and deployed as separate applications communicating via REST API.

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │  HTTP   │                  │  ORM    │                  │
│   React SPA      │ ──────► │  Django REST API  │ ──────► │   PostgreSQL     │
│   (Vite + TS)    │ ◄────── │  (DRF + JWT)     │ ◄────── │   Database       │
│                  │  JSON   │                  │         │                  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
```

### Architecture Principles

| Principle                   | Description                                        |
| --------------------------- | -------------------------------------------------- |
| **Modular Monolith Backend**| Django apps organized by domain feature             |
| **Feature-Based Frontend**  | React components grouped by feature, not file type  |
| **Service + Selector**      | Business logic in services, data access in selectors|
| **RESTful API**             | Standard HTTP methods and status codes              |

---

## 📂 Project Structure

```
eventra/
│
├── 📁 docs/                    # Project documentation
│   ├── PRD.md                  #   Product Requirements Document
│   ├── SRS.md                  #   Software Requirements Specification
│   ├── ERD.md                  #   Entity Relationship Diagram
│   ├── ERD.drawio              #   Visual Database Diagram
│   ├── SDD.md                  #   Software Design Document
│   ├── API_SPEC.md             #   REST API Specification
│   ├── UI_UX_FLOW.md           #   User Journey & Navigation
│   ├── TASK_BREAKDOWN.md       #   Development Roadmap
│   ├── PROJECT_RULES.md        #   Project Standards
│   ├── ARCHITECTURE_RULES.md   #   Architecture Guidelines
│   └── CONTRIBUTING.md         #   Contribution Guidelines
│
├── 📁 frontend/                # React SPA (Vite)
│   ├── src/
│   │   ├── App.jsx             #   Main application component
│   │   ├── main.jsx            #   Entry point
│   │   ├── shared/             #   Shared components & utilities
│   │   └── assets/             #   Static assets
│   ├── package.json
│   └── vite.config.js
│
├── 📁 backend/                 # Django REST API
│   ├── config/                 #   Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── manage.py
│   └── requirements.txt
│
├── .gitignore
└── README.md                   # ← You are here!
```

---

## 👥 User Roles & Permissions

Eventra implements a **Role-Based Access Control (RBAC)** system with four distinct user roles:

| Role          | Permissions                                                                |
| ------------- | -------------------------------------------------------------------------- |
| 🌐 **Guest**     | Browse events, Search events, View event details                           |
| 🎫 **Attendee**  | Book tickets, Apply coupons, Download e-tickets, View booking history      |
| 📋 **Organizer** | Create & manage events, Manage coupons, View participants, Scan tickets    |
| 🛡️ **Admin**     | Manage users, Moderate events, Monitor platform statistics                 |

---

## 🔄 Lifecycle Diagrams

### Event Lifecycle

```
 ┌─────────┐      ┌───────────┐      ┌──────────┐      ┌───────────┐
 │  Draft   │ ───► │ Published  │ ───► │ Ongoing  │ ───► │ Completed │
 └─────────┘      └───────────┘      └──────────┘      └───────────┘
                        │
                        ▼
                  ┌───────────┐
                  │ Cancelled  │
                  └───────────┘
```

### Booking Lifecycle

```
 ┌─────────────────┐      ┌────────┐      ┌────────────────────┐
 │ Pending Payment  │ ───► │  Paid  │ ───► │  Ticket Generated  │
 └─────────────────┘      └────────┘      └────────────────────┘
           │
           ▼
      ┌──────────┐
      │  Failed   │
      └──────────┘
```

### Ticket Lifecycle

```
 ┌──────────┐      ┌────────┐
 │  Unused   │ ───► │  Used  │
 └──────────┘      └────────┘
       │
       ▼
 ┌──────────┐
 │ Expired   │
 └──────────┘
```

---

## 📚 Documentation

Comprehensive project documentation is available in the [`docs/`](docs/) directory:

| Document                                           | Description                          |
| -------------------------------------------------- | ------------------------------------ |
| [PRD.md](docs/PRD.md)                              | Product Requirements Document        |
| [SRS.md](docs/SRS.md)                              | Software Requirements Specification  |
| [ERD.md](docs/ERD.md)                              | Database Design (Text)               |
| [ERD.drawio](docs/ERD.drawio)                      | Database Design (Visual Diagram)     |
| [SDD.md](docs/SDD.md)                              | Software Design Document             |
| [API_SPEC.md](docs/API_SPEC.md)                    | REST API Specification               |
| [UI_UX_FLOW.md](docs/UI_UX_FLOW.md)               | User Journey & Navigation            |
| [TASK_BREAKDOWN.md](docs/TASK_BREAKDOWN.md)         | Development Roadmap                  |
| [PROJECT_RULES.md](docs/PROJECT_RULES.md)          | Project Standards                    |
| [ARCHITECTURE_RULES.md](docs/ARCHITECTURE_RULES.md)| Architecture Guidelines              |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md)            | Contribution Guidelines              |

---

## 🗺️ Development Roadmap

| Phase | Name                   | Status |
| ----- | ---------------------- | ------ |
| 0     | Project Foundation     | ✅     |
| 1     | Authentication System  | 🔨     |
| 2     | Event Categories       | 📋     |
| 3     | Event Management       | 📋     |
| 4     | Event Discovery        | 📋     |
| 5     | Booking System         | 📋     |
| 6     | Coupon System          | 📋     |
| 7     | Payment Simulation     | 📋     |
| 8     | Ticket Generation      | 📋     |
| 9     | Email Delivery         | 📋     |
| 10    | Organizer Dashboard    | 📋     |
| 11    | QR Check-In System     | 📋     |
| 12    | Admin Panel            | 📋     |
| 13    | Audit Logging          | 📋     |
| 14    | Testing & Hardening    | 📋     |
| 15    | Documentation & Release| 📋     |

> **Legend:** ✅ Completed · 🔨 In Progress · 📋 Planned

---

## 📦 MVP Scope

### ✅ Included in MVP

- Authentication (Register, Login, JWT)
- Event Management (CRUD, Lifecycle)
- Booking System (Book, History, Capacity)
- Coupon System (Discounts, Validation)
- Payment Simulation (Success / Pending / Failed)
- QR Ticket Generation & Download
- Organizer Dashboard (Stats, Participants)
- QR Check-In System
- Admin Panel (Users, Events, Statistics)

### ❌ Not Included in MVP

- Real Payment Gateway Integration
- Refund System
- Mobile Application
- Recommendation System
- Multi-Ticket Booking

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](docs/CONTRIBUTING.md) for details on how to contribute to this project.

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: add your feature description"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

> **📝 Commit Convention:** This project follows [Conventional Commits](https://www.conventionalcommits.org/) for consistent and readable commit history.

---

## ❓ Troubleshooting

<details>
<summary><strong>Backend: <code>ModuleNotFoundError</code></strong></summary>

Make sure your virtual environment is activated:
```bash
# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```
Then reinstall dependencies:
```bash
pip install -r requirements.txt
```
</details>

<details>
<summary><strong>Frontend: <code>npm install</code> fails</strong></summary>

Try clearing the npm cache and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```
On Windows:
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```
</details>

<details>
<summary><strong>CORS errors in the browser</strong></summary>

Make sure your backend `.env` includes the correct frontend URL:
```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```
And that `django-cors-headers` is installed and properly configured in `settings.py`.
</details>

<details>
<summary><strong>Database connection errors</strong></summary>

- Ensure PostgreSQL is running
- Verify the `DATABASE_URL` in `backend/.env` matches your database credentials
- For quick development, SQLite is used by default (no additional setup needed)
</details>

---

## 🎯 Project Goals

Eventra was designed and built with the following objectives:

- 🏗️ **Demonstrate full-stack engineering skills** — from database design to responsive UI
- 🧱 **Showcase clean architecture practices** — modular monolith, service-selector pattern
- 💼 **Implement real-world business workflows** — event lifecycle, booking, payments, ticketing
- 🎓 **Build a portfolio-grade project** — comprehensive documentation, professional codebase

---

## 📄 License

This project is created for **educational and portfolio purposes**.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/MasArik09">MasArik09</a>
</p>
