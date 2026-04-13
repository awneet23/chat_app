# Chat App

A full-stack realtime chat application built with React, Vite, Express, MongoDB, and Socket.IO.

Live Demo: [https://chat-app-t905.onrender.com/](https://chat-app-t905.onrender.com/)

## Overview

This project is a modern chat application with authentication, profile management, user sidebar discovery, and realtime messaging. The frontend is built with React and Vite, while the backend uses Express, MongoDB, and Socket.IO for API and live communication.

## Features

- User signup and login
- Auth-protected chat routes
- Realtime messaging with Socket.IO
- Online user status
- Profile picture updates
- Image message support via Cloudinary
- Responsive chat UI

## Tech Stack

### Frontend

- React
- Vite
- Zustand
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- Socket.IO Client

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Socket.IO
- JWT Authentication
- Cookie Parser
- Cloudinary

## Project Structure

```text
chat_app/
|- backend/
|  |- src/
|  |- package.json
|- frontend/
|  |- chat_app/
|     |- src/
|     |- package.json
|- package.json
```

## Local Setup

### 1. Clone the project

```bash
git clone <your-repo-url>
cd chat_app
```

### 2. Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend/chat_app
```

### 3. Configure environment variables

Create `backend/.env` and add:

```env
MONGO_DB_URL=your_mongodb_connection_string
PORT=5001
jwtsecret=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the app

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend/chat_app
npm run dev
```

## Build

From the project root:

```bash
npm run build
```

## Deployment

This project is deployed on Render.

Production app:
[https://chat-app-t905.onrender.com/](https://chat-app-t905.onrender.com/)

## Notes

- In development, the frontend talks to the backend using the configured localhost API URL.
- In production, the frontend uses relative `/api` routes.
- Backend serves the frontend build in production mode.

## Author

Built by Awneet.
