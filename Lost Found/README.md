# 🎓 Campus Lost & Found — College FSD Web Application

A modern, responsive, and intuitive Full-Stack (MERN) web application developed for college campuses. It allows students, faculty, and campus staff to report, search, track, and recover lost and found belongings effortlessly.

---

## 🌟 Key Highlights & Features

- **Modern Aesthetic UI:** Built with Tailwind CSS, subtle glassmorphism effects, dynamic status badges, and Lucide icons.
- **Lost & Found Catalogs:** Dedicated directories for lost and found items with instant search and multi-criteria filters (Category, Location, Status).
- **Fast Report Workflows:** Interactive reporting forms with quick campus location presets, automatic validation, and real-time feedback.
- **Item Details & Reconnection:** Rich details view with direct contact copying, location/date badges, and an instant **"Mark as Recovered"** status toggle.
- **Live Statistics Dashboard:** Real-time metrics tracking Total Lost, Total Found, and Recovered items.
- **RESTful API Backend:** Clean MVC architecture (Express.js, Mongoose, MongoDB) with validation and query filtering.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), Tailwind CSS v4, Lucide React, React Router DOM, Axios |
| **Backend** | Node.js, Express.js, Mongoose ODM |
| **Database** | MongoDB (Local MongoDB Community Server or MongoDB Atlas Cloud) |
| **Architecture** | RESTful MVC (Model-View-Controller) Architecture |

---

## 📁 Project Structure

```
Lost Found/
├── package.json               # Root scripts for running frontend and backend
├── .gitignore                 # Git ignore rules for node_modules and env files
├── README.md                  # Comprehensive documentation and project guide
├── server/                    # Backend (Node.js + Express.js + MongoDB)
│   ├── package.json           # Backend dependencies and scripts
│   ├── server.js              # Express app entrypoint & middleware setup
│   ├── .env                   # Environment variables (PORT, MONGO_URI)
│   ├── .env.example           # Environment template
│   ├── seeder.js              # Database seed script with realistic campus items
│   ├── config/
│   │   └── db.js              # MongoDB Mongoose connection configuration
│   ├── models/
│   │   └── Item.js            # Mongoose schema for Lost & Found items
│   ├── controllers/
│   │   └── itemController.js  # Business logic for CRUD and statistics
│   └── routes/
│       └── itemRoutes.js      # REST API route definitions
└── client/                    # Frontend (React.js + Tailwind CSS + Vite)
    ├── package.json           # Frontend dependencies
    ├── vite.config.js         # Vite configuration with Tailwind & proxy
    ├── index.html             # HTML template with Google Fonts (Plus Jakarta Sans)
    └── src/
        ├── main.jsx           # React DOM root entrypoint
        ├── App.jsx            # Application routes & layout
        ├── index.css          # Tailwind CSS configuration & custom utilities
        ├── services/
        │   └── api.js         # Centralized Axios API service layer
        ├── components/
        │   ├── Navbar.jsx     # Responsive navbar with mobile drawer
        │   ├── Footer.jsx     # Campus-themed footer with safety hubs
        │   ├── ItemCard.jsx   # Interactive item card with status pills
        │   ├── LoadingSkeleton.jsx # Skeleton animation for loading states
        │   └── EmptyState.jsx # Clean empty state placeholder
        └── pages/
            ├── Home.jsx       # Hero, live search, stats counters, recent items
            ├── LostItems.jsx  # Catalog of lost items with filters
            ├── FoundItems.jsx # Catalog of found items with filters
            ├── ReportLost.jsx # Lost item reporting form with validation
            ├── ReportFound.jsx# Found item reporting form with safety tips
            └── ItemDetails.jsx# Detailed view, contact info, recovery toggle
```

---

## 📦 Required NPM Packages

### Backend (`server/package.json`):
- `express`: Fast, minimalist web framework for Node.js
- `mongoose`: MongoDB object modeling and schema validation
- `dotenv`: Loads environment variables from `.env`
- `cors`: Enables Cross-Origin Resource Sharing
- `morgan`: HTTP request logger for development

