# Frontend Application Documentation

Real-time chat application frontend built with React, Redux, and Tailwind CSS.

---

## Overview

The frontend is a modern, responsive React-based single-page application that provides a real-time chat interface. It uses Redux for state management and Socket.io for real-time communication with the backend server.

---

## Technology Stack

- React - UI library for building components
- Redux Toolkit - State management library
- React Router - Client-side routing
- Axios - HTTP client for API calls
- Socket.io Client - Real-time WebSocket communication
- Tailwind CSS - Utility-first CSS framework
- Lucide React - Icon library
- React Toastify - Toast notification system
- Zod - TypeScript-first schema validation
- Vite - Fast build tool and dev server

---

## Project Structure

```
frontend/
|
|--- src/
|    |--- app/
|    |    |--- store.js
|    |    |    Task: Configure Redux store
|    |    |    Features: Store creation with toolkit
|    |    |    Contains: All reducers combined
|    |    |
|    |
|    |--- components/
|    |    |--- Navbar.jsx
|    |    |    Task: Top navigation bar
|    |    |    Props: None (uses Redux)
|    |    |    Features:
|    |    |    - Display current user
|    |    |    - Logout button
|    |    |    - Responsive layout
|    |    |
|    |
|    |--- features/
|    |    |
|    |    |--- auth/
|    |    |    |--- auth.slice.js
|    |    |    |    Redux Slice for authentication
|    |    |    |    Actions:
|    |    |    |    - getUser() - Fetch current user
|    |    |    |    - login() - Authenticate user
|    |    |    |    - register() - Create new account
|    |    |    |    - logout() - Clear session
|    |    |    |    - setonlineUsers() - Update online list
|    |    |    |    State:
|    |    |    |    - authUser: Current logged-in user
|    |    |    |    - isSigningUp: Registration loading
|    |    |    |    - isLoggingIn: Login loading
|    |    |    |    - isCheckingAuth: Auth check loading
|    |    |    |    - onlineUsers: Array of online IDs
|    |    |    |
|    |    |    |--- components/
|    |    |    |    Reusable auth components
|    |    |    |    (Can contain form inputs, etc)
|    |    |    |
|    |    |    |--- pages/
|    |    |    |    |---Login.jsx
|    |    |    |    |   Task: Login page
|    |    |    |    |   Features:
|    |    |    |    |   - Email/password input
|    |    |    |    |   - Form validation
|    |    |    |    |   - Error handling
|    |    |    |    |   - Loading state
|    |    |    |    |   - Link to register
|    |    |    |    |
|    |    |    |    |--- Register.jsx
|    |    |    |    |    Task: User registration page
|    |    |    |    |    Features:
|    |    |    |    |    - Name/email/password inputs
|    |    |    |    |    - Form validation
|    |    |    |    |    - Password confirmation
|    |    |    |    |    - Error messages
|    |    |    |    |    - Loading indicator
|    |    |    |    |    - Link to login
|    |    |    |
|    |    |
|    |    |--- chat/
|    |    |    |--- chat.slice.js
|    |    |    |    Redux Slice for conversations
|    |    |    |    Actions:
|    |    |    |    - getUsers() - Fetch all users
|    |    |    |    - getMessages() - Get conversation
|    |    |    |    - sendMessage() - Send new message
|    |    |    |    Actions (reducers):
|    |    |    |    - setSelectedUser() - Select chat
|    |    |    |    - pushNewMessage() - Add message to state
|    |    |    |    State:
|    |    |    |    - messages: Array of messages
|    |    |    |    - users: Array of all users
|    |    |    |    - selectedUser: Current chatting
|    |    |    |    - isUsersLoading: Users fetch status
|    |    |    |    - isMessagesLoading: Messages fetch status
|    |    |    |
|    |    |    |--- components/
|    |    |    |    |--- ChatContainer.jsx
|    |    |    |    |    Task: Main message display area
|    |    |    |    |    Features:
|    |    |    |    |    - Display all messages
|    |    |    |    |    - Auto-scroll to latest
|    |    |    |    |    - Real-time socket listener
|    |    |    |    |    - Message formatting
|    |    |    |    |    - Loading skeleton
|    |    |    |    |    Props: None (Redux)
|    |    |    |    |    Logic:
|    |    |    |    |    - Fetch messages on user select
|    |    |    |    |    - Listen for "newMessage"
|    |    |    |    |    - Add received messages
|    |    |    |    |    - Format timestamps
|    |    |    |    |    - Handle sender/receiver display
|    |    |    |    |
|    |    |    |    |--- ChatHeader.jsx
|    |    |    |    |    Task: Selected user information header
|    |    |    |    |    Features:
|    |    |    |    |    - User name display
|    |    |    |    |    - Avatar image
|    |    |    |    |    - Online status indicator
|    |    |    |    |    - Close chat button
|    |    |    |    |    - Call buttons (UI only)
|    |    |    |    |    Props: None (Redux)
|    |    |    |    |    Status Colors:
|    |    |    |    |    - Green: Online
|    |    |    |    |    - Gray: Offline
|    |    |    |    |
|    |    |    |    |--- MessageInput.jsx
|    |    |    |    |    Task: Message/media input form
|    |    |    |    |    Features:
|    |    |    |    |    - Text message input
|    |    |    |    |    - Image/video upload
|    |    |    |    |    - File preview
|    |    |    |    |    - Error validation
|    |    |    |    |    Props: None (Redux)
|    |    |    |    |    Files Accepted:
|    |    |    |    |    - Images: .jpg, .png, .gif, .webp
|    |    |    |    |    - Videos: .mp4, .webm, .mov
|    |    |    |    |    Max Preview Height: 208px
|    |    |    |    |    Logic:
|    |    |    |    |    - Validate file type
|    |    |    |    |    - Create file preview
|    |    |    |    |    - Send via FormData
|    |    |    |    |    - Clear form after send
|    |    |    |    |
|    |    |    |    |--- NoChatSelected.jsx
|    |    |    |    |    Task: Empty state component
|    |    |    |    |    Shows when no user selected
|    |    |    |    |    Message: Select contact to start
|    |    |    |    |
|    |    |    |
|    |    |    |--- pages/
|    |    |    |    |--- Home.jsx
|    |    |    |    |    Task: Main chat page layout
|    |    |    |    |    Contains:
|    |    |    |    |    - Sidebar (users list)
|    |    |    |    |    - ChatContainer or NoChatSelected
|    |    |    |    |    Layout: Responsive grid
|    |    |    |    |
|    |    |    |    |--- Sidebar.jsx
|    |    |    |    |    Task: Users list sidebar
|    |    |    |    |    Features:
|    |    |    |    |    - Display all users
|    |    |    |    |    - Online indicator per user
|    |    |    |    |    - Filter by online only
|    |    |    |    |    - Click to select chat
|    |    |    |    |    Props: None (Redux)
|    |    |    |    |    Logic:
|    |    |    |    |    - Fetch users on mount
|    |    |    |    |    - Filter based on toggle
|    |    |    |    |    - Highlight selected user
|    |    |    |    |    - Show online count
|    |    |    |    |
|    |    |    |
|    |    |    |--- skeleton/
|    |    |    |    Loading placeholder components
|    |    |    |    |--- MessageSkeleton.jsx
|    |    |    |    |    Gray placeholder while loading
|    |    |    |    |
|    |    |    |    |--- SidebarSkeleton.jsx
|    |    |    |    |    Gray placeholder for user list
|    |    |    |    |
|    |    |
|    |
|    |--- lib/
|    |    |--- axios.js
|    |    |    Task: Configure axios instance
|    |    |    Features:
|    |    |    - Base URL setup
|    |    |    - Credentials included
|    |    |    - Default headers
|    |    |    Exports: axiosInstance
|    |    |
|    |    |--- socket.js
|    |    |    Task: Socket.io client setup
|    |    |    Methods:
|    |    |    - connectSocket(userId) - Initialize connection
|    |    |    - getSocket() - Get socket instance
|    |    |    - disconnectSocket() - Close connection
|    |    |    Features:
|    |    |    - Auto-connect with userId
|    |    |    - Connection persistence
|    |    |    - Event listeners setup
|    |    |
|    |
|    |--- App.jsx
|    |    Main application component
|    |    Features:
|    |    - Check authentication on mount
|    |    - Route setup
|    |    - Layout wrapper
|    |    - Redux integration
|    |    - Socket connection
|    |    Routes:
|    |    - / (Home - protected)
|    |    - /login
|    |    - /register
|    |
|    |--- main.jsx
|    |    Application entry point
|    |    Imports App component
|    |    Renders to root element
|    |
|    |--- index.css
|    |    Global Tailwind styles
|    |
|    |--- App.css
|    |    Global application styles
|
|--- package.json
|    Dependencies and scripts
|
|--- vite.config.js
|    Vite build configuration
|    React plugin setup
|
|--- index.html
|    HTML template
|    Root div for React
|
|--- .env (not tracked)
|    VITE_API_URL - Backend API URL
|

```

