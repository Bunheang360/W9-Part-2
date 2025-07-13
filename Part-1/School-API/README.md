# School Management System

A full-stack web application built with **React.js** frontend and **Express.js** backend API to manage Students, Courses, and Teachers. Features JWT authentication, role-based access, and comprehensive CRUD operations.

---

## 📦 Features

### Backend API

- 🧑‍🎓 CRUD for Students
- 🧑‍🏫 CRUD for Teachers
- 📘 CRUD for Courses
- 🔐 JWT Authentication & Authorization
- 🔑 User Registration & Login
- 🔁 Database Associations:
  - One Teacher teaches many Courses
  - Many Students enroll in many Courses (Many-to-Many)
- 📚 Swagger API documentation (`/api-docs`)
- 🧪 Faker.js seeder for generating test data
- 🌐 CORS enabled for frontend integration

### Frontend React App

- ⚛️ Modern React 19 with Vite
- 🎨 Tailwind CSS for styling
- 🛡️ Protected routes with JWT authentication
- 📊 Dashboard with real-time statistics
- 📱 Responsive design
- 🔄 Global state management with Context API
- 📄 Pagination for data tables
- 🚨 Error handling and loading states

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Bunheang360/School-API.git
cd "Backend Development\Lab\Week 9"
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd "Part-1\School-API"
```

Install dependencies:

```bash
npm install
```

### 3. Database Configuration

Create a `.env` file in the backend root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_db
DB_PORT=3306
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
```

Create the database:

```bash
node setup-database.js
```

### 4. Seed the Database

Populate with sample data (2000+ records):

```bash
npm run seed
```

### 5. Start the Backend Server

```bash
npm start
```

Backend will be available at: `http://localhost:3000`

### 6. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd "Part-2\school-management-frontend"
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 📂 Project Structure

```
Week 9/
├── Part-1/School-API/              # Backend Express.js API
│   ├── src/
│   │   ├── index.js                # Main server file
│   │   ├── seed.js                 # Database seeder
│   │   ├── config/
│   │   │   ├── db.config.js        # Database configuration
│   │   │   └── swagger.js          # Swagger documentation setup
│   │   ├── controllers/
│   │   │   ├── auth.controller.js  # Authentication logic
│   │   │   ├── student.controller.js
│   │   │   ├── teacher.controller.js
│   │   │   └── course.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js  # JWT verification
│   │   ├── models/
│   │   │   ├── index.js            # Sequelize models setup
│   │   │   ├── user.model.js       # User authentication model
│   │   │   ├── student.model.js
│   │   │   ├── teacher.model.js
│   │   │   └── course.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js      # Authentication routes
│   │   │   ├── student.routes.js
│   │   │   ├── teacher.routes.js
│   │   │   └── course.routes.js
│   │   └── utils/
│   │       └── queryOption.js      # Query pagination helper
│   ├── package.json
│   ├── setup-database.js           # Database creation script
│   └── .env
│
├── Part-2/school-management-frontend/  # Frontend React App
│   ├── src/
│   │   ├── main.jsx                # React entry point
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── api.js                  # Axios API configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation with auth state
│   │   │   └── ProtectedRoute.jsx  # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global authentication state
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main dashboard with statistics
│   │   │   ├── Students.jsx        # Student management
│   │   │   ├── Teachers.jsx        # Teacher management
│   │   │   ├── Courses.jsx         # Course management
│   │   │   └── Auth/
│   │   │       ├── Login.jsx       # User login
│   │   │       └── Register.jsx    # User registration
│   │   └── utils/
│   │       └── auth.js             # Authentication utilities
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
```

---

## 🧪 Database Seeding

To populate the database with sample data using Faker.js:

```bash
npm run seed
```

This will:

- Recreate all tables with proper associations
- Insert 5 teachers
- Insert 10 courses (assigned to random teachers)
- Insert 2000 students
- Create random course enrollments for students

## 🌐 Application URLs

- **Frontend React App**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`
- **API Documentation (Swagger)**: `http://localhost:3000/api-docs`

## 📘 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Students

- `GET /api/students` - Get all students (paginated)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers

- `GET /api/teachers` - Get all teachers (paginated)
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Courses

- `GET /api/courses` - Get all courses (paginated)
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## 🔐 Authentication Flow

1. **Register**: Create a new user account
2. **Login**: Authenticate and receive JWT token
3. **Protected Access**: Token stored in localStorage and sent with API requests
4. **Auto-logout**: Tokens expire and users are automatically logged out
5. **Route Protection**: Unauthenticated users redirected to login

---

## ⚙️ Available Scripts

### Backend (Part-1/School-API)

| Script         | Description                           |
| -------------- | ------------------------------------- |
| `npm start`    | Start the production server           |
| `npm run dev`  | Start development server with nodemon |
| `npm run seed` | Seed database with sample data        |

### Frontend (Part-2/school-management-frontend)

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview production build      |

## 🧑‍💻 Technologies Used

### Backend

- **Express.js** - Web framework
- **Sequelize ORM** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Swagger** - API documentation
- **Faker.js** - Sample data generation
- **dotenv** - Environment variables

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management

## 🚀 Quick Start Commands

```bash
# Start both servers (run in separate terminals)

# Terminal 1 - Backend
cd "Part-1\School-API"
npm start

# Terminal 2 - Frontend
cd "Part-2\school-management-frontend"
npm run dev
```

## 🔧 Troubleshooting

- **Database connection issues**: Verify MySQL is running and credentials in `.env` are correct
- **CORS errors**: Ensure backend CORS is configured for frontend URL
- **Authentication issues**: Check JWT_SECRET is set in `.env`
- **Port conflicts**: Ensure ports 3000 (backend) and 5173 (frontend) are available

---

## 📄 License

MIT
