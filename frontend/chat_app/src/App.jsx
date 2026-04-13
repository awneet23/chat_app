import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log(onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  // console.log({ isCheckingAuth, authUser });
  // console.log(checkAuth);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar></Navbar>

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage></HomePage> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage></SignUpPage> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage></LoginPage> : <Navigate to="/" />}
        ></Route>
        <Route path="/settings" element={<SettingsPage></SettingsPage>}></Route>
        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage></ProfilePage> : <Navigate to="/login" />
          }
        ></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
};

export default App;
