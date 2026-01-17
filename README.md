# HRMS Lite - Human Resource Management System

A lightweight, modern HR management system built with Next.js for managing employees and tracking attendance.

## Features

- 👥 **Employee Management**: Add, view, search, and delete employee records
- 📅 **Attendance Tracking**: Mark daily attendance with Present/Absent status
- 📊 **Dashboard**: Real-time statistics and recent activity overview
- 🔍 **Advanced Filtering**: Filter attendance by employee and date range
- 📈 **Attendance Summary**: View total present/absent days per employee
- 🎨 **Modern UI**: Clean, professional interface built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saquelain/HRMS-Lite.git
cd HRMS-Lite
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
MONGODB_URI=mongodb://localhost:27017/hrms-lite
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This project is deployed on Vercel. To deploy your own:

1. Push code to GitHub
2. Import project in Vercel
3. Add `MONGODB_URI` environment variable
4. Deploy!

## Project Structure
```
hrms-lite/
├── app/                      # Next.js app directory
│   ├── (dashboard)/         # Dashboard layout group
│   │   ├── page.tsx         # Dashboard page
│   │   ├── employees/       # Employee management
│   │   └── attendance/      # Attendance management
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   ├── employees/           # Employee components
│   ├── attendance/          # Attendance components
│   └── dashboard/           # Dashboard components
├── lib/                     # Utilities and configs
│   ├── db.ts               # MongoDB connection
│   ├── models/             # Mongoose models
│   └── utils.ts            # Helper functions
└── types/                  # TypeScript types
```

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `DELETE /api/employees/[id]` - Delete employee

### Attendance
- `GET /api/attendance` - Get attendance records (with filters)
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/summary/[employeeId]` - Get employee summary

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Author

Saquelain Mokhtar