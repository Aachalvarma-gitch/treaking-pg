import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import config from "./config";

function App() {
  return (
    <BrowserRouter>
    {
      config.NODE_ENV === "development" && <div>Dev</div>
    }
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
