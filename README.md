# King's Medical Hall Credit Tracker

A simple full-stack web application for pharmacy owners to track medicine credits and payments.

## Features

* **Add Credit**: Easily add new credit entries for customers.
* **Record Payment**: Update customer balances when they pay.
* **Search**: Real-time customer search by name or phone.
* **Pending Dues**: View all customers with outstanding balances, sorted by highest first.
* **WhatsApp Reminders**: Send pending amount reminders directly to customers via WhatsApp.
* **Mobile Friendly**: Clean, simple interface designed for non-tech-savvy users.

## Tech Stack

* **Frontend**: React, TailwindCSS, Lucide-React
* **Backend**: Vercel Serverless Functions
* **Database**: MongoDB Atlas with Mongoose

## Getting Started

### 1. Prerequisites

* Node.js installed
* MongoDB Atlas account and connection string

### 2. Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB URI:
   ```env
   MONGO_URI=mongodb+srv://kingsmedical:<db_password>@kingsmedical.o8xsj4a.mongodb.net/medical_ledger
   ```

### 3. Running Locally

Start the development server:
```bash
npm run dev
```

### 4. Deployment (Vercel)

1. **GitHub**: Push your code to a new GitHub repository.
2. **Import**: Go to [Vercel](https://vercel.com/new) and import your repo.
3. **Env Vars**: Add `MONGO_URI` with your connection string in Vercel settings.
4. **Go Live**: Deploy and access your link! 🚀

## Project Structure

* `/api`: Serverless API routes.
* `/models`: Mongoose database models.
* `/lib`: Database connection helper.
* `/src`: React frontend source code.
