import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard.js";
import Navbar from "./components/navbar.js";
import Home from "./pages/home.js";
import Auth from "./pages/auth.js";
import Cookie from "universal-cookie";
import Profile from "./pages/profile.js";
import Income from "./pages/income.js";

export const UserContext = createContext();
const cookies = new Cookie();

axios.defaults.baseURL = "http://localhost:5000/nestegg";
axios.defaults.withCredentials = true;

const authToken = cookies.get("token");
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = cookies.get("userId");
    if (userId) {
      setUser(userId);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!authToken) {
    return <Auth />;
  }

  return (
    <>
      <UserContext.Provider value={{ isMobile, user }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/income" element={<Income />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
