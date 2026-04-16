# Chat Application - MERN Stack

A full-featured real-time chat application built with MongoDB, Express, React, and Node.js. This application enables users to connect, send text messages, share images and videos, and see real-time online status.

---

## Project Overview

This is a complete MERN (MongoDB, Express, React, Node.js) stack application that provides real-time messaging capabilities with modern web technologies. The application is divided into two main components: Backend API Server and Frontend Client Application.

---

## Features

### Authentication and User Management

- User registration with email validation
- Secure login with password hashing (bcrypt)
- JWT token-based authentication
- Auto logout functionality
- Profile update with avatar support
- Cookie-based session management

### Real-time Messaging

- Send and receive text messages instantly
- Share images with compression and optimization
- Share videos with playback support
- Real-time message delivery using Socket.io
- Message history persistence in database
- Auto-scroll to latest message

### User Presence

- Real-time online/offline status tracking
- Online users list
- Online indicator on user profiles
- Visual status display in chat interface

### Media Management

- Image upload with Cloudinary integration
- Video upload with Cloudinary integration
- File compression and optimization
- Secure cloud storage

### User Interface

- Responsive design with Tailwind CSS
- Lucide React icons integration
- Loading skeletons for better UX
- Toast notifications for feedback
- Redux state management

---

## Technology Stack

### Backend

- Node.js - JavaScript runtime
- Express - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- Socket.io - Real-time communication
- JWT - Authentication tokens
- bcryptjs - Password hashing
- Cloudinary - Media storage and CDN
- CORS - Cross-origin resource sharing

### Frontend

- React - UI library
- Redux Toolkit - State management
- React Router - Page routing
- Axios - HTTP client
- Socket.io Client - Real-time communication
- Tailwind CSS - Styling
- Lucide React - Icons
- React Toastify - Notifications

---

## Project Structure

```
Chat App MERN Stack/
|
|--- backend/
|    |--- src/
|    |    |--- config/
|    |    |    |--- dbConnection.js (MongoDB connection)
|    |    |    |--- dotenv.js (Environment setup)
|    |    |    |--- env.js (Environment variables)
|    |    |
|    |    |--- middleware/
|    |    |    |--- auth.middleware.js (JWT verification)
|    |    |    |--- catchAsyncError.js (Error handling)
|    |    |    |--- errorMiddleware.js (Error responses)
|    |    |
|    |    |--- modules/
|    |    |    |--- user/
|    |    |    |    |--- user.controller.js (User logic)
|    |    |    |    |--- user.model.js (User schema)
|    |    |    |    |--- user.routes.js (User endpoints)
|    |    |    |    |--- user.services.js (Auth services)
|    |    |    |
|    |    |    |--- message/
|    |    |    |    |--- message.controller.js (Message logic)
|    |    |    |    |--- message.model.js (Message schema)
|    |    |    |    |--- message.routes.js (Message endpoints)
|    |    |
|    |    |--- routes/
|    |    |    |--- global.routes.js (Main router)
|    |    |
|    |    |--- utils/
|    |    |    |--- ApiError.js (Error handling)
|    |    |    |--- ApiResponse.js (Response formatting)
|    |    |    |--- cloudinary.util.js (Cloudinary setup)
|    |    |    |--- jwtToken.js (JWT generation)
|    |    |    |--- socket.js (Socket setup)
|    |    |
|    |    |--- app.js (Express app setup)
|    |
|    |--- package.json
|    |--- .env (Environment variables - not in repo)
|
|
|--- frontend/
|    |--- src/
|    |    |--- app/
|    |    |    |--- store.js (Redux store configuration)
|    |    |
|    |    |--- components/
|    |    |    |--- Navbar.jsx (Navigation bar)
|    |    |
|    |    |--- features/
|    |    |    |--- auth/
|    |    |    |    |--- auth.slice.js (Redux slice)
|    |    |    |    |--- components/ (Auth components)
|    |    |    |    |--- pages/
|    |    |    |    |    |--- Login.jsx
|    |    |    |    |    |--- Register.jsx
|    |    |    |
|    |    |    |--- chat/
|    |    |    |    |--- chat.slice.js (Redux slice)
|    |    |    |    |--- components/
|    |    |    |    |    |--- ChatContainer.jsx (Main chat area)
|    |    |    |    |    |--- ChatHeader.jsx (Chat header)
|    |    |    |    |    |--- MessageInput.jsx (Message form)
|    |    |    |    |    |--- NoChatSelected.jsx (Empty state)
|    |    |    |    |--- pages/
|    |    |    |    |    |--- Home.jsx
|    |    |    |    |    |--- Sidebar.jsx
|    |    |    |    |--- skeleton/
|    |    |    |    |    |--- MessageSkeleton.jsx
|    |    |    |    |    |--- SidebarSkeleton.jsx
|    |    |
|    |    |--- lib/
|    |    |    |--- axios.js (Axios setup)
|    |    |    |--- socket.js (Socket.io setup)
|    |    |
|    |    |--- App.jsx (Main component)
|    |    |--- main.jsx (Entry point)
|    |    |--- index.css
|    |    |--- App.css
|    |
|    |--- package.json
|    |--- vite.config.js
|    |--- index.html
|
|--- README.md (This file)
|--- .gitignore

```

