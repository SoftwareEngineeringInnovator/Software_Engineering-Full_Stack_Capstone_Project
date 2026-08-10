# Cybersecurity Incident Tracker

The Cybersecurity Incident Tracker is a full-stack MERN application created as my Software Engineering Capstone Project.

The application allows users to view cybersecurity incidents and allows authenticated users to report, update, and delete incidents. The project also includes user registration, login, password hashing, JWT authentication, and protected API routes.

The purpose of this project is to demonstrate how a React frontend can communicate with an Express and Node.js backend while using MongoDB to store application data.

---

## Features

- View reported cybersecurity incidents
- View the full details of an individual incident
- Register a new user account
- Log in with a registered account
- Secure passwords using bcrypt hashing
- Generate JWT authentication tokens
- Store the JWT token in the browser after login
- Protect Create, Update, and Delete operations
- Create new cybersecurity incidents
- Edit existing cybersecurity incidents
- Delete cybersecurity incidents
- Log out and remove the authentication token
- Hide protected actions from users who are not logged in
- Display useful success and error messages
- Download incident information as a text report
- Responsive and organized user interface

---

## Technologies Used

### Frontend

- React
- JavaScript
- Vite
- React Router
- HTML
- CSS
- Fetch API
- React Hooks such as `useState` and `useEffect`

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- dotenv

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Thunder Client
- MongoDB Atlas
- Browser Developer Tools

---

## Project Structure

```text
Software_Engineering-Full_Stack_Capstone_Project/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Incident.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── incidentRoutes.js
│   │
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navigation.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── IncidentsPage.jsx
│   │   │   ├── CreateIncidentPage.jsx
│   │   │   ├── IncidentDetailsPage.jsx
│   │   │   ├── EditIncidentPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Application Pages

The React application includes several different views.

### Home

The Home page introduces the Cybersecurity Incident Tracker.

### Incidents

Displays all cybersecurity incidents stored in MongoDB.

Users can click an incident title to view more information.

### Incident Details

Displays all available information for one selected cybersecurity incident.

Authenticated users can also access the Edit and Delete options.

### Report Incident

Allows an authenticated user to report a new cybersecurity incident.

### Edit Incident

Allows an authenticated user to update an existing cybersecurity incident.

### Login

Allows a registered user to log in and receive a JWT authentication token.

### Register

Allows a new user to create an account.

---

## Incident Information

Each incident can contain information such as:

- Title
- Description
- Severity
- Category
- Status
- Affected System
- Reported By
- Assigned To
- Resolution Notes

The application also automatically stores created and updated timestamps through Mongoose.

---

## Authentication

The project uses JSON Web Tokens to authenticate users.

The basic authentication process is:

```text
User registers
      ↓
Password is hashed with bcrypt
      ↓
User logs in
      ↓
Backend verifies the password
      ↓
Backend generates a JWT
      ↓
Frontend stores the token
      ↓
Token is sent with protected API requests
```

Protected requests use an Authorization header similar to:

```text
Authorization: Bearer JWT_TOKEN
```

The backend authentication middleware verifies the token before allowing protected operations.

When the user logs out, the JWT is removed from browser Local Storage.

---

## Authorization

Users who are not logged in can:

- View the Home page
- View the list of incidents
- View incident details
- Register
- Log in

Authenticated users can additionally:

- Report incidents
- Edit incidents
- Delete incidents
- Log out

The backend protects Create, Update, and Delete requests even if someone attempts to access the API directly.

---

## REST API Routes

### Incident Routes

| Method | Route | Purpose | Authentication |
|---|---|---|---|
| GET | `/api/incidents` | Get all incidents | No |
| GET | `/api/incidents/:id` | Get one incident | No |
| POST | `/api/incidents` | Create an incident | Yes |
| PUT | `/api/incidents/:id` | Update an incident | Yes |
| DELETE | `/api/incidents/:id` | Delete an incident | Yes |

### Authentication Routes

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in a user |
| GET | `/api/auth/protected` | Test JWT authentication |

---

## Environment Variables

The backend uses environment variables to protect private configuration information.

Create a `.env` file inside the `backend` folder.

You can use `.env.example` as a guide.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The real `.env` file is ignored by Git and should not be uploaded to GitHub.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/SoftwareEngineeringInnovator/Software_Engineering-Full_Stack_Capstone_Project.git
```

Enter the project folder:

```bash
cd Software_Engineering-Full_Stack_Capstone_Project
```

---

## Backend Setup

Enter the backend folder:

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

Create the `.env` file and add the required environment variables.

Start the backend:

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

---

## Frontend Setup

Open another terminal and enter the frontend folder:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

## Building the Frontend

The frontend production build can be tested with:

```bash
npm run build
```

A successful build creates the `dist` folder.

---

## API Testing

The backend API was tested using Thunder Client and browser Developer Tools.

Testing included:

- Creating incidents
- Reading incidents
- Updating incidents
- Deleting incidents
- Registering users
- Logging in users
- Testing invalid login credentials
- Testing requests without authentication tokens
- Testing requests with invalid authentication tokens
- Testing requests with valid JWT tokens

Example authentication results:

```text
No token       → 401 Unauthorized
Invalid token  → 401 Unauthorized
Valid token    → Protected request allowed
```

---

## CRUD Functionality

The application supports the four main CRUD operations:

```text
Create → Report a new incident
Read   → View incidents and incident details
Update → Edit an existing incident
Delete → Delete an incident
```

The Create, Update, and Delete operations require authentication.

---

## Security Features

This project includes several basic application security features:

- Password hashing with bcrypt
- JWT authentication
- Protected Express routes
- Authentication middleware
- Environment variables for private configuration
- `.env` excluded from Git
- Generic invalid login messages
- Authentication required for data-changing operations
- JWT removed when the user logs out

---

## Download Incident Report

The Report Incident page includes a Download Report option.

The application creates a text file using the current incident form information and downloads the report to the user's computer.

This feature is handled in the frontend and does not require an additional backend API request.

---

## Project Goal

The main goal of this capstone project was to build a complete MERN application and practice connecting the different parts of a full-stack application:

```text
React
   ↓
Fetch API
   ↓
Express / Node.js
   ↓
Mongoose
   ↓
MongoDB Atlas
```

The project also gave me the opportunity to practice authentication, authorization, REST APIs, React state management, routing, database schemas, error handling, and Git version control.

---

## Author

**Fredy Chilito**
Software Engineering Capstone Project
Per Scholas - 2026