import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap";
import "react-bootstrap";
import "./layouts/style/style.css";
import "./layouts/style/Side&NavBar.css";
import "./App.css";
import "./layouts/style/Auth.css";

// USER ROUTES
import Index from "./pages/auth/Index";
import Home from "./pages/user/Home";
import RequestDocuments from "./pages/user/RequestDocument";
import About from "./pages/user/About";
import ProfileSetup from "./pages/user/ProfileSetup";
import PagesMainLayout from "./layouts/PagesMainLayout";
// import MainLayout from "./layouts/MainLayout";
// ADMIN ROUTES

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Home" element={<PagesMainLayout />} />
        <Route path="/RequestDocuments" element={<RequestDocuments />} />
        <Route path="/About" element={<About />} />
        <Route path="/ProfileSetup" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
