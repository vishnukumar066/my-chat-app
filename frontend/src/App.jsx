
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Login from './features/auth/pages/Login'
import { useEffect } from 'react';
import { getUser, setonlineUsers } from './features/auth/auth.slice.js';
import { connectSocket, disconnectSocket } from './lib/socket';
import { Loader } from 'lucide-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './features/auth/pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import Home from './features/chat/pages/Home.jsx';
import Profile from './features/auth/pages/Profile.jsx';

function App() {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []); // getUser

  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser._id);
      socket.on("getOnlineUsers", (users) => {
        dispatch(setonlineUsers(users));
      });

      return () => disconnectSocket();
    }
  }, [authUser]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-16 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Navbar (fixed height) */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/register"
              element={!authUser ? <Register /> : <Navigate to={"/"} />}
            />
            <Route
              path="/login"
              element={
                !authUser ? (
                  <div className='flex items-center justify-center'>
                    <Login />
                  </div>
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                authUser ? (
                  <div className="h-full overflow-y-auto">
                    <Profile />
                  </div>
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />
          </Routes>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
          closeOnClick
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
