import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import PublicLayout from "./components/public-layout";
import AdminLayout from "./components/admin-layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import config from "./config";
import 'react-toastify/ReactToastify.css'
import {ToastContainer}from 'react-toastify'
import { createContext } from "react";
import { useState } from "react";
import AdminNavbar from "./components/admin-navbar";
import AdminProtector from "./components/admin-protector";

export const AuthContext=createContext() 
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  return (
    <AuthContext value={{user,setUser}}>
    <BrowserRouter>
    <ToastContainer/>
    {/* {
      config.NODE_ENV === "development" && <div>Dev</div>
    } */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminProtector><AdminLayout /></AdminProtector>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthContext>
  );
}

export default App;
