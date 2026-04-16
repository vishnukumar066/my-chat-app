# Backend API Documentation

Real-time chat application backend built with Express.js, Node.js, and MongoDB.

---

## Overview

The backend serves as the API server for the chat application. It handles user authentication, message storage, real-time communication via Socket.io, and media management through Cloudinary integration.

---

## Technology Stack

- Node.js - JavaScript runtime
- Express.js - Web application framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- Socket.io - Real-time communication
- JWT - Token-based authentication
- bcryptjs - Password hashing
- Cloudinary - Media hosting service
- express-fileupload - File upload handling
- CORS - Cross-origin resource sharing
- cookie-parser - Cookie handling
- dotenv - Environment variable management

---

## Project Structure

```
backend/
|
|--- src/
|    |--- config/
|    |    |--- dbConnection.js
|    |    |    Task: Connect to MongoDB database
|    |    |    Exports: Function to initialize database
|    |    |
|    |    |--- dotenv.js
|    |    |    Task: Load environment variables
|    |    |    Exports: Dotenv configuration
|    |    |
|    |    |--- env.js
|    |    |    Task: Export all environment variables
|    |    |    Methods: All ENV constants
|    |    |
|    |
|    |--- middleware/
|    |    |--- auth.middleware.js
|    |    |    Task: Verify JWT tokens
|    |    |    Methods: isAuthenticated()
|    |    |    Returns: User data or error
|    |    |
|    |    |--- catchAsyncError.js
|    |    |    Task: Catch async errors
|    |    |    Methods: Wrapper for async functions
|    |    |    Returns: Caught errors to error handler
|    |    |
|    |    |--- errorMiddleware.js
|    |    |    Task: Handle errors globally
|    |    |    Methods: Format error responses
|    |    |    Returns: Formatted error response
|    |    |
|    |
|    |--- modules/
|    |    |--- user/
|    |    |    |
|    |    |    |--- user.model.js
|    |    |    |    Fields: name, email, password, avatar, timestamps
|    |    |    |    Methods: Standard Mongoose methods
|    |    |    |
|    |    |    |--- user.controller.js
|    |    |    |    Methods:
|    |    |    |    - register() POST - Create new user
|    |    |    |    - login() POST - Authenticate user
|    |    |    |    - getUser() GET - Get current user
|    |    |    |    - logout() GET - Clear user session
|    |    |    |    - updateProfile() PUT - Update user data
|    |    |    |
|    |    |    |--- user.routes.js
|    |    |    |    Routes:
|    |    |    |    - POST /register
|    |    |    |    - POST /login
|    |    |    |    - GET /me (protected)
|    |    |    |    - GET /logout (protected)
|    |    |    |    - PUT /update-profile (protected)
|    |    |    |
|    |    |    |--- user.services.js
|    |    |    |    Methods: Password hashing and comparison
|    |    |    |    - hash() - Encrypt password
|    |    |    |    - compare() - Verify password
|    |    |    |
|    |    |
|    |    |--- message/
|    |    |    |
|    |    |    |--- message.model.js
|    |    |    |    Fields: senderId, receiverId, text, media, timestamps
|    |    |    |    Indexes: Sender/receiver pairs for query optimization
|    |    |    |
|    |    |    |--- message.controller.js
|    |    |    |    Methods:
|    |    |    |    - getAllUsers() GET - Fetch all users except current
|    |    |    |    - getMessages() GET - Fetch conversation history
|    |    |    |    - sendMessage() POST - Create and send message
|    |    |    |    Features:
|    |    |    |    - Media upload to Cloudinary
|    |    |    |    - Real-time socket notification
|    |    |    |
|    |    |    |--- message.routes.js
|    |    |    |    Routes:
|    |    |    |    - GET /users (protected)
|    |    |    |    - GET /get-messages/:id (protected)
|    |    |    |    - POST /send-message/:id (protected)
|    |    |    |
|    |
|    |--- routes/
|    |    |--- global.routes.js
|    |    |    Task: Main application router
|    |    |    Routes all module routers
|    |    |    - /user (user routes)
|    |    |    - /message (message routes)
|    |    |
|    |
|    |--- utils/
|    |    |--- ApiError.js
|    |    |    Task: Custom error class
|    |    |    Methods: Format error messages
|    |    |    Usage: throw new ApiError(statusCode, message)
|    |    |
|    |    |--- ApiResponse.js
|    |    |    Task: Format successful responses
|    |    |    Methods: JSON response formatting
|    |    |    Usage: new ApiResponse(statusCode, data, message)
|    |    |
|    |    |--- cloudinary.util.js
|    |    |    Task: Cloudinary integration
|    |    |    Methods:
|    |    |    - uploadToCloudinary() - Upload file to cloud
|    |    |    - deleteFromCloudinary() - Delete file from cloud
|    |    |
|    |    |--- jwtToken.js
|    |    |    Task: JWT token generation
|    |    |    Methods:
|    |    |    - generateJwtToken() - Create JWT with cookie
|    |    |    Features: Automatic cookie setting
|    |    |
|    |    |--- socket.js
|    |    |    Task: Socket.io server setup
|    |    |    Methods:
|    |    |    - initSocket() - Initialize Socket.io
|    |    |    - getReceiverSocketId() - Get socket ID of user
|    |    |    Exports: io instance
|    |    |    Events: User connection/disconnection
|    |    |
|    |
|    |--- app.js
|    |    Task: Express application setup
|    |    Features:
|    |    - Middleware configuration
|    |    - CORS setup
|    |    - File upload setup
|    |    - Route mounting
|    |    - Error handling
|    |    - Socket.io initialization
|    |    - Server startup on port
|    |
|
|--- package.json
|    Dependencies: All required packages listed
|    Scripts: npm start (with nodemon)
|
|--- .env (not tracked)
|    Contains: Sensitive configuration variables
|
```