---

## Redux State Structure

### Auth Slice

```javascript
auth: {
  authUser: User | null,
  isSigningUp: boolean,
  isLoggingIn: boolean,
  isUpdatingProfile: boolean,
  isCheckingAuth: boolean,
  onlineUsers: string[] // Array of user IDs
}
```

### Chat Slice

```javascript
chat: {
  messages: Message[],
  users: User[],
  selectedUser: User | null,
  isUsersLoading: boolean,
  isMessagesLoading: boolean
}
```

---

## Component Architecture

### Page Components

- Login - Authentication page
- Register - User registration page
- Home - Main chat layout

### Layout Components

- Navbar - Top navigation
- Sidebar - Users list
- ChatContainer - Messages display

### Feature Components

- ChatHeader - Selected user info
- MessageInput - Message form
- NoChatSelected - Empty state
- MessageSkeleton - Loading state
- SidebarSkeleton - Loading state

---

## Data Flow

### User Authentication

```
1. User fills login form
2. dispatch(login(credentials))
3. Async thunk calls API
4. Backend returns user + token
5. Redux stores user in state
6. Auth middleware redirects
7. Socket connection established
```

### Message Sending

```
1. User types message
2. Selects media (optional)
3. Clicks send button
4. dispatch(sendMessage(data))
5. FormData sent to backend
6. Backend stores in DB
7. Socket emits to receiver
8. Message added to Redux state
9. Component rerenders
```

