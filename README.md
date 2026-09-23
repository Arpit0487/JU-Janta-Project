# JU Janta

> A student mentorship platform designed to connect students with experienced seniors from JECRC University for guidance related to DSA, Web Development, Placements, Internships, and other career-related queries.

🌐 **Live Website:** https://ju-janta.vercel.app/ (As the backend is deployed on free model of render, it takes 30 seconds to start the backend so please be patient😭😭)

📦 **GitHub Repository:** https://github.com/Arpit0487/JU-Janta-Project

---

## 📌 About The Project

**JU Janta** is a full-stack student mentorship platform built to make it easier for juniors to connect with experienced seniors and seek personalized guidance.

Students can browse available mentors, view their profiles and achievements, and ask questions directly to them. Mentors can receive questions, respond to them, and manage ongoing discussions.

The platform also allows students to apply to become mentors by submitting their academic and professional information.

The goal of JU Janta is to create a centralized platform where students can get reliable guidance from seniors who have already gone through similar academic, DSA, development, internship, and placement experiences.

---

## ✨ Features

### 👨‍🎓 Student Features

- User registration and login
- Secure authentication using JWT
- Browse available mentors
- View detailed mentor profiles
- View mentor achievements and coding profiles
- Ask questions directly to mentors
- View previously asked questions
- Track question status
- Continue discussions with mentors
- Close a discussion after receiving guidance
- Update personal profile
- Apply to become a mentor

### 👨‍🏫 Mentor Features

- Secure mentor authentication
- View mentor profile
- Receive questions from students
- View student information
- Reply to student questions
- Track pending and answered questions
- Continue one-to-one discussions
- Close completed discussions
- Update profile information

### 💬 Question & Discussion System

Questions have different states:

- `Pending` – Question has been submitted but has not received a response.
- `Answered` – Mentor has responded to the question.
- `Closed` – Discussion has been completed by closing the question.

Students and mentors can open a question to view the complete discussion and replies.

### 📝 Mentor Application

Students can apply to become mentors by providing information such as:

- Name
- Email
- Contact number
- Current semester
- Course specialization
- Branch
- CGPA
- GitHub profile
- LinkedIn profile
- Graduation year

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- React Router
- Axios
- Vite
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB

---

## 🏗️ Project Architecture

The repository contains both the frontend and backend applications.

```text
JU-Janta-Project/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── DB/
│   │   │   └── db.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middileware.js
│   │   │   └── authMentor.middileware.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── question.model.js
│   │   │   ├── reply.model.js
│   │   │   └── becomeMentor.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── user.route.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── README.md




## 🔌 API Endpoints

### Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new student |
| `POST` | `/api/auth/login` | Authenticate an existing user |
| `POST` | `/api/auth/logout` | Logout the current user |
| `GET` | `/api/auth/me` | Get the currently authenticated user |

### User & Mentor APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user/u/:id` | Get a user's profile |
| `GET` | `/api/user/mentors` | Get available mentors |
| `POST` | `/api/user/newMentor` | Submit a mentor application |

### Question & Discussion APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user/questions` | Create a new question |
| `GET` | `/api/user/questions` | Get questions |
| `GET` | `/api/user/questions/student` | Get questions asked by the logged-in student |
| `GET` | `/api/user/questions/mentor` | Get questions received by the logged-in mentor |
| `GET` | `/api/user/question/:questionId` | Get a specific question |
| `POST` | `/api/user/question/:questionId/reply` | Add a reply to a question |
| `GET` | `/api/user/question/:questionId/replies` | Get replies for a question |
| `PATCH` | `/api/user/questions/:questionId/close` | Close a discussion |

---
```

## 🚀 Deployment

### Frontend

The React frontend is deployed using **Vercel**.

**Live Application:**  
https://ju-janta.vercel.app/

### Backend

The Node.js and Express.js backend is deployed using **Render**.

**Backend:**  
https://ju-janta-backend.onrender.com

The deployed React frontend communicates with the deployed Express backend through REST APIs.

### Database

The application uses **MongoDB** for persistent data storage.

---
## 💻 Local Setup

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/Arpit0487/JU-Janta-Project.git
cd JU-Janta-Project
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd JU-Janta-Project/Frontend
```

If you are already inside the project directory, simply run:

```bash
cd Frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at the local Vite development URL displayed in the terminal.
The frontend communicates with the backend through REST APIs.


## 🧠 Key Learning Outcomes

Through this project, I gained practical experience in:

- Building a full-stack MERN application
- Designing and developing REST APIs
- Implementing CRUD operations
- JWT-based authentication and authorization
- Role-based access control
- Password hashing using bcrypt
- MongoDB database design and Mongoose
- React component-based architecture
- React Router for client-side routing
- Axios for frontend-backend communication
- Protected frontend routes
- Express.js middleware
- Backend controller, route, and model architecture
- Connecting frontend and backend applications
- Managing environment variables and sensitive credentials
- Deploying frontend applications using Vercel
- Deploying backend applications using Render
- Building responsive interfaces for desktop, tablet, and mobile devices
- Structuring and maintaining a full-stack project in a GitHub repository

---

## 👨‍💻 Developer

### Arpit Sharma

**B.Tech – Computer Science Engineering**

📧 **Email:** arpit.sharma.contact@gmail.com

🔗 **LinkedIn:**  
https://www.linkedin.com/in/contact-arpit/

🔗 **GitHub:**  
https://github.com/Arpit0487