### Frontend (`client/package.json`):
- `react` & `react-dom`: UI library
- `react-router-dom`: Client-side declarative routing
- `lucide-react`: Modern and consistent icons
- `axios`: Promise-based HTTP client
- `tailwindcss` & `@tailwindcss/vite`: Utility-first CSS styling framework

---

## 🚀 Step-by-Step Setup & Local Execution

### Prerequisites
1. [Node.js](https://nodejs.org/) (v16.0 or later installed)
2. [MongoDB](https://www.mongodb.com/try/download/community) installed locally OR a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud database.

---

### Step 1: Install Dependencies
Open your terminal in the project root (`Lost Found`) and install packages for both client and server:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### Step 2: Configure Environment Variables
Inside the `server/` directory, ensure `.env` has your MongoDB connection string:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campus_lost_found
NODE_ENV=development
```
*(If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string).*

---

### Step 3: (Optional) Seed Sample Campus Data
To populate the database with realistic sample items (calculators, lab adapters, student IDs, keys):

```bash
cd server
npm run seed
```

---

### Step 4: Run the Application Locally

#### Terminal 1 — Start the Backend Server:
```bash
cd server
npm start
```
*Backend runs at: `http://localhost:5000`*

#### Terminal 2 — Start the Frontend Client:
```bash
cd client
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

Open `http://localhost:5173` in your browser.

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/items` | Fetch all items (Supports query filters: `type`, `category`, `location`, `status`, `search`) |
| `GET` | `/api/items/stats` | Fetch aggregate statistics (Total Lost, Found, Recovered) |
| `GET` | `/api/items/:id` | Fetch single item details by MongoDB ID |
| `POST` | `/api/items` | Submit a new Lost or Found item report |
| `PUT` | `/api/items/:id` | Update item details or toggle status (`Active` / `Recovered`) |
| `DELETE`| `/api/items/:id` | Remove an item report |
| `GET` | `/api/health` | Backend API health check |

---

## 🚢 Deployment Guide

### Deploying the Backend (e.g., Render / Railway):
1. Push your project to GitHub.
2. Go to [Render.com](https://render.com) or [Railway.app](https://railway.app).
3. Create a new **Web Service** connected to your repository.
4. Set **Root Directory** to `server`.
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `npm start`.
7. Add Environment Variables:
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/campus_lost_found`
   - `PORT`: `5000`
   - `NODE_ENV`: `production`

### Deploying the Frontend (e.g., Vercel / Netlify):
1. Go to [Vercel.com](https://vercel.com).
2. Import your GitHub repository.
3. Set **Root Directory** to `client`.
4. Framework Preset: **Vite**.
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-deployed-backend.onrender.com/api`
6. Click **Deploy**.

---

## 🐙 GitHub Upload Commands

```bash
# 1. Initialize Git repository in the root directory
git init

# 2. Add all project files (node_modules is excluded by .gitignore)
git add .

# 3. Create the initial commit
git commit -m "Initial commit: Campus Lost and Found FSD College Project"

# 4. Link your GitHub remote repository
git remote add origin https://github.com/YOUR_USERNAME/campus-lost-and-found.git

# 5. Push to main branch
git branch -M main
git push -u origin main
```

---

## 🎤 Faculty Presentation & Viva Guide

### 1. Problem Statement
> *"On a busy college campus, hundreds of essential student items—such as calculators, ID cards, lab records, laptop chargers, and keys—are misplaced daily. Traditional notice boards or unofficial WhatsApp groups are disorganized and lack searchability. Campus Lost & Found solves this by providing a unified, accessible digital portal."*

### 2. Architecture & Design
> *"The project follows a standard MERN stack architecture with a decoupled client-server model. The React frontend consumes RESTful API endpoints from an Express.js backend, which interfaces with MongoDB via Mongoose ODM for data modeling and validation."*

### 3. Key Technical Highlights
- **Dynamic Search & Multi-criteria Filtering:** Regex-grounded search across title, description, location, and category.
- **RESTful MVC Structure:** Clear separation of Models, Controllers, and Routes for high maintainability.
- **Lifecycle Management:** Items can be marked as 'Recovered' once reunited with their owner.
- **Responsive & Accessible UI:** Seamless experience across smartphones, tablets, and desktop computers.
