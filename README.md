# Task1 API

A simple Node.js and Express-based API for managing users and tasks.  
Features include user registration/login with JWT authentication and CRUD operations for task lists.

---

## Getting Started

### Prerequisites
- Node.js v18+ installed
- MongoDB running locally or a MongoDB Atlas URI

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Dexx8844/text1.git
cd text1
npm install

## create a file .env in the root directory and put this in the file you created
-DATABASE_URL= your_mongodb_connection_string
-SECRET= dexx

## you start your server
-npm run dev

##Server will run on http://localhost:9090

## API Endpoints
User Routes

Register User
POST /api/v1/register
Body:

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "mypassword"
}

##Login User
user login 
POST /api/v1/login
Body:

{
  "email": "john@example.com",
  "password": "mypassword"
}

##Task Routes

Create Task
POST /api/v1/getnewList
Body:

{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs"
}


Get All Tasks
GET /api/v1/lists

Get Single Task
GET /api/v1/lists/:id

Update Task
PUT /api/v1/lists/:id

Delete Task
DELETE /api/v1/lists/:id

##Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

JWT (Authentication)

Bcrypt (Password hashing)