# Review System for Talent Hub by Tanjim Pranto (tanjim.pranto@abo.fi)

## Project Overview

**Name**: Talent Hub Review System

**Description**:  
A system that enables logged-in users to leave feedback about their bookings, emphasizing usability and alignment with the platform’s goal of fostering human connections. The backend integrates for review storage and retrieval.

**Stack/Technologies Used**:

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **State Management**: Redux
- **Styling**: Tailwind CSS

**Key Features**:

- User authentication and storage.
- Review creation, storage, and retrieval.
- Protected routes for user-specific functionalities.
- Modal-based UI for better review management.

## Installation Instructions

### Prerequisites

1. Install **Node.js** (v14 or later).
2. Install **npm**
3. MongoDB:
   - Use the connection string provided in the `.env` file to connect to my database on my running cluster of Mongo DB Atlas.

### Steps

1. Clone the repository.

# Navigate to the project directory:

2. Install frontend dependencies:

   cd talent-hive-review-system

   npm install

# Navigate to the backend directory and install dependencies:

3. cd backend

   npm install

# Add a .env file (IF NOT AVAILABLE) in the backend/ directory with the following content:

MONGO_URI=mongodb+srv://tanjim:tanjimpassword@cluster0.3zncv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=4350c8f38babcf2f2c840bd33ce0360f8480759cb64be4e84605a6581922ca015aa872cea803382205e4a1447191b09fac3f8547b7ada2de52858deb982797ff

## Running the Project

1. Start the Backend server:
   cd backend
   npm start

2. Start the Frontend server project directory:
   npm run dev

3. Access the Application
   Visit http://localhost:5173 in your browser.

API Endpoints
User Routes
POST /api/users/signup - Register a new user.
POST /api/users/login - Login a user.
GET /api/users/me - Fetch logged-in user's details.
Review Routes
GET /api/reviews/service/:id - Get reviews for a service.
POST /api/reviews - Add a review for a service.

Environment Configuration
Backend:
MONGO_URI: MongoDB connection string.
PORT: Port for the backend server.
JWT_SECRET: Secret key for JWT authentication.