---

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database
- Cloudinary account for media storage

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in backend directory with following variables:

   ```
   PORT=4000
   MONGO_URI=mongodb://your-mongodb-uri
   FRONTEND_URL=http://localhost:5173

   JWT_SECRET_KEY=your-jwt-secret-key
   JWT_EXPIRES=7d
   COOKIE_EXPIRE=7

   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. Start backend server:
   ```bash
   npm start
   ```
   Backend will run on http://localhost:4000

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in frontend directory:

   ```
   VITE_API_URL=http://localhost:4000
   ```

4. Start frontend development server:
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

---

## Usage Guide

### For Users

1. Open http://localhost:5173 in your browser
2. Register new account or login with existing credentials
3. Navigate to home page to see available contacts
4. Click on a user to start chatting
5. Send text messages, images, or videos
6. See real-time response from other users

### For Developers

Refer to specific README files:

- Backend API details: See [Backend README](./backend/README.md)
- Frontend implementation: See [Frontend README](./frontend/README.md)

---

## API Documentation

### Authentication Endpoints

- POST /api/v1/user/register - Register new user
- POST /api/v1/user/login - Login user
- GET /api/v1/user/logout - Logout user
- GET /api/v1/user/me - Get current user profile
- PUT /api/v1/user/update-profile - Update user profile

### Message Endpoints

- GET /api/v1/message/users - Get all users
- GET /api/v1/message/get-messages/:id - Get messages with user
- POST /api/v1/message/send-message/:id - Send message to user

For detailed endpoints documentation, see [Backend README](./backend/README.md)

---

## Socket Events

### Client to Server

- Connection with userId query parameter
- Automatic disconnection

### Server to Client

- getOnlineUsers - List of online user IDs
- newMessage - Real-time message notification

---

## Database Models

### User Model

- name (String, required)
- email (String, unique, required)
- password (String, hashed)
- avatar (Object with public_id and url)
- createdAt, updatedAt (Timestamps)

### Message Model

- senderId (Reference to User)
- receiverId (Reference to User)
- text (String)
- media (String - Cloudinary URL)
- createdAt, updatedAt (Timestamps)

---

## Error Handling

The application implements comprehensive error handling:

- Authentication errors (401)
- Not found errors (404)
- Validation errors (400)
- Server errors (500)
- Database errors

All errors are caught and formatted with meaningful messages.

---

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Cookie-based session management
- Environment variable protection
- Input validation
- Error message sanitization

---

## Performance Optimization

- Mongoose query optimization
- Lazy loading with skeletons
- Cloud storage for media files
- State management with Redux
- Socket.io for efficient real-time updates

---

## Deployment

### Deployment Checklist

- [ ] Set all environment variables in production
- [ ] Update FRONTEND_URL and API_URL
- [ ] Configure MongoDB Atlas connection
- [ ] Set up Cloudinary credentials
- [ ] Enable HTTPS
- [ ] Set up CORS for production domain
- [ ] Configure JWT secrets
- [ ] Enable database backups

---

## Troubleshooting

### Backend Issues

**Port already in use:**

```bash
# Kill process on port 4000
taskkill /F /IM node.exe
```

**Database connection failed:**

- Check MongoDB URI in .env
- Ensure MongoDB is running
- Verify network access in MongoDB Atlas

**Cloudinary upload failed:**

- Verify Cloudinary credentials
- Check file size limit
- Ensure correct file format

### Frontend Issues

**Port 5173 already in use:**

```bash
# Kill Node processes and restart
taskkill /F /IM node.exe
npm run dev
```

**Messages not appearing:**

- Check browser console for errors
- Verify backend is running
- Check network tab for API calls
- Clear browser cache

**Real-time not working:**

- Verify Socket.io connection
- Check backend logs
- Ensure both servers are running

---

## Contributing

When contributing to this project:

1. Follow the existing code structure
2. Use consistent naming conventions
3. Test changes before committing
4. Update documentation if needed
5. Ensure no sensitive data in commits

---

## Environment Variables Reference

### Backend Environment Variables

```
PORT - Server port (default: 4000)
MONGO_URI - MongoDB connection string
FRONTEND_URL - Frontend URL for CORS
JWT_SECRET_KEY - Secret key for JWT tokens
JWT_EXPIRES - JWT token expiration time
COOKIE_EXPIRE - Cookie expiration time in days
CLOUDINARY_CLOUD_NAME - Cloudinary cloud name
CLOUDINARY_API_KEY - Cloudinary API key
CLOUDINARY_API_SECRET - Cloudinary API secret
NODE_ENV - Environment (development/production)
```

### Frontend Environment Variables

```
VITE_API_URL - Backend API URL
```

---

## Testing

Before deploying:

1. Test user registration and login
2. Test message sending (text, images, videos)
3. Test real-time message delivery
4. Test online status updates
5. Test profile update with avatar
6. Test error handling
7. Test on different browsers
8. Test responsive design

---

## License

This project is licensed under the ISC License.

---

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review specific README files
3. Check browser console for errors
4. Check backend console logs
5. Verify environment variables are set correctly

---

## Version History

**Version 1.0.0** (Current)

- User authentication system
- Real-time messaging
- Image and video sharing
- Online status tracking
- Responsive UI design
- Socket.io integration


