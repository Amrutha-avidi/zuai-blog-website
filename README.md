# Fullstack Blog Application

## Introduction

This project is a fullstack web application with a React-based frontend and an Express.js-based backend. The frontend provides the user interface, while the backend handles server-side logic for a blog application, including authentication, data management, and API endpoints.

## Table of Contents

- [Introduction](#introduction)
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Frontend

### Overview

The frontend is a React application that provides the user interface for the application. It utilizes various libraries for routing, state management, and testing.

### Key Features

- **React-based:** Built using React 18.x for dynamic and interactive UIs.
- **Routing:** Utilizes `react-router-dom` for client-side routing.
- **State Management:** Manages state effectively with React's built-in tools.
- **HTTP Requests:** Uses `axios` for making HTTP requests to the backend.
- **Cookie Management:** Manages cookies with `js-cookie`.

### Installation (Frontend)

1. Navigate to the `client` directory: cd client
2. Install frontend dependencies: npm install

### Frontend Scripts
- **npm start:** Runs the frontend in development mode.
- **npm run build:** Builds the frontend for production.

## Backend


### Overview

The backend is an Express.js application that handles server-side logic, including API endpoints, authentication, and database operations. It connects to a MongoDB database using Mongoose.

### Key Features
- **Express.js:** Handles server-side logic with Express.
- **MongoDB Atlas & Mongoose:** Manages data with MongoDB Atlas, accessed through Mongoose.
-**Authentication:** Provides JWT-based authentication using jsonwebtoken and password encryption with bcrypt.
- **CORS and Security:** Implements CORS and other security practices.

### Installation (Backend)

1. Navigate to the `server` directory: cd server
2. Install backend dependencies: npm install
3. Set up environment variables:
- **Create a .env file in the server directory**.
- **Define necessary variables such as MONGO_URI, JWT_SECRET, and others as required by your application.**

### Backend Scripts
- **npm start:** Starts the backend server using Node.js.
- **npm test:** Placeholder script for running backend tests.




## Installation (Fullstack)
To install and run the fullstack application, follow these steps:

1. Clone the repository: git clone <https://github.com/Amrutha-avidi/zuai-blog-website>
2. Install both frontend and backend dependencies:
 - **Frontend** : cd client, npm start
 - **Backend** : cd /..server, npm start
3. Set up environment variables in the backend by creating a .env file in the server directory.
4. Start the development servers:
 -**Frontend**: cd client, npm start
 -**Backend**: cd server, node index.js


## Usage
-**Frontend:** The frontend React application will be served on a development server (typically on localhost:3000).
-**Backend:** The backend Express.js server will be running and can be accessed through its API endpoints (typically on localhost:3003).


## Features
-**Frontend:** Modern React-based UI with routing, state management, and testing utilities.
-**Backend:** RESTful API with MongoDB integration, JWT authentication, and secure request handling.




## Dependencies
### Frontend Dependencies
The frontend project uses the following dependencies:

- **react:** ^18.3.1
- **react-dom:** ^18.3.1
- **react-router-dom:** ^6.25.1
- **react-icons:** "^5.3.0",
- **axios:** ^1.7.2
- **js-cookie:** ^3.0.5
- **@testing-library/react:** ^13.4.0
- **@testing-library/jest-dom:** ^5.17.0
- **web-vitals:** ^2.1.4

### Backend Dependencies
The backend project uses the following dependencies:

- **express:** ^4.19.2
- **bcrypt:** ^5.1.1
- **body-parser:** ^1.20.2
- **cookie-parser:** ^1.4.6
- **cors:** ^2.8.5
- **dotenv:** ^16.4.5
- **jsonwebtoken:** ^9.0.2
- **mongoose:** ^8.5.1

## Scripts
### Frontend Scripts
- **npm start:** Runs the frontend in development mode.
- **npm run build:** Builds the frontend for production.
- **npm test:** Runs the frontend test suite.
- **npm run eject:** Ejects the configuration.
### Backend Scripts
- **npm start:** Starts the backend server.
- **npm test:** Placeholder script for running backend tests.