### Message Receiving

```
1. Backend receives message
2. Saves to database
3. Emits "newMessage" socket event
4. Frontend socket listener triggers
5. dispatch(pushNewMessage(message))
6. Redux state updated
7. Component rerenders
8. Message appears on screen
```

### Online Status

```
1. User connects socket
2. Server broadcasts onlineUsers
3. Socket listener: "getOnlineUsers"
4. dispatch(setonlineUsers(users))
5. Redux state updated
6. Components check online status
7. Green/gray indicators update
```

---

## Key Features

### Authentication

- Register with email, name, password
- Login with credentials
- JWT token stored in cookies
- Auto logout on token expiry
- Protected routes
- Current user display

### Real-time Chat

- Text message sending/receiving
- Image upload and display
- Video upload with player
- Message history persistence
- Auto-scroll to latest
- Timestamp display

### User Interface

- Responsive design (mobile, tablet, desktop)
- Loading skeletons
- Toast notifications
- Error messages
- Online status indicators
- User selection highlight

### Socket Events

- Connect with userId
- Listen for onlineUsers
- Listen for newMessage
- Auto disconnect

---

## API Integration

### Using Axios Instance

```javascript
import { axiosInstance } from "../lib/axios";

// GET request
const response = await axiosInstance.get("/api/v1/endpoint");

// POST request
const response = await axiosInstance.post("/api/v1/endpoint", data);

// Includes credentials automatically
// Base URL set in lib/axios.js
```

### Redux Async Thunks

```javascript
// Action thunk handles API calls
const response = await axiosInstance.get("/message/get-messages/:userId");

// State automatically updated by reducers
state.messages = response.data.messages;
```

