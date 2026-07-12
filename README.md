# 🛠️ Tool Lending Library

A full-stack Tool Lending Library Management System built with **Next.js 16**, **React 19**, **TypeScript**, **MongoDB Atlas**, and **JWT Authentication**.

The application allows organizations, colleges, workshops, and makerspaces to manage tool inventory, borrow tools, return tools, and monitor lending activities through role-based dashboards.

---

# Live link of Project: https://craft-tool-lending.netlify.app
# Features

## Authentication

- JWT Authentication
- HTTP-only Cookie Sessions
- Login
- Registration
- Logout
- Protected Routes
- Role Based Authorization
- Admin & User Dashboards

---

# User Roles

## Admin

Administrators can:

- View dashboard analytics
- View inventory
- Add tools
- Edit tools
- Delete tools
- View tool details
- View current borrowers
- View borrow history
- Process returned tools
- View all loans
- Monitor inventory statistics

---

## User

Users can:

- Login/Register
- Borrow available tools
- View their borrowed tools
- View borrowing history
- View due dates
- Return tools (through administrator)

---

# Tech Stack

## Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons
- React Hook Form
- Zod
- Sonner Toast

---

## Backend

- Next.js Route Handlers
- MongoDB Atlas
- Mongoose
- JWT (jose)
- HTTP Only Cookies

---

## Security

- Input Sanitization
- Zod Validation
- Protected API Routes
- Role Based Access
- HTTP-only Cookies

---

# Folder Structure

```
app/
components/
hooks/
lib/
models/
services/
types/
middleware/
```

---

# Application Workflow

## 1. User Registration

User registers using:

- Name
- Email
- Password

Password is encrypted before storage.

---

## 2. Login

User logs in.

JWT is generated.

JWT is stored inside HTTP-only cookies.

User is redirected according to role.

---

# Dashboard

## Admin Dashboard

Displays:

- Total Tools
- Borrowed Tools
- Available Tools
- Returned Tools
- Active Loans
- Inventory Chart
- Low Stock Tools

---

## User Dashboard

Displays:

- Personal borrowing statistics
- Current borrowed tools
- Due dates
- Borrow history

---

# Tool Management

Accessible only by Admin.

## Add Tool

Admin fills:

- Tool Name
- Category
- Description
- Quantity
- Available Quantity
- Condition
- Location

After saving:

Tool appears in inventory.

---

## Edit Tool

Admin opens

```
Tools
→ View
→ Edit
```

Modify any information.

Save changes.

---

## Delete Tool

Admin opens

```
Tools
→ Delete
```

Confirmation dialog appears.

Tool is permanently removed.

---

# Borrowing Workflow

User opens

```
Borrow Tools
```

Selects:

- Tool
- Quantity
- Expected Return Date

Submits request.

System automatically:

- Creates Loan Record
- Reduces Available Quantity
- Updates Tool Status

---

# Returning Workflow

Administrator opens

```
Returns
```

System lists every active borrowed tool.

Click

```
Return
```

Confirmation dialog appears.

Confirm Return.

System automatically:

- Marks loan as Returned
- Sets Actual Return Date
- Increases Available Quantity
- Updates Tool Status
- Refreshes Dashboard
- Refreshes Inventory

---

# Tool Details

Admin can open

```
Tools
→ View
```

Shows:

- Tool Information
- Total Quantity
- Available Quantity
- Borrowed Quantity
- Current Borrowers
- Borrow History
- Description

---

# Loan Management

Administrator can view

- All Borrow Records
- Returned Records
- Active Records
- Overdue Records

Supports

- Search
- Filters
- Status

---

# Search

Inventory supports searching by

- Tool Name

Loan Management supports searching by

- Borrower Name
- Borrower Email
- Tool Name

---

# Dashboard Statistics

Automatically calculated.

Includes

- Total Tools
- Available Tools
- Borrowed Tools
- Returned Tools
- Active Loans
- Inventory Distribution

---

# Validation

Uses Zod.

Validates

- Tool Forms
- Loan Forms
- Authentication Forms

---

# Authentication Flow

```
Register

↓

Login

↓

JWT Cookie Created

↓

Protected Dashboard

↓

Role Based Navigation
```

---

# API Routes

## Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me
```

---

## Tools

```
GET /api/tools

POST /api/tools

GET /api/tools/:id

PUT /api/tools/:id

DELETE /api/tools/:id
```

---

## Loans

```
GET /api/loans

POST /api/loans

PATCH /api/loans/:id/return
```

---

# Installation

Clone repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Production build

```bash
npm run build
```

Run production

```bash
npm start
```

---

# Environment Variables

Create

```
.env.local
```

```
MONGODB_URI=

JWT_SECRET=

DB_NAME=

NODE_ENV=development
```

---

# Default Roles

Admin

Can

- Manage Inventory
- Manage Returns
- View Dashboard
- Add/Edit/Delete Tools

User

Can

- Borrow Tools
- View Personal Loans
- Browse Inventory

---

# Project Highlights

- Role Based Authentication
- JWT Security
- MongoDB Atlas Integration
- Full CRUD Operations
- Inventory Management
- Loan Tracking
- Return Processing
- Dashboard Analytics
- Responsive Design
- Protected Routes
- Clean UI
- TypeScript
- Accessible Components

---

# Future Improvements

- Email Notifications
- QR Code Based Borrowing
- Barcode Scanner Integration
- Tool Images
- Damage Reporting
- Fine Calculation
- Reservation System
- Export Reports (PDF/Excel)
- Multi-Branch Inventory
- Email Reminders

---

# Developed By

**Arjun Singh**

B.Tech CSE (Artificial Intelligence)

2026 Batch

Tool Lending Library Capstone Project