# FitTrack – Full-Stack MERN Fitness Tracking Platform

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-227754?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A full-stack, responsive fitness management and analytics platform engineered with MongoDB, Express.js, React, and Node.js.

</div>

---

## 🌟 Key Features

- **🔐 Robust Authentication & Security**: Complete JWT-based authentication flow with bcrypt password encryption, protected HTTP interceptors, and persistent user sessions.
- **🏋️ Workout Logger & History**: Detailed workout logging with exercise types, sets, duration, calorie expenditure estimation, and comprehensive history tracking.
- **💧 Daily Hydration Tracker**: Visual water intake monitor with quick-increment cups, daily target goals, and automated midnight reset logic.
- **⚖️ Weight Tracking & Body Metrics**: Historical weight logging with BMI calculator status, progression trend charts, and body composition updates.
- **🎯 Dynamic Fitness Goals**: Configurable targets for workout sessions, calorie burn, water intake, and weight management with live progress indicators.
- **📊 Interactive Analytics Dashboard**: Summary cards, activity charts, workout streak calculator, and recent activity feed powered by Recharts.
- **📱 Modern Glassmorphism UI**: Clean, responsive layout crafted with custom CSS variables, accessible color contrasts, and seamless mobile navigation.

---

## 🏗️ Architecture & Folder Structure

```text
FitTrack-MERN/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic via Mongoose
│   ├── controllers/
│   │   ├── authController.js     # User registration and login handlers
│   │   ├── goalController.js     # Target goal CRUD operations
│   │   ├── userController.js     # User profile retrieval and updates
│   │   ├── waterController.js    # Hydration tracking and daily reset logic
│   │   ├── weightController.js   # Body weight logging and historical trends
│   │   └── workoutController.js  # Workout logging, streak, and stats
│   ├── middleware/
│   │   └── authMiddleware.js     # Bearer token JWT validation middleware
│   ├── models/
│   │   ├── Goal.js               # Fitness target schema
│   │   ├── User.js               # User credentials and body profile schema
│   │   ├── Water.js              # Daily water intake schema
│   │   ├── Weight.js             # Weight progress schema
│   │   └── Workout.js            # Workout activity schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── goalRoutes.js         # /api/goals routes
│   │   ├── userRoutes.js         # /api/user routes
│   │   ├── waterRoutes.js        # /api/water routes
│   │   ├── weightRoutes.js       # /api/weight routes
│   │   └── workoutRoutes.js      # /api/workouts routes
│   ├── .env.example              # Backend environment template
│   ├── package.json              # Backend dependencies and scripts
│   ├── server.js                 # Express server entry point & serverless export
│   └── vercel.json               # Serverless deployment configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx        # Sidebar navigation and header wrapper
│   │   │   └── ProtectedRoute.jsx# Authentication route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global user state & token provider
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Overview metrics and charts
│   │   │   ├── Goals.jsx         # Goal management view
│   │   │   ├── History.jsx       # Workout historical log
│   │   │   ├── Login.jsx         # User login form
│   │   │   ├── Profile.jsx       # Profile and demographic settings
│   │   │   ├── Register.jsx      # New account registration form
│   │   │   ├── Water.jsx         # Daily hydration manager
│   │   │   ├── Weight.jsx        # Weight logger and BMI analysis
│   │   │   └── Workouts.jsx      # Workout entry logger
│   │   ├── services/
│   │   │   └── api.js            # Axios client with JWT auth headers
│   │   ├── utils/
│   │   │   └── date.js           # Date formatting utility functions
│   │   ├── App.jsx               # Application router and route definitions
│   │   ├── main.jsx              # React root DOM mount
│   │   └── styles.css            # Global styling system and theme tokens
│   ├── index.html                # HTML entry shell
│   ├── package.json              # Frontend dependencies and Vite scripts
│   ├── vite.config.js            # Vite build configuration
│   └── .env.example              # Frontend environment template
├── .gitignore                    # Comprehensive ignore rules
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or MongoDB Atlas cluster)
- `npm` or `yarn`

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file:
   ```bash
   # Windows PowerShell / CMD
   copy .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```

4. Configure the environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/fittrack
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   ```

5. Launch the backend API server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the frontend environment configuration:
   ```bash
   # Windows PowerShell / CMD
   copy .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```

4. Configure `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open the browser at `http://localhost:5173` to explore FitTrack.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service health status check | No |
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate user and issue JWT | No |
| `GET` | `/api/user/profile` | Retrieve authenticated user profile | Yes |
| `PUT` | `/api/user/profile` | Update profile information | Yes |
| `GET` | `/api/workouts` | Get all logged workouts for user | Yes |
| `POST` | `/api/workouts` | Log a new workout session | Yes |
| `DELETE` | `/api/workouts/:id` | Delete a specific workout log | Yes |
| `GET` | `/api/workouts/streak` | Get current and best workout streaks | Yes |
| `GET` | `/api/water` | Get today's hydration intake | Yes |
| `POST` | `/api/water` | Increment water intake amount | Yes |
| `GET` | `/api/weight` | Fetch weight log history | Yes |
| `POST` | `/api/weight` | Add new weight measurement | Yes |
| `GET` | `/api/goals` | List all user fitness goals | Yes |
| `POST` | `/api/goals` | Create a new fitness goal | Yes |
| `PUT` | `/api/goals/:id` | Update goal progress / status | Yes |
| `DELETE` | `/api/goals/:id` | Delete a fitness goal | Yes |

---

## 👤 Author

**SRIKANTH-HARSHA-MANDA**
- GitHub: [@SRIKANTH-HARSHA-MANDA](https://github.com/SRIKANTH-HARSHA-MANDA)
- Email: srikanthharshamanda@gmail.com