---

## Installation

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create .env file:

   ```
   VITE_API_URL=http://localhost:4000
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

Server runs on http://localhost:5173

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts Vite dev server with hot reload

### Production Build

```bash
npm run build
```

Creates optimized production build in dist folder

### Preview Build

```bash
npm run preview
```

Preview production build locally

### Linting

```bash
npm run lint
```

Check code with ESLint

---

## Styling

### Tailwind CSS

- Utility-first CSS framework
- Responsive design classes
- Custom color configuration
- Mobile-first approach

### CSS Files

- index.css - Global Tailwind styles
- App.css - Application-specific styles

### Common Tailwind Classes Used

- Flexbox: flex, flex-col, gap, items-center, justify-between
- Spacing: px, py, mt, mb, space-y
- Colors: bg-indigo-600, text-white, text-gray-800
- Borders: border, rounded, rounded-full, rounded-2xl
- Sizing: w-8, h-8, max-w-xs, max-h-40
- Effects: shadow, opacity, transition

---

## Performance Optimization

- Code splitting with React Router
- Lazy component loading
- Image optimization (via Cloudinary)
- State management (only necessary re-renders)
- Memoization where needed
- Skeleton loading for UX

---

## Error Handling

- Try-catch in thunks
- Toast notifications for errors
- Meaningful error messages
- Network error handling
- Validation error messages
- User-friendly error display

---

## Environment Variables

```
VITE_API_URL - Backend API URL (required)
```

Example:

```
VITE_API_URL=http://localhost:4000
```

---

## Dependencies Overview

```
React - UI framework
Redux Toolkit - State management
React Router - Client routing
Axios - HTTP client
Socket.io Client - WebSocket client
Tailwind CSS - Styling framework
Lucide React - Icon library
React Toastify - Notifications
Zod - Schema validation
Vite - Build tool
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## Common Patterns

### Using Redux State

```javascript
const { messages, selectedUser } = useSelector((state) => state.chat);
const dispatch = useDispatch();
```

### Async Operations

```javascript
const dispatch = useDispatch();
dispatch(getMessages(userId))
  .then((action) => {
    // Success handling
  })
  .catch((error) => {
    // Error handling
  });
```

### Socket Communication

```javascript
const socket = getSocket();
socket.on("newMessage", (message) => {
  dispatch(pushNewMessage(message));
});
```

---

## Testing Checklist

Before deployment verify:

1. Registration works with valid data
2. Cannot register with:
   - Empty fields
   - Weak password
   - Invalid email
3. Login works with correct credentials
4. Cannot login with wrong credentials
5. Messages send and appear on right
6. Messages received appear on left
7. Images upload and display
8. Videos upload and display
9. Online status updates
10. Users list filters by online
11. Can logout successfully
12. Routes protected (no access without login)
13. Responsive on mobile/tablet/desktop
14. No console errors
15. Real-time updates work instantly

---

## Troubleshooting

### Port 5173 in use

```bash
# Kill process using port
taskkill /F /IM node.exe
npm run dev
```

### Messages not appearing

- Check network tab for API errors
- Verify backend running on correct port
- Check Redux DevTools for state
- Check browser console for errors

### Real-time not working

- Check Socket.io connection in console
- Verify backend socket setup correct
- Clear browser cache
- Restart both servers

### Images not uploading

- Check file size limit
- Verify file type accepted
- Check Cloudinary credentials
- View network errors

---

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Traditional hosting

### Before Deploy

- Set VITE_API_URL to production backend
- Run build command
- Test production build locally
- Check all features work
- Verify no console errors

---

## Maintenance

- Keep dependencies updated
- Monitor for security issues
- Regular testing
- Clean unused code
- Optimize bundle size
- Monitor performance

---

## Development Tips

- Use Redux DevTools for debugging
- Use React DevTools for component inspection
- Use Network tab for API debugging
- Console.log strategically
- Test on different screen sizes
- Clear cache when testing

---

**Last Updated:** April 16, 2026
**Status:** Production Ready
**Maintainer:** Development Team
