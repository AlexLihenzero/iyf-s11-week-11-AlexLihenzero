# IYF Week 11 — Database & Authentication

A backend API project developed as part of the IYF Weekend Academy Season 11 Week 11 curriculum.

The project focuses on database integration, MongoDB/Mongoose data modeling, relationships between resources, JWT authentication, password security, protected routes, and basic API security hardening.

## Project Overview

This project demonstrates how to build a backend API that:

- Connects to MongoDB Atlas using Mongoose
- Implements MongoDB data models and relationships
- Provides CRUD operations for posts
- Supports comments associated with posts
- Implements user registration and login
- Secures passwords using bcrypt
- Uses JSON Web Tokens (JWT) for authentication
- Protects authenticated post operations
- Associates posts with their authenticated users
- Validates authentication input
- Keeps sensitive configuration in environment variables
- Handles invalid authentication securely

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (`jsonwebtoken`)
- bcryptjs
- dotenv
- better-sqlite3
- PowerShell / REST API testing

## Project Structure

```text
iyf-s11-week-11-AlexLihenzero/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── commentsController.js
│   │   └── postsController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── posts.js
│   │
│   └── app.js
│
├── sql/
│   └── exercise.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js