---

## API Endpoints

### User Endpoints

1. **Register User**
   - Endpoint: POST /api/v1/user/register
   - Body: { name, email, password }
   - Validation: Email format, password length (min 8)
   - Response: { user, token }
   - Status: 201

2. **Login User**
   - Endpoint: POST /api/v1/user/login
   - Body: { email, password }
   - Validation: Email exists, password correct
   - Response: { user, token }
   - Status: 200

3. **Get Current User**
   - Endpoint: GET /api/v1/user/me
   - Authentication: Required (JWT)
   - Response: { user }
   - Status: 200

4. **Logout User**
   - Endpoint: GET /api/v1/user/logout
   - Authentication: Required (JWT)
   - Response: Success message
   - Status: 200

5. **Update Profile**
   - Endpoint: PUT /api/v1/user/update-profile
   - Authentication: Required (JWT)
   - Body: { name, avatar }
   - Features: Avatar upload to Cloudinary
   - Response: { user }
   - Status: 200

### Message Endpoints

1. **Get All Users**
   - Endpoint: GET /api/v1/message/users
   - Authentication: Required (JWT)
   - Response: Array of users (excluding current user)
   - Pagination: Optional skip/limit

2. **Get Messages with User**
   - Endpoint: GET /api/v1/message/get-messages/:id
   - Authentication: Required (JWT)
   - Parameter: id = target user ID
   - Response: Array of messages between two users
   - Sort: By createdAt ascending
   - Status: 200

3. **Send Message**
   - Endpoint: POST /api/v1/message/send-message/:id
   - Authentication: Required (JWT)
   - Parameter: id = receiver user ID
   - Body: FormData with text and media
   - Features:
     - Text message (optional)
     - Media file upload (optional)
     - Cloudinary integration for media
     - Real-time socket notification
   - Response: { message }
   - Status: 200

---

## Socket Events

### Client Connects

- Query Parameter: userId
- Event Emitted: getOnlineUsers (to all connected clients)

### Message Events

- Event: newMessage
- Emitted to: Specific receiver socket
- Data: Complete message object

### Disconnection

- Event: Automatic update of online users
- Broadcast: Updated online users list

