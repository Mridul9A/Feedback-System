# Feedback-System

A full-stack feedback management application that allows users to submit feedback and view it on a dashboard. The project is built using:

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MongoDB

## Features

1. Submit feedback with the following details:
   - Name
   - Email
   - Feedback text
   - Category (Suggestion, Bug Report, Feature Request)
2. View all feedback on a dashboard.
3. Filter feedback by category.
4. Backend API for handling feedback data.
5. Responsive design for seamless user experience.

## Project Structure

The project consists of two main directories:
- `backend`: Handles API requests and data storage.
- `frontend`: Implements the user interface and interactions.

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your system.
- MongoDB connection string for the database.

---

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/feedback-system.git
   cd feedback-system/backend
   ```
2. Install dependencies:
```
npm install
```

3. Configure environment variables:
* Create a .env file in the backend/src directory with the following content:
```
MONGO_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:5173/
PORT=5000
```
4. Run the server:
``` 
npm run dev
```
* The backend server will be running at http://localhost:5000.

### Frontend Setup
1. Navigate to the frontend directory:
```
cd ../frontend
```
2. Install dependencies:
```
npm install
```
3. Configure environment variables:
* Create a .env file in the frontend directory with the following content:
```
REACT_APP_BACKEND_URL=http://localhost:5000
```
Run the development server:
```
npm run dev
```
* The frontend will be running at http://localhost:5173/.