---

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  avatar: {
    public_id: String (Cloudinary ID),
    url: String (Cloudinary URL)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Message Collection

```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: 'User'),
  receiverId: ObjectId (ref: 'User'),
  text: String (optional),
  media: String (Cloudinary URL, optional),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Authentication Flow

1. User registers with email and password
2. Password hashed using bcrypt
3. User data saved to MongoDB
4. JWT token generated
5. Token set in http-only cookie
6. Subsequent requests include cookie with token
7. Middleware verifies token and extracts user
8. User available in req.user for route handlers

---

## Error Handling

### Error Codes Implemented

- 400 Bad Request - Invalid input or data
- 401 Unauthorized - Missing or invalid token
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error

### Error Response Format

```javascript
{
  success: false,
  statusCode: 400,
  message: "Error message",
  // Additional details as needed
}
```

---

## Installation

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create .env file with variables (see Environment Variables)

4. Start server:
   ```bash
   npm start
   ```

Server runs on http://localhost:4000

---

## Environment Variables

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/chat-app
FRONTEND_URL=http://localhost:5173

JWT_SECRET_KEY=your-secret-key-here
JWT_EXPIRES=7d
COOKIE_EXPIRE=7

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

NODE_ENV=development
```

---

## Key Features

### Authentication Security

- Password hashing with bcrypt
- JWT token-based auth
- HTTP-only cookies
- Token expiration
- Email validation
- Password strength validation (minimum 8 characters)

### Real-time Messaging

- Socket.io for instant communication
- Message persistence in database
- Online user tracking
- Real-time user list updates

### Media Handling

- File upload through express-fileupload
- Cloudinary cloud storage
- Automatic file compression
- Secure URL storage only (not local)

### Error Handling

- Try-catch middleware wrapper
- Centralized error handler
- Meaningful error messages
- Proper HTTP status codes

### Performance

- Mongoose query optimization
- Indexed database fields
- Socket.io efficient broadcasting
- Cloud storage for media

---

## Testing Checklist

Before deploy, verify:

1. User can register with valid data
2. Cannot register with:
   - Missing fields
   - Invalid email format
   - Weak password (< 8 chars)
   - Duplicate email
3. User can login with correct credentials
4. Cannot login with:
   - Wrong email
   - Wrong password
5. Can fetch user profile (authenticated)
6. Can update profile with avatar
7. Can send text message
8. Can send message with image
9. Can send message with video
10. Messages appear in other user's list
11. Unauth users cannot access protected routes
12. Invalid tokens rejected
13. Online status updates correctly
14. Old messages persist after reconnect

---

## Dependencies Overview

```
bcryptjs - Password hashing library
cloudinary - Image/video hosting service
cookie-parser - Cookie parsing middleware
cors - Cross-origin request handling
dotenv - Environment variable loading
express - Web framework
express-fileupload - File upload handling
jsonwebtoken - JWT token creation/verification
mongoose - MongoDB object modeling
nodemon - Development auto-restart
socket.io - Real-time WebSocket communication
```

---

## Middleware Stack

1. CORS middleware - Handle cross-origin requests
2. JSON parser - Parse JSON request bodies
3. Cookie parser - Parse cookies
4. URL encoder - Parse form data
5. File upload - Handle file uploads
6. Authentication middleware - On protected routes
7. Async error wrapper - Catch async errors
8. Error handler middleware - Format errors

---

## Best Practices Implemented

- Modular code structure (models, controllers, routes)
- Separation of concerns
- Reusable utility functions
- Consistent naming conventions
- Environment variable usage
- Error handling with custom classes
- Input validation
- Secure password storage
- Token-based authentication
- CORS configuration
- File upload security

---

## Troubleshooting

### Database Connection Failed

- Check MONGO_URI in .env
- Ensure MongoDB service running
- Verify connection string format
- Check IP whitelist in MongoDB Atlas

### Cloudinary Upload Failed

- Verify CLOUDINARY_CLOUD_NAME is correct
- Check API_KEY and API_SECRET
- Ensure file size within limits
- Verify file format supported

### Port Already in Use

- Kill process: taskkill /F /IM node.exe
- Restart server

### JWT Token Issues

- Verify JWT_SECRET_KEY set
- Check token expiration
- Clear cookies and retry login

---

## Deployment Considerations

- Set NODE_ENV to production
- Use environment variable management
- Enable HTTPS in production
- Set secure CORS origins
- Use production MongoDB URI
- Enable database backups
- Monitor server logs
- Set up error tracking
- Use reverse proxy (Nginx)
- Enable rate limiting for login attempts
- Set secure cookie flags

---

## Version Information

- Node.js: v14 or higher
- npm: v6 or higher
- MongoDB: v4.4 or higher
- Express: v5.2.1
- Mongoose: v9.4.1

---

**Last Updated:** April 16, 2026
**Status:** Production Ready
**Maintainer:** Development Team
